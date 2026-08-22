import Foundation

// MARK: - Motores de engajamento: desafio do mês, conquistas e plano 90 dias
//
// Tudo puro e determinístico — leem apenas dados, nunca persistem.

// MARK: Desafio do mês (#11)

enum MonthlyChallenge {

    struct Challenge: Equatable {
        /// Quanto o usuário se propõe a economizar vs. mês passado.
        let target: Double
        /// Já economizado até agora (despesa do mês passado − despesa atual).
        let saved: Double
        var progress: Double { target > 0 ? min(max(saved / target, 0), 1) : 0 }
        var isComplete: Bool { target > 0 && saved >= target }
    }

    /// Meta = reduzir 10% da despesa do mês passado (mínimo R$ 150).
    static func build(lastMonthExpense: Double, currentMonthExpense: Double) -> Challenge {
        let target = max(lastMonthExpense * 0.10, 150)
        let saved = lastMonthExpense > 0 ? lastMonthExpense - currentMonthExpense : 0
        return Challenge(target: target, saved: max(saved, 0))
    }
}

// MARK: Conquistas reais (#12)

struct Achievement: Equatable, Identifiable {
    enum Id: String { case firstStep, debtShield, reservist, punctual, radarClear, verdinhoLevel }

    let id: Id
    let title: String
    let detail: String
    let icon: String
    let earned: Bool

    static func == (lhs: Achievement, rhs: Achievement) -> Bool { lhs.id == rhs.id && lhs.earned == rhs.earned }
}

enum AchievementsEngine {

    struct Snapshot {
        let hasAnyTransaction: Bool
        let paidOffDebtCount: Int
        let activeExpensiveDebtCount: Int   // juros ≥ 100% a.a.
        let lateDebtCount: Int
        let runwayMonths: Double            // saldo / compromissos mensais
        let radarHasNegativeDay: Bool
        let healthScore: Int?
    }

    static func evaluate(_ s: Snapshot) -> [Achievement] {
        [
            Achievement(id: .firstStep, title: "Primeiro passo",
                        detail: "Registrou sua primeira movimentação",
                        icon: "shoeprints.fill", earned: s.hasAnyTransaction),
            Achievement(id: .debtShield, title: "Blindado contra juros",
                        detail: "Sem dívida acima de 100% ao ano",
                        icon: "shield.fill", earned: s.activeExpensiveDebtCount == 0),
            Achievement(id: .punctual, title: "Pagador pontual",
                        detail: "Nenhuma dívida atrasada",
                        icon: "checkmark.seal.fill", earned: s.lateDebtCount == 0),
            Achievement(id: .reservist, title: "Reservista",
                        detail: "Saldo cobre 1+ mês de compromissos",
                        icon: "drop.fill", earned: s.runwayMonths >= 1),
            Achievement(id: .radarClear, title: "Radar limpo",
                        detail: "30 dias sem risco de saldo negativo",
                        icon: "dot.radiowaves.left.and.right", earned: !s.radarHasNegativeDay),
            Achievement(id: .verdinhoLevel, title: "No Verdinho",
                        detail: "Nível de saúde igual ou acima de 85",
                        icon: "leaf.fill", earned: (s.healthScore ?? 0) >= 85),
        ]
    }
}

// MARK: Plano de 90 dias (#20)

enum NinetyDayPlan {

    struct Step: Equatable, Identifiable {
        enum Status { case done, inProgress, pending }
        let id: Int
        let month: String
        let title: String
        let goal: String
        let status: Status
        /// 0–1, medido com dados reais.
        let progress: Double
    }

    struct Plan {
        let steps: [Step]
        var overallProgress: Double {
            guard !steps.isEmpty else { return 0 }
            return steps.reduce(0.0) { $0 + $1.progress } / Double(steps.count)
        }
    }

    /// Mês 1: organizar (todas as fontes registradas). Mês 2: conter gastos
    /// (mês atual ≤ mês anterior). Mês 3: folga (disponível ≥ reserva de 1 mês).
    static func build(
        registeredDebtAndCards: Int,
        monthExpense: Double,
        lastMonthExpense: Double?,
        availableToSpend: Double,
        monthlyCommitments: Double,
        calendar: Calendar = .current
    ) -> Plan {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM"

        func monthLabel(offset: Int) -> String {
            let date = calendar.date(byAdding: .month, value: offset, to: .now) ?? .now
            return formatter.string(from: date).capitalized
        }

        // Mês 1 — organização: tem dívidas OU cartões OU movimentações suficientes.
        let organizationProgress = registeredDebtAndCards >= 3 ? 1.0 : Double(registeredDebtAndCards) / 3.0
        let step1 = Step(
            id: 1, month: monthLabel(offset: -2),
            title: "Organizar a vida financeira", goal: "Cadastre dívidas, cartões e movimentações",
            status: organizationProgress >= 1 ? .done : .inProgress,
            progress: min(organizationProgress, 1)
        )

        // Mês 2 — conter gastos: comparativo real entre meses.
        let spendingProgress: Double
        if let last = lastMonthExpense, last > 0 {
            spendingProgress = monthExpense <= last * 0.95 ? 1.0 : max(1 - (monthExpense - last * 0.95) / last, 0)
        } else {
            spendingProgress = 0
        }
        let step2 = Step(
            id: 2, month: monthLabel(offset: -1),
            title: "Conter os gastos", goal: "Gastar 5% menos que o mês anterior",
            status: spendingProgress >= 1 ? .done : .inProgress,
            progress: spendingProgress
        )

        // Mês 3 — folga: disponível cobre 1 mês de compromissos.
        let bufferTarget = max(monthlyCommitments, 600)
        let marginProgress = availableToSpend / bufferTarget
        let step3 = Step(
            id: 3, month: monthLabel(offset: 0),
            title: "Construir folga", goal: "Disponível cobrindo 1 mês de compromissos",
            status: marginProgress >= 1 ? .done : .inProgress,
            progress: min(max(marginProgress, 0), 1)
        )

        return Plan(steps: [step1, step2, step3])
    }
}
