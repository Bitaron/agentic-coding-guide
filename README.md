# AI Coding Session Website

An interactive website used as teaching material for an AI coding session, replacing a traditional slide presentation. Built with plain TypeScript and Vite, hosted on GitHub Pages.

See [ProjectBrief.md](ProjectBrief.md) for the full content brief and [AGENT.md](AGENT.md) for design philosophy and coding guidelines.

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
```

## Project structure

- `src/main.ts`, `src/router.ts`, `src/sections.ts` — app entry point, client-side routing, and section registry
- `src/steps/` — one module per content step (e.g. `agents.ts`, `mcp.ts`, `tdd.ts`), each an atomic unit of navigation within a section
- `src/style.css` — global styles
- `backendExample/`, `frontendExample/`, `prototype/` — worked-example material and screenshots referenced by the site's content
- `docs/adr/` — architecture decision records
- `docs/agents/issue-tracker.md` — how issues and the active `/wayfinder` map are tracked

## Deployment

The site is deployed to GitHub Pages as a project site, served from `/agentic-coding-guide/` (see `vite.config.ts`).
