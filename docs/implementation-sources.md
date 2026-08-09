# Implementation sources index

Cursor and humans: start here to map **strategy artifacts → code**.

## Canonical HTML (repo root or `completeairtable/`)

| Document | Path | Code touchpoints |
|----------|------|-------------------|
| Master Plan v3 | `MM_Canonical_Master_Plan_v3.html` | Wix/BMAC priorities — pair with `docs/CHECKOUT_LOOP.md`, `docs/BMAC_MINIMUM.md` (Stan deferred) |
| Integration v4 | `MM_Integration_v4.html` | Five Roots, Vincent/Vinson stats — pair with `docs/FIVE_ROOTS_CONTENT.md`, genealogy in Supabase |
| Master Plan (older) | `completeairtable/MM_Canonical_Master_Plan.html` | Archive reference |

## `files/` HTML exports (Excel / Word → web)

| Document | Path | Code touchpoints |
|----------|------|-------------------|
| Airtable Family Tree Setup | `files/Airtable_Family_Tree_Setup_1.html` | `completeairtable/`, `scripts/seed-genealogy.mjs`, `lib/supabase-schema.sql` |
| Airtable Schema + Automations | `files/Airtable_Schema_Automations.html` | `lib/airtable.js`, `pages/api/airtable/operations.js`, `docs/ZAPIER_MAKE_PARITY_CHECKLIST.md` |
| Preservation / governance Word HTML | `files/*.html` | Portfolio narrative reference only — live portfolio is `pages/portfolio.jsx` |

## Executable spine

| Area | Paths |
|------|--------|
| Wix | `lib/wix.js`, `pages/api/wix/`, `scripts/wix-*.mjs`, `docs/WIX_MERCH_CHECKLIST.md`, `docs/WIX_BLOG_DRAFT_EXPORT.md` |
| Airtable | `lib/airtable.js`, `pages/api/airtable/operations.js` |
| Notion | `lib/notion.js`, `pages/api/notion/` |
| Supabase | `lib/supabase-schema.sql`, `lib/supabaseServer.js`, `pages/api/tasks.js`, `pages/api/affiliates.js`, `docs/SUPABASE_RLS_AND_API.md` |
| Dashboard | `pages/dashboard.jsx` |
| Portfolio | `pages/portfolio.jsx`, `lib/constants.js` `FEATURED_PORTFOLIO_CARDS`, `.env.local.example` resume + featured URLs |
| Brand / heroes | `lib/brandAssets.js`, `data/SERVICE-TAGLINES.md` |

## Ship path docs (this execution)

- `docs/BMAC_MINIMUM.md` — **ASAP commerce gate**
- `docs/DIGITAL_CONTENT_PIPELINE.md` — source → Gumroad → CTA (membership on BMAC)
- `docs/EMAIL_PLATFORM_DECISION.md` — lead-magnet scale blocker
- `hermes/DAILY_USE.md` — Hermes Chunk 2+ for Daily Nudge
- `docs/DROPSHIP_LANE.md` — Printify / Enchanted Soul (post-ASAP)
- `docs/WIX_MERCH_CHECKLIST.md`
- `docs/CHECKOUT_LOOP.md` — Gumroad digital + BMAC membership
- `docs/SITE_INTEGRITY_TASKS.md`
- `docs/OPS_ENV_NOTION_AIRTABLE.md`
- `docs/SUPABASE_RLS_AND_API.md`
- `docs/CANONICAL_MASTER_PLAN_SYNC.md`
- `docs/EMAIL_PLATFORM_DECISION.md`
- `docs/STAN_STORE_MINIMUM.md` — **deferred**
- `docs/NOTION_SIX_DB_RESTRUCTURE.md`
- `docs/FIVE_ROOTS_CONTENT.md`
- `docs/WIX_BLOG_DRAFT_EXPORT.md`
- `docs/AIRTABLE_XLSX_RECONCILE.md`
- `docs/ZAPIER_MAKE_PARITY_CHECKLIST.md`
- `docs/PORTFOLIO_RESUME_ENV.md` (resume URL contract)
- `docs/WIX_OAUTH_REDIRECTS.md` — Midnitemag callback URIs
- `docs/DNS_CUTOVER.md` — www → Vercel; Wix stays Headless
