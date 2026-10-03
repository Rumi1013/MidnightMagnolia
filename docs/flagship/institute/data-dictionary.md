# Institute data dictionary

Public fields may appear on a future directory page. Internal and restricted fields stay off that page.

## institute_resource

| Field | Type | Class | Notes |
|---|---|---|---|
| id | text | public | Stable key (`RES-001`). Organization name is not a key. |
| organization | text | public | Required. Official name. |
| program | text | public | Named line or service, if different from the organization. |
| description | text | public | Required. Plain present tense. No promises the site does not make. |
| website | text | public | Official URL. Required for seed listings. |
| phone | text | public | Only when printed on the official site. |
| email | text | public | Public intake email only. None in the first seed set. |
| status | text | public | `pending_review` \| `verified` \| `review_due` \| `archived` |
| classification | text | public | Directory rows are `public`. |
| last_verified_on | date | public | Date the official site was checked. |
| next_review_on | date | internal | Drives the review-due queue. |
| provenance_url | text | public | Same as website for first-party listings. |
| created_at / updated_at | timestamptz | internal | |

## institute_category / institute_resource_category

| Field | Class | Notes |
|---|---|---|
| id / name / description | public | See taxonomy. |
| is_primary | public | First category in filters. |

## institute_location

| Field | Class | Notes |
|---|---|---|
| city, county, state | public | Empty city/county allowed for statewide or national-virtual programs. |
| virtual_available | public | Phone, text, or web access without a walk-in. |

## institute_eligibility / institute_accessibility

All fields public summaries. Empty allowed. Do not invent cost or insurance language.

## institute_verification

| Field | Class | Notes |
|---|---|---|
| verified_on, method, result, next_review | internal | Method: `official_website`, `official_phone`, `directory_crosscheck` |
| reviewer_role | restricted | Role, not a personal name, on public artifacts |
| notes | restricted | Never public |

## institute_resource_change_log

Internal. Reason required for status or website changes.

## institute_resource_submission

| Field | Class | Notes |
|---|---|---|
| submitted_resource | restricted | Raw payload |
| submitter_contact | restricted | |
| consent | internal | Consent to be contacted about this submission — not marketing |
| review_status | internal | Default `pending_review` |
| published_resource_id | internal | Set only after human approval |
