-- Magnolia Roots Digital Archive — PLANNED SCHEMA
-- Do not apply until weeks 5–6.
-- Do not replace genealogy_people / genealogy_relationships.
-- Do not seed the Obsidian vault from these tables.

create table if not exists roots_individual (
  id                   text primary key,
  names                text not null,
  birth_date           text,
  death_date           text,
  privacy_status       text not null
    check (privacy_status in ('public', 'internal', 'restricted')),
  verification_status  text not null
    check (verification_status in ('verified', 'probable', 'conflicting', 'unresolved', 'restricted')),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create table if not exists roots_relationship (
  id                  text primary key,
  person_1            text not null references roots_individual(id),
  person_2            text not null references roots_individual(id),
  relationship_type   text,
  evidence_status     text
    check (evidence_status in ('verified', 'probable', 'conflicting', 'unresolved'))
);

create table if not exists roots_place (
  id               text primary key,
  historical_name  text,
  current_name     text,
  county           text,
  state            text,
  country          text,
  coordinates      text
);

create table if not exists roots_source (
  id             text primary key,
  source_type    text,
  title          text,
  repository     text,
  citation       text,
  url_reference  text,
  access_date    date
);

create table if not exists roots_assertion (
  id           text primary key,
  person_id    text not null references roots_individual(id),
  fact_type    text,
  fact_value   text,
  date_place   text,
  confidence   text
    check (confidence in ('verified', 'probable', 'conflicting', 'unresolved')),
  source_id    text references roots_source(id)
);

create table if not exists roots_research_log (
  id                 text primary key,
  research_question  text not null,
  person_family      text,
  source_searched    text,
  finding            text,
  next_step          text,
  logged_on          date
);

create table if not exists roots_contribution (
  id                      text primary key,
  submitter_contact       text,
  submitter_relationship  text,
  claim                   text,
  attachment_reference    text,
  permission_level        text,
  review_status           text not null default 'pending_review'
);

create table if not exists roots_research_request (
  id              text primary key,
  client_contact  text,
  service_type    text,
  scope           text,
  deadline        date,
  status          text,
  deliverables    text
);

-- Living-person default: restricted unless permission and purpose exist.
-- Public select policies are intentionally omitted until the privacy screen is written.
-- Defense in depth: if this planned file is run early, every table remains inaccessible
-- through the Data API until explicit policies and least-privilege grants are added.
alter table roots_individual       enable row level security;
alter table roots_relationship     enable row level security;
alter table roots_place            enable row level security;
alter table roots_source           enable row level security;
alter table roots_assertion        enable row level security;
alter table roots_research_log     enable row level security;
alter table roots_contribution     enable row level security;
alter table roots_research_request enable row level security;

revoke all on table
  roots_individual,
  roots_relationship,
  roots_place,
  roots_source,
  roots_assertion,
  roots_research_log,
  roots_contribution,
  roots_research_request
from anon, authenticated;
