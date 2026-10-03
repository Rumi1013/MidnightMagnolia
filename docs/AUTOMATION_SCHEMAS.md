# Automation schemas

Trigger → payload → action(s) → model (if any) → destination, for the business automations named in this repo's own planning docs. Written as Make.com-style scenario shapes (Make is the stated primary per `AGENTS.md`'s "Zapier/Make parity" framing); the same shape maps 1:1 to a Zap.

IDs match `docs/ZAPIER_MAKE_PARITY_CHECKLIST.md` exactly — this doc is a build spec for those rows, not a second source of truth for status. Update status in the checklist, not here.

Model choices follow `docs/MODEL_ROUTING.md` §(b).

## Digital pipeline + checkout (new — not yet rows in the parity checklist)

### Gumroad sale → fulfillment log
- **Trigger:** `Gumroad: New Sale` webhook
- **Payload:** `{ "product_id": string, "product_name": string, "email": string, "price": number, "sale_id": string }`
- **Action:** append row to Airtable Sales Log (same table Z-01 / C-04 / C-05 / C-06 write to)
- **Model:** none — deterministic field mapping
- **Destination:** Airtable Sales Log

### BMAC tip/membership → welcome
- **Trigger:** `Buy Me a Coffee: New Supporter` webhook
- **Payload:** `{ "supporter_name": string, "email": string, "tier": string, "amount": number }`
- **Action:** (1) tag Airtable Contacts (same shape as A-02); (2) if `tier` ≥ Magnolia Circle, draft a personalized thank-you
- **Model:** Sonnet 5 for the thank-you draft only; no model for tagging
- **Destination:** Airtable Contacts + outbound email

## Zapier/Make parity checklist (existing IDs)

### Z-01 — Gumroad → Airtable
- Already named in the checklist as the reference pattern. **Trigger:** `Gumroad: New Sale`. **Payload/action/destination:** same as "Gumroad sale → fulfillment log" above. No model.

### P-03 — Content pipeline seed
- **Trigger:** SKU logged from C-04
- **Payload:** `{ "sku": string, "name": string, "description": string }`
- **Action:** create a launch card in Notion Content Calendar
- **Model:** none — reuses the C-04 draft, no independent generation
- **Destination:** Notion Content Calendar (Hub Conversion panel)
- **Note:** post-ASAP per checklist

### C-04 — New product launch
- **Trigger:** `Gumroad: Product Created` webhook
- **Payload:** `{ "product_id": string, "name": string, "price": number, "description": string, "cover_url": string }`
- **Action:** (1) draft Beehiiv email; (2) draft Notion social post; (3) create Airtable Sales Log SKU row
- **Model:** Sonnet 5 for (1) and (2), from `{name, description}`
- **Destination:** Beehiiv draft, Notion social draft, Airtable Sales Log
- **Note:** build together with A-02 — checklist explicitly says "do not implement in this cycle"

### A-02 — Customer tagging
- **Trigger:** `Gumroad/BMAC: New Purchase`
- **Payload:** `{ "email": string, "product_or_tier": string }`
- **Action:** map `product_or_tier` to an Airtable Contacts tag from a fixed enum
- **Model:** Haiku 4.5, only for fuzzy-matching a new/unrecognized SKU string — prefer a deterministic lookup table first
- **Destination:** Airtable Contacts
- **Note:** build together with C-04

### C-05 — POD order sync
- **Trigger:** `Printful: Order Webhook`
- **Payload:** `{ "order_id": string, "sku": string, "status": string, "customer": string }`
- **Action:** append to Airtable Sales Log
- **Model:** none
- **Destination:** Airtable Sales Log
- **Gate:** online only after first POD SKU ships (Printify Phase 1 stays post-ASAP)

### C-06 — Print fulfillment
- **Trigger:** `Lulu Direct: Order Status Webhook`
- **Payload:** `{ "order_id": string, "isbn_or_sku": string, "status": string }`
- **Action:** append to Airtable Sales Log, separate table/view from digital SKUs
- **Model:** none
- **Destination:** Airtable Sales Log (print view)

### G-02 — Ancestral content pull
- **Trigger:** Obsidian vault file tagged `product-ready` — **open design question:** Obsidian has no native webhook, needs a local file-watcher bridge (e.g. a scheduled script diffing the vault) before this can wire to Make/Zapier
- **Payload:** `{ "title": string, "excerpt": string, "tags": string[] }`
- **Action:** draft a Notion Content Calendar launch card
- **Model:** Sonnet 5
- **Destination:** Notion Content Calendar

### H-02 — Weekly digest
- **Trigger:** scheduled, weekly
- **Payload:** read-only Airtable Sales Log query result
- **Action:** summarize into digest text
- **Model:** Sonnet 5
- **Destination:** plain Notion/Airtable note for now — **not** the live Hermes surface until Hermes Chunk 2 ships (`hermes/DAILY_USE.md`, post-ASAP)

### P-01, P-02, Z-02, Z-03, M-01 — open
Still blank (`_fill_`) in `docs/ZAPIER_MAKE_PARITY_CHECKLIST.md` and not named in `files/Airtable_Schema_Automations.html`. Need a Master Plan v3 walk to name before they can be schema'd here — do not guess at their shape.

## Dashboard / Career Command integrations

These are pull, not push — no trigger/webhook, just a read-through-render chain. Follow `.claude/skills/add-dashboard-panel`:

- **Pattern:** `lib/commandHub/<domain>.js` (Airtable getter) → `pages/api/<domain>.js` (returns JSON) → dashboard React component (fetch on mount/interval) → integration pill
- **Existing domains** (the template — reuse this shape for any new panel, don't invent a new one): `applicationBank`, `artifacts`, `caseStudies`, `conversion`, `flagshipBuilds`, `offers`, `reference`, `risk`, `timeline`, `today`
- **Model:** none by default. Sonnet 5 only if a panel synthesizes text at request time (e.g. a "today" summary) — never batch/background generation for a dashboard read path
