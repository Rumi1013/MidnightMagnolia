// pages/api/genealogy.js
// REST-style handler for genealogy_people + genealogy_relationships.
// All routes require an authenticated Supabase session (anon key + RLS).
//
// GET  /api/genealogy?type=people[&status=confirmed]
// GET  /api/genealogy?type=person&id=<uuid>
// GET  /api/genealogy?type=relationships&personId=<uuid>
// GET  /api/genealogy?type=subgraph&id=<uuid>[&hops=3]
// GET  /api/genealogy?type=search&q=<string>
// POST /api/genealogy  body: { type:'person'|'relationship', ...fields }
// PATCH /api/genealogy body: { type:'person', id, ...fields }
// DELETE /api/genealogy?type=person&id=<uuid>
// DELETE /api/genealogy?type=relationship&id=<uuid>

import {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
  getRelationships,
  createRelationship,
  deleteRelationship,
  getFamilySubgraph,
  searchPeople,
} from '../../lib/genealogy';
import { requireAdmin } from '../../lib/server/adminAuth';

export default async function handler(req, res) {
  try {
    if (!requireAdmin(req, res)) return;

    const { method } = req;

    if (method === 'GET') {
      const { type, id, personId, status, q, hops } = req.query;

      if (type === 'people')        return res.json(await getPeople({ status }));
      if (type === 'person' && id)  return res.json(await getPerson(id));
      if (type === 'relationships' && personId) return res.json(await getRelationships(personId));
      if (type === 'subgraph' && id) return res.json(await getFamilySubgraph(id, hops ? parseInt(hops, 10) : 3));
      if (type === 'search' && q)   return res.json(await searchPeople(q));

      return res.status(400).json({ error: 'Invalid query params' });
    }

    if (method === 'POST') {
      const { type, ...fields } = req.body;
      if (type === 'person')       return res.status(201).json(await createPerson(fields));
      if (type === 'relationship') return res.status(201).json(await createRelationship(fields));
      return res.status(400).json({ error: 'type must be person or relationship' });
    }

    if (method === 'PATCH') {
      const { type, id, ...fields } = req.body;
      if (type === 'person' && id) return res.json(await updatePerson(id, fields));
      return res.status(400).json({ error: 'type must be person with id' });
    }

    if (method === 'DELETE') {
      const { type, id } = req.query;
      if (type === 'person' && id)       { await deletePerson(id);       return res.status(204).end(); }
      if (type === 'relationship' && id) { await deleteRelationship(id); return res.status(204).end(); }
      return res.status(400).json({ error: 'type must be person or relationship with id' });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[genealogy api]', err);
    res.status(500).json({ error: err.message ?? 'Internal error' });
  }
}
