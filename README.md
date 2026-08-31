# stanley-mcp-playground

A cookbook for the Stanley MCP: recipes and drop-in skills that show what you can do once Stanley (an AI content-marketing agent) is wired into Claude.

Stanley handles voice, calendar, publishing, and analytics. Claude handles orchestration: pulling assets from design tools, reading your commits and meeting notes, chaining steps, running things on a schedule. Everything in this repo lives in the seams between the two.

## Quickstart

```bash
git clone https://github.com/JayantChopra/stanley-mcp-playground.git
cd stanley-mcp-playground
claude
```

Approve the project MCP server when Claude Code asks, sign in with `/mcp`, then say "where do I start". Claude audits what you've connected and points you at the recipes your setup can run. On claude.ai instead: add `https://xapi.getstanley.ai/mcp` as a custom connector and paste prompts straight from the recipes.

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

## Skills

[.claude/skills/](.claude/skills/) ships slash commands that work the moment you open this repo in Claude Code: `/stanley-start` (connection audit plus recipe recommendations), `/stanley-week-plan`, `/build-in-public`, `/stanley-review`, and `/repurpose`. Copy any folder into `~/.claude/skills/` to use it outside this repo.

## What you need

A Stanley account with at least one platform linked ([getstanley.ai](https://getstanley.ai)), and Claude Code or claude.ai. Recipes list their own requirements at the top; none of them assume a specific setup, and recipe 01 shows you how to audit yours.
