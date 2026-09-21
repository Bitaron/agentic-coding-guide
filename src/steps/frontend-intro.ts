// Representation choice (per .claude/skills/create-section/SKILL.md): a
// callout plus a real diagram, not prose alone — the self-referential point
// (ProjectBrief.md §7: "This website is the frontend development example")
// is a deliberate rhetorical beat per issue #6's resolution, so it gets its
// own emphasis box rather than a passing mention. The timeline below is
// ProjectBrief.md §7's fenced diagram (id prfyay), rendered as the site's
// own flow component instead of preformatted text. This step names the
// section's behavior (freezes at launch, ADR-0003) but doesn't pre-empt
// issue #20's curation — no screenshots are claimed here yet.

import { flowChain } from "./frontend-shared";

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="fx-intro">Every other section in this presentation explains a
      concept. This one is different: <strong>this website is itself the
      frontend development example</strong> — built end to end by an AI
      coding agent, and now documenting that build for you to read.</p>

    <div class="callout fx-callout">
      <h3 class="callout-heading">You're looking at the example right now</h3>
      <p class="callout-body">This site's own layout and step transitions went
        through the kind of design-research and browser-testing loop this
        section describes, not just the concept named earlier in the
        presentation. The next two steps walk through those two real
        sub-threads: design research and browser testing.</p>
      <p class="callout-conclusion">This section freezes once the site
        launches, rather than updating forever &mdash; it curates a fixed
        record of the build, not a live feed.</p>
    </div>

    <p class="fx-lead">The build follows the same shape end to end:</p>

    ${flowChain(
      "Requirement leads to design research, implementation, browser testing, visual review, iteration, then final UI",
      [
        { label: "Requirement" },
        { label: "Design Research" },
        { label: "Implementation" },
        { label: "Browser Testing" },
        { label: "Visual Review" },
        { label: "Iteration" },
        { label: "Final UI" },
      ]
    )}

    <p class="fx-caption">The next two steps zoom into the two sub-threads
      this section is built around: design research via Lazyweb MCP, and
      browser testing via Playwright MCP.</p>
  `;
}
