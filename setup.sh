#!/usr/bin/env bash
set -euo pipefail

echo "── Midnight Magnolia · dev setup ──────────────────────────"

# Node version check
required_major=20
node_major=$(node -v 2>/dev/null | sed 's/v\([0-9]*\).*/\1/' || echo 0)
if [ "$node_major" -lt "$required_major" ]; then
  echo "❌  Node $required_major+ required (found: $(node -v 2>/dev/null || echo none))"
  echo "    Install via: https://nodejs.org or 'nvm install 20'"
  exit 1
fi
echo "✓  Node $(node -v)"

# Install deps
npm install
echo "✓  Dependencies installed"

# Copy env if missing
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "✓  .env.local created from example — fill in your keys"
else
  echo "✓  .env.local already exists"
fi

echo ""
echo "── Ready ───────────────────────────────────────────────────"
echo "  npm run dev          → start dev server (localhost:3000)"
echo "  npm run build        → production build"
echo "  npm run wix:smoke    → test Wix API connection"
echo ""
echo "  Required keys in .env.local:"
echo "    WIX_CLIENT_ID, WIX_ACCESS_TOKEN"
echo "    NEXT_PUBLIC_SANITY_PROJECT_ID"
echo "    AIRTABLE_API_KEY, AIRTABLE_BASE_ID"
echo "    NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY"
