import { createClient } from '@supabase/supabase-js';
import { getSupabasePublicConfig } from './supabase/shared';

/**
 * Supabase client for API routes. Uses SUPABASE_SERVICE_ROLE_KEY when set so
 * RLS policies scoped to `authenticated` do not block dashboard reads/writes
 * from serverless routes (dashboard has no user session).
 */
export function createRouteHandlerClient() {
  const { supabaseUrl, supabaseKey } = getSupabasePublicConfig();
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  }
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const useService =
    serviceKey &&
    serviceKey.length > 20 &&
    !serviceKey.includes('your_service_role_key_here');
  const key = useService ? serviceKey : supabaseKey;
  return createClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
