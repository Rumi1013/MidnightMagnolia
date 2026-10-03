# Registration webhook contract

## Required input
- event_id
- email
- consent_status

## Optional input
- name
- interests
- referral_source

## Processing rules
- Validate required fields server-side.
- Normalize email before contact lookup.
- Update or create the contact.
- Keep marketing consent separate from event registration.
- Log the automation run and communication result.
- Capture errors and retry only when safe.
