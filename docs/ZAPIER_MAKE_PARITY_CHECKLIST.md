# Zapier / Make parity checklist

Walk **Master Plan v3** automation list (P-01…P-03, Z-01…Z-03, M-01…M-04) and the **Automations** sheet in `files/Airtable_Schema_Automations.html`. For each row, mark:

| ID | Name (from plan) | Status | Notes |
|----|-------------------|--------|-------|
| P-01 | _fill_ | live / stub / replaced-by-Next | |
| P-02 | | | |
| P-03 | | | |
| Z-01 | Wix launch/contact form → Airtable Contacts | Next API stub | `/api/automations/inbound` supports `contact.subscribed`; connect Zapier/Make webhook after `MM_AUTOMATION_WEBHOOK_SECRET` is set. |
| Z-02 | Wix Store sale → Airtable Sales | Next API stub | `/api/automations/inbound` supports `sale.recorded`; map amount, product, platform, sale date. |
| Z-03 | | | |
| M-01 | | | |
| … | | | |

**Replaced-by-Next:** e.g. catalog reads via `lib/wix.js` + ISR, not a sync Zap.

Update this table as you wire or retire each automation.
