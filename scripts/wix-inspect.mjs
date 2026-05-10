/**
 * One-off reconnaissance: print one item from each Wix module so we can
 * see the actual field shape before wiring pages.
 * Run: node --env-file=.env.local scripts/wix-inspect.mjs
 */
import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import { services } from '@wix/bookings';
import { items } from '@wix/data';

const apiKey = process.env.WIX_API_KEY;
const siteId = process.env.WIX_SITE_ID;
const clientId = process.env.WIX_CLIENT_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID;

let auth;
if (apiKey && siteId) {
  auth = ApiKeyStrategy({ apiKey, siteId });
} else {
  auth = OAuthStrategy({ clientId });
}

const client = createClient({ modules: { products, services, items }, auth });

const collection = process.env.WIX_DATA_COLLECTION_DIGITAL_GRIMOIRE || 'DigitalGrimoire';

console.log('━━━━━━━━━━━━━━ PRODUCT (first item) ━━━━━━━━━━━━━━');
try {
  const list = await client.products.queryProducts().limit(1).find();
  console.log(JSON.stringify(list.items?.[0], null, 2));
} catch (e) {
  console.error(e.message || e);
}

console.log('\n━━━━━━━━━━━━━━ SERVICE (first item) ━━━━━━━━━━━━━━');
try {
  const list = await client.services.queryServices().limit(1).find();
  console.log(JSON.stringify(list.items?.[0], null, 2));
} catch (e) {
  console.error(e.message || e);
}

console.log(`\n━━━━━━━━━━━━━━ CMS ITEM (first ${collection}) ━━━━━━━━━━━━━━`);
try {
  const list = await client.items.query(collection).limit(1).find();
  console.log(JSON.stringify(list.items?.[0], null, 2));
} catch (e) {
  console.error(e.message || e);
}
