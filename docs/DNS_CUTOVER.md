# DNS cutover — www → Vercel (Wix stays Headless)

**Goal:** Point `www.midnight-magnolia.com` (and apex) at the Next.js app on Vercel. **Wix remains the Headless CMS/commerce/bookings backend** — do not delete the Wix site.

## Preconditions

- [x] Production deploy succeeds on Vercel project `midnight-magnolia`
- [x] BMAC CTAs + portfolio resumes live on the Vercel alias
- [x] Smoke public routes on the production alias (`/`, `/portfolio`, resume PDFs — 2026-08-08)
- [x] Wix OAuth redirect URIs include www + Vercel callback paths (`docs/WIX_OAUTH_REDIRECTS.md`)

## Steps

1. In **Vercel** → Project `midnight-magnolia` → Domains → add `www.midnight-magnolia.com` and `midnight-magnolia.com`.
2. At the **DNS host** (often Wix Domains or external registrar), set:
   - `www` → CNAME to `cname.vercel-dns.com` (or the target Vercel shows)
   - Apex → A / ALIAS per Vercel instructions
3. Keep `NEXT_PUBLIC_WIX_STOREFRONT_URL=https://www.midnight-magnolia.com` only if bookings/catalog still need the classic storefront path; otherwise point storefront URL at the Wix site domain Wix assigns after cutover, or keep Headless API-only.
4. After TLS is active on Vercel, verify `/`, `/portfolio`, `/membership`, Shop → BMAC.
5. Leave classic Wix publish as unpublished or parked — Headless APIs continue to use site ID `ad2ce561-4efa-4255-a998-9074ffc0de7b`.

## Status

Operator DNS change required at registrar/Wix Domains. Repo cannot complete apex cutover without DNS credentials.

**Prep done (2026-08-08):** Production env includes `NEXT_PUBLIC_SITE_URL=https://www.midnight-magnolia.com`, Wix client ID, BMAC URL, and local resume PDF paths. After DNS points www/apex at Vercel, re-check OAuth URIs in `docs/WIX_OAUTH_REDIRECTS.md`.
