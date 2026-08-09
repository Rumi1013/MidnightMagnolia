# DNS cutover — www → Vercel (Wix stays Headless)

**Goal:** Point `www.midnight-magnolia.com` (and apex) at the Next.js app on Vercel. **Wix remains the Headless CMS/commerce/bookings backend** — do not delete the Wix site.

## Preconditions

- [x] Production deploy succeeds on Vercel project `midnight-magnolia`
- [x] Gumroad digital + BMAC membership CTAs + portfolio resumes live on the Vercel alias
- [x] Smoke public routes on the production alias (`/`, `/portfolio`, resume PDFs — 2026-08-08)
- [x] Wix OAuth redirect URIs include www + Vercel callback paths (`docs/WIX_OAUTH_REDIRECTS.md`)

## Steps

1. In **Vercel** → Project `midnight-magnolia` → Domains → add `www.midnight-magnolia.com` and `midnight-magnolia.com`.
2. At the **DNS host** (often Wix Domains or external registrar), set:
   - `www` → CNAME to `cname.vercel-dns.com` (or the target Vercel shows)
   - Apex → A / ALIAS per Vercel instructions
3. Do **not** point `NEXT_PUBLIC_WIX_STOREFRONT_URL` at www once www is on Vercel — classic `/booking-calendar/*` and `/post/*` 404 there. Bookings use in-app `/services` + `/booking-calendar/[slug]`; blog uses `/blog`. Optional: attach a Wix-hosted pages subdomain later for paid checkout redirects.
4. After TLS is active on Vercel, verify `/`, `/portfolio`, `/membership`, `/services`, `/blog`, Shop → Gumroad, Circle → BMAC.
5. Leave classic Wix publish as unpublished or parked — Headless APIs continue to use site ID `ad2ce561-4efa-4255-a998-9074ffc0de7b`.

## Status

**www already resolves to Vercel (observed 2026-08-09).** Promote the latest production deployment to the www alias after each ship. Optional: connect a Wix pages subdomain for Headless paid-checkout redirects (`createRedirectSession`) once OAuth visitor tokens work.

**Prep done (2026-08-08):** Production env includes `NEXT_PUBLIC_SITE_URL=https://www.midnight-magnolia.com`, Wix client ID, BMAC URL, and local resume PDF paths. Re-check OAuth URIs in `docs/WIX_OAUTH_REDIRECTS.md` after any domain change.
