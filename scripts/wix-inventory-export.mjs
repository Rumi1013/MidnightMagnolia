/**
 * Wix Inventory Export
 * --------------------
 * Pulls every product, service, and Digital Grimoire CMS row from the live
 * Wix site and produces:
 *
 *   data/wix-inventory-snapshot.json   — raw + normalized data (full detail)
 *   data/inventory-products.csv        — Airtable Products import (existing schema)
 *   data/inventory-services.csv        — Recommended new "Services" tracker
 *   data/inventory-grimoire.csv        — Digital Grimoire CMS rows
 *   data/INVENTORY-GAP-REPORT.md       — what's rendering vs what's published
 *
 * Run from repo root:
 *   npm run wix:export
 *   (equivalent to: node --env-file=.env.local scripts/wix-inventory-export.mjs)
 */

import fs from 'node:fs';
import path from 'node:path';
import { createClient, OAuthStrategy, ApiKeyStrategy, media } from '@wix/sdk';
import { products } from '@wix/stores';
import { services } from '@wix/bookings';
import { items } from '@wix/data';

// ── Auth (mirrors lib/wix.js precedence) ────────────────────────
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
  mode = 'OAuth client ID (public reads only)';
} else {
  console.error('No Wix credentials found. Set WIX_API_KEY+WIX_SITE_ID or NEXT_PUBLIC_WIX_CLIENT_ID in .env.local');
  process.exit(1);
}

console.log(`Auth mode: ${mode}\n`);

const wix = createClient({
  modules: { products, services, items },
  auth,
});

// ── Helpers ─────────────────────────────────────────────────────
function stripHtml(html, maxChars = 600) {
  if (!html) return '';
  const text = String(html)
    .replace(/<br\s*\/?>(\s*)/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()}…`;
}

function csvCell(v) {
  if (v == null) return '';
  const s = String(v);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function toCSV(headers, rows) {
  const head = headers.join(',');
  const body = rows.map(r => headers.map(h => csvCell(r[h])).join(',')).join('\n');
  return `${head}\n${body}\n`;
}

function resolveServiceImage(raw) {
  if (!raw) return null;
  if (typeof raw === 'string' && raw.startsWith('wix:image://')) {
    try { return media.getImageUrl(raw)?.url || null; }
    catch { return null; }
  }
  if (typeof raw === 'object' && raw.url) return raw.url;
  return null;
}

function fmtMoney(value, currency = 'USD') {
  if (value == null) return '';
  const symbol = currency === 'USD' ? '$' : `${currency} `;
  return `${symbol}${value}`;
}

// ── Pull data ───────────────────────────────────────────────────
console.log('Fetching products…');
const productList = await wix.products.queryProducts().limit(100).find();
const productItems = productList.items || [];
console.log(`  ${productItems.length} products\n`);

console.log('Fetching services…');
const serviceList = await wix.services.queryServices().limit(100).find();
const serviceItems = serviceList.items || [];
console.log(`  ${serviceItems.length} services\n`);

console.log('Skipping Digital Grimoire CMS (not provisioned — /grimoire uses Wix Blog).');
const grimoireItems = [];

// ── Normalize products ──────────────────────────────────────────
const products_normalized = productItems.map(p => {
  const heroImg = p.media?.mainMedia?.image?.url || null;
  const galleryCount = p.media?.items?.length ?? 0;
  const description = stripHtml(p.description || p.descriptionPlainText, 800);
  const url = p.productPageUrl
    ? `${(p.productPageUrl.base || '').replace(/\/$/, '')}${p.productPageUrl.path || ''}`
    : null;

  return {
    id:           p._id,
    name:         p.name || '',
    sku:          p.sku || '',
    price:        p.price?.price ?? p.priceData?.price ?? 0,
    formatted:    p.price?.formatted?.price || p.priceData?.formatted?.price || '',
    currency:     p.price?.currency || p.priceData?.currency || 'USD',
    visible:      p.visible !== false,
    stockStatus:  p.stock?.inventoryStatus || (p.stock?.trackInventory === false ? 'untracked' : 'unknown'),
    inStock:      p.stock?.inStock ?? null,
    quantity:     p.stock?.quantity ?? null,
    productType:  p.productType || '',
    description,
    heroImageUrl: heroImg,
    galleryCount,
    productPageUrl: url,
  };
});

// ── Normalize services ──────────────────────────────────────────
const services_normalized = serviceItems.map(s => {
  const fixedPrice = s.payment?.fixed?.price?.value ?? null;
  const currency   = s.payment?.fixed?.price?.currency || 'USD';
  const sessionMins = s.schedule?.availabilityConstraints?.sessionDurations?.[0]
    ?? s.schedule?.availabilityConstraints?.durations?.[0]?.minutes
    ?? null;
  const heroImg = resolveServiceImage(s.media?.mainMedia?.image);
  const tagline = s.tagLine || s.info?.tagLine || '';
  const description = stripHtml(s.description || s.info?.description, 800);
  const url = s.urls?.bookingPage || s.urls?.servicePage || null;

  let priceLabel;
  if (fixedPrice != null) priceLabel = fmtMoney(fixedPrice, currency);
  else if (s.payment?.rateLabel) priceLabel = s.payment.rateLabel;
  else if (s.payment?.options) priceLabel = 'varies';
  else priceLabel = '';

  return {
    id:            s._id,
    name:          s.name || '',
    tagline,
    description,
    type:          s.type || '',
    category:      s.category?.name || '',
    fixedPrice,
    currency,
    priceLabel,
    durationMinutes: sessionMins,
    hidden:        s.hidden === true,
    heroImageUrl:  heroImg,
    bookingPageUrl: url,
  };
});

// ── Normalize grimoire ──────────────────────────────────────────
const grimoire_normalized = grimoireItems.map(it => {
  const d = it.data || it;
  return {
    id:    d._id || it._id,
    title: d.title || d.name || '(untitled)',
    slug:  d.slug || '',
    excerpt: stripHtml(d.excerpt || d.description || d.body, 400),
    fields: Object.keys(d || {}).filter(k => !k.startsWith('_')),
  };
});

// ── Write JSON snapshot ─────────────────────────────────────────
const dataDir = path.join(process.cwd(), 'data');
fs.mkdirSync(dataDir, { recursive: true });

const snapshot = {
  generatedAt: new Date().toISOString(),
  authMode: mode,
  counts: {
    products: products_normalized.length,
    services: services_normalized.length,
    grimoire: grimoire_normalized.length,
  },
  products: products_normalized,
  services: services_normalized,
  grimoire: grimoire_normalized,
  // Include raw shapes for first item of each so future fields are visible
  rawSamples: {
    product: productItems[0] || null,
    service: serviceItems[0] || null,
    grimoireRow: grimoireItems[0] || null,
  },
};
fs.writeFileSync(
  path.join(dataDir, 'wix-inventory-snapshot.json'),
  JSON.stringify(snapshot, null, 2),
);
console.log(`✓ data/wix-inventory-snapshot.json`);

// ── Write Products CSV (matches lib/airtable.js Products schema) ─
const productHeaders = [
  'Product Name', 'Product Code', 'Category', 'Price', 'Build Stage',
  'Platform', 'Content Done', 'Design Done', 'Live', 'Stan Store URL',
  'Priority', 'Upsells To', 'Est Monthly Revenue', 'Units Sold MTD',
  'Target Audience', 'Notes / Next Action',
];

function inferCategory(p) {
  const name = (p.name || '').toLowerCase();
  if (p.sku) return 'Physical Merch';
  if (name.includes('starter') || name.includes('free')) return 'Lead Magnet';
  if (name.includes('journal')) return 'Journal';
  if (name.includes('workbook')) return 'Workbook';
  if (name.includes('system') || name.includes('kit')) return 'Digital System';
  return 'Digital Product';
}
function inferPriority(p) {
  if ((p.price ?? 0) === 0) return 'High';
  if ((p.price ?? 0) >= 49) return 'Critical';
  if ((p.price ?? 0) >= 19) return 'High';
  return 'Medium';
}

const productRows = products_normalized.map(p => ({
  'Product Name':          p.name,
  'Product Code':          p.sku || '',
  'Category':              inferCategory(p),
  'Price':                 p.price ?? '',
  'Build Stage':           p.visible ? 'Live' : 'Draft',
  'Platform':              'Wix',
  'Content Done':          p.description ? 'true' : 'false',
  'Design Done':           p.heroImageUrl ? 'true' : 'false',
  'Live':                  p.visible ? 'true' : 'false',
  'Stan Store URL':        '',
  'Priority':              inferPriority(p),
  'Upsells To':            '',
  'Est Monthly Revenue':   '',
  'Units Sold MTD':        '',
  'Target Audience':       '',
  'Notes / Next Action':   p.heroImageUrl ? '' : 'Add hero image',
}));
fs.writeFileSync(path.join(dataDir, 'inventory-products.csv'), toCSV(productHeaders, productRows));
console.log(`✓ data/inventory-products.csv  (${productRows.length} rows)`);

// ── Write Services CSV (recommended new schema) ─────────────────
const serviceHeaders = [
  'Service Name', 'Tagline', 'Category', 'Price', 'Duration (min)',
  'Build Stage', 'Has Image', 'Has Description', 'Has Tagline', 'Live',
  'Booking URL', 'Priority', 'Notes / Next Action',
];

function inferServiceCategory(s) {
  const n = (s.name || '').toLowerCase();
  if ((s.fixedPrice ?? 0) === 0) return 'Discovery / Free';
  if (n.includes('package') || n.includes('intensive') || n.includes('bundle')) return 'Done-For-You';
  if (n.includes('setup')) return 'Done-For-You';
  if (n.includes('session') || n.includes('consultation')) return 'Coaching Session';
  return 'Service';
}
function inferServicePriority(s) {
  if ((s.fixedPrice ?? 0) >= 497) return 'Critical';
  if ((s.fixedPrice ?? 0) >= 197) return 'High';
  return 'Medium';
}
function serviceNotes(s) {
  const todos = [];
  if (!s.heroImageUrl) todos.push('Add hero image');
  if (!s.tagline) todos.push('Add tagline');
  if (!s.description) todos.push('Add description');
  return todos.join('; ');
}

const serviceRows = services_normalized.map(s => ({
  'Service Name':        s.name,
  'Tagline':             s.tagline,
  'Category':            inferServiceCategory(s),
  'Price':               s.priceLabel,
  'Duration (min)':      s.durationMinutes ?? '',
  'Build Stage':         s.hidden ? 'Hidden' : 'Live',
  'Has Image':           s.heroImageUrl ? 'true' : 'false',
  'Has Description':     s.description ? 'true' : 'false',
  'Has Tagline':         s.tagline ? 'true' : 'false',
  'Live':                s.hidden ? 'false' : 'true',
  'Booking URL':         s.bookingPageUrl || '',
  'Priority':            inferServicePriority(s),
  'Notes / Next Action': serviceNotes(s),
}));
fs.writeFileSync(path.join(dataDir, 'inventory-services.csv'), toCSV(serviceHeaders, serviceRows));
console.log(`✓ data/inventory-services.csv  (${serviceRows.length} rows)`);

// ── Write Grimoire CSV ──────────────────────────────────────────
const grimoireHeaders = ['Title', 'Slug', 'Excerpt', 'Fields Present'];
const grimoireRows = grimoire_normalized.map(g => ({
  'Title':          g.title,
  'Slug':           g.slug,
  'Excerpt':        g.excerpt,
  'Fields Present': (g.fields || []).join(' | '),
}));
fs.writeFileSync(path.join(dataDir, 'inventory-grimoire.csv'), toCSV(grimoireHeaders, grimoireRows));
console.log(`✓ data/inventory-grimoire.csv  (${grimoireRows.length} rows)`);

// ── Cross-check rendering against live dev server ───────────────
async function fetchHtml(p) {
  try {
    const r = await fetch(`http://localhost:3000${p}`, { redirect: 'manual' });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

console.log('\nCross-checking what renders on /shop, /services, /grimoire…');

const [shopHtml, servicesHtml, grimoireHtml] = await Promise.all([
  fetchHtml('/shop'),
  fetchHtml('/services'),
  fetchHtml('/grimoire'),
]);

function countMatches(html, names) {
  if (!html) return { rendered: null, missing: names.map(n => n) };
  const missing = [];
  for (const n of names) {
    if (!html.includes(n)) missing.push(n);
  }
  return { rendered: names.length - missing.length, missing };
}

const shopGap     = countMatches(shopHtml,     products_normalized.map(p => p.name));
const servicesGap = countMatches(servicesHtml, services_normalized.map(s => s.name));
const grimoireGap = countMatches(grimoireHtml, grimoire_normalized.map(g => g.title));

// ── Write GAP report ────────────────────────────────────────────
const noImg = products_normalized.filter(p => !p.heroImageUrl);
const noDesc = products_normalized.filter(p => !p.description);
const svcNoImg = services_normalized.filter(s => !s.heroImageUrl);
const svcNoTag = services_normalized.filter(s => !s.tagline);
const svcNoDesc = services_normalized.filter(s => !s.description);

const report = `# Inventory Gap Report

_Generated: ${snapshot.generatedAt}_
_Auth: ${mode}_

## Counts

| Source | Count |
|---|---|
| Products (Wix Stores) | ${products_normalized.length} |
| Services (Wix Bookings) | ${services_normalized.length} |
| Digital Grimoire (CMS) | ${grimoire_normalized.length} |

## Rendering check

| Page | Items in API | Rendered on page | Missing |
|---|---|---|---|
| /shop | ${products_normalized.length} | ${shopGap.rendered ?? 'n/a (page not reached)'} | ${shopGap.missing.length === 0 ? '—' : shopGap.missing.join(', ')} |
| /services | ${services_normalized.length} | ${servicesGap.rendered ?? 'n/a'} | ${servicesGap.missing.length === 0 ? '—' : servicesGap.missing.join(', ')} |
| /grimoire | ${grimoire_normalized.length} | ${grimoireGap.rendered ?? 'n/a'} | ${grimoireGap.missing.length === 0 ? '— (note: gated behind email entry)' : grimoireGap.missing.join(', ')} |

## Asset gaps

### Products missing hero image (${noImg.length})
${noImg.length === 0 ? '_None — all products have images_' : noImg.map(p => `- ${p.name}`).join('\n')}

### Products missing description (${noDesc.length})
${noDesc.length === 0 ? '_None — all products have descriptions_' : noDesc.map(p => `- ${p.name}`).join('\n')}

### Services missing hero image (${svcNoImg.length})
${svcNoImg.length === 0 ? '_None_' : svcNoImg.map(s => `- ${s.name}`).join('\n')}

### Services missing tagline (${svcNoTag.length})
${svcNoTag.length === 0 ? '_None_' : svcNoTag.map(s => `- ${s.name}`).join('\n')}

### Services missing description (${svcNoDesc.length})
${svcNoDesc.length === 0 ? '_None_' : svcNoDesc.map(s => `- ${s.name}`).join('\n')}

## How to import these CSVs

### Airtable Products (existing table)
1. Open the Midnight Operations base
2. Open the **Products** table (\`tblA2WPOZgzeGlEji\`)
3. Click **+ → Import data → CSV file**
4. Choose \`data/inventory-products.csv\`
5. Map columns (they should auto-match the existing schema)

### Airtable Services (new table — create it first)
1. In the Midnight Operations base, click **+ Add table → Import a CSV**
2. Choose \`data/inventory-services.csv\`
3. Name the table **Services**
4. Add to \`lib/airtable.js\` once column types are confirmed

### Notion Product Build Tracker
1. Open the existing Product Build Tracker DB
2. Use **Import → CSV** with \`data/inventory-products.csv\`
3. Map columns as needed (Notion uses Product / Price / Status / Priority)

## Next steps

1. Fill in **stock counts** for the 4 physical products (currently shown as IN_STOCK with no quantity)
2. Decide pricing model for **Free 15-Minute Publishing Consultation** (currently has no fixed price)
3. Resolve missing **taglines + descriptions** flagged above (most likely affects \`/services\` page polish)
4. Make a decision on the 5 **Digital Grimoire** entries: gated freebies, paid, or Magnolia Circle exclusive?
5. Either schedule events on Wix or remove the Events plumbing if not in roadmap (\`pages/api/wix/events.js\` returns empty)
`;

fs.writeFileSync(path.join(dataDir, 'INVENTORY-GAP-REPORT.md'), report);
console.log(`✓ data/INVENTORY-GAP-REPORT.md\n`);

console.log('Done.');
