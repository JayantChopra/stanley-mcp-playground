# 09 · What Stanley can do

Reference sheet for the whole cookbook. Recipes link back here instead of re-explaining capabilities. What's available to you depends on what you've connected, and [recipe 01](01-first-connection.md) shows you how to check.

## The one tool

On Claude's side, Stanley is a single MCP tool called `message_stanley`. You or Claude send him a message, he replies, and the conversation carries across calls. There is no separate tool per feature, so the recipes in this cookbook are conversation patterns rather than API call sequences. Stanley runs his own tools internally (calendar, media staging, analytics queries), and naming what you want in plain English is enough.

## Capability map

**Calendar and scheduling.** Create, edit, delete, and list post drafts; schedule them into your configured time slots one at a time or as a batch; publish approved drafts on the spot. Scheduling is reversible.

**Drafting.** Platform-native drafts in your voice for X, LinkedIn, Threads, and Substack Notes, run through per-platform quality checks that keep generic AI tone out. He adapts content across formats and in any direction between platforms: thread to single post, X to LinkedIn and back, a post into a Threads chain, a thread into a carousel. Sources can be your posts on any connected platform or raw pasted text: notes, transcripts, whatever you have.

**Publishing.** Hands-off native publishing on X, LinkedIn, Threads, and Substack Notes where connected. Instagram is the exception by design: Stanley drafts, schedules, builds carousels, and manages photo assets, but a human presses post.

**Media.** Hand Stanley any public HTTPS URL and he stages the file into storage, returning a media key you attach to drafts. He also generates diagram-style explainer images, renders multi-slide carousels from code, and screenshots X posts into quote cards.

**Analytics.** SQL queries over your historical post metrics (engagement, impressions, follower trends), live follower counts, and posting-streak tracking.

**Research.** Trend clustering inside a niche on X; video teardowns covering structure, pacing, hooks, and transcript from YouTube, Reels, or X links; public creator audits; web search.

**Workspace context.** Read access to whatever you've connected: GitHub (repos, recent commits and PRs, full diffs), Granola meeting notes, Notion, Google Calendar, Slack, YouTube.

**Rituals.** Recurring jobs on cron schedules in your local timezone: morning briefs, analytics reviews, build-in-public scans, plus custom ones. Stanley receives no inbound webhooks, so "when a PR merges" means a scan every few hours over a trailing window. [Recipe 08](08-rituals.md) covers the pattern.

## Hard limits

| Thing | Limit |
|-------|-------|
| Images | JPG, PNG, or WebP up to 5 MB |
| GIFs | up to 15 MB |
| Video | MP4 or MOV up to 50 MB, under 5 minutes for direct posts |
| X post | 280 weighted characters, or 25,000 with X Premium |
| X media | 1 to 4 images, or 1 video or GIF |
| Threads post | 500 characters; chains use `<thread-break/>` |

## What always needs your approval

Publishing live on the spot, deleting live posts, sending DMs, emailing a subscriber list, and connecting or disconnecting integrations. Scheduling a draft into a future slot asks nothing, since you can undo it.

## Draft wrappers

Stanley wraps preview drafts in a platform tag: `<tweet>`, `<linkedin_post>`, `<instagram_post>`, or `<threads_post>`. Keep the wrapper when you pass a draft back to him.
