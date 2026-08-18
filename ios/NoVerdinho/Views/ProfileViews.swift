import SwiftUI

// MARK: - TELA 12: Relatórios

struct ReportsView: View {
    @EnvironmentObject var app: AppState
    @State private var selected = 0

    private let tabs = ["Evolução", "Categorias"]

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 8) {
                    ForEach(tabs.indices, id: \.self) { index in
                        Button {
                            withAnimation { selected = index }
                        } label: {
                            Text(tabs[index])
                                .font(Fonts.captionStrong())
                                .foregroundStyle(selected == index ? Theme.background : Theme.textSecondary)
                                .padding(.horizontal, 16)
                                .padding(.vertical, 9)
                                .background(selected == index ? Theme.green : Theme.surfaceAlt)
                                .clipShape(Capsule())
                        }
                        .buttonStyle(.plain)
                    }
                }

                if selected == 0 {
                    evolutionTab
                } else {
                    categoriesTab
                }
            }
        }
        .navigationTitle("Relatórios")
        .navigationBarTitleDisplayMode(.inline)
    }

    private var evolutionTab: some View {
        VStack(alignment: .leading, spacing: 18) {
            ForEach(app.reports) { report in
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text(report.title)
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.textSecondary)
                            Spacer()
                            Text(Money.format(report.values.last ?? 0))
                                .font(Fonts.captionStrong())
                                .foregroundStyle(report.color)
                        }
                        BarChart(labels: app.reportLabels, series: [(report.values, report.color)])
                            .frame(height: 140)
                        HStack {
                            ForEach(0..<2, id: \.self) { index in
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(index == 0 ? "Início do período" : "Mês atual")
                                        .font(Fonts.caption(11))
                                        .foregroundStyle(Theme.textTertiary)
                                    Text(Money.format(report.values[index == 0 ? 0 : report.values.count - 1]))
                                        .font(Fonts.caption(12))
                                        .foregroundStyle(Theme.textSecondary)
                                }
                                if index == 0 { Spacer() }
                            }
                        }
                    }
                }
            }
        }
    }

    private var categoriesTab: some View {
        VStack(alignment: .leading, spacing: 18) {
            Text("Gastos por categoria")
                .font(Fonts.headline(18))
                .foregroundStyle(Theme.text)

            AppCard {
                VStack(spacing: 14) {
                    ForEach(app.expensesByCategory, id: \.name) { category in
                        HStack(spacing: 10) {
                            Text(category.name)
                                .font(Fonts.caption())
                                .foregroundStyle(Theme.textSecondary)
                                .frame(width: 90, alignment: .leading)
                            GeometryReader { geo in
                                ZStack(alignment: .leading) {
                                    Capsule().fill(Theme.surfaceAlt)
                                    Capsule()
                                        .fill(category.color)
                                        .frame(width: max(8, (category.value / maxTotal) * geo.size.width))
                                }
                            }
                            .frame(height: 10)
                            Text(Money.format(category.value))
                                .font(Fonts.captionStrong(12))
                                .foregroundStyle(Theme.text)
                                .frame(width: 84, alignment: .trailing)
                        }
                    }
                }
            }

            AppCard {
                VStack(alignment: .leading, spacing: 10) {
                    Text("Resumo")
                        .font(Fonts.captionStrong())
                        .foregroundStyle(Theme.textSecondary)
                    IndicatorRow(icon: "arrow.up.forward.circle.fill", title: "Receitas", value: Money.format(8700), color: Theme.green)
                    IndicatorRow(icon: "arrow.down.right.circle.fill", title: "Despesas", value: Money.format(4260), color: Theme.danger)
                    IndicatorRow(icon: "banknote.fill", title: "Dívidas", value: Money.format(app.totalDebt), color: Theme.warning)
                    IndicatorRow(icon: "leaf.fill", title: "Economia", value: Money.format(4440), color: Theme.greenBright)
                    IndicatorRow(icon: "chart.line.uptrend.xyaxis", title: "Nível", value: "72/100", color: Theme.purple)
                }
            }
        }
    }

    private var maxTotal: Double {
        app.expensesByCategory.map(\.value).max() ?? 1
    }
}

// MARK: - TELA 13: Adicionar (bottom sheet)

struct AddSheetView: View {
    let onClose: () -> Void
    @EnvironmentObject var app: AppState
    @State private var selectedType: AddType?
    @State private var showForm = false

    private enum AddType: String, CaseIterable {
        case income = "Receita"
        case expense = "Despesa"
        case debt = "Dívida"
        case account = "Conta"
        case card = "Cartão"
        case goal = "Meta"

        var icon: String {
            switch self {
            case .income: "arrow.down.left.circle.fill"
            case .expense: "arrow.up.right.circle.fill"
            case .debt: "banknote.fill"
            case .account: "building.columns.fill"
            case .card: "creditcard.fill"
            case .goal: "target"
            }
        }

        var color: Color {
            switch self {
            case .income: Theme.green
            case .expense: Theme.danger
            case .debt: Theme.warning
            case .account: Theme.info
            case .card: Theme.purple
            case .goal: Theme.greenBright
            }
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 18) {
            HStack {
                Text("O que você deseja adicionar?")
                    .font(Fonts.headline(18))
                    .foregroundStyle(Theme.text)
                Spacer()
                Button(action: onClose) {
                    Image(systemName: "xmark")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundStyle(Theme.textSecondary)
                        .frame(width: 32, height: 32)
                        .background(Theme.surfaceAlt)
                        .clipShape(Circle())
                }
                .buttonStyle(.plain)
            }

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                ForEach(AddType.allCases, id: \.self) { type in
                    Button {
                        selectedType = type
                        withAnimation { showForm = true }
                    } label: {
                        VStack(spacing: 8) {
                            Image(systemName: type.icon)
                                .font(.system(size: 20, weight: .semibold))
                                .foregroundStyle(type.color)
                                .frame(width: 44, height: 44)
                                .background(type.color.opacity(0.12))
                                .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                            Text(type.rawValue)
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.text)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(Theme.surfaceAlt)
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
                    }
                    .buttonStyle(.plain)
                }
            }

            if showForm, let selectedType {
                AppCard {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Nova \(selectedType.rawValue.lowercased())")
                            .font(Fonts.captionStrong())
                            .foregroundStyle(Theme.textSecondary)
                        CurrencyField(value: .constant(""), placeholder: "Valor")
                        TextField("Descrição", text: .constant(""))
                            .font(Fonts.body())
                            .foregroundStyle(Theme.text)
                            .padding(.horizontal, 14)
                            .padding(.vertical, 13)
                            .background(Theme.surfaceAlt)
                            .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
                            .overlay(
                                RoundedRectangle(cornerRadius: 12, style: .continuous)
                                    .stroke(Theme.borderStrong, lineWidth: 1)
                            )
                        PrimaryButton("Salvar", icon: "checkmark") {
                            onClose()
                        }
                    }
                }
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
        .padding(20)
        .padding(.bottom, 30)
        .background(
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .fill(Theme.surfaceElevated)
                .ignoresSafeArea(edges: .bottom)
        )
        .overlay(alignment: .top) {
            Capsule()
                .fill(Theme.borderStrong)
                .frame(width: 40, height: 5)
                .padding(.top, 10)
        }
    }
}

// MARK: - TELA 14: Perfil e Configurações

struct ProfileView: View {
    @EnvironmentObject var app: AppState

    var body: some View {
        ScreenScroll {
            VStack(alignment: .leading, spacing: 20) {
                // Cabeçalho
                HStack(spacing: 14) {
                    Image(systemName: "person.crop.circle.fill")
                        .font(.system(size: 56))
                        .foregroundStyle(Theme.surfaceElevated)
                        .overlay(
                            Circle().stroke(Theme.green, lineWidth: 2).frame(width: 60, height: 60)
                        )
                    VStack(alignment: .leading, spacing: 3) {
                        Text("Usuário")
                            .font(Fonts.headline(20))
                            .foregroundStyle(Theme.text)
                        Text("usuario@email.com")
                            .font(Fonts.caption())
                            .foregroundStyle(Theme.textSecondary)
                        HStack(spacing: 4) {
                            Image(systemName: "leaf.fill")
                                .font(.system(size: 10))
                            Text("Nível 72 — No caminho")
                                .font(Fonts.caption(12))
                        }
                        .foregroundStyle(Theme.green)
                    }
                    Spacer()
                }

                NavigationLink {
                    CardsView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "creditcard.fill")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.green)
                                .frame(width: 36, height: 36)
                                .background(Theme.greenSoft())
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Meus cartões")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Text("\(app.cards.count)")
                                .font(Fonts.captionStrong())
                                .foregroundStyle(Theme.textSecondary)
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    GoalsView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "target")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.purple)
                                .frame(width: 36, height: 36)
                                .background(Theme.purpleSoft)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Minhas metas")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    CanISpendView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "sparkles")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.warning)
                                .frame(width: 36, height: 36)
                                .background(Theme.warningSoft)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Posso gastar?")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    IntelligenceView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "brain.head.profile")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.info)
                                .frame(width: 36, height: 36)
                                .background(Theme.infoSoft)
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Inteligência financeira")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                NavigationLink {
                    ReportsView()
                } label: {
                    AppCard {
                        HStack(spacing: 12) {
                            Image(systemName: "chart.bar.xaxis")
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundStyle(Theme.greenBright)
                                .frame(width: 36, height: 36)
                                .background(Theme.greenSoft(0.2))
                                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
                            Text("Relatórios")
                                .font(Fonts.bodyMedium())
                                .foregroundStyle(Theme.text)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(Theme.textTertiary)
                        }
                    }
                }
                .buttonStyle(.plain)

                // Configurações
                ForEach(app.profileSections, id: \.title) { section in
                    AppCard {
                        VStack(alignment: .leading, spacing: 4) {
                            HStack(spacing: 8) {
                                Image(systemName: section.icon)
                                    .font(.system(size: 12, weight: .semibold))
                                    .foregroundStyle(Theme.textSecondary)
                                Text(section.title.uppercased())
                                    .font(Fonts.caption(11))
                                    .foregroundStyle(Theme.textSecondary)
                            }
                            .padding(.bottom, 6)
                            ForEach(section.items, id: \.0) { item in
                                HStack {
                                    Text(item.0)
                                        .font(Fonts.body())
                                        .foregroundStyle(Theme.text)
                                    Spacer()
                                    Text(item.1)
                                        .font(Fonts.caption())
                                        .foregroundStyle(Theme.textSecondary)
                                    if item.0 != "Sair" {
                                        Image(systemName: "chevron.right")
                                            .font(.system(size: 11, weight: .semibold))
                                            .foregroundStyle(Theme.textTertiary)
                                    }
                                }
                                .padding(.vertical, 10)
                                .contentShape(Rectangle())
                            }
                        }
                    }
                }
            }
        }
        .navigationTitle("Perfil")
        .navigationBarTitleDisplayMode(.inline)
    }
}