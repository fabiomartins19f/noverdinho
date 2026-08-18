import SwiftUI

// MARK: - Tab bar personalizada (Início | Dívidas | + | Planejamento | Perfil)

struct RootTabView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ZStack(alignment: .bottom) {
            Group {
                switch app.selectedTab {
                case .home: NavigationStack { DashboardView() }
                case .debts: NavigationStack { DebtsView() }
                case .planning: NavigationStack { PlanningView() }
                case .profile: NavigationStack { ProfileView() }
                }
            }

            if !app.showDiagnostic {
                CustomTabBar(selected: $app.selectedTab) {
                    withAnimation(.spring(response: 0.35, dampingFraction: 0.7)) {
                        app.showDiagnostic = true
                    }
                }
            }
        }
    }
}

struct CustomTabBar: View {
    @Binding var selected: Tab
    let onAdd: () -> Void

    var body: some View {
        HStack(spacing: 0) {
            ForEach([Tab.home, Tab.debts], id: \.self) { tab in
                tabButton(tab)
            }

            // Botão central "+" destacado
            Button(action: onAdd) {
                Image(systemName: "plus")
                    .font(.system(size: 22, weight: .bold))
                    .foregroundStyle(Theme.background)
                    .frame(width: 56, height: 56)
                    .background(Theme.greenGradient)
                    .clipShape(Circle())
                    .shadow(color: Theme.green.opacity(0.4), radius: 12, y: 4)
            }
            .offset(y: -14)

            ForEach([Tab.planning, Tab.profile], id: \.self) { tab in
                tabButton(tab)
            }
        }
        .padding(.top, 10)
        .padding(.bottom, 4)
        .background(
            Theme.surface.opacity(0.92)
                .background(.ultraThinMaterial)
        )
        .overlay(alignment: .top) {
            Rectangle().fill(Theme.border).frame(height: 0.5)
        }
    }

    private func tabButton(_ tab: Tab) -> some View {
        Button {
            withAnimation(.easeOut(duration: 0.15)) { selected = tab }
        } label: {
            VStack(spacing: 3) {
                Image(systemName: tab.icon)
                    .font(.system(size: 21, weight: selected == tab ? .semibold : .regular))
                Text(tab.rawValue)
                    .font(Fonts.tab())
            }
            .foregroundStyle(selected == tab ? Theme.green : Theme.textTertiary)
            .frame(maxWidth: .infinity)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Navegação do diagnóstico (modal de adicionar/onboarding)

struct DiagnosticFlowView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ZStack(alignment: .bottom) {
            Color.black.opacity(0.5)
                .ignoresSafeArea()
                .onTapGesture { close() }

            AddSheetView {
                close()
            }
            .transition(.move(edge: .bottom).combined(with: .opacity))
        }
        .animation(.spring(response: 0.35, dampingFraction: 0.8), value: app.showAddSheet)
    }

    private func close() {
        withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
            app.showAddSheet = false
        }
    }
}

// MARK: - App principal

@main
struct NoVerdinhoApp: App {
    @StateObject private var app = AppState()

    var body: some Scene {
        WindowGroup {
            Group {
                if !app.onboarded {
                    OnboardingView()
                } else if app.showDiagnostic {
                    DiagnosticView()
                } else {
                    ZStack {
                        RootTabView()
                        if app.showAddSheet {
                            DiagnosticFlowView()
                        }
                    }
                }
            }
            .appBackground()
            .environmentObject(app)
            .tint(Theme.green)
        }
    }
}