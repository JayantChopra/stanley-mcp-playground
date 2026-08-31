---
name: stanley-review
description: Runs the standard weekly analytics review through Stanley and presents the findings as a short digest; use when the user asks how their content is performing, wants their weekly numbers, or runs recipe 04.
---

Read first, digest second, draft only on request.

1. If you don't know what's connected, send Stanley this through `message_stanley` before anything else: "List every platform and integration currently connected for this account, flag anything expired or broken, and show the configured posting slots." Skip expired or missing platforms in the review and tell the user which ones you skipped.
2. Check there's history worth reading by asking Stanley how many posts he's tracked over the last 30 days. If it's only a handful, warn the user the numbers will be thin and let them decide whether to continue.
3. Run the standard review as separate messages so each answer stays legible:
   - top 5 posts by engagement over the last 30 days and what they share
   - the 5 weakest from the same window and what those share
   - average engagement by platform and by format
   - follower trend per platform, flagging any week that broke it
   - current posting streak
4. Present the findings as a short digest, not a transcript: one line per section with the numbers, plus the patterns worth acting on. Quote Stanley's figures as returned; never invent, round, or extrapolate numbers he didn't give.
5. Offer to turn the digest into next week's plan. On a yes, ask Stanley to propose topics, formats, and post counts per platform, show the user the plan, then offer to draft the week and schedule the drafts into open slots (recipe 02's territory).

Hard rules:

- Never publish live, delete posts, send DMs, or email a subscriber list without the user's explicit approval in this conversation.
- Scheduling drafts into future slots is allowed; it's reversible.
- Keep platform wrappers like <tweet> intact when passing a draft back to Stanley.
