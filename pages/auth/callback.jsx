import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  clearWixOAuthData,
  createWixBrowserClient,
  readWixOAuthData,
  storeWixMemberTokens,
} from '../../lib/wixBrowser';

/**
 * Wix OAuth callback page.
 * Wix returns `code` / `state` in the URL hash (#), so this must be a browser page
 * (not a JSON API handler). `/api/auth/callback` rewrites here.
 * Docs: https://dev.wix.com/docs/go-headless/authentication/members/wix-login-page/add-a-wix-login-page-js-sdk
 */
export default function WixAuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Completing sign-in…');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function completeLogin() {
      try {
        const oAuthData = readWixOAuthData();
        if (!oAuthData) {
          throw new Error(
            'Missing login session data. Start again from /auth/login.',
          );
        }

        const client = createWixBrowserClient();
        const returnedOAuthData = client.auth.parseFromUrl();

        if (returnedOAuthData.error) {
          throw new Error(
            returnedOAuthData.errorDescription ||
              returnedOAuthData.error ||
              'Login failed',
          );
        }

        const tokens = await client.auth.getMemberTokens(
          returnedOAuthData.code,
          returnedOAuthData.state,
          oAuthData,
        );

        client.auth.setTokens(tokens);
        storeWixMemberTokens(tokens);
        clearWixOAuthData();

        // Clear sensitive hash from the address bar
        if (window.history.replaceState) {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }

        if (!cancelled) {
          setStatus('Signed in. Redirecting…');
          const nextRaw =
            oAuthData.originalUri ||
            oAuthData.originalURI ||
            '/membership';
          let next = '/membership';
          try {
            if (nextRaw.startsWith('http')) {
              const url = new URL(nextRaw);
              next = `${url.pathname}${url.search}${url.hash}` || '/membership';
            } else {
              next = nextRaw;
            }
          } catch {
            next = '/membership';
          }
          router.replace(next);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Unable to complete Wix login');
          setStatus('Sign-in failed');
        }
      }
    }

    completeLogin();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Auth callback · Midnight Magnolia</title>
      </Head>
      <main style={{ padding: '3rem 1.5rem', maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{status}</h1>
        {error ? (
          <p role="alert" style={{ color: '#8b1e3f' }}>
            {error}
          </p>
        ) : null}
      </main>
    </>
  );
}
