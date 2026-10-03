# Model routing

Which Claude model handles which kind of work, for two audiences: (a) Claude Code / agent sessions on this repo, (b) models called from inside a business automation (Make/Zapier/Airtable step).

Models: **Haiku 4.5**, **Sonnet 5**, **Opus 5.5**, **Fable 5.1**.

## (a) Dev/agent task routing

Maps to the existing Zora / Saimon / Business Agent voice split (`CLAUDE.md`).

| Model | Use for | Examples |
|---|---|---|
| **Sonnet 5** — default | Saimon (technical) work | Coding, refactors, dashboard panel wiring (`.claude/skills/add-dashboard-panel`), most Claude Code sessions, `/code-review` at low/medium effort, routine content edits |
| **Opus 5.5** — escalate | High-stakes or wide-blast-radius work | Flagship Roots/Press schema design, multi-file architecture changes, `/code-review ultra`, Business Agent strategic synthesis (e.g. Flagship Build Guide gates), anything touching genealogy privacy rules |
| **Fable 5.1** — narrative/brand voice | Zora (clarity) copywriting where tone matters more than structure | Grimoire, Sanctuary, product descriptions, case-study prose — anywhere `.cursor/rules/brand-voice.mdc` governs |
| **Haiku 4.5** — cheap/high-volume | Mechanical, low-judgment passes | Batch metadata extraction (e.g. print sample inventory tagging), lint-style checks, summarizing long logs before handing to a bigger model |

## (b) Model embedded in business automations

Cost-driven — this is a solo-operator small business, not enterprise volume.

| Model | Use for | Automations (see `docs/AUTOMATION_SCHEMAS.md`) |
|---|---|---|
| **Haiku 4.5** | High-frequency, low-complexity classification/tagging | A-02 (customer tagging by product) |
| **Sonnet 5** | Customer-facing or judgment-requiring text generation | C-04 (Beehiiv draft + Notion social draft), H-02 (weekly digest summary), G-02 (product-ready content assessment) |
| **Opus 5.5 / Fable 5.1** | Not used in automations | Reserved for human-in-the-loop Claude Code sessions — automation volume/cost doesn't justify them, and unattended high-stakes generation (brand voice, architecture) shouldn't run without review |

Deterministic mappings (e.g. Gumroad sale → Airtable Sales Log row) use no model at all — a model call is only justified where the step requires drafting free text or fuzzy classification.
