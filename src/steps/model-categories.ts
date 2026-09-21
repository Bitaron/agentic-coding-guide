// Representation choice (per .claude/skills/create-section/SKILL.md):
// ProjectBrief.md §4.1 explicitly separates two concepts — capability
// category and reasoning effort — and warns effort is "a relative control
// within a model/provider, not a universal cross-model measurement." Two
// independently-clickable selectors (category cards, effort ladder) that
// don't affect each other operationalizes that separation as an
// interaction rather than just stating it in prose: picking a category
// never moves the effort selection, and vice versa.

interface Category {
  name: string;
  ref: string;
  role: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Fast / Lightweight",
    ref: "Haiku",
    role: "Fast responses, simple tasks, high-throughput work",
  },
  {
    name: "Balanced",
    ref: "Sonnet",
    role: "General software development, analysis, agentic work",
  },
  {
    name: "Deep Reasoning / Frontier",
    ref: "Opus",
    role: "Difficult reasoning, architecture, complex coding, long-horizon work",
  },
];

const EFFORT_LEVELS = ["NONE", "LOW", "MEDIUM", "HIGH", "XHIGH / MAX"];

const EFFORT_EFFECTS = [
  "more computation/thinking",
  "potentially better performance on difficult tasks",
  "higher latency",
  "potentially more reasoning tokens",
  "potentially higher token consumption",
];

const UNIVERSALITY_CAVEATS = [
  "One provider may support none / low / medium / high / xhigh.",
  "Another may support only low / high / max.",
  "Some reasoning models may not allow reasoning to be disabled.",
  "The same effort name does not guarantee the same amount of computation or tokens across providers.",
];

export function mount(container: HTMLElement): void {
  let catIndex = 1;
  let effortIndex = 2;

  container.innerHTML = `
    <p class="mc-intro">Model capability and reasoning effort are two
      separate dials. Anthropic's family is used here as an intuitive
      reference — a conceptual classification, not a claim that models from
      different vendors are directly equivalent.</p>

    <div class="mc-dial-group">
      <div class="mc-dial-label">Capability category</div>
      <div class="mc-categories">
        ${CATEGORIES.map(
          (c, i) => `
          <button class="mc-category" data-cat="${i}" type="button">
            <span class="mc-category-name">${c.name}</span>
            <span class="mc-category-ref">${c.ref}</span>
            <span class="mc-category-role">${c.role}</span>
          </button>`
        ).join("")}
      </div>
    </div>

    <div class="mc-dial-group">
      <div class="mc-dial-label">Reasoning effort</div>
      <div class="mc-ladder" role="img" aria-label="Reasoning effort scale from none to xhigh/max">
        ${EFFORT_LEVELS.map(
          (level, i) => `<button class="mc-rung" data-effort="${i}" type="button">${level}</button>`
        ).join('<div class="mc-rung-arrow">↓</div>')}
      </div>
    </div>

    <p class="mc-readout">Selected: <strong class="mc-readout-cat"></strong>
      capability at <strong class="mc-readout-effort"></strong> effort —
      two independent choices; picking one doesn't set the other.</p>

    <p class="mc-effects-lead">Higher effort generally means:</p>
    <ul class="mc-effects">
      ${EFFORT_EFFECTS.map((e) => `<li>${e}</li>`).join("")}
    </ul>

    <p class="mc-caption">Anthropic's newer models use adaptive thinking,
      where reasoning depth depends on both the configured effort and task
      complexity — Anthropic specifically notes that higher effort can
      increase thinking tokens and latency.</p>

    <div class="callout">
      <div class="callout-heading">Effort is not a universal standard</div>
      <ul class="callout-list">
        ${UNIVERSALITY_CAVEATS.map((c) => `<li>${c}</li>`).join("")}
      </ul>
      <p class="callout-conclusion">So: use effort as a relative control
        within a model/provider, not as a universal cross-model
        measurement.</p>
    </div>
  `;

  const categoryButtons = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".mc-category")
  );
  const rungButtons = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".mc-rung")
  );
  const readoutCat = container.querySelector<HTMLElement>(".mc-readout-cat")!;
  const readoutEffort = container.querySelector<HTMLElement>(".mc-readout-effort")!;

  function render(): void {
    categoryButtons.forEach((btn, i) => btn.classList.toggle("current", i === catIndex));
    rungButtons.forEach((btn, i) => btn.classList.toggle("current", i === effortIndex));
    readoutCat.textContent = `${CATEGORIES[catIndex].ref} (${CATEGORIES[catIndex].name})`;
    readoutEffort.textContent = EFFORT_LEVELS[effortIndex];
  }

  categoryButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      catIndex = i;
      render();
    });
  });

  rungButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      effortIndex = i;
      render();
    });
  });

  render();
}
