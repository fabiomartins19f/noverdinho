import Foundation

// MARK: - Extrato da fatura
//
// Pipeline: usuário cola o texto do extrato (ou importa PDF) → o parser
// extrai as linhas reconhecidas (data + descrição + valor) → o app sugere
// o cartão pelo nome → as linhas viram compras na fatura.
//
// O parser é deliberadamente tolerante: extratos de bandeiras diferentes
// variam muito de formato, então procuramos "ilhas de dados" (datas, valores
// em R$, descrições) em vez de exigir um layout fixo.
//
// Nota: usamos NSRegularExpression (em vez de regex literais /.../) para
// manter compatibilidade com qualquer toolchain Swift.

/// Uma linha reconhecida no extrato.
struct StatementLine: Identifiable, Equatable {
    let id = UUID()
    let date: Date?
    let description: String
    let amount: Double
    /// true quando é pagamento, encargos, anuidade ou totais — exibimos, mas
    /// não contamos como compra da fatura.
    let isAdjustment: Bool
}

/// Resultado do reconhecimento do extrato.
struct StatementParseResult: Equatable {
    let lines: [StatementLine]
    /// Cartão cujo nome apareceu no texto do extrato (ex.: "Fatura Nubank").
    let detectedCardName: String?

    var totalPurchases: Double { lines.filter { !$0.isAdjustment }.reduce(0) { $0 + $1.amount } }
}

enum StatementParser {

    // MARK: Padrões (NSRegularExpression)

    /// Datas nos formatos mais comuns de extrato brasileiro:
    /// 01/08, 01/08/2026, 01 AGO, 01 Ago, 01 ago.
    private static let datePattern = #"(\d{1,2})\s*[./\-]\s*(\d{1,2})(?:\s*[./\-]\s*(\d{2,4}))?|(\d{1,2})\s+(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\b"#

    /// Valores monetários: R$ 1.234,56 / 1.234,56 / 1234,56.
    /// Usamos dois padrões para nunca confundir o dia da data com o valor:
    /// primeiro tentamos o valor com "R$"; sem ele, o número no fim da linha.
    private static let moneyWithSymbolPattern = #"R\$\s*(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{2}))?\b"#
    private static let moneyAtEndPattern = #"(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{2}))?\s*$"#

    /// Prefixo de data para remover da descrição: "01/08 " ou "01 AGO ".
    private static let leadingDatePattern = #"^\s*\d{1,2}\s*[./\-]\s*\d{1,2}\s*"#
    private static let leadingMonthPattern = #"^\s*\d{1,2}\s+(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\s*"#

    /// Valor monetário no fim da linha, para remover da descrição.
    private static let trailingMoneyPattern = #"(?:\bR\$\s*)?(\d{1,3}(?:\.\d{3})*|\d+)(?:,(\d{2}))?\s*$"#

    /// Palavras que indicam ajuste (não são compras).
    private static let adjustmentKeywords = [
        "pagamento", "encargos", "juros", "multa", "anuidade", "iof",
        "tarifa", "total", "saldo", "limite", "fatura", "vencimento",
        "crédito", "credito", "estorno",
    ]

    // MARK: Regexes compiladas (cache — compilar a cada linha é desperdício)

    private static let dateRegex = try! NSRegularExpression(pattern: datePattern)
    private static let moneyWithSymbolRegex = try! NSRegularExpression(
        pattern: moneyWithSymbolPattern, options: [.caseInsensitive])
    private static let moneyAtEndRegex = try! NSRegularExpression(pattern: moneyAtEndPattern)
    private static let leadingDateRegex = try! NSRegularExpression(pattern: leadingDatePattern)
    private static let leadingMonthRegex = try! NSRegularExpression(
        pattern: leadingMonthPattern, options: [.caseInsensitive])
    private static let trailingMoneyRegex = try! NSRegularExpression(pattern: trailingMoneyPattern)

    // MARK: API pública

    /// Reconhece as linhas de um extrato a partir do texto bruto.
    static func parse(_ text: String) -> StatementParseResult {
        // Normaliza quebras de linha (PDFs costumam quebrar a linha no meio).
        let normalized = text
            .replacingOccurrences(of: "\r\n", with: "\n")
            .replacingOccurrences(of: "\r", with: "\n")

        var lines: [StatementLine] = []
        var detectedCard: String?

        for rawLine in normalized.components(separatedBy: "\n") {
            let line = rawLine.trimmingCharacters(in: .whitespacesAndNewlines)
            guard !line.isEmpty else { continue }

            // 1. Procura o nome de um cartão conhecido (ex.: "Fatura Nubank").
            if detectedCard == nil, let card = detectCardName(in: line) {
                detectedCard = card
                continue
            }

            // 2. Extrai data, valor e descrição da linha.
            guard let amount = extractAmount(from: line) else { continue }

            let date = extractDate(from: line)
            let description = extractDescription(from: line)

            // Linhas só com números (ex.: totais) não são compras.
            guard !description.isEmpty else { continue }

            let isAdjustment = adjustmentKeywords.contains {
                description.lowercased().contains($0.lowercased())
            }
            lines.append(StatementLine(
                date: date,
                description: description,
                amount: amount,
                isAdjustment: isAdjustment
            ))
        }

        return StatementParseResult(lines: lines, detectedCardName: detectedCard)
    }

    /// Retorna o cartão quando o texto menciona um cartão conhecido.
    static func matchCard(in text: String, knownCards: [CreditCard]) -> CreditCard? {
        let lowered = text.lowercased()
        for card in knownCards where lowered.contains(card.name.lowercased()) {
            return card
        }
        // Fallback: compara pelo banco/instituição.
        for card in knownCards where lowered.contains(card.institution.lowercased()) {
            return card
        }
        return nil
    }

    // MARK: Detecção de cartão

    private static func detectCardName(in line: String) -> String? {
        let lowered = line.lowercased()
        let known = [
            "nubank", "itau", "itaú", "inter", "amex", "american express",
            "santander", "bradesco", "caixa", "bb ", "banco do brasil",
            "c6", "will", "picpay", "mercadopago", "pagseguro",
        ]
        return known.first { lowered.contains($0) }
    }

    // MARK: Extração de dados

    /// Valor em R$ presente na linha, nesse preferência:
    /// 1. valor com símbolo "R$"; 2. número isolado no fim da linha.
    private static func extractAmount(from line: String) -> Double? {
        for regex in [moneyWithSymbolRegex, moneyAtEndRegex] {
            let range = NSRange(line.startIndex..., in: line)
            guard let match = regex.firstMatch(in: line, range: range),
                  match.range.length <= 40 else { continue }

            let whole = capture(in: line, match: match, group: 1) ?? ""
            let cents = capture(in: line, match: match, group: 2)
            var number = whole.replacingOccurrences(of: ".", with: "")
            if let cents { number += "." + cents }

            guard let value = Double(number), value > 0, value < 1_000_000 else { continue }
            return value
        }
        return nil
    }

    /// Data da compra; nil quando o extrato não traz data na linha.
    private static func extractDate(from line: String) -> Date? {
        let range = NSRange(line.startIndex..., in: line)
        guard let match = dateRegex.firstMatch(in: line, range: range) else { return nil }

        let monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
                          "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]
        var day = 0
        var month = 0

        // Formato "DD/MM" (ou "DD-MM", "DD.MM"): grupo 1 é o dia, grupo 2 o mês.
        if let rawDay = capture(in: line, match: match, group: 1),
           let rawMonth = capture(in: line, match: match, group: 2) {
            day = Int(rawDay) ?? 0
            month = Int(rawMonth) ?? 0
        }
        // Formato "DD MON" (ex.: "01 AGO"): grupo 4 é o dia, grupo 5 o mês.
        else if let rawDay = capture(in: line, match: match, group: 4),
                let rawMonth = capture(in: line, match: match, group: 5),
                let monthIndex = monthNames.firstIndex(of: rawMonth.uppercased()) {
            day = Int(rawDay) ?? 0
            month = monthIndex + 1
        }

        guard day > 0, (1...12).contains(month) else { return nil }

        let calendar = Calendar.current
        var components = DateComponents()
        components.calendar = calendar
        components.day = day
        components.month = month
        components.hour = 12

        // Ano explícito (grupo 3, ex.: "01/08/2024"): usa o informado.
        // Sem ele, usa o ano corrente; datas futuras recuam para o anterior.
        let currentYear = calendar.component(.year, from: .now)
        var hadExplicitYear = false
        if let rawYear = capture(in: line, match: match, group: 3), let year = Int(rawYear) {
            components.year = year < 100 ? 2000 + year : year
            hadExplicitYear = true
        } else {
            components.year = currentYear
        }

        var date = calendar.date(from: components)
        if !hadExplicitYear, let firstTry = date, firstTry > .now {
            components.year = currentYear - 1
            date = calendar.date(from: components) ?? firstTry
        }
        return date
    }

    /// Descrição da linha: texto entre a data e o valor.
    private static func extractDescription(from line: String) -> String {
        var text = line

        // Remove o prefixo "DD/MM" ou "DD MON".
        if !removeIfMatched(leadingDateRegex, from: &text) {
            _ = removeIfMatched(leadingMonthRegex, from: &text)
        }

        // Remove o valor em R$ do final da linha.
        _ = removeIfMatched(trailingMoneyRegex, from: &text)

        // Limpa espaços múltiplos.
        let cleaned = text.replacingOccurrences(of: #"\s{2,}"#, with: " ", options: .regularExpression)
        return cleaned.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    private static func removeIfMatched(_ regex: NSRegularExpression, from text: inout String) -> Bool {
        guard let match = regex.firstMatch(in: text, range: NSRange(text.startIndex..., in: text)),
              let range = Range(match.range, in: text) else { return false }
        text.removeSubrange(range)
        return true
    }

    // MARK: Helper de captura

    private static func capture(in line: String, match: NSTextCheckingResult, group: Int) -> String? {
        guard group < match.numberOfRanges else { return nil }
        let range = match.range(at: group)
        guard range.location != NSNotFound, let swiftRange = Range(range, in: line) else { return nil }
        return String(line[swiftRange])
    }
}