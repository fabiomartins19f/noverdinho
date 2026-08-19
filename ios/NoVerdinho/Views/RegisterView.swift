import SwiftUI

// MARK: - TELA 03: Entrada (apenas nome, sem login — estilo Escala+)

struct RegisterView: View {
    @EnvironmentObject var app: AppState
    @State private var name = ""

    private var valid: Bool {
        name.trimmingCharacters(in: .whitespaces).count >= 2
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 24) {
            Spacer()

            Image("AppLogo")
                .resizable()
                .scaledToFit()
                .frame(width: 72, height: 72)
                .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                .shadow(color: Theme.green.opacity(0.3), radius: 16, y: 6)

            VStack(alignment: .leading, spacing: 6) {
                Text("Qual é o seu nome?")
                    .font(Fonts.title(28))
                    .foregroundStyle(Theme.text)
                Text("Organize. Quite. Evolua.")
                    .font(Fonts.body())
                    .foregroundStyle(Theme.textSecondary)
            }

            FormField("Seu nome", text: $name, icon: "person.fill")

            PrimaryButton("Entrar", icon: "leaf.fill") {
                app.userName = name.trimmingCharacters(in: .whitespaces)
                withAnimation { app.registered = true }
            }
            .disabled(!valid)
            .opacity(valid ? 1 : 0.5)

            Spacer()

            Text("Sem senha por enquanto — seu No Verdinho fica salvo neste iPhone. Em breve você poderá sincronizar com sua conta.")
                .font(Fonts.caption(12))
                .foregroundStyle(Theme.textTertiary)
                .multilineTextAlignment(.center)
                .frame(maxWidth: .infinity)
        }
        .padding(.horizontal, 28)
    }
}