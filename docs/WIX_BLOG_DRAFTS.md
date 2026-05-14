# Wix blog draft export

Published Grimoire posts use `getGrimoirePosts()` / `queryPosts()` in `lib/wix.js`. **Drafts** require the Blog Draft Posts API, which only succeeds with **elevated auth**.

## Requirements

1. **WIX_API_KEY** and **WIX_SITE_ID** in `.env.local` (Wix Dashboard → Settings → API Keys).
2. Run:

```bash
npm run wix:blog-drafts
```

3. Output: **`data/wix-blog-drafts.json`** (full draft objects from Wix).

Optional: stub Markdown files per draft (front matter + placeholder body):

```bash
WIX_BLOG_DRAFT_WRITE_MD=1 npm run wix:blog-drafts
```

## Code

- `getWixBlogDraftPosts(limit)` in `lib/wix.js` — same auth rules; returns `[]` if the client cannot call drafts (e.g. OAuth-only public client).

## Fallback

If the API key lacks scopes or the call fails: **Wix Dashboard → Blog → Drafts** and copy/export manually, or publish to a private category on Wix and pull with `queryPosts` (not recommended for sensitive drafts).
