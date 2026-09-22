// A single zoom modal shared by every screenshot figure on the site
// (Frontend and Backend dev example sections). Steps re-render their
// content via innerHTML on each route change (see main.ts renderStep),
// so triggers are matched by delegation on document rather than by
// binding listeners per figure — the modal itself is built once and
// survives route changes untouched.
//
// Beyond fit-to-screen, the dialog supports magnifying the screenshot
// (buttons, +/-/0 keys, or clicking the image) — several of the shots
// are terminal sessions with small text that fit-to-screen alone can't
// make legible. Panning past 100% relies on the browser's native
// scrolling of the transformed image rather than a hand-rolled drag.

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.5;
const ZOOM_CLICK_LEVEL = 2;

let modal: HTMLDivElement;
let dialog: HTMLDivElement;
let modalImg: HTMLImageElement;
let closeButton: HTMLButtonElement;
let zoomInButton: HTMLButtonElement;
let zoomOutButton: HTMLButtonElement;
let lastFocused: HTMLElement | null = null;
let zoom = ZOOM_MIN;

function buildModal(): void {
  modal = document.createElement("div");
  modal.className = "image-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="image-modal-backdrop" data-modal-dismiss></div>
    <div class="image-modal-dialog" role="dialog" aria-modal="true" aria-label="Enlarged screenshot">
      <img class="image-modal-img" alt="" />
    </div>
    <div class="image-modal-controls">
      <button type="button" class="image-modal-zoom-out" aria-label="Zoom out">&minus;</button>
      <button type="button" class="image-modal-zoom-in" aria-label="Zoom in">&plus;</button>
    </div>
    <button type="button" class="image-modal-close" aria-label="Close">&times;</button>
  `;
  document.body.appendChild(modal);

  dialog = modal.querySelector(".image-modal-dialog")!;
  modalImg = modal.querySelector(".image-modal-img")!;
  closeButton = modal.querySelector(".image-modal-close")!;
  zoomInButton = modal.querySelector(".image-modal-zoom-in")!;
  zoomOutButton = modal.querySelector(".image-modal-zoom-out")!;

  closeButton.addEventListener("click", closeImageModal);
  modal
    .querySelector("[data-modal-dismiss]")!
    .addEventListener("click", closeImageModal);
  // The dialog now paints above the backdrop across its whole box (see the
  // position: relative rule in style.css), so it — not the backdrop — is
  // what receives clicks on the empty margin around the image. Dismiss
  // here too, but only when the dialog itself was the target: a click on
  // the image bubbles up with that as event.target, and must fall through
  // to the image's own zoom-toggle handler below instead of closing.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeImageModal();
  });

  zoomInButton.addEventListener("click", zoomIn);
  zoomOutButton.addEventListener("click", zoomOut);
  modalImg.addEventListener("click", () => {
    if (zoom > ZOOM_MIN) resetZoom();
    else setZoom(ZOOM_CLICK_LEVEL);
  });

  // The dialog's scrollable area only reflects the image's new painted
  // size once its transform transition has actually finished — reading
  // scrollWidth/Height synchronously in setZoom() would still see the
  // pre-zoom size, so recentering has to happen here instead.
  modalImg.addEventListener("transitionend", (event) => {
    if (event.propertyName === "transform") centerDialogScroll();
  });
}

function isOpen(): boolean {
  return modal.classList.contains("is-open");
}

function centerDialogScroll(): void {
  dialog.scrollLeft = (dialog.scrollWidth - dialog.clientWidth) / 2;
  dialog.scrollTop = (dialog.scrollHeight - dialog.clientHeight) / 2;
}

function setZoom(next: number): void {
  zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
  modalImg.style.transform = zoom === ZOOM_MIN ? "" : `scale(${zoom})`;
  modal.classList.toggle("is-zoomed", zoom > ZOOM_MIN);
  zoomOutButton.disabled = zoom <= ZOOM_MIN;
  zoomInButton.disabled = zoom >= ZOOM_MAX;
  // Best-effort immediate centering (correct outright if transitions are
  // disabled, e.g. prefers-reduced-motion); the transitionend listener
  // above corrects it once more when an animation actually plays.
  centerDialogScroll();
}

function zoomIn(): void {
  setZoom(zoom + ZOOM_STEP);
}

function zoomOut(): void {
  setZoom(zoom - ZOOM_STEP);
}

function resetZoom(): void {
  setZoom(ZOOM_MIN);
}

function openModal(trigger: HTMLElement): void {
  const img = trigger.querySelector("img");
  if (!img) return;

  modalImg.src = img.currentSrc || img.src;
  modalImg.alt = img.alt;
  resetZoom();
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
  resetZoom();
}

function focusableElements(): HTMLElement[] {
  return Array.from(
    modal.querySelectorAll<HTMLElement>("button:not(:disabled), [href]")
  );
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

    switch (event.key) {
      case "Escape":
        closeImageModal();
        return;
      case "+":
      case "=":
        event.preventDefault();
        zoomIn();
        return;
      case "-":
      case "_":
        event.preventDefault();
        zoomOut();
        return;
      case "0":
        event.preventDefault();
        resetZoom();
        return;
      case "Tab": {
        // Trap Tab/Shift+Tab among the dialog's own controls rather than
        // letting focus escape to page content hidden behind the backdrop.
        const focusable = focusableElements();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
    }
  });
}
