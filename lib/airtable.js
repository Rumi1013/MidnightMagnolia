/**
 * Midnight Magnolia — Airtable “MM Command” base
 *
 * Required env:
 *   AIRTABLE_API_KEY   — airtable.com/create/tokens → scopes: data.records:read + data.records:write
 *   AIRTABLE_BASE_ID   — From API docs / base URL …/appXXXXXXXXXXXXXX/…
 *
 * Table routing: set a table ID (`tbl…`) or a table name. The REST API accepts either.
 * Prefer IDs (stable if you rename tables in Airtable).
 *
 * Supported env keys (first match wins):
 *   Content Pipeline   — AIRTABLE_CONTENT_PIPELINE  or  Airtable_Content_Pipeline
 *   Affiliate Partners — AIRTABLE_AFFILIATE_PARTNERS  or  Airtable_Affiliate_Partners  (optional; default name)
 *   Products           — AIRTABLE_PRODUCTS_TABLE  or  Airtable_Products  (optional; default name)
 *
 * Career / ops tables (IDs you can paste from Airtable URL after /tbl…):
 *   AIRTABLE_JOB_LEADS           or  Airtable_Job_Leads
 *   AIRTABLE_JOB_APPLICATIONS    or  Airtable_Job_Applications
 *   AIRTABLE_RESUME_VERSIONS     or  Airtable_Resume_Versions
 *   AIRTABLE_INCOME_STREAMS      or  Airtable_income_Streams
 *   AIRTABLE_DAILY_FOCUS         or  Airtable_Daily_Focus
 *
 * ── Affiliate Partners (dashboard) ───────────────────────────────
 *   Name, Tier, Score, Contact, Action, Commission (optional), Status
 *
 * ── Content Pipeline (dashboard) ─────────────────────────────────
 *   Title, Type, Platform, Affiliate, Publish Date, Status
 *
 * ── Products (dashboard) ─────────────────────────────────────────
 *   Name, SKU, Wholesale, Retail, Status, Notes (optional)
 */

const AIRTABLE_API = 'https://api.airtable.com/v0';

/** First non-empty env among keys (exact key names — Airtable_* matches your .env style). */
function firstEnv(...keys) {
  for (const key of keys) {
    const val = process.env[key];
    if (typeof val === 'string' && val.trim()) return val.trim();
  }
  return null;
}

/** Table ID or name for the Content Pipeline panel */
export function pipelineTable() {
  return firstEnv('AIRTABLE_CONTENT_PIPELINE', 'Airtable_Content_Pipeline') ?? 'Content Pipeline';
}

/** Table ID or name for Affiliate Partners */
export function affiliatesTable() {
  return firstEnv('AIRTABLE_AFFILIATE_PARTNERS', 'Airtable_Affiliate_Partners') ?? 'Affiliate Partners';
}

/** Table ID or name for Products */
export function productsTable() {
  return firstEnv('AIRTABLE_PRODUCTS_TABLE', 'Airtable_Products') ?? 'Products';
}

/** Resolved refs for extra bases (null if unset — use when you add API routes). */
export function getAirtableTableRefs() {
  return {
    pipeline: pipelineTable(),
    affiliates: affiliatesTable(),
    products: productsTable(),
    jobLeads: firstEnv('AIRTABLE_JOB_LEADS', 'Airtable_Job_Leads'),
    jobApplications: firstEnv('AIRTABLE_JOB_APPLICATIONS', 'Airtable_Job_Applications'),
    resumeVersions: firstEnv('AIRTABLE_RESUME_VERSIONS', 'Airtable_Resume_Versions'),
    incomeStreams: firstEnv('AIRTABLE_INCOME_STREAMS', 'Airtable_income_Streams'),
    dailyFocus: firstEnv('AIRTABLE_DAILY_FOCUS', 'Airtable_Daily_Focus'),
  };
}

/** @deprecated use pipelineTable() / affiliatesTable() / productsTable() */
export const AIRTABLE_TABLES = {
  get AFFILIATES() {
    return affiliatesTable();
  },
  get PIPELINE() {
    return pipelineTable();
  },
  get PRODUCTS() {
    return productsTable();
  },
};

export function getAirtableConfig() {
  const key = process.env.AIRTABLE_API_KEY;
  const base = process.env.AIRTABLE_BASE_ID;
  const ok = !!(key?.trim?.() && base?.trim?.());
  return ok
    ? { ok: true, apiKey: key.trim(), baseId: base.trim() }
    : { ok: false };
}

function authHeaders(apiKey) {
  return { Authorization: `Bearer ${apiKey}` };
}

function encodeTableSegment(tableIdOrName) {
  return encodeURIComponent(tableIdOrName);
}

export async function listRecords(cfg, tableIdOrName) {
  const { apiKey, baseId } = cfg;
  const url = `${AIRTABLE_API}/${baseId}/${encodeTableSegment(tableIdOrName)}`;
  const res = await fetch(url, { headers: authHeaders(apiKey) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.error?.message ?? `Airtable HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body.records ?? [];
}

export async function updateRecord(cfg, tableIdOrName, recordId, fields) {
  const { apiKey, baseId } = cfg;
  const url = `${AIRTABLE_API}/${baseId}/${encodeTableSegment(tableIdOrName)}/${recordId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      ...authHeaders(apiKey),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = body?.error?.message ?? `Airtable HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body;
}
