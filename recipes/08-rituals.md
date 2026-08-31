# 08 · Rituals

**What you get:** Stanley working unattended: a brief waiting when you wake up, a weekly analytics review, and fresh drafts whenever a scheduled scan finds something worth posting.

**Needs:** at least one platform connected, plus GitHub if you want the build-in-public scanner; run /stanley-start if you are not sure what you have.

Rituals are recurring jobs that run on cron schedules in your local timezone. Stanley receives no inbound webhooks, so every ritual fires on a clock, never on an event. Hold onto that model and everything below follows from it.

## The two kinds

**Built-in rituals** come ready-made: a morning brief, a weekly analytics review, an evening recap, and a build-in-public scanner. Each one toggles active or inactive and takes a local wall-clock delivery time, no cron required. [Recipe 04](04-analytics-review.md) covers what the analytics review digs into, and [recipe 03](03-build-in-public.md) is the manual version of what the scanner automates.

**Custom recurring tasks** take a cron expression in your local timezone, a fixed interval (every 4 hours), or a one-off delay (in 3 hours). Anything you'd ask Stanley to do by hand, you can put on a clock.

## Walkthrough

1. **Start with the morning brief.** It needs a delivery time and nothing else.

   > Turn on the morning brief and deliver it at 8am my time.

2. **Add the weekly analytics review.** One review a week is plenty; [recipe 04](04-analytics-review.md) shows what it looks at.

   > Turn on the weekly analytics review, delivered Mondays at 9am.

3. **Try one custom job.** Plain words work fine, and Stanley converts them to cron behind the scenes.

   > Every Friday at 4pm, draft one post looking back on what I shipped this week and schedule it into my next open slot.

   Stanley stores that as `0 16 * * 5`, which reads: at 4:00 pm every Friday, in your timezone.

4. **Turn an event-shaped wish into a scan.** You can't have "post when a PR merges", because nothing pushes events to Stanley. You can have the polling version, which lands within a day and feels the same. Write the cron yourself if you prefer.

   > Every weekday morning, scan my GitHub activity over the trailing 24 hours and draft an X post for anything newly merged. Use cron 0 9 * * 1-5.

   `0 9 * * 1-5` reads: at 9:00 am, Monday through Friday. Each run scans the lookback window, filters for items it hasn't drafted from before, and writes only from the new ones.

5. **Queue a one-off.** Delayed runs use the same machinery once, then disappear.

   > In 3 hours, check whether my last scheduled post went out and tell me how it's doing.

6. **Review what's running.** Do this whenever you add or change one.

   > List every ritual and recurring task currently active, with each schedule in plain English.

## Where things land

The morning brief, analytics review, and evening recap deliver a summary and touch nothing. Drafting jobs (the build-in-public scanner, custom jobs like the Friday recap above) leave drafts behind, and a job you told to schedule puts its draft into a calendar slot, where it publishes when the time arrives like any scheduled post. You can edit or pull anything before its slot. So the safety line sits in how you word the job: if you want a human look before something goes out, say "draft, don't schedule". Publishing right now still checks with you first, ritual or not, and the full approval list is in [recipe 00](00-what-stanley-can-do.md).

## A starter setup

Begin with two: the morning brief and the weekly analytics review. Both report rather than post, so they build the habit of checking in with Stanley without touching your calendar. Once the [recipe 03](03-build-in-public.md) flow feels routine by hand, switch on the build-in-public scanner and let it run that loop for you. Add custom jobs last, one at a time, and prune any you stop reading.

## When it breaks

- A ritual fires at the wrong hour: your timezone setting is off. Run the audit from [recipe 01](01-first-connection.md) and check the timezone shown next to your posting slots.
- A scanner keeps drafting nothing: the window was quiet, or the connection it reads from has lapsed. Widen the lookback ("trailing 3 days") and re-run the [recipe 01](01-first-connection.md) audit.
- You asked for "when X happens" and got a schedule back: that's the design, not a misunderstanding. Pick the tightest interval you can live with, say every 2 hours during your workday.
- Draft volume got out of hand: run the step 6 listing, then tell Stanley which jobs to pause or delete. Turning a ritual off loses nothing already drafted.
