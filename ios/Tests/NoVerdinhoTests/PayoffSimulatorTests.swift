import XCTest
@testable import NoVerdinho

final class PayoffSimulatorTests: XCTestCase {

    private func debt(remaining: Double, rate: Double) -> Debt {
        Debt(
            type: .creditCard, creditor: "Teste",
            originalAmount: remaining, paidAmount: 0, remainingBalance: remaining,
            interestRate: rate, installment: 0, installmentCount: 12, paidInstallments: 0,
            dueDate: .now.addingTimeInterval(86400 * 30), priority: .high, status: .onTime
        )
    }

    // MARK: Sem juros

    func testZeroInterestPaysInExactMonths() {
        let outcome = PayoffSimulator.simulate(
            debts: [debt(remaining: 1200, rate: 0)],
            payment: 300
        )
        XCTAssertFalse(outcome.neverPaysOff)
        XCTAssertEqual(outcome.months, 4)
    }

    // MARK: Com juros

    func testInterestIncreasesTotalCost() {
        let without = PayoffSimulator.simulate(debts: [debt(remaining: 1000, rate: 0)], payment: 200)
        let with = PayoffSimulator.simulate(debts: [debt(remaining: 1000, rate: 100)], payment: 200)
        XCTAssertGreaterThan(with.months, without.months)
        XCTAssertGreaterThan(with.interest, without.interest)
    }

    // MARK: Divergência (aporte não cobre juros)

    func testPaymentBelowInterestNeverPaysOff() {
        // R$ 10.000 a 240% a.a. = 200/mês de juros; aporte de 50 não cobre.
        let outcome = PayoffSimulator.simulate(debts: [debt(remaining: 10000, rate: 240)], payment: 50)
        XCTAssertTrue(outcome.neverPaysOff)
        XCTAssertEqual(outcome.months, 0)
        XCTAssertGreaterThan(outcome.interest, 0)
    }

    func testExactlyCoversInterestIsDetectedAsDivergence() {
        // Juros de 200/mês e aporte de 200: o saldo fica estático — nunca quita.
        let outcome = PayoffSimulator.simulate(debts: [debt(remaining: 10000, rate: 240)], payment: 200)
        XCTAssertTrue(outcome.neverPaysOff)
    }

    func testSlightlyAboveInterestEventuallyPays() {
        // 24% a.a. = 2% a.m. → juros de 200/mês; aporte 250 quita devagar.
        let outcome = PayoffSimulator.simulate(debts: [debt(remaining: 10000, rate: 24)], payment: 250)
        XCTAssertFalse(outcome.neverPaysOff)
        XCTAssertLessThanOrEqual(outcome.months, 720)
    }

    // MARK: Ordem das dívidas (avalanche)

    func testAvalancheOrderPaysExpensiveFirst() {
        let cheap = debt(remaining: 5000, rate: 12)
        let expensive = debt(remaining: 5000, rate: 120)

        let avalanche = PayoffSimulator.simulate(debts: [expensive, cheap], payment: 1500)
        let snowballWrong = PayoffSimulator.simulate(debts: [cheap, expensive], payment: 1500)

        // Mesma dívida total, ordens diferentes: a avalanche paga menos juros.
        XCTAssertLessThan(avalanche.interest, snowballWrong.interest)
        XCTAssertFalse(avalanche.neverPaysOff)
        XCTAssertFalse(snowballWrong.neverPaysOff)
    }

    // MARK: Mínimos de todas as dívidas

    func testMinimumsArePaidOnAllDebtsBeforeExtraSpillover() {
        let first = debt(remaining: 1000, rate: 0)
        let second = Debt(type: .loan, creditor: "B", originalAmount: 1000, paidAmount: 0,
                          remainingBalance: 1000, interestRate: 0, installment: 200,
                          installmentCount: 12, paidInstallments: 0,
                          dueDate: .now, priority: .low, status: .onTime)
        // Aporta exatamente a soma das parcelas: os dois devem ceder suas
        // parcelas no mês 1 — o segundo não fica "travado" esperando o primeiro.
        let outcome = PayoffSimulator.simulate(debts: [first, second], payment: 100 + 200)
        XCTAssertFalse(outcome.neverPaysOff)
        // 2000 total, 300/mês → 7 meses (a segunda não fica travada atrás da primeira).
        XCTAssertEqual(outcome.months, 7)
    }

    func testExtraFollowsPriorityAfterMinimums() {
        let first = Debt(type: .creditCard, creditor: "Cara", originalAmount: 500, paidAmount: 0,
                         remainingBalance: 500, interestRate: 0, installment: 100,
                         installmentCount: 6, paidInstallments: 0,
                         dueDate: .now, priority: .high, status: .onTime)
        let second = Debt(type: .loan, creditor: "Barata", originalAmount: 1000, paidAmount: 0,
                          remainingBalance: 1000, interestRate: 0, installment: 100,
                          installmentCount: 12, paidInstallments: 0,
                          dueDate: .now, priority: .low, status: .onTime)
        // Pagamento grande: mínimos (200) + extra (300) vai todo pra primeira.
        let outcome = PayoffSimulator.simulate(debts: [first, second], payment: 500)
        XCTAssertEqual(outcome.months, 3) // 500/mês em 1500 total
    }

    // MARK: Degenerados

    func testEmptyDebtsFinishesImmediately() {
        let outcome = PayoffSimulator.simulate(debts: [], payment: 1000)
        XCTAssertEqual(outcome.months, 0)
        XCTAssertEqual(outcome.interest, 0, accuracy: 0.001)
        XCTAssertFalse(outcome.neverPaysOff)
    }

    func testZeroPaymentYieldsZeroMonths() {
        let outcome = PayoffSimulator.simulate(debts: [debt(remaining: 1000, rate: 12)], payment: 0)
        XCTAssertEqual(outcome.months, 0)
    }
}
