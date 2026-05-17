import { createBrowserClient } from '@supabase/ssr';
import { normalizeSupabaseUrl } from './shared';

export function getSupabaseBrowserConfig() {
  const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
