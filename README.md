<p align="center">
  <a href="https://stanley-cookbook.vercel.app">
    <img src=".github/assets/header.svg" alt="stanley-mcp-playground" width="100%" />
  </a>
</p>

<p align="center">
  <strong>The cookbook for the Stanley MCP: run your content operation from a conversation.</strong>
</p>

<p align="center">
  <a href="https://github.com/JayantChopra/stanley-mcp-playground/actions/workflows/lint.yml"><img src="https://github.com/JayantChopra/stanley-mcp-playground/actions/workflows/lint.yml/badge.svg" alt="lint" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg" alt="License: Apache 2.0" /></a>
  <a href="recipes/"><img src="https://img.shields.io/badge/recipes-9-d9482b.svg" alt="Recipes: 9" /></a>
  <a href=".claude/skills/"><img src="https://img.shields.io/badge/skills-5-efc94c.svg" alt="Skills: 5" /></a>
  <a href="https://github.com/JayantChopra/stanley-mcp-playground/issues"><img src="https://img.shields.io/github/issues/JayantChopra/stanley-mcp-playground.svg" alt="Issues" /></a>
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#recipes">Recipes</a> ·
  <a href="#skills">Skills</a> ·
  <a href="https://stanley-cookbook.vercel.app">Site</a> ·
  <a href="CONTRIBUTING.md">Contributing</a> ·
  <a href="CHANGELOG.md">Changelog</a>
</p>

---

## What is this?

**stanley-mcp-playground** is a cookbook for [Stanley](https://getstanley.ai), an AI content-marketing agent, connected to Claude over MCP. Stanley handles voice, calendar, publishing, and analytics; Claude handles orchestration: reading your commits and meeting notes, pulling assets from design tools, chaining steps, running things on a schedule. Every recipe here lives in the seams between the two, and every prompt in them has been run against a real account before landing.

The cookbook teaches nine workflows, in learning order: connect and audit, plan a week in one sitting, turn merged PRs into build-in-public posts, review your own numbers, scout trends, repurpose across platforms, attach media from any outside tool, and put all of it on a schedule.

## Quickstart

```bash
git clone https://github.com/JayantChopra/stanley-mcp-playground.git
cd stanley-mcp-playground
claude
```

Approve the project MCP server when Claude Code asks, sign in with `/mcp`, then say **"where do I start"**. Claude audits what you've connected and points you at the recipes your setup can run.

On claude.ai instead: add `https://xapi.getstanley.ai/mcp` as a custom connector (Settings → Connectors) and paste prompts straight from the recipes. You'll need a Stanley account with at least one platform linked, from [getstanley.ai](https://getstanley.ai).

## How it works

```
 you ──▸ Claude ──▸ message_stanley ──▸ Stanley ──▸ X · LinkedIn · Threads · Instagram*
           │                              │
      your other tools               calendar · analytics · media · rituals
      (GitHub, Canva, Notion…)
                                     * Instagram drafts wait for your hand, by design
```

On Claude's side, Stanley is a single MCP tool with persistent conversation state, so recipes are conversation patterns rather than API call sequences. The full capability sheet, limits, and approval model live in [recipe 00](recipes/00-what-stanley-can-do.md).

## Recipes

| # | Recipe | In one line |
|---|--------|-------------|
| 00 | [What Stanley can do](recipes/00-what-stanley-can-do.md) | the capability reference every other recipe leans on |
| 01 | [Connect and run your first loop](recipes/01-first-connection.md) | MCP setup, connection audit, draft then schedule |
| 02 | [Plan a week in one sitting](recipes/02-content-calendar.md) | fill your calendar slots from one working session |
| 03 | [Build in public](recipes/03-build-in-public.md) | commits and PRs turned into story posts |
| 04 | [Analytics review](recipes/04-analytics-review.md) | SQL over your own post metrics, fed back into planning |
| 05 | [Trend scouting](recipes/05-trend-scouting.md) | niche trends, video teardowns, creator audits |
| 06 | [Repurposing](recipes/06-repurposing.md) | one piece of content, every platform |
| 07 | [External media](recipes/07-external-media.md) | Canva, Recraft, or anything with a URL, attached to drafts |
| 08 | [Rituals](recipes/08-rituals.md) | morning briefs, cron jobs, poll-based triggers |

The same recipes render at **[stanley-cookbook.vercel.app](https://stanley-cookbook.vercel.app)**, with copy buttons on every paste-able prompt.

## Skills

[`.claude/skills/`](.claude/skills/) ships five slash commands that work the moment you open this repo in Claude Code:

| Skill | What it does |
|-------|--------------|
| `/stanley-start` | audits your connections, recommends the recipes your setup can run |
| `/stanley-week-plan` | plans and bulk-schedules a week of posts interactively |
| `/build-in-public` | scans your GitHub activity and drafts posts from what you pick |
| `/stanley-review` | runs the weekly analytics review as a short digest |
| `/repurpose` | converts one post into drafts for every platform you name |

Copy any folder into `~/.claude/skills/` to use it outside this repo. Every skill carries the same hard rules: nothing publishes live, gets deleted, or goes out as a DM or email without your explicit approval; scheduling drafts is allowed because it's reversible.

## Repository layout

```
recipes/          the nine recipes, numbered in learning order
.claude/skills/   drop-in slash commands
site/             the static site, generated from recipes/ by tools/build-site.mjs
tools/            prose lint + site builder
.mcp.json         registers the Stanley MCP for anyone who clones
CLAUDE.md         tells Claude to audit connections and route, not guess
```

## Status

Recipes `00` through `08` are complete and tested against a live account. Planned next: worked examples with real (redacted) output in every recipe, a meeting-notes-to-post recipe, and a monitoring digest recipe. Track [CHANGELOG.md](CHANGELOG.md).

## Community

- **Bugs and recipe proposals**: [GitHub Issues](https://github.com/JayantChopra/stanley-mcp-playground/issues), templates provided
- **Security**: see [SECURITY.md](SECURITY.md); in this repo, wording that weakens the approval model counts
- **Conduct**: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## Contributing

Contributions are welcome, with one non-negotiable: run your recipe against a real Stanley account before you submit it. Start with [CONTRIBUTING.md](CONTRIBUTING.md); CI enforces the writing standard, so run `python3 tools/lint.py` before pushing.

## License

[Apache License 2.0](LICENSE).

Copyright © 2026 Jayant Chopra
