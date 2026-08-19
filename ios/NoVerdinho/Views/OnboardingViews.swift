import SwiftUI

// MARK: - TELA 01: Onboarding

struct OnboardingView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        VStack(spacing: 0) {
            Spacer()

            Image("AppLogo")
                .resizable()
                .scaledToFit()
                .frame(width: 96, height: 96)
                .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
                .shadow(color: Theme.green.opacity(0.3), radius: 18, y: 6)

            Text("NO VERDINHO")
                .font(.system(size: 34, weight: .black, design: .rounded))
                .foregroundStyle(Theme.greenGradient)
                .tracking(2)
                .padding(.top, 14)

            Text("Organize. Quite. Evolua.")
                .font(Fonts.bodyMedium())
                .foregroundStyle(Theme.textSecondary)
                .padding(.top, 6)

            Spacer()

            Image(systemName: "leaf.fill")
                .font(.system(size: 64, weight: .light))
                .foregroundStyle(Theme.green)
                .frame(width: 140, height: 140)
                .background(Theme.greenSoft())
                .clipShape(Circle())

            Text("Entenda sua situação, organize suas dívidas e crie seu plano para chegar no verdinho.")
                .font(Fonts.body())
                .foregroundStyle(Theme.textSecondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 36)
                .padding(.top, 20)

            Spacer()

            PrimaryButton("Começar", icon: "leaf.fill") {
                withAnimation { app.onboarded = true }
            }
            .padding(.horizontal, 28)

            Spacer()
        }
        .padding(.bottom, 24)
    }
}

// MARK: - TELA 02: Diagnóstico financeiro

struct DiagnosticView: View {
    @EnvironmentObject var app: AppState
    @State private var step = 0
    @State private var income = ""
    @State private var fixedExpenses = ""
    @State private var debtTotal = ""
    @State private var cardCount = "1"
    @State private var monthlySave = ""
    @State private var finished = false

    private let totalSteps = 5

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            // Barra de progresso
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Text("Diagnóstico financeiro")
                        .font(Fonts.headline(20))
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Text("\(step + 1)/\(totalSteps)")
                        .font(Fonts.captionStrong())
                        .foregroundStyle(Theme.textSecondary)
                }
                ProgressBar(progress: Double(step + 1) / Double(totalSteps), color: Theme.green, height: 6)
            }
            .padding(.top, 8)

            if finished {
                diagnosticResult
            } else {
                questionView
                    .transition(.move(edge: .trailing).combined(with: .opacity))
            }

            Spacer()
        }
        .padding(.horizontal, 20)
        .animation(.easeOut(duration: 0.25), value: step)
        .animation(.easeOut(duration: 0.25), value: finished)
    }

    private var questionView: some View {
        VStack(alignment: .leading, spacing: 28) {
            Text(questions[step])
                .font(Fonts.title(24))
                .foregroundStyle(Theme.text)
                .fixedSize(horizontal: false, vertical: true)

            // Pergunta de cartões não usa campo de valor — só os botões 1–4.
            if step != 3 {
                CurrencyField(value: currentBinding, placeholder: "0,00")
            }

            if step == 3 {
                HStack(spacing: 8) {
                    ForEach(1...4, id: \.self) { count in
                        Button {
                            cardCount = String(count)
                        } label: {
                            Text("\(count)")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(cardCount == String(count) ? Theme.background : Theme.text)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(cardCount == String(count) ? Theme.green : Theme.surfaceAlt)
                                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                        }
                        .buttonStyle(.plain)
                    }
                }
            }

            Spacer()

            HStack(spacing: 12) {
                if step > 0 {
                    SecondaryButton("Voltar") { withAnimation { step -= 1 } }
                }
                PrimaryButton(step == totalSteps - 1 ? "Ver meu diagnóstico" : "Continuar") {
                    if step == totalSteps - 1 {
                        withAnimation { finished = true }
                    } else {
                        withAnimation { step += 1 }
                    }
                }
            }
        }
    }

    private var diagnosticResult: some View {
        VStack(spacing: 24) {
            Spacer()
            Image(systemName: "checkmark.seal.fill")
                .font(.system(size: 60, weight: .light))
                .foregroundStyle(Theme.green)
            Text("Seu diagnóstico está pronto")
                .font(Fonts.title(26))
                .foregroundStyle(Theme.text)
                .multilineTextAlignment(.center)

            AppCard {
                VStack(spacing: 16) {
                    HStack {
                        Text("NÍVEL NO VERDINHO")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.textSecondary)
                        Spacer()
                        Badge(text: scoreBand.title, color: scoreBand.color)
                    }
                    GreenLevelGauge(score: computedScore)
                    Text(computedScore >= 85
                        ? "Parabéns! Sua saúde financeira está bem verde."
                        : "Você está no caminho certo, mas ainda existem pontos para melhorar.")
                        .font(Fonts.body())
                        .foregroundStyle(Theme.textSecondary)
                        .multilineTextAlignment(.center)
                }
            }

            VStack(spacing: 10) {
                IndicatorRow(icon: "arrow.up.forward.circle.fill", title: "Receitas", value: Money.format(incomeValue), color: Theme.green)
                IndicatorRow(icon: "arrow.down.right.circle.fill", title: "Despesas fixas", value: Money.format(expensesValue), color: Theme.danger)
                IndicatorRow(icon: "banknote.fill", title: "Dívidas", value: Money.format(debtValue), color: Theme.warning)
                IndicatorRow(icon: "creditcard.fill", title: "Cartões", value: "\(cardCount)", color: Theme.info)
                IndicatorRow(icon: "calendar.badge.clock", title: "Guardar / pagar por mês", value: Money.format(saveValue), color: Theme.purple)
            }

            Spacer()

            PrimaryButton("Entrar no No Verdinho", icon: "leaf.fill") {
                app.levelScore = computedScore
                withAnimation { app.diagnosticDone = true }
            }
        }
    }

    private let questions = [
        "Quanto você recebe por mês?",
        "Quanto possui em despesas fixas?",
        "Quanto possui em dívidas?",
        "Quantos cartões utiliza?",
        "Quanto consegue guardar ou pagar por mês?",
    ]

    private var currentBinding: Binding<String> {
        switch step {
        case 0: $income
        case 1: $fixedExpenses
        case 2: $debtTotal
        case 3: $cardCount
        default: $monthlySave
        }
    }

    private var incomeValue: Double { Money.parse(income) ?? 0 }
    private var expensesValue: Double { Money.parse(fixedExpenses) ?? 0 }
    private var debtValue: Double { Money.parse(debtTotal) ?? 0 }
    private var saveValue: Double { Money.parse(monthlySave) ?? 0 }

    /// Escore simples a partir das respostas: base + poupança, ajustes por
    /// despesas e dívidas. Limita o resultado entre 10 e 98.
    private var computedScore: Int {
        guard incomeValue > 0 else { return 45 }
        var score = 45
        score += Int((saveValue / incomeValue) * 100)
        if expensesValue < incomeValue * 0.6 { score += 10 }
        else if expensesValue < incomeValue * 0.8 { score += 5 }
        if debtValue <= 0 { score += 10 }
        score -= min(Int((expensesValue / incomeValue) * 30), 20)
        return min(max(score, 10), 98)
    }

    private var scoreBand: (title: String, color: Color) {
        switch computedScore {
        case 0..<30: ("Sinal vermelho", Theme.danger)
        case 30..<50: ("Atenção", Theme.warning)
        case 50..<70: ("Evoluindo", Theme.warning)
        case 70..<85: ("No caminho", Theme.green)
        default: ("Verdinho", Theme.greenBright)
        }
    }
}