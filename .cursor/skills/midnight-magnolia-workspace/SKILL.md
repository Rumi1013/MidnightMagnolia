---
name: midnight-magnolia-workspace
description: Midnight Magnolia workspace layout after the iCloud move — canonical paths, symlink, agent instruction files, and skill locations for Codex, Claude Code, and Cursor. Use when opening the repo, setting up agents, or when paths, worktrees, or "where does this live" come up.
---

# Midnight Magnolia workspace

## Open here

`~/Development/Projects/Active/MidnightMagnolia`

Symlink → iCloud:

`~/Library/Mobile Documents/com~apple~CloudDocs/Development/Projects/Active/MidnightMagnolia`

Assets sibling: `MidnightMagnolia-Assets` (same iCloud / symlink pair). Docs: `~/Documents/MidnightMagnoliaDocs`. Secrets: repo `.env.local` only.

## Instructions

| File | Who reads it |
|---|---|
| `AGENTS.md` | Codex, Cursor, Claude Code (via `CLAUDE.md`) |
| `CLAUDE.md` | Claude Code entry |
| `.cursor/rules/*.mdc` | Cursor always / glob rules |

## Skills

Canonical copies: `.cursor/skills/<name>/SKILL.md`.

Claude Code and Codex see the same skills through symlinks:

- `.claude/skills/<name>` → `../../.cursor/skills/<name>`
- `.agents/skills/<name>` → `../../.cursor/skills/<name>`

Vendor Supabase skills stay under both `.claude/skills/` and `.agents/skills/` (see `skills-lock.json`).

## Do not

- Nested git worktrees under `.claude/worktrees/` or `.kilo/worktrees/`
- A second full clone on local disk
- Pointing `NEXT_PUBLIC_WIX_STOREFRONT_URL` at `www` (www is Vercel)
