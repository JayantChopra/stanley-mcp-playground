---
name: stanley-start
description: Audit what's connected to Stanley and recommend which cookbook recipes to run next. Use when the user is new to this repo, asks where to start, or wants to know what their setup can do.
---

Read-only audit. Never publish, schedule, or change anything while running this skill.

1. If the `message_stanley` tool is missing, walk them through the "Connect the MCP" section of recipes/01-first-connection.md and stop.
2. Send Stanley this through the `message_stanley` tool: "List every platform and integration currently connected for this account, flag anything expired or broken, and show the configured posting slots."
3. Show the user a short table: platform, status (connected, expired, or missing), notes.
4. If nothing is connected, stop and point them to getstanley.ai to link a platform. No recipe works without one.
5. Recommend next recipes using the routing map in this repo's CLAUDE.md. Name at most three, in order, each with one line on why it fits their setup. If posting history would decide a pick, ask Stanley how many posts he's tracked in the last 30 days rather than guessing.
