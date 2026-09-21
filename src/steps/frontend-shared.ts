// Markup builders shared by the Frontend dev example section's steps
// (frontend-intro, frontend-design-research, frontend-browser-testing).
// Issue #19 built this section's structural shell with placeholder slots,
// since the section's own screenshots didn't exist yet — they were captured
// while this very build happened, and curated once at launch per ADR-0003.
// Issue #20 is that curation: every screenshot below is real, sourced from
// frontendExample/, and this file's shotFigure mirrors backend-shared.ts's
// pattern (without a per-machine badge — this section's whole build was one
// session, one machine, unlike the Backend dev example's two-computer one).

export interface Shot {
  src: string;
  timestamp: string;
  alt: string;
  caption: string;
}

export function shotFigure(shot: Shot): string {
  return `
    <figure class="fx-shot">
      <span class="fx-shot-time">${shot.timestamp}</span>
      <a class="fx-shot-frame" href="${shot.src}" target="_blank" rel="noopener">
        <img class="fx-shot-img" src="${shot.src}" alt="${shot.alt}" loading="lazy" />
      </a>
      <figcaption class="fx-shot-caption">${shot.caption}</figcaption>
    </figure>
  `;
}

export interface FlowStep {
  label: string;
}

/** A vertical linear flow (requirement → ... → final state), for the
 * timeline-shaped diagrams ProjectBrief.md §7-§9 specify as fenced
 * text blocks — rendered as a real diagram instead of preformatted text. */
export function flowChain(ariaLabel: string, steps: FlowStep[]): string {
  return `
    <div class="fx-flow" role="img" aria-label="${ariaLabel}">
      ${steps
        .map((s) => `<div class="fx-flow-node">${s.label}</div>`)
        .join('<div class="fx-flow-arrow">↓</div>')}
    </div>
  `;
}
