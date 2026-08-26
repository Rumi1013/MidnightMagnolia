# Portfolio resume URLs (Career Command)

**Contract (fixed):** archive / knowledge-management tracks only.

| Env | Resume |
|-----|--------|
| `RESUME_TRACK_A_URL` | **Flagship Executive ATS Working Master** — IG / knowledge systems / digital stewardship |
| `RESUME_TRACK_B_URL` | **Executive Networking Working Draft** — same story, lighter networking packet |

**Do not ship** the older ops/leadership-framed `Flagship Executive ATS Resume.docx` (non–Working Master) as Track A.

Source pack: `CareerSystem/Career command /01 Resumes/`. Funding figure on these tracks is **$1.1M+** (not $1.5M).

Host PDFs under `public/resumes/` (repo). `/portfolio` defaults to those paths when env is unset.

Shipped defaults:

- `RESUME_TRACK_A_URL=/resumes/resume-track-a-flagship-executive-ats.pdf`
- `RESUME_TRACK_B_URL=/resumes/resume-track-b-executive-networking.pdf`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_STATEWIDE_URL=/portfolio/statewide-documentation`
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_DIGITIZATION_URL=/portfolio/records-digitization`

Proof-of-work: `SELECTED_PROJECTS` + `FEATURED_PORTFOLIO_CARDS` in `lib/constants.js`. Art: `/gallery` + portfolio gallery strip.
