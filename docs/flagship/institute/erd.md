# Institute ERD

Weeks 1–2 data design. Tables live in `lib/flagship/institute-schema.sql`. Prefix `institute_` keeps this store apart from genealogy and Press.

```mermaid
erDiagram
  institute_resource ||--o{ institute_resource_category : tagged
  institute_category ||--o{ institute_resource_category : groups
  institute_resource ||--o{ institute_location : served_from
  institute_resource ||--o{ institute_eligibility : qualifies
  institute_resource ||--o{ institute_accessibility : access
  institute_resource ||--o{ institute_verification : checked
  institute_resource ||--o{ institute_resource_change_log : audited
  institute_resource_submission }o--o| institute_resource : may_become

  institute_resource {
    text id PK
    text organization
    text program
    text description
    text website
    text phone
    text email
    text status
    text classification
    date last_verified_on
    date next_review_on
    text provenance_url
    timestamptz created_at
    timestamptz updated_at
  }

  institute_category {
    text id PK
    text name
    text description
  }

  institute_resource_category {
    text resource_id FK
    text category_id FK
    boolean is_primary
  }

  institute_location {
    text id PK
    text resource_id FK
    text city
    text county
    text state
    boolean virtual_available
  }

  institute_eligibility {
    text id PK
    text resource_id FK
    text population
    text age_range
    text requirements
    text cost
    text insurance_sliding_scale
  }

  institute_accessibility {
    text id PK
    text resource_id FK
    text mobility
    text language
    text virtual
    text transportation
    text accommodations
  }

  institute_verification {
    text id PK
    text resource_id FK
    date verified_on
    text method
    text reviewer_role
    text result
    date next_review
    text notes
  }

  institute_resource_change_log {
    text id PK
    text resource_id FK
    text field_changed
    text old_value
    text new_value
    text reason
    text reviewer_role
    timestamptz changed_on
  }

  institute_resource_submission {
    text id PK
    jsonb submitted_resource
    text submitter_contact
    boolean consent
    text review_status
    text published_resource_id FK
  }
```

## Relationship rules

- `resource_id` is the stable key. Organization name is not a key.
- Categories are a many-to-many. One row may be primary.
- Location, eligibility, and accessibility are 1:N so a program can carry more than one service area later. The MVP seed uses one row each.
- Verification is append-only. The resource’s `last_verified_on` / `next_review_on` are denormalized for directory queries.
- Submissions do not become resources until a human publishes them. `submitter_contact` is restricted.

## What this ERD does not include

- Genealogy people, sources, or research logs
- Press events or contacts
- Marketing lists
