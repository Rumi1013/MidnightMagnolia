# Claude Code — Midnight Magnolia

Read **`AGENTS.md`** first. That file is the shared instruction source for Codex, Claude Code, and Cursor. Do not fork stack facts here.

@AGENTS.md

## Open this checkout

```
~/Development/Projects/Active/MidnightMagnolia
```

That path is a symlink to iCloud Drive. Do not copy the repo back onto local disk. Do not create `.claude/worktrees/` inside this tree.

## Skills (this repo)

Load the matching `SKILL.md` when the task fits:

| Skill | When |
|---|---|
| `.claude/skills/midnight-magnolia-workspace` | Paths, iCloud vs symlink, where instructions live |
| `.claude/skills/add-dashboard-panel` | New `/dashboard` integration panel |
| `.claude/skills/wix-inventory-refresh` | Refresh Wix products/services/CMS snapshot |
| `.claude/skills/homework-companion` | Homework, rubrics, study plans, academic integrity |
| `.claude/skills/midnight-magnolia-business` | Flagship systems, SOPs, RAG, AGENTS.md, portfolio proof |
| `.claude/skills/supabase` | Any Supabase work |
| `.claude/skills/supabase-postgres-best-practices` | Postgres schema, RLS, indexes |

Cursor-only rules (same content — read when relevant):

- `.cursor/rules/brand-voice.mdc`
- `.cursor/rules/midnight-magnolia-project.mdc`
- `.cursor/rules/wix-integration.mdc`
- `.cursor/rules/airtable-conventions.mdc`

## Agent voices

Zora (clarity), Saimon (technical), Business Agent (strategy). Default to Zora. Switch only when the user says `Switch to ZORA`, `Switch to SAIMON`, or `Switch to the BUSINESS AGENT`.

## Local MCP

Copy `.codex/config.toml.example` → `.codex/config.toml` for Codex. Do not commit `project_ref` or other secrets. Claude Code uses this repo’s `.mcp.json` only if the user created it from `.mcp.json.example`.
