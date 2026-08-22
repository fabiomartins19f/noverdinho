import SwiftUI

// MARK: - TELA: Por que meu nível é esse? — decomposição do Verdinho

struct VerdinhoDetailView: View {
    @EnvironmentObject var app: AppState
    @Environment(\.dismiss) private var dismiss

    private var factors: [PurchaseSimulator.HealthFactor] {
        PurchaseSimulator.healthFactors(
            income: max(app.monthIncome, 1),
            commitments: app.monthlyCommitments,
            balance: app.balance,
            debt: app.totalDebt
        )
    }

    var body: some View {
        NavigationStack {
            ScreenScroll {
                VStack(alignment: .leading, spacing: 18) {
                    if let score = app.healthScoreValue {
                        header(score)
                        factorsCard(factors)
                        suggestionsCard(factors, score: score)
                    } else {
                        EmptyState(
                            icon: "leaf.circle",
                            title: "Sem dados suficientes",
                            message: "Cadastre receitas, dívidas ou cartões para calcular seu nível."
                        )
                    }
                    howWeCalculate
                }
            }
            .navigationTitle("Seu Verdinho")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Fechar") { dismiss() }
                }
            }
        }
        .presentationDetents([.large])
    }

    private func header(_ score: Int) -> some View {
        AppCard {
            VStack(spacing: 12) {
                VerdinhoScore(score: score)
                Text(app.level.message)
                    .font(Fonts.caption())
                    .foregroundStyle(Theme.textSecondary)
                    .multilineTextAlignment(.center)
                if score < 85 {
                    Text("Faltam **\(85 - score) pontos** para o nível No Verdinho")
                        .font(Fonts.bodyMedium())
                        .foregroundStyle(Theme.greenBright)
                } else {
                    Text("Você alcançou o nível **No Verdinho**")
                        .font(Fonts.bodyMedium())
                        .foregroundStyle(Theme.greenBright)
                }
            }
            .frame(maxWidth: .infinity)
        }
    }

    private func factorsCard(_ factors: [PurchaseSimulator.HealthFactor]) -> some View {
        AppCard {
            VStack(alignment: .leading, spacing: 14) {
                SectionTitle("De onde vem sua nota")
                ForEach(Array(factors.enumerated()), id: \.element.title) { _, factor in
                    factorRow(factor)
                }
            }
        }
    }

    private func factorRow(_ factor: PurchaseSimulator.HealthFactor) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 10) {
                Image(systemName: factor.icon)
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(factor.points == 0 ? Theme.danger : (factor.points == factor.maxPoints ? Theme.greenBright : Theme.warning))
                    .frame(width: 30, height: 30)
                    .background(Theme.surfaceAlt)
                    .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))
                Text(factor.title)
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
                Spacer()
                Text("\(factor.points)/\(factor.maxPoints)")
                    .font(Fonts.captionStrong().monospacedDigit())
                    .foregroundStyle(factor.points == 0 ? Theme.danger : Theme.green)
            }
            ProgressBar(progress: Double(factor.points) / Double(max(factor.maxPoints, 1)),
                        color: factor.points == 0 ? Theme.danger : (factor.points == factor.maxPoints ? Theme.greenBright : Theme.warning),
                        height: 5)
            Text(factor.detail)
                .font(Fonts.caption(11))
                .foregroundStyle(Theme.textTertiary)
        }
    }

    @ViewBuilder
    private func suggestionsCard(_ factors: [PurchaseSimulator.HealthFactor], score: Int) -> some View {
        let suggestions = PurchaseSimulator.improvementSuggestions(
            factors: factors,
            income: max(app.monthIncome, 1),
            commitments: app.monthlyCommitments
        )
        if score < 85, !suggestions.isEmpty {
            AppCard {
                VStack(alignment: .leading, spacing: 12) {
                    SectionTitle("Ações que aceleram seu progresso")
                    ForEach(Array(suggestions.enumerated()), id: \.offset) { index, suggestion in
                        HStack(alignment: .top, spacing: 10) {
                            Text("\(index + 1)")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.background)
                                .frame(width: 20, height: 20)
                                .background(Theme.green)
                                .clipShape(Circle())
                            Text(suggestion)
                                .font(Fonts.caption(13))
                                .foregroundStyle(Theme.textSecondary)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                    }
                }
            }
        }
    }

    private var howWeCalculate: some View {
        AppCard {
            VStack(alignment: .leading, spacing: 8) {
                SectionTitle("Como calculamos")
                Text("Sua nota soma quatro fatores: fundamentos do cadastro (25), comprometimento da renda (35), liquidez da reserva (25) e peso das dívidas na renda anual (15). Ela muda em tempo real conforme você registra receitas, pagamentos e dívidas.")
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
    }
}
