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

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_APP_SECRET = process.env.WHATSAPP_APP_SECRET;
const PLUGGY_WEBHOOK_SECRET = process.env.PLUGGY_WEBHOOK_SECRET;

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

async function insertTransaction({ userId, description, amount, category, source, date, externalId }) {
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
    category: category || 'Geral',
    source,
    date: date || new Date().toISOString(),
    external_id: externalId || null,
  });
  if (error) throw error;
  return true;
}

function verifyMetaSignature(req) {
  if (!WHATSAPP_APP_SECRET) return true; // dev sem verificação
  const signature = req.get('X-Hub-Signature-256') || '';
  const expected =
    'sha256=' + crypto.createHmac('sha256', WHATSAPP_APP_SECRET).update(req.rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function verifyPluggySignature(req) {
  // Pluggy assina com HMAC-SHA256 do corpo usando o webhook secret.
  if (!PLUGGY_WEBHOOK_SECRET) return true; // dev sem verificação
  const signature = req.get('x-pluggy-signature') || '';
  const expected = crypto.createHmac('sha256', PLUGGY_WEBHOOK_SECRET).update(req.rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
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
    if (!account) return res.status(200).send({ status: 'item desconhecido' });

    // Eventos de transação: TRANSACTION_CREATED/UPDATED trazem a transação em data.transaction.
    const tx = req.body.data?.transaction;
    if (tx && ['TRANSACTION_CREATED', 'TRANSACTION_UPDATED'].includes(event)) {
      await insertTransaction({
        userId: account.user_id,
        description: tx.description || 'Transação',
        amount: Math.abs(tx.amount ?? 0),
        category: tx.category?.replace(/_/g, ' ') || 'Open Finance',
        source: 'open_finance',
        date: tx.date,
        externalId: `pluggy:${tx.id}`,
      });
    }

    // Primeiro sync após conectar: item criado/atualizado dispara busca completa.
    if (['ITEM_CREATED', 'ITEM_UPDATED'].includes(event)) {
      await syncAllTransactionsForItem(itemId, account.user_id);
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
app.post('/api/connect-token', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).send({ error: 'userId obrigatório' });
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
    res.status(response.ok ? 200 : 502).send(body);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

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
    const userText = messageData.text?.body;
    if (!userPhone || !userText) return res.sendStatus(200);

    if (!openai) {
      console.error('OPENAI_API_KEY não configurada — mensagem ignorada.');
      return res.sendStatus(200);
    }

    const aiResponse = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente financeiro brasileiro. Extraia da frase do usuário os dados em JSON puro contendo exatamente as chaves: "description" (string curta), "amount" (número positivo; use sinal implícito — se a frase indicar dinheiro ENTRANDO, devolva kind="income", senão kind="expense"), "category" (uma de: Salário, Freelance, Alimentação, Moradia, Transporte, Saúde, Lazer, Assinaturas, Outros), "kind" ("income"|"expense"). Responda somente o JSON.',
        },
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
      category: parsed.category,
      source: 'whatsapp',
      date: new Date(parseInt(messageData.timestamp, 10) * 1000 || Date.now()).toISOString(),
      externalId: `wa:${messageData.id}`,
    });

    // Responde no WhatsApp confirmando o registro (opcional, requer token).
    if (inserted && process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
      await fetch(`https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: userPhone,
          type: 'text',
          text: { body: `✅ Anotado: ${parsed.description} — R$ ${(parsed.amount || 0).toFixed(2)} (${parsed.category}).` },
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

app.get('/api/transactions/:phone', async (req, res) => {
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
      .select('description, amount, category, source, date')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(500);
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Erro ao listar transações:', error);
    res.status(500).send({ error: error.message });
  }
});

app.get('/health', (_req, res) => res.send({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NoVerdinho backend na porta ${PORT}`));
