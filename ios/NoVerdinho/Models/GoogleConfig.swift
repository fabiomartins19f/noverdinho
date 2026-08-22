import Foundation

// MARK: - Configuração do Google Sign-In
//
// Para ativar o login com Google:
// 1. Crie um projeto no Google Cloud Console → APIs & Services → OAuth consent screen.
// 2. Credentials → Create credentials → OAuth client ID → tipo iOS.
//    Anote o "Client ID" (termina em .apps.googleusercontent.com).
// 3. Cole o Client ID em `clientID` abaixo.
// 4. No `Info.plist`, troque `com.googleusercontent.apps.YOUR_GOOGLE_IOS_CLIENT_ID`
//    pelo REVERSED client ID (o mesmo com os pontos ao contrário e o número à frente).
//
// Sem isso, o botão "Continuar com Google" mostra um aviso e o app segue com o
// fluxo de nome — nada quebra.

enum GoogleConfig {
    static let clientID = "YOUR_GOOGLE_IOS_CLIENT_ID.apps.googleusercontent.com"

    static var isConfigured: Bool {
        !clientID.hasPrefix("YOUR_")
    }
}