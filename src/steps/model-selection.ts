// Representation choice (per .claude/skills/create-section/SKILL.md): the
// exact factor chain from ProjectBrief.md §4.8 (id b9vx2j), reusing the
// factor-chain component from the provider-comparison/token-economics
// steps since it's the same "several inputs combine into one decision"
// shape. The don't/do contrast and the scenario→choice mapping (id j17m4c)
// are click-to-reveal, echoing sub-agents' pattern, so the reader has to
// choose a scenario before seeing the recommended model class/effort
// rather than reading it as a flat, memorizable list.

import { factorChain } from "./shared";

const FACTORS = [
  "Task complexity",
  "Required reasoning",
  "Latency",
  "Token consumption",
  "Cost",
  "Tool usage",
  "Context size",
  "Reliability",
];

interface Scenario {
  label: string;
  result: string;
}

const SCENARIOS: Scenario[] = [
  { label: "Simple task", result: "Fast model / low effort" },
  { label: "Implementation", result: "Balanced model / medium-high effort" },
  {
    label: "Architecture / difficult debugging",
    result: "Deep reasoning model / high-max effort",
  },
];

export function mount(container: HTMLElement): void {
  let scenarioIndex = 0;

  container.innerHTML = `
    <p class="sel-intro">Model selection is an engineering trade-off, not
      a single "pick the best model" decision.</p>

    ${factorChain(
      "Task complexity, required reasoning, latency, token consumption, cost, tool usage, context size, and reliability combine into model choice",
      FACTORS,
      "Model choice"
    )}

    <div class="callout">
      <p class="sel-dont">Don't teach: "Always use the strongest model."</p>
      <p class="sel-do">Do teach: use the least expensive/simplest model
        that reliably solves the task, and increase reasoning/model
        capability when the task requires it.</p>
    </div>

    <p class="sel-scenario-lead">For agentic development, this can mean
      using different models or effort levels for different roles. Pick a
      role:</p>

    <div class="sel-scenarios">
      ${SCENARIOS.map(
        (s, i) => `<button class="sel-scenario" data-scenario="${i}" type="button">${s.label}</button>`
      ).join("")}
    </div>

    <div class="sel-scenario-panel">
      <div class="sel-scenario-arrow">↓</div>
      <div class="sel-scenario-result"></div>
    </div>
  `;

  const scenarioButtons = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".sel-scenario")
  );
  const resultEl = container.querySelector<HTMLElement>(".sel-scenario-result")!;

  function render(): void {
    resultEl.textContent = SCENARIOS[scenarioIndex].result;
    scenarioButtons.forEach((btn, i) => btn.classList.toggle("current", i === scenarioIndex));
  }

  scenarioButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      scenarioIndex = i;
      render();
    });
  });

  render();
}
