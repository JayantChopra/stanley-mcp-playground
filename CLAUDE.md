# Stanley MCP cookbook

Recipes and skills for driving Stanley, an AI content-marketing agent, through his MCP server at `https://xapi.getstanley.ai/mcp`. The `.mcp.json` in this repo registers the server; the user signs in with `/mcp`.

When someone seems new here (they ask where to start, what this repo is, or what Stanley can do), run the `stanley-start` skill: it audits their connections through `message_stanley` and maps the result to recipes. Don't guess what they have connected. Check.

Routing map, also used by stanley-start:

- X or LinkedIn connected: recipes 02 (calendar) and 06 (repurposing)
- GitHub connected: recipe 03 (build in public)
- a few weeks of posting history: recipe 04 (analytics)
- design or image tools reachable from Claude (Canva, Recraft, anything that exports a URL): recipe 07
- comfortable with the above: recipe 08 (rituals)
- nothing connected: send them to getstanley.ai onboarding before any recipe

Ground rules for working in this repo:

- Never publish live, delete, DM, or email through Stanley without the user's explicit go-ahead in this conversation. Scheduling drafts is fine; it's reversible.
- Recipes state facts from [recipes/00-what-stanley-can-do.md](recipes/00-what-stanley-can-do.md). If Stanley's actual behavior contradicts a recipe, trust Stanley and flag the recipe as stale.
- Prose in this repo stays plain and direct. No marketing voice, no hype adjectives, no em dashes.
