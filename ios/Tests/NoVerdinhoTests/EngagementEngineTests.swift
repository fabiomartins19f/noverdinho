import XCTest
@testable import NoVerdinho

final class EngagementEngineTests: XCTestCase {

    // MARK: Desafio do mês

    func testChallengeTargetIsTenPercentWithFloor() {
        let small = MonthlyChallenge.build(lastMonthExpense: 500, currentMonthExpense: 400)
        XCTAssertEqual(small.target, 150, accuracy: 0.001) // piso

        let big = MonthlyChallenge.build(lastMonthExpense: 5000, currentMonthExpense: 4500)
        XCTAssertEqual(big.target, 500, accuracy: 0.001) // 10%
    }

    func testChallengeProgressAndCompletion() {
        let partial = MonthlyChallenge.build(lastMonthExpense: 2000, currentMonthExpense: 1900)
        XCTAssertEqual(partial.saved, 100, accuracy: 0.001)
        XCTAssertEqual(partial.progress, 0.5, accuracy: 0.001)
        XCTAssertFalse(partial.isComplete)

        let done = MonthlyChallenge.build(lastMonthExpense: 2000, currentMonthExpense: 1400)
        XCTAssertGreaterThanOrEqual(done.saved, done.target)
        XCTAssertTrue(done.isComplete)
        XCTAssertEqual(done.progress, 1, accuracy: 0.001)
    }

    func testChallengeNoHistoryIsInactive() {
        let none = MonthlyChallenge.build(lastMonthExpense: 0, currentMonthExpense: 50)
        XCTAssertEqual(none.target, 150, accuracy: 0.001)
        XCTAssertEqual(none.saved, 0, accuracy: 0.001)
        XCTAssertFalse(none.isComplete)
    }

    // MARK: Conquistas

    func testAllAchievementsEarnedInHealthyScenario() {
        let all = AchievementsEngine.evaluate(.init(
            hasAnyTransaction: true,
            paidOffDebtCount: 1,
            activeExpensiveDebtCount: 0,
            lateDebtCount: 0,
            runwayMonths: 3,
            radarHasNegativeDay: false,
            healthScore: 90
        ))
        XCTAssertTrue(all.allSatisfy { $0.earned })
    }

    func testAchievementsLockWhenHabitsAreBad() {
        let none = AchievementsEngine.evaluate(.init(
            hasAnyTransaction: false,
            paidOffDebtCount: 0,
            activeExpensiveDebtCount: 2,
            lateDebtCount: 1,
            runwayMonths: 0.2,
            radarHasNegativeDay: true,
            healthScore: 30
        ))
        XCTAssertTrue(none.allSatisfy { !$0.earned })
    }

    func testVerdenhoAchievementRequires85() {
        let near = AchievementsEngine.evaluate(.init(hasAnyTransaction: true, paidOffDebtCount: 0,
            activeExpensiveDebtCount: 0, lateDebtCount: 0, runwayMonths: 3,
            radarHasNegativeDay: false, healthScore: 84))
        XCTAssertFalse(near.first { $0.id == .verdinhoLevel }!.earned)

        let reached = AchievementsEngine.evaluate(.init(hasAnyTransaction: true, paidOffDebtCount: 0,
            activeExpensiveDebtCount: 0, lateDebtCount: 0, runwayMonths: 3,
            radarHasNegativeDay: false, healthScore: 85))
        XCTAssertTrue(reached.first { $0.id == .verdinhoLevel }!.earned)
    }

    // MARK: Plano de 90 dias

    func testPlanProgressScalesWithData() {
        let zero = NinetyDayPlan.build(registeredDebtAndCards: 0, monthExpense: 2000, lastMonthExpense: 2000,
                                       availableToSpend: 0, monthlyCommitments: 1000)
        XCTAssertLessThan(zero.overallProgress, 0.5)

        let full = NinetyDayPlan.build(registeredDebtAndCards: 3, monthExpense: 1000, lastMonthExpense: 2000,
                                       availableToSpend: 2000, monthlyCommitments: 1000)
        XCTAssertGreaterThanOrEqual(full.overallProgress, 0.8)
        XCTAssertTrue(full.steps.allSatisfy { $0.status == .done })
    }

    func testPlanAlwaysHasThreeStepsInOrder() {
        let plan = NinetyDayPlan.build(registeredDebtAndCards: 1, monthExpense: 0, lastMonthExpense: nil,
                                       availableToSpend: 0, monthlyCommitments: 0)
        XCTAssertEqual(plan.steps.count, 3)
        XCTAssertEqual(plan.steps.map(\.id), [1, 2, 3])
    }
}