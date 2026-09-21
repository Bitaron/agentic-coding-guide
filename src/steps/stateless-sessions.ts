// Representation choice: a two-state diagram (progressive disclosure via a
// reveal toggle) using the exact Session A / Session B flow given in
// ProjectBrief.md §3.2, then contrasting it with an app-level persistence
// variant — the brief's own "demonstrate the difference between [independent
// sessions] and an app that adds persistence" framing.

export function mount(container: HTMLElement): () => void {
  container.innerHTML = `
    <p class="stx-intro">A model session does not remember another,
      independent session. Each one starts from whatever context it is
      given — nothing more.</p>

    <div class="stx-pair">
      <div class="stx-session">
        <div class="stx-session-label">Session A</div>
        <div class="stx-flow">
          <span>Context</span>
          <span class="stx-arrow">↓</span>
          <span>Response</span>
        </div>
      </div>
      <div class="stx-gap" aria-hidden="true">
        <span>no shared memory</span>
      </div>
      <div class="stx-session">
        <div class="stx-session-label">Session B</div>
        <div class="stx-flow">
          <span>New context</span>
          <span class="stx-arrow">↓</span>
          <span>Response</span>
        </div>
      </div>
    </div>

    <button class="stx-reveal" type="button">What if the app adds memory? →</button>

    <div class="stx-persisted" hidden>
      <p class="stx-persisted-intro">An application can add persistence
        <em>around</em> the model — the model itself still starts each call
        stateless.</p>
      <div class="stx-pair stx-pair-linked">
        <div class="stx-session">
          <div class="stx-session-label">Session A</div>
          <div class="stx-flow">
            <span>Context</span>
            <span class="stx-arrow">↓</span>
            <span>Response</span>
          </div>
        </div>
        <div class="stx-store">External memory<br />(stored state)</div>
        <div class="stx-session">
          <div class="stx-session-label">Session B</div>
          <div class="stx-flow">
            <span>New context <em>+ stored state</em></span>
            <span class="stx-arrow">↓</span>
            <span>Response</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const revealBtn = container.querySelector<HTMLButtonElement>(".stx-reveal")!;
  const persisted = container.querySelector<HTMLElement>(".stx-persisted")!;

  revealBtn.addEventListener("click", () => {
    const showing = !persisted.hidden;
    persisted.hidden = showing;
    revealBtn.textContent = showing
      ? "What if the app adds memory? →"
      : "← Hide the persisted variant";
  });

  return () => {};
}
