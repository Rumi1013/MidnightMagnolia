// lib/genealogy.js
// Supabase helpers for genealogy_people + genealogy_relationships tables.
// All writes require an authenticated Supabase client (pass server-side client).

import { supabase } from './supabase';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function assertUuid(value, field = 'id') {
  if (!UUID_RE.test(String(value || ''))) {
    throw new Error(`Invalid ${field}`);
  }
}

function sanitizeSearchTerm(value) {
  return String(value || '').replace(/[%,()]/g, ' ').trim().slice(0, 80);
}

// ── People ─────────────────────────────────────────────────────

export async function getPeople({ status } = {}) {
  let q = supabase
    .from('genealogy_people')
    .select('*')
    .order('last_name')
    .order('first_name');

  if (status) q = q.eq('status', status);

  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getPerson(id) {
  assertUuid(id);
  const { data, error } = await supabase
    .from('genealogy_people')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createPerson(fields) {
  const { data, error } = await supabase
    .from('genealogy_people')
    .insert(fields)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePerson(id, fields) {
  assertUuid(id);
  const { data, error } = await supabase
    .from('genealogy_people')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePerson(id) {
  assertUuid(id);
  const { error } = await supabase
    .from('genealogy_people')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── Relationships ──────────────────────────────────────────────

export async function getRelationships(personId) {
  assertUuid(personId, 'personId');
  const { data, error } = await supabase
    .from('genealogy_relationships')
    .select(`
      *,
      person_a:person_a_id ( id, first_name, last_name, birth_date, death_date ),
      person_b:person_b_id ( id, first_name, last_name, birth_date, death_date )
    `)
    .or(`person_a_id.eq.${personId},person_b_id.eq.${personId}`)
    .order('relationship');

  if (error) throw error;
  return data;
}

export async function createRelationship({ personAId, personBId, relationship, startDate, endDate, notes }) {
  assertUuid(personAId, 'personAId');
  assertUuid(personBId, 'personBId');
  const { data, error } = await supabase
    .from('genealogy_relationships')
    .insert({
      person_a_id: personAId,
      person_b_id: personBId,
      relationship,
      start_date: startDate ?? null,
      end_date: endDate ?? null,
      notes: notes ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteRelationship(id) {
  assertUuid(id);
  const { error } = await supabase
    .from('genealogy_relationships')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── Family subgraph (uses DB function) ────────────────────────
// Returns all people within `hops` degrees of the root person,
// with their full records hydrated.
export async function getFamilySubgraph(rootId, hops = 3) {
  assertUuid(rootId, 'rootId');
  const maxHops = Math.min(Math.max(Number.parseInt(hops, 10) || 3, 1), 6);
  // 1. Get IDs from the recursive DB function
  const { data: nodes, error: fnErr } = await supabase
    .rpc('get_family_subgraph', { root_id: rootId, max_hops: maxHops });
  if (fnErr) throw fnErr;

  const ids = nodes.map(n => n.person_id);
  if (!ids.length) return { people: [], relationships: [] };

  // 2. Fetch full person records
  const { data: people, error: pErr } = await supabase
    .from('genealogy_people')
    .select('*')
    .in('id', ids);
  if (pErr) throw pErr;

  // 3. Fetch all relationships between those people
  const { data: relationships, error: rErr } = await supabase
    .from('genealogy_relationships')
    .select('*')
    .in('person_a_id', ids)
    .in('person_b_id', ids);
  if (rErr) throw rErr;

  return { people, relationships };
}

// ── Search ─────────────────────────────────────────────────────
export async function searchPeople(query) {
  const term = sanitizeSearchTerm(query);
  if (!term) return [];

  const { data, error } = await supabase
    .from('genealogy_people')
    .select('id, first_name, last_name, maiden_name, birth_date, birth_location, status')
    .or(`first_name.ilike.%${term}%,last_name.ilike.%${term}%,maiden_name.ilike.%${term}%`)
    .order('last_name')
    .limit(25);
  if (error) throw error;
  return data;
}
