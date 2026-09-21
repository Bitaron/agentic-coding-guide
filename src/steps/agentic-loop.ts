// Representation choice (per .claude/skills/create-section/SKILL.md):
// ProjectBrief.md §4.15's exact cycle (id 9texya), played through more than
// one lap with a visible curved loop-back arrow — deliberately different
// from the Agents step's single vertical pass (which only says it loops, in
// a caption). Showing a second lap actually happen is the concrete way to
// satisfy the brief's "show how this differs from simply asking an AI to
// generate code once," which the toggle below makes explicit by contrasting
// it against a static one-shot flow.

const NODES = ["Plan", "Act", "Observe", "Evaluate", "Correct", "Continue"];
const LAPS = 2;

type Mode = "loop" | "one-shot";

export function mount(container: HTMLElement): () => void {
  let mode: Mode = "loop";
  let step = -1; // 0..NODES.length*LAPS - 1
  let playing = false;
  let timer: number | undefined;

  container.innerHTML = `
    <p class="loop-intro">Asking a model to generate code once produces a
      single pass: prompt in, code out, done. An agentic loop instead keeps
      cycling — planning, acting, observing what happened, evaluating it,
      correcting course — for as many laps as it takes.</p>

    <div class="loop-toggle">
      <button class="loop-toggle-btn current" data-mode="loop" type="button">Agentic loop</button>
      <button class="loop-toggle-btn" data-mode="one-shot" type="button">One-shot generation</button>
    </div>

    <div class="loop-stage">
      <div class="loop-cycle" role="img" aria-label="Plan, act, observe, evaluate, correct, continue, looping back to plan">
        <div class="loop-nodes">
          ${NODES.map((n, i) => `<div class="loop-node" data-node="${i}">${n}</div>`).join("")}
        </div>
        <svg class="loop-back-arrow" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 96 4 C 96 30, 4 30, 4 4" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#loop-arrowhead)" />
          <defs>
            <marker id="loop-arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
            </marker>
          </defs>
        </svg>
        <div class="loop-back-label">loops back until the goal is met</div>
      </div>

      <div class="loop-oneshot" hidden>
        <div class="loop-oneshot-flow">
          <div class="loop-oneshot-node">Prompt</div>
          <div class="loop-oneshot-arrow">→</div>
          <div class="loop-oneshot-node">Code</div>
          <div class="loop-oneshot-arrow">→</div>
          <div class="loop-oneshot-node loop-oneshot-done">Done</div>
        </div>
        <p class="loop-oneshot-caption">No observation, no correction — right
          the first time, or not at all.</p>
      </div>
    </div>

    <div class="loop-controls">
      <button class="loop-play" type="button">Play</button>
      <button class="loop-step" type="button">Step</button>
      <button class="loop-restart" type="button">Restart</button>
    </div>
    <p class="loop-lap"></p>
  `;

  const toggleBtns = Array.from(
    container.querySelectorAll<HTMLButtonElement>(".loop-toggle-btn")
  );
  const stageEl = container.querySelector<HTMLElement>(".loop-stage")!;
  const cycleEl = container.querySelector<HTMLElement>(".loop-cycle")!;
  const oneshotEl = container.querySelector<HTMLElement>(".loop-oneshot")!;
  const nodes = Array.from(container.querySelectorAll<HTMLElement>(".loop-node"));
  const controlsEl = container.querySelector<HTMLElement>(".loop-controls")!;
  const playBtn = container.querySelector<HTMLButtonElement>(".loop-play")!;
  const stepBtn = container.querySelector<HTMLButtonElement>(".loop-step")!;
  const restartBtn = container.querySelector<HTMLButtonElement>(".loop-restart")!;
  const lapEl = container.querySelector<HTMLElement>(".loop-lap")!;

  function stopPlaying(): void {
    playing = false;
    playBtn.textContent = "Play";
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  }

  function render(): void {
    const total = NODES.length * LAPS;
    const current = step % NODES.length;
    const lap = Math.floor(step / NODES.length) + 1;

    nodes.forEach((node, i) => {
      node.classList.toggle("current", step >= 0 && i === current);
      node.classList.toggle("done", step >= 0 && i < current);
    });

    lapEl.textContent =
      step < 0
        ? "Not started."
        : step >= total - 1
          ? `Lap ${LAPS} of ${LAPS} complete — and so on, until the goal is met.`
          : `Lap ${lap} of ${LAPS}.`;

    const done = step >= total - 1;
    stepBtn.disabled = done;
    playBtn.disabled = done;
  }

  function advance(): void {
    const total = NODES.length * LAPS;
    if (step >= total - 1) {
      stopPlaying();
      return;
    }
    step += 1;
    render();
    if (step >= total - 1) {
      stopPlaying();
    }
  }

  playBtn.addEventListener("click", () => {
    if (playing) {
      stopPlaying();
      return;
    }
    playing = true;
    playBtn.textContent = "Pause";
    timer = window.setInterval(advance, 650);
  });

  stepBtn.addEventListener("click", () => {
    stopPlaying();
    advance();
  });

  restartBtn.addEventListener("click", () => {
    stopPlaying();
    step = -1;
    render();
  });

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      mode = btn.dataset.mode as Mode;
      stopPlaying();
      toggleBtns.forEach((b) => b.classList.toggle("current", b === btn));
      cycleEl.hidden = mode !== "loop";
      oneshotEl.hidden = mode !== "one-shot";
      controlsEl.hidden = mode !== "loop";
      lapEl.hidden = mode !== "loop";
      stageEl.classList.toggle("loop-stage-oneshot", mode === "one-shot");
    });
  });

  render();

  return () => stopPlaying();
}
