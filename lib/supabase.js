import { createClient } from '@supabase/supabase-js';

function normalizeSupabaseUrl(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let u = raw.trim().replace(/\/$/, '');
  u = u.replace(/\/rest\/v1\/?$/i, '');
  return u;
}

const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
