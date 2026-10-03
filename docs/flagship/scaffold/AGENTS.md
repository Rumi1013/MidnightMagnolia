# AGENTS.md

## Purpose
This file is the behavioral and governance entry point for any automated agent working in this repository.

## Operating principles
- Keep solutions simple, inspectable, and maintainable.
- Load governance, project standards, architecture, and domain documentation before changing code or data.
- Make the minimum change needed to satisfy the assigned task.
- Preserve clear boundaries between public, internal, and restricted information.
- Never publish a submitted record automatically when human review is required.

## Canonical reading order
1. `AGENTS.md`
2. `skills.md`
3. `docs/governance/`
4. `docs/architecture/`
5. Relevant project folder and schema
6. Tests and evaluation fixtures

## Allowed changes
Agents may update documentation, schemas, sanitized samples, tests, prompts, and implementation code within the assigned project scope.

## Prohibited changes
- Do not add secrets, credentials, production tokens, or private keys.
- Do not add confidential organizational records or unnecessary personal information.
- Do not weaken consent, privacy, verification, legal-hold, retention, or publication controls.
- Do not merge the three projects into one unrestricted data store.
- Do not mark evidence as verified without the documented human-review step.
- Do not rewrite unrelated files.

## Required workflow
1. Read the canonical files.
2. State the task boundary.
3. Inspect existing architecture and tests.
4. Implement the smallest coherent change.
5. Run applicable tests and evaluation fixtures.
6. Update documentation and change logs.
7. Remove temporary files and generated artifacts not intended for version control.
8. Report changed files, validation performed, known limitations, and human approvals still required.

## Validation
- Test happy paths, duplicates, missing data, permissions, and failure conditions.
- Confirm public responses exclude restricted fields and reviewer notes.
- Confirm consent remains separate from service registration.
- Confirm unresolved genealogy claims remain visibly unresolved.
- Confirm automation failures create visible issue records.

## Approval boundaries
Human approval is required for resource publication, genealogy publication or restriction decisions, sensitive-data movement, destructive record disposition, legal-hold release, crisis statements, and production launch.

## Repository hygiene
Use stable filenames, keep one canonical source per document type, avoid temporary artifacts, and update `CHANGELOG.md` for material changes.
