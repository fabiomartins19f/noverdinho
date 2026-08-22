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
    var id: UUID = UUID()
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

    enum CodingKeys: String, CodingKey { case id, type, creditor, originalAmount, paidAmount,
                                            remainingBalance, interestRate, installment,
                                            installmentCount, paidInstallments, dueDate,
                                            priority, status }
}

extension Debt {
    /// Compatibilidade: dados antigos não tinham "id" persistido.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decodeIfPresent(UUID.self, forKey: .id) ?? UUID()
        type = try c.decode(DebtType.self, forKey: .type)
        creditor = try c.decode(String.self, forKey: .creditor)
        originalAmount = try c.decode(Double.self, forKey: .originalAmount)
        paidAmount = try c.decode(Double.self, forKey: .paidAmount)
        remainingBalance = try c.decode(Double.self, forKey: .remainingBalance)
        interestRate = try c.decode(Double.self, forKey: .interestRate)
        installment = try c.decode(Double.self, forKey: .installment)
        installmentCount = try c.decode(Int.self, forKey: .installmentCount)
        paidInstallments = try c.decode(Int.self, forKey: .paidInstallments)
        dueDate = try c.decode(Date.self, forKey: .dueDate)
        priority = try c.decode(DebtPriority.self, forKey: .priority)
        status = try c.decode(DebtStatus.self, forKey: .status)
    }
}

// MARK: - Cartão de crédito

struct CreditCard: Identifiable, Codable {
    var id: UUID = UUID()
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

    enum CodingKeys: String, CodingKey { case id, name, institution, lastDigits, limit, used,
                                            currentInvoice, dueDay, statementItems }
}

extension CreditCard {
    /// Compatibilidade: dados antigos não tinham "id" persistido.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decodeIfPresent(UUID.self, forKey: .id) ?? UUID()
        name = try c.decode(String.self, forKey: .name)
        institution = try c.decode(String.self, forKey: .institution)
        lastDigits = try c.decode(String.self, forKey: .lastDigits)
        limit = try c.decode(Double.self, forKey: .limit)
        used = try c.decode(Double.self, forKey: .used)
        currentInvoice = try c.decode(Double.self, forKey: .currentInvoice)
        dueDay = try c.decode(Int.self, forKey: .dueDay)
        statementItems = try c.decodeIfPresent([CardPurchase].self, forKey: .statementItems) ?? []
    }

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
    var id: UUID = UUID()
    let name: String
    let amount: Double
    let installments: Int
    let paidInstallments: Int
    let date: Date
    var fromStatement: Bool = false

    enum CodingKeys: String, CodingKey { case id, name, amount, installments, paidInstallments,
                                            date, fromStatement }
}

extension CardPurchase {
    /// Compatibilidade: dados antigos não tinham "id" persistido.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decodeIfPresent(UUID.self, forKey: .id) ?? UUID()
        name = try c.decode(String.self, forKey: .name)
        amount = try c.decode(Double.self, forKey: .amount)
        installments = try c.decode(Int.self, forKey: .installments)
        paidInstallments = try c.decode(Int.self, forKey: .paidInstallments)
        date = try c.decode(Date.self, forKey: .date)
        fromStatement = try c.decodeIfPresent(Bool.self, forKey: .fromStatement) ?? false
    }
}

// MARK: - Transação

struct Transaction: Identifiable, Codable {
    enum Kind: String, Codable { case income, expense, transfer }
    /// Origem do registro: manual, whatsapp ou open_finance (sync em nuvem).
    enum Source: String, Codable {
        case manual, whatsapp, openFinance = "open_finance"

        var label: String {
            switch self {
            case .manual: "Manual"
            case .whatsapp: "WhatsApp"
            case .openFinance: "Open Finance"
            }
        }
    }
    var id: UUID = UUID()
    let kind: Kind
    let name: String
    let category: String
    let amount: Double
    let date: Date
    var source: Source = .manual

    enum CodingKeys: String, CodingKey { case id, kind, name, category, amount, date, source }

    /// Chave estável para deduplicar importações da nuvem.
    var externalKey: String {
        "\(kind.rawValue)|\(name.lowercased())|\(category.lowercased())|\(Int(amount * 100))|\(Int(date.timeIntervalSince1970 / 3600))"
    }
}

extension Transaction {
    /// Compatibilidade: dados antigos não tinham "id" nem "source" persistidos.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decodeIfPresent(UUID.self, forKey: .id) ?? UUID()
        kind = try c.decode(Kind.self, forKey: .kind)
        name = try c.decode(String.self, forKey: .name)
        category = try c.decode(String.self, forKey: .category)
        amount = try c.decode(Double.self, forKey: .amount)
        date = try c.decode(Date.self, forKey: .date)
        source = try c.decodeIfPresent(Source.self, forKey: .source) ?? .manual
    }
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
            case .installment: "calendar"
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
    var id: UUID = UUID()
    let name: String
    let icon: String
    let colorHex: String
    var limit: Double
    var spent: Double

    var color: Color { Color(hex: colorHex) }
    var progress: Double { limit > 0 ? spent / limit : 0 }

    enum CodingKeys: String, CodingKey { case id, name, icon, colorHex, limit, spent }
}

extension BudgetCategory {
    /// Compatibilidade: dados antigos não tinham "id" persistido.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decodeIfPresent(UUID.self, forKey: .id) ?? UUID()
        name = try c.decode(String.self, forKey: .name)
        icon = try c.decode(String.self, forKey: .icon)
        colorHex = try c.decode(String.self, forKey: .colorHex)
        limit = try c.decode(Double.self, forKey: .limit)
        spent = try c.decode(Double.self, forKey: .spent)
    }
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

    var id: UUID = UUID()
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

    enum CodingKeys: String, CodingKey { case id, kind, title, emoji, target, saved, monthlyContribution }
}

extension Goal {
    /// Compatibilidade: dados antigos não tinham "id" persistido.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decodeIfPresent(UUID.self, forKey: .id) ?? UUID()
        kind = try c.decode(Kind.self, forKey: .kind)
        title = try c.decode(String.self, forKey: .title)
        emoji = try c.decode(String.self, forKey: .emoji)
        target = try c.decode(Double.self, forKey: .target)
        saved = try c.decode(Double.self, forKey: .saved)
        monthlyContribution = try c.decode(Double.self, forKey: .monthlyContribution)
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

/// Um ponto mensal do histórico de nível (chave "yyyy-MM").
struct ScorePoint: Codable, Equatable {
    let month: String
    var score: Int
}

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
    @Published var userName = "Usuário" { didSet { save() } }
    @Published var userEmail = "usuario@email.com" { didSet { save() } }
    @Published var balance: Double = 3240 { didSet { save() } }
    @Published var transactions: [Transaction] { didSet { save() } }
    @Published var debts: [Debt] { didSet { save() } }
    @Published var cards: [CreditCard] { didSet { save() } }
    @Published var goals: [Goal] { didSet { save() } }
    @Published var budget: [BudgetCategory] { didSet { save() } }
    @Published var notificationsEnabled = false { didSet {
        save()
        NotificationScheduler.syncReminders(for: self)
    } }
    @Published var balanceHidden = false { didSet { save() } }
    /// Trava opcional: exige Face ID/senha do aparelho ao abrir o app.
    @Published var appLockEnabled = false { didSet { save() } }
    /// Estado de sessão (não persistido): true bloqueia a interface atrás da trava.
    @Published var isLocked = false
    /// Sync opcional com o backend próprio (WhatsApp + Open Finance).
    @Published var syncServerURL = "" { didSet { save() } }
    @Published var syncPhone = "" { didSet { save() } }
    /// Token de acesso às rotas do backend (Authorization: Bearer).
    @Published var syncToken = "" { didSet { save() } }
    /// Histórico mensal do nível (chave "yyyy-MM") — alimenta a evolução real.
    @Published var scoreHistory: [ScorePoint] = [] { didSet { save() } }

    /// Puxa transações do backend e faz merge local. Retorna (importadas, duplicadas ignoradas).
    @MainActor
    func syncFromCloud() async throws -> (imported: Int, duplicates: Int) {
        guard !syncServerURL.trimmingCharacters(in: .whitespaces).isEmpty,
              !syncPhone.trimmingCharacters(in: .whitespaces).isEmpty,
              !syncToken.trimmingCharacters(in: .whitespaces).isEmpty else { return (0, 0) }
        let incoming = try await CloudSyncService.fetch(serverURL: syncServerURL, phone: syncPhone, token: syncToken)
        let mergePlan = TransactionMerge.plan(existing: transactions, incoming: incoming)
        guard !mergePlan.toImport.isEmpty else { return (0, mergePlan.duplicates) }
        transactions.append(contentsOf: mergePlan.toImport)
            transactions.sort { $0.date > $1.date }
        return (mergePlan.toImport.count, mergePlan.duplicates)
    }

    // MARK: Histórico do nível (evolução real)

    /// Registra o score do mês corrente. Upsert por mês — o valor mais recente vence.
    func recordScoreSnapshot() {
        guard let score = healthScoreValue else { return }
        let month = monthKey(Date())
        if let index = scoreHistory.firstIndex(where: { $0.month == month }) {
            scoreHistory[index].score = score
        } else {
            scoreHistory.append(.init(month: month, score: score))
            scoreHistory.sort { $0.month < $1.month }
        }
    }

    private func monthKey(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM"
        return formatter.string(from: date)
    }

    /// Evolução real ordenada por mês (rótulo "MMM"). Vazia até haver 2 meses.
    var realEvolution: [MonthlySeriesPoint] {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM"
        return scoreHistory.sorted { $0.month < $1.month }.map {
            MonthlySeriesPoint(label: formatter.monthSymbols[Int($0.month.suffix(2))! - 1].capitalized,
                               value: Double($0.score))
        }
    }

    // MARK: Dados derivados para motores de engajamento

    var lastMonthExpense: Double? {
        let cal = Calendar.current
        guard let prev = cal.date(byAdding: .month, value: -1, to: .now),
              let range = cal.dateInterval(of: .month, for: prev) else { return nil }
        return transactions.filter { $0.kind == .expense && range.contains($0.date) }
            .reduce(0.0) { $0 + $1.amount }
    }

    var currentMonthExpense: Double {
        let start = Calendar.current.dateInterval(of: .month, for: .now)?.start ?? .now
        return transactions.filter { $0.kind == .expense && $0.date >= start }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Gasto do mês atual PROJETADO para o mês cheio: comparação justa com o
    /// mês passado mesmo no dia 1, sem o efeito "pouco gasto ainda" que
    /// distorce desafio e plano de 90 dias.
    var currentMonthExpenseProjected: Double {
        let cal = Calendar.current
        let now = Date()
        let dayOfMonth = cal.component(.day, from: now)
        let daysInMonth = cal.range(of: .day, in: .month, for: now)?.count ?? 30
        let elapsed = max(min(dayOfMonth, daysInMonth), 1)
        return dayOfMonth <= 1 ? currentMonthExpense : currentMonthExpense / Double(elapsed) * Double(daysInMonth)
    }

    var expensesByCategoryReal: [(name: String, value: Double)] {
        let start = Calendar.current.dateInterval(of: .month, for: .now)?.start ?? .now
        var grouped: [String: Double] = [:]
        for tx in transactions where tx.kind == .expense && tx.date >= start {
            grouped[tx.category, default: 0] += tx.amount
        }
        return grouped.map { (name: $0.key, value: $0.value) }
            .sorted { $0.value > $1.value }
    }

    var achievements: [Achievement] {
        let snapshot = AchievementsEngine.Snapshot(
            hasAnyTransaction: !transactions.isEmpty,
            paidOffDebtCount: debts.filter { $0.status == .paidOff }.count,
            activeExpensiveDebtCount: debts.filter { $0.status != .paidOff && $0.interestRate >= 100 }.count,
            lateDebtCount: debts.filter { $0.status == .overdue }.count,
            runwayMonths: monthlyCommitments > 0 ? balance / monthlyCommitments : 3,
            radarHasNegativeDay: cashFlowRadar.firstNegativeDay != nil,
            healthScore: healthScoreValue
        )
        return AchievementsEngine.evaluate(snapshot)
    }

    var ninetyDayPlan: NinetyDayPlan.Plan {
        NinetyDayPlan.build(
            registeredDebtAndCards: debts.count + cards.count,
            monthExpense: currentMonthExpenseProjected,
            lastMonthExpense: lastMonthExpense,
            availableToSpend: availableToSpend,
            monthlyCommitments: monthlyCommitments
        )
    }

    var monthlyChallenge: MonthlyChallenge.Challenge {
        MonthlyChallenge.build(
            lastMonthExpense: lastMonthExpense ?? 0,
            currentMonthExpense: currentMonthExpenseProjected
        )
    }

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
        if appLockEnabled && registered {
            isLocked = true
        }
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

    /// Receitas do mês corrente (base do comprometimento de renda).
    var monthIncome: Double {
        transactions
            .filter { $0.kind == .income && Calendar.current.isDate($0.date, equalTo: .now, toGranularity: .month) }
            .reduce(0) { $0 + $1.amount }
    }

    /// Parcelas de dívidas ativas + faturas dos cartões.
    var monthlyCommitments: Double {
        debts.filter { $0.status != .paidOff }.reduce(0) { $0 + $1.installment }
            + cards.reduce(0) { $0 + $1.currentInvoice }
    }

    /// Registra um pagamento em uma dívida: reduz saldo, avança parcelas e
    /// marca como quitada quando o saldo zera.
    func recordPayment(_ amount: Double, on debt: Debt) {
        guard amount > 0, debt.status != .paidOff else { return }
        let newPaid = min(debt.paidAmount + amount, debt.originalAmount)
        let newBalance = max(debt.originalAmount - newPaid, 0)
        let isFull = newBalance <= 0.01

        // Contabiliza as parcelas cobertas pelo pagamento: uma parcela por
        // pagamento no mínimo, mas pagamentos maiores adiantam/quitaam várias.
        var installmentsCovered = 0
        if debt.installment > 0 {
            installmentsCovered = max(Int((amount / debt.installment).rounded(.down)), 1)
        } else {
            installmentsCovered = 1
        }
        installmentsCovered = min(installmentsCovered, debt.installmentCount - debt.paidInstallments)

        let updated = Debt(
            id: debt.id,
            type: debt.type, creditor: debt.creditor,
            originalAmount: debt.originalAmount, paidAmount: newPaid,
            remainingBalance: isFull ? 0 : newBalance,
            interestRate: debt.interestRate, installment: debt.installment,
            installmentCount: debt.installmentCount,
            paidInstallments: isFull
                ? debt.installmentCount
                : min(debt.paidInstallments + installmentsCovered, debt.installmentCount),
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

    /// Compromissos vencendo nos próximos 7 dias (seção "Hoje" da home).
    var paymentsThisWeek: [UpcomingPayment] {
        let week = Date.now.addingTimeInterval(86400 * 7)
        return upcomingPayments.filter { $0.date <= week }
    }

    /// Saldo menos os compromissos do mês — o que realmente pode gastar.
    var availableToSpend: Double {
        max(balance - monthlyCommitments, 0)
    }

    /// Projeção de 30 dias: saldo + resultado do mês anterior (receitas −
    /// despesas). Dados reais, sem suposição escondida.
    var projectedBalance30d: Double? {
        let cal = Calendar.current
        guard
            let prev = cal.date(byAdding: .month, value: -1, to: .now),
            let range = cal.dateInterval(of: .month, for: prev)
        else { return nil }
        let monthTx = transactions.filter { range.contains($0.date) }
        guard !monthTx.isEmpty else { return nil }
        let net = monthTx.reduce(0.0) { $0 + ($1.kind == .income ? $1.amount : -$1.amount) }
        return balance + net
    }

    /// Radar de Futuro: projeção diária com receitas previstas, compromissos
    /// nos vencimentos e gasto variável médio. Detecta o dia do aperto.
    var cashFlowRadar: CashFlowRadar.Forecast {
        let incomeEvents = transactions.filter { $0.kind == .income && $0.date > .now }
            .map { (date: $0.date, amount: $0.amount) }
        let fixed = upcomingPayments.map { (date: $0.date, amount: $0.amount) }
        return CashFlowRadar.forecast(
            balance: balance,
            incomeEvents: incomeEvents,
            fixedCommitments: fixed,
            transactions: transactions
        )
    }

    func invoiceDate(day: Int) -> Date {
        var components = Calendar.current.dateComponents([.year, .month], from: .now)
        components.day = min(max(day, 1), 28)
        let candidate = Calendar.current.date(from: components) ?? .now
        return candidate < .now ? (Calendar.current.date(byAdding: .month, value: 1, to: candidate) ?? candidate) : candidate
    }

    /// Nível calculado em tempo real pelo motor de saúde financeira.
    /// Sem dados suficientes, devolve nil (a UI mostra estado neutro).
    var healthScoreValue: Int? {
        let hasData = monthIncome > 0 || totalDebt > 0 || !cards.isEmpty || balance != 0
        guard hasData else { return nil }
        return PurchaseSimulator.healthScore(
            income: max(monthIncome, 1),
            commitments: monthlyCommitments,
            balance: balance,
            debt: totalDebt
        )
    }

    var level: GreenLevel {
        let evolution = realEvolution
        if let score = healthScoreValue {
            let previous = Int(evolution.dropLast().last?.value ?? Double(score))
            let delta = score - previous
            return GreenLevel(
                score: score,
                delta: delta,
                evolution: evolution,
                message: delta >= 0
                    ? "Seu nível é calculado em tempo real pelos seus dados"
                    : "Seus compromissos aumentaram — vale revisar o mês"
            )
        }
        return GreenLevel(
            score: 50,
            delta: 0,
            evolution: [],
            message: "Cadastre receitas e contas para calcular seu nível"
        )
    }

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
        guard amount > 0 else {
            return .init(verdict: .ok, reason: "Informe um valor para analisar.", icon: "checkmark.seal.fill")
        }
        let free = availableToSpend
        let radar = cashFlowRadar

        if amount <= free * 0.8, radar.firstNegativeDay == nil {
            return .init(verdict: .ok,
                         reason: "Depois dessa compra você ainda teria \(Money.format(max(free - amount, 0))) livres no mês.",
                         icon: "checkmark.seal.fill")
        }
        if amount <= free {
            let radarNote = radar.firstNegativeDay != nil
                ? " Lembre que o radar já aponta saldo negativo em \(radar.firstNegativeDay!) dias."
                : ""
            return .init(verdict: .caution,
                         reason: "Cabe no mês, mas reduz sua folga para \(Money.format(max(free - amount, 0))).\(radarNote)",
                         icon: "exclamationmark.triangle.fill")
        }
        if amount <= balance {
            return .init(verdict: .caution,
                         reason: "Você tem o valor, mas os compromissos do mês somam \(Money.format(monthlyCommitments)). Gastar isso agora aperta o próximo ciclo.",
                         icon: "exclamationmark.triangle.fill")
        }
        return .init(verdict: .notRecommended,
                     reason: "Esse valor supera seu saldo atual de \(Money.format(balance)).",
                     icon: "xmark.seal.fill")
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
        var notificationsEnabled: Bool
        var balanceHidden: Bool
        var appLockEnabled: Bool
        var syncServerURL: String
        var syncPhone: String
        var syncToken: String
        var scoreHistory: [ScorePoint]

        init(onboarded: Bool, registered: Bool, userName: String, userEmail: String,
             balance: Double, transactions: [Transaction], debts: [Debt],
             cards: [CreditCard], goals: [Goal], budget: [BudgetCategory],
             notificationsEnabled: Bool,
             balanceHidden: Bool, appLockEnabled: Bool,
             syncServerURL: String = "", syncPhone: String = "", syncToken: String = "",
             scoreHistory: [ScorePoint] = []) {
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
            self.notificationsEnabled = notificationsEnabled
            self.balanceHidden = balanceHidden
            self.appLockEnabled = appLockEnabled
            self.syncServerURL = syncServerURL
            self.syncPhone = syncPhone
            self.syncToken = syncToken
            self.scoreHistory = scoreHistory
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
            notificationsEnabled = try c.decodeIfPresent(Bool.self, forKey: .notificationsEnabled) ?? false
            balanceHidden = try c.decodeIfPresent(Bool.self, forKey: .balanceHidden) ?? false
            appLockEnabled = try c.decodeIfPresent(Bool.self, forKey: .appLockEnabled) ?? false
            syncServerURL = try c.decodeIfPresent(String.self, forKey: .syncServerURL) ?? ""
            syncPhone = try c.decodeIfPresent(String.self, forKey: .syncPhone) ?? ""
            syncToken = try c.decodeIfPresent(String.self, forKey: .syncToken) ?? ""
            scoreHistory = try c.decodeIfPresent([ScorePoint].self, forKey: .scoreHistory) ?? []
        }
    }

    private func load() {
        guard let data = UserDefaults.standard.data(forKey: Self.storageKey),
              let state = try? JSONDecoder().decode(PersistedState.self, from: data) else { return }
        onboarded = state.onboarded
        registered = state.registered
        userName = state.userName
        userEmail = state.userEmail
        balance = state.balance
        transactions = state.transactions
        debts = state.debts
        cards = state.cards
        goals = state.goals
        budget = state.budget.isEmpty ? Self.defaultBudget : state.budget
        notificationsEnabled = state.notificationsEnabled
        balanceHidden = state.balanceHidden
        appLockEnabled = state.appLockEnabled
        syncServerURL = state.syncServerURL
        syncPhone = state.syncPhone
        syncToken = state.syncToken
        scoreHistory = state.scoreHistory
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
            notificationsEnabled: notificationsEnabled,
            balanceHidden: balanceHidden,
            appLockEnabled: appLockEnabled,
            syncServerURL: syncServerURL,
            syncPhone: syncPhone,
            syncToken: syncToken,
            scoreHistory: scoreHistory
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
        balanceHidden = false
        appLockEnabled = false
        isLocked = false
        syncServerURL = ""
        syncPhone = ""
        syncToken = ""
        scoreHistory = []
        UserDefaults.standard.removeObject(forKey: Self.storageKey)
        onboarded = false
        registered = false
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
                content.title = "⚠️ Atenção: \(debt.creditor) vence amanhã"
                let availableAfter = max(app.balance - debt.installment, 0)
                content.body = "Pagando \(Money.format(debt.installment)) hoje, você ainda terá \(Money.format(availableAfter)) de saldo. \(availableAfter < 600 ? "Fica apertado — vale avaliar." : "Dá pra manter o ritmo.")"
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