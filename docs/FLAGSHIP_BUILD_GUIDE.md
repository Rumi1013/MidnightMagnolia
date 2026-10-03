# Three Flagship Projects Build Guide

Working extract of **Midnight Magnolia: Three Flagship Proof-of-Work Projects** (Verified, September 2026).

Canonical PDF stays **outside the git repo**: `~/Downloads/Project Specs/Midnight_Magnolia_Three_Flagship_Projects_Build_Guide_Verified.pdf`. Do not commit the PDF.

This document is the build authority for Institute, Roots, and Press. Career Command’s Building panel reads public-safe fields from `lib/commandHub/flagshipBuilds.js`. Live schemas and samples from the repository supplement live under `docs/` and `lib/` as they are implemented — not as a second unrestricted store.

## Purpose

Build three real, public-facing Midnight Magnolia systems that also function as inspectable portfolio evidence. Together they demonstrate database design, information architecture, research, workflow automation, governance, documentation, CRM-style operations, APIs/webhooks, reporting, and human-centered systems thinking.

## Portfolio rule

Every flagship project must include at least three forms of proof:

1. A working or interactive artifact
2. Visible system architecture / documentation
3. Sanitized technical evidence (schema, workflow, research log, sample dataset, or repository)

## The three-project ecosystem

| Project | Midnight Magnolia role | Primary proof |
|---|---|---|
| Magnolia Institute Resource Library | Community care, recovery, trusted-resource infrastructure | Searchable database + vetting workflow + operations dashboard |
| Magnolia Roots Digital Archive | Genealogy, family history, archival research, research services | Relational archive + contribution/request forms + research log |
| Midnight Magnolia Press Event Command | Events, authors, workshops, audience operations | Registration/CRM workflow + automations + event dashboard |

## Shared design principles

- Build for real Midnight Magnolia use first; portfolio demonstration is the second benefit.
- Case-study structure: Challenge → Role → Architecture → Build → Governance → Outcome.
- Separate public, internal, and restricted data. Never publish a sensitive record merely because a form was submitted.
- Human review at meaningful approval points: resource verification, genealogy publication, sensitive data movement.
- Label reconstructed historical systems honestly. Distinguish original work from the modern implementation.
- Expose enough architecture for a recruiter to inspect the work without exposing private data, credentials, or production secrets.

## Shared architecture

One ecosystem, three distinct privacy boundaries. Share authentication, UI, logging, and infrastructure. Do **not** merge Institute, Roots, and Press into one unrestricted database.

| Layer | Purpose |
|---|---|
| Public website | Directories, archive search, event pages, forms |
| Application / API | Validation, business rules, access control, webhooks |
| Database | Separate schemas or explicit permissions per project |
| Automation | Notifications, scheduled review, handoffs, retries, issue logging |
| Operations dashboard | Queues, verification, event ops, automation health |
| Documentation | ERDs, dictionaries, SOPs, privacy rules, change history |
| Portfolio layer | Sanitized case studies, screenshots, demos, repository evidence |

## Build order

1. **Institute** — simplest relationships; foundation for forms, moderation, verification, dashboards
2. **Roots** — deeper relational modeling, sources, privacy, research workflow
3. **Press** — capstone: CRM contacts, APIs/webhooks, automations, error handling, reporting
4. Connect shared infrastructure only after each project works independently

Existing Supabase `genealogy_people` / `genealogy_relationships` stay the structured genealogy DB. Roots adds places, sources, assertions, research logs, contributions, and research requests — it does not replace or seed the Obsidian vault.

## Milestones for every project

| Gate | Definition of done |
|---|---|
| 1. Scope | Problem, users, public/internal boundaries, MVP |
| 2. Data design | ERD, field dictionary, statuses, privacy classification |
| 3. Seed data | Safe demonstration records and documented provenance |
| 4. Core UI | Public search / detail / form path works |
| 5. Operations | Internal review queue / dashboard works |
| 6. Automation | At least one logged workflow with failure handling |
| 7. Governance | Consent, privacy, and verification implemented and documented |
| 8. QA | Happy path, duplicates, missing data, permissions, failures |
| 9. Portfolio | Case study, architecture, screenshots, technical artifacts |
| 10. Launch | Production config reviewed; secrets excluded from public code |

## 90-day sequence

| Weeks | Focus |
|---|---|
| 1–2 | Institute: scope, taxonomy, ERD, verification policy, seed records |
| 3–4 | Institute: directory, submission/review flow, dashboard, case study |
| 5–6 | Roots: schema, privacy rules, sanitized archive, research log |
| 7–8 | Roots: contribution + research-request forms, moderation, case study |
| 9–10 | Press: event/contact/registration model, pages, registration API |
| 11–12 | Press: automation, segmentation, health monitoring, documentation, case study |
| 13 | Cross-project QA, portfolio navigation, repository cleanup, launch review |

---

## Project 1 — Magnolia Institute Resource Library

**Goal.** A living, searchable resource database for trauma recovery, rebuilding, community care, resilience, and belonging. Demonstrate the evolution of earlier community-resource work into the emerging Midnight Magnolia Institute.

**Public experience**

- Search by keyword, organization, service, city/county, or population served
- Filter by Safety & Stabilization, Healing & Recovery, Legal & Advocacy, Family & Youth, Economic Recovery, Community & Belonging
- Show cost/eligibility, virtual or in-person availability, accessibility, contact method, last verification date
- Suggest a Resource creates a **pending** record — it does not publish
- Verification badge: Verified, Review Due, Pending Review, or Archived

**Entities.** resource, category, location, eligibility, accessibility, verification, change log, submission

**Workflow.** Resource submitted → Pending Review → Duplicate Check → Initial Research → Eligibility/Access Review → Direct or Source Verification → Human Approval → Published → Scheduled Reverification → Updated or Archived

**Governance.** Do not collect unnecessary personal data from directory users. Keep search separate from marketing unless the person opts in. Do not expose internal safety notes or reviewer identity. Record why a resource was approved, updated, or archived.

**First build slice.** Taxonomy and ERD, then ~20 well-verified seed records, then public directory + pending-review form.

---

## Project 2 — Magnolia Roots Digital Archive

**Goal.** Transform Vincent/Vinson genealogy work into a participatory, research-centered digital archive: people, relationships, places, sources, assertions, research logs, contributions, and research requests.

**Public experience**

- Search deceased/historical individuals by surname, place, generation, record type, or verification status
- Individual profiles show relationships, locations, public-appropriate notes, and verification status
- Contribute Information form for relatives/community (reviewed before it enters the public archive)
- Separate Request Genealogy Research form for scoped inquiries

**Entities.** individual, relationship, place, source, assertion, research log, contribution, research request

**Workflow.** Public Submission → Contribution Record → Duplicate/Existing Record Search → Research Queue → Source Verification → Relationship Analysis → Human Review → Verified / Unresolved / Restricted → Archive Update

**Accuracy rule.** A relationship, date, place, or identity is not “verified” because it appeared in one submission. Preserve uncertainty: verified, probable, conflicting, or unresolved. Living-person data defaults to private or restricted.

**First build slice.** Public/privacy rules before import. Sanitized starter archive of deceased ancestors only. Do not seed the Obsidian vault from `genealogy_people`.

---

## Project 3 — Midnight Magnolia Press Event Command

**Goal.** Operational event system for Press programming: author conversations, writing workshops, book launches, genealogy workshops, community storytelling, healing-through-writing. Strongest automation/CRM proof-of-work.

**Public experience**

- Browse upcoming events and open a detail page
- Register through a structured form
- Confirmation and reminders
- Explicit opt-in for future Press communications — registration alone is not marketing consent
- After an event: attendance / replay / follow-up where consent allows

**Entities.** event, contact, registration, tag/segment, speaker, communication, automation run, issue log

**Workflow.** Event Page → Registration → Validation → API/Webhook → Contact Lookup → Create/Update Contact → Apply Event Tag/Segment → Confirmation → Reminder → Attendance Update → Follow-up → Reporting

**Automation health.** Trigger → Run Logged → Success? → Complete / Capture Error → Retry if Safe → Escalate → Resolve → Document Root Cause → Add Prevention → Close Issue

**First build slice.** One real or demonstration Press event as the pilot. Event/contact/registration model, then pages and registration API.

---

## Immediate next actions (from the verified guide)

1. Create one project brief for each system using the shared case-study template
2. Choose the production data platform and confirm what existing Midnight Magnolia infrastructure will be reused
3. Build the Institute taxonomy and ERD first
4. Identify ~20 safe, current resource records for the Institute MVP
5. Identify the first set of deceased/historical genealogy records appropriate for the public archive
6. Define one real or demonstration Press event as the Event Command pilot
7. Capture proof as the systems are built (screenshots, schemas, tests, decisions)

## Related in-repo files

- `docs/flagship/README.md` — map of briefs, Institute weeks 1–2, control center, merged scaffold
- `lib/commandHub/flagshipBuilds.js` — public-safe Hub Building panel
- `pages/portfolio/community-resource-database.jsx` — historical Institute-adjacent case study
- `lib/supabase-schema.sql` — existing genealogy tables (do not overwrite)
- `lib/flagship/` — Institute schema + seed; Roots and Press planned only
- `data/flagship/` — 20 verified Institute listings
- Implementation playbook workbook: `~/Downloads/Midnight_Magnolia_Implementation_Ready_Package (1)/` (do not commit)
