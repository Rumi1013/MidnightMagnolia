# Midnight Magnolia — Agent Instructions

## Cursor Cloud specific instructions

### Overview

Single Next.js 14 app (Pages Router) — personal brand platform with public-facing pages and an admin dashboard. External integrations: Wix Headless (shop/blog), Supabase (tasks/genealogy), Airtable (operations data), Notion (content calendar).

### Running the dev server

```bash
npm run dev
# Starts at http://localhost:3000
```

The dev server requires `.env.local` (copy from `.env.local.example`). Pages gracefully degrade when API keys are missing — the public-facing pages render but show fallback/empty states for content that depends on Wix, Supabase, Airtable, or Notion.

### Lint

There is no `lint` script in `package.json`. Run ESLint via:

```bash
npx next lint
```

An `.eslintrc.json` with `{"extends": "next/core-web-vitals"}` must exist at the project root for the above command to work without an interactive prompt.

### Known issues on `feature/magnolia-illustration-library` branch

- `pages/index.jsx` has a JSX syntax error (unclosed `<div>` in a `.map()` callback around line 157–165).
- `pages/dashboard.jsx` has a missing closing brace/return around line 254–255.
- These prevent `next build` from succeeding and those two pages from rendering, but the dev server still starts and all other pages compile on demand.

### Dependency quirks

- `@vercel/analytics` is imported in `_app.jsx` but not listed in `package.json`. It must be installed explicitly.
- The `package-lock.json` is missing transitive dependency entries for `ajv` (used by ESLint). The packages `fast-json-stable-stringify`, `fast-deep-equal`, `json-schema-traverse`, and `uri-js` must be installed explicitly for ESLint to work.
- The `workflow` package (referenced as `@workflow/next` in `next.config.mjs`) adds a build manifest step ("Discovering workflow directives…"). This is normal and not an error.

### Environment variables

See `.env.local.example` for the full list. At minimum for the public site:
- `NEXT_PUBLIC_WIX_CLIENT_ID` — Wix OAuth client for read-only catalog access
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — for dashboard features

### Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run wix:smoke` | Wix API connectivity test (requires env vars) |
