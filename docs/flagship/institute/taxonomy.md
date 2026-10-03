# Institute taxonomy

Approved 2026-09-01. Categories come from the Verified build guide. Statuses and classification come from the governance package.

## Service categories

| ID | Name | Use for |
|---|---|---|
| CAT-SAFETY | Safety & Stabilization | Crisis lines, shelter, food, immediate safety, disaster navigation |
| CAT-HEALING | Healing & Recovery | Mental health, substance use, grief, peer support, trauma recovery |
| CAT-LEGAL | Legal & Advocacy | Civil legal aid, rights protection, self-help legal information |
| CAT-FAMILY | Family & Youth | Child protection lines, family services, youth-specific care |
| CAT-ECONOMIC | Economic Recovery | Housing, food systems, employment, vocational rehabilitation, benefits navigation |
| CAT-BELONGING | Community & Belonging | Libraries, 211-style navigation, mutual-aid directories, community gathering points |

A resource may belong to more than one category. The first listed category is the primary one for filters.

## Publication statuses

| Status | Public meaning | Internal meaning |
|---|---|---|
| `pending_review` | Not listed | Submission or draft waiting on a human |
| `verified` | Shown as Verified | Website (and phone, if listed) checked; next review set |
| `review_due` | Shown as Review Due | Still listed; queued for reverification |
| `archived` | Not shown as current | Kept for history; not a live referral |

Do not invent a fifth public badge.

## Geography

| Field | Rule |
|---|---|
| city | Optional. Use the service city, not the reviewer's city. |
| county | Optional. South Carolina county name when the program is county-bound. |
| state | Two-letter code. Statewide programs use the state and leave city empty. |
| virtual_available | True when a person can use the service by phone, text, or web without walking in. |

National lines that serve South Carolina are allowed. Mark state as `US` only when the program is national and has no South Carolina office to name. Prefer `SC` plus `virtual_available` when South Carolinians can use it.

## Accessibility fields

mobility, language, virtual, transportation, accommodations — short public phrases. Empty is allowed. Do not guess.

## Eligibility fields

population, age_range, requirements, cost, insurance_sliding_scale — public summaries from the official site. Empty is allowed. Do not write "free" unless the official site says so.

## Classification

| Tier | Label | Institute use |
|---|---|---|
| 3 | `public` | Directory fields on a verified or review-due listing |
| 2 | `internal` | Reviewer notes, change log, queue state |
| 1 | `restricted` | Submitter contact, safety notes, unpublished payloads |

Every resource row is created as `public` only when it is a directory listing. Submissions start restricted.
