// Representation choice (per .claude/skills/create-section/SKILL.md):
// ProjectBrief.md §4.5 and §4.6 merge into one step per issue #14's
// resolved breakdown. A three-stage nav (reusing traditional-development's
// stage-panel pattern) keeps "where tokens go", "effort → tokens", and
// "agentic multiplication" as one continuous teaching beat without
// stacking all three diagrams/tables into one unbroken scroll. Simple vs
// agentic interaction reuses token-generation/agents' step-through control
// pattern since both are "watch a sequential process advance" demos.

import { dataTable, factorChain, type Row } from "./shared";

const EFFORT_ROWS: Row[] = [
  { cells: ["None", "Minimal/no explicit reasoning", "Lowest"] },
  { cells: ["Low", "Small reasoning budget/work", "Low"] },
  { cells: ["Medium", "More reasoning", "Moderate"] },
  { cells: ["High", "Substantial reasoning", "Higher"] },
  { cells: ["XHigh / Max", "Maximum/deeper reasoning", "Potentially much higher"] },
];

const MULTIPLIER_FACTORS = [
  "model",
  "task complexity",
  "context",
  "effort setting",
  "tool usage",
  "agent loop length",
  "model-specific reasoning behavior",
];

const SIMPLE_STEPS = ["User", "Model", "Answer"];
const AGENTIC_STEPS = [
  "User",
  "Model",
  "Tool call",
  "Tool result",
  "Model",
  "Tool call",
  "Tool result",
  "Model",
  "Final answer",
];

const STAGES = [
  {
    label: "1. Where tokens go",
    html: `
      <div class="econ-tree" role="img" aria-label="Total token consumption splits into input tokens (system prompt, user request, context, tool results) and output tokens (visible answer, reasoning/thinking tokens)">
        <div class="econ-tree-root">Total Token Consumption</div>
        <div class="econ-tree-branches">
          <div class="econ-tree-branch">
            <div class="econ-tree-branch-label">Input tokens</div>
            <ul class="econ-tree-leaves">
              <li>system prompt</li>
              <li>user request</li>
              <li>context</li>
              <li>tool results</li>
            </ul>
          </div>
          <div class="econ-tree-branch">
            <div class="econ-tree-branch-label">Output tokens</div>
            <ul class="econ-tree-leaves">
              <li>visible answer</li>
              <li>reasoning / thinking tokens</li>
            </ul>
          </div>
        </div>
      </div>
      <p class="econ-caption">For providers that expose reasoning tokens,
        reasoning tokens are explicitly reflected in usage. DeepSeek, for
        example, exposes <code class="inline">reasoning_tokens</code> and
        defines total usage as input plus output, with reasoning tokens
        included in output usage.</p>
    `,
  },
  {
    label: "2. Effort → tokens",
    html: `
      ${dataTable(["Effort", "Reasoning work", "Typical token impact"], EFFORT_ROWS)}
      <div class="callout">
        <div class="callout-heading">Don't assign a fixed multiplier</div>
        <p class="callout-body">There's no rule like "high = 3× tokens."
          The actual number of reasoning tokens depends on:</p>
        <ul class="callout-list">
          ${MULTIPLIER_FACTORS.map((f) => `<li>${f}</li>`).join("")}
        </ul>
      </div>
      <p class="econ-caption">Anthropic explicitly notes that higher
        effort can increase thinking tokens, while adaptive thinking also
        responds to task complexity.</p>
    `,
  },
  {
    label: "3. Agentic multiplication",
    html: `
      <p class="econ-stage-lead">Agentic systems consume tokens
        differently from a single prompt/response.</p>
      <div class="econ-flows">
        <div class="econ-flow">
          <div class="econ-flow-label">Simple interaction</div>
          <div class="econ-flow-steps">
            ${SIMPLE_STEPS.map((s) => `<div class="econ-flow-step">${s}</div>`).join('<div class="econ-flow-arrow">↓</div>')}
          </div>
          <div class="econ-flow-total">Input + Output</div>
        </div>
        <div class="econ-flow">
          <div class="econ-flow-label">Agentic interaction</div>
          <div class="econ-flow-steps">
            ${AGENTIC_STEPS.map((s) => `<div class="econ-flow-step">${s}</div>`).join('<div class="econ-flow-arrow">↓</div>')}
          </div>
          <div class="econ-flow-total">Repeatedly reprocesses: previous
            context, new instructions, tool results, reasoning, new
            actions</div>
        </div>
      </div>
      ${factorChain(
        "More agent steps plus more tool results plus more reasoning leads to more total token usage",
        ["More agent steps", "More tool results", "More reasoning"],
        "More total token usage"
      )}
      <p class="econ-caption">This is one reason why agentic coding can
        use considerably more tokens than a simple chatbot interaction —
        even when the final answer itself is short.</p>
    `,
  },
];

export function mount(container: HTMLElement): void {
  let stageIndex = 0;

  container.innerHTML = `
    <p class="econ-intro">It's tempting to assume "higher intelligence
      only means a better model." But reasoning effort also affects how
      many tokens get consumed — and agentic systems consume tokens
      differently from a single prompt/response.</p>

    <div class="econ-stage-nav">
      ${STAGES.map(
        (s, i) => `<button class="econ-stage-btn" data-stage="${i}" type="button">${s.label}</button>`
      ).join("")}
    </div>

    <div class="econ-panel"></div>
  `;

  const stageButtons = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".econ-stage-btn")
  );
  const panel = container.querySelector<HTMLElement>(".econ-panel")!;

  function render(): void {
    panel.innerHTML = STAGES[stageIndex].html;
    stageButtons.forEach((btn, i) => btn.classList.toggle("current", i === stageIndex));
  }

  stageButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      stageIndex = i;
      render();
    });
  });

  render();
}
