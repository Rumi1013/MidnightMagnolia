# Digital content → BMAC pipeline

Architecture: **Wix Headless** = CMS / catalog / bookings backend · **Next.js on Vercel** = front door · **Buy Me a Coffee** = digital + membership checkout (Stan deferred).

## Operable ASAP path

1. **Source** — Finalize PDF/cover in Product Garden (Notion/Airtable) or local `Documents/MidnightMagnoliaDocs`.
2. **List on BMAC** — Upload as digital item or membership perk on https://www.buymeacoffee.com/midnightmagnolia.
3. **Env** — `NEXT_PUBLIC_BMAC_URL=https://www.buymeacoffee.com/midnightmagnolia` (local + Vercel).
4. **Site CTAs** — `lib/constants.js` `URLS.bmac` / `PRODUCTS` / Nav Shop / `/membership` already point at BMAC after the ASAP CTA pass.
5. **Smoke** — Follow `docs/BMAC_MINIMUM.md` + `docs/CHECKOUT_LOOP.md`.

## Wix inventory (physical / bookings only)

```bash
npm run wix:export   # → data/inventory-products.csv, data/wix-inventory-snapshot.json
npm run wix:smoke
```

Digital source of truth for ASAP is **BMAC**, not Wix Stores or Stan. Keep Wix export for merch/booking parity (`docs/WIX_MERCH_CHECKLIST.md`).

## First SKU checklist

- [ ] Gentle Beginning (free) or Shadow Work Starter Kit listed on BMAC
- [ ] Site “Get It” / Shop CTAs open BMAC
- [ ] One private-window purchase or membership join recorded in CHECKOUT_LOOP
