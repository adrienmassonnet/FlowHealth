-- Flow — Subscription self-service auth
-- Migration 002: OTP-gated subscription management (pause/resume/cancel)
-- Mirrors otp_requests from 001_ritual_schema.sql but kept separate — this table
-- gates billing-sensitive actions, not the ritual/referral feature, and shouldn't
-- be coupled to the `profiles` table used there.

create table if not exists subscription_otp_requests (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  code_hash     text not null,
  expires_at    timestamptz not null,
  used          boolean not null default false,
  attempt_count integer not null default 0,
  locked_until  timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists subscription_otp_requests_email_idx
  on subscription_otp_requests(email, created_at desc);
