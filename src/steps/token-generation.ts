// Representation choice: an interactive playback demo rather than a static
// diagram or maths — ProjectBrief.md §3.2 explicitly asks for token
// generation to "make this understandable visually rather than through a
// highly mathematical explanation." Word-level chips are a simplification
// of real subword tokenization; that's called out in the caption below so
// it reads as a labelled conceptual example, not an invented technical claim.

const SENTENCE = [
  "The",
  "agent",
  "reads",
  "the",
  "file,",
  "then",
  "writes",
  "a",
  "fix.",
];

const TICK_MS = 750;

export function mount(container: HTMLElement): () => void {
  let generated = 0;
  let playing = false;
  let timer: number | undefined;

  container.innerHTML = `
    <p class="tok-intro">At each step, the model looks at everything
      generated so far — the <strong>context</strong> — and predicts the
      single most likely next token. That new token is appended to the
      context, and the process repeats.</p>
    <div class="tok-stage">
      <div class="tok-context-label">Context so far</div>
      <div class="tok-chips" aria-live="polite"></div>
      <div class="tok-predict" hidden>
        <span class="tok-predict-arrow">↓ predicting next token</span>
      </div>
    </div>
    <div class="tok-controls">
      <button class="tok-play" type="button">Play</button>
      <button class="tok-step" type="button">Step</button>
      <button class="tok-restart" type="button">Restart</button>
    </div>
    <p class="tok-caption">Simplified for clarity: real models predict
      pieces of words (tokens), not whole words, and consider far more than
      one candidate at a time. The one-token-at-a-time, context-in →
      token-out loop shown here is accurate; the word-sized chips are not.</p>
  `;

  const chipsEl = container.querySelector<HTMLElement>(".tok-chips")!;
  const predictEl = container.querySelector<HTMLElement>(".tok-predict")!;
  const playBtn = container.querySelector<HTMLButtonElement>(".tok-play")!;
  const stepBtn = container.querySelector<HTMLButtonElement>(".tok-step")!;
  const restartBtn = container.querySelector<HTMLButtonElement>(".tok-restart")!;

  function renderChips(): void {
    chipsEl.innerHTML = SENTENCE.slice(0, generated)
      .map((word, i) => {
        const isNewest = i === generated - 1;
        return `<span class="tok-chip${isNewest ? " new" : ""}">${word}</span>`;
      })
      .join(" ");
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
    if (generated >= SENTENCE.length) {
      stopPlaying();
      return;
    }
    predictEl.hidden = false;
    generated += 1;
    renderChips();
    updateButtons();
    window.setTimeout(() => {
      predictEl.hidden = true;
    }, TICK_MS * 0.6);

    if (generated >= SENTENCE.length) {
      stopPlaying();
    }
  }

  function updateButtons(): void {
    const done = generated >= SENTENCE.length;
    stepBtn.disabled = done;
    playBtn.disabled = done;
  }

  playBtn.addEventListener("click", () => {
    if (playing) {
      stopPlaying();
      return;
    }
    playing = true;
    playBtn.textContent = "Pause";
    timer = window.setInterval(advance, TICK_MS);
  });

  stepBtn.addEventListener("click", () => {
    stopPlaying();
    advance();
  });

  restartBtn.addEventListener("click", () => {
    stopPlaying();
    generated = 0;
    predictEl.hidden = true;
    renderChips();
    updateButtons();
  });

  renderChips();
  updateButtons();

  return () => stopPlaying();
}
