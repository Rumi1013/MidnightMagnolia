export function normalizeSupabaseUrl(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let u = raw.trim().replace(/\/$/, '');
  u = u.replace(/\/rest\/v1\/?$/i, '');
  return u;
}

export function getSupabasePublicConfig() {
  const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return { supabaseUrl, supabaseKey };
}
