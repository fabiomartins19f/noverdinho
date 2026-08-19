import SwiftUI

// MARK: - TELA 10: Posso Gastar?

struct CanISpendView: View {
    @EnvironmentObject var app: AppState
    @State private var amount = ""
    @State private var result: CanISpendResult?
    @State private var inputError: String?

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 20) {
                Text("Quer saber se dá para gastar?")
                    .font(Fonts.title(24))
                    .foregroundStyle(Theme.text)
                Text("Informe o valor e o No Verdinho analisa saldo, compromissos, dívidas, orçamento, cartões e metas.")
                    .font(Fonts.body())
                    .foregroundStyle(Theme.textSecondary)

                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Quanto você quer gastar?")
                            .font(Fonts.bodyMedium())
                            .foregroundStyle(Theme.text)
                        CurrencyField(value: $amount, placeholder: "500")
                        if let inputError {
                            Text(inputError)
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.danger)
                        }
                    }
                }

                PrimaryButton("Analisar", icon: "sparkles") {
                    guard let value = Money.parse(amount) else {
                        inputError = "Informe um valor válido (ex.: 500 ou 1.250,50)."
                        Haptics.light()
                        return
                    }
                    inputError = nil
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {
                        result = app.canISpend(value)
                    }
                }
                .onChange(of: amount) {
                    // Nova análise a cada edição: esconde o resultado anterior.
                    result = nil
                }

                if let result {
                    AppCard {
                        VStack(spacing: 14) {
                            Image(systemName: result.icon)
                                .font(.system(size: 44, weight: .light))
                                .foregroundStyle(result.color)
                            Text(result.verdict.rawValue)
                                .font(Fonts.headline(20))
                                .foregroundStyle(result.color)
                            Text(result.reason)
                                .font(Fonts.body())
                                .foregroundStyle(Theme.textSecondary)
                                .multilineTextAlignment(.center)
                            Text("Análise de \(Money.format(Money.parse(amount) ?? 0))")
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.textTertiary)
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .transition(.scale.combined(with: .opacity))
                }
            }
        }
        .navigationTitle("Posso gastar?")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - TELA 11: Inteligência Financeira

struct IntelligenceView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                HStack {
                    VStack(alignment: .leading, spacing: 3) {
                        Text("Seu Verdinho")
                            .font(Fonts.headline(20))
                            .foregroundStyle(Theme.text)
                        Text("A IA analisa seu comportamento financeiro")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                    }
                    Spacer()
                    Image(systemName: "sparkles")
                        .font(.system(size: 20))
                        .foregroundStyle(Theme.green)
                        .frame(width: 40, height: 40)
                        .background(Theme.greenSoft())
                        .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                }

                ForEach(app.insights) { insight in
                    AppCard {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack(spacing: 8) {
                                Image(systemName: insightToneIcon(insight.tone))
                                    .font(.system(size: 13, weight: .semibold))
                                    .foregroundStyle(insightToneColor(insight.tone))
                                Text(insight.title)
                                    .font(Fonts.captionStrong())
                                    .foregroundStyle(insightToneColor(insight.tone))
                            }
                            Text(insight.message)
                                .font(Fonts.body())
                                .foregroundStyle(Theme.text)
                            if let action = insight.action {
                                switch action {
                                case "Ver cartão":
                                    NavigationLink {
                                        CardsView()
                                    } label: {
                                        actionLabel(action)
                                    }
                                    .buttonStyle(.plain)
                                case "Ver metas":
                                    NavigationLink {
                                        GoalsView()
                                    } label: {
                                        actionLabel(action)
                                    }
                                    .buttonStyle(.plain)
                                default:
                                    Button {
                                        app.selectedTab = action == "Ajustar plano" ? .debts : .planning
                                    } label: {
                                        actionLabel(action)
                                    }
                                    .buttonStyle(.plain)
                                }
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Inteligência")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func actionLabel(_ text: String) -> some View {
        HStack(spacing: 4) {
            Text(text)
                .font(Fonts.captionStrong())
            Image(systemName: "arrow.right")
                .font(.system(size: 11, weight: .bold))
        }
        .foregroundStyle(Theme.green)
    }

    private func insightToneIcon(_ tone: InsightCard.Tone) -> String {
        switch tone {
        case .positive: "arrow.down.right.circle.fill"
        case .warning: "exclamationmark.triangle.fill"
        case .action: "lightbulb.fill"
        }
    }

    private func insightToneColor(_ tone: InsightCard.Tone) -> Color {
        switch tone {
        case .positive: Theme.green
        case .warning: Theme.warning
        case .action: Theme.info
        }
    }
}