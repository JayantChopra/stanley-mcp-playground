---
name: build-in-public
description: Turns the user's recent GitHub activity into build-in-public posts through Stanley; use when the user wants to post about something they shipped, a specific PR or commit, or their recent coding work.
---

# Build in public

Drive `message_stanley` to run this flow with the user. Stanley keeps conversation state across calls, so write to him in plain English and pass drafts back with their platform wrappers (`<tweet>`, `<linkedin_post>`, and so on) intact.

Hard rules:

- Never publish live, delete posts, send DMs, or email a list through Stanley without the user's explicit approval in this conversation. Scheduling drafts is allowed, since it can be undone.
- If you don't know what's connected, first send Stanley the audit prompt: list every connected platform and integration, flag anything expired or broken, and show the configured posting slots. GitHub must be on the list; if it isn't, stop and point the user at recipes/01-first-connection.md.

Steps:

1. Ask the user which repo (or all connected repos) and what lookback window, 1 to 30 days. If they name a specific PR or commit instead, jump to step 4 with that target.
2. Send Stanley the repo and window and ask for a shortlist of story-worthy changes: shipped features, gnarly bugs, decisions with tradeoffs. Tell him to skip dependency bumps and formatting churn.
3. Show the user the shortlist as Stanley sent it and ask which item becomes a post. Draft nothing they haven't picked.
4. Have Stanley read the actual diff for the picked item and pull one concrete, quotable detail. A draft that leans on the PR title alone goes back.
5. Ask which platforms, then have Stanley draft: a single post for a small fix, a thread for a bigger ship. Show the user the draft, collect edits, and pass them back with the wrapper intact.
6. Offer to schedule into the next open slot or leave it as a draft. Publish live only if the user says so in this conversation.

If the user wants this on a schedule, point them to recipes/08-rituals.md instead of creating a ritual unasked.
