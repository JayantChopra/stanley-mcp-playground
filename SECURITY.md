# Security Policy

This repository ships documentation, Claude Code skills, an MCP configuration, and a static site. It contains no server code, but its contents get executed in a meaningful sense: skills are instructions Claude follows while connected to real social accounts, and the MCP config points every clone at a live endpoint. We treat both as security surfaces.

## Supported versions

Only the latest `main` is supported. There are no release branches; fixes land on `main` and deploy from there.

## Reporting a vulnerability

**Do not report security issues as public GitHub issues or pull requests.**

Use [GitHub Private Vulnerability Reporting](https://github.com/JayantChopra/stanley-mcp-playground/security/advisories/new) on the Security tab. It keeps the report private and tracked. You'll get an acknowledgement within a few days, and credit in the fix unless you ask to stay anonymous.

## What counts as a vulnerability here

In scope:

- **Skill or recipe content that weakens the approval model.** Every skill carries hard rules: never publish live, delete, DM, or email without the user's explicit approval. A change that removes, softens, or side-steps those rules, or wording that could steer Claude into irreversible actions the user didn't ask for, is a security issue, not a docs nit.
- **Prompt-injection vectors** in recipes, skills, or site content: text crafted so that a user following the cookbook causes Claude to take actions they didn't intend.
- **The MCP configuration.** `.mcp.json` must point only at `https://xapi.getstanley.ai/mcp`. A PR that swaps or adds endpoints deserves hostile review.
- **Leaked credentials** anywhere in the repo history: API keys, tokens, session cookies, or personal account data.
- **The static site** under `site/`: script injection, or content that differs from what the repo's markdown says.

Out of scope:

- Vulnerabilities in Stanley itself or the `xapi.getstanley.ai` service. Report those to the Stanley team through [getstanley.ai](https://getstanley.ai).
- Vulnerabilities in Claude, Claude Code, or MCP as a protocol. Report those to Anthropic.
- Social-engineering attacks against users that don't involve this repo's content.

## Rules that protect users

Two standing rules exist so a cloned cookbook can't hurt anyone, and PRs that break them will be closed:

1. No secrets in the repo, ever. Recipes that need API keys tell users to keep them in their own environment or MCP client config.
2. Skills must state the approval rules explicitly and instruct Claude to audit connections rather than assume them.
