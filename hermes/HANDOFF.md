# Handoff — Midnight Magnolia / Hermes Setup

*Written 2026-07-28 to hand this work off from a Claude Code session to Cursor. Self-contained
— read this instead of trying to reconstruct the prior conversation.*

## What this project is

Setting up Hermes (an always-on AI ops assistant) for Midnight Magnolia (Rumi-Nations LLC),
plus finishing the business's actual launch work: the website, shop, an archival/MLIS
career pivot, and a Mac/OneDrive/Google Workspace file cleanup. Not a greenfield build —
there's substantial existing infrastructure (Airtable bases, a coded CareerSystem app, an
Obsidian genealogy vault) that this work integrates with rather than replaces.

## Authoritative documents (read these, in this order)

1. **`hermes/PLATFORM_PLAN.md`** — the real platform/subscription architecture. Decided
   2026-07-28. If anything elsewhere disagrees with this file, this file wins.
2. **`hermes/SETUP_PLAN.md`** — the security-first Hermes rollout sequence (7 chunks).
   References PLATFORM_PLAN.md and SOUL.md as authoritative. **Chunk 1 is complete; Chunk 2
   (prepare a dedicated, hardened, non-admin server account) is the next action.**
3. **`hermes/SOUL.md`** — Hermes's identity, Action Boundaries (the CONFIRM rules),
   Operating Priorities, and Daily Nudge spec. This is the single source of truth for how
   Hermes should behave — don't write a competing priority list or confirmation policy
   anywhere else.
4. **`~/.claude/plans/plan-for-setting-up-joyful-avalanche.md`** (on this Mac, outside the
   repo) — the business-goal-tracking plan (Website/Shop/Cleanup/Career) that sits on top of
   the three docs above. Worth pulling into the repo if Cursor should own it going forward.

## Key decisions already locked in

- **Production website = `GitHub → Vercel Pro → midnight-magnolia.com`.** Wix is *not* the
  homepage — it's a paid transition bridge only through **February 2027**, being migrated
  off (blog + booking content).
- **Gumroad** = digital products/delivery. **Buy Me a Coffee** =
  membership/community support (replaces Patreon). **Substack** = newsletter only, not a
  membership-platform alternative.
- **Make.com only** for automation — Zapier is an explicit "do not add."
- Airtable / Notion / Supabase all stay on free tiers until a real limit blocks work.
- Career direction: **archival/MLIS pivot is current**, not the old ops/PM (Program
  Manager/TPM/Implementation Manager) positioning.
- Hermes runs on its own dedicated server — **never** given direct access to the MacBook
  Pro, OneDrive, or Google Workspace accounts (this is a hard rule in SOUL.md's System
  Boundaries, tied to keeping the user's Trident Tech IT/cybersecurity coursework machine
  clean).

## Already done (verify, don't redo)

- **`hermes/SOUL.md`** exists (superseding an earlier draft) with full Action Boundaries,
  Source of Truth, and Daily Nudge spec.
- **CareerSystem app** (`CareerSystem/` in this repo) retargeted from ops/PM to
  archival/MLIS:
  - `data/shared-data.js` and `data/resume_tracks.json`: added `track-f-archival` (status
    `Primary`), Tracks B (Implementation PM) and D (Program/Project Mgmt) set to `Retired`.
  - `CareerCommandCenter.jsx` Track C variant reframed to a "Metadata, Digital Preservation
    & Library Technology Systems" positioning.
  - Both files validated (`resume_tracks.json` parses as JSON; `shared-data.js` passes
    `node --check`).
- **Resume files archived:** the four ops/PM-track originals moved from `CareerSystem/resumes/`
  to `CareerSystem/archive/resumes-ops-pm-track/` (`LVW_Resume_TrackB_Implementation_PM.docx`,
  `LVW_Resume_TrackD_ProgramProjectMgmt.docx`, `LVW_Resume_TrackE_Operations_Compliance.docx`,
  `2LVW_TrackB_DigitalTransformation_ImplementationPM.docx`). These files are gitignored
  (not tracked), so nothing needs committing for that move.
  - **Deliberately left untouched:** identical copies in `CareerSystem/artifacts/` and
    `CareerSystem/wix_uploads/` — `wix_uploads/` is referenced by `data/resume_tracks.json`
    and may be live-linked from the Wix site. `resume_tracks.json`'s actual `local_file`
    pointers reference `artifacts/`, not `resumes/`, so nothing broke.
- **10 true-duplicate planning documents deleted** from
  `~/Documents/MidnightMagnoliaDocs/` (verified byte-identical via md5 first): duplicate
  copies of `MM_Canonical_Master_Plan_v3.html`, `MM_Integration_v4.html`,
  `Airtable_Schema_Automations.html`, `Airtable_Family_Tree_Setup.html`, both
  `Airtable_Omni_*_Prompt.md` files, and the `Latisha_VincentWaters_*` resume/LinkedIn docs
  that were duplicated into nested `MidnightMagnolia/files/` and `completeairtable/`
  subfolders. Canonical top-level copies were kept.

## Immediate next actions, in priority order

1. **SETUP_PLAN.md Chunk 2** — prepare the dedicated, hardened Hermes server account
   (non-admin, firewall, auto security updates, encrypted backups, secrets in env vars/
   secret manager, log rotation with redaction). Needs the user's own hosting decision —
   not yet chosen in this session.
2. **Website Launch Gaps** (from PLATFORM_PLAN.md, still open):
   - Grimoire email gate only stores the address client-side — wire it to a real Substack
     signup.
   - `/booking-calendar` has no real Vercel page — connect a real destination or remove the
     CTA.
   - Decide the permanent home for Wix-backed Grimoire posts before Feb 2027.
   - Swap the general Gumroad profile link for product-specific links as products go live.
3. **Ship Now / Ship Later / Cut pass** on the P0–P7 digital product ladder (Gumroad) — not
   yet done, needs a decision session with the user.
4. **Portfolio narrowing pass** (Ready to show / Needs work / Cut) on the four candidate
   archival portfolio pieces (Vincent/Vinson Genealogical Archive, Statewide Community
   Documentation & Healing Resources Platform, Organizational Records Digitization,
   Midnight Magnolia Knowledge Archive) — not yet done.
5. **Populate the Airtable "MLIS Research" table** with UNC-Chapel Hill's MLIS and MDS
   programs as the first two rows — not yet done (needs Airtable access).

## Known gotchas

- This repo (`MidnightMagnolia`) is on branch `fix/vercel-build` with substantial unrelated
  uncommitted/staged changes already present — don't assume a clean tree, and don't run
  broad `git add`/commit without checking `git status` scoped to whatever you're touching.
- The user's shell has `node` aliased to `cd ~/Development/Languages/JavaScript/Node` —
  use `/opt/homebrew/bin/node` directly (or another real path from `which -a node`) when
  you need the actual Node binary.
- `CareerSystem/resumes/`, `artifacts/`, and `wix_uploads/` all hold overlapping but not
  identical sets of resume files — check `data/resume_tracks.json`'s `local_file` /
  `base_resume_local_file` fields before moving or deleting anything in those folders.
- There's an Obsidian vault for the Vincent/Vinson genealogy research that's intentionally
  **separate** from the Airtable Family Tree base — don't try to merge or sync them
  automatically; the link between them is manual (a research finding gets copied into the
  Airtable Research Log by hand to fire its "Content Potential" automation).
