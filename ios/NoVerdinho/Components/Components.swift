import SwiftUI
import UIKit

// MARK: - Feedback tátil

enum Haptics {
    /// Toque leve para ações comuns (salvar, selecionar).
    static func light() {
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
    }

    /// Confirmação para ações concluídas com sucesso.
    static func success() {
        UINotificationFeedbackGenerator().notificationOccurred(.success)
    }
}

// MARK: - Cartão padrão

struct AppCard<Content: View>: View {
    var padding: CGFloat = 16
    @ViewBuilder let content: Content

    var body: some View {
        content
            .padding(padding)
            .background(Theme.surface)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(Theme.border, lineWidth: 1)
            )
    }
}

// MARK: - Botão primário

struct PrimaryButton: View {
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
            .foregroundStyle(Theme.background)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 15)
            .background(Theme.greenGradient)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Botão secundário

struct SecondaryButton: View {
    let title: String
    let action: () -> Void

    init(_ title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            Text(title)
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

// MARK: - Badge de status

struct Badge: View {
    let text: String
    var color: Color

    var body: some View {
        Text(text)
            .font(Fonts.captionStrong(12))
            .foregroundStyle(color)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(color.opacity(0.12))
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
                .background(color.opacity(0.12))
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

// MARK: - Input de moeda

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

// MARK: - Gráfico de linha (SVG próprio, sem libs)

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
                // Linha
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

                // Pontos
                ForEach(Array(points.enumerated()), id: \.element.id) { index, point in
                    let x = CGFloat(index) * stepX
                    let y = geo.size.height - (CGFloat(point.value - minValue) / range) * geo.size.height
                    Circle()
                        .fill(Theme.background)
                        .frame(width: 8, height: 8)
                        .overlay(Circle().stroke(color, lineWidth: 2.5))
                        .position(x: x, y: y)
                }

                // Área suave sob a linha
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
                            let value = series[seriesIndex].values[index]
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

// MARK: - Nível No Verdinho (score proprietário)

struct GreenLevelGauge: View {
    let score: Int

    var body: some View {
        VStack(spacing: 16) {
            ZStack {
                // arco progressivo 270°
                Circle()
                    .trim(from: 0, to: 0.75)
                    .stroke(Theme.surfaceAlt, style: StrokeStyle(lineWidth: 12, lineCap: .round))
                    .rotationEffect(.degrees(135))
                Circle()
                    .trim(from: 0, to: 0.75 * (Double(score) / 100))
                    .stroke(Theme.greenGradient, style: StrokeStyle(lineWidth: 12, lineCap: .round))
                    .rotationEffect(.degrees(135))
                    .animation(.easeOut(duration: 0.9), value: score)
                VStack(spacing: 2) {
                    Text("\(score)")
                        .font(.system(size: 44, weight: .bold, design: .rounded).monospacedDigit())
                        .foregroundStyle(Theme.text)
                    Text("/ 100")
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                }
            }
            .frame(width: 150, height: 150)
        }
    }
}

// MARK: - Tela de fundo com navegação

struct ScreenScroll<Content: View>: View {
    @ViewBuilder let content: Content

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                content
            }
            .padding(.horizontal, 20)
            .padding(.top, 12)
            .padding(.bottom, 100)
        }
        .scrollIndicators(.hidden)
    }
}