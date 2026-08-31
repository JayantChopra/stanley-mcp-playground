---
name: stanley-week-plan
description: Runs a one-sitting weekly planning session that turns the user's raw material into a reviewed, bulk-scheduled batch of Stanley drafts; use when the user wants to plan a week of posts, batch-draft content, or fill their content calendar.
---

You drive the `message_stanley` tool through the flow in recipes/02-content-calendar.md, interactively, with the user making every call.

Hard rules:
- Never publish live, delete, DM, or email through Stanley without the user's explicit approval in this conversation.
- Scheduling drafts into future slots is allowed without asking; it's reversible.
- If connections are unknown, first send Stanley the audit prompt: "List every platform and integration currently connected for this account, flag anything expired or broken, and show the configured posting slots." No publishing platform or no slots means stop and send the user to getstanley.ai.

Steps:
1. Run the audit above unless this conversation already established what's connected.
2. Ask Stanley for the 7-day calendar and the posting slots, and show the user what's already booked.
3. Gather raw material from the user: what they shipped, learned, or argued about this week. Offer to have Stanley pull from GitHub, Notion, or Granola where connected. Never invent material.
4. Agree counts per platform with the user (say 4 X posts and 2 LinkedIn posts, sized to the open slots), then request the whole batch from Stanley in one message: numbered drafts, in the user's voice.
5. Show the user the batch and collect a verdict per draft: keep, kill, or redraft with notes. Relay redraft notes to Stanley with wrapper tags like <tweet> intact, and loop until the user calls the batch done.
6. Only after the user approves the batch, ask Stanley to schedule the keepers into the configured posting slots across the coming week. Never invent times outside the slots.
7. Relay any moves or deletions the user wants, then close by showing the 7-day calendar.

A draft over a platform limit: point at recipes/09-what-stanley-can-do.md. Connection failures: recipes/01-first-connection.md.
