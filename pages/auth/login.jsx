import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  createWixBrowserClient,
  getWixAuthRedirectUri,
  storeWixOAuthData,
} from '../../lib/wixBrowser';

/**
 * Starts Wix-managed member login (OAuth + PKCE).
 * Visit /auth/login or /api/auth/login (rewritten).
 * Docs: https://dev.wix.com/docs/go-headless/authentication/members/wix-login-page/add-a-wix-login-page-js-sdk
 */
export default function WixAuthLoginPage() {
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function startLogin() {
      try {
        const client = createWixBrowserClient();
        const redirectUri = getWixAuthRedirectUri(window.location.origin);
        const originalUri = `${window.location.origin}/membership`;

        const loginRequestData = client.auth.generateOAuthData(
          redirectUri,
          originalUri,
        );
        storeWixOAuthData(loginRequestData);

        const { authUrl } = await client.auth.getAuthUrl(loginRequestData);
        if (!cancelled) {
          window.location.href = authUrl;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Unable to start Wix login');
        }
      }
    }

    startLogin();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Signing in · Midnight Magnolia</title>
      </Head>
      <main style={{ padding: '3rem 1.5rem', maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
          Signing you in…
        </h1>
        {error ? (
          <p role="alert" style={{ color: '#8b1e3f' }}>
            {error}
          </p>
        ) : (
          <p>Redirecting to the Wix login page.</p>
        )}
      </main>
    </>
  );
}
