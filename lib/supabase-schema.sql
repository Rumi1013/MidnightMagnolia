-- ── Midnight Magnolia · Dashboard Schema ─────────────────────
-- Run this entire file in: Supabase > SQL Editor > New Query

-- ── Tasks table ───────────────────────────────────────────────
create table if not exists dashboard_tasks (
  id          text        primary key,          -- e.g. 'p1', 'nav-shop'
  category    text        not null,             -- 'product' | 'stan' | 'site'
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

-- ── Row-level security (dashboard is private) ─────────────────
alter table dashboard_tasks    enable row level security;
alter table affiliate_partners enable row level security;

-- Allow all operations for authenticated users only
create policy "auth users full access" on dashboard_tasks
  for all using (auth.role() = 'authenticated');

create policy "auth users full access" on affiliate_partners
  for all using (auth.role() = 'authenticated');

-- ── Seed: Tasks ───────────────────────────────────────────────
insert into dashboard_tasks (id, category, label, priority, done, price, sort_order) values
-- Products
('p1', 'product', 'The Gentle Beginning (FREE) — Design in Canva + upload to Stan Store', 'critical', false, 'Free',    1),
('p4', 'product', 'Magnolia Circle ($9/mo) — Set up membership tier + welcome email',     'critical', false, '$9/mo',   2),
('p2', 'product', 'Shadow Work Starter Kit ($9) — Build 30 prompts + design + publish',   'critical', false, '$9',      3),
('p3', 'product', 'Ancestral Healing Journal ($19) — Build + design + publish',            'high',     false, '$19',     4),
('p5', 'product', 'Creative Foundations Workbook ($29) — Build 7 modules + publish',       'high',     false, '$29',     5),
('p6', 'product', 'Deep Roots Shadow Work System ($49) — Bundle + Integration Guide',     'medium',   false, '$49',     6),
-- Stan Store
('s1', 'stan', 'Configure Stan Store profile (photo, bio, brand colors)',   'critical', false, null, 1),
('s2', 'stan', 'Set up 3-email welcome sequence for freebie (Day 0, 3, 7)', 'high',     false, null, 2),
('s3', 'stan', 'Set up Magnolia Circle onboarding email',                   'high',     false, null, 3),
('s4', 'stan', 'Add upsell offers on product pages',                        'medium',   false, null, 4),
('s5', 'stan', 'Publish 1:1 Creative Strategy Session booking ($97–$147)',  'medium',   false, null, 5),
-- Site
('site-footer-wix',   'site', 'Remove Wix-branded footer social links',             'critical', false, null,  1),
('site-nav-shop',     'site', 'Fix Shop nav → Stan Store URL',                       'critical', false, null,  2),
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
on conflict do nothing;
