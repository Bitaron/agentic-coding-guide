// Representation choice (per .claude/skills/create-section/SKILL.md): a
// checklist callout for the six review dimensions ProjectBrief.md §5 names
// verbatim, plus a don't/do contrast for the "integral part of the loop, not
// an optional final step" framing — reusing model-selection's exact
// don't/do shape since both correct a memorizable-but-wrong mental model.
// The closing citation restates plugins.ts's already-verified fact (this
// section's own steps 1-3 were reviewed via PR #27) rather than inventing a
// new one.

const DIMENSIONS = [
  "Correctness",
  "Maintainability",
  "Security",
  "Architecture",
  "Business requirements",
  "Edge cases",
];

export function mount(container: HTMLElement): void {
  container.innerHTML = `
    <p class="cr-intro">Code review doesn't stop being necessary because an
      agent generated the code. AI-generated code should still be reviewed
      for:</p>

    <div class="callout cr-callout">
      <ul class="callout-list">
        ${DIMENSIONS.map((d) => `<li>${d}</li>`).join("")}
      </ul>
    </div>

    <div class="callout">
      <p class="cr-dont">Don't teach: review as an optional final step,
        skipped when the code looks right.</p>
      <p class="cr-do">Do teach: review folded into the development loop, on
        every change — not a gate bolted on at the end.</p>
    </div>

    <p class="cr-caption">Not hypothetical here either: this section's own
      earlier steps were reviewed the same way — correctness and spec
      compliance checked in parallel — before they merged (see the Plugins
      step, PR #27).</p>
  `;
}
