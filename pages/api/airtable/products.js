import { getAirtableConfig, listRecords, productsTable } from '../../../lib/airtable';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const cfg = getAirtableConfig();
  if (!cfg.ok) {
    return res.status(200).json({ connected: false, data: null });
  }

  try {
    const records = await listRecords(cfg, productsTable());
    const data = records.map((rec) => {
      const fields = rec.fields ?? {};
      return {
        id: rec.id,
        name: fields['Name'] ?? '',
        sku: fields['SKU'] ?? '',
        wholesale: fields['Wholesale'] ?? null,
        retail: fields['Retail'] ?? null,
        status: fields['Status'] ?? '',
        notes: fields['Notes'] ?? '',
      };
    });
    return res.status(200).json({ connected: true, data });
  } catch (e) {
    return res.status(200).json({
      connected: false,
      data: null,
      error: e?.message ?? 'Airtable request failed',
    });
  }
}
