import { createClient } from '@supabase/supabase-js';

function normalizeSupabaseUrl(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let u = raw.trim().replace(/\/$/, '');
  u = u.replace(/\/rest\/v1\/?$/i, '');
  return u;
}

/**
 * Lazy browser/anon Supabase client — does not throw at import time when env is missing
 * (review feedback: import-time throw crashed routes that imported this module).
 */
let _client = null;

export function getSupabase() {
  if (_client) return _client;
  const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local'
    );
  }
  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

/** Lazy proxy for older `import { supabase }` call sites. */
export const supabase = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getSupabase();
      const value = client[prop];
      return typeof value === 'function' ? value.bind(client) : value;
    },
  }
);
