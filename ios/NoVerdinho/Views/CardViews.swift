import SwiftUI

// MARK: - TELA: Cartões

struct CardsView: View {
    @EnvironmentObject var app: AppState
    @State private var showAddCard = false

    private var totalLimit: Double { app.cards.reduce(0) { $0 + $1.limit } }
    private var totalUsed: Double { app.cards.reduce(0) { $0 + $1.used } }
    private var totalUtilization: Double { totalLimit > 0 ? totalUsed / totalLimit : 0 }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Limite total")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textTertiary)
                                .textCase(.uppercase)
                            Spacer()
                            Badge(text: totalUtilization > 0.8 ? "Alto uso" : "Sob controle",
                                  color: totalUtilization > 0.8 ? Theme.danger : Theme.green)
                        }
                        Text("\(Money.format(totalUsed)) / \(Money.format(totalLimit))")
                            .font(Fonts.headline(22))
                            .foregroundStyle(Theme.text)
                        ProgressBar(progress: totalUtilization, color: Theme.green, height: 8)
                        Text("\(Int(totalUtilization * 100))% do limite utilizado")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                    }
                }

                if app.cards.isEmpty {
                    EmptyState(
                        icon: "creditcard",
                        title: "Nenhum cartão",
                        message: "Adicione seus cartões para acompanhar faturas e limites."
                    )
                }

                ForEach(app.cards) { card in
                    NavigationLink {
                        CardDetailView(card: card)
                    } label: {
                        CardVisual(card: card)
                    }
                    .buttonStyle(.plain)
                }

                SecondaryButton("Adicionar cartão", icon: "plus") {
                    showAddCard = true
                }
            }
        }
        .navigationTitle("Cartões")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showAddCard) {
            AddCardSheet()
                .environmentObject(app)
                .presentationDetents([.height(420)])
        }
    }
}

// MARK: - Visual do cartão

struct CardVisual: View {
    let card: CreditCard

    var body: some View {
        ZStack(alignment: .bottomLeading) {
            RoundedRectangle(cornerRadius: 22, style: .continuous)
                .fill(card.brandGradient)
                .overlay(
                    RoundedRectangle(cornerRadius: 22, style: .continuous)
                        .stroke(.white.opacity(0.18), lineWidth: 1)
                )
                .shadow(color: card.brandColor.opacity(0.35), radius: 14, y: 8)

            Circle()
                .fill(.white.opacity(0.08))
                .frame(width: 220, height: 220)
                .offset(x: 190, y: 90)
            Circle()
                .fill(.white.opacity(0.06))
                .frame(width: 140, height: 140)
                .offset(x: 230, y: -20)

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(card.name.uppercased())
                        .font(.system(size: 16, weight: .heavy, design: .rounded))
                        .foregroundStyle(.white)
                    Spacer()
                    Text("NV")
                        .font(.system(size: 13, weight: .black, design: .rounded))
                        .foregroundStyle(.white.opacity(0.9))
                }
                Text("•••• •••• •••• \(card.lastDigits)")
                    .font(.system(size: 15, weight: .semibold, design: .monospaced))
                    .foregroundStyle(.white.opacity(0.9))
                    .padding(.top, 10)
                HStack(alignment: .bottom) {
                    VStack(alignment: .leading, spacing: 1) {
                        Text("FATURA ATUAL")
                            .font(.system(size: 9, weight: .bold))
                            .foregroundStyle(.white.opacity(0.7))
                        Text(Money.format(card.currentInvoice))
                            .font(.system(size: 18, weight: .bold, design: .rounded))
                            .foregroundStyle(.white)
                    }
                    Spacer()
                    VStack(alignment: .trailing, spacing: 1) {
                        Text("DISPONÍVEL")
                            .font(.system(size: 9, weight: .bold))
                            .foregroundStyle(.white.opacity(0.7))
                        Text(Money.format(card.available))
                            .font(.system(size: 15, weight: .bold, design: .rounded))
                            .foregroundStyle(.white.opacity(0.92))
                    }
                }
                .padding(.top, 14)
            }
            .padding(20)
        }
        .frame(height: 190)
    }
}

// MARK: - TELA: Detalhe do cartão

struct CardDetailView: View {
    @EnvironmentObject var app: AppState
    let card: CreditCard

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            SectionTitle("Fatura atual")
                            Spacer()
                            Badge(text: card.currentInvoice > 0 ? "Aberta" : "Fechada",
                                  color: card.currentInvoice > 0 ? Theme.warning : Theme.green)
                        }
                        Text(Money.format(card.currentInvoice))
                            .font(Fonts.money(32))
                            .foregroundStyle(Theme.text)
                        HStack {
                            Text("Vence \(app.invoiceDate(day: card.dueDay).formatted(.dateTime.day().month()))")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textSecondary)
                            Spacer()
                            Text("Limite \(Money.format(card.limit))")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textSecondary)
                        }
                        ProgressBar(progress: card.utilization, color: card.utilization > 0.8 ? Theme.danger : Theme.green, height: 8)
                        Text("\(Int(card.utilization * 100))% do limite · \(Money.format(card.available)) disponíveis")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                    }
                }

                if card.statementItems.isEmpty {
                    EmptyState(
                        icon: "cart",
                        title: "Nenhuma compra",
                        message: "Importe seu extrato para ver as compras desta fatura."
                    )
                }

                ForEach(card.statementItems.sorted { $0.date > $1.date }) { purchase in
                    AppCard {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack {
                                Text(purchase.name)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Spacer()
                                Text(Money.format(purchase.amount))
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(Theme.text)
                            }
                            HStack(spacing: 6) {
                                Text(purchase.date.formatted(.dateTime.day().month().year()))
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textTertiary)
                                if purchase.installments > 1 {
                                    Text("·")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textTertiary)
                                    Text("\(purchase.paidInstallments)/\(purchase.installments) parcelas")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textTertiary)
                                }
                                Spacer()
                                if purchase.installments > 1 {
                                    ProgressBar(progress: Double(purchase.paidInstallments) / Double(purchase.installments),
                                                color: Theme.green, height: 4)
                                        .frame(width: 70)
                                }
                            }
                        }
                    }
                }

                if card.statementItems.contains(where: { $0.installments > $0.paidInstallments }) {
                    AppCard {
                        VStack(alignment: .leading, spacing: 12) {
                            SectionTitle("Próximas faturas")
                            ForEach(nextInvoiceItems) { row in
                                IndicatorRow(icon: "creditcard.fill", title: row.name,
                                             value: Money.format(row.value), color: Theme.info)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle(card.name)
        .navigationBarTitleDisplayMode(.inline)
    }

    /// Parcelas restantes consolidadas por compra.
    private var nextInvoiceRows: [(name: String, value: Double)] {
        card.statementItems
            .filter { $0.installments > $0.paidInstallments }
            .map { purchase in
                let remaining = Double(purchase.installments - purchase.paidInstallments)
                let monthly = purchase.amount / Double(purchase.installments)
                return (purchase.name, monthly * remaining)
            }
    }

    /// Parcelas restantes consolidadas por compra (com id estável).
    private var nextInvoiceItems: [NextInvoiceItem] {
        nextInvoiceRows.enumerated().map { index, row in
            NextInvoiceItem(id: index, name: row.name, value: row.value)
        }
    }

    private struct NextInvoiceItem: Identifiable {
        let id: Int
        let name: String
        let value: Double
    }
}

// MARK: - Sheet: adicionar cartão

struct AddCardSheet: View {
    @EnvironmentObject var app: AppState
    @Environment(\.dismiss) private var dismiss
    /// Quando usado dentro do modal "+", substitui o dismiss nativo.
    var onClose: (() -> Void)?
    @State private var name = ""
    @State private var institution = ""
    @State private var limit = ""
    @State private var dueDay = 10

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Adicionar cartão")
                .font(Fonts.headline(20))
                .foregroundStyle(Theme.text)

            FormField("Nome do cartão", text: $name, icon: "creditcard.fill")
            FormField("Instituição", text: $institution, icon: "building.columns.fill")
            CurrencyField(value: $limit, placeholder: "Limite do cartão")

            HStack {
                Text("Vencimento")
                    .font(Fonts.body())
                    .foregroundStyle(Theme.text)
                Spacer()
                Picker("Dia", selection: $dueDay) {
                    ForEach(1...28, id: \.self) { day in
                        Text("\(day)").tag(day)
                    }
                }
                .pickerStyle(.menu)
                .tint(Theme.green)
            }
            .padding(12)
            .background(Theme.surfaceAlt)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

            Spacer()

            PrimaryButton("Adicionar", icon: "plus") {
                let card = CreditCard(
                    name: name.trimmingCharacters(in: .whitespaces),
                    institution: institution.trimmingCharacters(in: .whitespaces),
                    lastDigits: "0000",
                    limit: Money.parse(limit) ?? 0,
                    used: 0,
                    currentInvoice: 0,
                    dueDay: dueDay
                )
                app.cards.append(card)
                Haptics.success()
                if let onClose {
                    onClose()
                } else {
                    dismiss()
                }
            }
            .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty || (Money.parse(limit) ?? 0) <= 0)
            .opacity(name.isEmpty ? 0.5 : 1)
        }
        .padding(24)
    }
}