/**
 * Wix Blog — draft posts export
 * ------------------------------
 * Writes JSON for editing off-Wix (Notion, Airtable, git).
 * **Requires WIX_API_KEY + WIX_SITE_ID** in .env.local.
 * Public OAuth client ID alone cannot list drafts.
 *
 *   npm run wix:blog-drafts
 *   WIX_BLOG_DRAFT_WRITE_MD=1 npm run wix:blog-drafts   # optional .md stubs
 */

import fs from 'node:fs';
import path from 'node:path';
import { createClient, OAuthStrategy, ApiKeyStrategy } from '@wix/sdk';
import { draftPosts } from '@wix/blog';

const apiKey = process.env.WIX_API_KEY;
const siteId = process.env.WIX_SITE_ID;
const clientId = process.env.WIX_CLIENT_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID;

let auth;
let mode;
if (apiKey && siteId && apiKey !== 'your_wix_api_key_here' && siteId !== 'your_wix_site_id_here') {
  auth = ApiKeyStrategy({ apiKey, siteId });
  mode = 'API key (authenticated)';
} else if (clientId && clientId !== 'your_wix_client_id_here') {
  auth = OAuthStrategy({ clientId });
  mode = 'OAuth client ID only (draft list usually fails — set WIX_API_KEY + WIX_SITE_ID)';
} else {
  console.error('No Wix credentials. Set WIX_API_KEY+WIX_SITE_ID for draft export.');
  process.exit(1);
}

console.log(`Auth mode: ${mode}\n`);

const wix = createClient({
  modules: { draftPosts },
  auth,
});

function slugify(title, id) {
  const base = String(title || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  return base || id.slice(0, 8);
}

async function main() {
  const limit = Math.min(Number(process.env.WIX_BLOG_DRAFT_LIMIT) || 100, 100);
  let res;
  try {
    res = await wix.draftPosts.listDraftPosts({
      paging: { limit, offset: 0 },
    });
  } catch (err) {
    console.error('listDraftPosts failed:', err?.message || err);
    console.error('\nFallback: Wix Dashboard → Blog → Drafts → copy or export from editor.');
    process.exit(1);
  }

  const drafts = res.draftPosts || [];
  const outDir = path.join(process.cwd(), 'data');
  const jsonPath = path.join(outDir, 'wix-blog-drafts.json');
  const mdDir = path.join(outDir, 'wix-blog-drafts-md');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        count: drafts.length,
        metaData: res.metaData ?? null,
        drafts,
      },
      null,
      2,
    ),
    'utf8',
  );
  console.log(`Wrote ${jsonPath} (${drafts.length} draft(s))`);

  if (drafts.length && process.env.WIX_BLOG_DRAFT_WRITE_MD === '1') {
    if (!fs.existsSync(mdDir)) fs.mkdirSync(mdDir, { recursive: true });
    for (const d of drafts) {
      const slug = slugify(d.title, d._id);
      const mdPath = path.join(mdDir, `${slug}.md`);
      const front = `---\nwixDraftId: ${d._id}\ntitle: ${JSON.stringify(d.title || '')}\nstatus: ${JSON.stringify(d.status || '')}\n---\n\n`;
      fs.writeFileSync(
        mdPath,
        `${front}_Body lives in Wix rich content — open \`data/wix-blog-drafts.json\` for this id or paste from the Wix editor._\n`,
        'utf8',
      );
    }
    console.log(`Wrote Markdown stubs under ${mdDir}/`);
  }
}

main();
