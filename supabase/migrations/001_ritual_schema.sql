-- Flow QR Ritual — Supabase schema
-- Migration 001: initial schema
-- Run this in Supabase SQL editor or via supabase db push

-- ── profiles ──────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id                   uuid primary key default gen_random_uuid(),
  email                text unique not null,
  shopify_order_id     text,
  sequence_position    integer not null default 0,
  last_scan_at         timestamptz,
  bound_device_token   text,
  gap_nudge_sent_at    timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists profiles_email_idx on profiles(email);
create index if not exists profiles_bound_device_token_idx on profiles(bound_device_token);
-- Used by gap nudge cron: find profiles overdue for a nudge
create index if not exists profiles_gap_nudge_idx on profiles(last_scan_at, gap_nudge_sent_at)
  where sequence_position > 0;

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- ── scan_events ───────────────────────────────────────────────────────────────
create table if not exists scan_events (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references profiles(id) on delete cascade,
  scanned_at   timestamptz not null default now(),
  outcome      text not null check (outcome in (
    'valid', 'gap_return', 'cooldown_rejected', 'device_conflict', 'milestone'
  )),
  device_token text,
  ip_hash      text,
  metadata     jsonb default '{}'::jsonb
);

create index if not exists scan_events_profile_id_idx on scan_events(profile_id);
create index if not exists scan_events_scanned_at_idx on scan_events(scanned_at desc);

-- ── otp_requests ──────────────────────────────────────────────────────────────
create table if not exists otp_requests (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  code_hash     text not null,
  expires_at    timestamptz not null,
  used          boolean not null default false,
  attempt_count integer not null default 0,
  locked_until  timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists otp_requests_email_idx on otp_requests(email, created_at desc);

-- ── device_tokens ─────────────────────────────────────────────────────────────
create table if not exists device_tokens (
  token         text primary key,
  profile_id    uuid not null references profiles(id) on delete cascade,
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

create index if not exists device_tokens_profile_id_idx on device_tokens(profile_id);

-- ── shopify_customers (for never-scanned tracking) ───────────────────────────
create table if not exists shopify_customers (
  id              uuid primary key default gen_random_uuid(),
  email           text unique not null,
  shopify_order_id text not null,
  order_date      timestamptz not null,
  sku             text not null,
  synced_at       timestamptz not null default now()
);

create index if not exists shopify_customers_email_idx on shopify_customers(email);
create index if not exists shopify_customers_order_date_idx on shopify_customers(order_date);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- All reads/writes go through the service role key (server-side only).
-- RLS is enabled but no public policies are granted — the anon key has no access.

alter table profiles enable row level security;
alter table scan_events enable row level security;
alter table otp_requests enable row level security;
alter table device_tokens enable row level security;
alter table shopify_customers enable row level security;

-- Service role bypasses RLS by default in Supabase — no policies needed.
-- If you ever need a client-side read, add explicit policies here.
