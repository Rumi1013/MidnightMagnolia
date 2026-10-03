# Site integrity — Supabase `dashboard_tasks` map

Seed rows live in `lib/supabase-schema.sql` (`insert into dashboard_tasks … on conflict do nothing`). They mirror Master Plan “Wix emergency fixes.”

| id | Category | Intent |
|----|----------|--------|
| `site-footer-wix` | site | Remove Wix-branded footer social links on the live Wix site |
| `site-nav-shop` | site | Shop nav → Gumroad URL (Next `NAV` uses Gumroad for “The Shop”; membership on BMAC) |
| `site-nav-about` | site | Fix About nav (build `/about` or redirect) |
| `site-nav-contact` | site | Fix Contact nav |
| `site-nav-grimoire` | site | Fix Grimoire submenu links on Wix |
| `site-sanctuary` | site | Rebuild The Sanctuary on Wix; Next `/sanctuary` is a parallel landing |
| `site-library` | site | Rebuild The Library |
| `site-about` | site | Standalone About |
| `site-email` | site | Email capture above fold on homepage |
| `site-grimoire-pg` | site | Grimoire page + gate (Next has `/grimoire`) |
| `site-blog-rename` | site | Rename Blog → Dusk Letters in Wix nav |
| `site-legal` | site | Replace placeholder legal copy where needed |
| `site-mobile` | site | Mobile audit |

Toggle tasks on **`/dashboard`** (requires `SUPABASE_SERVICE_ROLE_KEY` in server env so API routes can bypass RLS — see `docs/SUPABASE_RLS_AND_API.md`).
