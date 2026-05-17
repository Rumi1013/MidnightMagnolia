# Administrator File Policy

This repository should contain application source, public assets, and public
documentation only.

Do not commit administrator-only documents or exports, including:

- Word, Excel, PowerPoint, PDF, InDesign, Pages, Numbers, Keynote, zip files.
- Personal resume drafts, contracts, business plans, research exports, vaults,
  Notion exports, Airtable exports, Canva exports, and genealogy source files.
- Local dashboards or generated helper apps used only by the administrator.

These folders are local-only and ignored by git:

- `files/`
- `automations/`
- `completeairtable/`
- `CareerSystem/`
- `Midnight Magnolia Genealogy Archive/`
- `tools/midnight-magnolia-dashboard/`
- `my-app/`
- `admin/`
- `private/`

If a local-only document is useful as content context, summarize the public-safe
copy into application source or `docs/`. Do not link directly to personal
workspace files, private exports, or proprietary source documents.

Before committing, run:

```bash
npm run private-files:check
```

The scanner fails if staged files include blocked document types or local-only
administrator paths. The only CSV exception is `data/inventory-*.csv`, which is
public site inventory source.
