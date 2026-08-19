import SwiftUI

// MARK: - TELA 07: Cartões (central + detalhe)

struct CardsView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                SectionTitle("Meus cartões")

                if app.cards.isEmpty {
                    EmptyState(
                        icon: "creditcard.fill",
                        title: "Nenhum cartão",
                        message: "Adicione seu primeiro cartão para acompanhar faturas e importar extratos."
                    )
                    PrimaryButton("Adicionar cartão", icon: "plus") {
                        app.addPreset = .card
                        app.showAddSheet = true
                    }
                }

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
                // Selo com a cor de marca do cartão (estilo Nubank)
                Image(systemName: "creditcard.fill")
                    .font(.system(size: 22))
                    .foregroundStyle(card.brandColor)
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

            // Barra de limite no estilo Nubank: larga, arredondada e com o
            // gradiente da cor da marca do cartão.
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text("Limite comprometido")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    Text("\(Int(card.utilization * 100))%")
                        .font(Fonts.captionStrong(12))
                        .foregroundStyle(card.utilization > 0.8 ? Theme.danger : card.brandColor)
                }
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        Capsule().fill(Theme.surfaceAlt)
                        Capsule()
                            .fill(card.brandGradient)
                            .frame(width: max(8, min(1, card.utilization)) * geo.size.width)
                    }
                }
                .frame(height: 10)
                HStack {
                    Text("\(Money.format(card.used)) de \(Money.format(card.limit))")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    Text("Disponível \(Money.format(card.available))")
                        .font(Fonts.caption(12))
                        .foregroundStyle(card.brandColor)
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
    @Environment(\.dismiss) private var dismiss
    @State private var confirmDelete = false

    /// Versão "viva" do cartão: busca sempre a cópia atual no AppState,
    /// para refletir compras recém-importadas e edições.
    private var liveCard: CreditCard {
        app.cards.first { $0.id == card.id } ?? card
    }

    private var allPurchases: [CardPurchase] {
        // Compras manuais (mock) + compras vindas do extrato importado.
        app.cardPurchases + liveCard.statementItems
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                CardVisualView(card: liveCard)

                AppCard {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Fatura atual")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.textSecondary)
                        Text(Money.format(liveCard.currentInvoice))
                            .font(Fonts.money(28))
                            .foregroundStyle(Theme.text)
                        Text("Vence dia \(liveCard.dueDay)")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                    }
                }

                // Importação de extrato da fatura
                NavigationLink {
                    StatementImportView(card: liveCard)
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "doc.badge.plus")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundStyle(liveCard.brandColor)
                                .frame(width: 38, height: 38)
                                .background(liveCard.brandColor.opacity(0.12))
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Importar extrato da fatura")
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Text("Cole o texto ou importe o PDF — reconhecemos as compras")
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                SectionTitle("Compras e parcelamentos")

                if allPurchases.isEmpty {
                    EmptyState(
                        icon: "bag",
                        title: "Nenhuma compra",
                        message: "As compras da fatura aparecerão aqui. Importe o extrato para começar."
                    )
                }

                ForEach(allPurchases) { purchase in
                    AppCard {
                        HStack(spacing: 12) {
                            // Ícone na cor da marca quando veio do extrato
                            Image(systemName: purchase.fromStatement ? "doc.text.magnifyingglass" : "bag.fill")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(purchase.fromStatement ? liveCard.brandColor : Theme.textSecondary)
                                .frame(width: 36, height: 36)
                                .background(purchase.fromStatement ? liveCard.brandColor.opacity(0.12) : Theme.surfaceAlt)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            VStack(alignment: .leading, spacing: 3) {
                                Text(purchase.name)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                HStack(spacing: 6) {
                                    Text(purchase.installments > 1
                                        ? "\(purchase.paidInstallments)x de \(purchase.installments)x"
                                        : purchase.fromStatement ? "Extrato" : "À vista")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(purchase.fromStatement ? liveCard.brandColor : Theme.textSecondary)
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
                                Text("Mês \(month + 1) • dia \(liveCard.dueDay)")
                                    .font(Fonts.caption())
                                    .foregroundStyle(Theme.textSecondary)
                                Spacer()
                                Text(Money.format(liveCard.currentInvoice * 0.5 + Double(month) * 180))
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(Theme.text)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle(liveCard.name)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    confirmDelete = true
                } label: {
                    Image(systemName: "trash")
                        .foregroundStyle(Theme.danger)
                }
            }
        }
        .confirmationDialog(
            "Remover o cartão \(liveCard.name)?",
            isPresented: $confirmDelete,
            titleVisibility: .visible
        ) {
            Button("Remover cartão", role: .destructive) {
                removeCard()
            }
            Button("Cancelar", role: .cancel) {}
        } message: {
            Text("As compras importadas deste cartão também serão removidas.")
        }
    }

    private func removeCard() {
        Haptics.light()
        app.cards.removeAll { $0.id == card.id }
        dismiss()
    }
}