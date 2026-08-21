import SwiftUI
import UniformTypeIdentifiers
import CoreTransferable

// MARK: - TELA: Perfil

struct ProfileView: View {
    @EnvironmentObject var app: AppState
    @State private var confirmDelete = false
    @State private var showEditTransaction = false

    private var initials: String {
        let parts = app.userName.split(separator: " ").prefix(2)
        return parts.compactMap { $0.first.map(String.init) }.joined().uppercased()
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                VStack(spacing: 10) {
                    AvatarView(initials: initials, size: 76)
                    Text(app.userName)
                        .font(Fonts.headline(22))
                        .foregroundStyle(Theme.text)
                    Text(app.userEmail)
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 8)

                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("Preferências")
                        VStack(spacing: 6) {
                            settingsRow(
                                icon: "bell.badge.fill",
                                title: "Notificações de contas",
                                subtitle: "Lembretes 1 dia antes do vencimento"
                            ) {
                                Toggle("", isOn: $app.notificationsEnabled)
                                    .labelsHidden()
                                    .tint(Theme.green)
                            }
                            settingsRow(icon: "arrow.down.doc.fill", title: "Exportar dados",
                                        subtitle: "Backup completo em JSON") {
                                ShareLink(
                                    item: ExportFile(payload: exportPayload),
                                    preview: SharePreview("Dados No Verdinho")
                                ) {
                                    Image(systemName: "square.and.arrow.up")
                                        .font(.system(size: 15, weight: .semibold))
                                        .foregroundStyle(Theme.green)
                                        .frame(width: 44, height: 44)
                                        .contentShape(Rectangle())
                                }
                            }
                        }
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("Dados")
                        VStack(spacing: 6) {
                            settingsRow(icon: "trash.fill", title: "Apagar meus dados",
                                        subtitle: "Remove tudo deste iPhone") {
                                Button {
                                    confirmDelete = true
                                } label: {
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 12, weight: .bold))
                                        .foregroundStyle(Theme.textTertiary)
                                }
                            }
                        }
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        SectionTitle("Conta")
                        VStack(spacing: 6) {
                            settingsRow(icon: "rectangle.portrait.and.arrow.right",
                                        title: "Sair", subtitle: "Voltar para a tela inicial") {
                                Button {
                                    app.logout()
                                } label: {
                                    Image(systemName: "chevron.right")
                                        .font(.system(size: 12, weight: .bold))
                                        .foregroundStyle(Theme.textTertiary)
                                }
                            }
                        }
                    }
                }

                Text("No Verdinho 1.0 · Organize. Quite. Evolua.")
                    .font(Fonts.caption(11))
                    .foregroundStyle(Theme.textTertiary)
                    .frame(maxWidth: .infinity)
                    .padding(.top, 4)
            }
        }
        .navigationTitle("Perfil")
        .navigationBarTitleDisplayMode(.inline)
        .confirmationDialog("Apagar todos os dados?",
                            isPresented: $confirmDelete,
                            titleVisibility: .visible) {
            Button("Apagar tudo", role: .destructive) {
                withAnimation { app.deleteAllData() }
            }
            Button("Cancelar", role: .cancel) {}
        } message: {
            Text("Essa ação remove todas as suas informações financeiras deste iPhone e não pode ser desfeita.")
        }
    }

    /// Linha de configuração reutilizável (o @ViewBuilder evita o erro de
    /// type-check em telas com muitos elementos heterogêneos).
    @ViewBuilder
    private func settingsRow<Content: View>(
        icon: String, title: String, subtitle: String,
        @ViewBuilder trailing: @escaping () -> Content
    ) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(Theme.green)
                .frame(width: 34, height: 34)
                .background(Theme.soft(Theme.green))
                .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
                Text(subtitle)
                    .font(Fonts.caption(11))
                    .foregroundStyle(Theme.textTertiary)
            }
            Spacer()
            trailing()
        }
        .padding(.vertical, 4)
    }

    /// JSON completo para backup do usuário.
    private var exportPayload: [String: Any] {
        let dateFormatter = ISO8601DateFormatter()
        func iso(_ date: Date) -> String { dateFormatter.string(from: date) }
        return [
            "app": "No Verdinho",
            "version": "1.0",
            "exportedAt": iso(.now),
            "user": [
                "name": app.userName,
                "email": app.userEmail,
                "levelScore": app.levelScore,
            ],
            "balance": app.balance,
            "transactions": app.transactions.map { transaction in
                [
                    "kind": transaction.kind.rawValue,
                    "name": transaction.name,
                    "category": transaction.category,
                    "amount": transaction.amount,
                    "date": iso(transaction.date),
                ]
            },
            "debts": app.debts.map { debt in
                [
                    "type": debt.type.rawValue,
                    "creditor": debt.creditor,
                    "originalAmount": debt.originalAmount,
                    "paidAmount": debt.paidAmount,
                    "remainingBalance": debt.remainingBalance,
                    "interestRate": debt.interestRate,
                    "installment": debt.installment,
                    "installmentCount": debt.installmentCount,
                    "paidInstallments": debt.paidInstallments,
                    "dueDate": iso(debt.dueDate),
                    "priority": debt.priority.rawValue,
                    "status": debt.status.rawValue,
                ]
            },
            "cards": app.cards.map { card in
                [
                    "name": card.name,
                    "institution": card.institution,
                    "lastDigits": card.lastDigits,
                    "limit": card.limit,
                    "used": card.used,
                    "currentInvoice": card.currentInvoice,
                    "dueDay": card.dueDay,
                ]
            },
            "goals": app.goals.map { goal in
                [
                    "kind": goal.kind.rawValue,
                    "title": goal.title,
                    "target": goal.target,
                    "saved": goal.saved,
                    "monthlyContribution": goal.monthlyContribution,
                ]
            },
            "budget": app.budget.map { category in
                [
                    "name": category.name,
                    "icon": category.icon,
                    "colorHex": category.colorHex,
                    "limit": category.limit,
                    "spent": category.spent,
                ]
            },
        ]
    }
}

// MARK: - Exportação (ShareLink → arquivo JSON)

struct ExportFile: Transferable {
    let payload: [String: Any]

    static var transferRepresentation: some TransferRepresentation {
        DataRepresentation(exportedContentType: .json) { file in
            let data = try JSONSerialization.data(
                withJSONObject: file.payload,
                options: [.prettyPrinted, .sortedKeys]
            )
            return data
        }
    }
}

// MARK: - TELA: Modal "+" (receita, despesa, dívida, cartão ou meta)

struct AddSheetView: View {
    @EnvironmentObject var app: AppState
    let onClose: () -> Void

    @State private var kind: Transaction.Kind = .expense
    @State private var name = ""
    @State private var category = "Alimentação"
    @State private var amount = ""
    @State private var date = Date()

    // Dívida
    @State private var debtType: DebtType = .loan
    @State private var creditor = ""
    @State private var interestRate = ""
    @State private var installments = "12"
    @State private var dueDate = Date()

    // Meta
    @State private var goalKind: Goal.Kind = .reserve
    @State private var monthlyContribution = ""

    private let categories = ["Salário", "Freelance", "Alimentação", "Moradia",
                              "Transporte", "Saúde", "Lazer", "Assinaturas", "Outros"]

    var body: some View {
        VStack(spacing: 0) {
            Capsule()
                .fill(Theme.borderStrong)
                .frame(width: 40, height: 5)
                .padding(.top, 12)
                .padding(.bottom, 10)

            HStack {
                Text(title)
                    .font(Fonts.headline(20))
                    .foregroundStyle(Theme.text)
                Spacer()
                Button {
                    onClose()
                } label: {
                    Image(systemName: "xmark")
                        .font(.system(size: 13, weight: .bold))
                        .foregroundStyle(Theme.textSecondary)
                        .frame(width: 32, height: 32)
                        .background(Theme.surfaceAlt)
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 20)

            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    switch app.addPreset {
                    case .debt: debtForm
                    case .goal: goalForm
                    case .card: cardForm
                    default: transactionForm
                    }
                }
                .padding(20)
            }
            .scrollIndicators(.hidden)
        }
        .frame(maxHeight: 560)
        .background(Theme.surfaceElevated)
        .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .stroke(Theme.border, lineWidth: 1)
        )
    }

    private var title: String {
        switch app.addPreset {
        case .debt: "Nova dívida"
        case .goal: "Nova meta"
        case .card: "Novo cartão"
        default: kind == .income ? "Nova receita" : "Nova despesa"
        }
    }

    // MARK: Formulário de transação

    private var transactionForm: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 8) {
                ForEach([Transaction.Kind.expense, .income], id: \.self) { option in
                    Button {
                        withAnimation(.easeOut(duration: 0.15)) { kind = option }
                    } label: {
                        HStack(spacing: 6) {
                            Image(systemName: option == .income ? "arrow.down.left.circle.fill" : "arrow.up.right.circle.fill")
                                .font(.system(size: 13))
                            Text(option == .income ? "Receita" : "Despesa")
                                .font(Fonts.captionStrong())
                        }
                        .foregroundStyle(kind == option ? Theme.background : Theme.textSecondary)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 11)
                        .background(kind == option ? Theme.green : Theme.surfaceAlt)
                        .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }
            }

            FormField("Nome", text: $name, icon: "tag.fill")

            HStack(spacing: 10) {
                CurrencyField(value: $amount, placeholder: "0,00")
                    .frame(maxWidth: .infinity)
                DatePicker("", selection: $date, displayedComponents: .date)
                    .labelsHidden()
                    .tint(Theme.green)
                    .padding(11)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

            Menu {
                Picker("Categoria", selection: $category) {
                    ForEach(categories, id: \.self) { Text($0).tag($0) }
                }
            } label: {
                HStack {
                    Text(category)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.system(size: 11))
                        .foregroundStyle(Theme.textTertiary)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

            PrimaryButton("Adicionar \(kind == .income ? "receita" : "despesa")", icon: "checkmark.circle.fill") {
                addTransaction()
            }
            .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty || (Money.parse(amount) ?? 0) <= 0)
            .opacity(validTransaction ? 1 : 0.5)
        }
    }

    // MARK: Formulário de dívida

    private var debtForm: some View {
        VStack(alignment: .leading, spacing: 14) {
            Menu {
                Picker("Tipo", selection: $debtType) {
                    ForEach(DebtType.allCases, id: \.self) { Text($0.rawValue).tag($0) }
                }
            } label: {
                HStack {
                    Image(systemName: debtType.icon)
                        .foregroundStyle(Theme.green)
                    Text(debtType.rawValue)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.system(size: 11))
                        .foregroundStyle(Theme.textTertiary)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

            FormField("Credor", text: $creditor, icon: "building.columns.fill")
            CurrencyField(value: $amount, placeholder: "Valor total da dívida")
            HStack(spacing: 10) {
                CurrencyField(value: $interestRate, placeholder: "Juros % a.a.")
                FormField("Parcelas", text: $installments, icon: "number")
            }
            HStack {
                Text("Primeiro vencimento")
                    .font(Fonts.body())
                    .foregroundStyle(Theme.text)
                Spacer()
                DatePicker("", selection: $dueDate, displayedComponents: .date)
                    .labelsHidden()
                    .tint(Theme.green)
            }
            .padding(11)
            .background(Theme.surfaceAlt)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))

            PrimaryButton("Adicionar dívida", icon: "banknote.fill") {
                addDebt()
            }
            .disabled(creditor.trimmingCharacters(in: .whitespaces).isEmpty || (Money.parse(amount) ?? 0) <= 0)
            .opacity(validDebt ? 1 : 0.5)
        }
    }

    // MARK: Formulário de meta

    private var goalForm: some View {
        VStack(alignment: .leading, spacing: 14) {
            Menu {
                Picker("Tipo", selection: $goalKind) {
                    ForEach(Goal.Kind.allCases, id: \.self) { kind in
                        Text(kind.title).tag(kind)
                    }
                }
            } label: {
                HStack {
                    Image(systemName: goalKind.icon)
                        .foregroundStyle(Theme.greenBright)
                    Text(goalKind.title)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.system(size: 11))
                        .foregroundStyle(Theme.textTertiary)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

            CurrencyField(value: $amount, placeholder: "Valor da meta")
            CurrencyField(value: $monthlyContribution, placeholder: "Aporte mensal")

            PrimaryButton("Adicionar meta", icon: "target") {
                addGoal()
            }
            .disabled((Money.parse(amount) ?? 0) <= 0)
            .opacity((Money.parse(amount) ?? 0) > 0 ? 1 : 0.5)
        }
    }

    // MARK: Formulário de cartão

    private var cardForm: some View {
        AddCardSheet(onClose: onClose)
            .environmentObject(app)
    }

    // MARK: Ações

    private var validTransaction: Bool {
        !name.trimmingCharacters(in: .whitespaces).isEmpty && (Money.parse(amount) ?? 0) > 0
    }

    private var validDebt: Bool {
        !creditor.trimmingCharacters(in: .whitespaces).isEmpty && (Money.parse(amount) ?? 0) > 0
    }

    private func addTransaction() {
        let value = Money.parse(amount) ?? 0
        let transaction = Transaction(
            kind: kind,
            name: name.trimmingCharacters(in: .whitespaces),
            category: category,
            amount: value,
            date: date
        )
        app.transactions.insert(transaction, at: 0)
        app.balance += kind == .income ? value : -value
        Haptics.success()
        onClose()
    }

    private func addDebt() {
        let value = Money.parse(amount) ?? 0
        let rate = Money.parse(interestRate) ?? 0
        let count = max(Int(installments) ?? 1, 1)
        let debt = Debt(
            type: debtType,
            creditor: creditor.trimmingCharacters(in: .whitespaces),
            originalAmount: value,
            paidAmount: 0,
            remainingBalance: value,
            interestRate: rate,
            installment: value / Double(count),
            installmentCount: count,
            paidInstallments: 0,
            dueDate: dueDate,
            priority: .medium,
            status: .onTime
        )
        app.debts.append(debt)
        Haptics.success()
        onClose()
    }

    private func addGoal() {
        let target = Money.parse(amount) ?? 0
        let contribution = Money.parse(monthlyContribution) ?? 0
        let goal = Goal(
            kind: goalKind,
            title: goalKind.title,
            emoji: goalKind.icon,
            target: target,
            saved: 0,
            monthlyContribution: contribution
        )
        app.goals.append(goal)
        Haptics.success()
        onClose()
    }
}

// MARK: - Sheet: editar transação

struct EditTransactionSheet: View {
    @EnvironmentObject var app: AppState
    @Environment(\.dismiss) private var dismiss
    let transaction: Transaction

    @State private var kind: Transaction.Kind = .expense
    @State private var name = ""
    @State private var category = "Alimentação"
    @State private var amount = ""
    @State private var date = Date()

    private let categories = ["Salário", "Freelance", "Alimentação", "Moradia",
                              "Transporte", "Saúde", "Lazer", "Assinaturas", "Outros"]

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack {
                Text("Editar transação")
                    .font(Fonts.headline(20))
                    .foregroundStyle(Theme.text)
                Spacer()
                Button(role: .destructive) {
                    delete()
                } label: {
                    Image(systemName: "trash")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(Theme.danger)
                        .frame(width: 36, height: 36)
                        .background(Theme.soft(Theme.danger))
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
            }

            HStack(spacing: 8) {
                ForEach([Transaction.Kind.expense, .income], id: \.self) { option in
                    Button {
                        withAnimation(.easeOut(duration: 0.15)) { kind = option }
                    } label: {
                        Text(option == .income ? "Receita" : "Despesa")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(kind == option ? Theme.background : Theme.textSecondary)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 10)
                            .background(kind == option ? Theme.green : Theme.surfaceAlt)
                            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }
            }

            FormField("Nome", text: $name, icon: "tag.fill")
            CurrencyField(value: $amount, placeholder: "0,00")
            DatePicker("Data", selection: $date, displayedComponents: .date)
                .font(Fonts.body())
                .foregroundStyle(Theme.text)
                .tint(Theme.green)
            Menu {
                Picker("Categoria", selection: $category) {
                    ForEach(categories, id: \.self) { Text($0).tag($0) }
                }
            } label: {
                HStack {
                    Text(category)
                        .font(Fonts.body())
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Image(systemName: "chevron.up.chevron.down")
                        .font(.system(size: 11))
                        .foregroundStyle(Theme.textTertiary)
                }
                .padding(.horizontal, 14)
                .padding(.vertical, 13)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

            PrimaryButton("Salvar", icon: "checkmark.circle.fill") {
                save()
            }
            .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty || (Money.parse(amount) ?? 0) <= 0)
            .opacity((Money.parse(amount) ?? 0) > 0 && !name.isEmpty ? 1 : 0.5)

            Spacer()
        }
        .padding(24)
        .onAppear {
            kind = transaction.kind
            name = transaction.name
            category = transaction.category
            amount = String(format: "%.2f", transaction.amount)
            date = transaction.date
        }
    }

    private func save() {
        let value = Money.parse(amount) ?? 0
        // Desfaz o efeito da transação antiga no saldo.
        app.balance += transaction.kind == .income ? -transaction.amount : transaction.amount
        // Aplica a nova transação.
        app.balance += kind == .income ? value : -value
        if let index = app.transactions.firstIndex(where: { $0.id == transaction.id }) {
            app.transactions[index] = Transaction(
                id: transaction.id,
                kind: kind,
                name: name.trimmingCharacters(in: .whitespaces),
                category: category,
                amount: value,
                date: date
            )
        }
        Haptics.success()
        dismiss()
    }

    private func delete() {
        app.balance += transaction.kind == .income ? -transaction.amount : transaction.amount
        app.transactions.removeAll { $0.id == transaction.id }
        Haptics.light()
        dismiss()
    }
}

// MARK: - TELA: Relatórios

struct ReportsView: View {
    @EnvironmentObject var app: AppState
    @State private var period = 0

    private let periods = ["Mês", "Trimestre", "Ano"]

    private var visibleSeries: [ReportRow] {
        let count = min(max(period + 1, 1), 3)
        return Array(app.reports.prefix(count))
    }

    private var lastIncome: Double { app.reports[0].values.last ?? 0 }
    private var lastExpense: Double { app.reports[1].values.last ?? 0 }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 8) {
                    ForEach(periods.indices, id: \.self) { index in
                        Button {
                            withAnimation { period = index }
                        } label: {
                            Text(periods[index])
                                .font(Fonts.captionStrong())
                                .foregroundStyle(period == index ? Theme.background : Theme.textSecondary)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 9)
                                .background(period == index ? Theme.green : Theme.surfaceAlt)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                        }
                        .buttonStyle(.plain)
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        SectionTitle("Resumo")
                        VStack(spacing: 10) {
                            IndicatorRow(icon: "arrow.down.left.circle.fill", title: "Receitas",
                                         value: Money.format(lastIncome), color: Theme.green)
                            IndicatorRow(icon: "arrow.up.right.circle.fill", title: "Despesas",
                                         value: Money.format(lastExpense), color: Theme.danger)
                            IndicatorRow(icon: "wallet.bifold.fill", title: "Saldo do mês",
                                         value: Money.format(lastIncome - lastExpense),
                                         color: lastIncome - lastExpense >= 0 ? Theme.green : Theme.danger)
                        }
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        SectionTitle("Evolução")
                        BarChart(labels: app.reportLabels,
                                 series: visibleSeries.map { (values: $0.values, color: $0.color) },
                                 height: 180)
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        SectionTitle("Gastos por categoria")
                        VStack(spacing: 10) {
                            ForEach(app.expensesByCategory, id: \.name) { row in
                                IndicatorRow(icon: "circle.fill", title: row.name,
                                             value: Money.format(row.value), color: row.color)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Relatórios")
        .navigationBarTitleDisplayMode(.inline)
    }
}