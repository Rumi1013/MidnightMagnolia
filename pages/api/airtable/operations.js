// pages/api/airtable/operations.js
// Midnight Operations base (appj7TCIoDQke9S7d) — all tables by stable ID
//
// GET  /api/airtable/operations?table=<name>[&params]
// PATCH /api/airtable/operations  body: { table, id, ...fields }

import {
  getProducts,
  getServices,
  getContentItems,
  getSalesLog,
  getContacts,
  getAffiliates,
  getAffiliatePipeline,
  getPatreonMembers,
  getSocialLinks,
  updateAffiliate,
  updateAffiliatePipe,
  updateContentItem,
  updateProduct,
  updateService,
} from '../../../lib/airtable';
import { requireAdmin } from '../../../lib/server/adminAuth';

const FETCHERS = {
  products:         (q) => getProducts({ liveOnly: q.liveOnly === 'true' }),
  services:         (q) => getServices({ liveOnly: q.liveOnly === 'true' }),
  content:          (q) => getContentItems({ excludePublished: q.all !== 'true' }),
  sales:            (q) => getSalesLog({ month: q.month }),
  contacts:         (q) => getContacts({ status: q.status }),
  affiliates:       ()  => getAffiliates(),
  affiliatePipeline:(q) => getAffiliatePipeline({ status: q.status }),
  patreon:          (q) => getPatreonMembers({ status: q.status ?? 'Active' }),
  socialLinks:      (q) => getSocialLinks({ status: q.status }),
};

const UPDATERS = {
  affiliates:        updateAffiliate,
  affiliatePipeline: updateAffiliatePipe,
  content:           updateContentItem,
  products:          updateProduct,
  services:          updateService,
};

export default async function handler(req, res) {
  try {
    if (!requireAdmin(req, res)) return;

    if (req.method === 'GET') {
      const { table, ...q } = req.query;
      const fetcher = FETCHERS[table];
      if (!fetcher) return res.status(400).json({ error: `Unknown table: ${table}. Valid: ${Object.keys(FETCHERS).join(', ')}` });
      return res.json(await fetcher(q));
    }

    if (req.method === 'PATCH') {
      const { table, id, ...fields } = req.body ?? {};
      const updater = UPDATERS[table];
      if (!updater) return res.status(400).json({ error: `Cannot update table: ${table}` });
      if (!id)      return res.status(400).json({ error: 'id required' });
      const result = await updater(id, fields);
      return res.json({ id: result.id, fields: result.fields });
    }

    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/airtable/operations]', err.message);
    res.status(500).json({ error: err.message });
  }
}
