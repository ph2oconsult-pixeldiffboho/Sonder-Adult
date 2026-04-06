-- ─────────────────────────────────────────────
-- SONDER ADULT — MIGRATION: Push Notifications
-- Run in Supabase SQL Editor
-- ADDITIVE ONLY — safe to run multiple times
-- ─────────────────────────────────────────────

-- Push subscriptions (one per user-device)
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now(),
  UNIQUE(user_id, endpoint)
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insert own sub" ON push_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Read own sub" ON push_subscriptions FOR SELECT USING (true);
CREATE POLICY "Delete own sub" ON push_subscriptions FOR DELETE USING (true);

-- Notification touches (max 3 per user, ever)
CREATE TABLE IF NOT EXISTS notification_touches (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  touch_number integer not null check (touch_number between 1 and 3),
  message text not null,
  sent_at timestamptz default now(),
  UNIQUE(user_id, touch_number)
);

ALTER TABLE notification_touches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insert touch" ON notification_touches FOR INSERT WITH CHECK (true);
CREATE POLICY "Read touches" ON notification_touches FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_push_subs_user ON push_subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_touches_user ON notification_touches (user_id);
