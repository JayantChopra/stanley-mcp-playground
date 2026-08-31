# Contributing

Thanks for wanting to add to the cookbook. This document covers how recipes get written, tested, and landed. For anything non-trivial (a new recipe, a new skill, changes to the approval rules), open an issue first so we can agree on direction before you write.

## Table of contents

- [Ground rules](#ground-rules)
- [What makes a recipe](#what-makes-a-recipe)
- [The writing standard](#the-writing-standard)
- [Skills](#skills)
- [The site](#the-site)
- [Lint](#lint)
- [Pull requests](#pull-requests)
- [Reporting issues](#reporting-issues)
- [Security](#security)
- [License](#license)

## Ground rules

- **Run it before you write it.** Every recipe and skill in this repo has been executed against a real Stanley account. Yours must be too. The cookbook's whole value is that the steps work as written.
- **Never fabricate output.** If you show what Stanley replies, show what he replied to you, with your personal data redacted. No invented numbers, no imagined results.
- **The approval model is a stability surface.** The facts in [recipes/00-what-stanley-can-do.md](recipes/00-what-stanley-can-do.md) and the hard rules inside every skill are what keep a cloned cookbook safe to follow. Changes there get the closest review, the way a database project reviews its storage format.
- Small, focused PRs land faster than sprawling ones.

## What makes a recipe

Recipes live in [recipes/](recipes/), numbered in learning order. Each one follows the same skeleton:

```markdown
# NN · Title

**What you get:** one concrete line.
**Needs:** required connections, ending with "run /stanley-start if you are not sure what you have".

## (sections as the material demands)
```

Beyond the skeleton, every recipe includes three things: a numbered walkthrough where steps pair an instruction with a paste-able prompt in a blockquote, a "where things land" note (calendar slot, staged media, live post, or draft), and a short failure-and-fix section. Link [recipe 00](recipes/00-what-stanley-can-do.md) for limits and [recipe 01](recipes/01-first-connection.md) for connection trouble instead of restating them. Keep files under roughly 110 lines; a recipe that needs more is probably two recipes.

Blockquotes are a contract: anything in `>` is text a reader can paste into Claude verbatim. Write them the way a person types, not the way an API doc reads.

## The writing standard

The prose here is plain and direct, and CI enforces the mechanical parts:

- No marketing voice. A recipe gives directions; it doesn't sell.
- Zero em dashes, zero exclamation marks. Use commas, colons, parentheses, or a new sentence.
- A banned-word list ([tools/lint.py](tools/lint.py)) blocks the vocabulary that makes text read machine-written: `delve`, `seamless`, `leverage`, `supercharge`, and friends.
- Vary sentence length. Never fabricate specifics. Hypotheticals start with "say" or "suppose".
- Second person, contractions welcome.

Run the lint locally before pushing; it's the same check CI runs.

## Skills

Skills live under [.claude/skills/](.claude/skills/), one directory per skill with a `SKILL.md`. Claude Code picks them up automatically for anyone who opens the repo. The format:

```markdown
---
name: skill-name
description: What it does, plus when Claude should use it. One sentence.
---

Numbered steps addressed to Claude (the agent), not the reader.
```

Two blocks are mandatory in every skill body, and PRs that drop them will be closed (see [SECURITY.md](SECURITY.md)):

1. The hard rules: never publish live, delete, DM, or email without the user's explicit approval in the conversation; scheduling drafts is allowed because it's reversible.
2. The connection check: if connections are unknown, run the audit prompt before doing anything else.

Keep skills under 40 lines. A skill executes a recipe; the recipe explains it. Ship them as a pair.

## The site

The static site under [site/](site/) is generated from the recipes by [tools/build-site.mjs](tools/build-site.mjs). If your PR touches anything in `recipes/`, rebuild and commit the output:

```bash
npm install
node tools/build-site.mjs
```

The site deploys automatically when your PR merges; there is no separate deploy step.

## Lint

```bash
python3 tools/lint.py
```

Checks every markdown file for banned vocabulary, em dashes, exclamation marks, and broken relative links. CI runs exactly this. A clean local run means a green check.

## Pull requests

1. Branch off `main`. Names are loose; `recipe/short-desc` or `fix/short-desc` reads well.
2. One logical change per PR.
3. Fill in the [PR template](.github/PULL_REQUEST_TEMPLATE.md), including the "I ran this for real" checkbox, honestly.
4. Update [CHANGELOG.md](CHANGELOG.md) under `## [Unreleased]` for anything reader-visible.
5. A [CODEOWNER](.github/CODEOWNERS) review is required; skills and `.mcp.json` get extra scrutiny.

We squash-merge, so keep the PR title in shape; it becomes the commit.

## Reporting issues

Use the issue templates: [recipe proposal](.github/ISSUE_TEMPLATE/recipe-proposal.md) for new workflows, [bug report](.github/ISSUE_TEMPLATE/bug-report.md) when a recipe doesn't work as written. A good bug report names the recipe, what you did, what Stanley replied (redacted), and what your `/stanley-start` audit shows.

## Security

Do not file security issues publicly. See [SECURITY.md](SECURITY.md) for what counts and how to report privately. In this repo, wording that weakens the approval rules is a security issue.

## License

By contributing, you agree your contributions are licensed under the [Apache License 2.0](LICENSE).
