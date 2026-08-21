# No Verdinho — App iOS (SwiftUI)

App nativo **exclusivo Apple** (iPhone, iOS 17+), construído com SwiftUI.
Todas as telas seguem o design system em `no-verdinho-figma-prompts.md`.

## Funcionalidades

- **Onboarding + criação de conta** (com validação, "Continuar com Apple" e LGPD)
- **Dashboard**: saldo (com opção de ocultar), nível "No Verdinho", alertas, próximos compromissos e transações
- **Central de dívidas**: filtros, simulação de quitação (bola de neve / avalanche) com detecção de
  dívidas que nunca quitam, e plano de pagamento
- **Cartões**: barra de limite estilo Nubank com a **cor da marca** de cada cartão, detalhe da fatura e
  **importação de extrato** (colar texto ou PDF via PDFKit — reconhecimento automático de datas,
  valores e ajustes)
- **Planejamento**: orçamento por categoria e metas
- **Inteligência**: "Posso gastar?" e insights
- **Simulador "E se eu comprar?"**: antes da compra, projeta o comprometimento de renda, a queda do
  nível verde e o atraso nas metas (à vista ou parcelado), com veredito claro
- **Relatórios**: evolução mensal e gastos por categoria
- **Privacidade e segurança**: dados 100% no aparelho, trava por Face ID / senha do aparelho,
  ocultar saldo, logout mantém os dados e "Apagar meus dados" remove tudo conforme a LGPD
- **Qualidade**: 25 testes unitários (parser de extrato, simulador de quitação, simulador de compra),
  acessibilidade nos componentes principais e `PrivacyInfo.xcprivacy`

## Estrutura

```
ios/
├── project.yml            # Definição do projeto + alvo de testes (xcodegen)
├── generate.sh            # Gera o .xcodeproj e aplica o patch iPhone-only
└── NoVerdinho/
    ├── App/               # Entry point + tab bar custom + navegação
    ├── Theme/             # Cores, fontes e formatação de dinheiro
    ├── Components/        # Cartão, botões, gráficos, skeleton, haptics
    ├── Models/            # Modelos + AppState (persistido) + parsers/simuladores puros
    ├── Views/             # Telas (onboarding, dashboard, cartões, planejamento…)
    └── PrivacyInfo.xcprivacy
Tests/NoVerdinhoTests/     # Testes unitários (XCTest)
```

## Como rodar

Pré-requisitos: Xcode 16+ e [xcodegen](https://github.com/yonaskolb/XcodeGen) (`brew install xcodegen`).

```bash
cd ios
./generate.sh              # gera NoVerdinho.xcodeproj (só quando muda project.yml ou telas)
xcodebuild -project NoVerdinho.xcodeproj -scheme NoVerdinho \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' -derivedDataPath build build
xcrun simctl install booted build/Build/Products/Debug-iphonesimulator/NoVerdinho.app
xcrun simctl launch booted br.com.noverdinho.ios
```

### Testes

```bash
cd ios
xcodebuild -project NoVerdinho.xcodeproj -scheme NoVerdinho \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' test
```

O app é **iPhone-only** (`TARGETED_DEVICE_FAMILY = 1`), suporta as 3 orientações e usa assinatura
automática com o time `N8VSB7DMCQ` (bundle `br.com.noverdinho.ios`).

## Convenções (clear code)

- Uma tela por arquivo em `Views/`, componentes reutilizáveis em `Components/`
- `AppState` é a única fonte de dados (mock demo + persistência); telas só leem/escrevem nele
- Regras financeiras ficam em tipos **puros e testáveis** (`PayoffSimulator`, `PurchaseSimulator`,
  `StatementParser`) — sem dependência de UI ou persistência
- Todo valor monetário usa `Money.format`; datas usam `Date` + formatters pt_BR
- Haptics em ações de sucesso via `Haptics.success()`
- IDs das entidades são persistidos (estáveis entre sessões)

## Roadmap (funções futuras)

- [ ] **Sync do cartão de crédito**: integração com o banco (Open Finance / APIs) para puxar a fatura
      automaticamente, dispensando colar/importar o extrato manualmente
- [ ] Notificações de vencimento e alertas de limite
- [ ] Exportação de dados (CSV/PDF) e backup em iCloud
- [ ] Versão Android
