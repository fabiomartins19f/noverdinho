import SwiftUI

// MARK: - TELA: Calendário financeiro (#6)

struct FinanceCalendarView: View {
    @EnvironmentObject var app: AppState
    @State private var monthOffset = 0
    @State private var selectedDay: Date?

    private let columns = Array(repeating: GridItem(.flexible(), spacing: 6), count: 7)
    private let weekdayHeaders = ["D", "S", "T", "Q", "Q", "S", "S"]

    private var month: Date {
        Calendar.current.date(byAdding: .month, value: monthOffset, to: Calendar.current.dateInterval(of: .month, for: .now)!.start) ?? .now
    }

    private var monthDays: [Date?] {
        let cal = Calendar.current
        let first = cal.dateInterval(of: .month, for: month)!.start
        let count = cal.range(of: .day, in: .month, for: month)!.count
        let leading = cal.component(.weekday, from: first) - 1
        var days: [Date?] = Array(repeating: nil, count: leading)
        for day in 1...count {
            days.append(cal.date(byAdding: .day, value: day - 1, to: first))
        }
        return days
    }

    private var commitmentsByDay: [String: [UpcomingPayment]] {
        Dictionary(grouping: app.upcomingPayments) { key($0.date) }
    }

    private var incomeByDay: [String: [Transaction]] {
        Dictionary(grouping: app.transactions.filter { $0.kind == .income }) { key($0.date) }
    }

    private func key(_ date: Date) -> String {
        let f = DateFormatter(); f.dateFormat = "yyyy-MM-dd"; return f.string(from: date)
    }

    private func dotColor(_ date: Date) -> Color? {
        let k = key(date)
        if commitmentsByDay[k]?.contains(where: { $0.kind == .invoice || $0.kind == .installment }) == true { return Theme.danger }
        if commitmentsByDay[k] != nil { return Theme.warning }
        if incomeByDay[k] != nil { return Theme.greenBright }
        return nil
    }

    private var selectedDetails: [(icon: String, name: String, value: String, color: Color)] {
        guard let day = selectedDay else { return [] }
        let k = key(day)
        var rows: [(String, String, String, Color)] = []
        for payment in commitmentsByDay[k] ?? [] {
            rows.append((payment.kind.icon, payment.name, Money.format(payment.amount), Theme.danger))
        }
        for tx in incomeByDay[k] ?? [] {
            rows.append(("arrow.down.left.circle.fill", tx.name, "+\(Money.format(tx.amount))", Theme.green))
        }
        return rows
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(spacing: 14) {
                        HStack {
                            Button { monthOffset -= 1 } label: {
                                Image(systemName: "chevron.left").font(.system(size: 14, weight: .bold))
                            }
                            .buttonStyle(.plain)
                            Spacer()
                            Text(month.formatted(.dateTime.month().year().locale(Locale(identifier: "pt_BR"))))
                                .font(Fonts.headline(17))
                            Spacer()
                            Button { monthOffset += 1 } label: {
                                Image(systemName: "chevron.right").font(.system(size: 14, weight: .bold))
                            }
                            .buttonStyle(.plain)
                        }
                        .foregroundStyle(Theme.text)

                        HStack {
                            ForEach(weekdayHeaders, id: \.self) { label in
                                Text(label).font(Fonts.captionStrong(10)).foregroundStyle(Theme.textTertiary).frame(maxWidth: .infinity)
                            }
                        }

                        LazyVGrid(columns: columns, spacing: 6) {
                            ForEach(Array(monthDays.enumerated()), id: \.offset) { _, day in
                                if let day {
                                    dayCell(day)
                                } else {
                                    Color.clear.frame(height: 34)
                                }
                            }
                        }
                    }
                }

                legend

                if let day = selectedDay {
                    AppCard {
                        VStack(alignment: .leading, spacing: 12) {
                            SectionTitle(day.formatted(.dateTime.day().month().locale(Locale(identifier: "pt_BR"))))
                            if selectedDetails.isEmpty {
                                Text("Nenhum compromisso ou recebimento neste dia.")
                                    .font(Fonts.caption())
                                    .foregroundStyle(Theme.textTertiary)
                            }
                            ForEach(selectedDetails, id: \.name) { row in
                                IndicatorRow(icon: row.0, title: row.1, value: row.2, color: row.3)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Calendário")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear { selectedDay = nil }
    }

    private func dayCell(_ date: Date) -> some View {
        let isSelected = selectedDay.map { Calendar.current.isDate($0, inSameDayAs: date) } ?? false
        let isToday = Calendar.current.isDateInToday(date)
        return Button {
            withAnimation(.easeOut(duration: 0.15)) { selectedDay = date }
        } label: {
            VStack(spacing: 3) {
                Text("\(Calendar.current.component(.day, from: date))")
                    .font(Fonts.captionStrong(12))
                    .foregroundStyle(isToday ? Theme.background : Theme.text)
                    .frame(width: 30, height: 30)
                    .background(isSelected ? Theme.green : (isToday ? Theme.greenBright : Color.clear))
                    .clipShape(Circle())
                Circle()
                    .fill(dotColor(date) ?? .clear)
                    .frame(width: 5, height: 5)
            }
            .frame(maxWidth: .infinity)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel("\(date.formatted(.dateTime.day().month()))\(dotColor(date) != nil ? ", tem movimentação" : "")")
    }

    private var legend: some View {
        HStack(spacing: 14) {
            legendItem("Vencimento", Theme.danger)
            legendItem("Recebimento", Theme.greenBright)
        }
        .frame(maxWidth: .infinity)
    }

    private func legendItem(_ text: String, _ color: Color) -> some View {
        HStack(spacing: 5) {
            Circle().fill(color).frame(width: 7, height: 7)
            Text(text).font(Fonts.caption(11)).foregroundStyle(Theme.textSecondary)
        }
    }
}

// MARK: - TELA: Raio-X financeiro (#9)

struct FinancialXRayView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        SectionTitle("Seu raio-X")
                        IndicatorRow(icon: "banknote.fill", title: "Renda mensal",
                                     value: Money.format(app.monthIncome), color: Theme.green)
                        let ratio = app.monthIncome > 0 ? app.monthlyCommitments / app.monthIncome : 0
                        IndicatorRow(icon: "chart.pie.fill", title: "Comprometimento",
                                     value: "\(Int((ratio * 100).rounded()))%",
                                     color: ratio > 0.65 ? Theme.danger : (ratio > 0.45 ? Theme.warning : Theme.green))
                        IndicatorRow(icon: "creditcard.fill", title: "Dívidas",
                                     value: Money.format(app.totalDebt), color: Theme.warning)
                        let usage = app.cards.reduce(0.0) { $0 + $1.used } / max(app.cards.reduce(0.0) { $0 + $1.limit }, 1)
                        IndicatorRow(icon: "rectangle.stack.fill", title: "Cartões utilizados",
                                     value: "\(Int((usage * 100).rounded()))%", color: usage > 0.8 ? Theme.danger : Theme.info)
                        IndicatorRow(icon: "drop.fill", title: "Reserva",
                                     value: app.monthlyCommitments > 0
                                         ? String(format: "%.1f mês(es) de compromissos", app.balance / app.monthlyCommitments)
                                         : "Saldo sem compromissos", color: Theme.greenBright)
                    }
                }

                if !app.expensesByCategoryReal.isEmpty {
                    AppCard {
                        VStack(alignment: .leading, spacing: 14) {
                            SectionTitle("O que mais pesa")
                            ForEach(Array(app.expensesByCategoryReal.prefix(5)), id: \.name) { item in
                                VStack(alignment: .leading, spacing: 6) {
                                    HStack {
                                        Text(item.name).font(Fonts.caption(13)).foregroundStyle(Theme.text)
                                        Spacer()
                                        Text(Money.format(item.value)).font(Fonts.captionStrong()).foregroundStyle(Theme.textSecondary)
                                    }
                                    ProgressBar(progress: item.value / max(app.expensesByCategoryReal.first?.value ?? 1, 1),
                                                color: barColor(index: app.expensesByCategoryReal.firstIndex(where: { $0.name == item.name }) ?? 0),
                                                height: 6)
                                }
                            }
                        }
                    }
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        SectionTitle("De onde vem sua nota")
                        ForEach(PurchaseSimulator.healthFactors(
                            income: max(app.monthIncome, 1),
                            commitments: app.monthlyCommitments,
                            balance: app.balance,
                            debt: app.totalDebt
                        ), id: \.title) { factor in
                            IndicatorRow(icon: factor.icon, title: factor.title,
                                         value: "\(factor.points)/\(factor.maxPoints)",
                                         color: factor.points == 0 ? Theme.danger : Theme.green)
                        }
                    }
                }
            }
        }
        .navigationTitle("Raio-X financeiro")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func barColor(index: Int) -> Color {
        [Theme.danger, Theme.warning, Theme.info, Theme.purple, Theme.textTertiary][index % 5]
    }
}

// MARK: - TELA: Plano de 90 dias (#20)

struct NinetyDayPlanView: View {
    @EnvironmentObject var app: AppState

    private var plan: NinetyDayPlan.Plan { app.ninetyDayPlan }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            SectionTitle("Progresso geral")
                            Spacer()
                            Badge(text: "\(Int(plan.overallProgress * 100))%", color: Theme.green)
                        }
                        ProgressBar(progress: plan.overallProgress, color: Theme.greenBright, height: 9)
                        Text("Três meses para sair do sufoco: organize, conte os gastos e ganhe folga. Tudo medido com seus dados reais.")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }

                ForEach(plan.steps) { step in
                    AppCard {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack(spacing: 10) {
                                Image(systemName: step.status == .done ? "checkmark.circle.fill" : (step.status == .inProgress ? "circle.dotted" : "circle"))
                                    .font(.system(size: 16))
                                    .foregroundStyle(step.status == .done ? Theme.greenBright : Theme.textTertiary)
                                Text("\(step.month) · \(step.title)")
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Spacer()
                                Text("\(Int(step.progress * 100))%")
                                    .font(Fonts.captionStrong().monospacedDigit())
                                    .foregroundStyle(step.status == .done ? Theme.green : Theme.textSecondary)
                            }
                            ProgressBar(progress: step.progress,
                                       color: step.status == .done ? Theme.green : Theme.warning, height: 5)
                            Text(step.goal)
                                .font(Fonts.caption(11))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
            }
        }
        .navigationTitle("Plano de 90 dias")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - TELA: Conquistas (#12)

struct AchievementsSection: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        AppCard {
            VStack(alignment: .leading, spacing: 14) {
                SectionTitle("Conquistas")
                ForEach(app.achievements) { achievement in
                    HStack(spacing: 12) {
                        Image(systemName: achievement.icon)
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundStyle(achievement.earned ? Theme.greenBright : Theme.textTertiary)
                            .frame(width: 34, height: 34)
                            .background(Theme.soft(achievement.earned ? Theme.green : Theme.surfaceAlt))
                            .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))
                        VStack(alignment: .leading, spacing: 2) {
                            Text(achievement.title)
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(achievement.earned ? Theme.text : Theme.textSecondary)
                            Text(achievement.detail)
                                .font(Fonts.caption(11))
                                .foregroundStyle(Theme.textTertiary)
                        }
                        Spacer()
                        if achievement.earned {
                            Image(systemName: "checkmark")
                                .font(.system(size: 12, weight: .bold))
                                .foregroundStyle(Theme.greenBright)
                        }
                    }
                    .opacity(achievement.earned ? 1 : 0.55)
                }
            }
        }
    }
}