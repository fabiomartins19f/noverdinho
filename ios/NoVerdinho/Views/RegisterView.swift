import SwiftUI

// MARK: - TELA 03: Entrada (nome ou login com Google)

struct RegisterView: View {
    @EnvironmentObject var app: AppState
    @State private var name = ""
    @State private var isGoogleLoading = false
    @State private var googleError: String?
    @State private var showGoogleConfigAlert = false

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

            divider

            googleButton

            if let googleError {
                Text(googleError)
                    .font(Fonts.caption(12))
                    .foregroundStyle(Theme.danger)
                    .fixedSize(horizontal: false, vertical: true)
            }

            Spacer()

            Text("Sem senha por enquanto — seu No Verdinho fica salvo neste iPhone. Em breve você poderá sincronizar com sua conta.")
                .font(Fonts.caption(12))
                .foregroundStyle(Theme.textTertiary)
                .multilineTextAlignment(.center)
                .frame(maxWidth: .infinity)
        }
        .padding(.horizontal, 28)
        .alert("Login com Google", isPresented: $showGoogleConfigAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text("Ainda não configurado. Crie um OAuth Client ID para iOS no Google Cloud Console e cole em GoogleConfig.swift (detalhes no SETUP.md).")
        }
    }

    private var divider: some View {
        HStack(spacing: 12) {
            Rectangle().fill(Theme.border).frame(height: 1)
            Text("ou")
                .font(Fonts.caption(12))
                .foregroundStyle(Theme.textTertiary)
            Rectangle().fill(Theme.border).frame(height: 1)
        }
    }

    private var googleButton: some View {
        Button {
            Task { await signInWithGoogle() }
        } label: {
            HStack(spacing: 10) {
                if isGoogleLoading {
                    ProgressView()
                        .tint(Theme.textSecondary)
                } else {
                    GoogleLogo()
                        .frame(width: 18, height: 18)
                }
                Text(isGoogleLoading ? "Entrando com Google…" : "Continuar com Google")
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.text)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 13)
            .background(Theme.surface)
            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .stroke(Theme.border, lineWidth: 1)
            )
        }
        .buttonStyle(.plain)
        .disabled(isGoogleLoading)
        .opacity(isGoogleLoading ? 0.6 : 1)
    }

    @MainActor
    private func signInWithGoogle() async {
        googleError = nil
        isGoogleLoading = true
        defer { isGoogleLoading = false }
        do {
            let account = try await GoogleAuthService.signIn()
            app.userName = account.name
            app.userEmail = account.email
            Haptics.success()
            withAnimation { app.registered = true }
        } catch GoogleAuthService.AuthError.notConfigured {
            showGoogleConfigAlert = true
        } catch GoogleAuthService.AuthError.cancelled {
            // Usuário fechou a tela — sem erro.
        } catch {
            googleError = error.localizedDescription
        }
    }
}

// MARK: - Logo do Google (4 cores, sem asset externo)

struct GoogleLogo: View {
    var body: some View {
        ZStack {
            Circle()
                .fill(Color.white)
            HStack(spacing: 0) {
                Text("G")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(Color(red: 0.22, green: 0.48, blue: 0.93))
                Text("o")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(Color(red: 0.91, green: 0.30, blue: 0.22))
                Text("o")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(Color(red: 0.98, green: 0.71, blue: 0.09))
                Text("g")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(Color(red: 0.22, green: 0.48, blue: 0.93))
                Text("l")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(Color(red: 0.13, green: 0.68, blue: 0.34))
                Text("e")
                    .font(.system(size: 13, weight: .bold))
                    .foregroundStyle(Color(red: 0.91, green: 0.30, blue: 0.22))
            }
            .scaleEffect(0.9)
        }
    }
}