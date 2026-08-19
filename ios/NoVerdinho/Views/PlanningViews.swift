import SwiftUI

// MARK: - TELA 08: Planejamento (orçamento)

struct PlanningView: View {
    @EnvironmentObject var app: AppState

    private var totalLimit: Double { app.budget.reduce(0) { $0 + $1.limit } }
    private var totalSpent: Double { app.budget.reduce(0) { $0 + $1.spent } }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Planejamento")
                        .font(Fonts.headline(20))
                        .foregroundStyle(Theme.text)
                    Text("Orçamento do mês: \(Money.format(totalLimit))")
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                }

                // Resumo geral
                AppCard {
                    VStack(alignment: .leading, spacing: 10) {
                        HStack {
                            Text("Consumo do mês")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.textSecondary)
                            Spacer()
                            Text("\(Int(totalSpent / totalLimit * 100))%")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(totalSpent > totalLimit ? Theme.danger : Theme.green)
                        }
                        ProgressBar(progress: totalSpent / totalLimit,
                                    color: totalSpent > totalLimit ? Theme.danger : Theme.green,
                                    height: 12)
                        Text("\(Money.format(totalSpent)) de \(Money.format(totalLimit))")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                    }
                }

                // Categorias
                ForEach(app.budget) { category in
                    AppCard {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack(spacing: 10) {
                                Image(systemName: category.icon)
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundStyle(category.color)
                                    .frame(width: 32, height: 32)
                                    .background(category.color.opacity(0.12))
                                    .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))
                                Text(category.name)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Spacer()
                                Text(category.progress > 1 ? "Excedeu" : "\(Int(category.progress * 100))%")
                                    .font(Fonts.captionStrong(12))
                                    .foregroundStyle(category.progress > 1 ? Theme.danger : Theme.textSecondary)
                            }
                            ProgressBar(progress: category.progress, color: category.progress > 1 ? Theme.danger : category.color)
                            HStack {
                                Text(Money.format(category.spent))
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(category.progress > 1 ? Theme.danger : Theme.text)
                                Spacer()
                                Text("Limite \(Money.format(category.limit))")
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Planejamento")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - TELA 09: Metas

struct GoalsView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                if app.goals.isEmpty {
                    EmptyState(
                        icon: "target",
                        title: "Nenhuma meta",
                        message: "Crie metas de reserva, viagem ou quitação para acompanhar seu progresso."
                    )
                    PrimaryButton("Criar meta", icon: "plus") {
                        app.addPreset = .goal
                        app.showAddSheet = true
                    }
                }

                ForEach(app.goals) { goal in
                    AppCard {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack(spacing: 12) {
                                Image(systemName: goal.emoji)
                                    .font(.system(size: 22, weight: .semibold))
                                    .foregroundStyle(Theme.green)
                                    .frame(width: 44, height: 44)
                                    .background(Theme.greenSoft())
                                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(goal.title)
                                        .font(Fonts.bodyMedium())
                                        .foregroundStyle(Theme.text)
                                    Text("R$ \(goal.monthlyContribution.formatted(.number.locale(Locale(identifier: "pt_BR"))))/mês")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textSecondary)
                                }
                                Spacer()
                                Text("\(Int(goal.progress * 100))%")
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(Theme.green)
                            }

                            ProgressBar(progress: goal.progress, color: Theme.green, height: 10)

                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Acumulado")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textSecondary)
                                    Text(Money.format(goal.saved))
                                        .font(Fonts.captionStrong())
                                        .foregroundStyle(Theme.text)
                                }
                                Spacer()
                                VStack(alignment: .trailing, spacing: 2) {
                                    Text("Meta")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textSecondary)
                                    Text(Money.format(goal.target))
                                        .font(Fonts.captionStrong())
                                        .foregroundStyle(Theme.text)
                                }
                                Spacer()
                                VStack(alignment: .trailing, spacing: 2) {
                                    Text("Previsão")
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textSecondary)
                                    Text(goal.projectedMonths > 0 ? "\(goal.projectedMonths) meses" : "—")
                                        .font(Fonts.captionStrong())
                                        .foregroundStyle(Theme.green)
                                }
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Minhas metas")
        .navigationBarTitleDisplayMode(.inline)
    }
}