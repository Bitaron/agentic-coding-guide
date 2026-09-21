// Representation choice (per .claude/skills/create-section/SKILL.md): a
// step-through playback of ProjectBrief.md §4.11's exact loop (id 9hcyh8),
// reusing token-generation's play/step/restart control pattern since both
// are "watch a sequential process advance" demos. "Continue" loops back to
// reasoning rather than ending the process — the brief's own framing for how
// this differs from a single prompt/response — shown as a caption rather
// than a fabricated second animated pass, so nothing beyond the brief's
// stated loop is invented.

const NODES = ["Goal", "Reason", "Use tools", "Observe result", "Reason again", "Continue"];

export function mount(container: HTMLElement): () => void {
  let current = -1;
  let playing = false;
  let timer: number | undefined;

  container.innerHTML = `
    <p class="ag-intro">A simple prompt/response interaction stops after one
      answer. An agent instead keeps going: it reasons about a goal, acts,
      looks at what happened, and reasons again — for as many cycles as the
      goal requires.</p>
    <div class="ag-loop" role="img" aria-label="Goal, reason, use tools, observe result, reason again, continue">
      ${NODES.map((n, i) => `<div class="ag-node" data-node="${i}">${n}</div>`).join(
        '<div class="ag-arrow">↓</div>'
      )}
    </div>
    <div class="ag-controls">
      <button class="ag-play" type="button">Play</button>
      <button class="ag-step" type="button">Step</button>
      <button class="ag-restart" type="button">Restart</button>
    </div>
    <p class="ag-caption">"Continue" doesn't mean the task is finished — it
      means the loop repeats, looping back through reasoning, tools, and
      observation until the goal is actually satisfied.</p>
  `;

  const nodes = Array.from(container.querySelectorAll<HTMLElement>(".ag-node"));
  const playBtn = container.querySelector<HTMLButtonElement>(".ag-play")!;
  const stepBtn = container.querySelector<HTMLButtonElement>(".ag-step")!;
  const restartBtn = container.querySelector<HTMLButtonElement>(".ag-restart")!;

  function render(): void {
    nodes.forEach((node, i) => {
      node.classList.toggle("done", i < current);
      node.classList.toggle("current", i === current);
    });
    const done = current >= NODES.length - 1;
    stepBtn.disabled = done;
    playBtn.disabled = done;
  }

  function stopPlaying(): void {
    playing = false;
    playBtn.textContent = "Play";
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  }

  function advance(): void {
    if (current >= NODES.length - 1) {
      stopPlaying();
      return;
    }
    current += 1;
    render();
    if (current >= NODES.length - 1) {
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
    timer = window.setInterval(advance, 700);
  });

  stepBtn.addEventListener("click", () => {
    stopPlaying();
    advance();
  });

  restartBtn.addEventListener("click", () => {
    stopPlaying();
    current = -1;
    render();
  });

  render();

  return () => stopPlaying();
}
