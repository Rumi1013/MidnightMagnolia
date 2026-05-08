import { getShopProducts } from '../../../lib/wix';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const items = await getShopProducts();

    return res.status(200).json({
      ok: true,
      total: items.length,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error?.message || 'Failed to fetch Wix products',
    });
  }
}
