# Stan + BMAC checkout loop (verification)

Membership and digital goods are **Stan-first**; **Buy Me a Coffee** is the parallel tip/support surface (`NEXT_PUBLIC_BMAC_URL`).

## Pages already aligned in code

- **`/`** — Shop CTA → Stan Store; secondary links to Stan + BMAC in the hero band.
- **`/membership`** — Stan-first copy; BMAC + optional Patreon.
- **`/grimoire`** — After email gate, CTAs include Stan + BMAC (`lib/constants` `URLS.stanStore`, `URLS.bmac`).
- **`/library`** — Points digital SKUs to Stan.

## Manual QA (do once before launch)

1. Open `https://stan.store/MidnightMagnoliaSC` (or your live Stan URL) in a private window. Confirm profile, free starter, Magnolia Circle, and $9 kit are visible.
2. Add a low-price test item to cart and complete checkout (or Stan test mode if available).
3. Click **Buy Me a Coffee** from the site footer and confirm the destination matches your real page.
4. From **`/grimoire`**, submit the email gate, then confirm **Open Stan Store** and **Buy Me a Coffee** links resolve.

Record failures in Supabase `dashboard_tasks` under `stan` / `site` categories.
