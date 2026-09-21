// Representation choice: workflow diagram plus placeholder screenshot slots
// — this section's whole point is real evidence (ProjectBrief.md §8), but
// issue #19 only builds the shell; the slots stay empty until issue #20
// curates the actual captures. The grounding fact (Lazyweb MCP was used for
// this site's own design brief, issue #11) is already established and
// cited in steps/mcp.ts's "Already in use on this project" callout — repeated
// here, not invented fresh.

import { flowChain, slotFigure, type Slot } from "./frontend-shared";

const SLOTS: Slot[] = [
  {
    label: "Lazyweb MCP query for real-world reference products",
    note: "The agent researching existing UX patterns before proposing this site's own visual direction.",
  },
  {
    label: "Comparing researched patterns against a generic default",
    note: "Multiple real products compared side by side, rather than one product copied as a template.",
  },
  {
    label: "The derived design direction, before implementation",
    note: "The differentiated direction that came out of research — settled ahead of writing any layout code.",
  },
];

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="fx-intro">A major goal of this section: showing an agent
      research real-world design knowledge instead of inventing generic UI
      from nothing. This site's own visual direction (issue #11) came from
      this kind of workflow, using <strong>Lazyweb MCP</strong>.</p>

    ${flowChain(
      "Research multiple real products, identify patterns and differences, understand the UX rationale, create a differentiated design, then implement",
      [
        { label: "Research multiple real products" },
        { label: "Identify patterns and differences" },
        { label: "Understand the UX rationale" },
        { label: "Create a differentiated design" },
        { label: "Implement" },
      ]
    )}

    <p class="fx-caption">The point isn't research for its own sake: a
      single product treated as a template just produces a different
      generic look. Comparing several, and understanding <em>why</em> each
      made its choices, is what lets a design direction diverge on
      purpose.</p>

    <div class="fx-slots">
      ${SLOTS.map(slotFigure).join("")}
    </div>
  `;
}
