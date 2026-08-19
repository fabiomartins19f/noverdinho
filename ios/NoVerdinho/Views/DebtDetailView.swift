import SwiftUI

// MARK: - TELA 05: Detalhe da Dívida

struct DebtDetailView: View {
    let debt: Debt
    @EnvironmentObject var app: AppState
    @State private var showPayoffPlan = false

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 20) {
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack(spacing: 12) {
                            Image(systemName: debt.type.icon)
                                .font(.system(size: 20, weight: .semibold))
                                .foregroundStyle(Theme.green)
                                .frame(width: 46, height: 46)
                                .background(Theme.greenSoft())
                                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                            VStack(alignment: .leading, spacing: 2) {
                                Text(debt.type.rawValue)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Text(debt.creditor)
                                    .font(Fonts.caption())
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            Spacer()
                            Badge(text: debt.status == .overdue ? "Atrasada" : debt.status == .paidOff ? "Quitada" : "Em dia",
                                  color: debt.status == .overdue ? Theme.danger : debt.status == .paidOff ? Theme.green : Theme.info)
                        }
                        Text(Money.format(debt.remainingBalance))
                            .font(Fonts.money(32))
                            .foregroundStyle(Theme.text)
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Text("Progresso de quitação")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.textSecondary)
                            Spacer()
                            Text("\(Int(debt.progress * 100))%")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.green)
                        }
                        ProgressBar(progress: debt.progress, color: Theme.green, height: 12)
                        HStack {
                            Text("Pago \(Money.format(debt.paidAmount))")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textSecondary)
                            Spacer()
                            Text("Falta \(Money.format(debt.remainingBalance))")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textSecondary)
                        }
                    }
                }

                AppCard {
                    VStack(spacing: 14) {
                        infoRow("Valor original", Money.format(debt.originalAmount))
                        Divider().overlay(Theme.border)
                        infoRow("Valor já pago", Money.format(debt.paidAmount), color: Theme.green)
                        Divider().overlay(Theme.border)
                        infoRow("Saldo restante", Money.format(debt.remainingBalance), color: Theme.warning)
                        Divider().overlay(Theme.border)
                        infoRow("Juros", "\(String(format: "%.0f", debt.interestRate))% a.a.", color: debt.interestRate > 100 ? Theme.danger : Theme.text)
                        Divider().overlay(Theme.border)
                        infoRow("Parcela atual", "\(Money.format(debt.installment)) • \(debt.paidInstallments)/\(debt.installmentCount)")
                        Divider().overlay(Theme.border)
                        infoRow("Vencimento", debt.dueDate.formatted(.dateTime.day().month().year()))
                    }
                }

                SectionTitle("Histórico de pagamentos")
                if debt.paidInstallments == 0 {
                    EmptyState(
                        icon: "clock.arrow.circlepath",
                        title: "Nenhum pagamento ainda",
                        message: "Os pagamentos aparecerão aqui conforme você quitar as parcelas."
                    )
                } else {
                    AppCard {
                        VStack(spacing: 14) {
                            ForEach(paymentHistory, id: \.self) { installmentNumber in
                                paymentRow(installmentNumber: installmentNumber)
                                if installmentNumber != paymentHistory.last {
                                    Divider().overlay(Theme.border)
                                }
                            }
                        }
                    }
                }

                PrimaryButton("Planejar quitação", icon: "chart.line.uptrend.xyaxis") {
                    showPayoffPlan = true
                }
            }
        }
        .navigationTitle(debt.creditor)
        .navigationBarTitleDisplayMode(.inline)
        .fullScreenCover(isPresented: $showPayoffPlan) {
            PayoffPlanView(debt: debt)
        }
    }

    private func infoRow(_ title: String, _ value: String, color: Color = Theme.text) -> some View {
        HStack {
            Text(title)
                .font(Fonts.caption())
                .foregroundStyle(Theme.textSecondary)
            Spacer()
            Text(value)
                .font(Fonts.captionStrong())
                .foregroundStyle(color)
                .multilineTextAlignment(.trailing)
        }
    }

    /// Números das parcelas pagas, da mais recente para a mais antiga
    /// (mostra até as 4 últimas).
    private var paymentHistory: [Int] {
        let last = debt.paidInstallments
        guard last > 0 else { return [] }
        return Array((max(1, last - 3)...last).reversed())
    }

    private func paymentRow(installmentNumber: Int) -> some View {
        HStack(spacing: 12) {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 18))
                .foregroundStyle(Theme.green)
            VStack(alignment: .leading, spacing: 2) {
                Text("Parcela \(installmentNumber)")
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
                Text(Calendar.current.date(byAdding: .month, value: installmentNumber - debt.paidInstallments, to: .now)?
                    .formatted(.dateTime.day().month().year()) ?? "")
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.textSecondary)
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 2) {
                Text(Money.format(debt.installment))
                    .font(Fonts.captionStrong())
                    .foregroundStyle(Theme.text)
                Text("Pago")
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.green)
            }
        }
    }
}