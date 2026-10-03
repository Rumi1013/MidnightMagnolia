# Zapier / Make parity checklist

Walk **Master Plan v3** automation list (P-01…P-03, Z-01…Z-03, M-01…M-04), the **Automations** sheet in `files/Airtable_Schema_Automations.html`, and the August 2026 Command Hub conversion addendum. For each row, mark:

| ID | Name (from plan) | Status | Notes |
|----|-------------------|--------|-------|
| P-01 | _fill_ | live / stub / replaced-by-Next | |
| P-02 | | | |
| P-03 | Content pipeline seed | named / not built | SKU logged from C-04 → Notion Content Calendar launch cards. Hub Conversion panel. Post-ASAP. |
| Z-01 | Gumroad → Airtable | | |
| Z-02 | | | |
| Z-03 | | | |
| M-01 | | | |
| C-04 | New product launch | named / not built | Gumroad product created → Beehiiv draft + Notion social draft + Airtable Sales Log SKU. **Build first with A-02.** Do not implement in this cycle. |
| A-02 | Customer tagging | named / not built | Gumroad or BMAC purchase → tag Airtable Contacts by product. **Build first with C-04.** |
| C-05 | POD order sync | named / not built | Printful webhooks → Airtable Sales Log. Online only after first POD SKU. Printify Phase 1 stays post-ASAP. |
| C-06 | Print fulfillment | named / not built | Lulu Direct → Airtable Sales Log, separate from digital SKUs. |
| G-02 | Ancestral content pull | named / not built | Obsidian vault "product-ready" → Notion Content Calendar. |
| H-02 | Weekly digest | named / not built | Hermes read-only Sales Log summary. Hermes Chunk 2 stays post-ASAP. |

**Replaced-by-Next:** e.g. catalog reads via `lib/wix.js` + ISR, not a sync Zap.

**Hub source:** private `/career-command` Conversion panel. Full conversion copy is local-first (`CareerSystem/Career-command/private/`). Public `/services` stays the live Wix Bookings catalog; flagship service prices stay in the local packet until matching Wix services exist.

Update this table as you wire or retire each automation.
