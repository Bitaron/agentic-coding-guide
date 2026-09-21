// Representation choice: workflow diagram plus the real, curated screenshot
// narrative (issue #20) — this section's whole point is real evidence
// (ProjectBrief.md §8), not a description of one. All 22 screenshots in
// frontendExample/ come from one continuous session (2026-09-19, 16:34-19:12)
// settling this site's own visual direction (issue #11 / ADR-0004); none are
// dropped, per the curation decided in issue #22 — they're organized here as
// three beats (kickoff & grilling, round 1 built and rejected, round 2
// re-grounded and settled) rather than a flat list. Captions are grounded in
// what's actually on screen in each frame, not the resolved-ticket text
// verbatim, since issue #22 explicitly left caption wording to be refined
// during build. The grounding fact (Lazyweb MCP was used for this site's own
// design brief) is already established and cited in steps/mcp.ts's
// "Already in use on this project" callout — repeated here with the actual
// evidence, not invented fresh.

import { flowChain, shotFigure, type Shot } from "./frontend-shared";

import shotKickoff from "../../frontendExample/Screenshot From 2026-09-19 16-34-37.png";
import shotQ2Q3 from "../../frontendExample/Screenshot From 2026-09-19 17-45-07.png";
import shotQ4Q5GoAhead from "../../frontendExample/Screenshot From 2026-09-19 17-48-51.png";
import shotBlankTab from "../../frontendExample/Screenshot From 2026-09-19 17-51-15.png";
import shotPaletteB from "../../frontendExample/Screenshot From 2026-09-19 17-51-47.png";
import shotPaletteC from "../../frontendExample/Screenshot From 2026-09-19 17-51-52.png";
import shotPaletteD from "../../frontendExample/Screenshot From 2026-09-19 17-51-57.png";
import shotPaletteE from "../../frontendExample/Screenshot From 2026-09-19 17-52-02.png";
import shotPaletteCapture from "../../frontendExample/Screenshot From 2026-09-19 17-52-50.png";
import shotTransitionsA from "../../frontendExample/Screenshot From 2026-09-19 17-58-35.png";
import shotRound1Pushed from "../../frontendExample/Screenshot From 2026-09-19 18-43-10.png";
import shotLazywebCited from "../../frontendExample/Screenshot From 2026-09-19 18-50-20.png";
import shotReadmeDiff from "../../frontendExample/Screenshot From 2026-09-19 18-50-53.png";
import shotTransitionsH from "../../frontendExample/Screenshot From 2026-09-19 18-52-39.png";
import shotTransitionsVerified from "../../frontendExample/Screenshot From 2026-09-19 18-54-46.png";
import shotTransitionsJCommit from "../../frontendExample/Screenshot From 2026-09-19 18-57-54.png";
import shotPaletteRound2Begin from "../../frontendExample/Screenshot From 2026-09-19 19-03-19.png";
import shotPaletteRound2D from "../../frontendExample/Screenshot From 2026-09-19 19-05-31.png";
import shotBothRoundsSummary from "../../frontendExample/Screenshot From 2026-09-19 19-06-41.png";
import shotPaletteRound2BFinal from "../../frontendExample/Screenshot From 2026-09-19 19-09-49.png";
import shotFinalSettled from "../../frontendExample/Screenshot From 2026-09-19 19-12-13.png";
import shotFinalToast from "../../frontendExample/Screenshot From 2026-09-19 19-12-16.png";

const BEAT_1_KICKOFF: Shot[] = [
  {
    src: shotKickoff,
    timestamp: "4:34 PM",
    alt: "Claude Code terminal, session start: the prompt “Pull issue #1. Use frontend design skill. grill me where needed. Show atleast 5 alternate options to choose from,” with the agent reading the issue via the gh CLI.",
    caption:
      "The session opens with one instruction, no preamble: “Pull issue #1. Use frontend design skill. grill me where needed. Show atleast 5 alternate options to choose from.” The agent's first move is to read the ticket, not to start designing.",
  },
  {
    src: shotQ2Q3,
    timestamp: "5:45 PM",
    alt: "Terminal showing grilling questions Q2 (should one visual language apply identically across all sections) and Q3 (dark-first vs. light-first base palette), each followed by the agent's own stated recommendation.",
    caption:
      "Two grilling questions before any pixel exists — one shared visual language or not, dark-first or light-first — each with the agent's own recommendation attached, not left as an open question for the human to fully resolve alone.",
  },
  {
    src: shotQ4Q5GoAhead,
    timestamp: "5:48 PM",
    alt: "Terminal showing grilling questions Q4 (progress-indicator scope) and Q5 (step-transition primitives), then the agent proposing a throwaway prototype for the two questions the user wants to see rather than just read about.",
    caption:
      "The last two questions get the same treatment, then the ask flips: with the easier calls approved, the agent proposes building a real, disposable prototype for the two the user wants to see rather than just read a description of.",
  },
];

const BEAT_2_ROUND_ONE: Shot[] = [
  {
    src: shotBlankTab,
    timestamp: "5:51 PM",
    alt: "A local prototype server's browser tab, still on about:blank, about to load the first palette variant.",
    caption:
      "A throwaway prototype server starts locally — the palette question is about to be answered by looking at real variants in a real browser, not by describing them in more chat.",
  },
  {
    src: shotPaletteB,
    timestamp: "5:51 PM",
    alt: "Palette prototype variant B, Dark Terminal: a dark-background reskin of a step titled “Stateless sessions.”",
    caption: "Variant B — Dark Terminal.",
  },
  {
    src: shotPaletteC,
    timestamp: "5:51 PM",
    alt: "Palette prototype variant C, Blueprint/Technical: the same step content with a grid-lined, annotated-blueprint treatment.",
    caption: "Variant C — Blueprint/Technical: same content, different costume.",
  },
  {
    src: shotPaletteD,
    timestamp: "5:51 PM",
    alt: "Palette prototype variant D, Warm Manuscript: the same step content on a warm parchment-toned background.",
    caption: "Variant D — Warm Manuscript.",
  },
  {
    src: shotPaletteE,
    timestamp: "5:52 PM",
    alt: "Palette prototype variant E, High-contrast Mono: the same step content in stark black-on-white monospace.",
    caption:
      "Variant E — High-contrast Mono, the fifth and last reskin. One content layout in five different clothes — exactly the pattern that gets called out as the problem a few beats later.",
  },
  {
    src: shotPaletteCapture,
    timestamp: "5:52 PM",
    alt: "Claude Code terminal mid-session, reporting it has called Playwright twelve times and is saving palette-B2.png while building the variant set.",
    caption:
      "The agent captures each variant with Playwright as it builds the set — twelve calls in by this frame, saving each one as its own image for the record rather than describing them after the fact.",
  },
  {
    src: shotTransitionsA,
    timestamp: "5:58 PM",
    alt: "Step-transition prototype variant A, a universal slide, shown as a concept diagram of two labelled sessions each connecting to a context box.",
    caption:
      "The matching first transition primitive: a universal slide, applied identically no matter what content is transitioning underneath it.",
  },
  {
    src: shotRound1Pushed,
    timestamp: "6:43 PM",
    alt: "Terminal reporting that palette.html, transitions.html, and a README are committed and pushed to a branch as teaching material, with no PR opened yet since the grilling questions are still unresolved.",
    caption:
      "Round 1 is committed and pushed as teaching material, with a README explaining how to run it locally — but no direction is locked yet. The palette and transition questions are both still open.",
  },
];

const BEAT_3_ROUND_TWO: Shot[] = [
  {
    src: shotLazywebCited,
    timestamp: "6:50 PM",
    alt: "Terminal showing live, on-page lazyweb source citations added to both prototype files, immediately followed by the verdict typed on round 1: “q3 all are generic. q5 liked Shared-frame morph but crossfade not.”",
    caption:
      "Live, on-page lazyweb source citations get added to both prototype files — and, right after, the verdict on round 1 lands: “q3 all are generic. q5 liked Shared-frame morph but crossfade not.”",
  },
  {
    src: shotReadmeDiff,
    timestamp: "6:50 PM",
    alt: "VS Code showing prototyp/README.md's “Design research: how lazyweb fed into this” section, listing three real lazyweb search queries and a reference-to-decision traceability table.",
    caption:
      "The teaching writeup behind that verdict: three real lazyweb search queries, one of them admitted to have returned mostly unrelated results — kept in the record rather than edited out, since design research isn't always a hit.",
  },
  {
    src: shotTransitionsH,
    timestamp: "6:52 PM",
    alt: "Round-2 transitions prototype, variant H (scale with frame), previewing a mock “after” demo screen used only to exercise the animation, with a note explaining the four re-scoped content-behavior alternatives.",
    caption:
      "Round 2 on the transitions question: the frame-morph chrome stays, but what the content underneath it does gets re-explored across four new alternatives — shown here mid-preview against a placeholder demo screen built only to exercise the motion.",
  },
  {
    src: shotTransitionsVerified,
    timestamp: "6:54 PM",
    alt: "Terminal confirming, after checking in the browser, that variant H (scale-with-frame) works correctly, then asking to verify variant I (hard cut) the same way before merging them.",
    caption:
      "Verified directly in the browser, not assumed from the code: “Variant H (scale-with-frame) works correctly. Let's verify I (hard cut) the same way” — then asked to merge the two into one.",
  },
  {
    src: shotTransitionsJCommit,
    timestamp: "6:57 PM",
    alt: "Terminal showing the merged transition variant committed, narrowing the shared-frame morph so frame and content scale together with no crossfade.",
    caption:
      "The merge lands as variant J: frame and content now scale together on the same ratio and timing, with no opacity fade at all — the version this site actually ships.",
  },
  {
    src: shotPaletteRound2Begin,
    timestamp: "7:03 PM",
    alt: "Terminal reporting a rebuilt palette-round2.html, sourced from sharper lazyweb queries — bold-typography portfolios and The Economist's data-journalism grid — instead of the earlier SaaS-onboarding references.",
    caption:
      "The palette question gets the same re-grounding treatment: rebuilt from scratch against sharper lazyweb queries — bold-typography portfolios, a data-journalism grid — instead of the generic SaaS-onboarding references round 1 leaned on.",
  },
  {
    src: shotPaletteRound2D,
    timestamp: "7:05 PM",
    alt: "Round-2 palette prototype variant D, Flat Color-Blocked Chrome, with an inline caption crediting its lazyweb source directly on the page.",
    caption:
      "One of the four round-2 variants, Flat Color-Blocked Chrome, with its lazyweb source credited inline on the page itself — not left to a README nobody's reading while looking at the actual design.",
  },
  {
    src: shotBothRoundsSummary,
    timestamp: "7:06 PM",
    alt: "Terminal summarizing that both rounds are done and verified: transitions settled on variant J, and the palette rebuild caught a real CSS specificity bug along the way.",
    caption:
      "Both rounds close out together: transitions settle on variant J, and the palette rebuild catches and documents a real CSS specificity bug along the way — a genuine defect surfaced by checking the live page, not just re-reading the source.",
  },
  {
    src: shotPaletteRound2BFinal,
    timestamp: "7:09 PM",
    alt: "Round-2 palette prototype variant B, Title-Card Overlap, credited to a different lazyweb reference, with the instruction that settles the direction: combine variant B's content with variant D's sidebar, made expandable, with navigation headings.",
    caption:
      "Variant B, Title-Card Overlap, credited to a different lazyweb reference — and the instruction that actually settles the direction: “Combine B + side bar frm D + side bar should be expand and minimize. Side bar should have headings to easily navigate the site.”",
  },
  {
    src: shotFinalSettled,
    timestamp: "7:12 PM",
    alt: "The settled visual direction: a title-card step with a large ghost numeral, and an expandable sidebar listing this site's real sections and the current section's steps.",
    caption:
      "The settled result: one reference's title-card content treatment merged with another's sidebar-as-chrome idea, upgraded from a static dot rail into an expandable nav showing the site's actual sections and steps — this site's real information architecture, not a placeholder.",
  },
  {
    src: shotFinalToast,
    timestamp: "7:12 PM",
    alt: "The same settled prototype, a few seconds later, with the screen-capture tool's own “Screenshot captured” toast still visible on screen.",
    caption:
      "The same frame moments later, with the capture tool's own “Screenshot captured” toast still on screen — kept rather than cropped out, since it's an honest artifact of how this very sequence of screenshots exists at all.",
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
      purpose. What follows is the real record of that happening, in one
      continuous session on 2026-09-19 &mdash; nothing here is staged after
      the fact.</p>

    <h4 class="fx-beat-heading">Beat 1 &mdash; Kickoff &amp; grilling</h4>
    <div class="fx-shots">
      ${BEAT_1_KICKOFF.map(shotFigure).join("")}
    </div>

    <h4 class="fx-beat-heading">Beat 2 &mdash; Round 1: five palette variants and one transition, prototyped and rejected</h4>
    <div class="fx-shots">
      ${BEAT_2_ROUND_ONE.map(shotFigure).join("")}
    </div>

    <h4 class="fx-beat-heading">Beat 3 &mdash; Re-grounded in real references, and settled</h4>
    <div class="fx-shots">
      ${BEAT_3_ROUND_TWO.map(shotFigure).join("")}
    </div>
  `;
}
