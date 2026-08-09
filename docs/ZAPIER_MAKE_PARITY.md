# Zapier / Make parity checklist

**Source rows:** MM_Canonical_Master_Plan_v3.html (Zapier/Make tab) — recipes **P-01…M-04** and related; plus `files/Airtable_Schema_Automations.html` **Automations** sheet.

For each recipe:

| Column | Meaning |
|--------|---------|
| **Live** | Running in Zapier or Make with healthy auth |
| **Stub** | Zaps exist but need credentials or test data |
| **Next API** | Logic intentionally lives in `pages/api/*` instead of Zapier |
| **Replaced** | Deprecated (e.g. Patreon-first flows superseded by Stan + BMAC) |
| **N/A** | Master Plan row does not apply to current stack |

**Note:** Stan → Airtable / Notion / Contacts (**Z-01…Z-03**) take priority over legacy Patreon (**P-01…P-03**) while Patreon access is limited.

Update this table as you audit each row (date + initials in your commit message is enough).
