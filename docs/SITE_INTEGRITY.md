# Site integrity — `site-*` tasks vs this repo

Supabase seeds `dashboard_tasks` rows (`lib/supabase-schema.sql`) that came from the Master Plan “Wix emergency fixes” list. This doc maps each **`site-*`** id to what the **Next.js** app owns today vs what still lives on **Wix**.

| Task id | Intent | Next.js (this repo) | Wix / other |
|--------|--------|---------------------|-------------|
| `site-footer-wix` | Remove Wix-branded footer junk | N/A — `components/Layout.jsx` footer is MM-owned | Edit Wix theme footer on live site |
| `site-nav-shop` | Shop → Wix/Gumroad launch | **Done:** `NAV` routes to local `/shop`; page links out to Wix launch and Gumroad products | Remove duplicate or stale Stan row in Wix menus if any |
| `site-nav-about` | About link | **Done:** `/about` exists | — |
| `site-nav-contact` | Contact | Use **Work With Me** + **Email**; no separate `/contact` required unless you want one | Optional Wix contact page |
| `site-nav-grimoire` | Grimoire submenu | **Check:** top nav is flat; `/grimoire` is the hub | Fix Wix-only submenu if it still exists |
| `site-sanctuary` | Sanctuary page | `/sanctuary.jsx` — review copy vs Wix parity | Wix blog/gallery still canonical for some media |
| `site-library` | Library page | **Done:** `/library` scaffold | Expand when “Option A/B/C” is chosen |
| `site-about` | About | `/about` | — |
| `site-email` | Email capture | Not implemented in Next — **blocking** for lead magnet scale | Wix forms or ESP embed |
| `site-grimoire-pg` | Grimoire gate | `/grimoire` + Substack/Gumroad/BMAC CTAs | — |
| `site-blog-rename` | “Blog” → “Dusk Letters” | Next uses **The Grimoire**; no “Blog” label in `NAV` | Rename in Wix menus + blog section labels |
| `site-legal` | Legal placeholders | **Improved:** `/privacy-policy`, `/terms-conditions` with Wix cross-links | Paste full Wix legal text when ready |
| `site-mobile` | Mobile audit | Manual QA on deployed Next + Wix | — |

**Memberships / support (canonical):** Wix launch + Gumroad products + Buy Me a Coffee first; Patreon only when access is restored.
