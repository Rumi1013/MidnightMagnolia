# Stan + BMAC checkout loop (manual validation)

Use this checklist after env URLs are set in `.env.local` (`NEXT_PUBLIC_BMAC_URL`, Stan store URL in `lib/constants.js` → `URLS.stanStore`).

1. **Home** — Hero shows Stan as primary; BMAC sentence renders with working link.
2. **Magnolia Circle** — “Three ways in” card opens Stan in a new tab.
3. **Grimoire gate** — Stan + BMAC buttons open correctly; email unlock still works locally.
4. **Membership page** — Stan cards and BMAC card link out; Patreon labeled optional.
5. **Shop** — Physical/digital Wix products still link to Wix or Stan per product row (verify one purchase path in staging).

Record pass/fail and date in your ops log when you run this in production.
