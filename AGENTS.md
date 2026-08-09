## Learned User Preferences

- Canonical product app is the Active repo root Pages Router Next.js app (`pages/` + `lib/`), not nested `my-app/` scaffolds or Docs copies.
- Keep shippable code in `Development/Projects/Active/MidnightMagnolia`; docs/career reference in `Documents/MidnightMagnoliaDocs`; large media in `MidnightMagnolia-Assets`.
- Prefer one secrets file at Active root `.env.local` (gitignored); do not paste live Stripe or other secret literals into Docs copies or source.
- Architecture to keep front-and-center: this is a **Wix site running headless** — Wix = CMS/commerce/bookings/content backend; Next.js Pages = front door; Vercel = deploy target. Live domain may still be classic Wix publish until DNS cutover; ASAP path is Vercel-hosted Next + Wix Headless, not “replace Wix entirely.”
- For ASAP public ship, prioritize the marketing site (including a real `/portfolio` with real projects + resume links), **Gumroad for digital products** + **BMAC for membership/tips**, and a minimal operable content→Gumroad product pipeline; treat Career Command as a private ops panel first.
- Digital checkout leads with **Gumroad** (`NEXT_PUBLIC_GUMROAD_URL` / `URLS.gumroad`); membership/tips lead with **Buy Me a Coffee** (`NEXT_PUBLIC_BMAC_URL` / `URLS.bmac`). Stan Store is deferred (cost). Keep Wix Headless for catalog/bookings/optional physical SKUs rather than adding Stripe/Shopify for v1.
- Prefer finishing env, Gumroad + BMAC QA, portfolio content, and one digital content→Gumroad listing before apex DNS cutover from classic Wix publish to Vercel. Dropship (Printify) is an explicit post-ASAP lane — do not forget, do not block digital ship.

## Learned Workspace Facts

- Stack: **Wix Headless** (`@wix/sdk` Stores/Blog/Bookings) + **Next.js Pages Router** front door + **Vercel** project `midnight-magnolia`; ops via Airtable/Notion/Supabase. Live brand domain `www.midnight-magnolia.com` is still the published classic Wix site (Editor 3, Premium) until DNS points at Vercel.
- Production Vercel aliases include `midnight-magnolia-latisha-vincent-waters-projects.vercel.app`; custom domain is not yet on this Vercel project; latest deploy has been CANCELED / `live: false` — production redeploy is required for ship.
- Wix Headless OAuth app `Midnitemag` (`977ae287-172d-4cd1-9a46-42bcc3b5b863`) on site `ad2ce561-4efa-4255-a998-9074ffc0de7b` has Vercel + `www.midnight-magnolia.com` + localhost `/auth/callback` URIs configured. Server reads use `WIX_API_KEY` + `WIX_SITE_ID` (ApiKeyStrategy) when both are set.
- Nav “The Shop” and digital CTAs use Gumroad (`URLS.gumroad` / optional `NEXT_PUBLIC_GUMROAD_URL`); Magnolia Circle + tips use Buy Me a Coffee (`NEXT_PUBLIC_BMAC_URL` / `URLS.bmac`). Stan Store URL remains in constants for reference only (deferred). `/shop` remains Wix Stores catalog via Headless. Ship gate: `docs/BMAC_MINIMUM.md` + `docs/DIGITAL_CONTENT_PIPELINE.md`. Dropship: `docs/DROPSHIP_LANE.md`.
- Dropship: Printify (art print claimed live on Wix; Phase 1 journal/candle/tote in Master Plan/dashboard); `PRINTIFY_API_KEY` may exist locally; no Printify SDK in the Next app — fulfillment stays Printify→Wix, post-ASAP lane.
- Career Command: Five Builder routes were built once then are absent; `CareerSystem/` is empty; in-app surface is private `/dashboard` Airtable career panel plus Docs prototypes.
- Portfolio ship needs `RESUME_TRACK_A_URL` / `RESUME_TRACK_B_URL` and featured case-study env URLs; `NEXT_PUBLIC_BMAC_URL` must be the real creator page (not the generic root). Private dashboard needs `MM_DASHBOARD_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY` on Vercel.
- Ship execution index: `docs/implementation-sources.md` — prefer DIGITAL_CONTENT_PIPELINE (Gumroad), BMAC_MINIMUM (membership), checkout loop, site integrity, Wix merch, RLS.
