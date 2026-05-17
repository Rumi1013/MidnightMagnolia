# Wix + Gumroad + BMAC checkout loop (verification)

Membership and booking are **Wix-first**; digital downloads/product notices can route through **Gumroad**; **Buy Me a Coffee** is the parallel tip/support surface (`NEXT_PUBLIC_BMAC_URL`).

## Pages already aligned in code

- **`/`** — Shop CTA → Wix launch; secondary links include Wix + BMAC in the hero band.
- **`/membership`** — Wix launch first, Gumroad products, BMAC + optional Patreon.
- **`/grimoire`** — After email gate, CTAs include Substack, Gumroad, and BMAC.
- **`/library`** — Points Dusk Letters to Substack and digital SKUs to Gumroad.

## Manual QA (do once before launch)

1. Open `https://www.midnight-magnolia.com` in a private window. Confirm sanctuary, booking, membership, and shop entry points are visible.
2. Open `https://midnightmagnoliasc.gumroad.com/?section=EY25nky0S9sEBStajpDZmw==#EY25nky0S9sEBStajpDZmw==` and confirm free starter/product cards are visible.
3. Click **Buy Me a Coffee** from the site footer and confirm the destination matches your real page.
4. From **`/grimoire`**, submit the email gate, then confirm **Dusk Letters**, **Gumroad Products**, and **Buy Me a Coffee** links resolve.

Record failures in Supabase `dashboard_tasks` under `stan` / `site` categories.
