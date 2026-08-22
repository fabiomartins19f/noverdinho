import XCTest
@testable import NoVerdinho

final class CashFlowRadarTests: XCTestCase {

    private var calendar: Calendar { Calendar.current }
    private func day(_ offset: Int) -> Date {
        calendar.date(byAdding: .day, value: offset, to: calendar.startOfDay(for: .now))!
    }

    // MARK: Gasto variável médio

    func testVariableDailyAverageOver60Days() {
        let txs = [
            Transaction(kind: .expense, name: "A", category: "Outros", amount: 300, date: day(-30)),
            Transaction(kind: .expense, name: "B", category: "Outros", amount: 300, date: day(-10)),
        ]
        // 600 nos últimos 60 dias = 10/dia.
        XCTAssertEqual(CashFlowRadar.variableDailyAverage(transactions: txs), 10, accuracy: 0.001)
    }

    func testVariableAverageIgnoresOldTransactionsAndIncome() {
        let old = Transaction(kind: .expense, name: "Velha", category: "Outros", amount: 10000, date: day(-90))
        let income = Transaction(kind: .income, name: "Salário", category: "Salário", amount: 5000, date: day(-5))
        XCTAssertEqual(CashFlowRadar.variableDailyAverage(transactions: [old, income]), 0, accuracy: 0.001)
    }

    // MARK: Projeção — sem aperto à vista

    func testHealthyFlowNeverGoesNegative() {
        let forecast = CashFlowRadar.forecast(
            balance: 3000,
            incomeEvents: [(date: day(5), amount: 4000)],
            fixedCommitments: [(date: day(3), amount: 800)],
            transactions: [Transaction(kind: .expense, name: "X", category: "Outros", amount: 600, date: day(-60))]
        )
        XCTAssertNil(forecast.firstNegativeDay)
        XCTAssertGreaterThanOrEqual(forecast.minimumProjected, 0)
        XCTAssertEqual(forecast.series.count, CashFlowRadar.horizonDays)
    }

    // MARK: Projeção — detecta o dia exato do vermelho

    func testDetectsExactDayBalanceTurnsNegative() {
        // Saldo 100; gasto variável 10/dia; conta de 200 no dia 5.
        // Dia 0..4: −10/dia → 50 no fim do dia 4. No dia 5: 50−10−200 < 0.
        let forecast = CashFlowRadar.forecast(
            balance: 100,
            incomeEvents: [],
            fixedCommitments: [(date: day(5), amount: 200)],
            transactions: [Transaction(kind: .expense, name: "X", category: "Outros", amount: 600, date: day(-30))]
        )
        XCTAssertEqual(forecast.firstNegativeDay, 6) // 1-based
        XCTAssertLessThan(forecast.minimumProjected, 0)
    }

    func testUpcomingSalaryCanSaveTheMonth() {
        let commitments = [(date: day(5), amount: 200.0)]
        let spending = [
            Transaction(kind: .expense, name: "X", category: "Outros", amount: 600, date: day(-30))
        ]

        let withoutIncome = CashFlowRadar.forecast(balance: 100, incomeEvents: [], fixedCommitments: commitments, transactions: spending)
        XCTAssertNotNil(withoutIncome.firstNegativeDay)

        let withSalary = CashFlowRadar.forecast(
            balance: 100,
            incomeEvents: [(date: day(3), amount: 1500)],
            fixedCommitments: commitments,
            transactions: spending
        )
        XCTAssertNil(withSalary.firstNegativeDay)
    }

    // MARK: Bordas

    func testPastCommitmentsAreIgnored() {
        let forecast = CashFlowRadar.forecast(
            balance: 500,
            incomeEvents: [],
            fixedCommitments: [(date: day(-10), amount: 9999)],
            transactions: []
        )
        XCTAssertNil(forecast.firstNegativeDay)
        XCTAssertEqual(forecast.series[0], 500 - 0 * 0, accuracy: 0.001)
    }

    func testEmptyHistoryProjectsFlatLine() {
        let forecast = CashFlowRadar.forecast(balance: 1000, incomeEvents: [], fixedCommitments: [], transactions: [])
        XCTAssertTrue(forecast.series.allSatisfy { $0 == 1000 })
        XCTAssertNil(forecast.firstNegativeDay)
        XCTAssertEqual(forecast.variableDailyAverage, 0, accuracy: 0.001)
    }
}
