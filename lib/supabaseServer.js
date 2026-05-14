import { createClient } from '@supabase/supabase-js';

function normalizeSupabaseUrl(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let u = raw.trim().replace(/\/$/, '');
  u = u.replace(/\/rest\/v1\/?$/i, '');
  return u;
}

/**
 * Supabase client for API routes. Uses SUPABASE_SERVICE_ROLE_KEY when set so
 * RLS policies scoped to `authenticated` do not block dashboard reads/writes
 * from serverless routes (dashboard has no user session).
 */
export function createRouteHandlerClient() {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const useService =
    serviceKey &&
    serviceKey.length > 20 &&
    !serviceKey.includes('your_service_role_key_here');
  const key = useService ? serviceKey : anonKey;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
