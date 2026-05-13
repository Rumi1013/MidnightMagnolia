#!/usr/bin/env node
// Verify Supabase URL + anon key can reach expected tables + RPC.
// Loads .env.local from repo root (no `node --env-file`, avoids zsh/nvm `cd` hooks).
//
// Usage (from repo root):
//   node scripts/supabase-db-verify.mjs
//   npm run supabase:verify

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log(JSON.stringify({ ok: false, reason: 'missing .env.local at repo root' }, null, 2));
    process.exit(1);
  }
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (k) process.env[k] = v;
  }
}

loadEnvLocal();

function normalizeSupabaseUrl(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let u = raw.trim().replace(/\/$/, '');
  u = u.replace(/\/rest\/v1\/?$/i, '');
  return u;
}

const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log(
    JSON.stringify(
      { ok: false, reason: 'missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY' },
      null,
      2,
    ),
  );
  process.exit(1);
}

/** PostgREST / GoTrue errors sometimes omit `message`; keep status + fields for debugging. */
function describeError(err) {
  if (!err) return null;
  return {
    message: err.message || null,
    code: err.code ?? null,
    details: err.details ?? null,
    hint: err.hint ?? null,
    status: err.status ?? null,
    name: err.name ?? null,
  };
}

const sb = createClient(url, key);
const out = {
  projectHost: new URL(url).hostname,
  anonKey: {
    length: key.length,
    looksLikeJwt: key.startsWith('eyJ'),
  },
  tables: {},
};

for (const t of ['dashboard_tasks', 'affiliate_partners', 'genealogy_people', 'genealogy_relationships']) {
  const { error, count } = await sb.from(t).select('*', { count: 'exact', head: true });
  out.tables[t] = error
    ? { ok: false, error: describeError(error) }
    : { ok: true, rowCount: count };
}

const probeId = '00000000-0000-0000-0000-000000000001';
const { data: rpcData, error: rpcErr } = await sb.rpc('get_family_subgraph', {
  root_id: probeId,
  max_hops: 1,
});
out.rpc_get_family_subgraph = rpcErr
  ? { ok: false, error: describeError(rpcErr) }
  : { ok: true, rowCount: Array.isArray(rpcData) ? rpcData.length : null };

if (
  !Object.values(out.tables).every((x) => x.ok) ||
  !out.rpc_get_family_subgraph.ok
) {
  out.hint =
    'If you see status 401 or "Invalid API key": open Supabase → Project Settings → API for THIS project, copy the anon public key again into NEXT_PUBLIC_SUPABASE_ANON_KEY (same project as the URL). Remove stray quotes/spaces; do not use the service_role key in the anon slot.';
}

console.log(JSON.stringify(out, null, 2));
