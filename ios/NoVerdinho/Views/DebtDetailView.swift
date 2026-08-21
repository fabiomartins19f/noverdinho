import SwiftUI

// MARK: - TELA: Detalhe da dívida

struct DebtDetailView: View {
    @EnvironmentObject var app: AppState
    let debtID: UUID
    @State private var showPaymentSheet = false

    /// Dívida viva no estado — o pagamento substitui o struct, então
    /// nunca use a cópia recebida na navegação.
    private var debt: Debt? {
        app.debts.first { $0.id == debtID }
    }

    var body: some View {
        if let debt {
            debtContent(debt)
        } else {
            EmptyState(
                icon: "banknote.fill",
                title: "Dívida não encontrada",
                message: "Ela pode ter sido quitada ou removida."
            )
        }
    }

    @ViewBuilder
    private func debtContent(_ debt: Debt) -> some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        HStack(spacing: 12) {
                            Image(systemName: debt.type.icon)
                                .font(.system(size: 18, weight: .semibold))
                                .foregroundStyle(Theme.green)
                                .frame(width: 44, height: 44)
                                .background(Theme.soft(Theme.green))
                                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                            VStack(alignment: .leading, spacing: 2) {
                                Text(debt.creditor)
                                    .font(Fonts.headline(18))
                                    .foregroundStyle(Theme.text)
                                Text(debt.type.rawValue)
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            Spacer()
                            Badge(text: debt.status.label, color: debt.status.color)
                        }

                        HStack(alignment: .lastTextBaseline) {
                            Text(Money.format(debt.remainingBalance))
                                .font(Fonts.money(32))
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Text("\(Int(debt.progress * 100))% quitado")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.green)
                        }

                        ProgressBar(progress: debt.progress, color: Theme.green, height: 8)

                        HStack {
                            Text("\(debt.paidInstallments)/\(debt.installmentCount) parcelas")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textSecondary)
                            Spacer()
                            Text("Vence \(debt.dueDate.formatted(.dateTime.day().month()))")
                                .font(Fonts.caption(12))
                                .foregroundStyle(debt.status == .overdue ? Theme.danger : Theme.textSecondary)
                        }
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("Informações")
                        VStack(spacing: 10) {
                            IndicatorRow(icon: "banknote.fill", title: "Valor original",
                                         value: Money.format(debt.originalAmount), color: Theme.textSecondary)
                            IndicatorRow(icon: "percent", title: "Juros",
                                         value: debt.interestRate > 0
                                            ? "\(String(format: "%.1f", debt.interestRate))% a.a."
                                            : "Sem juros",
                                         color: debt.interestRate > 0 ? Theme.danger : Theme.green)
                            IndicatorRow(icon: "calendar.badge.clock", title: "Parcela mensal",
                                         value: Money.format(debt.installment), color: Theme.info)
                            IndicatorRow(icon: "list.number", title: "Prioridade",
                                         value: debt.priority.rawValue, color: debt.priority.color)
                        }
                    }
                }

                VStack(spacing: 10) {
                    PrimaryButton(debt.status == .paidOff ? "Dívida quitada 🎉" : "Registrar pagamento",
                                  icon: debt.status == .paidOff ? "checkmark.seal.fill" : "banknote.fill") {
                        showPaymentSheet = true
                    }
                    .disabled(debt.status == .paidOff)
                    .opacity(debt.status == .paidOff ? 0.6 : 1)

                    if debt.status != .paidOff {
                        NavigationLink {
                            PayoffPlanView()
                        } label: {
                            HStack(spacing: 6) {
                                Image(systemName: "chart.line.uptrend.xyaxis")
                                    .font(.system(size: 14, weight: .semibold))
                                Text("Ver plano de quitação")
                                    .font(Fonts.bodyMedium())
                            }
                            .foregroundStyle(Theme.green)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 13)
                            .background(Theme.soft(Theme.green))
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
        }
        .navigationTitle(debt.creditor)
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showPaymentSheet) {
            PaymentSheet(debt: debt)
                .environmentObject(app)
                .presentationDetents([.height(300)])
        }
    }
}

// MARK: - Sheet: registrar pagamento

struct PaymentSheet: View {
    @EnvironmentObject var app: AppState
    @Environment(\.dismiss) private var dismiss
    let debt: Debt
    @State private var amount = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Registrar pagamento")
                .font(Fonts.headline(20))
                .foregroundStyle(Theme.text)

            CurrencyField(value: $amount, placeholder: "0,00")

            HStack {
                Button("Valor da parcela") {
                    amount = String(format: "%.2f", debt.installment)
                }
                .font(Fonts.captionStrong())
                .foregroundStyle(Theme.green)
                Button("Quitar dívida") {
                    amount = String(format: "%.2f", debt.remainingBalance)
                }
                .font(Fonts.captionStrong())
                .foregroundStyle(Theme.warning)
            }

            Spacer()

            PrimaryButton("Confirmar pagamento", icon: "checkmark.circle.fill") {
                let value = Money.parse(amount) ?? 0
                guard value > 0 else { return }
                app.balance -= value
                app.recordPayment(value, on: debt)
                Haptics.success()
                dismiss()
            }
            .disabled((Money.parse(amount) ?? 0) <= 0)
            .opacity((Money.parse(amount) ?? 0) > 0 ? 1 : 0.5)
        }
        .padding(24)
    }
}
