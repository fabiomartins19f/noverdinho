import SwiftUI

// MARK: - TELA 01: Boas-vindas (identidade visual do logo)

struct OnboardingView: View {
    @EnvironmentObject var app: AppState
    @State private var appear = false

    var body: some View {
        ZStack {
            // Glow verde-lima atrás do logo, como no material de marca
            RadialGradient(
                colors: [Theme.green.opacity(0.16), .clear],
                center: .init(x: 0.5, y: 0.32),
                startRadius: 10,
                endRadius: 340
            )
            .ignoresSafeArea()

            VStack(spacing: 0) {
                Spacer()

                Image("AppLogo")
                    .resizable()
                    .scaledToFit()
                    .frame(maxWidth: 250)
                    .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
                    .shadow(color: Theme.green.opacity(0.35), radius: 34, y: 12)
                    .scaleEffect(appear ? 1 : 0.92)
                    .opacity(appear ? 1 : 0)

                Text("NO VERDINHO")
                    .font(.system(size: 33, weight: .black, design: .rounded))
                    .foregroundStyle(Theme.greenGradient)
                    .tracking(3)
                    .padding(.top, 26)
                    .opacity(appear ? 1 : 0)

                Text("Organize. Quite. Evolua.")
                    .font(Fonts.bodyMedium())
                    .foregroundStyle(Theme.textSecondary)
                    .padding(.top, 8)
                    .opacity(appear ? 1 : 0)

                Spacer()

                VStack(spacing: 18) {
                    featureRow(icon: "chart.pie.fill", text: "Entenda sua situação financeira")
                    featureRow(icon: "banknote.fill", text: "Quite suas dívidas com um plano")
                    featureRow(icon: "leaf.fill", text: "Evolua até ficar no verdinho")
                }
                .padding(.horizontal, 36)
                .opacity(appear ? 1 : 0)

                PrimaryButton("Começar", icon: "leaf.fill") {
                    withAnimation { app.onboarded = true }
                }
                .padding(.horizontal, 28)
                .padding(.top, 30)

                Spacer()
            }
            .padding(.bottom, 24)
        }
        .onAppear {
            withAnimation(.spring(response: 0.7, dampingFraction: 0.8)) {
                appear = true
            }
        }
    }

    private func featureRow(icon: String, text: String) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(Theme.green)
                .frame(width: 34, height: 34)
                .background(Theme.soft(Theme.green))
                .clipShape(Circle())
            Text(text)
                .font(Fonts.caption())
                .foregroundStyle(Theme.textSecondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

