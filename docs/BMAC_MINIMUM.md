# Buy Me a Coffee minimum (ASAP ship gate)

**Canonical ASAP commerce:** Buy Me a Coffee replaces Stan Store for digital products and membership (cost). Stan is deferred — do not block ship on `docs/STAN_STORE_MINIMUM.md`.

Verify against the live page in `NEXT_PUBLIC_BMAC_URL` / `lib/constants.js` `URLS.bmac` (must not be the bare `https://www.buymeacoffee.com/` root).

## Profile + page

- [x] Real creator page URL set in `.env.local` and Vercel (`NEXT_PUBLIC_BMAC_URL`) — `https://www.buymeacoffee.com/midnightmagnolia`
- [ ] Profile photo, bio, brand-aligned page
- [x] Tip / support path works from site footer and `/membership` (code)

## Membership + digital (as offered on BMAC)

- [ ] Membership tier(s) for Magnolia Circle (or BMAC equivalent) live — or explicit “tips only” decision documented if membership lives elsewhere temporarily
- [ ] Free starter (Gentle Beginning or equivalent) linked or hosted
- [ ] Shadow Work Starter Kit / core paid digital SKU(s) purchasable if selling on BMAC this week
- [ ] Welcome / delivery path confirmed (email download or BMAC membership access)

## Site CTA alignment (code)

- [x] Nav **The Shop** → `URLS.bmac` (not Stan)
- [x] Homepage primary shop CTA → BMAC (Wix `/shop` optional secondary)
- [x] `/membership` copy and primary buttons → BMAC-first
- [x] `PRODUCTS` / membership CTAs in `lib/constants.js` → `URLS.bmac`
- [x] Grimoire / library / sanctuary buy links → BMAC (or Wix bookings only where appropriate)

## Smoke test

- [ ] Private window: site → BMAC → membership join or low-price purchase / tip completes
- [x] Record result in `docs/CHECKOUT_LOOP.md` (BMAC-first) or Supabase `dashboard_tasks` under `bmac` / `site`

Cross-check product names with `data/inventory-products.csv` after Wix export if physical catalog still matters; digital SKU source of truth for ASAP is BMAC.

## Minimal content → BMAC pipeline (ship gate)

Architecture: **Wix Headless** = CMS/catalog/bookings backend; **Next.js on Vercel** = front door; **BMAC** = digital/membership checkout.

1. Finalize source file (PDF / zip) and cover for one SKU.
2. Upload / list on Buy Me a Coffee (membership tier or digital product).
3. Confirm `NEXT_PUBLIC_BMAC_URL` and site CTAs open that page (not Stan).
4. Smoke purchase or free download from the Next site in a private window.
5. Optional: `npm run wix:export` only if a parallel Wix Stores row exists for physical/catalog — do not treat Wix export as digital publish.
