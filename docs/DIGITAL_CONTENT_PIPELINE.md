# Digital content → Gumroad pipeline

Architecture: **Wix Headless** = CMS / catalog / bookings backend · **Next.js on Vercel** = front door · **Gumroad** = digital product checkout · **Buy Me a Coffee** = membership / tips.

## Operable ASAP path

1. **Source** — Finalize PDF/cover in Product Garden (Notion/Airtable) or local `Documents/MidnightMagnoliaDocs`.
2. **List on Gumroad** — Upload as digital product on the Midnight Magnolia Gumroad storefront.
3. **Env** — Optional `NEXT_PUBLIC_GUMROAD_URL` (defaults to `https://gumroad.com/midnightmagnolia` in `lib/constants.js`). Keep `NEXT_PUBLIC_BMAC_URL` for membership.
4. **Site CTAs** — `lib/constants.js` `URLS.gumroad` / digital `PRODUCTS` / Nav Shop point at Gumroad; Magnolia Circle stays on `URLS.bmac`.
5. **Smoke** — Follow `docs/CHECKOUT_LOOP.md` + membership items in `docs/BMAC_MINIMUM.md`.

## Wix inventory (physical / bookings only)

```bash
npm run wix:export   # → data/inventory-products.csv, data/wix-inventory-snapshot.json
npm run wix:smoke
```

Digital source of truth for ASAP is **Gumroad**, not Wix Stores. Keep Wix export for merch/booking parity (`docs/WIX_MERCH_CHECKLIST.md`).

## First SKU checklist

- [ ] Gentle Beginning (free) or Shadow Work Starter Kit listed on Gumroad
- [ ] Site “Get It” / Shop CTAs open Gumroad
- [ ] One private-window purchase recorded in CHECKOUT_LOOP
- [ ] Magnolia Circle / tip path confirmed on BMAC
