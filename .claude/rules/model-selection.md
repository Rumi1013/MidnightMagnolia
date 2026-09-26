# Model Selection — Midnight Magnolia

Route work to the cheapest model that holds quality. Judge by **cost per completed task**, not per request — a cheap model that needs three retries is not cheap.

## Tiers

| Model | ID | $/1M in / out | Use for |
|---|---|---|---|
| Haiku 4.5 | `claude-haiku-4-5` | $1 / $5 | Bulk, simple, fast |
| Sonnet 5 | `claude-sonnet-5` | $2 / $10 | Daily default |
| Opus 5.5 | `claude-opus-5-5` | $4 / $20 | Hard reasoning, architecture |
| Fable 5.1 | `claude-fable-5-1` | $10 / $50 | Escalation only |

### Haiku 4.5 — sort and skim
- Tagging, classification, routing (Airtable rows, email triage, Notion cleanup)
- Field extraction, alt text, metadata, short rewrites
- Read-heavy subagents that search many files and report back

### Sonnet 5 — default
- Routine code: Next.js pages, components, bug fixes, coursework (CPT 262/187/180, Data Analytics)
- Copy: Gumroad listings, product descriptions, blog drafts, email sequences
- Make.com / Zapier / Airtable automation logic
- Well-scoped multi-step agent tasks

### Opus 5.5 — decision points
- System design: Wix Headless ↔ Next.js ↔ Vercel wiring, data models, Supabase RLS
- Multi-file debugging with an unclear root cause
- Long autonomous coding sessions
- Strategy with competing constraints (brand, pricing, pipeline, DNS cutover)
- Reviewing work Sonnet produced before it ships

### Fable 5.1 — escalation
- Only after Opus 5.5 got it wrong, or for high-stakes long research/synthesis
- Expect slower, longer turns

## Rules

1. **Subagents (Agent tool `model` param):**
   - Search / read / inventory → `haiku`
   - Implementation of a scoped task → `sonnet`
   - Planning, architecture, security or code review → `opus`
2. **Recommending a model to the user:** name the tier above and why in one line. If the current session model is overkill or underpowered for the task, say so.
3. **Claude API code in this repo:** pick the model ID from the table by workload. Use `claude-sonnet-5` for app features (listing generation, content pipeline); `claude-haiku-4-5` for batch tagging/classification; `claude-opus-5-5` only for routes that need deep reasoning. Read the model from an env var (e.g. `ANTHROPIC_MODEL`) so it can change without a deploy.
4. **Lower effort before downgrading.** Try `output_config.effort` at `low`/`medium` on the stronger model first — staying on one model keeps the prompt cache warm (caches are per-model). Opus 5.5 defaults to `medium`; set it explicitly.
5. **Escalate on evidence, not vibes.** Move up a tier only after a failed or low-quality attempt, or when the task is clearly in the higher tier's list.

Prices cached 2026-06-24 — verify against live Anthropic pricing before budgeting.
