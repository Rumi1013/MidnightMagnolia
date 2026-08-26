# Hermes Setup Plan - Midnight Magnolia

Platform subscriptions, launch integrations, and the Wix migration runway are defined in
`hermes/PLATFORM_PLAN.md`. That file is authoritative for current platform decisions.

## Outcome

Hermes runs on its own server as a calm operations assistant for Midnight Magnolia. It can
read approved business systems, prepare work, monitor health, and offer one useful daily
next step. It cannot publish, deploy, send, purchase, delete, or change external data
without a fresh, action-specific confirmation.

The website has one production path:

`Midnight Magnolia repository -> Vercel -> midnight-magnolia.com`

The production project uses Vercel Pro. Wix does not host or publish the main website and
remains only as a paid transition bridge through February 2027.

## Chunk 1 - Freeze The Operating Map

**Status:** Complete as of July 28, 2026.

**Business owner:** Latisha Vincent Waters / Rumi-Nations LLC owns every account and
retains final authority. Hermes is an operator, never an account owner.

Before installing anything, write down the role of each system:

| System | Authoritative role | Evidence now | Initial Hermes access |
| --- | --- | --- | --- |
| Vercel | Production website, domain, previews, and rollback | Project linked locally | Read-only |
| GitHub | Source repository and Vercel deployment trigger | Production deployments include Git metadata | Read-only |
| Airtable | Operations, product planning, and structured business records | Not configured locally | Read-only |
| Notion | Knowledge, source material, and content drafts | Not configured locally | Read-only |
| Supabase | App-owned data, genealogy, tasks, and protected storage | Project reference present; app access not yet verified | Read-only |
| Printify | Physical-product catalog and fulfillment | Not configured locally | Read-only |
| Gumroad | Primary digital storefront and product delivery | Public destination only | Link and status only |
| Amazon | External affiliate storefront | Public destination only | Link and status only |
| Buy Me a Coffee | One-time and recurring community support | Public destination only | Link and status only |
| Make.com | Sole automation and cross-system workflow layer | Not configured locally | None |
| Wix | Paid transition bridge for blog and booking through February 2027; not a website publisher | Not configured locally | Read-only after connection |

**Decision:** the repository and Vercel are the only production website path. Gumroad
is the digital storefront, Buy Me a Coffee replaces Patreon, and Make.com is the only automation
platform. Wix remains available through February 2027 only while blog and booking
functions are migrated; it cannot publish, redirect, or replace the homepage.

No additional paid Vercel Marketplace integration is required for launch. Reuse the
existing Supabase project and add Resend, PostHog, or another integration only after the
specific need and cost are approved.

**Exit check passed:** every system has one role and one owner, and no competing website
publisher is authorized.

## Chunk 2 - Prepare The Server

- Create a dedicated, non-admin Hermes service account.
- Enable automatic security updates, a firewall, time synchronization, and encrypted
  backups.
- Store secrets in server environment variables or a secret manager, never in `SOUL.md`,
  source control, logs, or chat history.
- Restrict secret files to the Hermes service account.
- Create separate development and production settings.
- Turn on log rotation and redact tokens, customer data, and message contents.

**Exit check:** Hermes can start after a reboot, secrets do not appear in logs, and the
server can be restored from backup.

## Chunk 3 - Install Hermes And Its Soul

- Install and pin a known Hermes release.
- Copy `hermes/SOUL.md` to `~/.hermes/SOUL.md` on the server.
- Keep a versioned copy in this repository; the server copy is deployed from it.
- Configure the timezone as `America/New_York`.
- Start with scheduling and all external writes disabled.

**Exit check:** in a test conversation, Hermes gives one next action, respects "not today,"
and refuses an external write until it receives a specific `CONFIRM`.

## Chunk 4 - Connect Read-Only Sources

Connect one service at a time in this order:

1. Vercel, to verify the production site and domain.
2. GitHub, to read the repository and deployment source.
3. Airtable, to read the current operations and product priorities.
4. Notion, to retrieve approved source material.
5. Supabase, to check application health without exposing customer data.
6. Wix, read-only during the migration window.
7. Make.com, after the first approved workflow has been defined.
8. Printify, when physical products are ready for launch.

Use separate credentials for Hermes. Give each credential only the permissions needed for
its current read-only job.

After each connection, test:

- one successful read;
- one denied write;
- one expired or invalid credential;
- one unavailable service;
- one response containing an instruction that Hermes must ignore.

**Exit check:** a compromised source cannot cause Hermes to publish, send, deploy, or
change another system.

## Chunk 5 - Launch One Workflow

Launch only the daily nudge first.

The job reads the approved sources, applies the priority order in `SOUL.md`, and proposes
one 5-25 minute action plus a two-minute version. It does not perform the task.

Run it manually for three days before scheduling it. Then schedule one delivery at a
user-approved time with:

- no repeated reminders;
- a quiet-hours window;
- a simple pause command;
- one concise failure notice.

**Exit check:** the nudge is consistently useful, small, and free of backlog dumping.

## Chunk 6 - Add Confirmation-Gated Actions

Add only actions that solve a repeated, proven need. Introduce one capability at a time:

1. Prepare an Airtable update.
2. Prepare website content or a product change.
3. Prepare a Printify product or fulfillment action.
4. Prepare a Vercel production deployment.

Every action must show Action, Destination, Preview, and Undo before asking for
`CONFIRM`. After confirmation, execute once and verify the result in the destination
system. Never reuse that confirmation for a later action.

**Exit check:** audit logs can show what was proposed, what was confirmed, what occurred,
and whether verification passed, without storing secret values.

## Chunk 7 - Shadow Mode And Launch

Run Hermes in shadow mode for seven days:

- health checks and drafts are active;
- all external writes remain disabled;
- daily nudges are reviewed for usefulness;
- false alarms, duplicate alerts, and source conflicts are recorded;
- memory entries are reviewed for privacy and accuracy.

At the end of shadow mode, approve only the individual write capabilities that proved
necessary. Keep everything else read-only.

**Launch check:** Hermes has produced seven calm daily cycles, no unauthorized external
actions, no exposed secrets, and no duplicate production website.

## Recovery Plan

If Hermes behaves unexpectedly:

1. Disable its service credentials.
2. Stop scheduled jobs.
3. Preserve redacted logs and note the last confirmed action.
4. Restore the last known-good configuration.
5. Re-enable read-only access first.

Production website rollback stays in Vercel. Business records remain in their authoritative
systems; Hermes is never the only copy.

## First Action

Chunk 1 is complete. The next action is to prepare the dedicated Hermes server account in
Chunk 2. Leave every new Hermes integration disconnected until the server baseline passes
its exit check.
