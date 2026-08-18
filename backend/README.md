# No Verdinho — Backend

API de gestão financeira pessoal do app **No Verdinho** ("Organize. Quite. Evolua.").
Construída com **NestJS 11 + Prisma 7 + PostgreSQL + Redis (BullMQ)**.

## Stack

| Camada          | Tecnologia                                        |
| --------------- | ------------------------------------------------- |
| Runtime         | Node.js 24 + TypeScript (strict)                  |
| Framework       | NestJS 11 (REST, prefixo `/api`, versão `v1`)     |
| Banco           | PostgreSQL 17 (Prisma 7, Decimal(12,2) p/ dinheiro) |
| Cache/Filas     | Redis 7 + BullMQ (jobs recorrentes)               |
| Autenticação    | JWT (access 15min + refresh 30d com rotação) + Argon2id |
| Validação       | class-validator + class-transformer (whitelist)   |
| Documentação    | Swagger em `/api/docs` (OpenAPI 3)                |
| Testes          | Jest (unit) + Supertest (e2e)                     |
| Infra           | Docker Compose (postgres + redis + backend)       |

## Como rodar

```bash
cp .env.example .env        # preencha os secrets
npm install
npm run db:up               # sobe postgres + redis (Docker)
npx prisma migrate deploy   # aplica migrations
npx prisma db seed          # categorias padrão do sistema
npm run start:dev           # API em http://localhost:3333/api
npm run start:worker        # worker BullMQ (jobs diários/mensais)
```

Swagger: http://localhost:3333/api/docs

### Testes

```bash
npm test                    # unitários (algoritmos financeiros)
npm run test:e2e            # integração (exige DB + Redis rodando)
npm run lint                # typecheck (tsc --noEmit)
```

## Arquitetura

```
backend/
├── prisma/
│   ├── schema.prisma          # 22 models (usuário → dívidas/cartões/planos)
│   └── migrations/            # SQL versionado
├── src/
│   ├── config/                # validação de env (falha rápido se faltar)
│   ├── prisma/                # PrismaService (driver adapter pg)
│   ├── common/                # exceptions, filter, interceptor, guards, utils
│   ├── auth/                  # login/registro/refresh/logout/esqueci senha
│   ├── users/ accounts/ categories/ transactions/
│   ├── credit-cards/          # faturas, parcelas, pagamento
│   ├── debts/                 # cronograma, juros, pagamentos, plano de quitação
│   │   └── payoff/            # AVALANCHE vs BOLA DE NEVE (serviços puros)
│   ├── budgets/ goals/
│   ├── financial-analysis/    # capacidade + posso gastar? (30 dias)
│   ├── financial-health/      # Nível No Verdinho (score 0-100, 7 fatores)
│   ├── dashboard/ reports/    # agregados e séries (máx. 36 meses)
│   ├── notifications/ insights/ audit/
│   └── jobs/                  # BullMQ WorkerHost (daily-scan, monthly-charges, generate-insights)
└── docker-compose.yml
```

### Decisões de design

- **Dinheiro é `Decimal(12,2)`** — nunca float; arredondamento monetário centralizado em `common/utils/money.ts`.
- **Resposta padrão**: `{ success, data, message }`; erros `{ success: false, error: { code, message } }`.
- **Idempotência** de transações via header `Idempotency-Key` (evita duplicação em retry).
- **Soft delete financeiro**: cancelar transação **reverte o saldo** da conta; contas são inativas, nunca excluídas.
- **Rotação de refresh tokens** (hash SHA-256 no banco): reuso do token antigo revoga a sessão.
- **Simulador de quitação determinístico**: mesma entrada → mesma saída (sem aleatoriedade), com baseline de "pagamento mínimo" para calcular a economia estimada.
- **Multiusuário**: todas as queries filtram por `userId`; acesso a recurso de outro usuário retorna 404 (sem vazamento).

## Segurança & LGPD

- Senhas com Argon2id (memória de ~19 MiB, `$argon2id$`).
- Rate limiting global (throttler) + limites mais rígidos em `login` (5/min) e `register` (10/min).
- Helmet + CORS restrito por `CORS_ORIGINS`.
- Auditoria (`audit_log`) de ações sensíveis, ativável por env.
- Dados do usuário são isolados por `userId`; sessões e tokens revogáveis.
- Sem logs de dados pessoais (valores mascarados em erros).

## Jobs recorrentes (BullMQ)

| Job                 | Frequência | Ação                                          |
| ------------------- | ---------- | --------------------------------------------- |
| `daily-scan`        | diário     | transações atrasadas, cartões próximos do limite |
| `monthly-charges`   | mensal     | juros/multa de dívidas em atraso              |
| `generate-insights` | semanal    | regras determinísticas de insights            |

## Deploy

```bash
docker compose up -d --build   # postgres + redis + backend (aplica migrations + seed)
```

Variáveis de ambiente obrigatórias: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`.