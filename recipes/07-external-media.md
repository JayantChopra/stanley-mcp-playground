# 07 · External media

**What you get:** an asset made anywhere else (a Canva export, a generated image, a screen recording) staged into Stanley and attached to a scheduled draft.

**Needs:** Stanley connected with at least one platform linked, plus any outside tool that hands you a public HTTPS URL; run `/stanley-start` if you are not sure what you have.

## The contract

Stanley stages any file behind a public HTTPS URL, within the size caps, and attaches it to your drafts. That's the whole deal. He fetches the file, stores it, and returns a permanent media key that outlives the original link. The caps you'll hit day to day: images up to 5 MB, video up to 50 MB and under 5 minutes, and an X draft takes 1 to 4 images or one video. The full table lives in [recipe 09](09-what-stanley-can-do.md#hard-limits).

Because the contract is a URL, the tool on the other end doesn't matter. Canva and Recraft show up below as worked examples, not requirements; swap in whatever you use.

## The general pattern

1. **Make the asset** in your outside tool, then get a URL that serves the file itself. A page that displays the image doesn't count. The link has to return the file when fetched, which most tools label export, download, or direct link.
2. **Stage it.** Paste the URL to Claude:

   > Ask Stanley to stage this image and give me the media key: https://...

3. **Attach it.** Name the key, or just point at what he staged:

   > Now draft an X post about [topic] with that image attached.

4. **Schedule it.** Reversible, so it asks no permission:

   > Put it in my next open slot.

## Worked path: a design tool

Suppose you've built a launch graphic in Canva. Export it, then either host the file somewhere public (a bucket, a GitHub repo, your own site) or grab a share link that serves the raw file rather than an editor page. Then hand it over:

> Ask Stanley to stage this PNG from my Canva export, then draft a LinkedIn post announcing [the thing] with it attached and schedule it for tomorrow morning.

One message covers stage, draft, and schedule; Stanley runs the steps in order and shows you the draft in its `<linkedin_post>` wrapper before anything lands on the calendar.

## Worked path: an image generator

Generators like Recraft hand back a URL per finished image, and those links tend to expire. Stage first, decide later. The media key stays valid after the source link dies, so one good image can serve drafts for weeks.

> Ask Stanley to stage this generated image and show me the key so I can reuse it later: https://...

## Video and anything else with a URL

The same seam carries video. A Loom-style screen recording, a demo clip out of your editor, a GIF from wherever: if the link is public and the file fits the caps, Stanley stages it like any image.

> Ask Stanley to stage this demo video and attach it to a new X draft teasing the feature: https://...

One video per X post, and it takes the place of the image slots.

## Where things land

Staging alone changes nothing visible; the file sits in Stanley's storage under its key until a draft claims it. An attached draft waits on the calendar (or in your drafts) with the media bound to it. A scheduled draft posts on its own when its slot arrives; publishing right now is the step that asks for your approval. Instagram assets go to the photo gallery for you to compose and post by hand.

## Fork and extend

This repo is a template, so wire your own tools into the front half of the pattern. Connect a design tool or a generator to Claude as an MCP server or connector, and the loop runs in one conversation: Claude asks your tool for an asset, gets a URL back, and passes it straight to Stanley. Keep API keys in your environment or your MCP client's config, never in the repo; a public cookbook with a live key committed to it is a bad week waiting to happen.

Whatever you plug in, the seam holds: your tool produces a URL, Stanley stages it, the draft carries the media key.

## When it breaks

- **Stanley can't fetch the URL.** It needs a login or isn't public. Open it in a private browser window; if you see a sign-in page, so does he.
- **The link opens a page, not a file.** Design-tool share links usually point at an editor view. Find the export or direct-download URL instead.
- **Rejected for size or format.** Re-export smaller or convert (images JPG, PNG, or WebP; video MP4 or MOV); the caps are in [recipe 09](09-what-stanley-can-do.md).
- **The generator link died before you staged it.** Regenerate and stage right away this time. The key is permanent; the source link never was.
- **No `message_stanley` tool at all.** That's connection trouble, not a media problem, and [recipe 01](01-first-connection.md) covers it.
