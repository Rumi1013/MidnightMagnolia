import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';
import { products, collections } from '@wix/stores';
import { services } from '@wix/bookings';
import { wixEventsV2 } from '@wix/events';
import { items } from '@wix/data';

// Auth precedence:
//   1. WIX_API_KEY + WIX_SITE_ID  → server-side, elevated scopes (admin reads)
//   2. WIX_CLIENT_ID + tokens     → OAuth with stored visitor/member tokens
//   3. WIX_CLIENT_ID alone        → public/anonymous read-only (catalog, CMS)
function getWixAuth() {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (
    apiKey &&
    siteId &&
    apiKey !== 'your_wix_api_key_here' &&
    siteId !== 'your_wix_site_id_here'
  ) {
    return ApiKeyStrategy({ apiKey, siteId });
  }

  const clientId = process.env.WIX_CLIENT_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId || clientId === 'your_wix_client_id_here') {
    return null;
  }

  const accessToken =
    process.env.WIX_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_WIX_TOKEN ||
    process.env.WIX_TOKEN;
  const refreshToken = process.env.WIX_REFRESH_TOKEN;

  if (accessToken && refreshToken) {
    return OAuthStrategy({
      clientId,
      tokens: {
        accessToken: { value: accessToken, expiresAt: 0 },
        refreshToken: { value: refreshToken },
      },
    });
  }

  return OAuthStrategy({ clientId });
}

/** Headless Wix client (blog, stores, bookings, events, CMS). */
function getWixClient() {
  const auth = getWixAuth();
  if (!auth) {
    return null;
  }
  return createClient({
    modules: {
      posts,
      products,
      collections,
      services,
      wixEventsV2,
      items,
    },
    auth,
  });
}

// ── Blog: fetch all Grimoire posts ───────────────────────────
export async function getGrimoirePosts(limit = 12) {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.posts.queryPosts()
      .limit(limit)
      .descending('publishedDate')
      .find();
    return res.items || [];
  } catch (err) {
    console.error('Wix Blog fetch error:', err);
    return [];
  }
}

// ── Blog: fetch single post by slug ──────────────────────────
export async function getPostBySlug(slug) {
  try {
    const client = getWixClient();
    if (!client) return null;
    const res = await client.posts.queryPosts()
      .eq('slug', slug)
      .limit(1)
      .find();
    return res.items[0] || null;
  } catch (err) {
    console.error('Wix Blog single post error:', err);
    return null;
  }
}

// ── Shop: fetch all products ─────────────────────────────────
export async function getShopProducts() {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.products.queryProducts()
      .limit(20)
      .find();
    return res.items || [];
  } catch (err) {
    console.error('Wix Store fetch error:', err);
    return [];
  }
}

// ── Bookings: list bookable services ──────────────────────────
export async function getBookingServices(limit = 50) {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.services.queryServices().limit(limit).find();
    return res.items || [];
  } catch (err) {
    console.error('Wix Bookings services error:', err);
    return [];
  }
}

// ── Events: list published events (Wix Events v2) ─────────────
export async function getWixEvents(limit = 10) {
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.wixEventsV2.queryEvents().limit(limit).find();
    return res.items || [];
  } catch (err) {
    console.error('Wix Events query error:', err);
    return [];
  }
}

// ── CMS: query a Wix Data collection by ID or name ────────────
export async function getDataCollectionItems(collectionId, limit = 50) {
  const id = collectionId || process.env.WIX_DATA_COLLECTION_DIGITAL_GRIMOIRE || 'DigitalGrimoire';
  try {
    const client = getWixClient();
    if (!client) return [];
    const res = await client.items.query(id).limit(limit).find();
    return res.items || [];
  } catch (err) {
    console.error('Wix Data items error:', err);
    return [];
  }
}

/** Convenience alias for the Digital Grimoire collection. */
export async function getDigitalGrimoireItems(limit = 50) {
  return getDataCollectionItems(
    process.env.WIX_DATA_COLLECTION_DIGITAL_GRIMOIRE || 'DigitalGrimoire',
    limit,
  );
}

// ── Format Wix post date ─────────────────────────────────────
export function formatPostDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
