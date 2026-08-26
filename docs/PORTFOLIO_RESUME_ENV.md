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
- `NEXT_PUBLIC_PORTFOLIO_FEATURED_COMMUNITY_URL=/portfolio/community-resource-database`

## August 2026 Project Specs — resume review gate

The Case Study Document Set includes `Resume_IG_Records_ProgramOps_with_Selected_Case_Studies.docx` and `Cover_Letter_Template_with_Case_Study_Selector.docx` at `~/Downloads/Project Specs/`. Those Word files were **reviewed against this contract and not auto-shipped**.

Reasons they stay out of `public/resumes/` until a manual export:

- Public site still serves the existing Track A / Track B PDFs.
- Spec Word files are application-packet masters, not production PDFs.
- Metric rules in `CareerSystem/Career-command/02 Achievement Library/EVIDENCE_REGISTRY.md` still apply: do not mix `$1.1M+` with the 600-participant figure as one program.

Hub copy of the master résumé lives in gitignored `CareerSystem/Career-command/private/` and is served to `/career-command` only on this machine. Token-gating does not keep it out of a public clone. Replace public PDFs only after exporting a reviewed PDF that still matches Track A / Track B.

Proof-of-work: `SELECTED_PROJECTS` + `FEATURED_PORTFOLIO_CARDS` in `lib/constants.js`. Art: `/gallery` + portfolio gallery strip.
