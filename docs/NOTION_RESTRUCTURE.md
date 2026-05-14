# Notion 6-database restructure (execution checklist)

Strategy lives in **MM_Canonical_Master_Plan_v3.html** (Notion tab). This repo only needs **stable database IDs** once you execute in Notion.

1. Create or rename databases to match the Master Plan taxonomy (content, products, dusk letters, tasks, etc.—exact names are in the HTML doc).
2. Share each database with the same Notion integration that owns `NOTION_TOKEN`.
3. Copy each database ID into `.env.local` using the variable names expected by `lib/notion.js` and `pages/dashboard.jsx`.
4. If property names differ from the code comments in `lib/notion.js`, either rename properties in Notion or extend the mappers in `lib/notion.js` (keep one source of truth).

**Member Content Tracker** (7th DB) — add env + panel when that schema exists.
