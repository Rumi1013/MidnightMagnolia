#!/usr/bin/env node
// scripts/seed-genealogy.mjs
// Seeds genealogy_people (939 rows) and genealogy_relationships from the CSV exports.
//
// Usage:
//   node scripts/seed-genealogy.mjs
//
// Requires .env.local to export:
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   ← service role bypasses RLS for bulk inserts

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load env vars ──────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) throw new Error('Missing .env.local');
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...rest] = line.split('=');
    if (k && rest.length) process.env[k.trim()] = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
  });
}
loadEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// ── CSV parser ─────────────────────────────────────────────────
function parseCSV(filePath) {
  const text  = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = [];
    let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { vals.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    vals.push(cur.trim());
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']));
  });
}

// ── Batch insert helper ────────────────────────────────────────
async function batchInsert(table, rows, batchSize = 200) {
  let inserted = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from(table).upsert(batch, { onConflict: 'id' });
    if (error) {
      console.error(`  ✗ batch ${i}–${i + batch.length}:`, error.message);
    } else {
      inserted += batch.length;
      process.stdout.write(`  ✓ ${inserted}/${rows.length}\r`);
    }
  }
  console.log(`\n  Done — ${inserted} rows into ${table}`);
}

// ── Map gender ─────────────────────────────────────────────────
function mapGender(sex) {
  if (sex === 'Male')   return 'male';
  if (sex === 'Female') return 'female';
  return 'unknown';
}

// ── Map status ─────────────────────────────────────────────────
function mapStatus(status) {
  return status === 'Deceased' ? 'confirmed' : 'research';
}

// ── Seed individuals ───────────────────────────────────────────
async function seedPeople() {
  console.log('\n▸ Seeding genealogy_people…');
  const rows = parseCSV(path.join(__dirname, '..', '..', '..', 'completeairtable', 'FT_Individuals.csv'));

  const people = rows.map(r => ({
    // No id — let Supabase generate UUID; use upsert on ancestry_id
    ancestry_id:       r['Individual ID'] || null,
    first_name:        r['Given Name']    || r['Full Name']?.split(' ')[0] || 'Unknown',
    last_name:         r['Surname']       || r['Full Name']?.split(' ').slice(1).join(' ') || '—',
    gender:            mapGender(r['Sex']),
    birth_date:        r['Birth Date']    || null,
    birth_location:    r['Birth Place']   || null,
    death_date:        r['Death Date']    || null,
    death_location:    r['Death Place']   || null,
    status:            mapStatus(r['Status']),
    is_vincent_line:   r['Is Vincent Line']   === 'Yes',
    is_caswell_county: r['Is Caswell County'] === 'Yes',
    child_of_family:   r['Child of Family']   || null,
    spouse_families:   r['Spouse Families']   || null,
    notes:             [
      r['Residence Notes'] ? `Residence: ${r['Residence Notes']}` : '',
      r['Research Notes']  ? `Research: ${r['Research Notes']}`   : '',
    ].filter(Boolean).join('\n') || null,
    source_records:    r['Ancestry URL']
      ? JSON.stringify([{ type: 'Ancestry', url: r['Ancestry URL'], citation: r['Full Name'] }])
      : '[]',
  }));

  // Upsert on ancestry_id to allow re-runs
  let inserted = 0;
  const batchSize = 100;
  for (let i = 0; i < people.length; i += batchSize) {
    const batch = people.slice(i, i + batchSize);
    const { error } = await supabase
      .from('genealogy_people')
      .upsert(batch, { onConflict: 'ancestry_id', ignoreDuplicates: false });
    if (error) {
      console.error(`  ✗ batch ${i}:`, error.message);
    } else {
      inserted += batch.length;
      process.stdout.write(`  ✓ ${inserted}/${people.length}\r`);
    }
  }
  console.log(`\n  Done — ${inserted} rows into genealogy_people`);
}

// ── Seed relationships from Families CSV ───────────────────────
async function seedRelationships() {
  console.log('\n▸ Seeding genealogy_relationships…');

  // Build ancestry_id → uuid map
  const { data: people, error: pErr } = await supabase
    .from('genealogy_people')
    .select('id, ancestry_id')
    .not('ancestry_id', 'is', null);
  if (pErr) { console.error('Could not load people:', pErr.message); return; }

  const idMap = Object.fromEntries(people.map(p => [p.ancestry_id, p.id]));

  const families = parseCSV(path.join(__dirname, '..', '..', '..', 'completeairtable', 'FT_Families.csv'));

  const relationships = [];

  for (const fam of families) {
    const famId      = fam['Family ID'];
    const husbandId  = fam['Husband ID']  ? idMap[fam['Husband ID']]  : null;
    const wifeId     = fam['Wife ID']     ? idMap[fam['Wife ID']]     : null;
    const childIds   = fam['Children IDs']
      ? fam['Children IDs'].split('|').map(s => s.trim()).filter(Boolean).map(id => idMap[id]).filter(Boolean)
      : [];

    // Spouse relationship
    if (husbandId && wifeId) {
      relationships.push({
        person_a_id:      husbandId,
        person_b_id:      wifeId,
        relationship:     'spouse',
        start_date:       fam['Marriage Date'] || null,
        end_date:         fam['Divorce Date']  || null,
        notes:            fam['Marriage Place'] ? `Married: ${fam['Marriage Place']}` : null,
        source_family_id: famId,
      });
    }

    // Parent → child relationships
    for (const childUuid of childIds) {
      if (husbandId) {
        relationships.push({
          person_a_id:      husbandId,
          person_b_id:      childUuid,
          relationship:     'parent',
          source_family_id: famId,
        });
      }
      if (wifeId) {
        relationships.push({
          person_a_id:      wifeId,
          person_b_id:      childUuid,
          relationship:     'parent',
          source_family_id: famId,
        });
      }
    }
  }

  console.log(`  Built ${relationships.length} relationship records`);

  // Upsert — unique constraint is (person_a_id, person_b_id, relationship)
  let inserted = 0;
  const batchSize = 200;
  for (let i = 0; i < relationships.length; i += batchSize) {
    const batch = relationships.slice(i, i + batchSize);
    const { error } = await supabase
      .from('genealogy_relationships')
      .upsert(batch, { onConflict: 'person_a_id,person_b_id,relationship', ignoreDuplicates: true });
    if (error) {
      console.error(`  ✗ batch ${i}:`, error.message);
    } else {
      inserted += batch.length;
      process.stdout.write(`  ✓ ${inserted}/${relationships.length}\r`);
    }
  }
  console.log(`\n  Done — ${inserted} rows into genealogy_relationships`);
}

// ── Run ────────────────────────────────────────────────────────
(async () => {
  console.log('╔══ Midnight Magnolia · Genealogy Seed ══╗');
  try {
    await seedPeople();
    await seedRelationships();
    console.log('\n✅ Seed complete.');
  } catch (err) {
    console.error('\n✗ Fatal:', err.message);
    process.exit(1);
  }
})();
