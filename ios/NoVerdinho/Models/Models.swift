import Foundation
import SwiftUI
import UserNotifications

// MARK: - Dívida

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

    var label: String {
        switch self {
        case .paidOff: "Quitada"
        case .onTime: "Em dia"
        case .overdue: "Atrasada"
        }
    }

    var color: Color {
        switch self {
        case .paidOff: Theme.green
        case .onTime: Theme.info
        case .overdue: Theme.danger
        }
    }
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

    var brandColor: Color {
        switch name.lowercased() {
        case let n where n.contains("nubank"): Color(hex: "820AD1")
        case let n where n.contains("itau") || n.contains("itaú"): Color(hex: "EC7000")
        case let n where n.contains("inter"): Color(hex: "FF7A00")
        case let n where n.contains("amex") || n.contains("american"): Color(hex: "1F9FD9")
        case let n where n.contains("santander"): Color(hex: "EC0000")
        case let n where n.contains("bradesco"): Color(hex: "CC092F")
        case let n where n.contains("caixa"): Color(hex: "005CA9")
        case let n where n.contains("bb ") || n.contains("brasil"): Color(hex: "D8C21A")
        default: Theme.green
        }
    }

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

// MARK: - Transação

struct Transaction: Identifiable, Codable {
    enum Kind: String, Codable { case income, expense, transfer }
    let id = UUID()
    let kind: Kind
    let name: String
    let category: String
    let amount: Double
    let date: Date
}

// MARK: - Compromisso futuro

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

    /// Dias restantes até o vencimento.
    var daysRemaining: Int {
        Calendar.current.dateComponents([.day], from: .now, to: date).day ?? 0
    }
}

// MARK: - Orçamento

struct BudgetCategory: Identifiable, Codable {
    let id = UUID()
    let name: String
    let icon: String
    let colorHex: String
    var limit: Double
    var spent: Double

    var color: Color { Color(hex: colorHex) }
    var progress: Double { limit > 0 ? spent / limit : 0 }
}

// MARK: - Meta

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

// MARK: - Dados auxiliares (insights, relatórios, etc.)

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
    enum Verdict: String {
        case ok = "Compra compatível"
        case caution = "Cuidado"
        case notRecommended = "Não recomendado"
    }

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

// MARK: - Tipos de adição (botão "+")

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

// MARK: - App State (persistência local)

final class AppState: ObservableObject {
    private static let storageKey = "noverdinho.persisted"

    @Published var onboarded = false { didSet { save() } }
    @Published var registered = false { didSet { save() } }
    @Published var diagnosticDone = false { didSet { save() } }
    @Published var userName = "Usuário" { didSet { save() } }
    @Published var userEmail = "usuario@email.com" { didSet { save() } }
    @Published var balance: Double = 3240 { didSet { save() } }
    @Published var levelScore = 72 { didSet { save() } }
    @Published var transactions: [Transaction] { didSet { save() } }
    @Published var debts: [Debt] { didSet { save() } }
    @Published var cards: [CreditCard] { didSet { save() } }
    @Published var goals: [Goal] { didSet { save() } }
    @Published var budget: [BudgetCategory] { didSet { save() } }
    @Published var notificationsEnabled = false { didSet {
        save()
        NotificationScheduler.syncReminders(for: self)
    } }

    @Published var showAddSheet = false
    @Published var addPreset: AddSheetType?
    @Published var selectedTab: Tab = .home

    init() {
        transactions = Self.defaultTransactions
        debts = Self.defaultDebts
        cards = Self.defaultCards
        goals = Self.defaultGoals
        budget = Self.defaultBudget
        load()
    }

    // MARK: Dados de demonstração

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

    static let defaultBudget: [BudgetCategory] = [
        .init(name: "Moradia", icon: "house.fill", colorHex: "FFB84D", limit: 2200, spent: 1950),
        .init(name: "Alimentação", icon: "cart.fill", colorHex: "2FE6A0", limit: 1200, spent: 980),
        .init(name: "Transporte", icon: "bus.fill", colorHex: "57A9FF", limit: 800, spent: 620),
        .init(name: "Lazer", icon: "party.popper.fill", colorHex: "A48BFF", limit: 700, spent: 920),
        .init(name: "Saúde", icon: "heart.fill", colorHex: "FF5A5F", limit: 500, spent: 290),
        .init(name: "Outros", icon: "ellipsis.circle.fill", colorHex: "7A8A80", limit: 600, spent: 420),
    ]

    // MARK: Dados derivados

    var totalDebt: Double { debts.reduce(0) { $0 + $1.remainingBalance } }

    /// Registra um pagamento em uma dívida: reduz saldo, avança parcelas e
    /// marca como quitada quando o saldo zera.
    func recordPayment(_ amount: Double, on debt: Debt) {
        guard amount > 0, debt.status != .paidOff else { return }
        let newPaid = min(debt.paidAmount + amount, debt.originalAmount)
        let newBalance = max(debt.originalAmount - newPaid, 0)
        let isFull = newBalance <= 0.01
        let updated = Debt(
            type: debt.type, creditor: debt.creditor,
            originalAmount: debt.originalAmount, paidAmount: newPaid,
            remainingBalance: isFull ? 0 : newBalance,
            interestRate: debt.interestRate, installment: debt.installment,
            installmentCount: debt.installmentCount,
            paidInstallments: min(debt.paidInstallments + (amount >= debt.installment ? 1 : 0), debt.installmentCount),
            dueDate: debt.dueDate, priority: debt.priority,
            status: isFull ? .paidOff : debt.status
        )
        if let index = debts.firstIndex(where: { $0.id == debt.id }) {
            debts[index] = updated
        }
    }

    /// Compromissos dos próximos dias, ordenados por vencimento.
    var upcomingPayments: [UpcomingPayment] {
        let bills = budget.compactMap { category -> UpcomingPayment? in
            guard category.spent > 0 else { return nil }
            return UpcomingPayment(
                name: category.name,
                amount: category.spent,
                date: .now.addingTimeInterval(86400 * 7),
                kind: .bill
            )
        }
        let invoices = cards
            .filter { $0.currentInvoice > 0 }
            .map { card in
                UpcomingPayment(
                    name: card.name,
                    amount: card.currentInvoice,
                    date: invoiceDate(day: card.dueDay),
                    kind: .invoice
                )
            }
        let installments = debts
            .filter { $0.status != .paidOff }
            .map { debt in
                UpcomingPayment(
                    name: debt.creditor,
                    amount: debt.installment,
                    date: debt.dueDate,
                    kind: .installment
                )
            }
        return (bills + invoices + installments)
            .sorted { $0.date < $1.date }
    }

    func invoiceDate(day: Int) -> Date {
        var components = Calendar.current.dateComponents([.year, .month], from: .now)
        components.day = min(max(day, 1), 28)
        let candidate = Calendar.current.date(from: components) ?? .now
        return candidate < .now ? (Calendar.current.date(byAdding: .month, value: 1, to: candidate) ?? candidate) : candidate
    }

    var level: GreenLevel {
        GreenLevel(
            score: levelScore,
            delta: 8,
            evolution: Self.levelEvolution,
            message: levelScore >= 70
                ? "Você avançou 8 pontos neste mês"
                : "Você está no caminho certo para o verdinho"
        )
    }

    private static let levelEvolution: [MonthlySeriesPoint] = [
        .init(label: "Mar", value: 41), .init(label: "Abr", value: 46),
        .init(label: "Mai", value: 49), .init(label: "Jun", value: 55),
        .init(label: "Jul", value: 62), .init(label: "Ago", value: 72),
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

    // MARK: Ação inteligente (regra simples, pronta para o motor do backend)

    var bestNextAction: (title: String, message: String, accent: Color)? {
        guard let priorityDebt = debts
            .filter({ $0.status != .paidOff })
            .max(by: { $0.interestRate < $1.interestRate }) else { return nil }
        return (
            "Priorize sua dívida do cartão",
            "Ela possui os maiores juros entre suas dívidas (\(String(format: "%.0f", priorityDebt.interestRate))% a.a.).",
            Theme.green
        )
    }

    func canISpend(_ amount: Double) -> CanISpendResult {
        switch amount {
        case ..<600: .init(verdict: .ok, reason: "Você tem folga no orçamento e nenhum compromisso crítico nos próximos 30 dias.", icon: "checkmark.seal.fill")
        case ..<1000: .init(verdict: .caution, reason: "Esse valor ultrapassa o limite recomendado de R$ 600 de gasto livre este mês. Avalie antes de gastar.", icon: "exclamationmark.triangle.fill")
        default: .init(verdict: .notRecommended, reason: "Esse valor está muito acima do limite recomendado de R$ 600 e pode atrasar sua meta de quitação.", icon: "xmark.seal.fill")
        }
    }

    // MARK: Persistência

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
        var budget: [BudgetCategory]
        var diagnosticDone: Bool
        var levelScore: Int
        var notificationsEnabled: Bool

        init(onboarded: Bool, registered: Bool, userName: String, userEmail: String,
             balance: Double, transactions: [Transaction], debts: [Debt],
             cards: [CreditCard], goals: [Goal], budget: [BudgetCategory],
             diagnosticDone: Bool, levelScore: Int, notificationsEnabled: Bool) {
            self.onboarded = onboarded
            self.registered = registered
            self.userName = userName
            self.userEmail = userEmail
            self.balance = balance
            self.transactions = transactions
            self.debts = debts
            self.cards = cards
            self.goals = goals
            self.budget = budget
            self.diagnosticDone = diagnosticDone
            self.levelScore = levelScore
            self.notificationsEnabled = notificationsEnabled
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
            budget = try c.decodeIfPresent([BudgetCategory].self, forKey: .budget) ?? []
            diagnosticDone = try c.decodeIfPresent(Bool.self, forKey: .diagnosticDone) ?? false
            levelScore = try c.decodeIfPresent(Int.self, forKey: .levelScore) ?? 72
            notificationsEnabled = try c.decodeIfPresent(Bool.self, forKey: .notificationsEnabled) ?? false
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
        budget = state.budget.isEmpty ? Self.defaultBudget : state.budget
        notificationsEnabled = state.notificationsEnabled
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
            budget: budget,
            diagnosticDone: diagnosticDone,
            levelScore: levelScore,
            notificationsEnabled: notificationsEnabled
        )
        if let data = try? JSONEncoder().encode(state) {
            UserDefaults.standard.set(data, forKey: Self.storageKey)
        }
    }

    // MARK: Sessão

    func logout() {
        registered = false
        selectedTab = .home
    }

    func deleteAllData() {
        notificationsEnabled = false
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
        budget = Self.defaultBudget
        selectedTab = .home
    }
}

// MARK: - Lembretes locais de contas

enum NotificationScheduler {
    /// Pede permissão e agenda um lembrete 1 dia antes do vencimento de cada
    /// dívida em aberto. Desativa todos os lembretes quando desligado.
    static func syncReminders(for app: AppState) {
        let center = UNUserNotificationCenter.current()
        guard app.notificationsEnabled else {
            center.removeAllPendingNotificationRequests()
            return
        }
        center.requestAuthorization(options: [.alert, .sound]) { granted, _ in
            guard granted else { return }
            center.removeAllPendingNotificationRequests()
            let pending = app.debts.filter { $0.status != .paidOff }
            for debt in pending {
                let reminderDate = Calendar.current.date(byAdding: .day, value: -1, to: debt.dueDate) ?? debt.dueDate
                guard reminderDate > .now else { continue }
                let content = UNMutableNotificationContent()
                content.title = "Conta chegando"
                content.body = "\(debt.creditor) vence amanhã — \(Money.format(debt.installment))."
                content.sound = .default
                let components = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: reminderDate)
                let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: false)
                let request = UNNotificationRequest(
                    identifier: "debt-\(debt.id.uuidString)",
                    content: content,
                    trigger: trigger
                )
                center.add(request)
            }
        }
    }
}

// MARK: - Abas

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