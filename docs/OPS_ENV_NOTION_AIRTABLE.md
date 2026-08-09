# Ops environment — Notion + Airtable Services

## Notion (6-database restructure, Master Plan v3)

After restructuring in Notion, paste database IDs into `.env.local`:

| Variable | Panel on `/dashboard` |
|----------|------------------------|
| `NOTION_TOKEN` | All Notion panels |
| `NOTION_DB_CONTENT_CALENDAR` | Content calendar |
| `NOTION_DB_PRODUCT_TRACKER` | Product tracker |
| `NOTION_DB_DUSK_LETTERS` | Dusk Letters queue |

Add additional `NOTION_DB_*` variables only when `lib/notion.js` fetchers exist for them.

## Airtable Services inventory

1. Import `data/inventory-services.csv` into **Midnight Operations** as table **Services**.
2. Set `AIRTABLE_TBL_SERVICES=tbl…` in `.env.local`.
3. Reload `/dashboard` — **Services Inventory** should leave `NotConnected`.

## Health check

```bash
npm run supabase:verify
```

Run after any `NEXT_PUBLIC_SUPABASE_URL` or key rotation.
