# Project brief — Midnight Magnolia Press Event Command

| Field | Entry |
|---|---|
| Problem | Press programming — author conversations, workshops, launches, genealogy sessions — needs a registration path that keeps consent, attendance, and failed messages visible. Event signup must not silently become a marketing list. |
| Users | People registering for a Press event. Speakers. Operators watching confirmations, reminders, and failures. |
| Public boundary | Event title, type, time, location or URL, capacity if published, description, registration form. |
| Internal boundary | Attendance states, automation runs, retries, issue log, segmentation tags. |
| Restricted data | Private speaker contact, full contact records beyond what a given message needs, marketing-consent history used for targeting. |
| MVP features | One real or demonstration Press event as the pilot. Event, contact, and registration model. Registration API with validation and email-based deduplication. Confirmation logging. Automation health comes in weeks 11–12. |
| Owner | Latisha Vincent-Waters |
| Success signal | A registration creates or updates one contact by normalized email, stores event-only consent by default, and writes a visible run record if the confirmation fails. |
| Out of scope | Silent marketing opt-in. Merging Press contacts with Institute submitters or Roots clients. Full Zapier/Make parity. |
| Status | Planned. Weeks 9–12. Schema file exists as planned SQL only. |
| Case-study spine | Challenge → Role → Architecture → Build → Governance → Outcome. Outcome is **planned**. |
| Pilot event | To be named. Hold a writing workshop or author conversation once the registration model exists. |
