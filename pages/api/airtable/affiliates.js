// GET  /api/airtable/affiliates        → partner list from Airtable
// PATCH /api/airtable/affiliates       → update partner status/notes
//   body: { id: 'recXXX', status: 'Reached Out', notes: '...' }

import { getAffiliatePartners, updateAffiliate } from '../../../lib/airtable';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const partners = await getAffiliatePartners();
      res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate');
      return res.status(200).json(partners);
    } catch (err) {
      console.error('[airtable/affiliates]', err.message);
      const isConfig = err.message.includes('Missing');
      return res.status(isConfig ? 503 : 500).json({
        error: err.message,
        hint: isConfig ? 'Add AIRTABLE_API_KEY and AIRTABLE_BASE_ID to .env.local.' : 'Airtable API error.',
      });
    }
  }

  if (req.method === 'PATCH') {
    const { id, status, notes } = req.body;
    if (!id) return res.status(400).json({ error: 'Record id is required' });

    const fields = {};
    if (status !== undefined) fields['Status'] = status;
    if (notes  !== undefined) fields['Notes']  = notes;

    try {
      const updated = await updateAffiliate(id, fields);
      return res.status(200).json({ id: updated.id, fields: updated.fields });
    } catch (err) {
      console.error('[airtable/affiliates PATCH]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
