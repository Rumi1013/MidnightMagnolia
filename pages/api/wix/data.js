import { getDataCollectionItems } from '../../../lib/wix';
import { requireAdmin } from '../../../lib/server/adminAuth';

function publicCollections() {
  const defaults = [process.env.WIX_DATA_COLLECTION_DIGITAL_GRIMOIRE || 'DigitalGrimoire'];
  const configured = (process.env.WIX_PUBLIC_DATA_COLLECTIONS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return new Set([...defaults, ...configured]);
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
    const resolvedCollection =
      collection || process.env.WIX_DATA_COLLECTION_DIGITAL_GRIMOIRE || 'DigitalGrimoire';

    if (!publicCollections().has(resolvedCollection)) {
      return res.status(403).json({
        ok: false,
        error: 'Collection is not exposed by this API',
      });
    }

    const limitParam = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
    const parsedLimit = Number.parseInt(limitParam, 10);
    const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 100) : 50;

    const items = await getDataCollectionItems(resolvedCollection, limit);

    return res.status(200).json({
      ok: true,
      collection: resolvedCollection,
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
