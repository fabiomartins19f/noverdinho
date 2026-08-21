import SwiftUI
import LocalAuthentication

// MARK: - TELA: Trava biométrica opcional

struct LockView: View {
    @EnvironmentObject var app: AppState
    @State private var failureMessage: String?

    var body: some View {
        ZStack {
            Theme.background.ignoresSafeArea()

            RadialGradient(
                colors: [Theme.green.opacity(0.16), .clear],
                center: .init(x: 0.5, y: 0.28),
                startRadius: 20,
                endRadius: 380
            )
            .ignoresSafeArea()

            VStack(spacing: 26) {
                Spacer()

                Image("AppLogo")
                    .resizable()
                    .scaledToFit()
                    .frame(height: 96)
                    .shadow(color: Theme.green.opacity(0.35), radius: 26, y: 6)

                VStack(spacing: 6) {
                    Text("Seu Verdinho está protegido")
                        .font(Fonts.headline(19))
                        .foregroundStyle(Theme.text)
                    Text("Use o Face ID ou a senha do aparelho para continuar.")
                        .font(Fonts.caption())
                        .foregroundStyle(Theme.textSecondary)
                        .multilineTextAlignment(.center)
                }

                PrimaryButton("Desbloquear", icon: "faceid") {
                    authenticate()
                }
                .frame(maxWidth: 280)

                if let failureMessage {
                    Text(failureMessage)
                        .font(Fonts.caption(12))
                        .foregroundStyle(Theme.danger)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 32)
                }

                Spacer()
                Spacer()
            }
        }
        .onAppear { authenticate() }
    }

    private func authenticate() {
        let context = LAContext()
        var error: NSError?

        // .deviceOwnerAuthentication aceita biometria OU senha do aparelho —
        // nunca deixamos o usuário sem caminho de entrada.
        guard context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) else {
            failureMessage = error?.localizedDescription
            return
        }

        context.evaluatePolicy(
            .deviceOwnerAuthentication,
            localizedReason: "Acesse suas finanças com segurança"
        ) { success, evaluationError in
            DispatchQueue.main.async {
                if success {
                    withAnimation(.easeOut(duration: 0.25)) {
                        app.isLocked = false
                        failureMessage = nil
                    }
                    Haptics.success()
                } else {
                    failureMessage = evaluationError?.localizedDescription
                }
            }
        }
    }
}
