# Implementation sources index

Cursor and humans: start here to map **strategy artifacts → code**.

## Ship status (as of 2026-09-27)

Code-side ASAP ship work (Gumroad/BMAC CTA routing, Wix Headless shop, DNS/Vercel production readiness) is done — see `docs/BMAC_MINIMUM.md`, `docs/CHECKOUT_LOOP.md`, `docs/DNS_CUTOVER.md` for the per-item Pass/done record. What's left is manual/operator action, not code: list a real SKU on Gumroad, complete one private-window Gumroad purchase and one BMAC tip/join, finish BMAC profile polish, confirm the delivery/welcome path (`docs/DIGITAL_CONTENT_PIPELINE.md` first-SKU checklist). Dropship/Printify, Zapier/Make parity automations, and Flagship Roots/Press stay correctly deferred post-ASAP; Flagship Institute (taxonomy, ERD, 20 seed records) is done. See `docs/MODEL_ROUTING.md` for which Claude model to use for which task, and `docs/AUTOMATION_SCHEMAS.md` for build specs on the named-not-built automations.

## August 2026 Career & Business Binder (do not commit PDFs)

Canonical specs live **outside the git repo** at `~/Downloads/Project Specs/`. Do not add the PDFs, docx files, or 8MB zip archives to this checkout.

| Document | Path | Code touchpoints |
|----------|------|-------------------|
| Command Hub (interactive) | `~/Downloads/Project Specs/Command Hub.dc.html` | Private `/career-command` shell — `lib/commandHub/` (public-safe), `components/command-hub/`, `pages/career-command.jsx`. Full extract: gitignored `CareerSystem/Career-command/private/` |
| Career & Business Binder (print) | `~/Downloads/Project Specs/Binder.dc.html` | Same local packet (copy extract only; do not render print HTML) |
| Case Study Document Set | `~/Downloads/Project Specs/Midnight_Magnolia_Case_Study_Document_Set/` | Hub case library + public `/portfolio/*` pages |
| 90-Day Command Plan | `~/Downloads/Project Specs/Midnight_Magnolia_90_Day_Command_Plan_with_Case_Studies.pdf` | Hub Today + Timeline panels |
| Flagship Guide (case studies) | `~/Downloads/Project Specs/Midnight_Magnolia_Flagship_Guide_with_Case_Studies.docx` | Hub Building panel narrative; pair with `/portfolio` case studies |
| Three Flagship Projects Build Guide (Verified) | `~/Downloads/Project Specs/Midnight_Magnolia_Three_Flagship_Projects_Build_Guide_Verified.pdf` | **Build authority** for Institute / Roots / Press. Working extract: `docs/FLAGSHIP_BUILD_GUIDE.md`. Hub fields: `lib/commandHub/flagshipBuilds.js`. Do not merge the three projects into one store. |
| Conversion addendum | `…/midnight-magnolia-conversion-product-automation-plan-with-case-studies.md` | Hub Conversion panel; named Make flows in `docs/ZAPIER_MAKE_PARITY_CHECKLIST.md` |
| Resume / cover letter Word | Case Study Document Set `Resume_*.docx`, `Cover_Letter_*.docx` | **Reviewed, not auto-shipped.** Public PDFs stay under `public/resumes/` until a manual replace. See `docs/PORTFOLIO_RESUME_ENV.md` |

The DocuCraft `_ds/` design system referenced by the `.dc.html` files is not in that folder. The Hub is rebuilt in Next.js with `styles/globals.css` tokens.

## Canonical HTML (repo root or `completeairtable/`)

| Document | Path | Code touchpoints |
|----------|------|-------------------|
| Master Plan v3 | `MM_Canonical_Master_Plan_v3.html` | Wix/BMAC/Gumroad priorities — pair with `docs/CHECKOUT_LOOP.md`, `docs/BMAC_MINIMUM.md` |
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
| Command Hub (private) | `pages/career-command.jsx`, `lib/commandHub/` (shell), `components/command-hub/`, gitignored `CareerSystem/Career-command/private/` |
| Portfolio | `pages/portfolio.jsx`, `pages/portfolio/*`, `lib/constants.js` `FEATURED_PORTFOLIO_CARDS` / `SELECTED_PROJECTS`, `.env.local.example` resume + featured URLs |
| Brand / heroes | `lib/brandAssets.js`, `data/SERVICE-TAGLINES.md` |
| Flagship (Institute / Roots / Press) | `docs/flagship/`, `lib/flagship/`, `data/flagship/`, `lib/commandHub/flagshipBuilds.js` |

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
- `docs/NOTION_SIX_DB_RESTRUCTURE.md`
- `docs/FIVE_ROOTS_CONTENT.md`
- `docs/WIX_BLOG_DRAFT_EXPORT.md`
- `docs/AIRTABLE_XLSX_RECONCILE.md`
- `docs/ZAPIER_MAKE_PARITY_CHECKLIST.md`
- `docs/PORTFOLIO_RESUME_ENV.md` (resume URL contract)
- `docs/WIX_OAUTH_REDIRECTS.md` — Midnitemag callback URIs
- `docs/DNS_CUTOVER.md` — www → Vercel; Wix stays Headless
- `docs/FLAGSHIP_BUILD_GUIDE.md` — Institute / Roots / Press build authority (Verified guide extract)
