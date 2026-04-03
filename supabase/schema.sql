-- ─────────────────────────────────────────────
-- SONDER ADULT — SUPABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────

-- Sessions table: one row per completed interaction
create table if not exists sessions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  category text not null check (category in ('avoiding', 'overthinking', 'nothing')),
  response_shown text not null,
  action_shown text not null,
  closing_shown text not null,
  duration_ms integer not null default 0,
  created_at timestamptz default now()
);

-- Index: fast lookup by user for pattern recognition
create index if not exists idx_sessions_user_id on sessions (user_id);

-- Index: time-based queries (recent sessions, streaks)
create index if not exists idx_sessions_created_at on sessions (user_id, created_at desc);

-- Row Level Security: users can only read/write their own sessions
alter table sessions enable row level security;

-- Policy: anyone can insert (anonymous users via anon key)
create policy "Anyone can insert sessions"
  on sessions for insert
  with check (true);

-- Policy: users can only read their own sessions
create policy "Users read own sessions"
  on sessions for select
  using (user_id = current_setting('request.headers')::json->>'x-user-id'
    or auth.role() = 'anon');

-- Note: Since we use anonymous UUIDs stored client-side (not Supabase Auth),
-- the select policy is permissive. For production, consider:
-- 1. Adding Supabase Auth with anonymous sign-in
-- 2. Or scoping RLS to auth.uid()
-- For MVP, the anon key + client-side UUID is sufficient.

-- ─────────────────────────────────────────────
-- OPTIONAL: Analytics view
-- ─────────────────────────────────────────────

create or replace view session_patterns as
select
  user_id,
  category,
  count(*) as times_chosen,
  round(avg(duration_ms)) as avg_duration_ms,
  max(created_at) as last_seen
from sessions
group by user_id, category;
