# Institute verification policy

Owner: Latisha Vincent-Waters
Last reviewed: 2026-09-01
Review cadence: quarterly, or after any public-directory launch

## Purpose

A listing is a referral. It is published only after a human checks the official source and records the method, the date, and the next review.

## What counts as verification

Accept one of these methods, recorded on the verification row:

| Method | Acceptable source |
|---|---|
| `official_website` | The organization's own current site, or a government site that names the program |
| `official_phone` | Number published on that same official site |
| `directory_crosscheck` | SC 211 or another statewide navigator, used only to confirm the organization still exists — not as the sole source for eligibility text |

Do not verify from social posts, ads, or AI summaries.

## Publication rules

1. A Suggest a Resource form creates `pending_review`. It does not publish.
2. Human approval is required before `verified`.
3. Public pages may show organization, program, description, website, public phone, eligibility, accessibility, location, status badge, and last verification date.
4. Public pages may not show submitter contact, reviewer name, reviewer notes, or safety flags.
5. Resource-search behavior is not marketing consent.
6. Record why a listing was approved, updated, or archived.

## Reverification

| Status after check | Next review |
|---|---|
| Crisis / 24-7 national line | 6 months |
| Statewide or government program | 6 months |
| Local nonprofit | 6 months |
| Anything with a known move, merger, or rename | 90 days, or sooner |

A listing whose `next_review` has passed becomes `review_due`. It stays visible with that badge until a human re-checks it. It does not stay silently `verified`.

## Archive

Archive when the program has closed, merged into a differently named listing, or is no longer appropriate to refer people to. Keep the row. Do not delete history.

## Duplicates

Same organization + same program + same website = one listing. A statewide line and a local affiliate may both exist if they offer different access paths. Flag the pair for review; do not auto-merge.

## Failures

| Condition | Action |
|---|---|
| Official site down | Leave `review_due`. Do not invent a replacement URL. |
| Phone missing from official site | Publish the website only. |
| Conflicting eligibility | Keep the official site's language. Note the conflict internally. |
| Safety concern about a listing | Hold at `pending_review` or `archived`. Restricted notes stay off the public record. |

## Seed set (weeks 1–2)

The first twenty listings were checked against official public websites on 2026-09-01. See [provenance.md](provenance.md). Phones that could not be confirmed on the official page were left blank.
