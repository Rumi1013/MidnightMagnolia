// GET /api/notion/content
// Returns content calendar + Dusk Letters drafts from Notion.
// Responses are cached for 5 min via Cache-Control to avoid hammering the API.

import { getContentCalendar, getDuskLettersDrafts } from '../../../lib/notion';
import { requireAdmin } from '../../../lib/server/adminAuth';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const [calendar, duskLetters] = await Promise.all([
      getContentCalendar(),
      getDuskLettersDrafts(),
    ]);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json({ calendar, duskLetters });
  } catch (err) {
    console.error('[notion/content]', err.message);
    // Distinguish config errors from API errors
    const isConfig = err.message.includes('Missing') || err.message.includes('database ID');
    return res.status(isConfig ? 503 : 500).json({
      error: err.message,
      hint: isConfig
        ? 'Add NOTION_TOKEN and NOTION_DB_* env vars to .env.local, then restart the server.'
        : 'Notion API error — check your token permissions.',
    });
  }
}
