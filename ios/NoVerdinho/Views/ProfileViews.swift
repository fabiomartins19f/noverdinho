import SwiftUI
import UniformTypeIdentifiers

// MARK: - TELA 12: Relatórios

struct ReportsView: View {
    @EnvironmentObject var app: AppState
    @State private var selected = 0

    private let tabs = ["Evolução", "Categorias"]

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 8) {
                    ForEach(tabs.indices, id: \.self) { index in
                        Button {
                            withAnimation { selected = index }
                        } label: {
                            Text(tabs[index])
                                .font(Fonts.captionStrong())
                                .foregroundStyle(selected == index ? Theme.background : Theme.textSecondary)
                                .padding(.horizontal, 16)
                                .padding(.vertical, 9)
                                .background(selected == index ? Theme.green : Theme.surfaceAlt)
                                .clipShape(Capsule())
                        }
                        .buttonStyle(.plain)
                    }
                }

                if selected == 0 {
                    evolutionTab
                } else {
                    categoriesTab
                }
            }
        }
        .navigationTitle("Relatórios")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var evolutionTab: some View {
        VStack(alignment: .leading, spacing: 18) {
            ForEach(app.reports) { report in
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text(report.title)
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.textSecondary)
                            Spacer()
                            Text(Money.format(report.values.last ?? 0))
                                .font(Fonts.captionStrong())
                                .foregroundStyle(report.color)
                        }
                        BarChart(labels: app.reportLabels, series: [(report.values, report.color)])
                            .frame(height: 140)
                        HStack {
                            ForEach(0..<2, id: \.self) { index in
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(index == 0 ? "Início do período" : "Mês atual")
                                        .font(Fonts.caption(11))
                                        .foregroundStyle(Theme.textTertiary)
                                    Text(Money.format(report.values[index == 0 ? 0 : report.values.count - 1]))
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textSecondary)
                                }
                                if index == 0 { Spacer() }
                            }
                        }
                    }
                }
            }
        }
    }

    private var categoriesTab: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Gastos por categoria")
                .font(Fonts.headline(18))
                .foregroundStyle(Theme.text)

            AppCard {
                VStack(spacing: 14) {
                    ForEach(app.expensesByCategory, id: \.name) { category in
                        HStack(spacing: 10) {
                            Text(category.name)
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.textSecondary)
                                .frame(width: 90, alignment: .leading)
                            GeometryReader { geo in
                                ZStack(alignment: .leading) {
                                    Capsule().fill(Theme.surfaceAlt)
                                    Capsule()
                                        .fill(category.color)
                                        .frame(width: max(8, (category.value / maxTotal) * geo.size.width))
                                }
                            }
                            .frame(height: 10)
                            Text(Money.format(category.value))
                                .font(Fonts.captionStrong(12))
                                .foregroundStyle(Theme.text)
                                .frame(width: 84, alignment: .trailing)
                        }
                    }
                }
            }

            AppCard {
                VStack(alignment: .leading, spacing: 10) {
                    Text("Resumo")
                        .font(Fonts.captionStrong())
                        .foregroundStyle(Theme.textSecondary)
                    IndicatorRow(icon: "arrow.down.left.circle.fill", title: "Receitas", value: Money.format(incomeTotal), color: Theme.green)
                    IndicatorRow(icon: "arrow.up.right.circle.fill", title: "Despesas", value: Money.format(expenseTotal), color: Theme.danger)
                    IndicatorRow(icon: "banknote.fill", title: "Dívidas", value: Money.format(app.totalDebt), color: Theme.warning)
                    IndicatorRow(icon: "leaf.fill", title: "Economia", value: Money.format(max(incomeTotal - expenseTotal, 0)), color: Theme.greenBright)
                    IndicatorRow(icon: "chart.line.uptrend.xyaxis", title: "Nível", value: "\(app.level.score)/100", color: Theme.purple)
                }
            }
        }
    }

    /// Receitas somadas de todas as transações cadastradas.
    private var incomeTotal: Double {
        app.transactions.filter { $0.kind == .income }.reduce(0) { $0 + $1.amount }
    }

    /// Despesas somadas de todas as transações cadastradas.
    private var expenseTotal: Double {
        app.transactions.filter { $0.kind == .expense }.reduce(0) { $0 + $1.amount }
    }

    private var maxTotal: Double {
        app.expensesByCategory.map(\.value).max() ?? 1
    }
}

// MARK: - TELA 13: Adicionar (bottom sheet)

/// Bottom sheet do botão "+": escolhe o tipo e preenche um formulário.
/// Cada tipo adiciona um item de verdade no AppState (e é persistido).
struct AddSheetView: View {
    let onClose: () -> Void
    @EnvironmentObject var app: AppState

    @State private var selectedType: AddSheetType?
    @State private var showForm = false
    @State private var formError: String?

    // Receita / Despesa
    @State private var amountText = ""
    @State private var detail = ""
    @State private var category = "Outros"
    // Dívida
    @State private var creditor = ""
    @State private var installmentsText = "1"
    @State private var interestText = "0"
    // Cartão
    @State private var cardInstitution = ""
    @State private var cardDigits = ""
    @State private var cardLimitText = ""
    @State private var cardDueDayText = "10"
    // Meta
    @State private var goalKind: Goal.Kind = .reserve
    @State private var monthlyContributionText = ""

    private let categories = ["Alimentação", "Transporte", "Lazer", "Saúde", "Moradia", "Outros"]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
            HStack {
                Text("O que você deseja adicionar?")
                    .font(Fonts.headline(18))
                    .foregroundStyle(Theme.text)
                Spacer()
                Button(action: onClose) {
                    Image(systemName: "xmark")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundStyle(Theme.textSecondary)
                        .frame(width: 44, height: 44)
                        .background(Theme.surfaceAlt)
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Fechar")
            }

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                ForEach(AddSheetType.allCases, id: \.self) { type in
                    Button {
                        select(type)
                    } label: {
                        VStack(spacing: 8) {
                            Image(systemName: type.icon)
                                .font(.system(size: 20, weight: .semibold))
                                .foregroundStyle(type.color)
                                .frame(width: 44, height: 44)
                                .background(type.color.opacity(0.12))
                                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                            Text(type.rawValue)
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.text)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(selectedType == type ? type.color.opacity(0.10) : Theme.surfaceAlt)
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .stroke(selectedType == type ? type.color : .clear, lineWidth: 1.5)
                        )
                    }
                    .buttonStyle(.plain)
                }
            }

            if showForm, let selectedType {
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Nova \(selectedType.rawValue.lowercased())")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.textSecondary)

                        formFields(for: selectedType)

                        if let formError {
                            Text(formError)
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.danger)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }

                        PrimaryButton("Salvar", icon: "checkmark") {
                            save(selectedType)
                        }
                    }
                }
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
            }
            .padding(20)
            .padding(.bottom, 30)
        }
        .scrollIndicators(.hidden)
        .background(
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .fill(Theme.surfaceElevated)
                .ignoresSafeArea(edges: .bottom)
        )
        .overlay(alignment: .top) {
            Capsule()
                .fill(Theme.borderStrong)
                .frame(width: 40, height: 5)
                .padding(.top, 10)
        }
        .onAppear(perform: applyPreset)
    }

    // MARK: Seleção

    private func select(_ type: AddSheetType) {
        Haptics.light()
        resetFields()
        withAnimation(.easeOut(duration: 0.2)) {
            selectedType = type
            showForm = true
        }
    }

    /// Limpa todos os campos para que nada "vaze" entre os tipos do formulário.
    private func resetFields() {
        amountText = ""
        detail = ""
        category = "Outros"
        creditor = ""
        installmentsText = "1"
        interestText = "0"
        cardInstitution = ""
        cardDigits = ""
        cardLimitText = ""
        cardDueDayText = "10"
        goalKind = .reserve
        monthlyContributionText = ""
        formError = nil
    }

    /// Suporta o atalho "Adicionar cartão" (ex.: tela de cartões vazia).
    private func applyPreset() {
        guard let preset = app.addPreset else { return }
        app.addPreset = nil
        select(preset)
    }

    // MARK: Campos

    @ViewBuilder
    private func formFields(for type: AddSheetType) -> some View {
        switch type {
        case .income, .expense:
            CurrencyField(value: $amountText, placeholder: "Valor")
            TextField("Descrição", text: $detail)
                .font(Fonts.body())
                .foregroundStyle(Theme.text)
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Theme.borderStrong, lineWidth: 1)
                )
            categoryPicker

        case .debt:
            TextField("Credor (ex.: Cartão Nubank)", text: $creditor)
                .font(Fonts.body())
                .foregroundStyle(Theme.text)
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Theme.borderStrong, lineWidth: 1)
                )
            CurrencyField(value: $amountText, placeholder: "Valor total da dívida")
            HStack(spacing: 12) {
                TextField("Parcelas", text: $installmentsText)
                    .keyboardType(.numberPad)
                    .font(Fonts.body())
                    .foregroundStyle(Theme.text)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 13)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                TextField("Juros % a.a.", text: $interestText)
                    .keyboardType(.numberPad)
                    .font(Fonts.body())
                    .foregroundStyle(Theme.text)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 13)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

        case .card:
            TextField("Nome do cartão (ex.: Nubank)", text: $detail)
                .font(Fonts.body())
                .foregroundStyle(Theme.text)
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Theme.borderStrong, lineWidth: 1)
                )
            TextField("Instituição (ex.: Nu Pagamentos)", text: $cardInstitution)
                .font(Fonts.body())
                .foregroundStyle(Theme.text)
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Theme.borderStrong, lineWidth: 1)
                )
            CurrencyField(value: $cardLimitText, placeholder: "Limite do cartão")
            HStack(spacing: 12) {
                TextField("Final do cartão", text: $cardDigits)
                    .keyboardType(.numberPad)
                    .font(Fonts.body())
                    .foregroundStyle(Theme.text)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 13)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                TextField("Vence dia", text: $cardDueDayText)
                    .keyboardType(.numberPad)
                    .font(Fonts.body())
                    .foregroundStyle(Theme.text)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 13)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
            Text("A cor da marca é aplicada automaticamente pelo nome do cartão.")
                .font(Fonts.caption(12))
                .foregroundStyle(Theme.textTertiary)

        case .goal:
            TextField("Nome da meta (ex.: Reserva de emergência)", text: $detail)
                .font(Fonts.body())
                .foregroundStyle(Theme.text)
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .stroke(Theme.borderStrong, lineWidth: 1)
                )
            HStack(spacing: 8) {
                ForEach(Goal.Kind.allCases, id: \.self) { kind in
                    Button {
                        goalKind = kind
                    } label: {
                        Image(systemName: kind.icon)
                            .font(.system(size: 18, weight: .semibold))
                            .foregroundStyle(goalKind == kind ? Theme.background : Theme.textSecondary)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 10)
                            .background(goalKind == kind ? Theme.green : Theme.surfaceAlt)
                            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }
            }
            CurrencyField(value: $amountText, placeholder: "Valor alvo")
            HStack(spacing: 8) {
                Text("Aporte mensal")
                    .font(Fonts.caption())
                    .foregroundStyle(Theme.textSecondary)
                TextField("0", text: $monthlyContributionText)
                    .keyboardType(.decimalPad)
                    .font(Fonts.body())
                    .foregroundStyle(Theme.text)
                    .padding(.horizontal, 14)
                    .padding(.vertical, 13)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .overlay(
                        RoundedRectangle(cornerRadius: 12, style: .continuous)
                            .stroke(Theme.borderStrong, lineWidth: 1)
                    )
            }
        }
    }

    private var categoryPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(categories, id: \.self) { item in
                    Button {
                        category = item
                    } label: {
                        Text(item)
                            .font(Fonts.captionStrong(12))
                            .foregroundStyle(category == item ? Theme.background : Theme.textSecondary)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 7)
                            .background(category == item ? Theme.green : Theme.surfaceAlt)
                            .clipShape(Capsule())
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    // MARK: Salvar

    private func save(_ type: AddSheetType) {
        formError = nil

        switch type {
        case .income:
            guard let value = parseAmount(amountText), !detail.isEmpty else {
                return fail("Informe o valor e a descrição.")
            }
            app.balance += value
            app.transactions.insert(Transaction(kind: .income, name: detail, category: category, amount: value, date: .now), at: 0)

        case .expense:
            guard let value = parseAmount(amountText), !detail.isEmpty else {
                return fail("Informe o valor e a descrição.")
            }
            app.balance -= value
            app.transactions.insert(Transaction(kind: .expense, name: detail, category: category, amount: value, date: .now), at: 0)

        case .debt:
            guard let value = parseAmount(amountText), !creditor.isEmpty else {
                return fail("Informe o credor e o valor total.")
            }
            let total = Int(installmentsText) ?? 1
            let interest = Double(interestText) ?? 0
            app.debts.insert(Debt(
                type: .loan, creditor: creditor, originalAmount: value, paidAmount: 0, remainingBalance: value,
                interestRate: interest, installment: total > 0 ? value / Double(total) : value,
                installmentCount: max(total, 1), paidInstallments: 0,
                dueDate: .now.addingTimeInterval(86400 * 30), priority: .medium, status: .onTime
            ), at: 0)

        case .card:
            guard let limit = parseAmount(cardLimitText), !detail.isEmpty else {
                return fail("Informe o nome e o limite do cartão.")
            }
            app.cards.insert(CreditCard(
                name: detail, institution: cardInstitution.isEmpty ? detail : cardInstitution,
                lastDigits: cardDigits.isEmpty ? "0000" : cardDigits,
                limit: limit, used: 0, currentInvoice: 0,
                dueDay: min(max(Int(cardDueDayText) ?? 10, 1), 31)
            ), at: 0)

        case .goal:
            guard let target = parseAmount(amountText), !detail.isEmpty else {
                return fail("Informe o nome e o valor alvo da meta.")
            }
            let monthly = Money.parse(monthlyContributionText) ?? 0
            app.goals.insert(Goal(
                kind: goalKind, title: detail, emoji: goalKind.icon,
                target: target, saved: 0, monthlyContribution: monthly
            ), at: 0)
        }

        Haptics.success()
        withAnimation(.easeOut(duration: 0.2)) {
            onClose()
        }
    }

    private func fail(_ message: String) {
        formError = message
        Haptics.light()
    }

    /// Converte texto digitado em valor, aceitando "1250", "1250.50",
    /// "1.250,50" e "R$ 1.250,50".
    private func parseAmount(_ text: String) -> Double? {
        Money.parse(text)
    }
}

// MARK: - Edição de transação (bottom sheet)

/// Edita nome, categoria e valor de uma transação existente; o saldo é
/// recalculado pela diferença entre o valor antigo e o novo.
struct EditTransactionSheet: View {
    @EnvironmentObject var app: AppState
    @Environment(\.dismiss) private var dismiss
    let transaction: Transaction

    @State private var amountText = ""
    @State private var detail = ""
    @State private var category = "Outros"
    @State private var errorMessage: String?

    private let categories = ["Alimentação", "Transporte", "Lazer", "Saúde", "Moradia", "Outros"]

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Text("Editar \(transaction.kind == .income ? "receita" : "despesa")")
                    .font(Fonts.headline(18))
                    .foregroundStyle(Theme.text)
                Spacer()
                Button { dismiss() } label: {
                    Image(systemName: "xmark")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundStyle(Theme.textSecondary)
                        .frame(width: 44, height: 44)
                        .background(Theme.surfaceAlt)
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Fechar")
            }

            AppCard {
                VStack(alignment: .leading, spacing: 12) {
                    CurrencyField(value: $amountText, placeholder: "Valor")
                    TextField("Descrição", text: $detail)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                        .padding(.horizontal, 14)
                        .padding(.vertical, 13)
                        .background(Theme.surfaceAlt)
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .stroke(Theme.borderStrong, lineWidth: 1)
                        )
                    categoryChips
                    if let errorMessage {
                        Text(errorMessage)
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.danger)
                    }
                    PrimaryButton("Salvar alterações", icon: "checkmark") {
                        save()
                    }
                }
            }
        }
        .padding(20)
        .background(Theme.surfaceElevated.ignoresSafeArea())
        .onAppear {
            amountText = String(format: "%.2f", transaction.amount).replacingOccurrences(of: ".", with: ",")
            detail = transaction.name
            category = transaction.category
        }
    }

    private var categoryChips: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(categories, id: \.self) { item in
                    Button {
                        category = item
                    } label: {
                        Text(item)
                            .font(Fonts.captionStrong(12))
                            .foregroundStyle(category == item ? Theme.background : Theme.textSecondary)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 7)
                            .background(category == item ? Theme.green : Theme.surfaceAlt)
                            .clipShape(Capsule())
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    private func save() {
        guard let value = Money.parse(amountText), !detail.isEmpty else {
            errorMessage = "Informe o valor e a descrição."
            Haptics.light()
            return
        }
        guard let index = app.transactions.firstIndex(where: { $0.id == transaction.id }) else {
            dismiss()
            return
        }
        // Saldo: devolve o valor antigo e aplica o novo.
        app.balance += transaction.kind == .income
            ? -transaction.amount + value
            : transaction.amount - value
        app.transactions[index] = Transaction(
            kind: transaction.kind,
            name: detail,
            category: category,
            amount: value,
            date: transaction.date
        )
        Haptics.success()
        dismiss()
    }
}

// MARK: - TELA 14: Perfil e Configurações

/// Arquivo JSON compartilhável com os dados exportados do app.
struct ExportFile: Transferable {
    var data: Data

    static var transferRepresentation: some TransferRepresentation {
        DataRepresentation(exportedContentType: .json) { file in
            file.data
        }
    }
}

struct ProfileView: View {
    @EnvironmentObject var app: AppState
    @State private var confirmLogout = false
    @State private var confirmDelete = false
    @State private var showComingSoon = false

    /// JSON com todos os dados do usuário, para exportação (LGPD).
    private var exportPayload: Data {
        struct Export: Encodable {
            let app = "No Verdinho"
            let generatedAt: Date
            let userName: String
            let userEmail: String
            let balance: Double
            let levelScore: Int
            let transactions: [Transaction]
            let debts: [Debt]
            let cards: [CreditCard]
            let goals: [Goal]
            let budget: [BudgetCategory]
        }
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        let export = Export(
            generatedAt: .now,
            userName: app.userName,
            userEmail: app.userEmail,
            balance: app.balance,
            levelScore: app.levelScore,
            transactions: app.transactions,
            debts: app.debts,
            cards: app.cards,
            goals: app.goals,
            budget: app.budget
        )
        return (try? encoder.encode(export)) ?? Data("{\"app\":\"No Verdinho\"}".utf8)
    }

    @ViewBuilder
    private func settingsRow(for item: (String, String)) -> some View {
        if item.0 == "Sair" {
            Button {
                confirmLogout = true
            } label: {
                HStack {
                    Text(item.0)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.danger)
                    Spacer()
                    Image(systemName: "rectangle.portrait.and.arrow.right")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(Theme.danger)
                }
                .padding(.vertical, 10)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
        } else if item.0 == "Apagar meus dados" {
            Button {
                confirmDelete = true
            } label: {
                HStack {
                    Text(item.0)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.danger)
                    Spacer()
                    Image(systemName: "trash")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(Theme.danger)
                }
                .padding(.vertical, 10)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
        } else if item.0 == "Exportar dados" {
            ShareLink(
                item: ExportFile(data: exportPayload),
                preview: SharePreview("Dados No Verdinho")
            ) {
                HStack {
                    Text(item.0)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Image(systemName: "square.and.arrow.up")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(Theme.green)
                }
                .padding(.vertical, 10)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
        } else if item.0 == "Notificações" {
            Toggle(isOn: $app.notificationsEnabled) {
                HStack {
                    Text(item.0)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                    Spacer()
                }
            }
            .tint(Theme.green)
            .padding(.vertical, 10)
            .accessibilityLabel("Lembretes de contas a vencer")
        } else {
            Button {
                Haptics.light()
                showComingSoon = true
            } label: {
                HStack {
                    Text(item.0)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Text(item.1)
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                    Image(systemName: "chevron.right")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(Theme.textTertiary)
                }
                .padding(.vertical, 10)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
        }
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 20) {
                // Cabeçalho
                HStack(spacing: 14) {
                    Image(systemName: "person.crop.circle.fill")
                        .font(.system(size: 56))
                        .foregroundStyle(Theme.surfaceElevated)
                        .overlay(
                            Circle().stroke(Theme.green, lineWidth: 2).frame(width: 60, height: 60)
                        )
                    VStack(alignment: .leading, spacing: 3) {
                        Text(app.userName)
                            .font(Fonts.headline(20))
                            .foregroundStyle(Theme.text)
                        Text(app.userEmail)
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                        HStack(spacing: 4) {
                            Image(systemName: "leaf.fill")
                                .font(.system(size: 10))
                            Text("Nível \(app.level.score) — \(app.level.band.title)")
                                .font(Fonts.caption(12))
                        }
                        .foregroundStyle(Theme.green)
                    }
                    Spacer()
                }

                NavigationLink {
                    CardsView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "creditcard.fill")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.green)
                                .frame(width: 36, height: 36)
                                .background(Theme.greenSoft())
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Meus cartões")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Text("\(app.cards.count)")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.textSecondary)
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    GoalsView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "target")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.purple)
                                .frame(width: 36, height: 36)
                                .background(Theme.purpleSoft)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Minhas metas")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    CanISpendView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "sparkles")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.warning)
                                .frame(width: 36, height: 36)
                                .background(Theme.warningSoft)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Posso gastar?")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    IntelligenceView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "brain.head.profile")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.info)
                                .frame(width: 36, height: 36)
                                .background(Theme.infoSoft)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Inteligência financeira")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    ReportsView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "chart.bar.xaxis")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.greenBright)
                                .frame(width: 36, height: 36)
                                .background(Theme.greenSoft(0.2))
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Relatórios")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                // Configurações
                ForEach(app.profileSections, id: \.title) { section in
                    AppCard {
                        VStack(alignment: .leading, spacing: 4) {
                            HStack(spacing: 8) {
                                Image(systemName: section.icon)
                                    .font(.system(size: 12, weight: .semibold))
                                    .foregroundStyle(Theme.textSecondary)
                                Text(section.title.uppercased())
                                    .font(Fonts.caption(11))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            .padding(.bottom, 6)
                            ForEach(section.items, id: \.0) { item in
                                settingsRow(for: item)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Perfil")
        .navigationBarTitleDisplayMode(.inline)
        .confirmationDialog("Sair da conta?", isPresented: $confirmLogout, titleVisibility: .visible) {
            Button("Sair", role: .destructive) {
                app.logout()
            }
            Button("Cancelar", role: .cancel) {}
        } message: {
            Text("Seus dados continuam salvos neste aparelho.")
        }
        .confirmationDialog("Apagar todos os dados?", isPresented: $confirmDelete, titleVisibility: .visible) {
            Button("Apagar tudo", role: .destructive) {
                app.deleteAllData()
            }
            Button("Cancelar", role: .cancel) {}
        } message: {
            Text("Conforme a LGPD, todos os dados locais serão removidos e você voltará ao início.")
        }
        .alert("Em breve", isPresented: $showComingSoon) {
            Button("OK") {}
        } message: {
            Text("Essa configuração chegará em uma próxima versão do No Verdinho.")
        }
    }
}