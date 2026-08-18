# No Verdinho — Prompts para o Figma

Três prompts prontos para colar no Figma. Execute o **Prompt A** primeiro (gera a base e o Design System), depois o **B** e o **C** referenciando "o Design System do projeto" — assim a IA mantém consistência. Se a IA do Figma gerar elementos fora do padrão, peça "use os componentes do Design System da página X".

---

## PROMPT A — Identidade + Design System

```
Crie no Figma um Design System completo para o aplicativo mobile "NO VERDINHO",
uma plataforma de gestão financeira pessoal com o slogan "Organize. Quite. Evolua."

Contexto: app financeiro premium, nativo de iPhone (SwiftUI/HIG-inspired), interface
escura e sofisticada, com verde como cor de destaque representando evolução e
progresso. Deve parecer um produto real pronto para a App Store, transmitindo
confiança + controle + inteligência + progresso + simplicidade.

CONFIGURAÇÃO BASE
- Frame: iPhone 16 Pro, 393×852 pt
- Dark Mode como experiência padrão; criar também variantes Light Mode
- Safe areas respeitadas, tipografia hierárquica, grid consistente
- Espaçamento baseado em 4/8 pt, cantos arredondados consistentes
- Auto Layout em todos os componentes, com variantes
- Ícones: line icons, stroke consistente, 24pt, alinhados ao grid
- Acessibilidade: contraste adequado, alvos de toque de no mínimo 44pt

PALETA
- Fundo: preto/carvão profundo
- Verde principal: verde vibrante (associado ao "verdinho")
- Verde secundário: tons suaves para estados positivos
- Branco/off-white para textos principais
- Cinza para informações secundárias
- Vermelho SOMENTE para alertas e dívidas
- Amarelo/laranja somente para atenção
- Roxo/azul discretos como auxiliares
- Evitar excesso de verde; ele representa evolução, progresso e situações
  financeiras positivas

COMPONENTES OBRIGATÓRIOS (cada um com variantes e Auto Layout)
- Cores, Tipografia (títulos, corpo, números/moeda), Espaçamentos, Grid
- Botões: primário, secundário, terciário, destrutivo, desabilitado, com loading
- Inputs: texto, moeda (formatação R$ 1.234,56), com foco, com erro, com sucesso
- Cards: default, com destaque, com alerta, com progresso
- Badges: status (pago, atrasado, em dia, atenção, sucesso)
- Progress bars: linear, circular, com etapas
- Gráficos: barras horizontais e verticais, linhas, área — NUNCA pizza/donut
- Bottom sheets, Modais, Alertas
- Tabs, Navigation bar, Tab bar (5 itens com botão central "+" diferenciado)
- Empty states, Error states, Loading states (skeleton)
- Componentes de dívida: card de dívida, card de quitação, timeline de plano
- Componentes de cartão: visual do cartão, indicador de comprometimento de limite
- Componentes de metas: card com percentual e previsão
- Componente "Nível No Verdinho": score 0-100 com barra de progresso proprietária

ORGANIZAÇÃO
- Estruturar tudo em páginas: Cores, Tipografia, Ícones, Componentes, Tokens
- Nomear componentes com variantes claras e estados
- Resultado: design system reutilizável, organizado e documentado
```

---

## PROMPT B — Telas 01 a 07

```
Crie as 7 primeiras telas do app "NO VERDINHO" (gestão financeira pessoal),
usando o Design System do projeto no Figma. Estética premium de app financeiro
nativo de iPhone, Dark Mode como padrão. Frames 393×852 com safe areas.
Iconografia: line icons 24pt. Sem comentários de texto fora das telas.

TELA 01 — ONBOARDING
Introdução elegante. Título "NO VERDINHO", slogan "Organize. Quite. Evolua."
Mensagem: "Tenha clareza sobre seu dinheiro e um plano para chegar no verdinho."
Botão principal "Começar". Sequência curta de 4 slides:
1. Entenda sua situação financeira
2. Organize suas dívidas
3. Crie seu plano
4. Evolua financeiramente

TELA 02 — DIAGNÓSTICO FINANCEIRO
Fluxo de diagnóstico com barra de progresso elegante e elegante transição entre
perguntas. Inputs com teclado numérico e formatação de moeda automática:
- Quanto você recebe por mês?
- Quanto possui em despesas fixas?
- Quanto possui em dívidas?
- Quantos cartões utiliza?
- Quanto consegue guardar ou pagar por mês?
Tela final: "Seu diagnóstico está pronto" com resumo da situação e indicador
"NÍVEL NO VERDINHO": 64/100 — "Você está no caminho certo, mas ainda existem
pontos para melhorar."

TELA 03 — DASHBOARD
Home original (não parece dashboard web):
- Topo: "Bom dia 👋 / Como está sua vida financeira hoje?"
- Saldo disponível: R$ 3.240,00
- Três indicadores: Receitas R$ 7.500 | Despesas R$ 4.260 | Dívidas R$ 18.430
- Seção "Seu Verdinho": score 72/100 com componente visual proprietário de
  evolução + "Você avançou 8 pontos este mês" + gráfico de evolução mensal (linha)
- "Próximos compromissos": próximos pagamentos em cards compactos
- Alerta inteligente: "Atenção — Suas despesas previstas para os próximos 15 dias
  estão acima do seu limite recomendado."
Incluir também variantes de empty state (sem transações) e loading state (skeleton).

TELA 04 — CENTRAL DE DÍVIDAS
- Topo: "Minhas dívidas / R$ 18.430 / ↓ R$ 2.170 este mês"
- Filtros: Todas | Atrasadas | Em dia | Quitadas
- Cards próprios para: Cartão de crédito, Empréstimo, Financiamento, Parcelamentos
- Cada card: valor restante, parcela, juros, vencimento, progresso e prioridade

TELA 05 — DETALHE DA DÍVIDA
- "Cartão de crédito / R$ 4.850"
- Valor original, valor já pago, saldo restante, juros, parcela, vencimento
- Histórico de pagamentos
- Visualização de progresso original (não use anel/pizza)
- CTA: "Planejar quitação"

TELA 06 — PLANO DE QUITAÇÃO
- Título: "Seu plano para ficar no verdinho"
- "Quanto você consegue destinar por mês para suas dívidas?" → R$ 1.200/mês
- Duas estratégias comparáveis: Avalanche (juros maiores) e Bola de neve (menores)
- Previsão de quitação: 24 meses | Economia estimada: R$ 4.620
- Timeline visual com a ordem de quitação das dívidas

TELA 07 — CARTÕES
- Central de cartões: nome, limite, utilizado, disponível, fatura, vencimento
- Detalhe: "Fatura atual R$ 1.850", compras, parcelamentos, próximas faturas,
  histórico
- Indicador visual de comprometimento do limite (barra horizontal, não anel)
```

---

## PROMPT C — Telas 08 a 14 + Navegação + Protótipo

```
Crie as telas finais do app "NO VERDINHO" (gestão financeira pessoal), usando o
Design System do projeto no Figma. Estética premium de app financeiro nativo de
iPhone, Dark Mode como padrão. Frames 393×852 com safe areas. Iconografia:
line icons 24pt. NUNCA use gráficos de pizza/donut — priorize barras e linhas.

TELA 08 — PLANEJAMENTO
- "Planejamento / Orçamento do mês: R$ 6.000"
- Categorias: Moradia, Alimentação, Transporte, Lazer, Saúde, Outros
- Consumo vs limite com visualizações próprias (barras horizontais de progresso)

TELA 09 — METAS
- "Minhas metas": 🎯 Quitar dívidas, 🏦 Reserva de emergência, 🚗 Comprar carro,
  ✈️ Viagem
- Cada meta: valor objetivo, valor acumulado, percentual e previsão de conclusão

TELA 10 — "POSSO GASTAR?"
Funcionalidade exclusiva:
- Usuário informa R$ 500
- O sistema analisa saldo, próximos compromissos, dívidas, orçamento, cartões e
  metas
- Resultado: 🟢 Compra compatível | 🟡 Cuidado | 🔴 Não recomendado
- Explicação simples e objetiva do motivo
- Criar os 3 estados de resultado (verde, amarelo, vermelho)

TELA 11 — INTELIGÊNCIA FINANCEIRA
- Seção "Seu Verdinho": a IA analisa o comportamento financeiro
- Cards inteligentes, claros e acionáveis com exemplos:
  "Você gastou 18% menos com alimentação este mês."
  "Seu cartão representa uma parcela elevada da sua renda."
  "Adicionar R$ 200 ao pagamento da dívida principal pode antecipar sua quitação."
- Cada card deve ter uma ação clara (ex.: "Ajustar plano")

TELA 12 — RELATÓRIOS
- Receitas, Despesas, Evolução das dívidas, Gastos por categoria, Economia mensal,
  Patrimônio, Evolução do nível financeiro
- Gráficos de linha, barras e visualizações originais — nada de pizza/donut

TELA 13 — ADICIONAR
- Bottom sheet central: "O que você deseja adicionar?"
- Opções: Receita, Despesa, Dívida, Conta, Cartão, Meta
- Fluxo em poucos toques (mostrar 1 exemplo de formulário rápido)

TELA 14 — PERFIL E CONFIGURAÇÕES
- Perfil, Segurança, Face ID, Notificações, Contas, Categorias, Preferências,
  Aparência, Exportação de dados, Privacidade
- Lista agrupada estilo iOS

NAVEGAÇÃO
- Tab bar própria: Início | Dívidas | + | Planejamento | Perfil
- Botão central "+" diferenciado (elevado ou em destaque), sem copiar outras
  referências
- Incluir estados ativo/inativo e badge de notificação

ENTREGÁVEIS FINAIS
1. Página com as 14 telas + fluxo completo de diagnóstico
2. Prototype flow conectado: Onboarding → Diagnóstico → Dashboard, e navegação
   entre as tabs principais (com transições suaves)
3. Estados de loading e empty para Dashboard, Dívidas e Planejamento
4. A pasta deve estar organizada e nomeada
```
