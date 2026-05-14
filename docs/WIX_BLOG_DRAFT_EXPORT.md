# Wix blog draft export

**Script:** `npm run wix:blog-drafts` → `scripts/wix-blog-drafts-export.mjs`  
**Requires:** `WIX_API_KEY` + `WIX_SITE_ID` (anonymous OAuth cannot list drafts).

**Output:** `data/wix-blog-drafts.json` (and optional `data/wix-blog-drafts-md/` when `WIX_BLOG_DRAFT_WRITE_MD=1`).

**Library:** `lib/wix.js` exposes `getWixBlogDraftPosts()` for future API routes if needed.

**Fallback:** Wix Dashboard → Blog → Drafts → copy from editor.

Draft exports are gitignored (see `.gitignore`) so local content does not leak.
