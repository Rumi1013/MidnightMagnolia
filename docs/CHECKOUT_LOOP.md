# BMAC + Wix checkout loop (verification)

Membership and digital goods are **Buy Me a Coffee–first** (`NEXT_PUBLIC_BMAC_URL` → `URLS.bmac`). **Stan Store is deferred** (cost). Wix Headless remains the CMS/catalog/bookings backend; Next on Vercel is the front door.

## Pages aligned in code

- **`/`** — Primary shop CTA → BMAC; Wix catalog is secondary (`/shop`).
- **`/membership`** — BMAC-first copy; optional Patreon.
- **`/grimoire`** — Gate CTAs → BMAC.
- **`/library`** — Digital SKUs → BMAC.
- **Nav “The Shop”** → `URLS.bmac`.

## Manual QA (do once before launch)

1. Open `https://www.buymeacoffee.com/midnightmagnolia` (or your live `NEXT_PUBLIC_BMAC_URL`) in a private window. Confirm profile, freebie/membership, and at least one digital SKU path.
2. Complete a tip, membership join, or low-price digital purchase and confirm delivery email/access.
3. From **`/`**, **`/membership`**, and **`/grimoire`**, confirm Shop/Membership CTAs land on that BMAC page (not Stan).
4. Optional: open `/shop` and confirm Wix catalog cards still resolve for physical/booking SKUs.

Record results below and/or in Supabase `dashboard_tasks` under `bmac` / `site`.

## QA log

| Date | Path tested | Result | Notes |
|------|-------------|--------|-------|
| 2026-08-08 | Code CTAs → `URLS.bmac` | Pass (code) | Live purchase still operator-confirmed on BMAC |
| | BMAC page reachable | Pass | https://www.buymeacoffee.com/midnightmagnolia |
