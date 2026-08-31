# 03 · Build in public

**What you get:** your recent GitHub activity turned into story posts, drafted per platform and sitting in your calendar.

**Needs:** GitHub connected to Stanley, plus at least one platform to post to. Run `/stanley-start` if you are not sure what you have.

## Why the diff matters

Posts about code live or die on one concrete detail. "Shipped a big refactor" says nothing, but "deleted a 400-line hand-rolled parser and replaced it with 30 lines of grammar rules" is a story someone might finish. Stanley can read the actual diff through your GitHub connection, so make him quote the real change instead of paraphrasing the PR title. Every prompt below leans on that.

## The walkthrough

1. **Pick a lookback window.** Anywhere from 1 to 30 days. Seven days suits a weekly posting habit, while 30 catches you up after a quiet month.

   > Ask Stanley to scan my GitHub activity from the last 7 days and shortlist the story-worthy changes: shipped features, gnarly bug hunts, decisions where we picked one tradeoff over another. Skip dependency bumps and formatting churn.

2. **Pick one item from the shortlist.** Stanley comes back with a handful of candidates and a line on why each might carry a post. Choose the one you'd tell a colleague about over coffee. If nothing on the list feels like a story, widen the window or name a repo he missed.

3. **Have him read the diff.** This is the step that separates a story from a changelog entry.

   > Take the parser PR from that list and read the full diff. Pull out the detail that makes it a story: what the code did before, what it does now, and any number worth quoting, like lines deleted or files touched.

4. **Draft per platform.** A small fix wants a single post; a bigger ship earns a thread.

   > Draft this as one X post in my voice. Quote the real change from the diff, not the PR title.

   For the bigger version:

   > This one deserves more room. Draft an X thread: open on the problem, walk through the wrong turn, land on the fix. Then adapt the thread into a single LinkedIn post.

5. **Push back once, then schedule.** Tell him what reads wrong before anything gets a slot.

   > The hook is weak, lead with the number instead. Then schedule the thread into my next open X slot and the LinkedIn post the day after.

## The on-demand variant

Just merged something worth talking about? Skip the scan and point him straight at it.

> Here's the PR I just merged: [link, or repo name plus PR number]. Read the diff and turn it into a single X post. Lead with what changed in the code, not the PR title.

The same move works with a single commit hash, and it lands best right after you merge, while you still remember why the change was hard.

## Where things land

Scheduled drafts sit in your Stanley calendar, movable and deletable, and scheduling asks no permission because you can undo it. Nothing goes live without your explicit approval. Drafts arrive wrapped in platform tags like `<tweet>`; keep the wrapper when you pass one back. Character and media limits live in [recipe 00](00-what-stanley-can-do.md).

## When it breaks

- **Stanley says he can't see GitHub.** The connection is missing or the session expired. [Recipe 01](01-first-connection.md) covers the audit and where to fix it.
- **The shortlist is noise.** Merge commits and version bumps mean your filter got lost. Restate what counts as a story and name the repos that matter.
- **The draft reads like a changelog.** He summarized instead of reading the diff. Send it back: "Read the actual diff and quote one specific change."
- **The work you want is older than the window.** Lookback caps at 30 days, so reach older work through the on-demand variant with a direct PR link.

## Make it a habit

Once this loop works by hand, [recipe 08](08-rituals.md) turns it into a ritual: a recurring scan of your GitHub activity that drafts from newly merged PRs without you asking.
