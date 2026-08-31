# 01 · Connect and run your first loop

**What you get:** Stanley wired into Claude, a verified list of what's connected, and one post drafted and scheduled.

**Needs:** a Stanley account ([getstanley.ai](https://getstanley.ai)) with at least one platform linked.

## Connect the MCP

Three ways in, pick one.

**Claude Code, inside this repo.** The repo ships a [.mcp.json](../.mcp.json) pointing at `https://xapi.getstanley.ai/mcp`. Open the cloned folder in Claude Code, approve the project MCP server when asked, then run `/mcp` to sign in.

**Claude Code, any folder.**

```bash
claude mcp add --transport http stanley https://xapi.getstanley.ai/mcp
```

Then `/mcp` to sign in.

**claude.ai.** Settings → Connectors → Add custom connector, paste the URL above.

## Audit what's connected

Paste this into Claude:

> Ask Stanley to list every platform and integration currently connected for this account, flag anything expired or broken, and show the configured posting slots.

You get back a short rundown: connected accounts, anything with an expired session, missing platforms, and your posting slots with their timezone. Fix gaps at getstanley.ai, not here. Inside this repo, `/stanley-start` runs the same audit and tells you which recipes your setup can run.

## First loop: draft, then schedule

1. **Draft.** "Ask Stanley for one post in my voice for [your strongest connected platform] about [something you did this week]." The draft arrives wrapped in a platform tag like `<tweet>`, which is normal (see [recipe 09](09-what-stanley-can-do.md)).
2. **Push back once.** Tell him what reads wrong. He holds voice context between messages, so one round of notes tends to land.
3. **Schedule rather than publish.** "Schedule this into my next open slot." Scheduling is reversible and asks no permission; publishing live is the step that checks with you first.
4. **Look at the calendar.** "Show me my content calendar for the next 7 days."

Every other recipe in this cookbook is a bigger version of that loop.

## When it breaks

- No `message_stanley` tool: the server wasn't approved or your sign-in lapsed. Re-run `/mcp`.
- "Nothing connected": link a platform at getstanley.ai first. The cookbook can't do that part for you.
- The draft sounds like anyone: your voice profile is thin. Paste 3 to 5 posts you wrote yourself and ask Stanley to update it.
