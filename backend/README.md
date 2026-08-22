# No Verdinho — Backend (WhatsApp + Open Finance)

Servidor unificado que recebe **transações do WhatsApp** (Meta Cloud API, com
parse por IA) e do **Open Finance** (via agregador Pluggy), guarda tudo no
Supabase e serve para o app iOS em `GET /api/transactions/:phone`.

## Arquitetura

```
WhatsApp (Meta Cloud API) ──► POST /webhook/whatsapp ──┐
                                                       ├──► Supabase ◄──┐
Open Finance (Pluggy) ──────► POST /webhook/open-finance ──────────────┤
                                                                       │
App iOS ── GET /api/transactions/:phone ◄──────────────────────────────┘
           (merge local com dedupe; o app continua funcionando offline)
```

## Como rodar

1. Crie um projeto no [Supabase](https://supabase.com) e rode
   `supabase/schema.sql` no SQL Editor.
2. Copie `.env.example` para `.env` e preencha as chaves.
3. Instale e suba:

```bash
npm install
npm start   # porta 3000
```

## Configuração dos webhooks

- **WhatsApp**: no painel da Meta for Developers, configure o webhook como
  `https://SEU-DOMINIO/webhook/whatsapp` com o verify token de
  `WHATSAPP_VERIFY_TOKEN`. Assine o campo `messages`.
- **Open Finance/Pluggy**: crie uma conta em [pluggy.ai](https://pluggy.ai),
  gere `client_id`/`client_secret` e configure o webhook para
  `https://SEU-DOMINIO/webhook/open-finance`. O connect_token usado pelo app já
  envia esse webhook automaticamente.

## Rotas

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| POST | `/webhook/whatsapp` | Webhook da Meta (GET faz a verificação inicial) |
| POST | `/webhook/open-finance` | Webhook do Pluggy (transações e sync completo) |
| POST | `/api/connect-token` | Gera token para abrir o widget de conexão do Pluggy |
| GET | `/api/transactions/:phone` | Transações do usuário (usado pelo app iOS) |
| GET | `/health` | Healthcheck |

## Deploy

Funciona em qualquer host Node (Railway, Fly.io, Render, VPS). Defina todas as
variáveis do `.env.example` no painel do host e exponha HTTPS público — Meta e
Pluggy exigem HTTPS para webhooks.

## Segurança

- Todas as tabelas têm **RLS ligado sem políticas públicas**: a chave anon do
  Supabase não lê nada. Só este servidor (service role) acessa os dados.
- Webhooks validam assinatura HMAC (`X-Hub-Signature-256` da Meta e
  `x-pluggy-signature` do Pluggy) quando os segredos estão configurados.
- Dedupe idempotente via `external_id` — reenvios de webhook não duplicam.
- O app iOS nunca recebe segredos: só a URL pública deste servidor.
