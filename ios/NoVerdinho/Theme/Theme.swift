import SwiftUI

// MARK: - Cores (Dark Mode como padrão, com variantes Light)

extension Color {
    init(hex: String) {
        var value: UInt64 = 0
        let cleaned = hex.trimmingCharacters(in: CharacterSet(charactersIn: "#"))
        Scanner(string: cleaned).scanHexInt64(&value)
        let r = Double((value >> 16) & 0xFF) / 255
        let g = Double((value >> 8) & 0xFF) / 255
        let b = Double(value & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}

enum Theme {
    // Superfícies (Dark padrão)
    static let background = Color(hex: "0B0F0D")
    static let surface = Color(hex: "121714")
    static let surfaceAlt = Color(hex: "18201B")
    static let surfaceElevated = Color(hex: "1D2620")
    static let border = Color(hex: "242E28")
    static let borderStrong = Color(hex: "2E3A33")

    // Verde — evolução, progresso, situações positivas
    static let green = Color(hex: "2FE6A0")
    static let greenBright = Color(hex: "4DF2B5")
    static let greenDark = Color(hex: "0FA06C")
    static let greenGradient = LinearGradient(
        colors: [Color(hex: "4DF2B5"), Color(hex: "12C988")],
        startPoint: .leading, endPoint: .trailing
    )
    static func greenSoft(_ opacity: Double = 0.12) -> Color {
        Color(hex: "2FE6A0").opacity(opacity)
    }

    // Texto
    static let text = Color(hex: "F3F7F4")
    static let textSecondary = Color(hex: "9AA79F")
    static let textTertiary = Color(hex: "7A8A80")

    // Semânticas
    static let danger = Color(hex: "FF5A5F")
    static let dangerSoft = Color(hex: "FF5A5F").opacity(0.12)
    static let warning = Color(hex: "FFB84D")
    static let warningSoft = Color(hex: "FFB84D").opacity(0.12)
    static let info = Color(hex: "57A9FF")
    static let infoSoft = Color(hex: "57A9FF").opacity(0.12)
    static let purple = Color(hex: "A48BFF")
    static let purpleSoft = Color(hex: "A48BFF").opacity(0.12)
}

// MARK: - Tipografia

enum Fonts {
    // Fonte arredondada do app. Os tamanhos são fixos para manter o layout
    // das telas; o suporte completo a Dynamic Type (escala de acessibilidade)
    // está planejado como melhoria futura.
    static func title(_ size: CGFloat = 28) -> Font { .system(size: size, weight: .bold, design: .rounded) }
    static func headline(_ size: CGFloat = 20) -> Font { .system(size: size, weight: .semibold, design: .rounded) }
    static func body(_ size: CGFloat = 16) -> Font { .system(size: size, weight: .regular, design: .rounded) }
    static func bodyMedium(_ size: CGFloat = 16) -> Font { .system(size: size, weight: .medium, design: .rounded) }
    static func caption(_ size: CGFloat = 13) -> Font { .system(size: size, weight: .regular, design: .rounded) }
    static func captionStrong(_ size: CGFloat = 13) -> Font { .system(size: size, weight: .semibold, design: .rounded) }
    static func money(_ size: CGFloat = 32) -> Font { .system(size: size, weight: .bold, design: .rounded).monospacedDigit() }
    static func tab(_ size: CGFloat = 10) -> Font { .system(size: size, weight: .medium, design: .rounded) }
}

// MARK: - Formatadores

enum Money {
    static func format(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = Locale(identifier: "pt_BR")
        formatter.currencySymbol = "R$ "
        formatter.minimumFractionDigits = 2
        return formatter.string(from: NSNumber(value: value)) ?? "R$ 0,00"
    }

    /// Converte texto digitado em valor, aceitando "1250", "1250.50",
    /// "1.250,50" e "R$ 1.250,50". Retorna nil para texto vazio ou inválido.
    static func parse(_ text: String) -> Double? {
        let trimmed = text
            .replacingOccurrences(of: "R$", with: "")
            .trimmingCharacters(in: .whitespaces)
        let normalized: String
        if trimmed.contains(",") {
            // "1.250,50" → "1250.50"
            normalized = trimmed
                .replacingOccurrences(of: ".", with: "")
                .replacingOccurrences(of: ",", with: ".")
        } else if trimmed.contains(".") {
            // Sem vírgula: o ponto é separador de milhar quando há 3 dígitos
            // após o último ponto ("2.500" → 2500); caso contrário é decimal
            // ("1250.50" → 1250.5).
            if let lastDot = trimmed.lastIndex(of: "."),
               trimmed.distance(from: lastDot, to: trimmed.endIndex) == 4 {
                normalized = trimmed.replacingOccurrences(of: ".", with: "")
            } else {
                normalized = trimmed
            }
        } else {
            normalized = trimmed
        }
        guard let value = Double(normalized), value > 0 else { return nil }
        return value
    }

    static func formatCompact(_ value: Double) -> String {
        let absValue = abs(value)
        if absValue >= 1000 {
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            formatter.locale = Locale(identifier: "pt_BR")
            formatter.maximumFractionDigits = absValue >= 100000 ? 0 : 1
            let compact = formatter.string(from: NSNumber(value: absValue / 1000)) ?? "0"
            return value < 0 ? "-R$ \(compact) mil" : "R$ \(compact) mil"
        }
        return format(value)
    }
}

// MARK: - Visualização compartilhada do fundo

struct AppBackground: ViewModifier {
    func body(content: Content) -> some View {
        content
            .background(Theme.background.ignoresSafeArea())
            .preferredColorScheme(.dark)
    }
}

extension View {
    func appBackground() -> some View { modifier(AppBackground()) }
}