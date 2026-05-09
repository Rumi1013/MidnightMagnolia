import { getDataCollectionItems } from '../../../lib/wix';

export default async function handler(req, res) {
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

    const limitParam = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
    const parsedLimit = Number.parseInt(limitParam, 10);
    const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 100) : 50;

    const items = await getDataCollectionItems(collection, limit);

    return res.status(200).json({
      ok: true,
      collection: collection || process.env.WIX_DATA_COLLECTION_DIGITAL_GRIMOIRE || 'DigitalGrimoire',
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
