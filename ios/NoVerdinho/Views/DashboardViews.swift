import SwiftUI

// MARK: - TELA 04: Dashboard principal (design premium No Verdinho)

struct DashboardView: View {
    @EnvironmentObject var app: AppState
    @State private var loading = true
    @State private var editingTransaction: Transaction?

    var body: some View {
        ScreenScroll {
            if loading {
                skeleton
            } else {
                content
            }
        }
        .task {
            try? await Task.sleep(for: .seconds(0.35))
            withAnimation(.easeOut(duration: 0.3)) { loading = false }
        }
        .toolbar(.hidden, for: .navigationBar)
        .sheet(item: $editingTransaction) { transaction in
            EditTransactionSheet(transaction: transaction)
                .environmentObject(app)
                .presentationDetents([.height(520)])
        }
    }

    // MARK: Cabeçalho

    private var greeting: String {
        let hour = Calendar.current.component(.hour, from: .now)
        switch hour {
        case 5..<12: return "Bom dia"
        case 12..<18: return "Boa tarde"
        default: return "Boa noite"
        }
    }

    private var firstName: String {
        app.userName.split(separator: " ").first.map(String.init) ?? app.userName
    }

    private var initials: String {
        let parts = app.userName.split(separator: " ").prefix(2)
        return parts.compactMap { $0.first.map(String.init) }.joined().uppercased()
    }

    private var overdueCount: Int {
        app.debts.filter { $0.status == .overdue }.count
    }

    // MARK: Dados

    private var monthIncome: Double {
        let start = Calendar.current.dateInterval(of: .month, for: .now)?.start ?? .now
        return app.transactions
            .filter { $0.kind == .income && $0.date >= start }
            .reduce(0) { $0 + $1.amount }
    }

    private var monthExpense: Double {
        let start = Calendar.current.dateInterval(of: .month, for: .now)?.start ?? .now
        return app.transactions
            .filter { $0.kind == .expense && $0.date >= start }
            .reduce(0) { $0 + $1.amount }
    }

    private var weekDelta: Double {
        let since = Calendar.current.date(byAdding: .day, value: -7, to: .now) ?? .now
        let recent = app.transactions.filter { $0.date >= since }
        let income = recent.filter { $0.kind == .income }.reduce(0) { $0 + $1.amount }
        let expense = recent.filter { $0.kind == .expense }.reduce(0) { $0 + $1.amount }
        return income - expense
    }

    /// Variação % da última para a penúltima entrada de uma série de relatório.
    private func delta(_ series: [Double]) -> Double? {
        guard series.count >= 2, series[series.count - 2] != 0 else { return nil }
        return (series[series.count - 1] - series[series.count - 2]) / series[series.count - 2] * 100
    }

    /// Total dos compromissos dos próximos 15 dias.
    private var commitmentsNext15Days: Double {
        let limit = Calendar.current.date(byAdding: .day, value: 15, to: .now) ?? .now
        return app.upcomingPayments
            .filter { $0.date <= limit }
            .reduce(0) { $0 + $1.amount }
    }

    private var bestNextAction: (title: String, message: String, accent: Color)? {
        app.bestNextAction
    }

    // MARK: Conteúdo

    private var content: some View {
        VStack(alignment: .leading, spacing: 20) {
            header

            NavigationLink {
                TransactionsView()
            } label: {
                BalanceCard(
                    balance: app.balance,
                    weekDelta: weekDelta,
                    isBalanceHidden: app.balanceHidden,
                    onToggleVisibility: { app.balanceHidden.toggle() }
                )
            }
            .buttonStyle(.plain)

            HStack(spacing: 10) {
                SummaryCard(icon: "arrow.down.left.circle.fill", title: "Receitas",
                            value: Money.formatCompact(monthIncome),
                            delta: delta(app.reports[0].values),
                            color: Theme.green)
                SummaryCard(icon: "arrow.up.right.circle.fill", title: "Despesas",
                            value: Money.formatCompact(monthExpense),
                            delta: delta(app.reports[1].values),
                            color: Theme.danger,
                            deltaPositiveIsGood: false)
                SummaryCard(icon: "banknote.fill", title: "Dívidas",
                            value: Money.formatCompact(app.totalDebt),
                            delta: delta(app.reports[2].values),
                            color: Theme.warning,
                            deltaPositiveIsGood: false)
            }

            verdinhoSection

            if let action = bestNextAction {
                SmartActionCard(
                    icon: "lightbulb.fill",
                    title: action.title,
                    message: action.message,
                    actionTitle: "Ver plano",
                    onAction: {
                        app.selectedTab = .debts
                    },
                    accent: Theme.greenBright)
            }

            if commitmentsNext15Days > 0 {
                FinancialAlertCard(
                    message: "Suas despesas previstas para os próximos 15 dias somam \(Money.format(commitmentsNext15Days)) — acima do recomendado para manter seu nível.",
                    actionTitle: "Ver previsão"
                ) {
                    app.selectedTab = .planning
                }
            }

            NavigationLink {
                CanISpendView()
            } label: {
                CanISpendCard()
            }
            .buttonStyle(.plain)

            upcomingSection

            transactionsSection
        }
    }

    // MARK: Header

    private var header: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 3) {
                Text("\(greeting), \(firstName) 👋")
                    .font(Fonts.headline(22))
                    .foregroundStyle(Theme.text)
                Text("Como está sua vida financeira hoje?")
                    .font(Fonts.caption())
                    .foregroundStyle(Theme.textSecondary)
            }
            Spacer()
            NotificationButton(badgeCount: overdueCount) {
                app.selectedTab = .debts
            }
            AvatarView(initials: initials)
        }
    }

    // MARK: Seu Verdinho

    private var verdinhoSection: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                SectionTitle("Seu Verdinho")
                Spacer()
                Badge(text: app.level.band.title, color: app.level.band.color)
            }

            AppCard {
                VStack(alignment: .leading, spacing: 16) {
                    HStack(spacing: 20) {
                        VerdinhoScore(score: app.level.score)
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Você avançou \(app.level.delta) pontos")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Text("neste mês")
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.textSecondary)
                            NavigationLink {
                                ReportsView()
                            } label: {
                                HStack(spacing: 4) {
                                    Text("Ver minha evolução")
                                        .font(Fonts.captionStrong())
                                    Image(systemName: "arrow.right")
                                        .font(.system(size: 11, weight: .bold))
                                }
                                .foregroundStyle(Theme.green)
                            }
                            .buttonStyle(.plain)
                        }
                    }

                    Text(app.level.message)
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                        .fixedSize(horizontal: false, vertical: true)

                    LineChart(points: app.level.evolution)
                        .frame(height: 80)
                }
            }
        }
    }

    // MARK: Próximos compromissos

    private var upcomingSection: some View {
        VStack(alignment: .leading, spacing: 14) {
            SectionTitle("Próximos compromissos", action: ("Ver tudo", { app.selectedTab = .debts }))

            if app.upcomingPayments.isEmpty {
                EmptyState(
                    icon: "calendar",
                    title: "Nenhum compromisso",
                    message: "Seus próximos pagamentos aparecerão aqui."
                )
            }

            ForEach(app.upcomingPayments.prefix(3)) { payment in
                UpcomingPaymentRow(
                    icon: payment.kind.icon,
                    title: payment.name,
                    subtitle: "vence em \(payment.daysRemaining) dias",
                    value: Money.format(payment.amount),
                    color: payment.kind.color
                )
            }
        }
    }

    // MARK: Últimas transações

    private var transactionsSection: some View {
        VStack(alignment: .leading, spacing: 14) {
            SectionTitle("Últimas transações")

            if app.transactions.isEmpty {
                EmptyState(
                    icon: "list.bullet.rectangle",
                    title: "Sem movimentações",
                    message: "Registre receitas e despesas pelo botão + para acompanhar aqui."
                )
            }

            ForEach(app.transactions.prefix(4)) { transaction in
                Button {
                    editingTransaction = transaction
                } label: {
                    transactionRow(transaction)
                }
                .buttonStyle(.plain)
                .swipeActions(edge: .trailing) {
                    Button(role: .destructive) {
                        deleteTransaction(transaction)
                    } label: {
                        Label("Excluir", systemImage: "trash")
                    }
                }
                .accessibilityLabel("Editar \(transaction.name)")
            }
        }
    }

    private func transactionRow(_ transaction: Transaction) -> some View {
        HStack(spacing: 12) {
            Image(systemName: transaction.kind == .income ? "arrow.down.left.circle.fill" : "arrow.up.right.circle.fill")
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(transaction.kind == .income ? Theme.green : Theme.textSecondary)
                .frame(width: 38, height: 38)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            VStack(alignment: .leading, spacing: 2) {
                Text(transaction.name)
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
                Text(transaction.category)
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.textSecondary)
            }
            Spacer()
            Text("\(transaction.kind == .income ? "+" : "-")\(Money.format(transaction.amount))")
                .font(Fonts.captionStrong())
                .foregroundStyle(transaction.kind == .income ? Theme.green : Theme.text)
        }
        .padding(12)
        .background(Theme.surface)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .stroke(Theme.border, lineWidth: 1)
        )
    }

    private func deleteTransaction(_ transaction: Transaction) {
        app.balance += transaction.kind == .expense ? transaction.amount : -transaction.amount
        app.transactions.removeAll { $0.id == transaction.id }
        Haptics.light()
    }

    // MARK: Skeleton

    private var skeleton: some View {
        VStack(alignment: .leading, spacing: 20) {
            HStack {
                VStack(alignment: .leading, spacing: 8) {
                    SkeletonBlock(width: 140, height: 20)
                    SkeletonBlock(width: 190, height: 12)
                }
                Spacer()
                SkeletonBlock(width: 40, height: 40)
            }
            SkeletonBlock(height: 110).frame(maxWidth: .infinity)
            HStack(spacing: 10) {
                SkeletonBlock(width: 100, height: 90)
                SkeletonBlock(width: 100, height: 90)
                SkeletonBlock(width: 100, height: 90)
            }
            SkeletonBlock(height: 160).frame(maxWidth: .infinity)
            SkeletonBlock(height: 60).frame(maxWidth: .infinity)
        }
    }
}

// MARK: - TELA 05: Central de Dívidas

struct DebtsView: View {
    @EnvironmentObject var app: AppState
    @State private var filter = 0

    private let filters = ["Todas", "Atrasadas", "Em dia", "Quitadas"]

    private var filteredDebts: [Debt] {
        switch filter {
        case 1: app.debts.filter { $0.status == .overdue }
        case 2: app.debts.filter { $0.status == .onTime }
        case 3: app.debts.filter { $0.status == .paidOff }
        default: app.debts
        }
    }

    private var monthlyInstallments: Double {
        app.debts
            .filter { $0.status != .paidOff }
            .reduce(0) { $0 + $1.installment }
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(Money.format(app.totalDebt))
                        .font(Fonts.money(34))
                        .foregroundStyle(Theme.text)
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.down.right.circle.fill")
                            .font(.system(size: 12))
                        Text("\(Money.format(monthlyInstallments)) em parcelas este mês")
                            .font(Fonts.caption(12))
                    }
                    .foregroundStyle(Theme.green)
                }

                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(filters.indices, id: \.self) { index in
                            Button {
                                withAnimation { filter = index }
                            } label: {
                                Text(filters[index])
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(filter == index ? Theme.background : Theme.textSecondary)
                                    .padding(.horizontal, 14)
                                    .padding(.vertical, 8)
                                    .background(filter == index ? Theme.green : Theme.surfaceAlt)
                                    .clipShape(Capsule())
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }

                if filteredDebts.isEmpty {
                    EmptyState(
                        icon: filter == 3 ? "checkmark.seal.fill" : "banknote.fill",
                        title: filter == 0 ? "Nenhuma dívida" : "Nada por aqui",
                        message: filter == 0
                            ? "Cadastre suas dívidas para acompanhar a quitação."
                            : "Nenhuma dívida \(filters[filter].lowercased()) neste filtro."
                    )
                    if filter != 3 {
                        PrimaryButton("Adicionar dívida", icon: "plus") {
                            app.addPreset = .debt
                            app.showAddSheet = true
                        }
                    }
                }

                ForEach(filteredDebts) { debt in
                    NavigationLink {
                        DebtDetailView(debtID: debt.id)
                    } label: {
                        DebtCardView(debt: debt)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .navigationTitle("Minhas dívidas")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Card de dívida

struct DebtCardView: View {
    let debt: Debt

    var body: some View {
        AppCard {
            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 12) {
                    Image(systemName: debt.type.icon)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(Theme.green)
                        .frame(width: 38, height: 38)
                        .background(Theme.soft(Theme.green))
                        .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                    VStack(alignment: .leading, spacing: 2) {
                        Text(debt.creditor)
                            .font(Fonts.bodyMedium())
                            .foregroundStyle(Theme.text)
                        Text("\(debt.paidInstallments)/\(debt.installmentCount) parcelas pagas")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                    }
                    Spacer()
                    Badge(text: debt.status.label, color: debt.status.color)
                }

                HStack(alignment: .lastTextBaseline) {
                    Text(Money.format(debt.remainingBalance))
                        .font(Fonts.headline(22))
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Text("\(Int(debt.progress * 100))%")
                        .font(Fonts.captionStrong())
                        .foregroundStyle(Theme.green)
                }

                ProgressBar(progress: debt.progress, color: Theme.green, height: 8)

                HStack {
                    Text("Parcela \(Money.format(debt.installment))")
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.textSecondary)
                    Spacer()
                    Text("Vence \(debt.dueDate.formatted(.dateTime.day().month()))")
                        .font(Fonts.caption(12))
                        .foregroundStyle(debt.status == .overdue ? Theme.danger : Theme.textSecondary)
                }
            }
        }
    }
}

// MARK: - TELA: Movimentações (todas as transações)

struct TransactionsView: View {
    @EnvironmentObject var app: AppState
    @State private var editingTransaction: Transaction?

    private var sorted: [Transaction] {
        app.transactions.sorted { $0.date > $1.date }
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 12) {
                if sorted.isEmpty {
                    EmptyState(
                        icon: "list.bullet.rectangle",
                        title: "Sem movimentações",
                        message: "Registre receitas e despesas pelo botão + para acompanhar aqui."
                    )
                }

                ForEach(sorted) { transaction in
                    Button {
                        editingTransaction = transaction
                    } label: {
                        HStack(spacing: 12) {
                            Image(systemName: transaction.kind == .income ? "arrow.down.left.circle.fill" : "arrow.up.right.circle.fill")
                                .font(.system(size: 16, weight: .semibold))
                                .foregroundStyle(transaction.kind == .income ? Theme.green : Theme.textSecondary)
                                .frame(width: 38, height: 38)
                                .background(Theme.surfaceAlt)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            VStack(alignment: .leading, spacing: 2) {
                                Text(transaction.name)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Text(transaction.date.formatted(.dateTime.day().month().year()))
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            Spacer()
                            Text("\(transaction.kind == .income ? "+" : "-")\(Money.format(transaction.amount))")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(transaction.kind == .income ? Theme.green : Theme.text)
                        }
                        .padding(12)
                        .background(Theme.surface)
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .stroke(Theme.border, lineWidth: 1)
                        )
                    }
                    .buttonStyle(.plain)
                    .swipeActions(edge: .trailing) {
                        Button(role: .destructive) {
                            app.balance += transaction.kind == .expense ? transaction.amount : -transaction.amount
                            app.transactions.removeAll { $0.id == transaction.id }
                            Haptics.light()
                        } label: {
                            Label("Excluir", systemImage: "trash")
                        }
                    }
                }
            }
        }
        .navigationTitle("Movimentações")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(item: $editingTransaction) { transaction in
            EditTransactionSheet(transaction: transaction)
                .environmentObject(app)
                .presentationDetents([.height(520)])
        }
    }
}