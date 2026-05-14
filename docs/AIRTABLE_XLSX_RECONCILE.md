# Airtable Excel exports vs repo

Offline workbooks (often under `~/Downloads/`) and HTML exports under `files/` describe broader schemas than the free-tier Airtable plan should host.

## Rules

- **Genealogy:** Supabase + `scripts/seed-genealogy.mjs` + `completeairtable/*.csv` — do **not** mirror the full tree in Airtable.
- **Operations / Writing:** `lib/airtable.js` + `pages/api/airtable/operations.js` are source of truth for **implemented** tables.

## Artifacts

| File | Use |
|------|-----|
| `files/Airtable_Schema_Automations.html` | Cross-check table names vs `TBL` env vars; **Automations** sheet vs Zapier/Make (see `docs/ZAPIER_MAKE_PARITY.md`) |
| `files/Airtable_Family_Tree_Setup_1.html` | Field semantics reference for CSV columns only |

When a workbook adds a new **tracked** entity, add an env var + API getter before the dashboard claims it is live.
