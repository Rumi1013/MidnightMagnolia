# Notion six-database restructure (execution checklist)

Execute inside Notion first; then paste IDs into `.env.local` for panels wired in `lib/notion.js` and `pages/api/notion/*`.

1. **Content Calendar** — posts, status, publish dates → `NOTION_DB_CONTENT_CALENDAR`
2. **Product Build Tracker** — SKUs, build stage, Wix/Gumroad → `NOTION_DB_PRODUCT_TRACKER`
3. **Dusk Letters** — newsletter queue → `NOTION_DB_DUSK_LETTERS`
4. **Member Content Tracker** (7th DB when added) — document new env when fetcher exists
5. **Knowledge / SOP** — optional fourth+ DBs as Master Plan evolves
6. **Archive / Research** — optional; keep heavy genealogy in Supabase per project rules

Share each database with the Notion integration tied to `NOTION_TOKEN`.

See also: [OPS_ENV_NOTION_AIRTABLE.md](./OPS_ENV_NOTION_AIRTABLE.md).
