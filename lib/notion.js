// lib/notion.js
// Notion client + typed helpers for MM dashboard panels.
// All DB IDs come from env vars — never hardcode them.

import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// ── Property extractors ───────────────────────────────────────
// Notion's API returns deeply nested property objects.
// These helpers flatten them to plain strings/values.

export function getText(prop) {
  if (!prop) return '';
  if (prop.type === 'title')        return prop.title?.map(r => r.plain_text).join('') ?? '';
  if (prop.type === 'rich_text')    return prop.rich_text?.map(r => r.plain_text).join('') ?? '';
  return '';
}

export function getSelect(prop) {
  return prop?.select?.name ?? '';
}

export function getMultiSelect(prop) {
  return prop?.multi_select?.map(s => s.name) ?? [];
}

export function getDate(prop) {
  return prop?.date?.start ?? null;
}

export function getCheckbox(prop) {
  return prop?.checkbox ?? false;
}

export function getUrl(prop) {
  return prop?.url ?? '';
}

export function getNumber(prop) {
  return prop?.number ?? null;
}

// ── Database query helper ─────────────────────────────────────
// Handles pagination automatically (up to 100 results per call).
export async function queryDatabase(databaseId, filter, sorts) {
  if (!databaseId) throw new Error('Missing Notion database ID');
  const response = await notion.databases.query({
    database_id: databaseId,
    ...(filter && { filter }),
    ...(sorts  && { sorts }),
    page_size: 100,
  });
  return response.results;
}

// ── MM-specific fetchers ──────────────────────────────────────

/**
 * Content Calendar database
 * Expected Notion DB properties:
 *   Name         (title)
 *   Status       (select)   → Draft | Ready | Scheduled | Published
 *   Type         (select)   → Dusk Letters | Blog | Social | Product
 *   Publish Date (date)
 *   Tags         (multi_select)
 *   Notes        (rich_text)
 */
export async function getContentCalendar() {
  const rows = await queryDatabase(
    process.env.NOTION_DB_CONTENT_CALENDAR,
    undefined,
    [{ property: 'Publish Date', direction: 'ascending' }]
  );

  return rows.map(page => ({
    id:          page.id,
    url:         page.url,
    name:        getText(page.properties['Name']),
    status:      getSelect(page.properties['Status']),
    type:        getSelect(page.properties['Type']),
    publishDate: getDate(page.properties['Publish Date']),
    tags:        getMultiSelect(page.properties['Tags']),
    notes:       getText(page.properties['Notes']),
  }));
}

/**
 * Product Build Tracker database
 * Expected Notion DB properties:
 *   Product      (title)
 *   Price        (select)   → Free | $9 | $19 | $9/mo | $29 | $49
 *   Status       (select)   → Not Started | In Progress | Design | Live
 *   Priority     (select)   → Critical | High | Medium
 *   Gumroad      (checkbox) → is it live on Gumroad?
 *   Notes        (rich_text)
 */
export async function getProductTracker() {
  const rows = await queryDatabase(
    process.env.NOTION_DB_PRODUCT_TRACKER,
    undefined,
    [{ property: 'Priority', direction: 'ascending' }]
  );

  return rows.map(page => ({
    id:       page.id,
    url:      page.url,
    product:  getText(page.properties['Product']),
    price:    getSelect(page.properties['Price']),
    status:   getSelect(page.properties['Status']),
    priority: getSelect(page.properties['Priority']),
    onGumroad: getCheckbox(page.properties['Gumroad']),
    notes:    getText(page.properties['Notes']),
  }));
}

/**
 * Dusk Letters (newsletter) drafts
 * Expected Notion DB properties:
 *   Title        (title)
 *   Status       (select)   → Draft | Ready | Sent
 *   Send Date    (date)
 *   Theme        (rich_text)
 */
export async function getDuskLettersDrafts() {
  const rows = await queryDatabase(
    process.env.NOTION_DB_DUSK_LETTERS,
    {
      property: 'Status',
      select: { does_not_equal: 'Sent' },
    },
    [{ property: 'Send Date', direction: 'ascending' }]
  );

  return rows.map(page => ({
    id:       page.id,
    url:      page.url,
    title:    getText(page.properties['Title']),
    status:   getSelect(page.properties['Status']),
    sendDate: getDate(page.properties['Send Date']),
    theme:    getText(page.properties['Theme']),
  }));
}
