import {
  getAirtableConfig,
  listRecords,
  updateRecord,
  pipelineTable,
} from '../../../lib/airtable';

function normalizePlatform(platform) {
  if (platform == null) return [];
  if (Array.isArray(platform)) return platform.map(String).filter(Boolean);
  return String(platform)
    .split(/\s*[;,]\s*/)
    .filter(Boolean);
}

export default async function handler(req, res) {
  const cfg = getAirtableConfig();

  const mapRecords = (records) =>
    records.map((rec) => {
      const fields = rec.fields ?? {};
      return {
        id: rec.id,
        title: fields['Title'] ?? '',
        type:
          typeof fields['Type'] === 'string'
            ? fields['Type']
            : fields['Type']?.name ?? '',
        platform: normalizePlatform(fields['Platform']),
        isAffiliate: !!fields['Affiliate'],
        publishDate: fields['Publish Date'] ?? null,
        status: fields['Status'] ?? 'Idea',
      };
    });

  if (req.method === 'GET') {
    if (!cfg.ok) {
      return res.status(200).json({ connected: false, data: null });
    }
    try {
      const records = await listRecords(cfg, pipelineTable());
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
      await updateRecord(cfg, pipelineTable(), id, { Status: status });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e?.message ?? 'Update failed' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
