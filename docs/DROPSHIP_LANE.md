# Dropship distribution lane (post-ASAP)

**Do not block** website / BMAC / portfolio ship on this lane.

## Architecture

Physical path after digital ASAP:

**Printify (POD)** → **Wix Stores** → Next `/shop` via **Wix Headless**

Separate from BMAC digital/membership.

## Status

| Partner | Status | Next steps |
|---------|--------|------------|
| **Printify** | API key in `.env.local` (`PRINTIFY_API_KEY`); Master Plan notes art print via Wix; dashboard Phase 1 lists journal/candle/tote | Confirm Printify↔Wix connection; fix proof/QR issues; list Phase 1 SKUs on Wix Stores |
| **Enchanted Soul** | Named dropship partner in Master Plan / dashboard | Apply when ready for crystals/ritual SKUs |
| **App code** | No Printify SDK in `package.json` / `pages` | Keep fulfillment on Printify+Wix — do not add Stripe/Shopify for v1 |

## Kickoff order (after one BMAC digital SKU is live)

1. Verify Printify shop connected to Wix site `ad2ce561-4efa-4255-a998-9074ffc0de7b` (or current Headless site).
2. Publish Phase 1 SKUs; run `npm run wix:export` and spot-check `/shop`.
3. Optional Enchanted Soul application.
4. Only then consider any Next-side Printify admin helpers (not required for public ship).
