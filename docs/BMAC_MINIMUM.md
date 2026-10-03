# Buy Me a Coffee minimum (membership / tips)

**Canonical split:** **Gumroad** = digital products · **Buy Me a Coffee** = Magnolia Circle membership + tips. Digital listing steps live in `docs/DIGITAL_CONTENT_PIPELINE.md`.

Verify against the live page in `NEXT_PUBLIC_BMAC_URL` / `lib/constants.js` `URLS.bmac` (must not be the bare `https://www.buymeacoffee.com/` root).

## Profile + page

- [x] Real creator page URL set in `.env.local` and Vercel (`NEXT_PUBLIC_BMAC_URL`) — `https://www.buymeacoffee.com/midnightmagnolia`
- [ ] Profile photo, bio, brand-aligned page
- [x] Tip / support path works from site footer and `/membership` (code)

## Membership (BMAC)

- [ ] Membership tier(s) for Magnolia Circle (or BMAC equivalent) live — or explicit “tips only” decision documented if membership lives elsewhere temporarily
- [ ] Welcome / delivery path confirmed (email or BMAC membership access)

## Site CTA alignment (code)

- [x] Nav **The Shop** → `URLS.gumroad` (digital)
- [x] Homepage primary shop CTA → Gumroad; Magnolia Circle → BMAC
- [x] `/membership` — BMAC for Circle/tips; Gumroad for digital goods
- [x] Digital `PRODUCTS` → `URLS.gumroad`; Magnolia Circle → `URLS.bmac`
- [x] Grimoire / library / sanctuary — digital → Gumroad; membership/tips → BMAC

## Smoke test

- [ ] Private window: site → BMAC → membership join or tip completes
- [x] Record result in `docs/CHECKOUT_LOOP.md` or Supabase `dashboard_tasks` under `bmac` / `site`

**Vercel (2026-08-08):** `NEXT_PUBLIC_BMAC_URL` is set to `https://www.buymeacoffee.com/midnightmagnolia` (not the bare root). Remaining unchecked items still need a human on Buy Me a Coffee.

Digital SKU source of truth for ASAP is **Gumroad** (`docs/DIGITAL_CONTENT_PIPELINE.md`).
