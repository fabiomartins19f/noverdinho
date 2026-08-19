import SwiftUI
import UniformTypeIdentifiers

// MARK: - TELA: Importar extrato da fatura

struct StatementImportView: View {
    @EnvironmentObject var app: AppState
    @State private var showFilePicker = false
    @State private var parseResult: StatementParseResult?
    @State private var targetCard: CreditCard?
    @State private var importMessage: String?
    @State private var saved = false

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack(spacing: 12) {
                            Image(systemName: "doc.text.magnifyingglass")
                                .font(.system(size: 20))
                                .foregroundStyle(Theme.green)
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Importar extrato")
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Text("Selecione o arquivo .txt ou .pdf da fatura. O No Verdinho reconhece as compras automaticamente.")
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                        }
                        PrimaryButton("Escolher arquivo", icon: "folder.fill") {
                            showFilePicker = true
                        }
                    }
                }
                .fileImporter(
                    isPresented: $showFilePicker,
                    allowedContentTypes: [.plainText, .pdf, .json, .data],
                    allowsMultipleSelection: false
                ) { result in
                    handleImport(result)
                }

                if let parseResult {
                    importSummary(parseResult)
                }
            }
        }
        .navigationTitle("Importar extrato")
        .navigationBarTitleDisplayMode(.inline)
    }

    @ViewBuilder
    private func importSummary(_ result: StatementParseResult) -> some View {
        AppCard {
            VStack(alignment: .leading, spacing: 14) {
                SectionTitle("Resultado da leitura")

                if let detected = result.detectedCardName {
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundStyle(Theme.green)
                        Text("Cartão detectado: \(detected.capitalized)")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.text)
                    }
                }

                HStack {
                    Text("\(result.lines.filter { !$0.isAdjustment }.count) compras reconhecidas")
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    Text(Money.format(result.totalPurchases))
                        .font(Fonts.captionStrong())
                        .foregroundStyle(Theme.text)
                }

                if let message = importMessage {
                    HStack(spacing: 8) {
                        Image(systemName: "info.circle.fill")
                            .font(.system(size: 13))
                        Text(message)
                            .font(Fonts.caption(12))
                    }
                    .foregroundStyle(Theme.warning)
                }

                if !result.lines.isEmpty && !saved {
                    PrimaryButton("Salvar importação", icon: "checkmark.circle.fill") {
                        save(result)
                    }
                }
            }
        }

        AppCard {
            VStack(alignment: .leading, spacing: 10) {
                SectionTitle("Compras reconhecidas")
                ForEach(result.lines) { line in
                    HStack(spacing: 10) {
                        Text(line.isAdjustment ? "doc.badge.ellipsis" : "cart.fill")
                            .font(.system(size: 12))
                            .foregroundStyle(line.isAdjustment ? Theme.textTertiary : Theme.green)
                            .frame(width: 22)
                        VStack(alignment: .leading, spacing: 1) {
                            Text(line.description)
                                .font(Fonts.caption())
                                .foregroundStyle(line.isAdjustment ? Theme.textTertiary : Theme.text)
                                .lineLimit(1)
                            if let date = line.date {
                                Text(date.formatted(.dateTime.day().month()))
                                    .font(Fonts.caption(11))
                                    .foregroundStyle(Theme.textTertiary)
                            }
                        }
                        Spacer()
                        Text(Money.format(line.amount))
                            .font(Fonts.caption())
                            .foregroundStyle(line.isAdjustment ? Theme.textTertiary : Theme.text)
                    }
                }
            }
        }
    }

    // MARK: Importação e salvamento

    private func handleImport(_ result: Result<[URL], Error>) {
        guard case .success(let urls) = result, let url = urls.first else { return }
        guard url.startAccessingSecurityScopedResource() else {
            importMessage = "Não foi possível acessar o arquivo."
            return
        }
        defer { url.stopAccessingSecurityScopedResource() }

        do {
            let text = try String(contentsOf: url, encoding: .utf8)
            let parsed = StatementParser.parse(text)

            importMessage = nil
            saved = false

            // Vincula ao cartão detectado ou ao primeiro cartão do usuário.
            if let detected = parsed.detectedCardName {
                if let card = app.cards.first(where: {
                    $0.name.lowercased().contains(detected) || $0.institution.lowercased().contains(detected)
                }) {
                    targetCard = card
                } else {
                    importMessage = "Nenhum cartão seu bate com \"\(detected.capitalized)\". A importação ficará sem vínculo."
                }
            } else {
                importMessage = app.cards.isEmpty
                    ? "Você ainda não tem cartões cadastrados."
                    : "Nenhum cartão detectado no extrato. As compras ficarão sem vínculo."
            }

            parseResult = parsed
            Haptics.success()
        } catch {
            importMessage = "Não foi possível ler o arquivo. Tente exportar o extrato em .txt."
        }
    }

    private func save(_ result: StatementParseResult) {
        var card = targetCard
        if card == nil, let first = app.cards.first {
            card = first
        }

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

        if let card, let index = app.cards.firstIndex(where: { $0.id == card.id }) {
            app.cards[index].statementItems.append(contentsOf: purchases)
        }

        saved = true
        Haptics.success()
    }
}