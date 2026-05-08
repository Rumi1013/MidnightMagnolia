/**
 * Midnight Magnolia — Notion dashboards
 *
 * Required env (.env.local):
 *   NOTION_TOKEN                        — Integration secret from notion.so/my-integrations
 *   NOTION_DB_CONTENT_CALENDAR         — Database ID from URL …/DATABASE_ID?v=…
 *   NOTION_DB_PRODUCT_TRACKER          — Same (Product Tracker)
 *   NOTION_DB_DUSK_LETTERS             — Same (Dusk Letters)
 *
 * After creating each database: Share → Invite your integration → copy ID from URL.
 *
 * ── Database: Content Calendar ─────────────────────────────────
 * Properties (create these exact names/types for the mapper below):
 *   Name           — Title
 *   Type           — Select
 *   Status         — Select   (Draft, Ready, Scheduled, Published)
 *   Publish Date   — Date
 *   Tags           — Multi-select
 *
 * ── Database: Product Tracker ──────────────────────────────────
 *   Name           — Title
 *   SKU            — Rich text
 *   Phase          — Select   (optional: Phase 1, Phase 2, …)
 *   Wholesale      — Number
 *   Inventory      — Number
 *   Status         — Select
 *
 * ── Database: Dusk Letters ───────────────────────────────────────
 *   Title          — Title
 *   Theme          — Rich text
 *   Send Date      — Date
 *   Status         — Select    (Draft, Scheduled, Sent)
 */

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

const PROP = {
  calendar: {
    NAME: 'Name',
    TYPE: 'Type',
    STATUS: 'Status',
    PUBLISH_DATE: 'Publish Date',
    TAGS: 'Tags',
  },
  productTracker: {
    NAME: 'Name',
    SKU: 'SKU',
    PHASE: 'Phase',
    WHOLESALE: 'Wholesale',
    INVENTORY: 'Inventory',
    STATUS: 'Status',
  },
  duskLetters: {
    TITLE: 'Title',
    THEME: 'Theme',
    SEND_DATE: 'Send Date',
    STATUS: 'Status',
  },
};

function notionHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Notion-Version': NOTION_VERSION,
  };
}

function titlePlain(properties, key) {
  const p = properties[key];
  if (!p?.title?.length) return '';
  return p.title.map((t) => t.plain_text).join('');
}

function richTextPlain(properties, key) {
  const p = properties[key];
  if (!p?.rich_text?.length) return '';
  return p.rich_text.map((t) => t.plain_text).join('');
}

function selectName(properties, key) {
  return properties[key]?.select?.name ?? '';
}

function dateStart(properties, key) {
  return properties[key]?.date?.start ?? null;
}

function multiSelectNames(properties, key) {
  const p = properties[key];
  return (p?.multi_select ?? []).map((o) => o.name);
}

function numberProp(properties, key) {
  const n = properties[key]?.number;
  return typeof n === 'number' ? n : null;
}

/** 32-char or dashed Notion IDs → hyphenated UUID for the REST API */
function normalizeNotionId(raw) {
  const s = String(raw).trim().replace(/-/g, '');
  if (s.length !== 32 || !/^[a-f0-9]+$/i.test(s)) return String(raw).trim();
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20, 32)}`;
}

/** @returns {{ ok: true, ids: Record<string,string> } | { ok: false }} */
export function getNotionConfig() {
  const token = process.env.NOTION_TOKEN;
  const calendars = process.env.NOTION_DB_CONTENT_CALENDAR;
  const products = process.env.NOTION_DB_PRODUCT_TRACKER;
  const dusk = process.env.NOTION_DB_DUSK_LETTERS;
  const ok =
    !!(token?.trim?.() && calendars?.trim?.() && products?.trim?.() && dusk?.trim?.());

  return ok
    ? {
        ok: true,
        token: token.trim(),
        ids: {
          calendar: normalizeNotionId(calendars),
          productTracker: normalizeNotionId(products),
          duskLetters: normalizeNotionId(dusk),
        },
      }
    : { ok: false };
}

async function notionQuery(databaseId, token) {
  const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: notionHeaders(token),
    body: JSON.stringify({}),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.message ?? body?.code ?? `Notion HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body;
}

/** @returns {Promise<{ calendar: object[], duskLetters: object[], products: object[] }>} */
export async function fetchDashboardNotion(cfg) {
  const { token, ids } = cfg;

  const [calBody, prodBody, duskBody] = await Promise.all([
    notionQuery(ids.calendar, token),
    notionQuery(ids.productTracker, token),
    notionQuery(ids.duskLetters, token),
  ]);

  const cal = PROP.calendar;
  const calendarRows = (calBody.results ?? [])
    .filter((r) => r.object === 'page')
    .map((page) => {
      const p = page.properties ?? {};
      return {
        id: page.id.replace(/-/g, ''),
        url:
          page.public_url ??
          (page.url && page.url.startsWith('http') ? page.url : `https://www.notion.so/${String(page.id).replace(/-/g, '')}`),
        name: titlePlain(p, cal.NAME),
        type: selectName(p, cal.TYPE),
        status: selectName(p, cal.STATUS),
        publishDate: dateStart(p, cal.PUBLISH_DATE),
        tags: multiSelectNames(p, cal.TAGS),
      };
    });

  const PT = PROP.productTracker;
  const productRows = (prodBody.results ?? [])
    .filter((r) => r.object === 'page')
    .map((page) => {
      const p = page.properties ?? {};
      return {
        id: page.id.replace(/-/g, ''),
        url:
          page.public_url ??
          (page.url && page.url.startsWith('http') ? page.url : `https://www.notion.so/${String(page.id).replace(/-/g, '')}`),
        name: titlePlain(p, PT.NAME),
        sku: richTextPlain(p, PT.SKU),
        phase: selectName(p, PT.PHASE),
        wholesale: numberProp(p, PT.WHOLESALE),
        inventory: numberProp(p, PT.INVENTORY),
        status: selectName(p, PT.STATUS),
      };
    });

  const DL = PROP.duskLetters;
  const duskRows = (duskBody.results ?? [])
    .filter((r) => r.object === 'page')
    .map((page) => {
      const p = page.properties ?? {};
      return {
        id: page.id.replace(/-/g, ''),
        url:
          page.public_url ??
          (page.url && page.url.startsWith('http') ? page.url : `https://www.notion.so/${String(page.id).replace(/-/g, '')}`),
        title: titlePlain(p, DL.TITLE),
        theme: richTextPlain(p, DL.THEME),
        sendDate: dateStart(p, DL.SEND_DATE),
        status: selectName(p, DL.STATUS),
      };
    });

  return {
    calendar: calendarRows,
    duskLetters: duskRows,
    products: productRows,
  };
}
