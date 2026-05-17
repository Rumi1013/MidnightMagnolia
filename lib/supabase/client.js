import { createBrowserClient } from '@supabase/ssr';
import { getSupabasePublicConfig } from './shared';

export function getSupabaseBrowserConfig() {
  const { supabaseUrl, supabaseKey } = getSupabasePublicConfig();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.'
    );
  }

  return { supabaseUrl, supabaseKey };
}

export function createClient() {
  const { supabaseUrl, supabaseKey } = getSupabaseBrowserConfig();
  return createBrowserClient(supabaseUrl, supabaseKey);
}
