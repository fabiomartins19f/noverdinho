import SwiftUI

// MARK: - TELA 07: Cartões (central + detalhe)

struct CardsView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                SectionTitle("Meus cartões")

                ForEach(app.cards) { card in
                    NavigationLink {
                        CardDetailView(card: card)
                    } label: {
                        CardVisualView(card: card)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .navigationTitle("Cartões")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct CardVisualView: View {
    let card: CreditCard

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(card.name)
                        .font(Fonts.bodyMedium())
                        .foregroundStyle(Theme.text)
                    Text(card.institution)
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                }
                Spacer()
                Image(systemName: "creditcard.fill")
                    .font(.system(size: 22))
                    .foregroundStyle(Theme.green)
            }

            HStack {
                VStack(alignment: .leading, spacing: 3) {
                    Text("Fatura atual")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                    Text(Money.format(card.currentInvoice))
                        .font(Fonts.headline(20))
                        .foregroundStyle(Theme.text)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 3) {
                    Text("Vence dia \(card.dueDay)")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                    Text("•••• \(card.lastDigits)")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textTertiary)
                }
            }

            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text("Limite comprometido")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    Text("\(Int(card.utilization * 100))%")
                        .font(Fonts.captionStrong(12))
                        .foregroundStyle(card.utilization > 0.8 ? Theme.danger : card.utilization > 0.6 ? Theme.warning : Theme.green)
                }
                ProgressBar(progress: card.utilization, color: card.utilization > 0.8 ? Theme.danger : card.utilization > 0.6 ? Theme.warning : Theme.green)
                HStack {
                    Text("\(Money.format(card.used)) de \(Money.format(card.limit))")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    Text("Disponível \(Money.format(card.available))")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.green)
                }
            }
        }
        .padding(16)
        .background(
            LinearGradient(colors: [Theme.surfaceElevated, Theme.surface],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
        )
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(Theme.border, lineWidth: 1)
        )
    }
}

struct CardDetailView: View {
    let card: CreditCard
    @EnvironmentObject var app: AppState

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                CardVisualView(card: card)

                AppCard {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Fatura atual")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.textSecondary)
                        Text(Money.format(card.currentInvoice))
                            .font(Fonts.money(28))
                            .foregroundStyle(Theme.text)
                        Text("Vence dia \(card.dueDay)")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                    }
                }

                SectionTitle("Compras e parcelamentos")

                ForEach(app.cardPurchases) { purchase in
                    AppCard {
                        HStack(spacing: 12) {
                            VStack(alignment: .leading, spacing: 3) {
                                Text(purchase.name)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                HStack(spacing: 6) {
                                    Text(purchase.installments > 1
                                        ? "\(purchase.paidInstallments)x de \(purchase.installments)x"
                                        : "À vista")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textSecondary)
                                    Text(purchase.date.formatted(.dateTime.day().month()))
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textTertiary)
                                }
                                if purchase.installments > 1 {
                                    ProgressBar(progress: Double(purchase.paidInstallments) / Double(purchase.installments),
                                                color: Theme.info, height: 5)
                                        .padding(.top, 4)
                                }
                            }
                            Spacer()
                            Text(Money.format(purchase.amount))
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.text)
                        }
                    }
                }

                SectionTitle("Próximas faturas")
                AppCard {
                    VStack(spacing: 12) {
                        ForEach(1...3, id: \.self) { month in
                            HStack {
                                Text("Mês \(month + 1) • dia \(card.dueDay)")
                                    .font(Fonts.caption())
                                    .foregroundStyle(Theme.textSecondary)
                                Spacer()
                                Text(Money.format(card.currentInvoice * 0.5 + Double(month) * 180))
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(Theme.text)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle(card.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}