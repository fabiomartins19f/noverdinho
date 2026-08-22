import SwiftUI

// MARK: - TELA RAIZ: Aba Planejamento

struct PlanningView: View {
    private let modules: [(icon: String, title: String, subtitle: String, color: Color)] = [
        ("slider.horizontal.3", "Orçamento", "Limites por categoria", Theme.green),
        ("target", "Metas", "Acompanhe seus objetivos", Theme.greenBright),
        ("questionmark.circle.fill", "Posso gastar?", "Análise de gasto", Theme.warning),
        ("sparkles", "Inteligência", "Insights e alertas", Theme.purple),
        ("chart.bar.fill", "Relatórios", "Evolução e tendências", Theme.info),
    ]

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 14) {
                SectionTitle("Planejamento")
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    ForEach(modules, id: \.title) { module in
                        NavigationLink {
                            destination(module.title)
                        } label: {
                            VStack(alignment: .leading, spacing: 10) {
                                Image(systemName: module.icon)
                                    .font(.system(size: 17, weight: .semibold))
                                    .foregroundStyle(module.color)
                                    .frame(width: 38, height: 38)
                                    .background(Theme.soft(module.color))
                                    .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                                Text(module.title)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                    .multilineTextAlignment(.leading)
                                Text(module.subtitle)
                                    .font(Fonts.caption(11))
                                    .foregroundStyle(Theme.textSecondary)
                                    .multilineTextAlignment(.leading)
                                    .lineLimit(2)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(Theme.surface)
                            .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                            .overlay(
                                RoundedRectangle(cornerRadius: 18, style: .continuous)
                                    .stroke(Theme.border, lineWidth: 1)
                            )
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
        }
        .navigationTitle("Planejamento")
    }

    @ViewBuilder
    private func destination(_ title: String) -> some View {
        switch title {
        case "Orçamento": BudgetView()
        case "Metas": GoalsView()
        case "Posso gastar?": CanISpendView()
        case "Inteligência": IntelligenceView()
        default: ReportsView()
        }
    }
}

// MARK: - TELA: Orçamento mensal

struct BudgetView: View {
    @EnvironmentObject var app: AppState
    @State private var showEditSheet = false

    private var totalLimit: Double { app.budget.reduce(0) { $0 + $1.limit } }
    private var totalSpent: Double { app.budget.reduce(0) { $0 + $1.spent } }
    private var remaining: Double { totalLimit - totalSpent }
    private var utilization: Double { totalLimit > 0 ? totalSpent / totalLimit : 0 }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Text("Orçamento mensal")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textTertiary)
                                .textCase(.uppercase)
                            Spacer()
                            Badge(text: utilization > 1 ? "Estourado" : utilization > 0.8 ? "Atenção" : "No limite",
                                  color: utilization > 1 ? Theme.danger : utilization > 0.8 ? Theme.warning : Theme.green)
                        }
                        HStack(alignment: .lastTextBaseline) {
                            Text(Money.format(totalSpent))
                                .font(Fonts.money(30))
                                .foregroundStyle(Theme.text)
                            Text("de \(Money.format(totalLimit))")
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.textSecondary)
                        }
                        ProgressBar(progress: utilization, color: utilization > 1 ? Theme.danger : Theme.green, height: 8)
                        Text(remaining >= 0
                             ? "Restam \(Money.format(remaining)) para o mês"
                             : "Você ultrapassou o orçamento em \(Money.format(-remaining))")
                            .font(Fonts.caption(12))
                            .foregroundStyle(remaining >= 0 ? Theme.green : Theme.danger)
                    }
                }

                if totalLimit <= 0 {
                    EmptyState(
                        icon: "slider.horizontal.3",
                        title: "Sem orçamento definido",
                        message: "Defina limites por categoria para controlar seus gastos."
                    )
                }

                ForEach(app.budget) { category in
                    AppCard {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack(spacing: 12) {
                                Image(systemName: category.icon)
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundStyle(category.color)
                                    .frame(width: 34, height: 34)
                                    .background(Theme.soft(category.color))
                                    .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))
                                Text(category.name)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Spacer()
                                Text("\(Int(category.progress * 100))%")
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(category.progress > 1 ? Theme.danger : category.color)
                            }
                            HStack(alignment: .lastTextBaseline) {
                                Text(Money.format(category.spent))
                                    .font(Fonts.headline(18))
                                    .foregroundStyle(Theme.text)
                                Text("de \(Money.format(category.limit))")
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            ProgressBar(progress: category.progress,
                                       color: category.progress > 1 ? Theme.danger : category.color,
                                       height: 6)
                        }
                    }
                }

                SecondaryButton("Editar orçamento", icon: "slider.horizontal.3") {
                    showEditSheet = true
                }
            }
        }
        .navigationTitle("Orçamento")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showEditSheet) {
            BudgetEditSheet()
                .environmentObject(app)
                .presentationDetents([.medium])
        }
    }
}

// MARK: - Sheet: editar orçamento

struct BudgetEditSheet: View {
    @EnvironmentObject var app: AppState
    @Environment(\.dismiss) private var dismiss
    @State private var categoryIndex = 0
    @State private var limitText = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Editar orçamento")
                .font(Fonts.headline(20))
                .foregroundStyle(Theme.text)

            Picker("Categoria", selection: $categoryIndex) {
                ForEach(app.budget.indices, id: \.self) { index in
                    Text(app.budget[index].name).tag(index)
                }
            }
            .pickerStyle(.menu)
            .tint(Theme.green)

            CurrencyField(value: $limitText, placeholder: "Limite mensal")

            HStack {
                Text("Gasto atual: \(Money.format(app.budget[categoryIndex].spent))")
                    .font(Fonts.caption())
                    .foregroundStyle(Theme.textSecondary)
                Spacer()
            }

            Spacer()

            PrimaryButton("Salvar", icon: "checkmark.circle.fill") {
                guard categoryIndex < app.budget.count else { return }
                app.budget[categoryIndex].limit = Money.parse(limitText) ?? 0
                Haptics.success()
                dismiss()
            }
            .disabled((Money.parse(limitText) ?? 0) <= 0)
            .opacity((Money.parse(limitText) ?? 0) > 0 ? 1 : 0.5)
        }
        .padding(24)
        .onAppear {
            limitText = String(format: "%.2f", app.budget[categoryIndex].limit)
        }
    }
}

// MARK: - TELA: Metas

struct GoalsView: View {
    @EnvironmentObject var app: AppState

    private var totalSaved: Double { app.goals.reduce(0) { $0 + $1.saved } }
    private var totalTarget: Double { app.goals.reduce(0) { $0 + $1.target } }

    /// Dívida ativa mais cara (juros ≥ 60% a.a.) — base do aviso nas metas.
    private var expensiveActiveDebt: Debt? {
        app.debts
            .filter { $0.status != .paidOff && $0.interestRate >= 60 }
            .max { $0.interestRate < $1.interestRate }
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Progresso geral")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textTertiary)
                                .textCase(.uppercase)
                            Spacer()
                            Badge(text: totalTarget > 0 ? "\(Int(totalSaved / totalTarget * 100))%" : "—",
                                  color: Theme.green)
                        }
                        ProgressBar(progress: totalTarget > 0 ? totalSaved / totalTarget : 0,
                                   color: Theme.green, height: 8)
                        Text("\(Money.format(totalSaved)) de \(Money.format(totalTarget)) guardados")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                    }
                }

                if app.goals.isEmpty {
                    EmptyState(
                        icon: "target",
                        title: "Nenhuma meta",
                        message: "Defina metas para dar um destino ao seu dinheiro."
                    )
                }

                ForEach(app.goals) { goal in
                    AppCard {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack(spacing: 12) {
                                Image(systemName: goal.emoji)
                                    .font(.system(size: 15, weight: .semibold))
                                    .foregroundStyle(Theme.greenBright)
                                    .frame(width: 36, height: 36)
                                    .background(Theme.soft(Theme.greenBright))
                                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                                Text(goal.title)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Spacer()
                                Text("\(Int(goal.progress * 100))%")
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(Theme.green)
                            }
                            HStack(alignment: .lastTextBaseline) {
                                Text(Money.format(goal.saved))
                                    .font(Fonts.headline(18))
                                    .foregroundStyle(Theme.text)
                                Text("de \(Money.format(goal.target))")
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                                Spacer()
                                Text("Restam \(Money.format(max(goal.target - goal.saved, 0)))")
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textTertiary)
                            }
                            ProgressBar(progress: goal.progress, color: Theme.green, height: 6)
                            if goal.monthlyContribution > 0 && goal.progress < 1 {
                                HStack(spacing: 4) {
                                    Image(systemName: "clock.fill")
                                        .font(.system(size: 10))
                                    Text("Aportando \(Money.format(goal.monthlyContribution))/mês, meta em \(goal.projectedMonths) meses")
                                        .font(Fonts.caption(11))
                                }
                                .foregroundStyle(Theme.textSecondary)
                            }
                            if let expensiveDebt = expensiveActiveDebt {
                                HStack(alignment: .top, spacing: 4) {
                                    Image(systemName: "exclamationmark.triangle.fill")
                                        .font(.system(size: 10))
                                    Text("Priorize quitar \(expensiveDebt.creditor) (\(String(format: "%.0f", expensiveDebt.interestRate))% a.a.) antes de aumentar o aporte desta meta")
                                        .font(Fonts.caption(11))
                                        .fixedSize(horizontal: false, vertical: true)
                                }
                                .foregroundStyle(Theme.warning)
                            }
                        }
                    }
                    .swipeActions(edge: .trailing) {
                        Button(role: .destructive) {
                            withAnimation { app.goals.removeAll { $0.id == goal.id } }
                        } label: {
                            Label("Excluir", systemImage: "trash")
                        }
                    }
                }

                SecondaryButton("Adicionar meta", icon: "plus") {
                    app.addPreset = .goal
                    app.showAddSheet = true
                }
            }
        }
        .navigationTitle("Metas")
        .navigationBarTitleDisplayMode(.inline)
    }
}