// lib/genealogy.js
// Supabase helpers for genealogy_people + genealogy_relationships tables.
// All writes require an authenticated Supabase client (pass server-side client).

import { supabase } from './supabase';

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
  const { error } = await supabase
    .from('genealogy_people')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── Relationships ──────────────────────────────────────────────

export async function getRelationships(personId) {
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
  // 1. Get IDs from the recursive DB function
  const { data: nodes, error: fnErr } = await supabase
    .rpc('get_family_subgraph', { root_id: rootId, max_hops: hops });
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
  const { data, error } = await supabase
    .from('genealogy_people')
    .select('id, first_name, last_name, maiden_name, birth_date, birth_location, status')
    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,maiden_name.ilike.%${query}%`)
    .order('last_name')
    .limit(25);
  if (error) throw error;
  return data;
}
