import {
  getAirtableConfig,
  listRecords,
  updateRecord,
  affiliatesTable,
} from '../../../lib/airtable';

export default async function handler(req, res) {
  const cfg = getAirtableConfig();

  const mapRecords = (records) =>
    records.map((rec) => {
      const fields = rec.fields ?? {};
      return {
        id: rec.id,
        name: fields['Name'] ?? '',
        tier: typeof fields['Tier'] === 'number' ? fields['Tier'] : 0,
        score: typeof fields['Score'] === 'number' ? fields['Score'] : 0,
        contact: fields['Contact'] ?? '',
        action: fields['Action'] ?? '',
        commission: fields['Commission'] ?? '',
        status: fields['Status'] ?? 'Not Contacted',
      };
    });

  if (req.method === 'GET') {
    if (!cfg.ok) {
      return res.status(200).json({ connected: false, data: null });
    }
    try {
      const records = await listRecords(cfg, affiliatesTable());
      return res.status(200).json({ connected: true, data: mapRecords(records) });
    } catch (e) {
      return res.status(200).json({
        connected: false,
        data: null,
        error: e?.message ?? 'Airtable request failed',
      });
    }
  }

  if (req.method === 'PATCH') {
    if (!cfg.ok) {
      return res.status(400).json({ error: 'Airtable not configured' });
    }
    const { id, status } = req.body ?? {};
    if (!id || status == null) {
      return res.status(400).json({ error: 'id and status are required' });
    }
    try {
      await updateRecord(cfg, affiliatesTable(), id, { Status: status });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e?.message ?? 'Update failed' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
