# Implementation control center

Filled from the September 2026 workbook and the three project briefs. This markdown is the in-repo copy. The `.xlsx` stays in Downloads and is not committed.

Owner for every open row: Latisha Vincent-Waters. Review cadence: weekly.

## Roadmap

| ID | Project | Milestone | Task | Status | Start | Due | Dependency | Evidence |
|---|---|---|---|---|---|---|---|---|
| MM-001 | Institute | Scope | Approve taxonomy and MVP boundaries | Done | 2026-09-01 | 2026-09-01 | — | [briefs/institute.md](briefs/institute.md), [institute/taxonomy.md](institute/taxonomy.md) |
| MM-002 | Institute | Data Design | Create ERD and data dictionary | Done | 2026-09-01 | 2026-09-01 | MM-001 | [institute/erd.md](institute/erd.md), [institute/data-dictionary.md](institute/data-dictionary.md), `lib/flagship/institute-schema.sql` |
| MM-003 | Institute | Seed Data | Add safe verified resource records | Done | 2026-09-01 | 2026-09-01 | MM-002 | [institute/provenance.md](institute/provenance.md), `data/flagship/institute-resources.json` |
| MM-004 | Roots | Governance | Define living-person privacy rule | Done | 2026-09-01 | 2026-09-14 | — | [briefs/roots.md](briefs/roots.md), [../FLAGSHIP_BUILD_GUIDE.md](../FLAGSHIP_BUILD_GUIDE.md) |
| MM-005 | Roots | Data Design | Model people, relationships, places, sources, facts, logs | Planned | 2026-10-06 | 2026-10-19 | MM-004 | `lib/flagship/roots-schema.sql` (planned, not applied) |
| MM-006 | Press | Pilot | Select event and define registration states | Planned | 2026-11-03 | 2026-11-16 | — | [briefs/press.md](briefs/press.md) |
| MM-007 | Press | Automation | Build webhook, deduplication, confirmation, logging | Planned | 2026-11-17 | 2026-11-30 | MM-006 | `lib/flagship/press-schema.sql` (planned, not applied) |
| MM-008 | Shared | Portfolio | Capture sanitized proof for each stage gate | In progress | 2026-09-01 | 2026-11-30 | MM-001 | This file; Hub Building panel |

Weeks 3–4 (directory UI, submission form, reviewer queue) stay off this table until weeks 1–2 are accepted.

## Risk register

| Risk ID | Project | Risk | Likelihood | Impact | Mitigation | Status |
|---|---|---|---|---|---|---|
| RK-001 | Shared | Restricted data lands in a public page or seed file | Medium | High | Separate public / internal / restricted fields. Seed files hold only public directory facts. | Open |
| RK-002 | Roots | New archive schema overwrites `genealogy_people` or the Obsidian vault | Low | High | Roots SQL is planned only. Vault stays in Assets. Do not seed vault from Supabase. | Open |
| RK-003 | Institute | Invented or stale listings | Medium | High | Every seed row has a source URL and review date. Unverified phones omitted. | Open |
| RK-004 | Press | Event registration treated as marketing consent | Medium | High | Default consent is `event_only`. Marketing opt-in is a separate field. | Open |
| RK-005 | Shared | Three projects collapsed into one table | Medium | High | `institute_`, `roots_`, `press_` prefixes. No cross-schema foreign keys. | Open |
| RK-006 | Shared | Work sold as launched before it is | Low | Medium | Briefs and Hub copy label planned vs in development vs done. | Open |

## Records register

| Record ID | System | Title | Classification | Retention | Review date | Legal hold |
|---|---|---|---|---|---|---|
| REC-001 | Docs | Three Flagship Projects Build Guide (Verified) | Internal | Permanent (working extract in repo) | 2027-03-01 | No |
| REC-002 | Institute | Category taxonomy | Public | Permanent until replaced | 2027-03-01 | No |
| REC-003 | Institute | Verification policy | Internal | Permanent until replaced | 2027-03-01 | No |
| REC-004 | Institute | Seed resource set (20) | Public | Review each listing on its next_review date | See seed file | No |
| REC-005 | Shared | Project briefs | Internal | Keep current version; archive prior | 2026-12-01 | No |

## Verification queue

| Record ID | Project | Item | Status | Method | Last verified | Next review |
|---|---|---|---|---|---|---|
| VQ-001 | Institute | Official websites for 20 seed listings | verified | Official public website reviewed | 2026-09-01 | 2027-03-01 |
| VQ-002 | Institute | Phone numbers not listed in seed | pending_review | Confirm on official site before adding | — | Before weeks 3–4 |
| VQ-003 | Roots | First public ancestor set | pending_review | Privacy screen before import | — | Weeks 5–6 |
| VQ-004 | Press | Pilot event facts | pending_review | Owner names the event | — | Weeks 9–10 |

## Change log

| Change ID | Project | Record | Field | Old | New | Reason | Date |
|---|---|---|---|---|---|---|---|
| CH-001 | Shared | Hub Building panel | proof / entities / first / next actions | empty | Filled from Verified guide | Document added | 2026-09-01 |
| CH-002 | Institute | Seed set | — | none | 20 public listings | Weeks 1–2 seed | 2026-09-01 |
| CH-003 | SCDMH listing | organization | SCDMH | BHDD Office of Mental Health | State office renamed; site verified 2026-09-01 | 2026-09-01 |

## Test cases

| Test ID | Project | Scenario | Type | Expected | Status |
|---|---|---|---|---|---|
| TC-I-01 | Institute | Valid resource submission | Happy path | Enters `pending_review` | Planned (weeks 3–4) |
| TC-I-02 | Institute | Duplicate candidate | Edge | Flagged for review, not auto-merged | Planned |
| TC-I-03 | Institute | Public output | Permission | No submitter contact, no reviewer notes | Planned |
| TC-I-04 | Institute | Review-due record | Workflow | Leaves verified, enters reverification queue | Planned |
| TC-I-05 | Institute | Archived record | Accuracy | Not shown as currently verified | Planned |
| TC-I-06 | Institute | Seed provenance | Data | Each of 20 rows has source URL + reviewed_on | Done |
| TC-R-01 | Roots | Living person default | Permission | Private/restricted unless permission + purpose | Planned |
| TC-P-01 | Press | Registration without marketing opt-in | Consent | Contact stays `event_only` | Planned |

Acceptance language copied from `docs/flagship/scaffold/tests/acceptance/`.

## Portfolio evidence

| Evidence ID | Project | Artifact | Claim supported | Sanitized | Location | Ready |
|---|---|---|---|---|---|---|
| PE-001 | Shared | Verified build guide extract | Architecture and order | Yes | `docs/FLAGSHIP_BUILD_GUIDE.md` | Yes |
| PE-002 | Institute | Brief | Scope | Yes | `docs/flagship/briefs/institute.md` | Yes |
| PE-003 | Institute | ERD + schema | Data model | Yes | `docs/flagship/institute/erd.md`, `lib/flagship/institute-schema.sql` | Yes |
| PE-004 | Institute | Seed + provenance | Safe demonstration records | Yes | `data/flagship/` | Yes |
| PE-005 | Roots | Brief + planned schema | Privacy-first archive | Yes | briefs + `lib/flagship/roots-schema.sql` | Not a live archive |
| PE-006 | Press | Brief + planned schema | Event/CRM model | Yes | briefs + `lib/flagship/press-schema.sql` | Not a live event flow |

## Coursework (from the workbook — do not treat planned terms as finished)

| Credential | Course | Status | Skill evidence | Portfolio connection |
|---|---|---|---|---|
| Database Administrator CAS | SQL Programming I | Completed | SQL | Data models and reporting |
| Database Administrator CAS | Database Administration | Completed | Database administration | Operations and governance |
| Database Administrator CAS | Relational Database | Preregistered | Relational design | ERDs and normalized schemas |
| Cybersecurity AAS | Information Systems Security | Completed | Security controls | Access and risk controls |
| Cybersecurity AAS | Network Fundamentals | Completed | Networking | Application architecture |
| Cybersecurity AAS | Linux Essentials | Completed | Linux | Deployment and repository workflows |

Homework work uses the `homework-companion` skill. Do not present preregistered coursework as complete.

## Job pipeline

The workbook tab is empty. Career Command remains the pipeline surface. Do not invent open roles.
