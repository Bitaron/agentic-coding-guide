// Representation choice: workflow diagram plus placeholder screenshot slots
// — mirrors frontend-design-research.ts's structure for the second
// sub-thread (ProjectBrief.md §9). The grounding fact (Playwright MCP
// verified real steps in this repo, desktop and mobile, before they merged)
// is already established and cited in steps/mcp.ts's callout.

import { flowChain, slotFigure, type Slot } from "./frontend-shared";

const SLOTS: Slot[] = [
  {
    label: "A step opened in-browser via Playwright MCP",
    note: "The agent driving a real browser against the running site, not just reading its own generated markup.",
  },
  {
    label: "Desktop vs. mobile viewport, side by side",
    note: "The same step validated at both a desktop and a mobile width before being called done.",
  },
  {
    label: "A behavior caught and fixed after browser review",
    note: "A concrete before/after: something Playwright surfaced, and the fix that followed.",
  },
];

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="fx-intro">Implementing a step isn't the last step. This site's
      own steps were opened in a real, running browser &mdash; interacted
      with, checked at desktop and mobile widths &mdash; using
      <strong>Playwright MCP</strong>, before merging.</p>

    ${flowChain(
      "Implement, run the application, open in browser, interact, validate behavior, capture screenshot, review, then improve",
      [
        { label: "Implement" },
        { label: "Run application" },
        { label: "Open in browser" },
        { label: "Interact" },
        { label: "Validate behavior" },
        { label: "Capture screenshot" },
        { label: "Review" },
        { label: "Improve" },
      ]
    )}

    <p class="fx-caption">The agent doesn't just generate frontend code and
      stop: it runs the application, inspects what actually renders,
      interacts with it, and captures evidence &mdash; then iterates on what
      the browser showed, not just on what the code says it should show.</p>

    <div class="fx-slots">
      ${SLOTS.map(slotFigure).join("")}
    </div>
  `;
}
