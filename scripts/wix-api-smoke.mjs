/**
 * Smoke-test Wix modules (matches Wix dashboard "Get code" snippets).
 * Run from repo root: npm run wix:smoke
 *   (equivalent to: node --env-file=.env.local scripts/wix-api-smoke.mjs)
 *
 * Auth precedence mirrors lib/wix.js:
 *   1. WIX_API_KEY + WIX_SITE_ID  → ApiKeyStrategy (authenticated server reads)
 *   2. WIX_CLIENT_ID / NEXT_PUBLIC_WIX_CLIENT_ID → OAuthStrategy (public reads)
 */
import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { posts } from '@wix/blog';
import { products, collections } from '@wix/stores';
import { services } from '@wix/bookings';
import { wixEventsV2 } from '@wix/events';
import { items } from '@wix/data';

const apiKey = process.env.WIX_API_KEY;
const siteId = process.env.WIX_SITE_ID;
const clientId = process.env.WIX_CLIENT_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID;

let auth;
let mode;
if (apiKey && siteId && apiKey !== 'your_wix_api_key_here' && siteId !== 'your_wix_site_id_here') {
  auth = ApiKeyStrategy({ apiKey, siteId });
  mode = 'API key (authenticated)';
} else if (clientId && clientId !== 'your_wix_client_id_here') {
  auth = OAuthStrategy({ clientId });
  mode = 'OAuth client ID (public)';
} else {
  console.error('No Wix credentials found. Set WIX_API_KEY+WIX_SITE_ID or NEXT_PUBLIC_WIX_CLIENT_ID in .env.local');
  process.exit(1);
}

console.log(`Auth mode: ${mode}\n`);

const myWixClient = createClient({
  modules: { posts, products, collections, services, wixEventsV2, items },
  auth,
});

const collection =
  process.env.WIX_DATA_COLLECTION_DIGITAL_GRIMOIRE || 'DigitalGrimoire';

try {
  const serviceList = await myWixClient.services.queryServices().find();
  console.log('My Services:');
  console.log('Total:', serviceList.items?.length ?? 0);
  console.log((serviceList.items || []).map((item) => item.name).join('\n'));
} catch (e) {
  console.error('Bookings:', e.message || e);
}

try {
  const productList = await myWixClient.products.queryProducts().find();
  console.log('\nMy Products:');
  console.log('Total:', productList.items?.length ?? 0);
  console.log((productList.items || []).map((item) => item.name).join('\n'));
} catch (e) {
  console.error('Stores:', e.message || e);
}

try {
  const eventsList = await myWixClient.wixEventsV2.queryEvents().limit(10).find();
  console.log('\nMy Events:');
  console.log('Total:', eventsList.items?.length ?? 0);
  console.log((eventsList.items || []).map((item) => item.title).join('\n'));
} catch (e) {
  console.error('Events:', e.message || e);
}

try {
  const dataItemsList = await myWixClient.items.query(collection).find();
  console.log('\nMy Data Items:', collection);
  console.log('Total:', dataItemsList.items?.length ?? 0);
  console.log(
    (dataItemsList.items || [])
      .map((item) => item._id || item.data?._id)
      .filter(Boolean)
      .join('\n'),
  );
} catch (e) {
  console.error('Data:', e.message || e);
}
