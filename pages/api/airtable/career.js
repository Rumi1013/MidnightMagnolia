// pages/api/airtable/career.js
// Writing / Creative base (appiZEJmrbIH4lVvE)
// Covers: posts, manuscripts, manuscript tasks, books, resumes, opportunities, income
//
// GET  /api/airtable/career?table=<name>[&params]
// PATCH /api/airtable/career  body: { table, id, ...fields }

import {
  getPosts,
  getManuscripts,
  getManuscriptTasks,
  getBooks,
  getResumes,
  getOpportunities,
  getIncomeTracking,
  updateOpportunity,
  updateResume,
  updateManuscriptTask,
} from '../../../lib/airtable';

const FETCHERS = {
  posts:            (q) => getPosts({ status: q.status, type: q.type }),
  manuscripts:      ()  => getManuscripts(),
  manuscriptTasks:  (q) => getManuscriptTasks({ manuscriptId: q.manuscriptId }),
  books:            ()  => getBooks(),
  resumes:          ()  => getResumes(),
  opportunities:    (q) => getOpportunities({ status: q.status, track: q.track }),
  income:           (q) => getIncomeTracking({ limit: parseInt(q.limit ?? '12', 10) }),
};

const UPDATERS = {
  opportunities:   updateOpportunity,
  resumes:         updateResume,
  manuscriptTasks: updateManuscriptTask,
};

export default async function handler(req, res) {
  try {
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
    console.error('[api/airtable/career]', err.message);
    res.status(500).json({ error: err.message });
  }
}
