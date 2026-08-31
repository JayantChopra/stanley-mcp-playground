# Changelog

Notable changes to the cookbook. Format follows [Keep a Changelog](https://keepachangelog.com/); the project does not version recipes individually, so entries track what a reader can do that they couldn't before.

## [Unreleased]

### Changed

- Recipes renumbered 01 to 09: the walkthroughs now start at 01, and the capability reference moved from 00 to 09, where reference matter belongs.
- Site restyled to the halftone design system, with the spec's scroll motion, an animated circuit-board dither band in the footer, and an `llms.txt`.

## [0.1.0] - 2026-08-31

### Added

- Nine recipes, `00` through `08`: capability reference, first connection, weekly planning, build in public, analytics review, trend scouting, repurposing, external media, and rituals.
- Five drop-in Claude Code skills under `.claude/skills/`: `stanley-start`, `stanley-week-plan`, `build-in-public`, `stanley-review`, `repurpose`.
- `.mcp.json` so a fresh clone registers the Stanley MCP server automatically.
- `CLAUDE.md` routing: Claude audits the user's connections and recommends recipes instead of guessing.
- Static cookbook site under `site/`, built by `tools/build-site.mjs`.
- Prose lint (`tools/lint.py`) and CI enforcing the writing standard and link integrity.
- Community docs: contributing guide, code of conduct, security policy, Apache-2.0 license.
