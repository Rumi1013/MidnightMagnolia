-- Magnolia Institute Resource Library
-- Run in: Supabase → SQL Editor after lib/supabase-schema.sql (reuses set_updated_at).
-- Safe to re-run. Does not touch genealogy_* or press_* tables.

create table if not exists institute_category (
  id          text        primary key,
  name        text        unique not null,
  description text,
  created_at  timestamptz not null default now()
);

create table if not exists institute_resource (
  id                text        primary key,
  organization      text        not null,
  program           text,
  description       text        not null,
  website           text,
  phone             text,
  email             text,
  status            text        not null
    check (status in ('pending_review', 'verified', 'review_due', 'archived')),
  classification    text        not null default 'public'
    check (classification in ('public', 'internal', 'restricted')),
  last_verified_on  date,
  next_review_on    date,
  provenance_url    text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists institute_resource_category (
  resource_id  text not null references institute_resource(id) on delete cascade,
  category_id  text not null references institute_category(id) on delete restrict,
  is_primary   boolean not null default false,
  primary key (resource_id, category_id)
);

create table if not exists institute_location (
  id                 text        primary key,
  resource_id        text        not null references institute_resource(id) on delete cascade,
  city               text,
  county             text,
  state              text,
  virtual_available  boolean     not null default false
);

create table if not exists institute_eligibility (
  id                      text primary key,
  resource_id             text not null references institute_resource(id) on delete cascade,
  population              text,
  age_range               text,
  requirements            text,
  cost                    text,
  insurance_sliding_scale text
);

create table if not exists institute_accessibility (
  id              text primary key,
  resource_id     text not null references institute_resource(id) on delete cascade,
  mobility        text,
  language        text,
  virtual         text,
  transportation  text,
  accommodations  text
);

create table if not exists institute_verification (
  id             text primary key,
  resource_id    text not null references institute_resource(id) on delete cascade,
  verified_on    date,
  method         text not null
    check (method in ('official_website', 'official_phone', 'directory_crosscheck')),
  reviewer_role  text,
  result         text not null
    check (result in ('verified', 'review_due', 'rejected', 'archived')),
  next_review    date,
  notes          text,
  created_at     timestamptz not null default now()
);

create table if not exists institute_resource_change_log (
  id             text primary key,
  resource_id    text not null references institute_resource(id) on delete cascade,
  field_changed  text not null,
  old_value      text,
  new_value      text,
  reason         text,
  reviewer_role  text,
  changed_on     timestamptz not null default now()
);

create table if not exists institute_resource_submission (
  id                     text        primary key,
  submitted_resource     jsonb       not null default '{}'::jsonb,
  submitter_contact      text,
  consent                boolean     not null default false,
  review_status          text        not null default 'pending_review'
    check (review_status in ('pending_review', 'approved', 'rejected', 'duplicate')),
  published_resource_id  text        references institute_resource(id),
  created_at             timestamptz not null default now()
);

create index if not exists institute_resource_status_idx
  on institute_resource (status);

create index if not exists institute_resource_next_review_idx
  on institute_resource (next_review_on);

create index if not exists institute_resource_category_category_idx
  on institute_resource_category (category_id);

create index if not exists institute_location_state_idx
  on institute_location (state);

create index if not exists institute_location_resource_idx
  on institute_location (resource_id);

create index if not exists institute_eligibility_resource_idx
  on institute_eligibility (resource_id);

create index if not exists institute_accessibility_resource_idx
  on institute_accessibility (resource_id);

create index if not exists institute_verification_resource_idx
  on institute_verification (resource_id);

drop trigger if exists institute_resource_updated_at on institute_resource;
create trigger institute_resource_updated_at
  before update on institute_resource
  for each row execute procedure set_updated_at();

alter table institute_category              enable row level security;
alter table institute_resource              enable row level security;
alter table institute_resource_category     enable row level security;
alter table institute_location              enable row level security;
alter table institute_eligibility           enable row level security;
alter table institute_accessibility         enable row level security;
alter table institute_verification          enable row level security;
alter table institute_resource_change_log   enable row level security;
alter table institute_resource_submission   enable row level security;

revoke all on table
  institute_category,
  institute_resource,
  institute_resource_category,
  institute_location,
  institute_eligibility,
  institute_accessibility,
  institute_verification,
  institute_resource_change_log,
  institute_resource_submission
from anon, authenticated;

grant select, insert, update, delete on table
  institute_category,
  institute_resource,
  institute_resource_category,
  institute_location,
  institute_eligibility,
  institute_accessibility,
  institute_verification,
  institute_resource_change_log,
  institute_resource_submission
to authenticated;

grant select on table
  institute_category,
  institute_resource,
  institute_resource_category,
  institute_location,
  institute_eligibility,
  institute_accessibility
to anon;

-- Authenticated operators: full access (same pattern as genealogy_*).
drop policy if exists "auth users full access" on institute_category;
create policy "auth users full access" on institute_category
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_resource;
create policy "auth users full access" on institute_resource
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_resource_category;
create policy "auth users full access" on institute_resource_category
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_location;
create policy "auth users full access" on institute_location
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_eligibility;
create policy "auth users full access" on institute_eligibility
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_accessibility;
create policy "auth users full access" on institute_accessibility
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_verification;
create policy "auth users full access" on institute_verification
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_resource_change_log;
create policy "auth users full access" on institute_resource_change_log
  for all to authenticated using (true) with check (true);

drop policy if exists "auth users full access" on institute_resource_submission;
create policy "auth users full access" on institute_resource_submission
  for all to authenticated using (true) with check (true);

-- Public directory read: verified or review-due, public classification only.
-- Submissions, change log, and verification notes stay off anon.
drop policy if exists "anon public directory" on institute_resource;
create policy "anon public directory" on institute_resource
  for select to anon using (
    classification = 'public'
    and status in ('verified', 'review_due')
  );

drop policy if exists "anon public directory" on institute_category;
create policy "anon public directory" on institute_category
  for select to anon using (true);

drop policy if exists "anon public directory" on institute_resource_category;
create policy "anon public directory" on institute_resource_category
  for select to anon using (
    exists (
      select 1 from institute_resource r
      where r.id = resource_id
        and r.classification = 'public'
        and r.status in ('verified', 'review_due')
    )
  );

drop policy if exists "anon public directory" on institute_location;
create policy "anon public directory" on institute_location
  for select to anon using (
    exists (
      select 1 from institute_resource r
      where r.id = resource_id
        and r.classification = 'public'
        and r.status in ('verified', 'review_due')
    )
  );

drop policy if exists "anon public directory" on institute_eligibility;
create policy "anon public directory" on institute_eligibility
  for select to anon using (
    exists (
      select 1 from institute_resource r
      where r.id = resource_id
        and r.classification = 'public'
        and r.status in ('verified', 'review_due')
    )
  );

drop policy if exists "anon public directory" on institute_accessibility;
create policy "anon public directory" on institute_accessibility
  for select to anon using (
    exists (
      select 1 from institute_resource r
      where r.id = resource_id
        and r.classification = 'public'
        and r.status in ('verified', 'review_due')
    )
  );
