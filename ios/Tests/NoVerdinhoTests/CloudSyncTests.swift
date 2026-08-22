import XCTest
@testable import NoVerdinho

final class CloudSyncTests: XCTestCase {

    private func tx(_ name: String, amount: Double, category: String = "Outros",
                    date: Date = Date(timeIntervalSince1970: 1_700_000_000)) -> Transaction {
        Transaction(kind: amount >= 0 ? .income : .expense, name: name,
                    category: category, amount: abs(amount), date: date)
    }

    // MARK: Merge — importações novas entram

    func testImportsUnknownTransactions() {
        let plan = TransactionMerge.plan(
            existing: [],
            incoming: [
                .init(name: "Mercado", amount: 120, category: "Alimentação", source: .whatsapp, date: .now),
                .init(name: "Netflix", amount: 55.9, category: "Assinaturas", source: .openFinance, date: .now),
            ]
        )
        XCTAssertEqual(plan.toImport.count, 2)
        XCTAssertEqual(plan.duplicates, 0)
    }

    // MARK: Merge — dedupe

    func testSkipsDuplicatesOfExistingTransactions() {
        let existing = [tx("mercado", amount: 120, category: "alimentação")]
        let plan = TransactionMerge.plan(
            existing: existing,
            incoming: [
                .init(name: "MERCADO", amount: 120, category: "ALIMENTAÇÃO", source: .whatsapp, date: existing[0].date),
            ]
        )
        XCTAssertTrue(plan.toImport.isEmpty)
        XCTAssertEqual(plan.duplicates, 1)
    }

    func testSkipsDuplicatesInsideSameBatch() {
        let item = TransactionMerge.Incoming(name: "Ifood", amount: 42, category: "Alimentação",
                                             source: .whatsapp, date: .now)
        let plan = TransactionMerge.plan(existing: [], incoming: [item, item])
        XCTAssertEqual(plan.toImport.count, 1)
        XCTAssertEqual(plan.duplicates, 1)
    }

    // MARK: Merge — sinais e valores

    func testNegativeAmountBecomesExpense() {
        let plan = TransactionMerge.plan(
            existing: [],
            incoming: [.init(name: "Uber", amount: -23.5, category: "Transporte", source: .whatsapp, date: .now)]
        )
        XCTAssertEqual(try XCTUnwrap(plan.toImport.first).kind, .expense)
        XCTAssertEqual(try XCTUnwrap(plan.toImport.first).amount, 23.5, accuracy: 0.001)
    }

    // Caminho real: JSON do servidor → RemoteTransaction → Incoming.
    func testRemoteTransactionPreservesKindThroughTheRealPath() {
        let json = """
        [
          {"description": "Almoço", "amount": -42.0, "kind": "expense", "category": "Alimentação", "source": "whatsapp", "date": "2026-08-01T12:00:00Z"},
          {"description": "Salário", "amount": 5000.0, "kind": "income", "category": "Salário", "source": "open_finance", "date": "2026-08-01T12:00:00Z"}
        ]
        """.data(using: .utf8)!
        let remote = try! JSONDecoder().decode([CloudSyncService.RemoteTransaction].self, from: json)
        let incoming = remote.compactMap { $0.toIncoming() }
        let plan = TransactionMerge.plan(existing: [], incoming: incoming)

        XCTAssertEqual(plan.toImport.count, 2)
        XCTAssertEqual(plan.toImport[0].kind, .expense, "despesa do WhatsApp não pode virar receita")
        XCTAssertEqual(plan.toImport[1].kind, .income)
    }

    func testRemoteTransactionWithoutKindDefaultsToExpense() {
        // Servidores antigos (sem coluna kind) ainda devem tratar como despesa.
        let json = """
        [{"description": "Mercado", "amount": 88.0, "category": "Alimentação", "source": "whatsapp", "date": null}]
        """.data(using: .utf8)!
        let remote = try! JSONDecoder().decode([CloudSyncService.RemoteTransaction].self, from: json)
        let plan = TransactionMerge.plan(existing: [], incoming: remote.compactMap { $0.toIncoming() })
        XCTAssertEqual(try XCTUnwrap(plan.toImport.first).kind, .expense)
    }

    func testPositiveAmountBecomesIncomeWithSource() {
        let plan = TransactionMerge.plan(
            existing: [],
            incoming: [.init(name: "Salário", amount: 5000, category: "Salário", source: .openFinance, date: .now)]
        )
        let imported = try! XCTUnwrap(plan.toImport.first)
        XCTAssertEqual(imported.kind, .income)
        XCTAssertEqual(imported.source, .openFinance)
        XCTAssertEqual(imported.source.label, "Open Finance")
    }

    // MARK: Fatores do Verdinho

    func testFactorPointsSumMatchesHealthScore() {
        let cases: [(Double, Double, Double, Double)] = [
            (10000, 2500, 15000, 5000),
            (5000, 4500, 500, 40000),
            (8000, 2000, 3000, 10000),
            (4000, 3900, 900, 26000),
        ]
        for (income, commitments, balance, debt) in cases {
            let factors = PurchaseSimulator.healthFactors(income: income, commitments: commitments, balance: balance, debt: debt)
            XCTAssertEqual(PurchaseSimulator.healthScoreFromFactors(factors),
                           PurchaseSimulator.healthScore(income: income, commitments: commitments, balance: balance, debt: debt))
            XCTAssertTrue(factors.allSatisfy { $0.points >= 0 && $0.points <= $0.maxPoints })
        }
    }

    func testHealthyFinancesHaveMaxFactors() {
        let factors = PurchaseSimulator.healthFactors(income: 10000, commitments: 2000, balance: 20000, debt: 0)
        XCTAssertEqual(PurchaseSimulator.healthScoreFromFactors(factors), 100)
    }

    // MARK: Simulador de compra — bordas

    func testNegativeAmountIsClamped() {
        let input = PurchaseSimulator.Input(balance: 5000, monthlyIncome: 8000,
                                            monthlyCommitments: 2000, totalDebt: 0, goals: [])
        let result = PurchaseSimulator.simulate(amount: -9999, installments: 10, input: input)
        XCTAssertEqual(result.newMonthlyCommitment, 0, accuracy: 0.001)
        XCTAssertEqual(result.scoreDrop, 0)
    }
}
