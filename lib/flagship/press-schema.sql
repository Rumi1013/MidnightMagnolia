-- Midnight Magnolia Press Event Command — PLANNED SCHEMA
-- Do not apply until weeks 9–10.
-- Do not join these contacts to institute_resource_submission or roots_contribution.

create table if not exists press_event (
  id            text primary key,
  title         text not null,
  event_type    text,
  starts_at     timestamptz,
  location_url  text,
  capacity      integer,
  status        text,
  description   text
);

create table if not exists press_contact (
  id              text primary key,
  name            text,
  normalized_email text unique not null,
  consent_status  text not null default 'event_only'
    check (consent_status in ('event_only', 'marketing_opt_in', 'revoked')),
  interests       text,
  source          text,
  created_at      timestamptz not null default now()
);

create table if not exists press_registration (
  id               text primary key,
  event_id         text not null references press_event(id),
  contact_id       text not null references press_contact(id),
  registered_at    timestamptz not null default now(),
  status           text,
  attendance       text
    check (attendance is null or attendance in (
      'registered', 'attended', 'no_show', 'cancelled', 'replay_requested', 'completed'
    )),
  referral_source  text
);

create table if not exists press_tag (
  id    text primary key,
  name  text unique not null,
  rule  text
);

create table if not exists press_contact_tag (
  contact_id text not null references press_contact(id) on delete cascade,
  tag_id     text not null references press_tag(id) on delete cascade,
  primary key (contact_id, tag_id)
);

create table if not exists press_speaker (
  id               text primary key,
  bio              text,
  books_projects   text,
  private_contact  text
);

create table if not exists press_event_speaker (
  event_id   text not null references press_event(id) on delete cascade,
  person_id  text not null references press_speaker(id) on delete cascade,
  primary key (event_id, person_id)
);

create table if not exists press_communication (
  id               text primary key,
  contact_id       text references press_contact(id),
  event_id         text references press_event(id),
  message_type     text,
  sent_at          timestamptz,
  delivery_status  text
);

create table if not exists press_automation_run (
  id            text primary key,
  workflow      text not null,
  trigger_name  text,
  status        text,
  started_at    timestamptz,
  ended_at      timestamptz,
  error_code    text,
  retry_count   integer not null default 0
);

create table if not exists press_issue_log (
  id           text primary key,
  run_id       text references press_automation_run(id),
  root_cause   text,
  resolution   text,
  prevention   text,
  owner_role   text,
  resolved_at  timestamptz
);

-- Defense in depth: this is a planned schema containing contact and consent data.
-- If it is run early, the Data API must expose nothing until explicit policies and
-- least-privilege grants are designed and tested.
alter table press_event           enable row level security;
alter table press_contact         enable row level security;
alter table press_registration    enable row level security;
alter table press_tag             enable row level security;
alter table press_contact_tag     enable row level security;
alter table press_speaker         enable row level security;
alter table press_event_speaker   enable row level security;
alter table press_communication   enable row level security;
alter table press_automation_run  enable row level security;
alter table press_issue_log       enable row level security;

revoke all on table
  press_event,
  press_contact,
  press_registration,
  press_tag,
  press_contact_tag,
  press_speaker,
  press_event_speaker,
  press_communication,
  press_automation_run,
  press_issue_log
from anon, authenticated;
