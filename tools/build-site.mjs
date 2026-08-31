// Builds the static cookbook site from recipes/*.md into site/.
// Run from the repo root: node tools/build-site.mjs
// Styling and motion follow the halftone design system; the spec lives at
// https://design-template-jet.vercel.app/llms.txt and site/style.css applies it.
import { marked } from "marked";
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = join(ROOT, "site");
const REPO_URL = "https://github.com/JayantChopra/stanley-mcp-playground";
const SITE_URL = "https://stanley-cookbook.vercel.app";
const CLONE_CMD = `git clone ${REPO_URL}.git && cd stanley-mcp-playground && claude`;

const ONE_LINERS = {
  "01": "Connect, audit what you've got, and schedule your first post.",
  "02": "One sitting, seven days of posts sitting in your slots.",
  "03": "Your merged PRs, retold as posts worth reading.",
  "04": "Ask your own numbers questions in plain English.",
  "05": "Find out what your niche is arguing about before you write.",
  "06": "Write it once, then let it work every platform.",
  "07": "Made something in Canva? Hand Stanley the URL.",
  "08": "Morning briefs and Friday recaps, running on cron.",
  "09": "Limits, approvals, and everything Stanley can do.",
};

const SKILLS = [
  ["/stanley-start", "Audits your connections and names the recipes your setup can run."],
  ["/stanley-week-plan", "Plans and bulk-schedules a week of posts, interactively."],
  ["/build-in-public", "Scans your GitHub activity and drafts posts from what you pick."],
  ["/stanley-review", "Runs the weekly analytics review as a short digest."],
  ["/repurpose", "Converts one post into drafts for every platform you name."],
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
<noscript><style>[data-rv], .stagger > * { opacity: 1 !important; translate: 0 0 !important; } [data-progress] { --p: 1; }</style></noscript>
</head>
<body data-root="${depth}">`;

const TOPBAR = (depth) => `<header class="top shell">
  <a class="wordmark" href="${depth}index.html">stanley<span class="dot">·</span>mcp<span class="dot">·</span>playground</a>
  <nav>
    <a href="${depth}index.html#recipes">Recipes</a>
    <a href="${depth}index.html#skills">Skills</a>
    <a href="${REPO_URL}/blob/main/CONTRIBUTING.md">Contribute</a>
    <a class="gh" href="${REPO_URL}">GitHub</a>
  </nav>
</header>`;

const FOOTER = (depth) => `<footer><div class="foot shell">
  <span>Apache-2.0 · a cookbook for the <a href="https://getstanley.ai">Stanley</a> MCP</span>
  <nav>
    <a href="${REPO_URL}">GitHub</a>
    <a href="${REPO_URL}/blob/main/CONTRIBUTING.md">Contributing</a>
    <a href="${REPO_URL}/blob/main/SECURITY.md">Security</a>
    <a href="${REPO_URL}/blob/main/CODE_OF_CONDUCT.md">Code of conduct</a>
    <a href="${depth}llms.txt">llms.txt</a>
  </nav>
</div>
<div class="foot-mark" aria-hidden="true">stanley<span class="dot">·</span>mcp<span class="dot">·</span>playground</div>
<div class="woods" aria-hidden="true"><canvas></canvas></div>
</footer>`;

// ---- read recipes ----
const files = readdirSync(join(ROOT, "recipes")).filter((f) => f.endsWith(".md")).sort();
const recipes = files.map((file) => {
  const md = readFileSync(join(ROOT, "recipes", file), "utf8");
  const title = md.split("\n")[0].replace(/^#\s*/, "");
  const num = file.slice(0, 2);
  return { file, slug: file.replace(/\.md$/, ".html"), num, title, short: title.replace(/^\d+\s*·\s*/, ""), md };
});

// ---- recipe pages (static; the landing page owns the site's motion) ----
mkdirSync(join(SITE, "recipes"), { recursive: true });
recipes.forEach((r, i) => {
  let html = marked.parse(r.md);
  html = html
    .replace(/href="(\d{2}-[a-z0-9-]+)\.md(#[^"]*)?"/g, 'href="$1.html$2"')
    .replace(/href="\.\.\/README\.md"/g, 'href="../index.html"')
    .replace(/href="\.\.\/\.mcp\.json"/g, `href="${REPO_URL}/blob/main/.mcp.json"`)
    .replace(/<h1>(\d{2}) · (.*?)<\/h1>/, '<span class="kicker">Recipe $1</span>\n<h1>$2</h1>')
    .replace(
      /<p><strong>What you get:<\/strong>([\s\S]*?)<\/p>\s*<p><strong>Needs:<\/strong>([\s\S]*?)<\/p>/,
      '<div class="meta"><div><span class="kicker">What you get</span><p>$1</p></div><div><span class="kicker">Needs</span><p>$2</p></div></div>'
    );

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
<div class="page shell">
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
${FOOTER("../")}
<script src="../app.js"></script>
</body>
</html>`;
  writeFileSync(join(SITE, "recipes", r.slug), page);
});

// ---- landing page ----
const cards = recipes
  .map((r) => `<a class="card" href="recipes/${r.slug}"><span class="num">Recipe ${r.num}</span><h3>${r.short}</h3><p>${ONE_LINERS[r.num] ?? ""}</p></a>`)
  .join("\n    ");

const skillRows = SKILLS.map(([n, d]) => `<div class="skill"><code>${n}</code><p>${d}</p></div>`).join("\n    ");

const landing = `${HEAD("stanley-mcp-playground · the Stanley MCP cookbook", "")}
${TOPBAR("")}
<main>
<section class="hero shell">
  <div>
    <span class="kicker" data-rv>The Stanley MCP cookbook</span>
    <h1 data-rv style="--d:60ms">Recipes for driving <em>Stanley</em> from Claude.</h1>
    <p class="lede" data-rv style="--d:140ms">Stanley already knows your voice, your calendar, and your platforms. These nine recipes put him to work, from your first scheduled post to a content operation that mostly runs itself.</p>
    <div class="cta-row" data-rv style="--d:220ms">
      <a class="btn btn-primary" href="recipes/01-first-connection.html">Start with recipe 01</a>
      <a class="btn btn-ghost" href="#recipes">Browse all nine</a>
    </div>
    <div class="clone" data-rv style="--d:300ms" data-cmd="${CLONE_CMD}"><code>${CLONE_CMD}</code></div>
  </div>
  <div class="convo" data-rv style="--d:200ms">
    <span class="tag">The audit · every setup starts here</span>
    <div class="msg msg-you"><span class="who">You</span>quick check: what's connected, what's broken, and when do my posts go out?</div>
    <div class="msg msg-stanley"><span class="who">Stanley</span>here's where things stand:
      <ul>
        <li>connected: x · linkedin · github · notion</li>
        <li class="warn">instagram: session expired, needs a quick reconnect</li>
        <li>slots: 8:00 am and 12:00 pm</li>
      </ul>
    </div>
    <p class="caption"><a href="recipes/01-first-connection.html">Run it on your own account in recipe 01 →</a></p>
  </div>
</section>

<section class="stats shell stagger" data-rv>
  <div class="stat"><span class="n">9</span><span class="l kicker">Recipes, tested for real</span></div>
  <div class="stat"><span class="n">5</span><span class="l kicker">Drop-in slash commands</span></div>
  <div class="stat"><span class="n">1</span><span class="l kicker">MCP tool driving it all</span></div>
</section>

<section class="how">
  <div class="how-inner shell">
    <span class="kicker">How it works</span>
    <h2 class="section" data-rv>One MCP tool, four moving parts</h2>
    <p class="note" data-rv style="--d:80ms">Claude reaches Stanley through one tool, <code>message_stanley</code>, and the conversation carries between calls. That's the whole trick, and it's why every prompt on this site pastes straight in.</p>
    <div class="flow" data-progress="0.75" data-progress-span="1">
      <svg class="rail" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
        <path class="track" d="M0 1 H100" pathLength="1"/>
        <path class="ink" d="M0 1 H100" pathLength="1"/>
      </svg>
      <div class="node" data-rv><span class="kicker">01</span><strong>You</strong><p>Raw material: what you shipped, learned, argued about this week.</p></div>
      <div class="node" data-rv style="--d:80ms"><span class="kicker">02</span><strong>Claude</strong><p>Orchestrates. Reads your repos and notes, drives your other tools.</p></div>
      <div class="node" data-rv style="--d:160ms"><span class="kicker">03</span><strong>Stanley</strong><p>Your voice, calendar, media, and analytics behind one endpoint.</p></div>
      <div class="node" data-rv style="--d:240ms"><span class="kicker">04</span><strong>Your platforms</strong><p>X, LinkedIn, Threads. Instagram waits for your hand, on purpose.</p></div>
    </div>
  </div>
</section>

<section class="recipes shell" id="recipes">
  <span class="kicker">The cookbook</span>
  <h2 class="section" data-rv>Nine recipes, in learning order</h2>
  <p class="note" data-rv style="--d:80ms">Start at 01 and go in order the first time through. Each recipe is a bigger version of the loop before it, and 09 is the reference sheet they all lean on.</p>
  <div class="grid stagger" data-rv>
    ${cards}
  </div>
</section>

<section class="skills" id="skills">
  <div class="skills-inner shell">
    <span class="kicker">Drop-in skills</span>
    <h2 class="section" data-rv>Slash commands included</h2>
    <p class="note" data-rv style="--d:80ms">Open the repo in Claude Code and they work straight away, no copying. None of them will publish a thing without you saying so.</p>
    <div class="skill-rows stagger" data-rv>
    ${skillRows}
    </div>
  </div>
</section>
</main>
${FOOTER("")}
<script src="app.js"></script>
</body>
</html>`;
writeFileSync(join(SITE, "index.html"), landing);

// ---- llms.txt ----
const llms = `# stanley-mcp-playground

> A cookbook for the Stanley MCP: nine tested recipes for running a content operation from a conversation with Claude. Stanley is an AI content-marketing agent (https://getstanley.ai). Claude drives him through one MCP tool, message_stanley, served at https://xapi.getstanley.ai/mcp.

Every prompt in these recipes is paste-able as written, and every recipe was run against a real account before landing.

## Recipes

${recipes.map((r) => `- [${r.num} · ${r.short}](${SITE_URL}/recipes/${r.slug}): ${ONE_LINERS[r.num] ?? ""}`).join("\n")}

## Source

- [Repository](${REPO_URL}): the same recipes as markdown, plus five Claude Code skills under .claude/skills/ and a project .mcp.json that registers the Stanley MCP on clone.
- Connect from any Claude Code session: claude mcp add --transport http stanley https://xapi.getstanley.ai/mcp
- [Contributing](${REPO_URL}/blob/main/CONTRIBUTING.md) · [Security](${REPO_URL}/blob/main/SECURITY.md) · Apache-2.0

## Design

- This site follows the halftone design system; the spec is published at https://design-template-jet.vercel.app/llms.txt
`;
writeFileSync(join(SITE, "llms.txt"), llms);

console.log(`built site: index + ${recipes.length} recipe pages + llms.txt`);
