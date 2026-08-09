---
name: wix-inventory-refresh
description: Refresh Midnight Magnolia's Wix inventory snapshot — products, services, and CMS items — by running scripts/wix-inventory-export.mjs and interpreting the resulting CSVs and gap report. Use when the user asks to "refresh inventory," "regenerate gap report," "pull latest products/services from Wix," "what's missing on shop/services," or before importing data into Airtable.
---

# Wix Inventory Refresh

## What this does
Runs `npm run wix:export` to pull the current state of Wix Stores, Wix Bookings, and the Digital Grimoire CMS into local files. Produces a gap report flagging missing images, taglines, and descriptions.

## When to use
- Before importing/syncing Airtable
- After adding/editing items in the Wix dashboard, to verify they're picked up
- When the user asks "what's missing?" or "what isn't rendering?"
- Before a content/asset session, to know what needs filling in

## Workflow

```bash
npm run wix:export
```

This requires `WIX_API_KEY` + `WIX_SITE_ID` in `.env.local` (run `npm run wix:smoke` first if you suspect auth issues).

### Output files

| File | Purpose |
|---|---|
| `data/wix-inventory-snapshot.json` | Full raw + normalized data. The single source of truth. |
| `data/inventory-products.csv` | Airtable-import-ready product rows. Schema matches the existing Products table (`tblA2WPOZgzeGlEji`). |
| `data/inventory-services.csv` | Airtable-import-ready service rows. Import to create the Services table, then set `AIRTABLE_TBL_SERVICES`. |
| `data/inventory-grimoire.csv` | CMS Digital Grimoire entries, lighter schema. |
| `data/INVENTORY-GAP-REPORT.md` | Human-readable summary: counts, rendering check, asset gaps grouped by category. Read this first. |

## After running

1. **Always open `data/INVENTORY-GAP-REPORT.md` first** — gives the user a quick view of what changed and what's still missing
2. If product/service counts changed, mention it explicitly: "Wix has 11 products now (was 9)"
3. If new items lack hero images, suggest mapping them in `lib/brandAssets.js` to existing `magnolia-bloom-*.png` illustrations rather than generating new art (cheaper, on-brand)
4. If new services lack taglines, draft them following `data/SERVICE-TAGLINES.md` voice (load `brand-voice.mdc` rule)

## Importing CSVs

### Airtable Products (existing table)
1. Midnight Operations base → **Products** table
2. **+ → Import data → CSV** → `data/inventory-products.csv`
3. Map columns (should auto-match)

### Airtable Services (new table — create first if `AIRTABLE_TBL_SERVICES` unset)
1. **+ Add table → Import a CSV** → `data/inventory-services.csv`
2. Name it **Services**
3. Copy the new table ID into `.env.local` as `AIRTABLE_TBL_SERVICES`
4. The dashboard Services Inventory panel will activate on next reload

## Failure modes
- **`meta-site <id> not found`** → `WIX_SITE_ID` is wrong. Get it from the Wix dashboard URL.
- **`401 Unauthorized`** → `WIX_API_KEY` is missing scopes. Re-generate with all scopes checked.
- **Script hangs** → Wix API is rate-limiting. Wait 60s, retry.

## Do NOT
- Manually edit the CSVs — they're regenerated every run
- Commit `data/wix-inventory-snapshot.json` if it contains private SKU/pricing the user doesn't want public (check `.gitignore`)
