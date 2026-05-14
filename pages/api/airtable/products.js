import { getProducts } from '../../../lib/airtable';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_OPS_BASE_ID) {
    return res.status(200).json({ connected: false, data: null });
  }

  try {
    const rows = await getProducts();
    const data = rows.map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.code,
      wholesale: null,
      retail: p.price,
      status: p.buildStage,
      notes: p.notes,
    }));
    return res.status(200).json({ connected: true, data });
  } catch (e) {
    return res.status(200).json({
      connected: false,
      data: null,
      error: e?.message ?? 'Airtable request failed',
    });
  }
}
