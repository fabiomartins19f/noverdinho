-- Schema do NoVerdinho (Supabase / PostgreSQL)
-- Rode no SQL Editor do seu projeto Supabase.

create extension if not exists "pgcrypto";

create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    phone_number varchar(20) unique,
    name varchar(100),
    created_at timestamptz default now()
);

create table if not exists user_bank_accounts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    item_id varchar(100) unique not null,            -- Pluggy Item ID
    pluggy_account_id varchar(100),                  -- conta dentro do item
    institution_name varchar(100),
    created_at timestamptz default now()
);

create table if not exists transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    description varchar(255) not null,
    amount decimal(12, 2) not null check (amount >= 0),
    category varchar(50) default 'Geral',
    source varchar(20) not null default 'manual'
        check (source in ('whatsapp', 'open_finance', 'manual')),
    date timestamptz default now(),
    external_id varchar(120) unique,                 -- dedupe idempotente de webhooks
    created_at timestamptz default now()
);

create index if not exists idx_transactions_user_date on transactions (user_id, date desc);
create index if not exists idx_transactions_external on transactions (external_id);

-- Realtime para o app/backend escutarem novidades
alter publication supabase_realtime add table transactions;

-- ============================================================
-- SEGURANÇA: Row Level Security
-- O app iOS NÃO usa a anon key diretamente — ele lê via backend
-- (GET /api/transactions/:phone) com a service role.
-- Mantemos RLS ligado e SEM políticas públicas por padrão: com a chave
-- anon exposta não seria possível ler dados de ninguém.
-- ============================================================

alter table users enable row level security;
alter table user_bank_accounts enable row level security;
alter table transactions enable row level security;
