# Como ativar cada função do No Verdinho

Guia passo a passo para colocar o app 100% funcional. Tudo que exige conta
externa está marcado com ⚠️ (só você consegue criar — eu não tenho acesso).

## Estado atual

| Função | Roda hoje? |
| ------ | ---------- |
| App no simulador (todas as telas, score, radar, plano, calendário, conquistas) | ✅ Sim |
| App no iPhone físico | ⚠️ precisa logar Apple ID no Xcode |
| Login com Google | ⚠️ precisa do Client ID (5 min) |
| Sync WhatsApp / Open Finance / backend | ⚠️ precisa Supabase + deploy + chaves |

---

## 1. App no seu iPhone (provisioning)

1. Xcode → Settings (⌘,) → **Accounts** → **+** → entre com o Apple ID do time `N8VSB7DMCQ`
2. Abra `ios/NoVerdinho.xcodeproj` → target **NoVerdinho** → **Signing & Capabilities**
   - Marque *Automatically manage signing* e selecione o team
3. Plugue o iPhone, escolha ele como destino e rode ▶
   - (Simulador não precisa disso — funciona sem nenhuma conta)

## 2. Login com Google (5 min)

1. [console.cloud.google.com](https://console.cloud.google.com) → crie um projeto
2. **APIs & Services → OAuth consent screen** → configure (External)
3. **Credentials → Create credentials → OAuth client ID → iOS**
   - Anote o **Client ID** (termina em `.apps.googleusercontent.com`)
4. Em `ios/NoVerdinho/Models/GoogleConfig.swift`, cole no `clientID`
5. Em `ios/NoVerdinho/Info.plist`, troque o scheme pelo **reversed Client ID**
   (ex.: `com.googleusercontent.apps.1234567890-abc`)
6. Rode o app → o botão **Continuar com Google** funciona

## 3. Backend + Sync (WhatsApp + Open Finance)

### 3a. Supabase (gratuito)
1. Crie um projeto em [supabase.com](https://supabase.com) (região próxima)
2. **SQL Editor** → cole e rode `backend/supabase/schema.sql`
3. **Project Settings → API** → copie `URL` e `service_role` (a chave **service_role
   NUNCA vai no app** — só no `.env` do servidor)

### 3b. Deploy do backend (gratuito, ~5 min)

**Railway** (mais simples): crie projeto → Deploy from GitHub → apontar `backend/`
→ o `Dockerfile` é detectado → suba as variáveis abaixo.

**Render**: use o `backend/render.yaml` (New → Blueprint → selecionar o repo).

**Fly.io**: `cd backend && fly launch && fly secrets set ...` (lista no `fly.toml`).

Variáveis a preencher:
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
CLIENT_ACCESS_TOKEN=<um token que você inventar>
PUBLIC_BASE_URL=https://SEU-BACKEND.com
```
Sem `CLIENT_ACCESS_TOKEN`, as rotas do app respondem 500 — é proposital.

### 3c. No app
Perfil → **Sincronização** → preencha:
- URL do servidor: `https://SEU-BACKEND.com`
- Telefone: seu número com código do país (ex. `5521999999999`)
- Token de acesso: o mesmo `CLIENT_ACCESS_TOKEN`

Toque **Sincronizar agora**. Pronto — o que chegar no banco aparece no app.

### 3d. WhatsApp no bot (opcional)
1. [developers.facebook.com](https://developers.facebook.com) → criar app → **WhatsApp**
2. Obtenha o `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` e o número de teste
3. No painel, configure webhook para `https://SEU-BACKEND.com/webhook/whatsapp`
   com o `WHATSAPP_VERIFY_TOKEN` do `.env`
4. Preencha `WHATSAPP_APP_SECRET`, `OPENAI_API_KEY` no servidor e recarregue
5. Mande no seu número: *"gastei 45 no mercado"* (texto ou áudio) → aparece no app

### 3e. Open Finance (opcional)
1. Crie conta em [pluggy.ai](https://pluggy.ai) (tem sandbox gratuito)
2. Em Credentials, gere `PLUGGY_CLIENT_ID` e `PLUGGY_CLIENT_SECRET`
3. Configure webhook para `https://SEU-BACKEND.com/webhook/open-finance`
4. No app: Perfil → Sincronização → **Conectar banco (Open Finance)** → escolha o
   banco → autorize no app do banco → as transações entram automaticamente

---

## Testes

```bash
cd ios
./generate.sh
xcodebuild test -project NoVerdinho.xcodeproj -scheme NoVerdinho \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro'
```