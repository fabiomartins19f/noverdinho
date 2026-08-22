import Foundation

// MARK: - Sincronização com a nuvem (WhatsApp + Open Finance)
//
// O backend (pasta `backend/`) recebe webhooks do WhatsApp e do Open Finance,
// unifica tudo no Supabase e expõe GET /api/transactions/:phone. Este lado do
// app apenas PUXA e faz merge local — o app continua funcionando offline.

// MARK: Merge puro e testável

enum TransactionMerge {

    struct Incoming {
        let name: String
        let amount: Double
        let category: String
        let source: Transaction.Source
        let date: Date
    }

    struct Plan {
        /// Transações novas a inserir.
        let toImport: [Transaction]
        /// Quantas vieram duplicadas (mesma chave externa de uma existente).
        let duplicates: Int
    }

    /// Compara as transações recebidas da nuvem com as locais e decide o que
    /// entra. Dedup por `externalKey` (nome+categoria+valor+hora).
    static func plan(existing: [Transaction], incoming: [Incoming]) -> Plan {
        let knownKeys = Set(existing.map(\.externalKey))
        var seenThisBatch = Set<String>()
        var toImport: [Transaction] = []
        var duplicates = 0

        for item in incoming {
            let key = Transaction(
                id: UUID(), kind: item.amount >= 0 ? .income : .expense,
                name: item.name, category: item.category,
                amount: abs(item.amount), date: item.date
            ).externalKey

            if knownKeys.contains(key) || seenThisBatch.contains(key) {
                duplicates += 1
                continue
            }
            seenThisBatch.insert(key)
            toImport.append(Transaction(
                kind: item.amount >= 0 ? .income : .expense,
                name: item.name,
                category: item.category.isEmpty ? "Outros" : item.category,
                amount: abs(item.amount),
                date: item.date,
                source: item.source
            ))
        }
        return Plan(toImport: toImport, duplicates: duplicates)
    }
}

// MARK: Cliente HTTP mínimo

struct CloudSyncService {

    struct RemoteTransaction: Decodable {
        let description: String
        let amount: Double
        let category: String?
        let source: String?
        let date: String?

        func toIncoming() -> TransactionMerge.Incoming? {
            guard amount != 0 else { return nil }
            let parsedDate = date.flatMap { ISO8601DateFormatter().date(from: $0) } ?? Date()
            let src: Transaction.Source = source == "open_finance" ? .openFinance : .whatsapp
            return .init(name: description,
                         amount: abs(amount),
                         category: category ?? "Outros",
                         source: src,
                         date: parsedDate)
        }
    }

    enum SyncError: LocalizedError {
        case badURL
        case http(Int)

        var errorDescription: String? {
            switch self {
            case .badURL: "URL do servidor inválida."
            case .http(let code): "O servidor respondeu com erro \(code)."
            }
        }
    }

    /// Busca no backend todas as transações do telefone informado.
    static func fetch(serverURL: String, phone: String) async throws -> [TransactionMerge.Incoming] {
        guard var components = URLComponents(string: serverURL) else { throw SyncError.badURL }
        components.path = (components.path.hasSuffix("/") ? String(components.path.dropLast()) : components.path)
            + "/api/transactions/\(phone.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? phone)"
        guard let url = components.url else { throw SyncError.badURL }

        let (data, response) = try await URLSession.shared.data(from: url)
        guard let http = response as? HTTPURLResponse else { throw SyncError.http(-1) }
        guard http.statusCode == 200 else { throw SyncError.http(http.statusCode) }

        return try JSONDecoder().decode([RemoteTransaction].self, from: data).compactMap { $0.toIncoming() }
    }
}
