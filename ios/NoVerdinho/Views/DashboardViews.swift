import SwiftUI

// MARK: - TELA 03: Dashboard

struct DashboardView: View {
    @EnvironmentObject var app: AppState
    @State private var loading = true

    var body: some View {
        ScreenScroll {
            if loading {
                skeleton
            } else {
                content
            }
        }
        .task {
            // Pequeno "carregamento" inicial para dar ritmo profissional.
            try? await Task.sleep(for: .seconds(0.7))
            loading = false
        }
    }

    /// Variação do saldo nos últimos 7 dias (receitas − despesas).
    private var weekDelta: Double {
        let since = Calendar.current.date(byAdding: .day, value: -7, to: .now) ?? .now
        let recent = app.transactions.filter { $0.date >= since }
        let income = recent.filter { $0.kind == .income }.reduce(0) { $0 + $1.amount }
        let expense = recent.filter { $0.kind == .expense }.reduce(0) { $0 + $1.amount }
        return income - expense
    }

    private var skeleton: some View {
        VStack(alignment: .leading, spacing: 20) {
            HStack {
                VStack(alignment: .leading, spacing: 8) {
                    SkeletonBlock(width: 130, height: 20)
                    SkeletonBlock(width: 190, height: 12)
                }
                Spacer()
                SkeletonBlock(width: 40, height: 40)
            }
            SkeletonBlock(height: 96).frame(maxWidth: .infinity)
            HStack(spacing: 12) {
                ForEach(0..<3, id: \.self) { _ in
                    SkeletonBlock(height: 74).frame(maxWidth: .infinity)
                }
            }
            SkeletonBlock(height: 170).frame(maxWidth: .infinity)
            SkeletonBlock(height: 60).frame(maxWidth: .infinity)
            SkeletonBlock(height: 60).frame(maxWidth: .infinity)
        }
    }

    private var content: some View {
        VStack(alignment: .leading, spacing: 20) {
                // Topo
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Bom dia")
                            .font(Fonts.headline(20))
                            .foregroundStyle(Theme.text)
                        Text("Como está sua vida financeira hoje?")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                    }
                    Spacer()
                    Button {
                        app.selectedTab = .profile
                    } label: {
                        Image(systemName: "person.crop.circle.fill")
                            .font(.system(size: 40))
                            .foregroundStyle(Theme.surfaceElevated)
                    }
                    .buttonStyle(.plain)
                }

                // Saldo
                AppCard {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Saldo disponível")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                        Text(Money.format(app.balance))
                            .font(Fonts.money(34))
                            .foregroundStyle(Theme.text)
                        HStack(spacing: 4) {
                            Image(systemName: weekDelta >= 0 ? "arrow.down.left.circle.fill" : "arrow.up.right.circle.fill")
                                .font(.system(size: 12))
                            Text("\(weekDelta >= 0 ? "+" : "")\(Money.format(weekDelta)) esta semana")
                                .font(Fonts.caption(12))
                        }
                        .foregroundStyle(weekDelta >= 0 ? Theme.green : Theme.danger)
                    }
                }

                // Indicadores
                HStack(spacing: 12) {
                    miniIndicator("arrow.up.circle.fill", "Receitas", 7500, Theme.green)
                    miniIndicator("arrow.down.circle.fill", "Despesas", 4260, Theme.danger)
                    miniIndicator("banknote.fill", "Dívidas", app.totalDebt, Theme.warning)
                }

                // Seu Verdinho
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            SectionTitle("Seu Verdinho")
                            Spacer()
                            Badge(text: app.level.band.title, color: app.level.band.color)
                        }
                        HStack(spacing: 20) {
                            GreenLevelGauge(score: app.level.score)
                            VStack(alignment: .leading, spacing: 10) {
                                Text(app.level.message)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                LineChart(points: app.level.evolution)
                                    .frame(height: 90)
                            }
                        }
                    }
                }

                // Alerta inteligente
                HStack(alignment: .top, spacing: 12) {
                    Image(systemName: "exclamationmark.triangle.fill")
                        .font(.system(size: 18))
                        .foregroundStyle(Theme.warning)
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Atenção")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.warning)
                        Text("Suas despesas previstas para os próximos 15 dias estão acima do seu limite recomendado.")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                    }
                    Spacer()
                }
                .padding(14)
                .background(Theme.warningSoft)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

                // Próximos compromissos
                SectionTitle("Próximos compromissos", action: ("Ver tudo", { app.selectedTab = .debts }))

                if app.upcomingPayments.isEmpty {
                    EmptyState(
                        icon: "calendar",
                        title: "Nenhum compromisso",
                        message: "Seus próximos pagamentos aparecerão aqui."
                    )
                }

                ForEach(app.upcomingPayments.prefix(3)) { payment in
                    HStack(spacing: 12) {
                        Image(systemName: payment.kind.icon)
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundStyle(payment.kind.color)
                            .frame(width: 38, height: 38)
                            .background(payment.kind.color.opacity(0.12))
                            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                        VStack(alignment: .leading, spacing: 2) {
                            Text(payment.name)
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Text(payment.date.formatted(.dateTime.day().month().weekday(.abbreviated)))
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textSecondary)
                        }
                        Spacer()
                        Text(Money.format(payment.amount))
                            .font(Fonts.captionStrong())
                            .foregroundStyle(payment.kind.color)
                    }
                    .padding(12)
                    .background(Theme.surface)
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                }

                // Últimas transações
                SectionTitle("Últimas transações")

                if app.transactions.isEmpty {
                    EmptyState(
                        icon: "list.bullet.rectangle",
                        title: "Sem movimentações",
                        message: "Registre receitas e despesas pelo botão + para acompanhar aqui."
                    )
                }

                ForEach(app.transactions.prefix(4)) { transaction in
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
                }
            }
        }

    private func miniIndicator(_ icon: String, _ title: String, _ value: Double, _ color: Color) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(color)
            Text(title)
                .font(Fonts.caption(12))
                .foregroundStyle(Theme.textSecondary)
            Text(Money.formatCompact(value))
                .font(Fonts.captionStrong(14))
                .foregroundStyle(Theme.text)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Theme.surface)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
    }
}

// MARK: - TELA 04: Central de Dívidas

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

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Minhas dívidas")
                        .font(Fonts.headline(20))
                        .foregroundStyle(Theme.text)
                    Text(Money.format(app.totalDebt))
                        .font(Fonts.money(34))
                        .foregroundStyle(Theme.text)
                    HStack(spacing: 4) {
                        Image(systemName: "arrow.down.right.circle.fill")
                            .font(.system(size: 12))
                        Text("↓ R$ 2.170 este mês")
                            .font(Fonts.caption(12))
                    }
                    .foregroundStyle(Theme.green)
                }

                // Filtros
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
                        icon: "checkmark.seal.fill",
                        title: "Nada por aqui",
                        message: "Nenhuma dívida \(filter == 1 ? "atrasada" : filter == 2 ? "em dia" : "quitada") neste filtro."
                    )
                }

                ForEach(filteredDebts) { debt in
                    NavigationLink {
                        DebtDetailView(debt: debt)
                    } label: {
                        DebtCardView(debt: debt)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }
}

struct DebtCardView: View {
    let debt: Debt

    var body: some View {
        AppCard {
            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 12) {
                    Image(systemName: debt.type.icon)
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundStyle(Theme.green)
                        .frame(width: 40, height: 40)
                        .background(Theme.greenSoft())
                        .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                    VStack(alignment: .leading, spacing: 2) {
                        Text(debt.type.rawValue)
                            .font(Fonts.bodyMedium())
                            .foregroundStyle(Theme.text)
                        Text(debt.creditor)
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                    }
                    Spacer()
                    Badge(text: debt.status == .overdue ? "Atrasada" : debt.status == .paidOff ? "Quitada" : "Em dia",
                          color: debt.status == .overdue ? Theme.danger : debt.status == .paidOff ? Theme.green : Theme.info)
                }

                HStack(alignment: .lastTextBaseline) {
                    Text(Money.format(debt.remainingBalance))
                        .font(Fonts.headline(20))
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Text("R$ \(debt.installment.formatted(.number.locale(Locale(identifier: "pt_BR"))))/mês")
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                }

                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Text("Progresso")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                        Spacer()
                        Text("\(Int(debt.progress * 100))%")
                            .font(Fonts.captionStrong(12))
                            .foregroundStyle(debt.priority.color)
                    }
                    ProgressBar(progress: debt.progress, color: debt.priority.color)
                }

                HStack(spacing: 12) {
                    Label("\(String(format: "%.0f", debt.interestRate))% a.a.", systemImage: "percent")
                    Label(debt.dueDate.formatted(.dateTime.day().month()), systemImage: "calendar")
                    Spacer()
                    Text(debt.priority.rawValue)
                        .font(Fonts.captionStrong(12))
                        .foregroundStyle(debt.priority.color)
                }
                .font(Fonts.caption(12))
                .foregroundStyle(Theme.textSecondary)
            }
        }
    }
}