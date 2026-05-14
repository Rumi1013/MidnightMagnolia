# Portfolio resume URLs (Archival + Data)

**Contract (fixed):**

| Env | Resume |
|-----|--------|
| `RESUME_TRACK_A_URL` | **Archival** — primary (preservation, archivist, recovery-oriented narrative) |
| `RESUME_TRACK_B_URL` | **Data** — secondary (systems, documentation platforms, metadata/taxonomy) |

Host PDFs on Wix Media, Stan, Drive, or any HTTPS URL; paste into `.env.local`. Next.js `/portfolio` reads these at build time (`getStaticProps`).

Optional **Featured** case-study links:

- `NEXT_PUBLIC_PORTFOLIO_FEATURED_GENEALOGY_URL` (defaults to `NEXT_PUBLIC_SITE_URL`)
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL`

See `lib/constants.js` `FEATURED_PORTFOLIO_CARDS` for the four-card copy.
