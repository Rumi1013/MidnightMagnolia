import { createClient, OAuthStrategy } from '@wix/sdk';

export const WIX_OAUTH_STORAGE_KEY = 'wixOAuthData';
export const WIX_TOKENS_STORAGE_KEY = 'wixMemberTokens';

export function getWixClientId() {
  return (
    process.env.NEXT_PUBLIC_WIX_CLIENT_ID ||
    process.env.NEXT_PUBLIC_WIX_CLIENTID ||
    ''
  );
}

/** Exact redirect URI registered in Wix Headless Settings. */
export function getWixAuthRedirectUri(origin) {
  const configured = process.env.NEXT_PUBLIC_WIX_AUTH_REDIRECT_URI;
  if (configured) {
    return configured.replace(/\/$/, '');
  }
  const base = (origin || (typeof window !== 'undefined' ? window.location.origin : '')).replace(
    /\/$/,
    '',
  );
  return `${base}/api/auth/callback`;
}

/** Browser Wix client for visitor/member OAuth (login + token exchange). */
export function createWixBrowserClient(tokens) {
  const clientId = getWixClientId();
  if (!clientId || clientId === 'your_wix_client_id_here') {
    throw new Error('Missing NEXT_PUBLIC_WIX_CLIENT_ID');
  }

  return createClient({
    auth: tokens
      ? OAuthStrategy({ clientId, tokens })
      : OAuthStrategy({ clientId }),
  });
}

export function storeWixOAuthData(data) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(WIX_OAUTH_STORAGE_KEY, JSON.stringify(data));
}

export function readWixOAuthData() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(WIX_OAUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearWixOAuthData() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(WIX_OAUTH_STORAGE_KEY);
}

export function storeWixMemberTokens(tokens) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(WIX_TOKENS_STORAGE_KEY, JSON.stringify(tokens));
}

export function readWixMemberTokens() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(WIX_TOKENS_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearWixMemberTokens() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(WIX_TOKENS_STORAGE_KEY);
}
