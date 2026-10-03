# Career Command

Career Command is the one local system for running Latisha Vincent-Waters's career transition: target markets and titles, résumé versions and achievement proof, application packages, opportunity tracking, weekly volume, interview pipeline, relocation screening, and reusable outreach/interview templates.

It is intentionally local-first and dependency-free. Working changes are stored in the browser on this computer. JSON exports are the durable, portable backups.

## Start it

Requirements: Node.js 18 or newer.

```bash
npm start
```

Open <http://127.0.0.1:4173>. No account, API key, database, cloud service, or package installation is required.

Run the checks with:

```bash
npm test
node --check app.js
node --check server.mjs
```

## Daily operating loop

1. Add each verified job once in **Opportunities**. Use the requisition ID whenever possible.
2. Assign the exact résumé version, select relevant evidence records, and record cover-letter/posting/confirmation details in its **Application package**.
3. Paste the saved posting text and/or required vs preferred keywords, then run **job-specific ATS analysis** from the opportunity editor. There is no universal ATS score.
4. Set one concrete next action and date on every live row.
5. Maintain résumé metadata and evidence classifications in **Résumés & proof**; keep the actual documents in their existing folders.
6. Use evidence filters (role lane, verification, capability, public/excerpt/interview-only) and the **Proof gaps** table to see what still needs corroboration.
7. Add each scheduled conversation to **Interviews**.
8. Update the weekly counts from **Overview**.
9. Use **Relocation** to compare real compensation against obligations, market rent, ordinary living costs, and target margin.
10. Export a JSON backup every Friday and before any large import or cleanup.

## Data ownership and duplicates

- `data/career-data.json` is the versioned baseline shipped with the app (`schemaVersion` 2).
- Browser storage key `career-command-v1` is the active working copy. On load, v1 data is migrated in place without discarding user edits.
- A JSON export contains the full system (including evidence metadata and ATS analyses) and can be imported later.
- CSV export contains the opportunity table for spreadsheet use, including linked evidence IDs.
- `schemas/career-data.schema.json` documents the interchange shape for v1 and v2.
- Duplicate detection uses requisition ID when present. Otherwise it uses normalized company + job title + location.

Do not add the same posting again for a status change. Edit its existing row. Split a broad research lead into separate rows only after distinct requisitions are verified.

## Résumés, evidence, and application packages

- Résumé records identify the version, role lane, target titles, keywords, status, and path to the real file.
- Achievement/evidence records track evidence type, verification status, confidentiality, source path/URL/date, authorship, supported claim/metric, corroboration still needed, gap types, target role lanes, and portfolio/interview/résumé suitability.
- Each opportunity records the selected résumé, cover-letter status, whether the posting was saved, confirmation number, non-sensitive notes, linked evidence IDs, posting text, and required/preferred keywords.
- ATS analyses are stored with résumé ID, opportunity ID, date, method/version (`keyword-coverage-v1`), coverage findings, missing/weak keywords, and formatting risks.
- Never store passwords, Social Security numbers, birth dates, demographic disclosures, financial-account details, or background-check information in Career Command.
- Do not present planned targets as achieved results. Do not mark a résumé metric verified without independent support. Fellowship narrative and justice-program materials stay interview-only unless redacted and explicitly approved.

## Workbook migration

The workbook's major concepts were preserved: job tracker, resume/cover-letter references, skills and ATS readiness, companies, contacts/networking, interviews, salary research, archive conventions, and controlled status lists. The workbook was largely a blank schema, so the app carries forward its useful structure without manufacturing rows.

The prior app archive provided reusable role, résumé, skill, interview, and benchmark structures. Its cloud authentication, Firebase, Google Sheets, and Gemini requirements were deliberately removed so this version runs independently and does not require credentials.

The requested `CareerCommandCenter_v4_intuitive(AutoRecovered).xlsx` was not available at the supplied `/mnt/data` path during this build. When it becomes available, export a JSON backup first, compare its populated rows to the current data, and import only new distinct requisitions. Do not replace the system wholesale.

## Relocation scoring

The score is a planning aid, not financial advice:

- 45% role fit
- 45% salary coverage of fixed obligations + reference rent + living-cost estimate + margin, adjusted by the saved tax-rate estimate
- 10% relocation and sign-on support (full credit at a combined $10,000)

Edit assumptions in **Data & settings** when the real household split, benefits, taxes, or market rent becomes known.

## Folder map

- `index.html`, `styles.css`, `app.js` — the application
- `server.mjs` — small local web server
- `data/career-data.json` — baseline data
- `schemas/career-data.schema.json` — import/export contract
- `tests/` — duplicate, migration, ATS, evidence, and export checks
- `templates/` — plain-text reference copies for use outside the app

## Privacy and recovery

No data leaves the computer unless the user clicks an external posting link or exports/shares a file. Clearing browser storage removes the working copy, so keep dated JSON exports. The reset button requires confirmation and restores the shipped baseline.
