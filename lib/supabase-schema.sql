-- ── Midnight Magnolia · Dashboard Schema ─────────────────────
-- Run in: Supabase → SQL Editor → New Query
-- Safe to re-run: drops triggers/policies by name before recreating;
-- dashboard_tasks + affiliate_partners seeds use ON CONFLICT DO NOTHING.

-- ── Tasks table ───────────────────────────────────────────────
create table if not exists dashboard_tasks (
  id          text        primary key,          -- e.g. 'p1', 'nav-shop'
  category    text        not null,             -- 'product' | 'commerce' | 'site'
  label       text        not null,
  priority    text        not null default 'medium', -- 'critical' | 'high' | 'medium'
  done        boolean     not null default false,
  price       text,                             -- optional, e.g. '$9'
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at on every row change
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists dashboard_tasks_updated_at on dashboard_tasks;
create trigger dashboard_tasks_updated_at
  before update on dashboard_tasks
  for each row execute procedure set_updated_at();

-- ── Affiliate partners table ───────────────────────────────────
create table if not exists affiliate_partners (
  id          serial      primary key,
  name        text        not null,
  tier        integer     not null,             -- 1 | 2 | 3
  score       text        not null,             -- '10/10'
  action      text        not null,
  contact     text        not null,
  contacted   boolean     not null default false,
  notes       text,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now()
);

-- Canonical seed list is keyed by display name (one row per partner).
create unique index if not exists affiliate_partners_name_uidx
  on affiliate_partners (name);

-- ── Row-level security (dashboard is private) ─────────────────
alter table dashboard_tasks    enable row level security;
alter table affiliate_partners enable row level security;

-- Allow all operations for authenticated users only
drop policy if exists "auth users full access" on dashboard_tasks;
create policy "auth users full access" on dashboard_tasks
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth users full access" on affiliate_partners;
create policy "auth users full access" on affiliate_partners
  for all using (auth.role() = 'authenticated');

-- ── Seed: Tasks ───────────────────────────────────────────────
insert into dashboard_tasks (id, category, label, priority, done, price, sort_order) values
-- Products
('p1', 'product', 'The Gentle Beginning (FREE) — Design in Canva + upload to Gumroad', 'critical', false, 'Free',    1),
('p4', 'product', 'Magnolia Circle ($9/mo) — Set up membership tier + welcome email',     'critical', false, '$9/mo',   2),
('p2', 'product', 'Shadow Work Starter Kit ($9) — Build 30 prompts + design + publish',   'critical', false, '$9',      3),
('p3', 'product', 'Ancestral Healing Journal ($19) — Build + design + publish',            'high',     false, '$19',     4),
('p5', 'product', 'Creative Foundations Workbook ($29) — Build 7 modules + publish',       'high',     false, '$29',     5),
('p6', 'product', 'Deep Roots Shadow Work System ($49) — Bundle + Integration Guide',     'medium',   false, '$49',     6),
-- Commerce (Gumroad + BMAC)
('s1', 'commerce', 'Configure Gumroad profile (photo, bio, brand colors)',     'critical', false, null, 1),
('s2', 'commerce', 'Set up 3-email welcome sequence for freebie (Day 0, 3, 7)', 'high',     false, null, 2),
('s3', 'commerce', 'Set up Magnolia Circle onboarding email on BMAC',          'high',     false, null, 3),
('s4', 'commerce', 'Add upsell offers on Gumroad product pages',               'medium',   false, null, 4),
('s5', 'commerce', 'Publish 1:1 Creative Strategy Session booking ($97–$147)', 'medium',   false, null, 5),
-- Site
('site-footer-wix',   'site', 'Remove Wix-branded footer social links',             'critical', false, null,  1),
('site-nav-shop',     'site', 'Confirm Shop nav → Gumroad URL',                      'critical', false, null,  2),
('site-nav-about',    'site', 'Fix About nav link (build page or redirect)',         'critical', false, null,  3),
('site-nav-contact',  'site', 'Fix Contact nav link',                                'critical', false, null,  4),
('site-nav-grimoire', 'site', 'Fix Grimoire submenu links (all point to homepage)',  'critical', false, null,  5),
('site-sanctuary',    'site', 'Rebuild The Sanctuary page (remove all placeholders)','critical', false, null,  6),
('site-library',      'site', 'Rebuild The Library page (choose Option A/B/C)',      'critical', false, null,  7),
('site-about',        'site', 'Build standalone About page',                         'high',     false, null,  8),
('site-email',        'site', 'Add email capture form above fold on homepage',       'high',     false, null,  9),
('site-grimoire-pg',  'site', 'Build The Grimoire page (gated with email optin)',    'high',     false, null, 10),
('site-blog-rename',  'site', 'Rename "Blog" to "Dusk Letters" in nav',             'high',     false, null, 11),
('site-legal',        'site', 'Audit legal pages for placeholder content',           'high',     false, null, 12),
('site-mobile',       'site', 'Full mobile audit — every page on iPhone',            'medium',   false, null, 13)
on conflict (id) do nothing;

-- Rehome existing commerce-setup rows (ids s1–s5 were seeded under an old category)
update dashboard_tasks set category = 'commerce', label = 'Configure Gumroad profile (photo, bio, brand colors)' where id = 's1';
update dashboard_tasks set category = 'commerce', label = 'Set up 3-email welcome sequence for freebie (Day 0, 3, 7)' where id = 's2';
update dashboard_tasks set category = 'commerce', label = 'Set up Magnolia Circle onboarding email on BMAC' where id = 's3';
update dashboard_tasks set category = 'commerce', label = 'Add upsell offers on Gumroad product pages' where id = 's4';
update dashboard_tasks set category = 'commerce', label = 'Publish 1:1 Creative Strategy Session booking ($97–$147)' where id = 's5';
update dashboard_tasks set label = 'The Gentle Beginning (FREE) — Design in Canva + upload to Gumroad' where id = 'p1';
update dashboard_tasks set label = 'Confirm Shop nav → Gumroad URL' where id = 'site-nav-shop';

-- ── Seed: Affiliate Partners ──────────────────────────────────
insert into affiliate_partners (name, tier, score, action, contact, sort_order) values
('Neurodivergent Rebel',    1, '10/10', 'Email Lyric Rivera — mention shared ND values',         'neurodivergentrebel.com/contact',   1),
('Sober Black Girls Club',  1, '10/10', 'Send custom email — highest priority partner',          'info@soberblackgirlsclub.com',      2),
('Neurodivergent Insights', 1, '9/10',  'Email Dr. Megan Anna Neff — clinical alignment angle',  'neurodivergentinsights.com/contact',3),
('Balanced Black Girl',     1, '9/10',  'Email — Southern roots + sisterhood framing',           'info@balancedblackgirl.com',        4),
('Ancestry.com',            1, '9/10',  'Apply via Partnerize — 10% DNA kits, 20% subscriptions','ancestry.com/c/affiliates',         5),
('MyHeritage',              1, '9/10',  'Apply via Impact/Awin — African diaspora angle',        'myheritage.com/affiliates',         6),
('Served Up Sober',         1, '9/10',  'DM on Instagram first, then email',                    'servedupsober.com/contact',         7),
('Sacred Bombshell',        2, '8/10',  'Email Abiola Abrams — Southern Gothic healing angle',   'abiola@sacredbombshell.com',        8),
('Brown Girl Self-Care',    2, '8/10',  'Open with sisterhood. DM on Instagram first',          '@browngirls_selfcare',              9),
('The Sober Curator',       2, '8/10',  'Submit guest essay first, then pitch partnership',     'thesobercurator.com/contact',      10)
on conflict (name) do nothing;

-- ═══════════════════════════════════════════════════════════════
-- ── Genealogy Research Tables ──────────────────────────────────
-- Black ancestral research: people, relationships, source records
-- Run after the dashboard tables above
-- ═══════════════════════════════════════════════════════════════

-- ── People ────────────────────────────────────────────────────
create table if not exists genealogy_people (
  id              uuid        primary key default gen_random_uuid(),

  -- Name
  first_name      text        not null,
  last_name       text        not null,
  maiden_name     text,                         -- pre-marriage surname
  other_names     text[],                       -- nicknames, aliases, enslaved name variants

  -- Vitals
  birth_date      text,                         -- text to accommodate approx. dates ('c.1840', 'Abt 1852')
  birth_location  text,                         -- county, state
  death_date      text,
  death_location  text,
  gender          text,                         -- 'female' | 'male' | 'unknown'

  -- Archival context
  status          text        not null default 'research',
                                                -- 'confirmed' | 'research' | 'speculative'
  source_records  jsonb       not null default '[]'::jsonb,
                                                -- [{type:'Freedmen Bureau',citation:'...',url:'...'}]
  photo_url       text,
  notes           text,

  -- Timestamps
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Relationships ─────────────────────────────────────────────
-- Directed edge: person_a → person_b with a named role.
-- To express "Alice is parent of Bob": person_a=Alice, person_b=Bob, type='parent'
create table if not exists genealogy_relationships (
  id              uuid        primary key default gen_random_uuid(),
  person_a_id     uuid        not null references genealogy_people(id) on delete cascade,
  person_b_id     uuid        not null references genealogy_people(id) on delete cascade,
  relationship    text        not null,          -- 'parent' | 'spouse' | 'sibling' | 'enslaver' | 'witness'
  start_date      text,                          -- marriage date, etc.
  end_date        text,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- Prevent exact duplicate edges
  unique (person_a_id, person_b_id, relationship)
);

-- ── Indexes ───────────────────────────────────────────────────
create index if not exists genealogy_people_last_name_idx
  on genealogy_people (last_name);

create index if not exists genealogy_people_status_idx
  on genealogy_people (status);

create index if not exists genealogy_relationships_a_idx
  on genealogy_relationships (person_a_id);

create index if not exists genealogy_relationships_b_idx
  on genealogy_relationships (person_b_id);

-- ── updated_at automation ─────────────────────────────────────
-- Reuses set_updated_at() defined above for dashboard_tasks

drop trigger if exists genealogy_people_updated_at on genealogy_people;
create trigger genealogy_people_updated_at
  before update on genealogy_people
  for each row execute procedure set_updated_at();

drop trigger if exists genealogy_relationships_updated_at on genealogy_relationships;
create trigger genealogy_relationships_updated_at
  before update on genealogy_relationships
  for each row execute procedure set_updated_at();

-- ── Row-level security ────────────────────────────────────────
alter table genealogy_people        enable row level security;
alter table genealogy_relationships enable row level security;

drop policy if exists "auth users full access" on genealogy_people;
create policy "auth users full access" on genealogy_people
  for all using (auth.role() = 'authenticated');

drop policy if exists "auth users full access" on genealogy_relationships;
create policy "auth users full access" on genealogy_relationships
  for all using (auth.role() = 'authenticated');

-- ── Helper function: full family subgraph for one person ──────
-- Returns all people connected within 3 hops (for family tree views)
create or replace function get_family_subgraph(root_id uuid, max_hops int default 3)
returns table (
  person_id uuid,
  hop       int
) language sql stable as $$
  with recursive family(person_id, hop) as (
    select root_id, 0
    union
    select
      case
        when r.person_a_id = f.person_id then r.person_b_id
        else r.person_a_id
      end,
      f.hop + 1
    from family f
    join genealogy_relationships r
      on r.person_a_id = f.person_id or r.person_b_id = f.person_id
    where f.hop < max_hops
  )
  select distinct person_id, min(hop) as hop
  from family
  group by person_id
$$;

-- ── Columns used by scripts/seed-genealogy.mjs (Airtable exports) ──
-- Run once if you created genealogy tables before this block existed.
alter table genealogy_people add column if not exists ancestry_id text;
alter table genealogy_people add column if not exists is_vincent_line boolean not null default false;
alter table genealogy_people add column if not exists is_caswell_county boolean not null default false;
alter table genealogy_people add column if not exists child_of_family text;
alter table genealogy_people add column if not exists spouse_families text;
create unique index if not exists genealogy_people_ancestry_id_uidx on genealogy_people (ancestry_id);
