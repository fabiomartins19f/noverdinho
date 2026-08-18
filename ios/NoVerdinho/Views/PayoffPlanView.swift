import SwiftUI

// MARK: - TELA 06: Plano de Quitação

struct PayoffPlanView: View {
    let debt: Debt
    @Environment(\.dismiss) private var dismiss
    @State private var monthlyAmount = "1200"
    @State private var strategy = 0

    private let strategies = [
        (name: "Avalanche", desc: "Ataca os juros maiores primeiro. Economiza mais no total.", icon: "chart.line.downtrend.xyaxis"),
        (name: "Bola de neve", desc: "Quita os menores saldos primeiro. Motivação mais rápida.", icon: "snowflake"),
    ]

    private var months: Int {
        guard let amount = Double(monthlyAmount), amount > 0 else { return 0 }
        return max(1, Int(ceil(debt.remainingBalance / amount)))
    }

    private var estimatedEconomy: Double {
        debt.interestRate > 0 ? debt.remainingBalance * 0.25 : 0
    }

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 20) {
                HStack {
                    Button { dismiss() } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: 15, weight: .bold))
                            .foregroundStyle(Theme.textSecondary)
                            .frame(width: 34, height: 34)
                            .background(Theme.surfaceAlt)
                            .clipShape(Circle())
                    }
                    .buttonStyle(.plain)
                    Spacer()
                    Text("Seu plano para ficar no verdinho")
                        .font(Fonts.headline(18))
                        .foregroundStyle(Theme.text)
                    Spacer()
                    Color.clear.frame(width: 34, height: 34)
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Quanto você consegue destinar por mês para suas dívidas?")
                            .font(Fonts.bodyMedium())
                            .foregroundStyle(Theme.text)
                        CurrencyField(value: $monthlyAmount, placeholder: "1.200")
                    }
                }

                Text("Escolha sua estratégia")
                    .font(Fonts.headline(18))
                    .foregroundStyle(Theme.text)

                ForEach(strategies.indices, id: \.self) { index in
                    Button {
                        withAnimation { strategy = index }
                    } label: {
                        HStack(spacing: 14) {
                            Image(systemName: strategies[index].icon)
                                .font(.system(size: 18, weight: .semibold))
                                .foregroundStyle(strategy == index ? Theme.background : Theme.textSecondary)
                                .frame(width: 40, height: 40)
                                .background(strategy == index ? Theme.green : Theme.surfaceAlt)
                                .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
                            VStack(alignment: .leading, spacing: 3) {
                                Text(strategies[index].name)
                                    .font(Fonts.bodyMedium())
                                    .foregroundStyle(Theme.text)
                                Text(strategies[index].desc)
                                    .font(Fonts.caption(12))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            Spacer()
                            Image(systemName: strategy == index ? "checkmark.circle.fill" : "circle")
                                .font(.system(size: 22))
                                .foregroundStyle(strategy == index ? Theme.green : Theme.borderStrong)
                        }
                        .padding(14)
                        .background(Theme.surface)
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                        .overlay(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .stroke(strategy == index ? Theme.green : Theme.border, lineWidth: strategy == index ? 1.5 : 1)
                        )
                    }
                    .buttonStyle(.plain)
                }

                AppCard {
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Previsão de quitação")
                                    .font(Fonts.caption())
                                    .foregroundStyle(Theme.textSecondary)
                                Text("\(months) meses")
                                    .font(Fonts.headline(22))
                                    .foregroundStyle(Theme.text)
                            }
                            Spacer()
                            VStack(alignment: .trailing, spacing: 2) {
                                Text("Economia estimada")
                                    .font(Fonts.caption())
                                    .foregroundStyle(Theme.textSecondary)
                                Text(Money.format(estimatedEconomy))
                                    .font(Fonts.headline(22))
                                    .foregroundStyle(Theme.green)
                            }
                        }
                        Divider().overlay(Theme.border)
                        Text("Timeline de quitação")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.textSecondary)
                        payoffTimeline
                    }
                }

                PrimaryButton("Iniciar plano", icon: "leaf.fill") {
                    dismiss()
                }
            }
        }
        .background(Theme.background.ignoresSafeArea())
        .preferredColorScheme(.dark)
    }

    private var payoffTimeline: some View {
        VStack(alignment: .leading, spacing: 12) {
            ForEach(0..<3, id: \.self) { index in
                HStack(spacing: 12) {
                    ZStack {
                        Circle()
                            .fill(index == 0 ? Theme.green : Theme.surfaceAlt)
                            .frame(width: 28, height: 28)
                        if index == 0 {
                            Image(systemName: "checkmark")
                                .font(.system(size: 12, weight: .bold))
                                .foregroundStyle(Theme.background)
                        } else {
                            Text("\(index + 1)")
                                .font(Fonts.captionStrong(12))
                                .foregroundStyle(Theme.textSecondary)
                        }
                    }
                    if index < 2 {
                        Rectangle()
                            .fill(Theme.border)
                            .frame(width: 2, height: 14)
                    }
                    VStack(alignment: .leading, spacing: 2) {
                        Text(timelineTitles[index])
                            .font(Fonts.bodyMedium())
                            .foregroundStyle(Theme.text)
                        Text(timelineSubtitles[index])
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textSecondary)
                    }
                    Spacer()
                }
            }
        }
    }

    private var timelineTitles: [String] {
        strategy == 0
            ? ["Dívida de maior juros", "Dívida de juros médios", "Dívida de menor juros"]
            : ["Dívida de menor saldo", "Dívida de saldo médio", "Dívida de maior saldo"]
    }

    private var timelineSubtitles: [String] {
        let first = strategy == 0 ? debt.remainingBalance * 0.26 : debt.remainingBalance * 0.16
        let second = strategy == 0 ? debt.remainingBalance * 0.47 : debt.remainingBalance * 0.39
        return [
            "\(Int(months * 6 / 10)) meses • \(Money.format(first))",
            "\(Int(months * 8 / 10)) meses • \(Money.format(second))",
            "\(months) meses • \(Money.format(debt.remainingBalance))",
        ]
    }
}