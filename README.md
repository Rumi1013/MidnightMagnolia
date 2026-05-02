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

## Portfolio Resume URLs
After uploading PDFs to Wix Media Manager:
RESUME_TRACK_A_URL=https://static.wixstatic.com/media/YOUR_FILE.pdf
RESUME_TRACK_B_URL=https://static.wixstatic.com/media/YOUR_FILE.pdf

## Updating content
All URLs, product data, and copy → lib/constants.js
Blog posts → Wix Dashboard (appear automatically via ISR)
Shop products → Wix Dashboard Stores (appear automatically)
