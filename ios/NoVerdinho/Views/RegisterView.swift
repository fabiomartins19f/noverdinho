import SwiftUI

// MARK: - Criação de usuário / Login

struct RegisterView: View {
    @EnvironmentObject var app: AppState
    @State private var isLogin = false
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var showPassword = false
    @State private var errorMessage: String?

    private var valid: Bool {
        let nameOK = isLogin || name.trimmingCharacters(in: .whitespaces).count >= 2
        let emailOK = email.contains("@") && email.contains(".")
        let passwordOK = password.count >= 8
        return nameOK && emailOK && passwordOK
    }

    var body: some View {
        VStack(spacing: 0) {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    // Topo
                    VStack(alignment: .leading, spacing: 8) {
                        Image("AppLogo")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 56, height: 56)
                            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                            .padding(.bottom, 4)
                        Text(isLogin ? "Bem-vindo de volta" : "Crie sua conta")
                            .font(Fonts.title(28))
                            .foregroundStyle(Theme.text)
                        Text(isLogin
                             ? "Organize. Quite. Evolua."
                             : "Comece a organizar suas finanças em menos de um minuto.")
                            .font(Fonts.body())
                            .foregroundStyle(Theme.textSecondary)
                    }
                    .padding(.top, 24)

                    // Continuar com Apple
                    Button {
                        registerWithApple()
                    } label: {
                        HStack(spacing: 10) {
                            Image(systemName: "apple.logo")
                                .font(.system(size: 18, weight: .semibold))
                            Text("Continuar com Apple")
                                .font(Fonts.bodyMedium())
                        }
                        .foregroundStyle(Theme.text)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Theme.text)
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    }
                    .buttonStyle(.plain)

                    divider

                    // Formulário
                    VStack(spacing: 14) {
                        if !isLogin {
                            formField("Nome completo", text: $name, icon: "person.fill")
                        }
                        formField("E-mail", text: $email, icon: "envelope.fill")
                            .keyboardType(.emailAddress)
                            .textInputAutocapitalization(.never)
                            .autocorrectionDisabled()

                        VStack(alignment: .leading, spacing: 6) {
                            HStack(spacing: 10) {
                                Image(systemName: "lock.fill")
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundStyle(Theme.green)
                                Group {
                                    if showPassword {
                                        TextField("Senha", text: $password)
                                    } else {
                                        SecureField("Senha", text: $password)
                                    }
                                }
                                .font(Fonts.body())
                                .foregroundStyle(Theme.text)
                                Button {
                                    showPassword.toggle()
                                } label: {
                                    Image(systemName: showPassword ? "eye.slash.fill" : "eye.fill")
                                        .font(.system(size: 15))
                                        .foregroundStyle(Theme.textTertiary)
                                }
                            }
                            .padding(.horizontal, 14)
                            .padding(.vertical, 13)
                            .background(Theme.surfaceAlt)
                            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                            .overlay(
                                RoundedRectangle(cornerRadius: 12, style: .continuous)
                                    .stroke(Theme.borderStrong, lineWidth: 1)
                            )
                            Text("Mínimo de 8 caracteres")
                                .font(Fonts.caption(12))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }

                    if let errorMessage {
                        HStack(spacing: 8) {
                            Image(systemName: "exclamationmark.triangle.fill")
                                .font(.system(size: 13))
                            Text(errorMessage)
                                .font(Fonts.caption())
                        }
                        .foregroundStyle(Theme.danger)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(12)
                        .background(Theme.dangerSoft)
                        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                    }

                    PrimaryButton(isLogin ? "Entrar" : "Criar conta", icon: isLogin ? nil : "leaf.fill") {
                        submit()
                    }
                    .disabled(!valid)
                    .opacity(valid ? 1 : 0.5)

                    if !isLogin {
                        Text("Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade, em conformidade com a LGPD.")
                            .font(Fonts.caption(12))
                            .foregroundStyle(Theme.textTertiary)
                            .multilineTextAlignment(.center)
                            .padding(.top, 4)
                    }

                    Button {
                        withAnimation(.easeOut(duration: 0.2)) {
                            errorMessage = nil
                            isLogin.toggle()
                        }
                    } label: {
                        HStack(spacing: 6) {
                            Text(isLogin ? "Ainda não tem conta?" : "Já tem conta?")
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.textSecondary)
                            Text(isLogin ? "Criar conta" : "Entrar")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.green)
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.plain)
                }
                .padding(.horizontal, 24)
            }
            .scrollIndicators(.hidden)
        }
    }

    private var divider: some View {
        HStack(spacing: 12) {
            Rectangle().fill(Theme.border).frame(height: 1)
            Text("ou")
                .font(Fonts.caption())
                .foregroundStyle(Theme.textTertiary)
            Rectangle().fill(Theme.border).frame(height: 1)
        }
    }

    private func formField(_ title: String, text: Binding<String>, icon: String) -> some View {
        HStack(spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(Theme.green)
            TextField(title, text: text)
                .font(Fonts.body())
                .foregroundStyle(Theme.text)
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 13)
        .background(Theme.surfaceAlt)
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .stroke(Theme.borderStrong, lineWidth: 1)
        )
    }

    private func submit() {
        guard valid else {
            errorMessage = isLogin
                ? "Verifique seu e-mail e senha."
                : "Preencha nome, e-mail válido e senha com pelo menos 8 caracteres."
            return
        }
        errorMessage = nil
        app.userName = isLogin ? app.userName : name.trimmingCharacters(in: .whitespaces)
        app.userEmail = email.trimmingCharacters(in: .whitespaces).lowercased()
        app.registered = true
    }

    private func registerWithApple() {
        errorMessage = nil
        app.userName = "Usuário Apple"
        app.userEmail = "usuario@icloud.com"
        app.registered = true
    }
}