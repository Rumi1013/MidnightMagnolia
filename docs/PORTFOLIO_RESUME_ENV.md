# Portfolio resume URLs (Career Command)

**Contract (fixed):**

| Env | Resume |
|-----|--------|
| `RESUME_TRACK_A_URL` | **Flagship Executive ATS** — primary (Career Command working master) |
| `RESUME_TRACK_B_URL` | **Executive Networking** — secondary (shorter networking draft) |

Source pack: `CareerSystem/Career command /` (exported from Career Command; the Docs `career-command-center.zip` is the app scaffold only and does not contain PDF binaries).

Host PDFs under `public/resumes/` (repo); paste into `.env.local`. Next.js `/portfolio` reads these at build time (`getStaticProps`).

Shipped defaults (Active ASAP):

- `RESUME_TRACK_A_URL=/resumes/resume-track-a-flagship-executive-ats.pdf`
- `RESUME_TRACK_B_URL=/resumes/resume-track-b-executive-networking.pdf`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL=/portfolio/statewide-documentation`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL=/portfolio/records-digitization`

See `lib/constants.js` `FEATURED_PORTFOLIO_CARDS` for the four-card copy.
