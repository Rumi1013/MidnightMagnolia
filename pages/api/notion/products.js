// GET /api/notion/products
// Returns the product build tracker from Notion.

import { getProductTracker } from '../../../lib/notion';
import { requireAdmin } from '../../../lib/server/adminAuth';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const products = await getProductTracker();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json(products);
  } catch (err) {
    console.error('[notion/products]', err.message);
    const isConfig = err.message.includes('Missing') || err.message.includes('database ID');
    return res.status(isConfig ? 503 : 500).json({
      error: err.message,
      hint: isConfig ? 'Add NOTION_DB_PRODUCT_TRACKER to .env.local.' : 'Notion API error.',
    });
  }
}
