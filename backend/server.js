require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const crypto = require('crypto');

const app = express();

// Meta envia o webhook em "application/json"; mantemos o corpo cru apenas
// para validar a assinatura (X-Hub-Signature-256) quando o segredo existe.
app.use(express.json({
  verify: (req, _res, buf) => { req.rawBody = buf; }
}));

// Configuração obrigatória — sem ela o servidor NÃO deve subir. Falha com
// mensagem clara (o log da Railway mostra qual variável está faltando).
const requiredEnv = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'CLIENT_ACCESS_TOKEN'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(`[config] FALTANDO VARIÁVEIS DE AMBIENTE: ${missingEnv.join(', ')}`);
  console.error('[config] Adicione-as na aba Variables do serviço e faça Redeploy.');
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_APP_SECRET = process.env.WHATSAPP_APP_SECRET;
const PLUGGY_WEBHOOK_SECRET = process.env.PLUGGY_WEBHOOK_SECRET;
const CLIENT_ACCESS_TOKEN = process.env.CLIENT_ACCESS_TOKEN;

// Segredos não configurados NUNCA abrem o servidor em produção. Em dev,
// exige-se ALLOW_INSECURE_DEV=true + NODE_ENV != production.
const allowInsecureDev =
  process.env.NODE_ENV !== 'production' && process.env.ALLOW_INSECURE_DEV === 'true';

// ============================================================
// Autenticação das rotas consumidas pelo app iOS
// ============================================================
// O telefone sozinho NÃO é credencial: exige-se um token compartilhado
// (CLIENT_ACCESS_TOKEN) enviado como Authorization: Bearer.

// Comparação constante-tempo que NÃO explode quando os tamanhos diferem.
function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function requireClientAuth(req, res, next) {
  if (!CLIENT_ACCESS_TOKEN) {
    console.error('CLIENT_ACCESS_TOKEN não configurado — rotas do app recusadas.');
    return res.status(500).send({ error: 'servidor mal configurado' });
  }
  const presented = (req.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!safeEqual(presented, CLIENT_ACCESS_TOKEN)) return res.status(401).send({ error: 'não autorizado' });
  next();
}

// ============================================================
// Utilitários
// ============================================================

async function getOrCreateUser(phone) {
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('phone_number', phone)
    .maybeSingle();
  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from('users')
    .insert({ phone_number: phone })
    .select('id')
    .single();
  if (error) throw error;
  return created.id;
}

async function insertTransaction({ userId, description, amount, category, source, date, externalId, kind = 'expense' }) {
  // Dedupe idempotente: webhooks podem reenviar o mesmo evento.
  if (externalId) {
    const { data: dup } = await supabase
      .from('transactions')
      .select('id')
      .eq('external_id', externalId)
      .maybeSingle();
    if (dup) return false;
  }
  const { error } = await supabase.from('transactions').insert({
    user_id: userId,
    description,
    amount: Math.abs(amount),
    kind: kind === 'income' ? 'income' : 'expense',
    category: category || 'Geral',
    source,
    date: date || new Date().toISOString(),
    external_id: externalId || null,
  });
  if (error) throw error;
  return true;
}

function verifyMetaSignature(req) {
  if (!WHATSAPP_APP_SECRET) return allowInsecureDev;
  const signature = req.get('X-Hub-Signature-256') || '';
  const expected =
    'sha256=' + crypto.createHmac('sha256', WHATSAPP_APP_SECRET).update(req.rawBody).digest('hex');
  return safeEqual(signature, expected);
}

function verifyPluggySignature(req) {
  if (!PLUGGY_WEBHOOK_SECRET) return allowInsecureDev;
  // Pluggy assina com HMAC-SHA256 do corpo usando o webhook secret.
  const signature = req.get('x-pluggy-signature') || '';
  const expected = crypto.createHmac('sha256', PLUGGY_WEBHOOK_SECRET).update(req.rawBody).digest('hex');
  return safeEqual(signature, expected);
}

// O tipo da transação do Pluggy define a direção do dinheiro.
function pluggyKind(tx) {
  return tx?.type === 'CREDIT' ? 'income' : 'expense';
}

// ============================================================
// ROTA 1: WEBHOOK DO OPEN FINANCE (Pluggy)
// ============================================================

app.post('/webhook/open-finance', async (req, res) => {
  if (!verifyPluggySignature(req)) return res.status(401).send({ error: 'assinatura inválida' });
  try {
    const event = req.body.event || '';
    const itemId = req.body.data?.itemId || req.body.data?.item?.id;

    if (!itemId) return res.status(200).send({ status: 'sem itemId, ignorado' });

    // Descobre o usuário dono da conexão.
    const { data: account } = await supabase
      .from('user_bank_accounts')
      .select('user_id')
      .eq('item_id', itemId)
      .maybeSingle();

    // ITEM_CREATED chega ANTES de haver vínculo no banco: o clientUserId
    // (nosso user id) vem no próprio payload e cria o vínculo.
    const clientUserId = req.body.data?.item?.clientUserId;
    if (!account && !clientUserId) return res.status(200).send({ status: 'item desconhecido' });

    // Eventos de transação: TRANSACTION_CREATED/UPDATED trazem a transação em data.transaction.
    const tx = req.body.data?.transaction;
    if (tx && ['TRANSACTION_CREATED', 'TRANSACTION_UPDATED'].includes(event)) {
      await insertTransaction({
        userId: (account || {}).user_id || clientUserId,
        description: tx.description || 'Transação',
        amount: Math.abs(tx.amount ?? 0),
        kind: pluggyKind(tx),
        category: tx.category?.replace(/_/g, ' ') || 'Open Finance',
        source: 'open_finance',
        date: tx.date,
        externalId: `pluggy:${tx.id}`,
      });
    }

    // Primeiro sync após conectar: item criado/atualizado dispara busca completa.
    if (['ITEM_CREATED', 'ITEM_UPDATED'].includes(event)) {
      if (clientUserId && event === 'ITEM_CREATED') {
        await supabase
          .from('user_bank_accounts')
          .upsert({ user_id: clientUserId, item_id: itemId, institution_name: req.body.data?.item?.institution?.name || null })
          .onConflict('item_id');
      }
      await syncAllTransactionsForItem(itemId, (account || {}).user_id || clientUserId);
    }

    res.status(200).send({ status: 'received' });
  } catch (error) {
    console.error('Erro no webhook Open Finance:', error);
    res.status(500).send({ error: error.message });
  }
});

async function syncAllTransactionsForItem(itemId, userId) {
  const token = await getPluggyApiKey();
  const { data: accounts } = await supabase
    .from('user_bank_accounts')
    .select('id, pluggy_account_id')
    .eq('item_id', itemId);

  for (const acc of accounts || []) {
    let page = 1;
    for (;;) {
      const url = `https://api.pluggy.ai/transactions?accountId=${acc.pluggy_account_id}&page=${page}&pageSize=100`;
      const response = await fetch(url, { headers: { 'X-API-Key': token } });
      if (!response.ok) throw new Error(`Pluggy ${response.status}`);
      const body = await response.json();
      for (const tx of body.results || []) {
        await insertTransaction({
          userId,
          description: tx.description || 'Transação',
          amount: Math.abs(tx.amount ?? 0),
          kind: pluggyKind(tx),
          category: tx.category?.replace(/_/g, ' ') || 'Open Finance',
          source: 'open_finance',
          date: tx.date,
          externalId: `pluggy:${tx.id}`,
        });
      }
      if ((body.results || []).length < 100 || page >= (body.totalPages || 1)) break;
      page += 1;
    }
  }
}

let cachedPluggyKey = null;
async function getPluggyApiKey() {
  if (cachedPluggyKey) return cachedPluggyKey;
  const response = await fetch('https://api.pluggy.ai/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: process.env.PLUGGY_CLIENT_ID,
      clientSecret: process.env.PLUGGY_CLIENT_SECRET,
    }),
  });
  if (!response.ok) throw new Error(`Pluggy auth ${response.status}`);
  const body = await response.json();
  cachedPluggyKey = body.apiKey;
  setTimeout(() => { cachedPluggyKey = null; }, 1000 * 60 * 60); // expira em ~2h; renova em 1h
  return cachedPluggyKey;
}

// Cria connect_token para o app abrir o widget do Pluggy.
// O app envia o TELEFONE; o servidor resolve o usuário e usa o id interno
// como clientUserId — assim o ITEM_CREATED chega com clientUserId e sabemos
// a quem vincular a conexão.
app.post('/api/connect-token', requireClientAuth, async (req, res) => {
  try {
    const phone = String(req.body.phone || '').replace(/\D/g, '');
    if (!phone) return res.status(400).send({ error: 'phone obrigatório' });
    const userId = await getOrCreateUser(phone);
    const apiKey = await getPluggyApiKey();
    const response = await fetch('https://api.pluggy.ai/connect_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({
        clientUserId: userId,
        options: { webhookUrl: `${process.env.PUBLIC_BASE_URL}/webhook/open-finance` },
      }),
    });
    const body = await response.json();
    res.status(response.ok ? 200 : 502).send({ accessToken: body.accessToken, error: body.error });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ============================================================
// Copiloto NoVerdinho — personalidade da IA
// ============================================================

const EXTRACTION_SYSTEM_PROMPT = `Você é o "NoVerdinho", um copiloto financeiro pessoal inteligente, amigável, direto, informal e absolutamente LIVRE DE JULGAMENTOS. Seu objetivo não é vigiar ou punir o usuário, mas protegê-lo de problemas financeiros futuros.

TAREFA: extrair da mensagem do usuário os dados do registro financeiro em JSON puro contendo exatamente estas chaves:
- "description": string curta (ex: "almoço no restaurante")
- "amount": número positivo
- "kind": "income" se dinheiro ENTROU, "expense" se SAIU
- "category": uma de Salário, Freelance, Alimentação, Moradia, Transporte, Saúde, Lazer, Assinaturas, Outros
- "reply": confirmação curta para WhatsApp (máx. 2 frases), no tom do copiloto: humano, sem julgamentos, gírias leves quando couber ("tranquilo", "conta comigo"), emojis com moderação (✅ 💡 ⚠️). Exemplo: "Anotado ✅ Almoço de 45 no Alimentação. Conta comigo pra manter seu verdinho 🌱"

Responda SOMENTE o JSON.`;

async function transcribeWhatsAppAudio(mediaId) {
  const metaRes = await fetch(
    `https://graph.facebook.com/v21.0/${mediaId}`,
    { headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` } }
  );
  if (!metaRes.ok) throw new Error(`Meta media ${metaRes.status}`);
  const { url } = await metaRes.json();
  if (!url) throw new Error('sem URL de mídia');

  const audioRes = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` }
  });
  if (!audioRes.ok) throw new Error(`download áudio ${audioRes.status}`);
  const buffer = Buffer.from(await audioRes.arrayBuffer());

  const file = new File([buffer], 'audio.ogg', { type: 'audio/ogg' });
  const transcription = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file,
    language: 'pt',
  });
  return transcription.text;
}

// ============================================================
// ROTA 2: WEBHOOK DO WHATSAPP (Meta Cloud API)
// ============================================================

// Verificação inicial do webhook (Meta faz GET com hub.verify_token).
app.get('/webhook/whatsapp', (req, res) => {
  if (req.query['hub.verify_token'] === WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(req.query['hub.challenge']);
  }
  res.sendStatus(403);
});

app.post('/webhook/whatsapp', async (req, res) => {
  if (!verifyMetaSignature(req)) return res.sendStatus(401);
  try {
    const value = req.body.entry?.[0]?.changes?.[0]?.value;
    const messageData = value?.messages?.[0];
    if (!messageData) return res.sendStatus(200);

    const userPhone = messageData.from;
    let userText = messageData.text?.body;

    // Zero-friction: aceita ÁUDIO transcrevendo com Whisper.
    if (!userText && messageData.audio?.id && process.env.OPENAI_API_KEY) {
      try {
        userText = await transcribeWhatsAppAudio(messageData.audio.id);
      } catch (err) {
        console.error('Falha ao transcrever áudio:', err.message);
        return res.sendStatus(200);
      }
    }
    if (!userPhone || !userText) return res.sendStatus(200);

    if (!openai) {
      console.error('OPENAI_API_KEY não configurada — mensagem ignorada.');
      return res.sendStatus(200);
    }

    const aiResponse = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
        { role: 'user', content: userText },
      ],
      response_format: { type: 'json_object' },
    });

    const parsed = JSON.parse(aiResponse.choices[0].message.content);
    const userId = await getOrCreateUser(userPhone);

    const inserted = await insertTransaction({
      userId,
      description: parsed.description || userText.slice(0, 80),
      amount: parsed.amount || 0,
      kind: parsed.kind === 'income' ? 'income' : 'expense',
      category: parsed.category,
      source: 'whatsapp',
      date: new Date(parseInt(messageData.timestamp, 10) * 1000 || Date.now()).toISOString(),
      externalId: `wa:${messageData.id}`,
    });

    // Responde no WhatsApp no tom do copiloto (opcional, requer token).
    if (inserted && process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
      await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: userPhone,
          type: 'text',
          text: { body: parsed.reply || `✅ Anotado: ${parsed.description} — R$ ${(parsed.amount || 0).toFixed(2)}.` },
        }),
      }).catch((err) => console.error('Falha ao responder WhatsApp:', err.message));
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook do WhatsApp:', error);
    res.sendStatus(500);
  }
});

// ============================================================
// ROTA 3: LEITURA PELO APP iOS
// ============================================================
// O app lê por aqui (com o telefone como identificador) — assim a anon key
// do Supabase nunca precisa ficar no cliente e o RLS pode rester restrito.

app.get('/api/transactions/:phone', requireClientAuth, async (req, res) => {
  try {
    const phone = req.params.phone.replace(/\D/g, '');
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('phone_number', phone)
      .maybeSingle();
    if (!user) return res.status(200).json([]);

    const { data, error } = await supabase
      .from('transactions')
      .select('description, amount, kind, category, source, date')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(500);
    if (error) throw error;
    // amount com sinal: despesa negativa, receita positiva.
    res.json((data || []).map((t) => ({ ...t, amount: t.kind === 'income' ? t.amount : -Math.abs(t.amount) })));
  } catch (error) {
    console.error('Erro ao listar transações:', error);
    res.status(500).send({ error: error.message });
  }
});

app.get('/health', (_req, res) => res.send({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NoVerdinho backend na porta ${PORT}`));
