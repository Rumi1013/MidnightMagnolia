# Portfolio resume URLs (Archival + Data)

**Contract (fixed):**

| Env | Resume |
|-----|--------|
| `RESUME_TRACK_A_URL` | **Archival** — primary (preservation, archivist, recovery-oriented narrative) |
| `RESUME_TRACK_B_URL` | **Data** — secondary (systems, documentation platforms, metadata/taxonomy) |

Host PDFs under `public/resumes/` (repo) or on Wix Media / Drive; paste into `.env.local`. Next.js `/portfolio` reads these at build time (`getStaticProps`).

Shipped defaults (Active ASAP):

- `RESUME_TRACK_A_URL=/resumes/resume-track-a-archival-preservation.pdf`
- `RESUME_TRACK_B_URL=/resumes/resume-track-b-data-systems.pdf`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL=/portfolio/statewide-documentation`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL=/portfolio/records-digitization`

See `lib/constants.js` `FEATURED_PORTFOLIO_CARDS` for the four-card copy.
