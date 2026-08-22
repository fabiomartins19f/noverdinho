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
        /// Com sinal: despesa negativa, receita positiva.
        let amount: Double
        let category: String?
        let source: String?
        let kind: String?
        let date: String?

        func toIncoming() -> TransactionMerge.Incoming? {
            guard amount != 0 else { return nil }
            let parsedDate = date.flatMap { ISO8601DateFormatter().date(from: $0) } ?? Date()
            let src: Transaction.Source = source == "open_finance" ? .openFinance : .whatsapp
            // Só `kind == "income"` vira receita; sem a coluna (servidor antigo)
            // falha para DESPESA — o lado seguro, nunca o contrário.
            let isIncome = kind == "income"
            return .init(name: description,
                         amount: isIncome ? abs(amount) : -abs(amount),
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
    static func fetch(serverURL: String, phone: String, token: String) async throws -> [TransactionMerge.Incoming] {
        guard var components = URLComponents(string: serverURL) else { throw SyncError.badURL }
        components.path = (components.path.hasSuffix("/") ? String(components.path.dropLast()) : components.path)
            + "/api/transactions/\(phone.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? phone)"
        guard let url = components.url else { throw SyncError.badURL }

        var request = URLRequest(url: url)
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse else { throw SyncError.http(-1) }
        guard http.statusCode == 200 else { throw SyncError.http(http.statusCode) }

        return try JSONDecoder().decode([RemoteTransaction].self, from: data).compactMap { $0.toIncoming() }
    }

    /// Pede um connect_token ao backend para abrir o widget do Open Finance.
    static func getConnectToken(serverURL: String, phone: String, token: String) async throws -> String {
        guard var components = URLComponents(string: serverURL) else { throw SyncError.badURL }
        components.path = (components.path.hasSuffix("/") ? String(components.path.dropLast()) : components.path) + "/api/connect-token"
        guard let url = components.url else { throw SyncError.badURL }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        request.httpBody = try JSONEncoder().encode(["phone": phone])

        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse, http.statusCode == 200 else { throw SyncError.http(-1) }
        struct TokenResponse: Decodable { let accessToken: String }
        return try JSONDecoder().decode(TokenResponse.self, from: data).accessToken
    }
}
