import Foundation

// MARK: - Simulador de quitação
//
// Estratégia avalanche x bola de neve: paga-se o mínimo de todas as dívidas
// implícito nas parcelas e o aporte extra segue a ordem informada. A simulação
// é determinística e pura — sem dependência de estado do app — para poder ser
// exaustivamente testada.

enum PayoffSimulator {

    struct Outcome: Equatable {
        /// Meses até quitar tudo; 0 quando não há solução ou não há dívidas.
        var months: Int
        /// Juros acumulados durante a simulação.
        var interest: Double
        /// true quando o aporte não sequer cobre os juros mensais: a dívida
        /// nunca se quita e o usuário precisa aumentar o valor.
        var neverPaysOff: Bool
    }

    /// Simula mês a mês. As dívidas devem vir na ordem de prioridade desejada
    /// (avalanche: maior juros primeiro; bola de neve: menor saldo primeiro).
    static func simulate(debts: [Debt], payment: Double, maxMonths: Int = 720) -> Outcome {
        guard payment > 0, !debts.isEmpty else {
            return Outcome(months: 0, interest: 0, neverPaysOff: false)
        }

        var balances = debts.map(\.remainingBalance)
        var interest = 0.0
        var months = 0

        while balances.contains(where: { $0 > 0.01 }) && months < maxMonths {
            let totalAtStart = balances.reduce(0, +)
            months += 1
            var pool = payment

            for i in balances.indices where balances[i] > 0.01 {
                let monthlyRate = debts[i].interestRate / 100 / 12
                let accrued = balances[i] * monthlyRate
                interest += accrued
                balances[i] += accrued

                if pool > 0.01 {
                    let paid = min(balances[i], pool)
                    balances[i] -= paid
                    pool -= paid
                }
            }

            // Se a dívida total não diminuiu no mês, o aporte não cobre os
            // juros: divergência — nunca será quitada.
            if balances.reduce(0, +) >= totalAtStart {
                return Outcome(months: 0, interest: interest, neverPaysOff: true)
            }
        }

        return Outcome(months: months, interest: interest, neverPaysOff: false)
    }
}
