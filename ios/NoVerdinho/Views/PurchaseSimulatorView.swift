import SwiftUI

// MARK: - TELA: "E se eu comprar?" — simulador de decisão antes da compra

struct PurchaseSimulatorView: View {
    @EnvironmentObject var app: AppState
    @State private var amount = ""
    @State private var financed = true
    @State private var installments = 10

    private var value: Double { Money.parse(amount) ?? 0 }

    private var result: PurchaseSimulator.Result? {
        guard value > 0 else { return nil }
        return PurchaseSimulator.simulate(
            amount: value,
            installments: financed ? installments : 1,
            input: .init(
                balance: app.balance,
                monthlyIncome: max(app.monthIncome, 1),
                monthlyCommitments: app.monthlyCommitments,
                totalDebt: app.totalDebt,
                goals: app.goals
            )
        )
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("A compra")
                        CurrencyField(value: $amount, placeholder: "Valor da compra")

                        Picker("Forma de pagamento", selection: $financed) {
                            Text("À vista").tag(false)
                            Text("Parcelado").tag(true)
                        }
                        .pickerStyle(.segmented)
                        .tint(Theme.green)

                        if financed {
                            HStack {
                                Text("Parcelas")
                                    .font(Fonts.body())
                                    .foregroundStyle(Theme.text)
                                Spacer()
                                Stepper("\(installments)x", value: $installments, in: 2...24)
                                    .tint(Theme.green)
                                    .font(Fonts.bodyMedium())
                            }
                            .padding(12)
                            .background(Theme.surfaceAlt)
                            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                        }
                    }
                }

                if let result {
                    verdictCard(result)
                    budgetCard(result)

                    if !result.goalImpacts.isEmpty {
                        goalsCard(result)
                    }

                    howWeCalculate
                } else {
                    EmptyState(
                        icon: "cart.circle.fill",
                        title: "Simule antes de comprar",
                        message: "Informe o valor e veja o impacto no seu nível verde, no orçamento e nas suas metas."
                    )
                }
            }
        }
        .navigationTitle("E se eu comprar?")
        .navigationBarTitleDisplayMode(.inline)
    }

    // MARK: Veredito

    @ViewBuilder
    private func verdictCard(_ result: PurchaseSimulator.Result) -> some View {
        let color: Color = switch result.verdict {
        case .ok: Theme.green
        case .caution: Theme.warning
        case .notRecommended: Theme.danger
        }

        AppCard {
            HStack(alignment: .top, spacing: 12) {
                Image(systemName: icon(result.verdict))
                    .font(.system(size: 24))
                    .foregroundStyle(color)
                VStack(alignment: .leading, spacing: 4) {
                    Text(result.headline)
                        .font(Fonts.headline(17))
                        .foregroundStyle(Theme.text)
                    Text(result.detail)
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
        }
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .stroke(color.opacity(0.45), lineWidth: 1.5)
        )
    }

    private func icon(_ verdict: PurchaseSimulator.Result.Verdict) -> String {
        switch verdict {
        case .ok: "checkmark.seal.fill"
        case .caution: "exclamationmark.triangle.fill"
        case .notRecommended: "xmark.seal.fill"
        }
    }

    // MARK: Impacto no orçamento e no nível

    private func budgetCard(_ result: PurchaseSimulator.Result) -> some View {
        AppCard {
            VStack(alignment: .leading, spacing: 14) {
                SectionTitle("Impacto")

                if result.newMonthlyCommitment > 0 {
                    IndicatorRow(icon: "calendar.badge.clock",
                                 title: "Novo compromisso mensal",
                                 value: "\(Money.format(result.newMonthlyCommitment))/mês por \(result.months) meses",
                                 color: Theme.warning)
                }

                IndicatorRow(icon: "chart.pie.fill",
                             title: "Renda comprometida após a compra",
                             value: "\(Int(result.commitmentRatioAfter * 100))%",
                             color: result.commitmentRatioAfter > 0.65 ? Theme.danger : (result.commitmentRatioAfter > 0.45 ? Theme.warning : Theme.green))

                IndicatorRow(icon: "banknote.fill",
                             title: "Folga acima do piso de R$ 600",
                             value: Money.format(result.freeAfterPurchase),
                             color: result.freeAfterPurchase <= 0 ? Theme.danger : Theme.greenBright)

                Divider().overlay(Theme.border)

                HStack(spacing: 18) {
                    VerdinhoScore(score: levelNowForDisplay(result))
                    VStack(alignment: .leading, spacing: 4) {
                        Text(result.scoreDrop == 0
                             ? "Seu nível não é afetado"
                             : "Seu nível cai \(result.scoreDrop) pontos")
                            .font(Fonts.bodyMedium())
                            .foregroundStyle(result.scoreDrop == 0 ? Theme.green : Theme.danger)
                        Text("estimativa pelo motor do No Verdinho")
                            .font(Fonts.caption(11))
                            .foregroundStyle(Theme.textTertiary)
                    }
                    Spacer()
                }
            }
        }
    }

    /// O score absoluto do dashboard vem da sua própria evolução; aqui
    /// mostramos a queda relativa projetada pelo mesmo fator de saúde.
    private func levelNowForDisplay(_ result: PurchaseSimulator.Result) -> Int {
        max(app.level.score - result.scoreDrop, 0)
    }

    // MARK: Impacto nas metas

    private func goalsCard(_ result: PurchaseSimulator.Result) -> some View {
        AppCard {
            VStack(alignment: .leading, spacing: 12) {
                SectionTitle("Suas metas")
                ForEach(Array(result.goalImpacts.enumerated()), id: \.element.title) { _, impact in
                    HStack(spacing: 10) {
                        Image(systemName: "target")
                            .font(.system(size: 13))
                            .foregroundStyle(impact.monthsAfter == 0 ? Theme.danger : Theme.warning)
                            .frame(width: 22)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(impact.title)
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Text(goalMessage(impact))
                                .font(Fonts.caption(12))
                                .foregroundStyle(impact.monthsAfter == 0 ? Theme.danger : Theme.textSecondary)
                        }
                        Spacer()
                    }
                }
            }
        }
    }

    private func goalMessage(_ impact: PurchaseSimulator.GoalImpact) -> String {
        if impact.monthsAfter == 0 {
            return "a parcela consome todo o aporte mensal — a meta para"
        }
        let extra = impact.monthsAfter - impact.monthsNow
        if extra <= 0 {
            return "segue no mesmo ritmo (\(impact.monthsAfter) meses)"
        }
        return "\(impact.monthsNow) → \(impact.monthsAfter) meses (+\(extra))"
    }

    // MARK: Transparência

    private var howWeCalculate: some View {
        AppCard {
            VStack(alignment: .leading, spacing: 8) {
                SectionTitle("Como calculamos")
                Text("Comparamos seu comprometimento de renda (parcelas + faturas), sua liquidez (saldo em meses de compromissos) e o peso das dívidas sobre a renda anual — antes e depois da compra. À vista, as metas ficam intactas; parcelado, cada parcela reduz o aporte disponível para elas.")
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
    }
}
