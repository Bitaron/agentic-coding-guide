// Representation choice (per .claude/skills/create-section/SKILL.md): the
// branching diagram from ProjectBrief.md §4.7 (id y0b1e2), plus an
// interactive composition bar so the "advertised vs usable context"
// economics material merges into this step as one demo rather than two
// disconnected explanations (§4.10 + §4.7, merged per issue #15). The bar's
// total size never changes across mixes — only the proportions inside it —
// which is the concrete way to show "a larger context window doesn't mean
// every additional token is equally useful" without inventing a token count
// (the brief explicitly warns against stating a fixed number as universally
// usable).

interface Mix {
  key: string;
  label: string;
  useful: number;
  expensive: number;
  noisy: number;
  effective: string;
}

const MIXES: Mix[] = [
  {
    key: "useful",
    label: "Mostly useful context",
    useful: 70,
    expensive: 20,
    noisy: 10,
    effective: "High",
  },
  {
    key: "mixed",
    label: "Mixed context",
    useful: 40,
    expensive: 30,
    noisy: 30,
    effective: "Reduced",
  },
  {
    key: "noisy",
    label: "Mostly noisy context",
    useful: 15,
    expensive: 15,
    noisy: 70,
    effective: "Low",
  },
];

export function mount(container: HTMLElement): void {
  let mixIndex = 0;

  container.innerHTML = `
    <p class="ctx-intro">A model's context window is the maximum amount of
      text it can hold in a single call — the number on the spec sheet. But
      not every token inside that window is equally useful to the task at
      hand.</p>

    <div class="ctx-tree" role="img" aria-label="Context window branches into useful, relevant-but-expensive, and noisy content; noisy content reduces efficiency">
      <div class="ctx-tree-root">Context Window</div>
      <div class="ctx-tree-branches">
        <div class="ctx-tree-branch">Useful context</div>
        <div class="ctx-tree-branch">Relevant but expensive context</div>
        <div class="ctx-tree-branch ctx-tree-branch-noisy">
          Noisy / irrelevant context
          <div class="ctx-tree-outcome">↓ reduced efficiency</div>
        </div>
      </div>
    </div>

    <p class="ctx-demo-lead">Same advertised window size, different content
      mix — the effective, usable share of it changes even though the total
      never does:</p>

    <div class="ctx-mix-nav">
      ${MIXES.map(
        (m, i) =>
          `<button class="ctx-mix-btn" data-mix="${i}" type="button">${m.label}</button>`
      ).join("")}
    </div>

    <div class="ctx-bar-label">Context window (advertised size — constant)</div>
    <div class="ctx-bar">
      <div class="ctx-bar-seg ctx-bar-useful"></div>
      <div class="ctx-bar-seg ctx-bar-expensive"></div>
      <div class="ctx-bar-seg ctx-bar-noisy"></div>
    </div>
    <div class="ctx-legend">
      <span class="ctx-legend-item ctx-legend-useful">Useful</span>
      <span class="ctx-legend-item ctx-legend-expensive">Relevant but expensive</span>
      <span class="ctx-legend-item ctx-legend-noisy">Noisy / irrelevant</span>
    </div>

    <div class="ctx-effective">
      Effective, usable context: <strong class="ctx-effective-value"></strong>
    </div>

    <p class="ctx-caption">The window size doesn't change — what changes is
      how much of it actually helps. Practical, usable context depends on
      the model, the task, how the information is distributed, and how the
      agent workflow manages it — not on the advertised maximum alone.</p>
  `;

  const mixButtons = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".ctx-mix-btn")
  );
  const usefulSeg = container.querySelector<HTMLElement>(".ctx-bar-useful")!;
  const expensiveSeg = container.querySelector<HTMLElement>(".ctx-bar-expensive")!;
  const noisySeg = container.querySelector<HTMLElement>(".ctx-bar-noisy")!;
  const effectiveValue = container.querySelector<HTMLElement>(".ctx-effective-value")!;

  function render(): void {
    const mix = MIXES[mixIndex];
    usefulSeg.style.width = `${mix.useful}%`;
    expensiveSeg.style.width = `${mix.expensive}%`;
    noisySeg.style.width = `${mix.noisy}%`;
    effectiveValue.textContent = mix.effective;
    mixButtons.forEach((btn, i) => btn.classList.toggle("current", i === mixIndex));
  }

  mixButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      mixIndex = i;
      render();
    });
  });

  render();
}
