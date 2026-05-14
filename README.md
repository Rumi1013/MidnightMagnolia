# Midnight Magnolia — Next.js Headless Setup

## 1. Install
npm install

## 2. Environment
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_WIX_CLIENT_ID from:
# Wix Dashboard → Settings → Headless Settings → Create OAuth App

## 3. Wix Dashboard setup
- Enable: Wix Blog, Wix Stores, Wix Bookings
- Blog categories to create: Shadow Work · Southern Gothic · Soft Business School · Literary Archive · Healing Resources
- Upload resume PDFs to Media Manager → paste URLs into .env.local

## 4. Run locally
npm run dev
# → http://localhost:3000

## 5. Deploy to Vercel
npx vercel
# Add env vars in Vercel dashboard → Settings → Environment Variables

## Portfolio resume URLs
After uploading PDFs (or hosting elsewhere), set in `.env.local` (see `.env.local.example`):

- **`RESUME_TRACK_A_URL`** — **Archival / preservation resume** (primary download on `/portfolio`).
- **`RESUME_TRACK_B_URL`** — **Data / systems resume** (secondary).

Optional Featured card links (hosted case studies / Notion public pages):

- `NEXT_PUBLIC_PORTFOLIO_FEATURED_GENEALOGY_URL` (defaults to `NEXT_PUBLIC_SITE_URL`)
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL`

## Updating content
All URLs, product data, and copy → lib/constants.js
Blog posts → Wix Dashboard (appear automatically via ISR)
Shop products → Wix Dashboard Stores (appear automatically)

## Ship roadmap (`docs/`)

Implementation index: **`docs/implementation-sources.md`** (Wix merch checklist, checkout QA, Notion/Airtable ops, RLS, Stan minimum, Zapier parity, portfolio env contract).
