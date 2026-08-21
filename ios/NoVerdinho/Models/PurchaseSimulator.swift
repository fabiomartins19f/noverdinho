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
        let financed = installments > 1
        let monthly = financed ? amount / Double(installments) : amount
        let months = financed ? installments : 1

        let commitmentsAfter = input.monthlyCommitments + (financed ? monthly : 0)
        let balanceAfter = input.balance - (financed ? 0 : amount)
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
            debt: input.totalDebt + (financed ? amount : 0)
        )

        var impacts: [GoalImpact] = []
        if financed {
            for goal in input.goals where goal.monthlyContribution > 0 {
                let remaining = max(goal.target - goal.saved, 0)
                guard remaining > 0 else { continue }
                let paceAfter = max(goal.monthlyContribution - monthly, 0)
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

    /// Fatores transparentes: comprometimento da renda, liquidez (saldo em
    /// meses de compromissos) e peso da dívida sobre a renda anual.
    static func healthScore(income: Double, commitments: Double, balance: Double, debt: Double) -> Int {
        guard income > 0 else { return balance > 0 ? 50 : 20 }

        var score = 100.0

        let ratio = commitments / income
        if ratio > 0.30 {
            // Até 30% é saudável; dos 30% aos 65% perde até 35 pontos.
            score -= min((ratio - 0.30) / 0.35, 1) * 35
        }

        let runway = commitments > 0 ? balance / commitments : 3
        if runway < 1 {
            score -= 25
        } else if runway < 2 {
            score -= 12
        } else if runway < 3 {
            score -= 5
        }

        let debtToAnnualIncome = debt / (income * 12)
        if debtToAnnualIncome > 0.6 {
            score -= 15
        } else if debtToAnnualIncome > 0.3 {
            score -= 8
        }

        return Int(max(0, min(100, score)).rounded())
    }
}
