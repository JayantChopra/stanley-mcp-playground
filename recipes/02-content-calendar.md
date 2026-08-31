# 02 · Plan a week in one sitting

**What you get:** a full week of posts drafted, reviewed, and scheduled into your posting slots in one working session.

**Needs:** at least one publishing platform connected (X, LinkedIn, Threads, or Substack Notes) and posting slots configured in Stanley. Run /stanley-start if you are not sure what you have.

## Gather raw material first

Batch drafting works when Stanley has something real to work from. Spend five minutes listing the week: what you shipped, what broke, what you changed your mind about, the argument you keep having in Slack. Rough notes beat tidy summaries, because Stanley writes better from specifics than from themes.

If the material already lives somewhere he can read (GitHub, Notion, Granola meeting notes), point him at it instead of retyping: "summarize my merged PRs from the last 7 days" gets you a starting list. [Recipe 03](03-build-in-public.md) builds a whole workflow on that trick.

## The walkthrough

1. **Look at the calendar before adding to it.** You want to know what's booked and which slots are open.

   > Show me my content calendar for the next 7 days, and list my configured posting slots.

2. **Dump your notes and ask for a numbered batch.** Name a count per platform so the batch matches the slots you have. Six posts into five open slots is a fight you'll have later.

   > Here's my week: [paste your raw notes]. Draft 4 X posts and 2 LinkedIn posts from this, in my voice. Number them 1 through 6 so we can talk about each one.

3. **Review the batch in one pass.** Sort the drafts into keep, kill, and redraft, and give notes per draft rather than one vague note for the batch. Keep the wrapper tags (`<tweet>`, `<linkedin_post>`) when you paste a draft back.

   > Keep 1, 3, and 6. Kill 2. Redraft 4 with a blunter opening line, it buries the point. Cut 5 to half the length.

4. **Bulk-schedule the keepers.** Schedule into your configured slots, not times you invent on the spot; slots exist so you stop deciding "when" per post. Scheduling asks no approval, since it's reversible. Publishing now is the step that checks with you.

   > Schedule the approved drafts into my open slots over the next 7 days. Spread them out, and don't put two posts on the same platform on the same day.

5. **Move or delete anything that lands wrong.** The calendar isn't set in stone.

   > Move the LinkedIn post about the migration to Thursday's slot, and delete the scheduled post about the offsite.

6. **Check the week view.** End the session looking at the thing you built.

   > Show me the calendar for the next 7 days again.

Prefer to run this hands-off? The repo ships a `stanley-week-plan` skill that walks Claude through the same flow with you: it gathers your raw material, requests the batch, iterates until you're happy, and bulk-schedules only after you approve.

## Where things land

Nothing in this recipe goes live during the session. Fresh drafts sit unscheduled in Stanley's calendar until step 4. Once scheduled, each post sits in its slot and publishes on its own when the time arrives. Instagram drafts are the exception: they wait in the calendar for you to press post by hand. If you want something out the door right now, say so, and Stanley asks for your approval before publishing.

## When it breaks

- **No posting slots configured.** There's nothing to bulk-schedule into. Set slots up at getstanley.ai, then rerun step 1.
- **The whole batch sounds the same.** Your raw material was thin. Fewer posts from more specific notes beats six variations on one idea.
- **A draft blows a platform limit.** Character and media limits live in [recipe 00](00-what-stanley-can-do.md); ask Stanley to cut it to fit or split it into a thread.
- **Stanley loses track of which draft is which.** Ask him to relist the batch with numbers and current status before you keep reviewing.
- **`message_stanley` missing or erroring.** That's connection trouble, covered in [recipe 01](01-first-connection.md).
