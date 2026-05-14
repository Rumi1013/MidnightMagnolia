# Ops dashboard — environment checklist

After any `.env.local` change, run:

```bash
npm run supabase:verify
```

## Notion (`lib/notion.js`, `/dashboard`)

| Variable | Panel |
|----------|--------|
| `NOTION_TOKEN` | All Notion panels |
| `NOTION_DB_CONTENT_CALENDAR` | Content calendar |
| `NOTION_DB_PRODUCT_TRACKER` | Product tracker |
| `NOTION_DB_DUSK_LETTERS` | Dusk Letters drafts |

The Master Plan **6-database restructure** may introduce additional databases; add new `NOTION_DB_*` variables and matching fetchers when those IDs are stable.

## Airtable — Operations base

Required for most ops panels: `AIRTABLE_API_KEY`, `AIRTABLE_OPS_BASE_ID`, and the `AIRTABLE_TBL_*` IDs in `.env.local.example`.

**Services panel:** import `data/inventory-services.csv` into the Operations base (new table), then set:

```bash
AIRTABLE_TBL_SERVICES=tbl…
```

Writing base IDs are listed in `.env.local.example` for manuscripts, posts, income, etc.

## Career Command

Optional panel on `/dashboard`:

```bash
AIRTABLE_CAREER_BASE_ID=app…
```

Use the same **portfolio direction** as `/portfolio` (archival primary, data secondary) when you design that base.
