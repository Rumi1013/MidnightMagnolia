import { getWixEvents } from '../../../lib/wix';
import { requireAdmin } from '../../../lib/server/adminAuth';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const limitParam = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
    const parsedLimit = Number.parseInt(limitParam, 10);
    const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 100) : 10;

    const events = await getWixEvents(limit);

    return res.status(200).json({
      ok: true,
      total: events.length,
      items: events,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error?.message || 'Failed to fetch Wix events',
    });
  }
}
