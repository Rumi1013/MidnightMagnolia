import { getDataCollectionItems } from '../../../lib/wix';
import { requireAdmin } from '../../../lib/server/adminAuth';

function publicCollections() {
  const configured = (process.env.WIX_PUBLIC_DATA_COLLECTIONS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return new Set(configured);
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const collectionParam = Array.isArray(req.query.collection)
      ? req.query.collection[0]
      : req.query.collection;
    const collection =
      typeof collectionParam === 'string' && collectionParam.trim().length > 0
        ? collectionParam.trim()
        : undefined;

    if (!collection) {
      return res.status(400).json({
        ok: false,
        error: 'collection query param is required',
      });
    }

    const allowed = publicCollections();
    if (allowed.size === 0 || !allowed.has(collection)) {
      return res.status(403).json({
        ok: false,
        error: 'Collection is not exposed by this API. Set WIX_PUBLIC_DATA_COLLECTIONS.',
      });
    }

    const limitParam = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
    const parsedLimit = Number.parseInt(limitParam, 10);
    const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 100) : 50;

    const items = await getDataCollectionItems(collection, limit);

    return res.status(200).json({
      ok: true,
      collection,
      total: items.length,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error?.message || 'Failed to fetch Wix data items',
    });
  }
}
