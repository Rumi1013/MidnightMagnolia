# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Midnight Magnolia is a Next.js 14 (Pages Router) headless website + business dashboard. See `README.md` for basic install/run steps.

### Running the dev server

```
npm run dev        # → http://localhost:3000
```

### Lint

```
npx next lint
```

The project uses `eslint-config-next` (core-web-vitals). Config lives in `.eslintrc.json`.

### Key environment notes

- **Supabase credentials are required** for the app to start. `lib/supabase.js` throws a hard error if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing. Use placeholder values (e.g. `https://placeholder.supabase.co`) if real creds are unavailable — the app will start but Supabase-dependent features (dashboard tasks, genealogy) will fail at runtime.
- **Wix client handles missing credentials gracefully** — returns `null`/empty arrays. Pages like `/grimoire` and `/shop` render fine without real Wix creds.
- **Airtable and Notion** are dashboard-only and fully optional. Panels show "Not Connected" placeholders when keys are absent.
- The `.env.local` file (gitignored) holds all secrets. See `.env.local.example` for the full template.

### Known branch issues

- `pages/index.jsx` had a JSX syntax error (`);` instead of `</div>`) — fixed in setup commit.
- `pages/dashboard.jsx` has a pre-existing parsing error around line 254 (missing closing `</div>`, `);`, `}` between ProductCatalog and RevenueLog components). This blocks the `/dashboard` route but does not affect other pages.

### Dependency quirks

- `@vercel/analytics` is imported in `_app.jsx` but was missing from `package.json` — added during setup.
- `eslint@8.57.x`'s transitive dependency `ajv@6.15.0` may not install its own transitive deps (`json-schema-traverse`, `uri-js`, `fast-json-stable-stringify`, `fast-deep-equal`) on some npm versions. If `npx next lint` fails with "Cannot find module" errors, run `npm install json-schema-traverse uri-js fast-json-stable-stringify fast-deep-equal`.

### External services

| Service | Required | Env vars |
|---------|----------|----------|
| Supabase | Yes (app crashes without) | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Wix Headless | No (graceful fallback) | `NEXT_PUBLIC_WIX_CLIENT_ID` |
| Airtable | No (dashboard only) | `AIRTABLE_API_KEY`, `AIRTABLE_OPS_BASE_ID`, `AIRTABLE_WRITING_BASE_ID` |
| Notion | No (dashboard only) | `NOTION_TOKEN`, `NOTION_DB_*` |
