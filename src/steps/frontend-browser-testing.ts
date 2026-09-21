// Representation choice: workflow diagram plus real evidence (issue #20) —
// mirrors frontend-design-research.ts's structure for the second sub-thread
// (ProjectBrief.md §9). The only screenshots that exist of Playwright MCP in
// actual use are from the same 2026-09-19 design-research session (see
// frontend-design-research.ts): two of that session's frames are reused here
// because they're real evidence of exactly this loop — implement, open in a
// real browser via Playwright, validate, capture, iterate — applied to a
// prototype rather than a finished step. No screenshot of a desktop/mobile
// side-by-side comparison exists in the captured material, so this step
// doesn't claim one; the general practice (every step in this site checked
// at both widths before merging, this one included) is already established
// and cited in steps/mcp.ts's callout, and repeated here as a fact rather
// than illustrated with a fabricated photo.

import { flowChain, shotFigure, type Shot } from "./frontend-shared";
import shotTransitionsH from "../../frontendExample/Screenshot From 2026-09-19 18-52-39.png";
import shotTransitionsVerified from "../../frontendExample/Screenshot From 2026-09-19 18-54-46.png";

const SHOTS: Shot[] = [
  {
    src: shotTransitionsH,
    timestamp: "6:52 PM",
    alt: "A transition prototype variant opened in a real, running browser via Playwright MCP, mid-preview against a placeholder demo screen.",
    caption:
      "A transition prototype opened in a real, running browser via Playwright MCP — not just re-read from its own source. This is the same session as the design-research step; the loop this section describes was the actual tool used to settle it.",
  },
  {
    src: shotTransitionsVerified,
    timestamp: "6:54 PM",
    alt: "Terminal confirming, after interacting with the browser, that one transition variant works correctly, then queuing the next variant to check the exact same way.",
    caption:
      "The result reported back in plain language: “Variant H (scale-with-frame) works correctly. Let's verify I (hard cut) the same way.” Each variant gets checked in the browser before the next one is trusted — iteration driven by what's on screen, not by what the code claims it should do.",
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

    <div class="fx-shots">
      ${SHOTS.map(shotFigure).join("")}
    </div>

    <p class="fx-caption">The rest of this site's steps went through the same
      loop at both desktop and mobile widths before merging &mdash; that
      practice is cited earlier, in the MCP concept step's own callout, since
      it's a fact about the whole build rather than a single frame to point
      at here.</p>
  `;
}
