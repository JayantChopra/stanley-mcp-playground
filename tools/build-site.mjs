// Builds the static cookbook site from recipes/*.md into site/.
// Run from the repo root: node tools/build-site.mjs
// Styling follows the halftone design system; see site/style.css.
import { marked } from "marked";
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "site");
const REPO_URL = "https://github.com/JayantChopra/stanley-mcp-playground";

const ONE_LINERS = {
  "00": "The capability reference every other recipe leans on.",
  "01": "MCP setup, connection audit, draft then schedule.",
  "02": "Fill your calendar slots from one working session.",
  "03": "Commits and PRs turned into story posts.",
  "04": "SQL over your own post metrics, fed back into planning.",
  "05": "Niche trends, video teardowns, creator audits.",
  "06": "One piece of content, every platform.",
  "07": "Canva, Recraft, or anything with a URL, attached to drafts.",
  "08": "Morning briefs, cron jobs, poll-based triggers.",
};

const SKILLS = [
  ["/stanley-start", "audits connections, names your next recipes"],
  ["/stanley-week-plan", "plans and schedules a week"],
  ["/build-in-public", "turns PRs into posts"],
  ["/stanley-review", "runs the weekly numbers"],
  ["/repurpose", "one post, every platform"],
];

const HEAD = (title, depth) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#ffffff">
<title>${title}</title>
<meta name="description" content="A cookbook for the Stanley MCP: workflows for running your content operation from a conversation with Claude.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='42' fill='%236355FF'/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${depth}style.css">
<noscript><style>[data-rv], .stagger > * { opacity: 1 !important; translate: 0 0 !important; }</style></noscript>
</head>
<body>`;

const TOPBAR = (depth) => `<header class="top">
  <a class="wordmark" href="${depth}index.html">stanley<span class="dot">·</span>mcp<span class="dot">·</span>playground</a>
  <nav>
    <a href="${depth}index.html#recipes">Recipes</a>
    <a href="${depth}index.html#skills">Skills</a>
    <a href="${REPO_URL}/blob/main/CONTRIBUTING.md">Contribute</a>
    <a class="gh" href="${REPO_URL}">GitHub</a>
  </nav>
</header>`;

const FOOTER = `<footer><div class="foot">
  <span>Apache-2.0 · a cookbook for the <a href="https://getstanley.ai">Stanley</a> MCP</span>
  <nav>
    <a href="${REPO_URL}">GitHub</a>
    <a href="${REPO_URL}/blob/main/CONTRIBUTING.md">Contributing</a>
    <a href="${REPO_URL}/blob/main/SECURITY.md">Security</a>
    <a href="${REPO_URL}/blob/main/CODE_OF_CONDUCT.md">Code of conduct</a>
    <a href="${REPO_URL}/blob/main/CHANGELOG.md">Changelog</a>
  </nav>
</div>
<div class="foot-mark" aria-hidden="true">stanley<span class="dot">·</span>mcp<span class="dot">·</span>playground</div>
</footer>`;

// ---- read recipes ----
const files = readdirSync(join(ROOT, "recipes")).filter((f) => f.endsWith(".md")).sort();
const recipes = files.map((file) => {
  const md = readFileSync(join(ROOT, "recipes", file), "utf8");
  const title = md.split("\n")[0].replace(/^#\s*/, "");
  const num = file.slice(0, 2);
  return { file, slug: file.replace(/\.md$/, ".html"), num, title, short: title.replace(/^\d+\s*·\s*/, ""), md };
});

// ---- recipe pages (static: the landing page owns the site's one motion) ----
mkdirSync(join(SITE, "recipes"), { recursive: true });
recipes.forEach((r, i) => {
  let html = marked.parse(r.md);
  html = html
    .replace(/href="(\d{2}-[a-z0-9-]+)\.md(#[^"]*)?"/g, 'href="$1.html$2"')
    .replace(/href="\.\.\/README\.md"/g, 'href="../index.html"')
    .replace(/href="\.\.\/\.mcp\.json"/g, `href="${REPO_URL}/blob/main/.mcp.json"`);

  const toc = recipes
    .map((t) => `<li><a ${t.num === r.num ? 'class="here" aria-current="page"' : ""} href="${t.slug}"><span class="n">${t.num}</span>${t.short}</a></li>`)
    .join("\n      ");

  const prev = recipes[i - 1];
  const next = recipes[i + 1];
  const pager = `<nav class="pager">
    ${prev ? `<a href="${prev.slug}">← ${prev.num} · ${prev.short}</a>` : "<span></span>"}
    ${next ? `<a href="${next.slug}">${next.num} · ${next.short} →</a>` : "<span></span>"}
  </nav>`;

  const page = `${HEAD(`${r.title} · stanley-mcp-playground`, "../")}
${TOPBAR("../")}
<div class="page">
  <aside class="toc">
    <span class="kicker">The cookbook</span>
    <ol>
      ${toc}
    </ol>
  </aside>
  <article>
${html}
${pager}
  </article>
</div>
${FOOTER}
<script src="../app.js"></script>
</body>
</html>`;
  writeFileSync(join(SITE, "recipes", r.slug), page);
});

// ---- landing page ----
const cards = recipes
  .map((r) => `<a class="card" href="recipes/${r.slug}"><span class="num">Recipe ${r.num}</span><h3>${r.short}</h3><p>${ONE_LINERS[r.num] ?? ""}</p></a>`)
  .join("\n    ");

const chips = SKILLS.map(([n, d]) => `<span class="chip"><b>${n}</b>&nbsp;· ${d}</span>`).join("\n    ");

const landing = `${HEAD("stanley-mcp-playground · the Stanley MCP cookbook", "")}
${TOPBAR("")}
<main>
<section class="hero">
  <div>
    <h1 data-rv>Recipes for driving <em>Stanley</em> from Claude.</h1>
    <p class="lede" data-rv style="--d:80ms">A cookbook for the Stanley MCP. Plan a week of posts in one sitting, turn merged PRs into build-in-public threads, read your own numbers, and put the whole thing on a schedule, from a conversation.</p>
    <div class="cta-row" data-rv style="--d:160ms">
      <a class="btn btn-primary" href="recipes/01-first-connection.html">Start with recipe 01</a>
      <a class="btn btn-ghost" href="#recipes">Browse all nine</a>
    </div>
    <div class="clone" data-rv style="--d:240ms"><code>git clone ${REPO_URL}.git &amp;&amp; cd stanley-mcp-playground &amp;&amp; claude</code></div>
  </div>
  <div class="convo" data-rv style="--d:200ms" role="img" aria-label="A conversation: you ask Stanley what is connected, Stanley replies with platforms, a broken session, and posting slots.">
    <div class="bar"><span></span><span></span><span></span></div>
    <div class="msg msg-you"><span class="who">You</span>List every platform and integration connected for this account, flag anything expired or broken, and show my posting slots.</div>
    <div class="msg msg-stanley"><span class="who">Stanley</span>
      <ul>
        <li>x · linkedin · github · notion</li>
        <li class="warn">instagram: session expired, reconnect on the integrations page</li>
        <li>slots: 8:00 am · 12:00 pm</li>
      </ul>
    </div>
    <p class="caption">The audit from <a href="recipes/01-first-connection.html">recipe 01</a>, where every setup starts</p>
  </div>
</section>

<section class="how">
  <div class="how-inner">
    <span class="kicker">How it works</span>
    <h2 class="section" data-rv>One MCP tool, four moving parts</h2>
    <p class="note" data-rv style="--d:80ms">Claude reaches Stanley through a single tool, <code>message_stanley</code>. Recipes are conversation patterns, which is why everything on this site can be pasted straight in.</p>
    <div class="flow stagger" data-rv>
      <div class="node"><strong>You</strong><p>Raw material: what you shipped, learned, argued about this week.</p></div>
      <div class="arrow" aria-hidden="true">→</div>
      <div class="node"><strong>Claude</strong><p>Orchestrates. Reads your repos and notes, drives your other tools.</p></div>
      <div class="arrow" aria-hidden="true">→</div>
      <div class="node"><strong>Stanley</strong><p>Your voice, calendar, media, and analytics behind one MCP endpoint.</p></div>
      <div class="arrow" aria-hidden="true">→</div>
      <div class="node"><strong>Your platforms</strong><p>X, LinkedIn, Threads. Instagram drafts wait for your hand, by design.</p></div>
    </div>
  </div>
</section>

<section class="recipes" id="recipes">
  <span class="kicker">The cookbook</span>
  <h2 class="section" data-rv>Nine recipes, in learning order</h2>
  <p class="note" data-rv style="--d:80ms">Numbered because order matters: 00 is the reference sheet, 01 gets you connected, and everything after is a bigger version of the same loop.</p>
  <div class="grid stagger" data-rv>
    ${cards}
  </div>
</section>

<section class="skills" id="skills">
  <div class="skills-inner">
    <span class="kicker">Drop-in skills</span>
    <h2 class="section" data-rv>Slash commands included</h2>
    <p class="note" data-rv style="--d:80ms">Open the repo in Claude Code and these work immediately, no copying. <code>/stanley-start</code> audits what you have connected and names the recipes your setup can run.</p>
    <div class="chips stagger" data-rv>
    ${chips}
    </div>
  </div>
</section>
</main>
${FOOTER}
<script src="app.js"></script>
</body>
</html>`;
writeFileSync(join(SITE, "index.html"), landing);

console.log(`built site: index + ${recipes.length} recipe pages`);
