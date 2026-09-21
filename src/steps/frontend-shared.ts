// Markup builders shared by the Frontend dev example section's steps
// (frontend-intro, frontend-design-research, frontend-browser-testing).
// Issue #19 builds this section's structural shell only — the section's
// screenshots don't exist yet; they're captured while this very build
// happens and curated once at launch, per ADR-0003. So every "shot" here is
// a placeholder slot, not a real image, and is styled to be unmistakably
// unfinished rather than quietly passing for real content. Issue #20
// replaces these slots with the curated narrative.

export interface Slot {
  label: string;
  note: string;
}

export function slotFigure(slot: Slot): string {
  return `
    <figure class="fx-slot">
      <div class="fx-slot-frame" role="img" aria-label="Placeholder: ${slot.label}, not yet captured">
        <span class="fx-slot-tag">Pending capture</span>
        <span class="fx-slot-label">${slot.label}</span>
      </div>
      <figcaption class="fx-slot-caption">${slot.note}</figcaption>
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
