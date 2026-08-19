import SwiftUI

// MARK: - TELA 01: Onboarding

struct OnboardingView: View {
    @EnvironmentObject var app: AppState
    @State private var page = 0

    private let slides: [(icon: String, title: String, message: String)] = [
        ("magnifyingglass.circle.fill", "Entenda sua situação", "Tenha clareza sobre seu dinheiro e um plano para chegar no verdinho."),
        ("list.bullet.clipboard.fill", "Organize suas dívidas", "Centralize cartões, empréstimos e financiamentos em um só lugar."),
        ("chart.line.uptrend.xyaxis", "Crie seu plano", "Avalanche ou bola de neve: escolha a estratégia ideal de quitação."),
        ("leaf.fill", "Evolua financeiramente", "Acompanhe seu Nível No Verdinho subindo mês a mês."),
    ]

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

            // Slides
            TabView(selection: $page) {
                ForEach(slides.indices, id: \.self) { index in
                    VStack(spacing: 20) {
                        Image(systemName: slides[index].icon)
                            .font(.system(size: 64, weight: .light))
                            .foregroundStyle(Theme.green)
                            .frame(width: 140, height: 140)
                            .background(Theme.greenSoft())
                            .clipShape(Circle())
                        Text(slides[index].title)
                            .font(Fonts.headline(22))
                            .foregroundStyle(Theme.text)
                        Text(slides[index].message)
                            .font(Fonts.body())
                            .foregroundStyle(Theme.textSecondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 36)
                    }
                    .tag(index)
                }
            }
            .tabViewStyle(.page(indexDisplayMode: .never))
            .frame(height: 320)

            // Indicadores
            HStack(spacing: 8) {
                ForEach(slides.indices, id: \.self) { index in
                    Capsule()
                        .fill(index == page ? Theme.green : Theme.surfaceAlt)
                        .frame(width: index == page ? 24 : 8, height: 8)
                        .animation(.easeOut(duration: 0.2), value: page)
                }
            }
            .padding(.bottom, 30)

            PrimaryButton(page < slides.count - 1 ? "Continuar" : "Começar", icon: page < slides.count - 1 ? nil : "leaf.fill") {
                if page < slides.count - 1 {
                    withAnimation { page += 1 }
                } else {
                    withAnimation { app.onboarded = true }
                }
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
    @State private var cardCount = ""
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

            CurrencyField(value: currentBinding, placeholder: "0,00")

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
                        Badge(text: "Evoluindo", color: Theme.warning)
                    }
                    GreenLevelGauge(score: 64)
                    Text("Você está no caminho certo, mas ainda existem pontos para melhorar.")
                        .font(Fonts.body())
                        .foregroundStyle(Theme.textSecondary)
                        .multilineTextAlignment(.center)
                }
            }

            VStack(spacing: 10) {
                IndicatorRow(icon: "arrow.up.forward.circle.fill", title: "Receitas", value: Money.format(Double(income) ?? 0), color: Theme.green)
                IndicatorRow(icon: "arrow.down.right.circle.fill", title: "Despesas fixas", value: Money.format(Double(fixedExpenses) ?? 0), color: Theme.danger)
                IndicatorRow(icon: "banknote.fill", title: "Dívidas", value: Money.format(Double(debtTotal) ?? 0), color: Theme.warning)
                IndicatorRow(icon: "creditcard.fill", title: "Cartões", value: "\(cardCount)", color: Theme.info)
                IndicatorRow(icon: "calendar.badge.clock", title: "Guardar / pagar por mês", value: Money.format(Double(monthlySave) ?? 0), color: Theme.purple)
            }

            Spacer()

            PrimaryButton("Entrar no No Verdinho", icon: "leaf.fill") {
                withAnimation { app.showDiagnostic = false }
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
}