import Foundation
import GoogleSignIn
import UIKit

// MARK: - Login com Google (SDK oficial)

enum GoogleAuthService {

    enum AuthError: LocalizedError {
        case notConfigured
        case cancelled

        var errorDescription: String? {
            switch self {
            case .notConfigured:
                "Login com Google ainda não configurado. Crie o Client ID no Google Cloud Console e preencha em GoogleConfig.swift."
            case .cancelled:
                "Login com Google cancelado."
            }
        }
    }

    struct Account {
        let name: String
        let email: String
    }

    /// Apresenta a tela oficial do Google e devolve nome/e-mail do usuário.
    static func signIn() async throws -> Account {
        guard GoogleConfig.isConfigured else { throw AuthError.notConfigured }

        GIDSignIn.sharedInstance.configuration = GIDConfiguration(clientID: GoogleConfig.clientID)

        guard let presenting = await MainActor.run(body: {
            UIApplication.shared.connectedScenes
                .compactMap { $0 as? UIWindowScene }
                .first?.keyWindow?.rootViewController
        }) else { throw AuthError.cancelled }

        let result = try await GIDSignIn.sharedInstance.signIn(withPresenting: presenting)
        return Account(name: result.user.profile?.name ?? "Usuário",
                       email: result.user.profile?.email ?? "")
    }

    /// Devolve o controle ao SDK para deep link `google-signin://`.
    static func handle(_ url: URL) {
        GIDSignIn.sharedInstance.handle(url)
    }

    static func signOut() {
        GIDSignIn.sharedInstance.signOut()
    }
}