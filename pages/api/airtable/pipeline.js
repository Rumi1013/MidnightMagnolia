// GET  /api/airtable/pipeline          → content pipeline (unpublished)
// PATCH /api/airtable/pipeline         → update a content item's status
//   body: { id: 'recXXX', status: 'Ready' }

import { getContentPipeline, updateContentItem } from '../../../lib/airtable';
import { requireAdmin } from '../../../lib/server/adminAuth';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    try {
      const pipeline = await getContentPipeline();
      res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate');
      return res.status(200).json(pipeline);
    } catch (err) {
      console.error('[airtable/pipeline]', err.message);
      const isConfig = err.message.includes('Missing');
      return res.status(isConfig ? 503 : 500).json({
        error: err.message,
        hint: isConfig ? 'Add AIRTABLE_API_KEY and AIRTABLE_BASE_ID to .env.local.' : 'Airtable API error.',
      });
    }
  }

  if (req.method === 'PATCH') {
    const { id, ...fields } = req.body;
    if (!id) return res.status(400).json({ error: 'Record id is required' });

    // Map dashboard-friendly field names to Airtable field names
    const airtableFields = {};
    if (fields.status)      airtableFields['Status']       = fields.status;
    if (fields.publishDate) airtableFields['Publish Date'] = fields.publishDate;
    if (fields.notes)       airtableFields['Notes']        = fields.notes;

    try {
      const updated = await updateContentItem(id, airtableFields);
      return res.status(200).json({ id: updated.id, fields: updated.fields });
    } catch (err) {
      console.error('[airtable/pipeline PATCH]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
