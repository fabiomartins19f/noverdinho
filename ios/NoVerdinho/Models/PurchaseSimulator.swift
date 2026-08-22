import Foundation

// MARK: - Simulador "E se eu comprar?"
//
// Responde, ANTES da compra: quanto isso compromete minha renda por mês,
// quanto meu nível verde cai e quantos meses minhas metas atrasam.
// Tudo determinístico e puro para poder ser testado.

enum PurchaseSimulator {

    struct Input {
        let balance: Double
        let monthlyIncome: Double
        /// Parcelas de dívidas ativas + faturas dos cartões.
        let monthlyCommitments: Double
        let totalDebt: Double
        let goals: [Goal]
    }

    struct GoalImpact: Equatable {
        let title: String
        /// Ritmo atual de aporte da meta.
        let currentPace: Double
        let paceAfterPurchase: Double
        /// Meses para concluir hoje; 0 quando o ritmo atual já não conclui.
        let monthsNow: Int
        /// Meses após a compra; 0 quando a compra zera o ritmo (meta parada).
        let monthsAfter: Int
    }

    struct Result: Equatable {
        enum Verdict { case ok, caution, notRecommended }

        let verdict: Verdict
        let headline: String
        let detail: String

        let newMonthlyCommitment: Double
        let months: Int
        /// Comprometimento da renda após a compra (0–1).
        let commitmentRatioAfter: Double
        let freeAfterPurchase: Double

        let scoreDrop: Int
        let goalImpacts: [GoalImpact]
    }

    // MARK: Simulação

    static func simulate(amount: Double, installments: Int, input: Input) -> Result {
        // Valores inválidos nunca derrubam a simulação.
        let safeAmount = max(amount, 0)
        let financed = installments > 1
        let monthly = financed ? safeAmount / Double(installments) : safeAmount
        let months = financed ? installments : 1

        let commitmentsAfter = input.monthlyCommitments + (financed ? monthly : 0)
        let balanceAfter = input.balance - (financed ? 0 : safeAmount)
        let ratio = input.monthlyIncome > 0 ? commitmentsAfter / input.monthlyIncome : 1

        let scoreNow = healthScore(
            income: input.monthlyIncome,
            commitments: input.monthlyCommitments,
            balance: input.balance,
            debt: input.totalDebt
        )
        let scoreAfter = healthScore(
            income: input.monthlyIncome,
            commitments: commitmentsAfter,
            balance: balanceAfter,
            debt: input.totalDebt + (financed ? safeAmount : 0)
        )

        var impacts: [GoalImpact] = []
        if financed {
            // A parcela sai do bolso comum dos aportes: distribui-se
            // PROPORCIONALMENTE à contribuição de cada meta, em vez de
            // subtrair o valor cheio de todas (que superestimaria o impacto).
            let activeGoals = input.goals.filter {
                $0.monthlyContribution > 0 && $0.target > $0.saved
            }
            let totalContribution = activeGoals.reduce(0.0) { $0 + $1.monthlyContribution }
            if totalContribution > 0 {
                for goal in activeGoals {
                    let remaining = max(goal.target - goal.saved, 0)
                    let share = goal.monthlyContribution / totalContribution
                    let hit = monthly * share
                    let paceAfter = max(goal.monthlyContribution - hit, 0)
                    let now = Int(ceil(remaining / goal.monthlyContribution))
                    let after = paceAfter > 0 ? Int(ceil(remaining / paceAfter)) : 0
                    if paceAfter != goal.monthlyContribution {
                        impacts.append(.init(
                            title: goal.title,
                            currentPace: goal.monthlyContribution,
                            paceAfterPurchase: paceAfter,
                            monthsNow: now,
                            monthsAfter: after
                        ))
                    }
                }
            }
        }

        // Veredito: comprometimento acima de 65% é zona vermelha; folga
        // depois da compra abaixo do piso de R$ 600 vira amarelo.
        let verdict: Result.Verdict
        let headline: String
        let detail: String

        if ratio > 0.65 {
            verdict = .notRecommended
            headline = "Não recomendamos essa compra agora"
            detail = "Seus compromissos passariam a \(Int(ratio * 100))% da sua renda mensal. Nesse nível, qualquer imprevisto vira dívida nova."
        } else if ratio > 0.45 || balanceAfter < 600 || scoreAfter < scoreNow - 8 || impacts.contains(where: { $0.monthsAfter == 0 }) {
            verdict = .caution
            headline = "Dá, mas vai apertar"
            detail = "A compra cabe no orçamento, porém reduz sua margem. Veja os impactos abaixo antes de decidir."
        } else {
            verdict = .ok
            headline = financed ? "Compra compatível com seu momento" : "Compra tranquila"
            detail = financed
                ? "O parcelamento cabe no seu fluxo mensal sem comprometer suas metas."
                : "Pagando à vista você mantém as metas intactas — só o saldo diminui."
        }

        return Result(
            verdict: verdict,
            headline: headline,
            detail: detail,
            newMonthlyCommitment: financed ? monthly : 0,
            months: months,
            commitmentRatioAfter: ratio,
            // Folga acima do piso de segurança de R$ 600 após a compra.
            freeAfterPurchase: max(balanceAfter - 600, 0),
            scoreDrop: max(scoreNow - scoreAfter, 0),
            goalImpacts: impacts
        )
    }

    // MARK: Score de saúde financeira (0–100)

    struct HealthFactor: Equatable {
        let icon: String
        let title: String
        /// Pontos ganhos neste fator.
        let points: Int
        let maxPoints: Int
        let detail: String
    }

    /// Decomposição transparente do score: fundamentos (25) +
    /// comprometimento (35) + liquidez (25) + peso das dívidas (15).
    static func healthFactors(income: Double, commitments: Double, balance: Double, debt: Double) -> [HealthFactor] {
        guard income > 0 else {
            return [
                HealthFactor(icon: "leaf.fill", title: "Fundamentos", points: balance > 0 ? 15 : 5, maxPoints: 25,
                             detail: "Registre sua renda mensal para uma análise completa"),
                HealthFactor(icon: "chart.pie.fill", title: "Comprometimento", points: 0, maxPoints: 35,
                             detail: "Sem renda informada"),
                HealthFactor(icon: "drop.fill", title: "Reserva", points: balance > 0 ? 10 : 0, maxPoints: 25,
                             detail: commitments > 0 ? "Saldo cobre menos de 1 mês de compromissos" : "Sem saldo de segurança"),
                HealthFactor(icon: "creditcard.fill", title: "Dívidas", points: 0, maxPoints: 15,
                             detail: "Sem renda de referência"),
            ]
        }

        let ratio = commitments / income
        var commitmentPenalty = 0.0
        var commitmentDetail: String
        if ratio > 0.65 {
            commitmentPenalty = 35
            commitmentDetail = "\(Int((ratio * 100).rounded()))% da renda comprometida — zona crítica"
        } else if ratio > 0.30 {
            commitmentPenalty = min((ratio - 0.30) / 0.35, 1) * 35
            commitmentDetail = "\(Int((ratio * 100).rounded()))% da renda comprometida"
        } else {
            commitmentDetail = "Só \(Int((ratio * 100).rounded()))% da renda comprometida — folga saudável"
        }

        let runway = commitments > 0 ? balance / commitments : 3
        var liquidityPenalty = 0.0
        var liquidityDetail: String
        if commitments <= 0 || runway >= 3 {
            liquidityDetail = "Saldo cobre 3+ meses de compromissos"
        } else if runway >= 2 {
            liquidityPenalty = 5
            liquidityDetail = String(format: "Saldo cobre %.1f meses de compromissos", runway)
        } else if runway >= 1 {
            liquidityPenalty = 12
            liquidityDetail = String(format: "Saldo cobre só %.1f mês(es) de compromissos", runway)
        } else {
            liquidityPenalty = 25
            liquidityDetail = "Saldo cobre menos de 1 mês de compromissos"
        }

        let debtToAnnualIncome = debt / (income * 12)
        var debtPenalty = 0.0
        var debtDetail: String
        if debt <= 0 {
            debtDetail = "Nenhuma dívida ativa"
        } else if debtToAnnualIncome > 0.6 {
            debtPenalty = 15
            debtDetail = "Dívidas = \(Int((debtToAnnualIncome * 100).rounded()))% da renda anual"
        } else if debtToAnnualIncome > 0.3 {
            debtPenalty = 8
            debtDetail = "Dívidas = \(Int((debtToAnnualIncome * 100).rounded()))% da renda anual"
        } else {
            debtDetail = "Dívidas leves: \(Int((debtToAnnualIncome * 100).rounded()))% da renda anual"
        }

        return [
            HealthFactor(icon: "leaf.fill", title: "Fundamentos", points: 25, maxPoints: 25,
                         detail: "Renda e contas registradas no app"),
            HealthFactor(icon: "chart.pie.fill", title: "Comprometimento",
                         points: Int((35 - commitmentPenalty).rounded()), maxPoints: 35,
                         detail: commitmentDetail),
            HealthFactor(icon: "drop.fill", title: "Reserva",
                         points: Int((25 - liquidityPenalty).rounded()), maxPoints: 25,
                         detail: liquidityDetail),
            HealthFactor(icon: "creditcard.fill", title: "Dívidas",
                         points: Int((15 - debtPenalty).rounded()), maxPoints: 15,
                         detail: debtDetail),
        ]
    }

    /// Score derivado dos fatores — fonte única de verdade com `healthScore`.
    static func healthScoreFromFactors(_ factors: [HealthFactor]) -> Int {
        factors.reduce(0) { $0 + $1.points }
    }

    /// Score total (0–100), derivado da decomposição por fatores.
    static func healthScore(income: Double, commitments: Double, balance: Double, debt: Double) -> Int {
        healthScoreFromFactors(healthFactors(income: income, commitments: commitments, balance: balance, debt: debt))
    }

    /// Fatores com a maior oportunidade de melhoria, em texto de ação.
    static func improvementSuggestions(factors: [HealthFactor], income: Double, commitments: Double) -> [String] {
        var suggestions: [String] = []
        for factor in factors where factor.points < factor.maxPoints {
            switch factor.title {
            case "Comprometimento":
                suggestions.append("Reduza parcelas em \(Money.format(max(commitments - income * 0.30, 100))) para voltar aos 30% seguros")
            case "Reserva":
                suggestions.append("Junte o equivalente a 1 mês de compromissos como reserva")
            case "Dívidas":
                suggestions.append("Quite primeiro a dívida de maior juro (plano avalanche)")
            default:
                continue
            }
        }
        return Array(suggestions.prefix(3))
    }
}

