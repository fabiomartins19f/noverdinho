import SwiftUI
import UniformTypeIdentifiers
import PDFKit

// MARK: - Importação de extrato da fatura
//
// Fluxo: o usuário cola o texto do extrato OU importa um PDF (via PDFKit).
// O StatementParser reconhece as linhas e o app sugere o cartão pelo nome.
// Depois de confirmar, as compras entram no detalhe do cartão.

struct StatementImportView: View {
    let card: CreditCard
    @EnvironmentObject var app: AppState
    @Environment(\.dismiss) private var dismiss

    @State private var pastedText = ""
    @State private var showPDFImporter = false
    @State private var pdfFileName: String?
    @State private var result: StatementParseResult?
    @State private var selectedCardName: String
    @State private var showImportConfirmation = false
    @State private var importMessage = ""

    init(card: CreditCard) {
        self.card = card
        _selectedCardName = State(initialValue: card.name)
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 20) {
                header
                sourceTabs
                inputArea
                if let result {
                    preview(result)
                }
            }
        }
        .navigationTitle("Extrato da fatura")
        .navigationBarTitleDisplayMode(.inline)
        .fileImporter(
            isPresented: $showPDFImporter,
            allowedContentTypes: [.pdf],
            allowsMultipleSelection: false
        ) { result in
            handlePDFImport(result)
        }
        .alert("Extrato adicionado", isPresented: $showImportConfirmation) {
            Button("OK") { dismiss() }
        } message: {
            Text(importMessage)
        }
    }

    // MARK: Subviews

    private var header: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Cole o texto ou importe o PDF da fatura")
                .font(Fonts.headline(18))
                .foregroundStyle(Theme.text)
            Text("O app reconhece as compras automaticamente — datas, descrições e valores.")
                .font(Fonts.caption())
                .foregroundStyle(Theme.textSecondary)
        }
    }

    private var sourceTabs: some View {
        HStack(spacing: 8) {
            Button {
                withAnimation { pastedText = ""; pdfFileName = nil; result = nil }
            } label: {
                Label("Colar texto", systemImage: "doc.plaintext")
                    .font(Fonts.captionStrong())
                    .foregroundStyle(Theme.text)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 10)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
            .buttonStyle(.plain)

            Button {
                showPDFImporter = true
            } label: {
                Label("Importar PDF", systemImage: "doc.fill")
                    .font(Fonts.captionStrong())
                    .foregroundStyle(Theme.background)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 10)
                    .background(card.brandGradient)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
            .buttonStyle(.plain)
        }
    }

    @ViewBuilder
    private var inputArea: some View {
        if pastedText.isEmpty && pdfFileName == nil {
            // Área de colar texto
            TextEditor(text: $pastedText)
                .font(Fonts.caption(13))
                .foregroundStyle(Theme.text)
                .scrollContentBackground(.hidden)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Theme.borderStrong, lineWidth: 1)
                )
                .frame(height: 140)
                .overlay(alignment: .topLeading) {
                    if pastedText.isEmpty {
                        Text("Ex.: 01 AGO MERCADO EXTRA R$ 98,50\n02 AGO UBER R$ 23,80\n03 AGO AMAZON R$ 145,90")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textTertiary)
                            .padding(10)
                    }
                }

            PrimaryButton("Reconhecer compras", icon: "sparkles.magnifyingglass") {
                recognize(pastedText)
            }
            .disabled(pastedText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        } else if let pdfName = pdfFileName {
            HStack(spacing: 12) {
                Image(systemName: "doc.richtext.fill")
                    .font(.system(size: 20))
                    .foregroundStyle(card.brandColor)
                VStack(alignment: .leading, spacing: 2) {
                    Text(pdfName)
                        .font(Fonts.bodyMedium())
                        .foregroundStyle(Theme.text)
                        .lineLimit(1)
                    Text("Pronto para reconhecer")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                }
                Spacer()
                Button {
                    pdfFileName = nil
                    result = nil
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(Theme.textTertiary)
                }
            }
            .padding(14)
            .background(Theme.surfaceAlt)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
    }

    @ViewBuilder
    private func preview(_ result: StatementParseResult) -> some View {
        // Cartão sugerido
        AppCard {
            VStack(alignment: .leading, spacing: 10) {
                Text("Cartão identificado")
                    .font(Fonts.captionStrong())
                    .foregroundStyle(Theme.textSecondary)
                Menu {
                    ForEach(app.cards) { card in
                        Button(card.name) {
                            selectedCardName = card.name
                        }
                    }
                } label: {
                    HStack(spacing: 8) {
                        Circle()
                            .fill(app.cards.first { $0.name == selectedCardName }?.brandColor ?? Theme.green)
                            .frame(width: 10, height: 10)
                        Text(selectedCardName)
                            .font(Fonts.bodyMedium())
                            .foregroundStyle(Theme.text)
                        Spacer()
                        Image(systemName: "chevron.up.chevron.down")
                            .font(.system(size: 12))
                            .foregroundStyle(Theme.textTertiary)
                    }
                }
            }
        }

        // Linhas reconhecidas
        AppCard {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Text("Compras reconhecidas")
                        .font(Fonts.captionStrong())
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    Text("\(result.lines.count) linhas • \(Money.format(result.totalPurchases))")
                        .font(Fonts.captionStrong(12))
                        .foregroundStyle(Theme.green)
                }

                ForEach(result.lines) { line in
                    HStack(spacing: 10) {
                        if line.isAdjustment {
                            Image(systemName: "arrow.uturn.backward.circle.fill")
                                .foregroundStyle(Theme.warning)
                        } else {
                            Image(systemName: "bag.fill")
                                .foregroundStyle(card.brandColor)
                        }
                        VStack(alignment: .leading, spacing: 2) {
                            Text(line.description)
                                .font(Fonts.caption(13))
                                .foregroundStyle(Theme.text)
                                .lineLimit(1)
                            if let date = line.date {
                                Text(date.formatted(.dateTime.day().month().year()))
                                    .font(Fonts.caption(11))
                                    .foregroundStyle(Theme.textTertiary)
                            }
                        }
                        Spacer()
                        Text(Money.format(line.amount))
                            .font(Fonts.captionStrong(13))
                            .foregroundStyle(line.isAdjustment ? Theme.warning : Theme.text)
                    }
                }
            }
        }

        PrimaryButton("Adicionar à fatura (\(selectedCardName))", icon: "plus") {
            importMessage = addStatementToCard(result)
                ? "As compras reconhecidas foram adicionadas à fatura do \(selectedCardName)."
                : "Nenhuma compra reconhecida no texto. Verifique se o extrato foi colado por completo."
            showImportConfirmation = true
        }

        Text("Pagamentos, encargos e totais não são contados como compras.")
            .font(Fonts.caption(12))
            .foregroundStyle(Theme.textTertiary)
            .frame(maxWidth: .infinity, alignment: .leading)
    }

    // MARK: Ações

    private func recognize(_ text: String) {
        let parsed = StatementParser.parse(text)
        if let detected = parsed.detectedCardName,
           app.cards.contains(where: { $0.name.lowercased().contains(detected) }) {
            selectedCardName = app.cards.first { $0.name.lowercased().contains(detected) }!.name
        }
        result = parsed
    }
    private func handlePDFImport(_ result: Result<[URL], Error>) {
        switch result {
        case .failure(let error):
            print("Falha ao importar PDF: \(error.localizedDescription)")
        case .success(let urls):
            guard let url = urls.first, url.startAccessingSecurityScopedResource() else { return }
            defer { url.stopAccessingSecurityScopedResource() }
            guard let document = PDFDocument(url: url), let text = document.string else { return }
            pdfFileName = url.lastPathComponent
            recognize(text)
        }
    }

    /// Converte as linhas reconhecidas em compras da fatura do cartão e
    /// atualiza o valor usado/limite do cartão no AppState (mock).
    /// Retorna true quando ao menos uma compra foi adicionada.
    @discardableResult
    private func addStatementToCard(_ result: StatementParseResult) -> Bool {
        guard let cardIndex = app.cards.firstIndex(where: { $0.name == selectedCardName }) else { return false }

        let purchases = result.lines
            .filter { !$0.isAdjustment }
            .map { line in
                CardPurchase(
                    name: line.description,
                    amount: line.amount,
                    installments: 1,
                    paidInstallments: 1,
                    date: line.date ?? .now,
                    fromStatement: true
                )
            }

        // Só adiciona quando há pelo menos uma compra reconhecida.
        guard !purchases.isEmpty else {
            return false
        }

        var updated = app.cards[cardIndex]
        updated.statementItems.append(contentsOf: purchases)
        let total = purchases.reduce(0) { $0 + $1.amount }
        // O extrato representa o valor real da fatura/limite usado.
        updated.currentInvoice += total
        updated.used = min(updated.used + total, updated.limit)
        app.cards[cardIndex] = updated
        Haptics.success()
        return true
    }
}