import SwiftUI
import UIKit

// MARK: - Feedback tátil

enum Haptics {
    static func light() {
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }

    static func success() {
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }
}

// MARK: - Cartão padrão

struct AppCard<Content: View>: View {
    var padding: CGFloat = 16
    var cornerRadius: CGFloat = 16
    @ViewBuilder let content: Content

    var body: some View {
        content
            .padding(padding)
            .background(Theme.surface)
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .stroke(Theme.border, lineWidth: 1)
            )
    }
}

// MARK: - Botões

struct PrimaryButton: View {
    let title: String
    let icon: String?
    let action: () -> Void
    @Environment(\.isEnabled) private var isEnabled

    init(_ title: String, icon: String? = nil, action: @escaping () -> Void) {
        self.title = title
        self.icon = icon
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if let icon { Image(systemName: icon) }
                Text(title)
            }
            .font(Fonts.bodyMedium())
            .foregroundStyle(Theme.background)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 15)
            .background(Theme.greenGradient)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
        .buttonStyle(.plain)
        .opacity(isEnabled ? 1 : 0.45)
    }
}

struct SecondaryButton: View {
    let title: String
    let icon: String?
    let action: () -> Void

    init(_ title: String, icon: String? = nil, action: @escaping () -> Void) {
        self.title = title
        self.icon = icon
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            HStack(spacing: 8) {
                if let icon { Image(systemName: icon) }
                Text(title)
            }
            .font(Fonts.bodyMedium())
                .foregroundStyle(Theme.text)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(Theme.surfaceAlt)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                .overlay(
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .stroke(Theme.borderStrong, lineWidth: 1)
                )
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Campo de formulário compartilhado
// (evita repetir o estilo de TextField em todas as telas)

struct FormField: View {
    let placeholder: String
    @Binding var text: String
    var icon: String? = nil
    var keyboard: UIKeyboardType = .default
    var isSecure = false
    var autocapitalization: TextInputAutocapitalization = .sentences
    var autocorrectionDisabled = false

    init(_ placeholder: String, text: Binding<String>, icon: String? = nil,
         keyboard: UIKeyboardType = .default, isSecure: Bool = false,
         autocapitalization: TextInputAutocapitalization = .sentences,
         autocorrectionDisabled: Bool = false) {
        self.placeholder = placeholder
        self._text = text
        self.icon = icon
        self.keyboard = keyboard
        self.isSecure = isSecure
        self.autocapitalization = autocapitalization
        self.autocorrectionDisabled = autocorrectionDisabled
    }

    var body: some View {
        HStack(spacing: 10) {
            if let icon {
                Image(systemName: icon)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(Theme.green)
            }
            Group {
                if isSecure {
                    SecureField(placeholder, text: $text)
                } else {
                    TextField(placeholder, text: $text)
                }
            }
            .font(Fonts.body())
            .foregroundStyle(Theme.text)
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 13)
        .background(Theme.surfaceAlt)
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(Theme.borderStrong, lineWidth: 1)
        )
        .keyboardType(keyboard)
        .textInputAutocapitalization(autocapitalization)
        .autocorrectionDisabled(autocorrectionDisabled)
    }
}

// MARK: - Campo de moeda

struct CurrencyField: View {
    @Binding var value: String
    var placeholder: String

    var body: some View {
        HStack(spacing: 6) {
            Text("R$")
                .font(Fonts.bodyMedium())
                .foregroundStyle(Theme.green)
            TextField(placeholder, text: $value)
                .keyboardType(.decimalPad)
                .font(Fonts.bodyMedium())
                .foregroundStyle(Theme.text)
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 13)
        .background(Theme.surfaceAlt)
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(Theme.borderStrong, lineWidth: 1)
        )
    }
}

// MARK: - Título de seção

struct SectionTitle: View {
    let title: String
    var action: (String, () -> Void)? = nil

    init(_ title: String, action: (String, () -> Void)? = nil) {
        self.title = title
        self.action = action
    }

    var body: some View {
        HStack {
            Text(title)
                .font(Fonts.headline(18))
                .foregroundStyle(Theme.text)
            Spacer()
            if let action {
                Button(action: action.1) {
                    Text(action.0)
                        .font(Fonts.captionStrong())
                        .foregroundStyle(Theme.green)
                }
                .buttonStyle(.plain)
            }
        }
    }
}

// MARK: - Barra de progresso

struct ProgressBar: View {
    let progress: Double
    var color: Color = Theme.green
    var height: CGFloat = 8

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.surfaceAlt)
                Capsule()
                    .fill(color)
                    .frame(width: max(0, min(1, progress)) * geo.size.width)
            }
        }
        .frame(height: height)
    }
}

// MARK: - Badge

struct Badge: View {
    let text: String
    var color: Color

    var body: some View {
        Text(text)
            .font(Fonts.captionStrong(12))
            .foregroundStyle(color)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(Theme.soft(color))
            .clipShape(Capsule())
    }
}

// MARK: - Linha de indicador com ícone

struct IndicatorRow: View {
    let icon: String
    let title: String
    let value: String
    var color: Color = Theme.text

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(color)
                .frame(width: 32, height: 32)
                .background(Theme.soft(color))
                .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))
            Text(title)
                .font(Fonts.caption())
                .foregroundStyle(Theme.textSecondary)
            Spacer()
            Text(value)
                .font(Fonts.captionStrong())
                .foregroundStyle(color)
        }
    }
}

// MARK: - Avatar + botão de notificações

struct AvatarView: View {
    let initials: String
    var size: CGFloat = 40

    var body: some View {
        Text(initials)
            .font(Fonts.captionStrong(14))
            .foregroundStyle(Theme.text)
            .frame(width: size, height: size)
            .background(
                Circle().fill(
                    LinearGradient(
                        colors: [Theme.surfaceElevated, Theme.surfaceAlt],
                        startPoint: .topLeading, endPoint: .bottomTrailing
                    )
                )
            )
            .overlay(Circle().stroke(Theme.border, lineWidth: 1))
    }
}

struct NotificationButton: View {
    let badgeCount: Int
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: "bell.fill")
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(Theme.textSecondary)
                .frame(width: 40, height: 40)
                .background(Theme.surfaceAlt)
                .clipShape(Circle())
                .overlay(alignment: .topTrailing) {
                    if badgeCount > 0 {
                        Circle()
                            .fill(Theme.danger)
                            .frame(width: 9, height: 9)
                            .overlay(Circle().stroke(Theme.background, lineWidth: 1.5))
                            .offset(x: -1, y: 1)
                    }
                }
        }
        .buttonStyle(.plain)
        .accessibilityLabel(badgeCount > 0 ? "\(badgeCount) notificações" : "Notificações")
    }
}

// MARK: - Card de saldo principal

struct BalanceCard: View {
    let balance: Double
    let weekDelta: Double
    var isBalanceHidden = false
    var onToggleVisibility: (() -> Void)? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("Saldo disponível")
                    .font(Fonts.caption())
                    .foregroundStyle(Theme.textSecondary)
                Spacer()
                if let onToggleVisibility {
                    Button(action: onToggleVisibility) {
                        Image(systemName: isBalanceHidden ? "eye.slash.fill" : "eye.fill")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundStyle(Theme.textSecondary)
                            .frame(width: 30, height: 30)
                            .background(Theme.surfaceAlt)
                            .clipShape(Circle())
                    }
                    .buttonStyle(.plain)
                }
            }

            Text(isBalanceHidden ? "R$ ••••••" : Money.format(balance))
                .font(Fonts.money(40))
                .foregroundStyle(Theme.text)
                .contentTransition(.opacity)
                .animation(.easeInOut(duration: 0.18), value: isBalanceHidden)

            HStack(spacing: 6) {
                Image(systemName: weekDelta >= 0 ? "arrow.down.left.circle.fill" : "arrow.up.right.circle.fill")
                    .font(.system(size: 12, weight: .semibold))
                Text("\(weekDelta >= 0 ? "+" : "")\(Money.format(weekDelta)) esta semana")
                    .font(Fonts.caption(13))
            }
            .foregroundStyle(weekDelta >= 0 ? Theme.greenBright : Theme.danger)

            Divider().overlay(Theme.border)

            HStack(spacing: 4) {
                Text("Ver movimentações")
                    .font(Fonts.captionStrong())
                Image(systemName: "arrow.right")
                    .font(.system(size: 11, weight: .bold))
            }
            .foregroundStyle(Theme.green)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .fill(Color(hex: "0A0E0C"))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 26, style: .continuous)
                .stroke(Theme.border, lineWidth: 1)
        )
        .shadow(color: Theme.green.opacity(0.06), radius: 24, y: 8)
    }
}

// MARK: - Resumo financeiro (Receitas / Despesas / Dívidas)

struct SummaryCard: View {
    let icon: String
    let title: String
    let value: String
    let delta: Double?
    var color: Color
    /// Para despesas/dívidas, cair é positivo (inverte a cor do delta).
    var deltaPositiveIsGood = true

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(color)
                .frame(width: 32, height: 32)
                .background(Theme.soft(color))
                .clipShape(RoundedRectangle(cornerRadius: 9, style: .continuous))

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(Fonts.caption(11))
                    .foregroundStyle(Theme.textTertiary)
                    .textCase(.uppercase)
                Text(value)
                    .font(Fonts.captionStrong(15))
                    .foregroundStyle(Theme.text)
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
            }

            if let delta {
                let isGood = deltaPositiveIsGood ? delta >= 0 : delta <= 0
                let isUp = delta >= 0
                HStack(spacing: 3) {
                    Image(systemName: isUp ? "arrow.up.right" : "arrow.down.right")
                        .font(.system(size: 9, weight: .bold))
                    Text("\(delta >= 0 ? "+" : "")\(String(format: "%.1f", abs(delta)))%")
                        .font(Fonts.caption(11))
                }
                .foregroundStyle(isGood ? Theme.green : Theme.warning)
            }
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
}

// MARK: - Seu Verdinho (folha em anel de progresso)

struct VerdinhoScore: View {
    let score: Int

    var body: some View {
        ZStack {
            Circle()
                .trim(from: 0, to: 0.75)
                .stroke(Theme.surfaceAlt, style: StrokeStyle(lineWidth: 12, lineCap: .round))
                .rotationEffect(.degrees(135))
            Circle()
                .trim(from: 0, to: 0.75 * (Double(min(max(score, 0), 100)) / 100))
                .stroke(Theme.greenGradient, style: StrokeStyle(lineWidth: 12, lineCap: .round))
                .rotationEffect(.degrees(135))
                .animation(.easeOut(duration: 0.9), value: score)

            VStack(spacing: 2) {
                Image(systemName: "leaf.fill")
                    .font(.system(size: 30, weight: .semibold))
                    .foregroundStyle(Theme.greenBright)
                Text("\(score)")
                    .font(.system(size: 34, weight: .bold, design: .rounded).monospacedDigit())
                    .foregroundStyle(Theme.text)
                Text("/ 100")
                    .font(Fonts.caption(11))
                    .foregroundStyle(Theme.textSecondary)
            }
        }
        .frame(width: 150, height: 150)
        .shadow(color: Theme.green.opacity(0.12), radius: 18, y: 6)
    }
}

// MARK: - Card de ação inteligente

struct SmartActionCard: View {
    let icon: String
    let title: String
    let message: String
    let actionTitle: String
    let onAction: () -> Void
    var accent: Color = Theme.green

    var body: some View {
        HStack(alignment: .top, spacing: 14) {
            Image(systemName: icon)
                .font(.system(size: 18, weight: .semibold))
                .foregroundStyle(accent)
                .frame(width: 44, height: 44)
                .background(Theme.soft(accent))
                .clipShape(RoundedRectangle(cornerRadius: 13, style: .continuous))
            VStack(alignment: .leading, spacing: 6) {
                Text(title)
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
                Text(message)
                    .font(Fonts.caption())
                    .foregroundStyle(Theme.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
                Button(action: onAction) {
                    HStack(spacing: 4) {
                        Text(actionTitle)
                            .font(Fonts.captionStrong())
                        Image(systemName: "arrow.right")
                            .font(.system(size: 11, weight: .bold))
                    }
                    .foregroundStyle(accent)
                }
                .buttonStyle(.plain)
            }
            Spacer(minLength: 0)
        }
        .padding(16)
        .background(Theme.surface)
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(Theme.border, lineWidth: 1)
        )
    }
}

// MARK: - Alerta financeiro (âmbar discreto)

struct FinancialAlertCard: View {
    let message: String
    let actionTitle: String
    let onAction: () -> Void

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(Theme.warning)
            VStack(alignment: .leading, spacing: 4) {
                Text("Fique atento")
                    .font(Fonts.captionStrong())
                    .foregroundStyle(Theme.warning)
                Text(message)
                    .font(Fonts.caption())
                    .foregroundStyle(Theme.textSecondary)
                    .fixedSize(horizontal: false, vertical: true)
                Button(action: onAction) {
                    HStack(spacing: 4) {
                        Text(actionTitle)
                            .font(Fonts.captionStrong())
                        Image(systemName: "arrow.right")
                            .font(.system(size: 11, weight: .bold))
                    }
                    .foregroundStyle(Theme.warning)
                }
                .buttonStyle(.plain)
            }
            Spacer(minLength: 0)
        }
        .padding(16)
        .background(Theme.soft(Theme.warning, 0.06))
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(Theme.warning.opacity(0.25), lineWidth: 1)
        )
    }
}

// MARK: - Compromisso (linha de timeline)

struct UpcomingPaymentRow: View {
    let icon: String
    let title: String
    let subtitle: String
    let value: String
    let color: Color

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 15, weight: .semibold))
                .foregroundStyle(color)
                .frame(width: 38, height: 38)
                .background(Theme.soft(color))
                .clipShape(RoundedRectangle(cornerRadius: 11, style: .continuous))
            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
                Text(subtitle)
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.textSecondary)
            }
            Spacer()
            Text(value)
                .font(Fonts.captionStrong())
                .foregroundStyle(Theme.text)
        }
        .padding(12)
        .background(Theme.surface)
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .stroke(Theme.border, lineWidth: 1)
        )
    }
}

// MARK: - Card "Posso gastar?"

struct CanISpendCard: View {
    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: "sparkles")
                .font(.system(size: 20, weight: .semibold))
                .foregroundStyle(Theme.greenBright)
                .frame(width: 48, height: 48)
                .background(Theme.soft(Theme.green))
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            VStack(alignment: .leading, spacing: 3) {
                Text("Posso gastar?")
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
                Text("Antes de comprar, veja o impacto no seu orçamento")
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.textSecondary)
            }
            Spacer(minLength: 8)
            Text("Consultar")
                .font(Fonts.captionStrong())
                .foregroundStyle(Theme.background)
                .padding(.horizontal, 14)
                .padding(.vertical, 9)
                .background(Theme.green)
                .clipShape(Capsule())
        }
        .padding(16)
        .background(
            LinearGradient(
                colors: [Theme.surface, Color(hex: "0A100D")],
                startPoint: .topLeading, endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .stroke(Theme.border, lineWidth: 1)
        )
    }
}

// MARK: - Skeleton (loading state)

struct SkeletonBlock: View {
    var width: CGFloat = 120
    var height: CGFloat = 14

    @State private var pulse = false

    var body: some View {
        RoundedRectangle(cornerRadius: 6, style: .continuous)
            .fill(Theme.surfaceAlt)
            .frame(width: width, height: height)
            .opacity(pulse ? 0.4 : 1)
            .animation(.easeInOut(duration: 0.8).repeatForever(autoreverses: true), value: pulse)
            .onAppear { pulse = true }
    }
}

// MARK: - Gráfico de linha minimalista (evolução do nível)

struct LineChart: View {
    let points: [MonthlySeriesPoint]
    var color: Color = Theme.green

    var body: some View {
        GeometryReader { geo in
            let values = points.map(\.value)
            let maxValue = max(values.max() ?? 1, 1)
            let minValue = min(values.min() ?? 0, 0)
            let range = max(maxValue - minValue, 1)
            let stepX = points.count > 1 ? geo.size.width / CGFloat(points.count - 1) : geo.size.width

            ZStack {
                Path { path in
                    for (index, point) in points.enumerated() {
                        let x = CGFloat(index) * stepX
                        let y = geo.size.height - (CGFloat(point.value - minValue) / range) * geo.size.height
                        if index == 0 {
                            path.move(to: CGPoint(x: x, y: y))
                        } else {
                            path.addLine(to: CGPoint(x: x, y: y))
                        }
                    }
                }
                .stroke(color, style: StrokeStyle(lineWidth: 2.5, lineCap: .round, lineJoin: .round))

                Path { path in
                    for (index, point) in points.enumerated() {
                        let x = CGFloat(index) * stepX
                        let y = geo.size.height - (CGFloat(point.value - minValue) / range) * geo.size.height
                        if index == 0 {
                            path.move(to: CGPoint(x: x, y: geo.size.height))
                            path.addLine(to: CGPoint(x: x, y: y))
                        } else {
                            path.addLine(to: CGPoint(x: x, y: y))
                        }
                    }
                    path.addLine(to: CGPoint(x: geo.size.width, y: geo.size.height))
                    path.closeSubpath()
                }
                .fill(color.opacity(0.08))

                ForEach(Array(points.enumerated()), id: \.element.id) { index, point in
                    let x = CGFloat(index) * stepX
                    let y = geo.size.height - (CGFloat(point.value - minValue) / range) * geo.size.height
                    Circle()
                        .fill(Theme.background)
                        .frame(width: 7, height: 7)
                        .overlay(Circle().stroke(color, lineWidth: 2))
                        .position(x: x, y: y)
                }
            }
        }
    }
}

// MARK: - Gráfico de barras verticais

struct BarChart: View {
    let labels: [String]
    let series: [(values: [Double], color: Color)]
    var height: CGFloat = 160

    var body: some View {
        let allValues = series.flatMap(\.values)
        let maxValue = max(allValues.max() ?? 1, 1)

        HStack(alignment: .bottom, spacing: 10) {
            ForEach(labels.indices, id: \.self) { index in
                VStack(spacing: 6) {
                    HStack(alignment: .bottom, spacing: 3) {
                        ForEach(series.indices, id: \.self) { seriesIndex in
                            let value = index < series[seriesIndex].values.count ? series[seriesIndex].values[index] : 0
                            RoundedRectangle(cornerRadius: 3, style: .continuous)
                                .fill(series[seriesIndex].color)
                                .frame(width: 10, height: max(2, (value / maxValue) * height))
                        }
                    }
                    .frame(height: height, alignment: .bottom)
                    Text(labels[index])
                        .font(Fonts.caption(10))
                        .foregroundStyle(Theme.textTertiary)
                }
                .frame(maxWidth: .infinity)
            }
        }
    }
}

// MARK: - Empty state

struct EmptyState: View {
    let icon: String
    let title: String
    let message: String

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 40, weight: .light))
                .foregroundStyle(Theme.textTertiary)
            Text(title)
                .font(Fonts.headline())
                .foregroundStyle(Theme.text)
            Text(message)
                .font(Fonts.caption())
                .foregroundStyle(Theme.textSecondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
    }
}

// MARK: - Tela de fundo com rolagem

struct ScreenScroll<Content: View>: View {
    @ViewBuilder let content: Content

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                content
            }
            .padding(.horizontal, 20)
            .padding(.top, 12)
            .padding(.bottom, 110)
        }
        .scrollIndicators(.hidden)
    }
}