// A single full-screen viewer shared by every screenshot figure on the site
// (Frontend and Backend dev example sections). Steps re-render their
// content via innerHTML on each route change (see main.ts renderStep),
// so triggers are matched by delegation on document rather than by
// binding listeners per figure — the modal itself is built once and
// survives route changes untouched.

let modal: HTMLDivElement;
let dialog: HTMLDivElement;
let modalImg: HTMLImageElement;
let closeButton: HTMLButtonElement;
let lastFocused: HTMLElement | null = null;

function buildModal(): void {
  modal = document.createElement("div");
  modal.className = "image-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="image-modal-backdrop" data-modal-dismiss></div>
    <div class="image-modal-dialog" role="dialog" aria-modal="true" aria-label="Enlarged screenshot">
      <img class="image-modal-img" alt="" />
    </div>
    <button type="button" class="image-modal-close" aria-label="Close">&times;</button>
  `;
  document.body.appendChild(modal);

  dialog = modal.querySelector(".image-modal-dialog")!;
  modalImg = modal.querySelector(".image-modal-img")!;
  closeButton = modal.querySelector(".image-modal-close")!;

  closeButton.addEventListener("click", closeImageModal);
  modal
    .querySelector("[data-modal-dismiss]")!
    .addEventListener("click", closeImageModal);
  // The dialog paints above the backdrop across its whole box (see the
  // position: relative rule in style.css), so it — not the backdrop — is
  // what receives clicks on the empty margin around the image. Dismiss
  // here too, but only when the dialog itself was the target: a click on
  // the image bubbles up with that as event.target, and shouldn't close
  // the viewer.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeImageModal();
  });
}

function isOpen(): boolean {
  return modal.classList.contains("is-open");
}

function openModal(trigger: HTMLElement): void {
  const img = trigger.querySelector("img");
  if (!img) return;

  modalImg.src = img.currentSrc || img.src;
  modalImg.alt = img.alt;
  lastFocused = document.activeElement as HTMLElement | null;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeButton.focus();
}

export function closeImageModal(): void {
  if (!isOpen()) return;

  // Move focus off the dialog before hiding it from the accessibility
  // tree — otherwise a screen reader briefly sees focus trapped inside
  // an aria-hidden container.
  const returnTo =
    lastFocused && lastFocused.isConnected ? lastFocused : null;
  lastFocused = null;
  returnTo?.focus();

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImg.removeAttribute("src");
}

export function initImageModal(): void {
  buildModal();

  document.addEventListener("click", (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>(
      ".shot-zoom-trigger"
    );
    if (!trigger || event.defaultPrevented) return;
    // Leave modifier/middle clicks alone so "open image in new tab" and
    // "copy link address" keep working on the underlying <a>.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    openModal(trigger);
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen()) return;
    if (event.key === "Escape") {
      closeImageModal();
    } else if (event.key === "Tab") {
      // The close button is the dialog's only control — trap Tab on it
      // rather than letting focus escape to page content behind the
      // backdrop.
      event.preventDefault();
      closeButton.focus();
    }
  });
}
