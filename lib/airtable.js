// lib/airtable.js
// Airtable client + typed helpers for MM dashboard panels.
// Base ID and table names come from env vars.

import Airtable from 'airtable';

// Configure once — all calls share this base connection
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID);

// ── Generic table fetcher ─────────────────────────────────────
// Returns all records from a table, with optional sort + filter.
export async function fetchTable(tableName, options = {}) {
  if (!process.env.AIRTABLE_BASE_ID) throw new Error('Missing AIRTABLE_BASE_ID');
  if (!process.env.AIRTABLE_API_KEY) throw new Error('Missing AIRTABLE_API_KEY');

  return new Promise((resolve, reject) => {
    const records = [];
    base(tableName)
      .select({
        pageSize: 100,
        ...options,
      })
      .eachPage(
        (page, fetchNext) => { records.push(...page); fetchNext(); },
        (err) => err ? reject(err) : resolve(records)
      );
  });
}

// ── MM-specific fetchers ──────────────────────────────────────

/**
 * Affiliate Partner Tracker
 * Airtable table: "Affiliate Partners"
 * Expected fields:
 *   Name         (Single line text)
 *   Tier         (Number)           → 1 | 2 | 3
 *   Score        (Single line text) → '10/10'
 *   Status       (Single select)    → Not Contacted | Reached Out | In Discussion | Live
 *   Contact      (Single line text)
 *   Action       (Long text)
 *   Notes        (Long text)
 *   Commission   (Single line text) → e.g. '20–40%'
 *   Priority     (Single select)    → Critical | High | Medium
 */
export async function getAffiliatePartners() {
  const records = await fetchTable('Affiliate Partners', {
    sort: [{ field: 'Tier', direction: 'asc' }],
  });

  return records.map(r => ({
    id:         r.id,
    name:       r.fields['Name']       ?? '',
    tier:       r.fields['Tier']       ?? 2,
    score:      r.fields['Score']      ?? '',
    status:     r.fields['Status']     ?? 'Not Contacted',
    contact:    r.fields['Contact']    ?? '',
    action:     r.fields['Action']     ?? '',
    notes:      r.fields['Notes']      ?? '',
    commission: r.fields['Commission'] ?? '',
    priority:   r.fields['Priority']   ?? 'medium',
  }));
}

/**
 * Content Pipeline
 * Airtable table: "Content Pipeline"
 * Expected fields:
 *   Title        (Single line text)
 *   Type         (Single select)  → Blog | Dusk Letters | Social | Product | Affiliate
 *   Status       (Single select)  → Idea | Draft | Ready | Published
 *   Publish Date (Date)
 *   Platform     (Multi select)   → Site | Stan Store | TikTok | LinkedIn | Email
 *   Notes        (Long text)
 *   Affiliate    (Checkbox)       → is this an affiliate piece?
 */
export async function getContentPipeline() {
  const records = await fetchTable('Content Pipeline', {
    sort: [
      { field: 'Status',       direction: 'asc' },
      { field: 'Publish Date', direction: 'asc' },
    ],
    filterByFormula: "NOT({Status} = 'Published')",
  });

  return records.map(r => ({
    id:          r.id,
    title:       r.fields['Title']        ?? '',
    type:        r.fields['Type']         ?? '',
    status:      r.fields['Status']       ?? 'Idea',
    publishDate: r.fields['Publish Date'] ?? null,
    platform:    r.fields['Platform']     ?? [],
    notes:       r.fields['Notes']        ?? '',
    isAffiliate: r.fields['Affiliate']    ?? false,
  }));
}

/**
 * Product Tracker
 * Airtable table: "Products"
 * Expected fields:
 *   Product      (Single line text)
 *   Price        (Currency or text)
 *   Status       (Single select)  → Not Started | In Progress | Design | Live
 *   Priority     (Single select)  → Critical | High | Medium
 *   Stan Live    (Checkbox)
 *   Revenue MTD  (Currency)
 *   Notes        (Long text)
 */
export async function getProductTracker() {
  const records = await fetchTable('Products', {
    sort: [{ field: 'Priority', direction: 'asc' }],
  });

  return records.map(r => ({
    id:         r.id,
    product:    r.fields['Product']     ?? '',
    price:      r.fields['Price']       ?? '',
    status:     r.fields['Status']      ?? 'Not Started',
    priority:   r.fields['Priority']    ?? 'medium',
    stanLive:   r.fields['Stan Live']   ?? false,
    revenueMtd: r.fields['Revenue MTD'] ?? 0,
    notes:      r.fields['Notes']       ?? '',
  }));
}

// ── Update helpers ─────────────────────────────────────────────

export async function updateAffiliate(recordId, fields) {
  return base('Affiliate Partners').update(recordId, fields);
}

export async function updateContentItem(recordId, fields) {
  return base('Content Pipeline').update(recordId, fields);
}
