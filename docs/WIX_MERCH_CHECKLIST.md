# Wix merchandising checklist (taglines + heroes + export)

This repo already applies **canonical taglines on the Next.js `/services` page** when Wix returns an empty `tagLine`, via `lib/serviceTaglines.js` (aligned with `data/SERVICE-TAGLINES.md`).

## 1. Paste taglines into Wix Bookings (source of truth for Wix UI)

For each service in `data/SERVICE-TAGLINES.md`, open **Wix Dashboard → Bookings → Services →** edit service → **Tagline / subtitle** → paste the **Primary** line.

**Done (2026-08-08):** Primary taglines applied via Bookings Services V2 for WhollyInspired Publishing Package, Free 15-Minute Publishing Consultation, Manuscript Development, KDP Self-Publishing Setup, and Book + Journal Bundle Package.

## 2. Hero images (stores + bookings)

`lib/brandAssets.js` maps **exact Wix product/service names** to `/public/brand/illustrations/*.png`:

- `PRODUCT_HERO_ART` — five digital/lead products missing heroes in Wix.  
- `SERVICE_HERO_ART` — five booking services missing heroes in Wix.

**Option A (recommended for Wix storefront parity):** upload the matching PNG from `public/brand/illustrations/` to each product/service in the Wix dashboard so the Stores/Bookings API returns real media.

**Option B:** rely on the Next.js shop/services pages only (they already fall back to `PRODUCT_HERO_ART` / `SERVICE_HERO_ART` in JSX).

## 3. Refresh inventory snapshot

After Wix edits:

```bash
npm run wix:smoke   # optional — verify WIX_API_KEY + WIX_SITE_ID
npm run wix:export
```

Open `data/INVENTORY-GAP-REPORT.md` and confirm tagline/image gaps close.
