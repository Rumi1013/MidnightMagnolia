# Supabase RLS and `/api/tasks` + `/api/affiliates`

## Policy

`dashboard_tasks` and `affiliate_partners` use RLS: **`auth.role() = 'authenticated'`** only (`lib/supabase-schema.sql`).

## Server routes

`lib/supabaseServer.js` **`createRouteHandlerClient()`** prefers **`SUPABASE_SERVICE_ROLE_KEY`** when set (non-placeholder). That key bypasses RLS so the dashboard API can read/update tasks and affiliates **without a browser session**.

## If production calls fail with anon key only

1. Set `SUPABASE_SERVICE_ROLE_KEY` in Vercel (server-only) — never expose to the browser.  
2. Or add separate RLS policies for `anon` **only if** you intentionally want public access (not recommended for task toggles).

## Verification

With service role in `.env.local`, load `/dashboard` and toggle a low-risk task. If PATCH succeeds, the chain is healthy.
