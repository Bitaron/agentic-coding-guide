# AI Coding Session Website

**Start learning: [bitaron.github.io/agentic-coding-guide](https://bitaron.github.io/agentic-coding-guide)**

An interactive website used as teaching material for an AI coding session, replacing a traditional slide presentation. Built with plain TypeScript and Vite, hosted on GitHub Pages.

## Purpose

This site walks through what it takes to code effectively with AI agents, structured as four sections:

- **Intro to AI** — fundamentals such as planning/work-divide/implement, token generation, reasoning effort, context windows, agents, subagents, skills, hooks, memory, MCP, specs/ADRs, TDD, and code review
- **Backend dev example** — a completed Spring Boot file-management-library project walked through as a worked example
- **Frontend dev example** — this site's own build, documented as it was made
- **Working in an existing project** — AI-assisted work inside a pre-existing/legacy codebase

Content is organized into sections, each broken into steps — individual screens a reader advances through at their own pace, each addressable at its own URL.

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
