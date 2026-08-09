# Airtable Excel workbooks vs repo

## Family tree

**Family tree data lives in Supabase only** (free-tier row limits). Use `Airtable_Family_Tree_Setup_1.xlsx` / `files/Airtable_Family_Tree_Setup_1.html` for **field semantics** and research exports — seed via `completeairtable/*.csv` + `npm run genealogy:seed`.

## Schema + automations

`Airtable_Schema_Automations.xlsx` / `files/Airtable_Schema_Automations.html` — reconcile **table names** with `lib/airtable.js` `TBL` map and `pages/api/airtable/operations.js` `TABLES` registry.

Automation rows should map to **Zapier/Make** (or be marked replaced by Next API routes) — see `docs/ZAPIER_MAKE_PARITY_CHECKLIST.md`.
