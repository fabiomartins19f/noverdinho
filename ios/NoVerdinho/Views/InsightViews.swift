import SwiftUI

// MARK: - TELA: Posso gastar?

struct CanISpendView: View {
    @EnvironmentObject var app: AppState
    @State private var amount = ""
    @State private var result: CanISpendResult?

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("Posso gastar?")
                        Text("Descubra se esse gasto cabe no seu mês sem atrapalhar suas metas.")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                            .fixedSize(horizontal: false, vertical: true)
                        CurrencyField(value: $amount, placeholder: "Valor do gasto")
                        PrimaryButton("Analisar", icon: "magnifyingglass") {
                            result = app.canISpend(Money.parse(amount) ?? 0)
                        }
                        .disabled((Money.parse(amount) ?? 0) <= 0)
                        .opacity((Money.parse(amount) ?? 0) > 0 ? 1 : 0.5)
                    }
                }

                if let result {
                    analysisCard(result)
                }

                NavigationLink {
                    PurchaseSimulatorView()
                } label: {
                    HStack(spacing: 12) {
                        Image(systemName: "cart.circle.fill")
                            .font(.system(size: 20))
                            .foregroundStyle(Theme.greenBright)
                        VStack(alignment: .leading, spacing: 2) {
                            Text("E se eu comprar?")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Text("Simule parcelas, nível verde e atraso nas metas")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textSecondary)
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundStyle(Theme.textTertiary)
                    }
                    .padding(16)
                    .background(Theme.soft(Theme.green))
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                }
                .buttonStyle(.plain)

                AppCard {
                    VStack(alignment: .leading, spacing: 10) {
                        SectionTitle("Como calculamos")
                        VStack(spacing: 8) {
                            IndicatorRow(icon: "arrow.down.left.circle.fill", title: "Saldo disponível",
                                         value: app.balanceHidden ? "R$ ••••••" : Money.format(app.balance), color: Theme.green)
                            IndicatorRow(icon: "shippingbox.fill", title: "Compromissos deste mês",
                                         value: Money.format(monthlyCommitments), color: Theme.warning)
                            IndicatorRow(icon: "banknote.fill", title: "Dívidas em aberto",
                                         value: Money.format(app.totalDebt), color: Theme.danger)
                            IndicatorRow(icon: "banknote.fill", title: "Disponível para gastar",
                                         value: app.balanceHidden ? "R$ ••••••" : Money.format(app.availableToSpend), color: Theme.greenBright)
                        }
                    }
                }
            }
        }
        .navigationTitle("Posso gastar?")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var monthlyCommitments: Double {
        let installments = app.debts
            .filter { $0.status != .paidOff }
            .reduce(0) { $0 + $1.installment }
        let invoices = app.cards.reduce(0) { $0 + $1.currentInvoice }
        return installments + invoices
    }

    @ViewBuilder
    private func analysisCard(_ result: CanISpendResult) -> some View {
        let value = Money.parse(amount) ?? 0
        VStack(spacing: 12) {
            Image(systemName: result.icon)
                .font(.system(size: 44, weight: .light))
                .foregroundStyle(result.color)
            Text(result.verdict.rawValue)
                .font(Fonts.title(22))
                .foregroundStyle(result.color)
            Text(result.reason)
                .font(Fonts.caption())
                .foregroundStyle(Theme.textSecondary)
                .multilineTextAlignment(.center)
                .fixedSize(horizontal: false, vertical: true)
            Divider().overlay(Theme.border)
            IndicatorRow(icon: "wallet.bifold.fill", title: "Saldo projetado",
                         value: Money.format(app.balance - value), color: Theme.info)
        }
        .frame(maxWidth: .infinity)
        .padding(18)
        .background(result.color.opacity(0.07))
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(result.color.opacity(0.35), lineWidth: 1)
        )
    }
}

// MARK: - TELA: Inteligência financeira

struct IntelligenceView: View {
    @EnvironmentObject var app: AppState

    /// Regras determinísticas geradas a partir dos dados do usuário —
    /// prontas para serem substituídas pelo motor do backend no futuro.
    private var insights: [InsightCard] {
        var list: [InsightCard] = []

        if let overdue = app.debts.first(where: { $0.status == .overdue }) {
            list.append(.init(
                title: "Conta atrasada",
                message: "\(overdue.creditor) está atrasada há \(overdue.dueDate.formatted(.dateTime.day().month())). Quite o quanto antes para evitar encargos.",
                action: "Ver dívida",
                tone: .warning
            ))
        }

        if let highInterest = app.debts
            .filter({ $0.status != .paidOff })
            .max(by: { $0.interestRate < $1.interestRate }),
           highInterest.interestRate >= 100 {
            list.append(.init(
                title: "Juros elevados",
                message: "\(highInterest.creditor) cobra \(String(format: "%.0f", highInterest.interestRate))% a.a. Priorize-a na sua estratégia de quitação.",
                action: "Ver plano",
                tone: .action
            ))
        }

        for card in app.cards where card.utilization >= 0.8 {
            list.append(.init(
                title: "Cartão perto do limite",
                message: "\(card.name) está com \(Int(card.utilization * 100))% do limite utilizado (\(Money.format(card.available)) livres).",
                action: nil,
                tone: .warning
            ))
        }

        for category in app.budget where category.limit > 0 && category.progress > 1 {
            list.append(.init(
                title: "Orçamento estourado",
                message: "\(category.name) gastou \(Money.format(category.spent)) de \(Money.format(category.limit)) — \(Int((category.progress - 1) * 100))% acima do limite.",
                action: "Revisar",
                tone: .warning
            ))
        }

        let last = app.reports[2].values
        if last.count >= 2, last[last.count - 1] < last[last.count - 2] {
            let drop = last[last.count - 2] - last[last.count - 1]
            list.append(.init(
                title: "Dívidas em queda",
                message: "Suas dívidas caíram \(Money.format(drop)) no último período. Continue assim!",
                action: nil,
                tone: .positive
            ))
        }

        let expense = app.reports[1].values
        if expense.count >= 2, expense[expense.count - 1] < expense[expense.count - 2] {
            list.append(.init(
                title: "Gastos controlados",
                message: "Suas despesas do mês ficaram abaixo do mês anterior. Bom trabalho.",
                action: nil,
                tone: .positive
            ))
        }

        return list
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 16) {
                if insights.isEmpty {
                    EmptyState(
                        icon: "sparkles",
                        title: "Tudo sob controle",
                        message: "Nenhum alerta no momento. Continue organizando suas finanças."
                    )
                }

                ForEach(insights) { insight in
                    AppCard {
                        HStack(alignment: .top, spacing: 12) {
                            Image(systemName: insight.tone == .positive
                                  ? "checkmark.seal.fill"
                                  : insight.tone == .action ? "lightbulb.fill" : "exclamationmark.triangle.fill")
                                .font(.system(size: 16))
                                .foregroundStyle(toneColor(insight.tone))
                                .frame(width: 36, height: 36)
                                .background(Theme.soft(toneColor(insight.tone)))
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            VStack(alignment: .leading, spacing: 4) {
                                Text(insight.title)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Text(insight.message)
                                    .font(Fonts.caption())
                                    .foregroundStyle(Theme.textSecondary)
                                    .fixedSize(horizontal: false, vertical: true)
                                if let action = insight.action {
                                    Button(action) {}
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(Theme.green)
                                    .padding(.top, 2)
                                }
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Inteligência")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func toneColor(_ tone: InsightCard.Tone) -> Color {
        switch tone {
        case .positive: Theme.green
        case .warning: Theme.warning
        case .action: Theme.greenBright
        }
    }
}