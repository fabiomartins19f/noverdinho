import SwiftUI

// MARK: - TELA: Plano de quitação (estratégia avalanche x bola de neve)

struct PayoffPlanView: View {
    @EnvironmentObject var app: AppState
    @State private var strategy = 0
    @State private var budgetText = ""

    private let strategies = ["Avalanche", "Bola de neve"]
    private let strategyDescriptions = [
        "Prioriza a dívida de maior juros. Economiza mais no total.",
        "Prioriza a dívida de menor saldo. Quita rápido e libera caixa.",
    ]

    private var activeDebts: [Debt] {
        app.debts.filter { $0.status != .paidOff }
    }

    private var defaultBudget: Double {
        activeDebts.reduce(0) { $0 + $1.installment }
    }

    private var orderedDebts: [Debt] {
        activeDebts.sorted {
            strategy == 0 ? $0.interestRate > $1.interestRate : $0.remainingBalance < $1.remainingBalance
        }
    }

    /// Simula mês a mês o pagamento de `payment` na ordem dada, capitalizando
    /// juros mensais. Determinística — sem matemática instável.
    private func simulate(payment: Double) -> (months: Int, interest: Double) {
        guard payment > 0 else { return (0, 0) }
        var balances = orderedDebts.map { $0.remainingBalance }
        var interest = 0.0
        var months = 0
        while balances.contains(where: { $0 > 0.01 }) && months < 720 {
            months += 1
            var pool = payment
            for i in balances.indices where balances[i] > 0.01 {
                let monthlyRate = orderedDebts[i].interestRate / 100 / 12
                let accrued = balances[i] * monthlyRate
                interest += accrued
                balances[i] += accrued
                if pool > 0.01 {
                    let paid = min(balances[i], pool)
                    balances[i] -= paid
                    pool -= paid
                }
            }
        }
        return (months, interest)
    }

    private var plan: (months: Int, interest: Double)? {
        let budget = Money.parse(budgetText) ?? 0
        guard budget > 0, !activeDebts.isEmpty else { return nil }
        return simulate(payment: budget)
    }

    private var minimumPlan: (months: Int, interest: Double)? {
        guard !activeDebts.isEmpty else { return nil }
        return simulate(payment: defaultBudget)
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("Estratégia")
                        HStack(spacing: 8) {
                            ForEach(strategies.indices, id: \.self) { index in
                                Button {
                                    withAnimation { strategy = index }
                                } label: {
                                    VStack(spacing: 4) {
                                        Text(strategies[index])
                                            .font(Fonts.captionStrong())
                                            .foregroundStyle(strategy == index ? Theme.background : Theme.text)
                                        Image(systemName: index == 0 ? "arrow.down.right.circle.fill" : "snowflake")
                                            .font(.system(size: 13))
                                            .foregroundStyle(strategy == index ? Theme.background : Theme.textTertiary)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 12)
                                    .background(strategy == index ? Theme.green : Theme.surfaceAlt)
                                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        Text(strategyDescriptions[strategy])
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("Aporte mensal")
                        Text("Quanto você consegue dedicar às dívidas por mês?")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                        CurrencyField(value: $budgetText, placeholder: String(format: "%.2f", defaultBudget))
                        Text("Valor mínimo sugerido: \(Money.format(defaultBudget)) (parcelas atuais)")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textTertiary)
                    }
                }

                if let plan {
                    AppCard {
                        VStack(alignment: .leading, spacing: 14) {
                            SectionTitle("Resultado")
                            VStack(spacing: 10) {
                                IndicatorRow(icon: "calendar", title: "Prazo estimado",
                                             value: plan.months > 1 ? "\(plan.months) meses" : "1 mês",
                                             color: Theme.green)
                                IndicatorRow(icon: "percent", title: "Juros estimados",
                                             value: Money.format(plan.interest), color: Theme.warning)
                                if let minimum = minimumPlan, minimum.interest > plan.interest {
                                    IndicatorRow(icon: "sparkles", title: "Economia vs. parcelas atuais",
                                                 value: Money.format(minimum.interest - plan.interest),
                                                 color: Theme.greenBright)
                                }
                            }
                            if plan.months > 0 {
                                Text("Quitação projetada para \(Calendar.current.date(byAdding: .month, value: plan.months, to: .now)?.formatted(.dateTime.month().year()) ?? "—")")
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                        }
                    }

                    AppCard {
                        VStack(alignment: .leading, spacing: 12) {
                            SectionTitle("Ordem de pagamento")
                            ForEach(Array(orderedDebts.enumerated()), id: \.element.id) { index, debt in
                                HStack(spacing: 12) {
                                    Text("\(index + 1)")
                                        .font(Fonts.captionStrong())
                                        .foregroundStyle(Theme.background)
                                        .frame(width: 26, height: 26)
                                        .background(Theme.green)
                                        .clipShape(Circle())
                                    Image(systemName: debt.type.icon)
                                        .font(.system(size: 14))
                                        .foregroundStyle(Theme.textSecondary)
                                        .frame(width: 26)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(debt.creditor)
                                            .font(Fonts.bodyMedium())
                                            .foregroundStyle(Theme.text)
                                        Text("\(Money.format(debt.remainingBalance)) · \(String(format: "%.0f", debt.interestRate))% a.a.")
                                            .font(Fonts.caption(12))
                                            .foregroundStyle(Theme.textSecondary)
                                    }
                                    Spacer()
                                }
                            }
                        }
                    }
                } else {
                    EmptyState(
                        icon: "chart.line.uptrend.xyaxis",
                        title: "Defina um aporte",
                        message: activeDebts.isEmpty
                            ? "Você não possui dívidas em aberto. 🎉"
                            : "Informe quanto quer pagar por mês para simular a quitação."
                    )
                }
            }
        }
        .navigationTitle("Plano de quitação")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            if budgetText.isEmpty {
                budgetText = String(format: "%.2f", defaultBudget)
            }
        }
    }
}