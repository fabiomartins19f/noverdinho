import Foundation
import SwiftUI

// MARK: - Tipos base

enum DebtType: String, CaseIterable, Codable {
    case creditCard = "Cartão de crédito"
    case loan = "Empréstimo"
    case financing = "Financiamento"
    case installments = "Parcelamento"

    var icon: String {
        switch self {
        case .creditCard: "creditcard.fill"
        case .loan: "banknote.fill"
        case .financing: "house.fill"
        case .installments: "calendar.badge.clock"
        }
    }
}

enum DebtStatus: String, Codable {
    case paidOff, onTime, overdue
}

enum DebtPriority: String, Codable {
    case high = "Alta"
    case medium = "Média"
    case low = "Baixa"

    var color: Color {
        switch self {
        case .high: Theme.danger
        case .medium: Theme.warning
        case .low: Theme.green
        }
    }
}

struct Debt: Identifiable, Codable {
    let id = UUID()
    let type: DebtType
    let creditor: String
    let originalAmount: Double
    let paidAmount: Double
    let remainingBalance: Double
    let interestRate: Double
    let installment: Double
    let installmentCount: Int
    let paidInstallments: Int
    let dueDate: Date
    let priority: DebtPriority
    let status: DebtStatus

    var progress: Double { originalAmount > 0 ? paidAmount / originalAmount : 0 }
}

// MARK: - Cartão de crédito

struct CreditCard: Identifiable, Codable {
    let id = UUID()
    let name: String
    let institution: String
    let lastDigits: String
    let limit: Double
    var used: Double
    var currentInvoice: Double
    let dueDay: Int
    var statementItems: [CardPurchase] = []

    var available: Double { limit - used }
    var utilization: Double { limit > 0 ? used / limit : 0 }

    /// Cor de marca do cartão (estilo Nubank), derivada do nome do cartão.
    var brandColor: Color {
        switch name.lowercased() {
        case let n where n.contains("nubank"): Color(hex: "820AD1")
        case let n where n.contains("itau") || n.contains("itaú"): Color(hex: "EC7000")
        case let n where n.contains("inter"): Color(hex: "FF7A00")
        case let n where n.contains("amex") || n.contains("american"): Color(hex: "1F9FD9")
        case let n where n.contains("santander"): Color(hex: "EC0000")
        case let n where n.contains("bradesco"): Color(hex: "CC092F")
        case let n where n.contains("caixa"): Color(hex: "005CA9")
        case let n where n.contains("bb ") || n.contains("brasil"): Color(hex: "FAF33E")
        default: Theme.green
        }
    }

    /// Gradiente da marca usado na barra de limite e nos destaques.
    var brandGradient: LinearGradient {
        LinearGradient(
            colors: [brandColor.opacity(0.9), brandColor],
            startPoint: .leading, endPoint: .trailing
        )
    }
}

struct CardPurchase: Identifiable, Codable {
    let id = UUID()
    let name: String
    let amount: Double
    let installments: Int
    let paidInstallments: Int
    let date: Date
    var fromStatement: Bool = false
}

struct Transaction: Identifiable, Codable {
    enum Kind: String, Codable { case income, expense, transfer }
    let id = UUID()
    let kind: Kind
    let name: String
    let category: String
    let amount: Double
    let date: Date
}

struct UpcomingPayment: Identifiable {
    let id = UUID()
    let name: String
    let amount: Double
    let date: Date
    let kind: PaymentKind

    enum PaymentKind {
        case bill, invoice, installment
        var color: Color { self == .bill ? Theme.warning : Theme.info }
        var icon: String {
            switch self {
            case .bill: "doc.text.fill"
            case .invoice: "creditcard.fill"
            case .installment: "calendar.fill"
            }
        }
    }
}

struct BudgetCategory: Identifiable {
    let id = UUID()
    let name: String
    let icon: String
    let color: Color
    let limit: Double
    let spent: Double

    var progress: Double { limit > 0 ? spent / limit : 0 }
}

struct Goal: Identifiable, Codable {
    enum Kind: String, Codable, CaseIterable {
        case debt, reserve, car, travel

        var title: String {
            switch self {
            case .debt: "Quitar dívidas"
            case .reserve: "Reserva de emergência"
            case .car: "Comprar carro"
            case .travel: "Viagem"
            }
        }

        /// Símbolo SF usado como ícone da meta.
        var icon: String {
            switch self {
            case .debt: "banknote.fill"
            case .reserve: "building.columns.fill"
            case .car: "car.fill"
            case .travel: "airplane"
            }
        }
    }

    let id = UUID()
    let kind: Kind
    let title: String
    let emoji: String
    let target: Double
    let saved: Double
    let monthlyContribution: Double

    var progress: Double { target > 0 ? saved / target : 0 }

    var projectedMonths: Int {
        guard monthlyContribution > 0 else { return 0 }
        return Int(ceil((target - saved) / monthlyContribution))
    }
}

struct InsightCard: Identifiable {
    enum Tone { case positive, warning, action }
    let id = UUID()
    let title: String
    let message: String
    let action: String?
    let tone: Tone
}

struct ReportRow: Identifiable {
    let id = UUID()
    let title: String
    let values: [Double]
    let color: Color
    let prefix: String
}

struct MonthlySeriesPoint: Identifiable {
    let id = UUID()
    let label: String
    let value: Double
}

struct CanISpendResult {
    enum Verdict: String { case ok = "Compra compatível", caution = "Cuidado", notRecommended = "Não recomendado" }
    let verdict: Verdict
    let reason: String
    let icon: String
    var color: Color {
        switch verdict {
        case .ok: Theme.green
        case .caution: Theme.warning
        case .notRecommended: Theme.danger
        }
    }
}

// MARK: - Nível No Verdinho

struct GreenLevel {
    let score: Int
    let delta: Int
    let evolution: [MonthlySeriesPoint]
    let message: String

    var band: (title: String, color: Color) {
        switch score {
        case 0..<30: ("Sinal vermelho", Theme.danger)
        case 30..<50: ("Atenção", Theme.warning)
        case 50..<70: ("Evoluindo", Theme.warning)
        case 70..<85: ("No caminho", Theme.green)
        default: ("Verdinho", Theme.greenBright)
        }
    }
}

// MARK: - Tipos de adição (bottom sheet "+")

enum AddSheetType: String, CaseIterable {
    case income = "Receita"
    case expense = "Despesa"
    case debt = "Dívida"
    case card = "Cartão"
    case goal = "Meta"

    var icon: String {
        switch self {
        case .income: "arrow.down.left.circle.fill"
        case .expense: "arrow.up.right.circle.fill"
        case .debt: "banknote.fill"
        case .card: "creditcard.fill"
        case .goal: "target"
        }
    }

    var color: Color {
        switch self {
        case .income: Theme.green
        case .expense: Theme.danger
        case .debt: Theme.warning
        case .card: Theme.purple
        case .goal: Theme.greenBright
        }
    }
}

// MARK: - App State (mock + persistência local)

final class AppState: ObservableObject {
    /// Chave usada no UserDefaults para guardar os dados do usuário.
    private static let storageKey = "noverdinho.persisted"

    @Published var onboarded = false { didSet { save() } }
    @Published var registered = false { didSet { save() } }
    @Published var diagnosticDone = false { didSet { save() } }
    @Published var userName = "Usuário" { didSet { save() } }
    @Published var userEmail = "usuario@email.com" { didSet { save() } }
    @Published var showAddSheet = false
    @Published var addPreset: AddSheetType?
    @Published var balance: Double = 3240 { didSet { save() } }
    @Published var selectedTab: Tab = .home
    @Published var transactions: [Transaction] { didSet { save() } }
    @Published var debts: [Debt] { didSet { save() } }
    @Published var cards: [CreditCard] { didSet { save() } }
    @Published var goals: [Goal] { didSet { save() } }

    init() {
        transactions = Self.defaultTransactions
        debts = Self.defaultDebts
        cards = Self.defaultCards
        goals = Self.defaultGoals
        load()
    }

    // MARK: Dados estáticos (demo)

    /// Pontuação do Nível No Verdinho (vem do diagnóstico e fica salva).
    @Published var levelScore = 72 { didSet { save() } }

    private static let levelEvolution: [MonthlySeriesPoint] = [
        .init(label: "Mar", value: 41), .init(label: "Abr", value: 46),
        .init(label: "Mai", value: 49), .init(label: "Jun", value: 55),
        .init(label: "Jul", value: 62), .init(label: "Ago", value: 72),
    ]

    var level: GreenLevel {
        GreenLevel(
            score: levelScore,
            delta: 8,
            evolution: Self.levelEvolution,
            message: levelScore >= 70
                ? "Você avançou 8 pontos este mês"
                : "Você está no caminho certo para o verdinho"
        )
    }

    static let defaultTransactions: [Transaction] = [
        .init(kind: .income, name: "Salário", category: "Salário", amount: 7500, date: .now.addingTimeInterval(-86400 * 2)),
        .init(kind: .expense, name: "Mercado", category: "Alimentação", amount: 486.90, date: .now.addingTimeInterval(-86400)),
        .init(kind: .expense, name: "Aluguel", category: "Moradia", amount: 1800, date: .now.addingTimeInterval(-86400 * 3)),
        .init(kind: .expense, name: "Academia", category: "Saúde", amount: 99.90, date: .now.addingTimeInterval(-86400 * 4)),
        .init(kind: .expense, name: "Uber", category: "Transporte", amount: 38.40, date: .now.addingTimeInterval(-86400 * 5)),
        .init(kind: .income, name: "Freelance", category: "Freelance", amount: 1200, date: .now.addingTimeInterval(-86400 * 6)),
    ]

    static let defaultDebts: [Debt] = [
        .init(type: .creditCard, creditor: "Cartão Nubank", originalAmount: 12000, paidAmount: 7150, remainingBalance: 4850,
              interestRate: 240, installment: 360, installmentCount: 12, paidInstallments: 7,
              dueDate: .now.addingTimeInterval(86400 * 9), priority: .high, status: .onTime),
        .init(type: .loan, creditor: "Empréstimo Banco", originalAmount: 25000, paidAmount: 11200, remainingBalance: 13800,
              interestRate: 72, installment: 780, installmentCount: 24, paidInstallments: 11,
              dueDate: .now.addingTimeInterval(86400 * 15), priority: .medium, status: .onTime),
        .init(type: .financing, creditor: "Financiamento Veículo", originalAmount: 48000, paidAmount: 46220, remainingBalance: 1780,
              interestRate: 18, installment: 890, installmentCount: 48, paidInstallments: 46,
              dueDate: .now.addingTimeInterval(86400 * 21), priority: .low, status: .onTime),
        .init(type: .installments, creditor: "Parcelamento iPhone", originalAmount: 8600, paidAmount: 5600, remainingBalance: 3000,
              interestRate: 0, installment: 500, installmentCount: 10, paidInstallments: 6,
              dueDate: .now.addingTimeInterval(-86400 * 12), priority: .medium, status: .overdue),
    ]

    var totalDebt: Double { debts.reduce(0) { $0 + $1.remainingBalance } }

    static let defaultCards: [CreditCard] = [
        .init(name: "Nubank", institution: "Nu Pagamentos", lastDigits: "4821", limit: 8000, used: 3850,
              currentInvoice: 1850, dueDay: 12,
              statementItems: [
                  .init(name: "Passagem aérea", amount: 1840, installments: 6, paidInstallments: 2, date: .now.addingTimeInterval(-86400 * 40)),
                  .init(name: "Notebook", amount: 5200, installments: 10, paidInstallments: 4, date: .now.addingTimeInterval(-86400 * 90)),
                  .init(name: "Restaurante", amount: 340, installments: 1, paidInstallments: 1, date: .now.addingTimeInterval(-86400 * 12)),
                  .init(name: "Curso online", amount: 1200, installments: 3, paidInstallments: 1, date: .now.addingTimeInterval(-86400 * 25)),
              ]),
        .init(name: "Itaú", institution: "Banco Itaú", lastDigits: "9903", limit: 5000, used: 2650,
              currentInvoice: 1150, dueDay: 5),
        .init(name: "Amex", institution: "American Express", lastDigits: "1044", limit: 3000, used: 2850,
              currentInvoice: 2850, dueDay: 18),
    ]

    static let defaultGoals: [Goal] = [
        .init(kind: .debt, title: "Quitar dívidas", emoji: "banknote.fill", target: 18430, saved: 7420, monthlyContribution: 1200),
        .init(kind: .reserve, title: "Reserva de emergência", emoji: "building.columns.fill", target: 18000, saved: 8600, monthlyContribution: 800),
        .init(kind: .car, title: "Comprar carro", emoji: "car.fill", target: 45000, saved: 12300, monthlyContribution: 1500),
        .init(kind: .travel, title: "Viagem", emoji: "airplane", target: 8000, saved: 3400, monthlyContribution: 500),
    ]

    let upcomingPayments: [UpcomingPayment] = [
        .init(name: "Fatura Nubank", amount: 1850, date: .now.addingTimeInterval(86400 * 4), kind: .invoice),
        .init(name: "Aluguel", amount: 1800, date: .now.addingTimeInterval(86400 * 7), kind: .bill),
        .init(name: "Parcela Cartão Nubank", amount: 360, date: .now.addingTimeInterval(86400 * 9), kind: .installment),
        .init(name: "Parcela Empréstimo", amount: 780, date: .now.addingTimeInterval(86400 * 15), kind: .installment),
    ]

    let budget: [BudgetCategory] = [
        .init(name: "Moradia", icon: "house.fill", color: Theme.warning, limit: 2200, spent: 1950),
        .init(name: "Alimentação", icon: "cart.fill", color: Theme.green, limit: 1200, spent: 980),
        .init(name: "Transporte", icon: "bus.fill", color: Theme.info, limit: 800, spent: 620),
        .init(name: "Lazer", icon: "party.popper.fill", color: Theme.purple, limit: 700, spent: 920),
        .init(name: "Saúde", icon: "heart.fill", color: Theme.danger, limit: 500, spent: 290),
        .init(name: "Outros", icon: "ellipsis.circle.fill", color: Theme.textTertiary, limit: 600, spent: 420),
    ]

    let insights: [InsightCard] = [
        .init(title: "Alimentação em queda", message: "Você gastou 18% menos com alimentação este mês.", action: "Ver detalhes", tone: .positive),
        .init(title: "Cartão pesado", message: "Seu cartão Nubank representa uma parcela elevada da sua renda.", action: "Ver cartão", tone: .warning),
        .init(title: "Antecipe sua quitação", message: "Adicionar R$ 200 ao pagamento da dívida principal pode antecipar sua quitação em 5 meses.", action: "Ajustar plano", tone: .action),
        .init(title: "Meta próxima", message: "Faltam R$ 4.600 para sua reserva de emergência.", action: "Ver metas", tone: .positive),
    ]

    let reports: [ReportRow] = [
        .init(title: "Receitas", values: [6500, 6800, 6200, 7500, 7200, 8700], color: Theme.green, prefix: "Receitas"),
        .init(title: "Despesas", values: [4200, 4600, 4100, 4500, 4400, 4260], color: Theme.danger, prefix: "Despesas"),
        .init(title: "Evolução das dívidas", values: [28900, 26400, 24300, 22050, 19840, 18430], color: Theme.warning, prefix: "Dívidas"),
        .init(title: "Economia mensal", values: [2300, 2200, 2100, 3000, 2800, 4440], color: Theme.greenBright, prefix: "Economia"),
    ]

    let reportLabels = ["Mar", "Abr", "Mai", "Jun", "Jul", "Ago"]

    let expensesByCategory: [(name: String, value: Double, color: Color)] = [
        ("Moradia", 1950, Theme.warning),
        ("Alimentação", 980, Theme.green),
        ("Lazer", 920, Theme.purple),
        ("Transporte", 620, Theme.info),
        ("Saúde", 290, Theme.danger),
        ("Outros", 420, Theme.textTertiary),
    ]

    let profileSections: [(title: String, icon: String, items: [(String, String)])] = [
        ("Preferências", "slider.horizontal.3", [("Aparência", "Escuro"), ("Moeda", "BRL"), ("Idioma", "Português")]),
        ("Segurança", "lock.shield.fill", [("Face ID", "Ativado"), ("Mudar senha", ""), ("Notificações", "Ativado")]),
        ("Dados", "externaldrive.fill", [("Exportar dados", ""), ("Categorias", "14"), ("Privacidade", ""), ("Apagar meus dados", "")]),
        ("Conta", "person.crop.circle.fill", [("Sair", "")]),
    ]

    func canISpend(_ amount: Double) -> CanISpendResult {
        switch amount {
        case ..<600: .init(verdict: .ok, reason: "Você tem folga no orçamento e nenhum compromisso crítico nos próximos 30 dias.", icon: "checkmark.seal.fill")
        case ..<1000: .init(verdict: .caution, reason: "Esse valor ultrapassa o limite recomendado de R$ 600 de gasto livre este mês. Avalie antes de gastar.", icon: "exclamationmark.triangle.fill")
        default: .init(verdict: .notRecommended, reason: "Esse valor está muito acima do limite recomendado de R$ 600 e pode atrasar sua meta de quitação.", icon: "xmark.seal.fill")
        }
    }

    // MARK: Persistência (UserDefaults)

    /// Dados gravados localmente entre sessões do app.
    /// O decode tolera campos ausentes (versões antigas salvas no aparelho).
    private struct PersistedState: Codable {
        var onboarded: Bool
        var registered: Bool
        var userName: String
        var userEmail: String
        var balance: Double
        var transactions: [Transaction]
        var debts: [Debt]
        var cards: [CreditCard]
        var goals: [Goal]
        var diagnosticDone: Bool
        var levelScore: Int

        init(onboarded: Bool, registered: Bool, userName: String, userEmail: String,
             balance: Double, transactions: [Transaction], debts: [Debt],
             cards: [CreditCard], goals: [Goal], diagnosticDone: Bool, levelScore: Int) {
            self.onboarded = onboarded
            self.registered = registered
            self.userName = userName
            self.userEmail = userEmail
            self.balance = balance
            self.transactions = transactions
            self.debts = debts
            self.cards = cards
            self.goals = goals
            self.diagnosticDone = diagnosticDone
            self.levelScore = levelScore
        }

        init(from decoder: Decoder) throws {
            let c = try decoder.container(keyedBy: CodingKeys.self)
            onboarded = try c.decodeIfPresent(Bool.self, forKey: .onboarded) ?? false
            registered = try c.decodeIfPresent(Bool.self, forKey: .registered) ?? false
            userName = try c.decodeIfPresent(String.self, forKey: .userName) ?? "Usuário"
            userEmail = try c.decodeIfPresent(String.self, forKey: .userEmail) ?? "usuario@email.com"
            balance = try c.decodeIfPresent(Double.self, forKey: .balance) ?? 3240
            transactions = try c.decodeIfPresent([Transaction].self, forKey: .transactions) ?? []
            debts = try c.decodeIfPresent([Debt].self, forKey: .debts) ?? []
            cards = try c.decodeIfPresent([CreditCard].self, forKey: .cards) ?? []
            goals = try c.decodeIfPresent([Goal].self, forKey: .goals) ?? []
            diagnosticDone = try c.decodeIfPresent(Bool.self, forKey: .diagnosticDone) ?? false
            levelScore = try c.decodeIfPresent(Int.self, forKey: .levelScore) ?? 72
        }
    }

    private func load() {
        guard let data = UserDefaults.standard.data(forKey: Self.storageKey),
              let state = try? JSONDecoder().decode(PersistedState.self, from: data) else { return }
        onboarded = state.onboarded
        registered = state.registered
        diagnosticDone = state.diagnosticDone
        levelScore = state.levelScore
        userName = state.userName
        userEmail = state.userEmail
        balance = state.balance
        transactions = state.transactions
        debts = state.debts
        cards = state.cards
        goals = state.goals
    }

    private func save() {
        let state = PersistedState(
            onboarded: onboarded,
            registered: registered,
            userName: userName,
            userEmail: userEmail,
            balance: balance,
            transactions: transactions,
            debts: debts,
            cards: cards,
            goals: goals,
            diagnosticDone: diagnosticDone,
            levelScore: levelScore
        )
        if let data = try? JSONEncoder().encode(state) {
            UserDefaults.standard.set(data, forKey: Self.storageKey)
        }
    }

    // MARK: Sessão

    /// Sai da conta mantendo os dados salvos no aparelho.
    func logout() {
        registered = false
        selectedTab = .home
    }

    /// Apaga todos os dados locais (direito de exclusão da LGPD) e
    /// volta para o onboarding.
    func deleteAllData() {
        UserDefaults.standard.removeObject(forKey: Self.storageKey)
        onboarded = false
        registered = false
        diagnosticDone = false
        levelScore = 72
        userName = "Usuário"
        userEmail = "usuario@email.com"
        balance = 3240
        transactions = Self.defaultTransactions
        debts = Self.defaultDebts
        cards = Self.defaultCards
        goals = Self.defaultGoals
        selectedTab = .home
    }
}

enum Tab: String, CaseIterable {
    case home = "Início"
    case debts = "Dívidas"
    case planning = "Planejamento"
    case profile = "Perfil"

    var icon: String {
        switch self {
        case .home: "house.fill"
        case .debts: "banknote.fill"
        case .planning: "chart.bar.fill"
        case .profile: "person.fill"
        }
    }
}