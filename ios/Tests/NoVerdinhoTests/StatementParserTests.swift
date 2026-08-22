import XCTest
@testable import NoVerdinho

final class StatementParserTests: XCTestCase {

    // MARK: Linha típica de extrato

    func testParsesSimplePurchaseLine() {
        let result = StatementParser.parse("05/08 MERCADO LIVRE R$ 149,90")
        XCTAssertEqual(result.lines.count, 1)
        let line = try! XCTUnwrap(result.lines.first)
        XCTAssertEqual(line.amount, 149.90, accuracy: 0.001)
        XCTAssertEqual(line.description, "MERCADO LIVRE")
        XCTAssertFalse(line.isAdjustment)
        XCTAssertNotNil(line.date)
    }

    func testParsesMonthNameDate() {
        let result = StatementParser.parse("01 AGO NETFLIX 55,90")
        XCTAssertEqual(result.lines.count, 1)
        let line = try! XCTUnwrap(result.lines.first)
        XCTAssertEqual(line.amount, 55.90, accuracy: 0.001)
        XCTAssertEqual(line.description, "NETFLIX")

        let components = Calendar.current.dateComponents([.month], from: line.date!)
        XCTAssertEqual(components.month, 8)
    }

    // MARK: Ajustes não são compras

    func testFlagsPaymentAsAdjustment() {
        let result = StatementParser.parse("10/08 PAGAMENTO RECEBIDO R$ 1.200,00")
        XCTAssertEqual(result.lines.count, 1)
        XCTAssertTrue(try XCTUnwrap(result.lines.first).isAdjustment)
    }

    func testTotalPurchasesIgnoresAdjustments() {
        let text = """
        05/08 MERCADO R$ 100,00
        06/08 PAGAMENTO R$ 500,00
        07/08 FARMACIA R$ 50,50
        """
        let result = StatementParser.parse(text)
        XCTAssertEqual(result.totalPurchases, 150.50, accuracy: 0.001)
    }

    // MARK: Detecção de cartão

    func testDetectsCardName() {
        let result = StatementParser.parse("Fatura Nubank\n05/08 IFOOD 42,00")
        XCTAssertEqual(result.detectedCardName, "nubank")
    }

    // MARK: Casos degenerados

    func testEmptyTextYieldsEmptyResult() {
        let result = StatementParser.parse("")
        XCTAssertTrue(result.lines.isEmpty)
        XCTAssertNil(result.detectedCardName)
    }

    func testIgnoresLinesWithoutAmount() {
        let result = StatementParser.parse("05/08 COMPRA SEM VALOR")
        XCTAssertTrue(result.lines.isEmpty)
    }

    func testThousandsSeparator() {
        let result = StatementParser.parse("12/08 NOTEBOOK DELL R$ 5.299,00")
        XCTAssertEqual(try XCTUnwrap(result.lines.first).amount, 5299.00, accuracy: 0.001)
    }

    // MARK: Ano explícito na data

    func testExplicitYearIsRespected() {
        let result = StatementParser.parse("01/08/2024 IPHONE R$ 6.000,00")
        let components = Calendar.current.dateComponents([.year, .month, .day], from: try! XCTUnwrap(result.lines.first?.date))
        XCTAssertEqual(components.year, 2024)
        XCTAssertEqual(components.month, 8)
    }

    func testTwoDigitYearExpandsToCurrentCentury() {
        let result = StatementParser.parse("05/03/22 COMPRA R$ 10,00")
        let year = Calendar.current.component(.year, from: try! XCTUnwrap(result.lines.first?.date))
        XCTAssertEqual(year, 2022)
    }
}
