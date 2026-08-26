# Local-first Command Hub packet

This folder is gitignored except this README. It holds the August 2026 binder extract — résumé, application-bank bullets, dollar targets, risk triggers — that must not ship in a public git history.

| File | Role |
|---|---|
| `src/` | Editable JS modules (full Hub copy) |
| `command-hub.packet.json` | Bundled packet served by `GET /api/career-command/packet` on this machine |
| `build-packet.cjs` | Rebuilds the JSON from `src/` via the already-bundled `/tmp` file |

Vercel and a public clone show the Hub **shell**: nav, Airtable jobs, public `/portfolio` links. Full copy appears only when `command-hub.packet.json` is present locally.

Do not commit this folder. Specs stay in `~/Downloads/Project Specs/`.
