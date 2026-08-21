import XCTest
@testable import NoVerdinho

final class PurchaseSimulatorTests: XCTestCase {

    private let goals = [
        Goal(id: UUID(), kind: .reserve, title: "Reserva", emoji: "banknote.fill",
             target: 12000, saved: 6000, monthlyContribution: 1000)
    ]

    private func input(
        income: Double = 8000,
        commitments: Double = 2000,
        balance: Double = 5000,
        debt: Double = 10000,
        goals: [Goal]? = nil
    ) -> PurchaseSimulator.Input {
        .init(balance: balance, monthlyIncome: income, monthlyCommitments: commitments,
              totalDebt: debt, goals: goals ?? self.goals)
    }

    // MARK: Score de saúde

    func testHealthyFinancesScoreHigh() {
        let score = PurchaseSimulator.healthScore(income: 10000, commitments: 2500, balance: 15000, debt: 5000)
        XCTAssertGreaterThanOrEqual(score, 90)
    }

    func testOverCommittedFinancesScoreLow() {
        let score = PurchaseSimulator.healthScore(income: 5000, commitments: 4500, balance: 500, debt: 40000)
        XCTAssertLessThanOrEqual(score, 30)
    }

    func testZeroIncomeScoresLowButNeverNegative() {
        let score = PurchaseSimulator.healthScore(income: 0, commitments: 1000, balance: 0, debt: 0)
        XCTAssertLessThanOrEqual(score, 50)
        XCTAssertGreaterThanOrEqual(score, 0)
    }

    // MARK: Compra parcelada

    func testFinancedPurchaseAddsMonthlyCommitment() {
        let result = PurchaseSimulator.simulate(amount: 1000, installments: 10, input: input())
        XCTAssertEqual(result.months, 10)
        XCTAssertEqual(result.newMonthlyCommitment, 100.0, accuracy: 0.001)
        XCTAssertGreaterThan(result.commitmentRatioAfter, 2000.0 / 8000.0)
    }

    func testLargeFinancedPurchaseDropsScore() {
        // 24x de 2000 sobre renda de 5000: comprometimento vai a ~68%.
        let result = PurchaseSimulator.simulate(
            amount: 24000, installments: 12,
            input: input(income: 5000, commitments: 1400, balance: 6000, debt: 0)
        )
        XCTAssertGreaterThanOrEqual(result.scoreDrop, 10)
    }

    func testHugeInstallmentsOnTightBudgetIsNotRecommended() {
        // Renda 3000, compromissos 2200 (73%); +180/mês estoura a zona vermelha.
        let result = PurchaseSimulator.simulate(
            amount: 1800, installments: 10,
            input: input(income: 3000, commitments: 2200, balance: 900)
        )
        guard case .notRecommended = result.verdict else {
            return XCTFail("esperava notRecommended, veio \(result.verdict)")
        }
    }

    // MARK: Impacto nas metas

    func testGoalDelaysWhenPaceShrinks() {
        // Aporte da meta é 1000; parcela de 400 reduz para 600 → atrasa.
        let result = PurchaseSimulator.simulate(amount: 4000, installments: 10, input: input())
        XCTAssertEqual(result.goalImpacts.count, 1)
        let impact = try! XCTUnwrap(result.goalImpacts.first)
        XCTAssertEqual(impact.paceAfterPurchase, 600, accuracy: 0.001)
        XCTAssertEqual(impact.monthsNow, 6)      // 6000 restantes / 1000
        XCTAssertEqual(impact.monthsAfter, 10)   // 6000 restantes / 600
    }

    func testGoalStallsWhenInstallmentEatsEntireContribution() {
        let result = PurchaseSimulator.simulate(amount: 12000, installments: 12, input: input())
        let impact = try! XCTUnwrap(result.goalImpacts.first)
        XCTAssertEqual(impact.paceAfterPurchase, 0, accuracy: 0.001)
        XCTAssertEqual(impact.monthsAfter, 0)
        XCTAssertTrue(result.goalImpacts.allSatisfy { $0.monthsAfter >= 0 })
    }

    // MARK: À vista

    func testCashPurchaseDoesNotTouchGoalsOrCommitments() {
        let result = PurchaseSimulator.simulate(amount: 800, installments: 1, input: input())
        XCTAssertEqual(result.newMonthlyCommitment, 0, accuracy: 0.001)
        XCTAssertTrue(result.goalImpacts.isEmpty)
        XCTAssertEqual(result.scoreDrop, 0)
    }
}
