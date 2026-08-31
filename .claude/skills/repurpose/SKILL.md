---
name: repurpose
description: Turns one piece of the user's content into platform-native drafts, quote cards, and carousels through Stanley; use when the user wants an existing post or thread adapted for other platforms.
---

Drive the message_stanley tool to convert one source post into drafts for other platforms. Stanley keeps conversation state across calls, so talk to him in plain English.

1. Ask the user for the source: a URL to their X thread or post, a pasted LinkedIn post, or a description like "my best post this month". A described top performer needs no link; Stanley finds it through analytics.
2. Ask which targets they want. The supported conversions: LinkedIn post, single X post or thread, Threads chain, quote-card image (a screenshot of an X post), multi-slide carousel.
3. If you don't know what's connected, send Stanley this first: "List every platform and integration currently connected for this account, flag anything expired or broken, and show the configured posting slots." Drop any target that isn't connected and tell the user.
4. Send Stanley the source and the targets in one message. He returns drafts wrapped in platform tags like <tweet> or <linkedin_post>. Show each draft to the user, and keep the wrapper intact whenever you pass a draft back to Stanley.
5. Relay the user's feedback draft by draft until they approve each one. Don't rewrite drafts yourself; Stanley runs per-platform quality checks your edits would skip.
6. On approval, ask whether to schedule. Scheduling drafts into future slots is fine without extra ceremony, since it's reversible. Schedule only the drafts the user approved.
7. Hard rules: never ask Stanley to publish live, delete a live post, send a DM, or email a subscriber list unless the user explicitly approves that exact action in this conversation. Instagram never auto-publishes; a carousel for it ends as a prepared draft the user posts by hand, and you should say so up front.
