# Gumroad + BMAC + Wix checkout loop (verification)

**Gumroad** = digital products (`NEXT_PUBLIC_GUMROAD_URL` → `URLS.gumroad`).
**Buy Me a Coffee** = membership + tips (`NEXT_PUBLIC_BMAC_URL` → `URLS.bmac`).
**Stan Store is deferred** (cost). Wix Headless remains the CMS/catalog/bookings backend; Next on Vercel is the front door.

## Pages aligned in code

- **`/`** — Primary shop CTA → Gumroad; Magnolia Circle → BMAC; Wix catalog secondary (`/shop`).
- **`/membership`** — BMAC for Circle/tips; Gumroad for digital goods; optional Patreon.
- **`/grimoire`** — Digital CTAs → Gumroad; membership/tips → BMAC.
- **`/library`** — Digital SKUs → Gumroad; Circle → BMAC.
- **Nav “The Shop”** → `URLS.gumroad`.

## Manual QA (do once before launch)

1. Open Gumroad (`URLS.gumroad` / `NEXT_PUBLIC_GUMROAD_URL`) in a private window. Confirm at least one digital SKU path.
2. Open `https://www.buymeacoffee.com/midnightmagnolia` (or live `NEXT_PUBLIC_BMAC_URL`). Confirm membership/tip path.
3. Complete a tip, membership join, or low-price digital purchase and confirm delivery email/access.
4. From **`/`**, **`/membership`**, and **`/grimoire`**, confirm Shop CTAs land on Gumroad and membership CTAs on BMAC (not Stan).
5. Optional: open `/shop` and confirm Wix catalog cards still resolve for physical/booking SKUs.

Record results below and/or in Supabase `dashboard_tasks` under `gumroad` / `bmac` / `site`.

## QA log

| Date | Path tested | Result | Notes |
|------|-------------|--------|-------|
| 2026-08-08 | Code CTAs → Gumroad digital + BMAC membership | Pass (code) | Live purchase still operator-confirmed |
| | BMAC page reachable | Pass | https://www.buymeacoffee.com/midnightmagnolia |
