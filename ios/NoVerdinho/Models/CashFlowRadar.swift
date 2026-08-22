import Foundation

// MARK: - Radar de Futuro (projeção diária de caixa)
//
// Responde ANTES do problema: "no ritmo atual, em que dia meu saldo fica
// negativo?". Matemática transparente:
//
//   SaldoProjetado(Dn) = saldo atual
//     + receitas previstas até Dn
//     − compromissos fixos com vencimento até Dn
//     − gasto variável médio diário × dias corridos

enum CashFlowRadar {

    struct Forecast {
        /// Projeção por dia (índice 0 = hoje), horizonte de 30 dias.
        let series: [Double]
        /// Primeiro dia (1-based) em que o saldo fica negativo; nil se não ocorre.
        let firstNegativeDay: Int?
        /// Menor saldo da projeção.
        let minimumProjected: Double
        /// Gasto variável médio diário usado na conta (transparência).
        let variableDailyAverage: Double
    }

    static let horizonDays = 30

    // MARK: Entradas derivadas dos dados do app

    /// Média diária de gastos variáveis: despesas dos últimos 60 dias que não
    /// são compromissos fixos (parcelas/faturas são contadas à parte, nos
    /// seus vencimentos). Divide pelo período REAL de histórico — um usuário
    /// com 3 dias de dados não é tratado como se tivesse 60.
    static func variableDailyAverage(transactions: [Transaction], now: Date = .now) -> Double {
        let calendar = Calendar.current
        guard let start = calendar.date(byAdding: .day, value: -60, to: now) else { return 0 }
        let recentExpenses = transactions.filter { $0.kind == .expense && $0.date >= start }
        guard !recentExpenses.isEmpty else { return 0 }

        let oldest = recentExpenses.map(\.date).min() ?? now
        let days = calendar.dateComponents([.day], from: calendar.startOfDay(for: oldest), to: calendar.startOfDay(for: now)).day ?? 1
        let span = max(min(days, 60), 1)

        let total = recentExpenses.reduce(0.0) { $0 + $1.amount }
        return total / Double(span)
    }

    // MARK: Projeção

    static func forecast(
        balance: Double,
        incomeEvents: [(date: Date, amount: Double)],
        fixedCommitments: [(date: Date, amount: Double)],
        transactions: [Transaction],
        now: Date = .now,
        calendar: Calendar = .current
    ) -> Forecast {
        let dailyVariable = variableDailyAverage(transactions: transactions, now: now)
        let todayStart = calendar.startOfDay(for: now)

        func dayIndex(_ date: Date) -> Int? {
            let days = calendar.dateComponents([.day], from: todayStart, to: calendar.startOfDay(for: date)).day ?? 0
            return days >= 0 ? days : nil
        }

        var inflowByDay = Array(repeating: 0.0, count: horizonDays)
        var outflowByDay = Array(repeating: 0.0, count: horizonDays)

        for event in incomeEvents {
            if let idx = dayIndex(event.date), idx < horizonDays { inflowByDay[idx] += max(event.amount, 0) }
        }
        for commitment in fixedCommitments {
            if let idx = dayIndex(commitment.date), idx < horizonDays { outflowByDay[idx] += max(commitment.amount, 0) }
        }

        var series: [Double] = []
        var running = balance
        var firstNegative: Int?
        var minimum = balance

        for day in 0..<horizonDays {
            running += inflowByDay[day] - outflowByDay[day] - dailyVariable
            series.append(running)
            minimum = min(minimum, running)
            if firstNegative == nil && running < 0 {
                firstNegative = day + 1
            }
        }

        return Forecast(
            series: series,
            firstNegativeDay: firstNegative,
            minimumProjected: minimum,
            variableDailyAverage: dailyVariable
        )
    }
}
