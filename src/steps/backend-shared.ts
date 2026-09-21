// Markup builders shared by the Backend dev example section's three beats
// (backend-planning, backend-structure, backend-handoff). Every screenshot
// is real, sourced from backendExample/{firstComputer,secondComputer}/, and
// is labelled with which of the two computers it came from — per issue
// #18's acceptance criteria, the handoff between them needs to be visually
// signposted, not just implied by the order shots happen to appear in.

export interface Shot {
  src: string;
  /** Which of backendExample/{firstComputer,secondComputer}/ this shot is from. */
  machine: 1 | 2;
  timestamp: string;
  alt: string;
  caption: string;
  /**
   * One real screenshot sometimes carries two separate beats in one frame
   * (the Java/Spring Boot decision result and, right below it, the handoff
   * question being typed). Rather than duplicating the file, both beats
   * reference the same image and crop to their half via CSS — the full
   * frame is still one click away via "View full-size screenshot".
   */
  crop?: "top" | "bottom";
}

export function shotFigure(shot: Shot): string {
  return `
    <figure class="bx-shot">
      <div class="bx-shot-meta">
        <span class="bx-shot-badge">Computer ${shot.machine}</span>
        <span class="bx-shot-time">${shot.timestamp}</span>
      </div>
      <a class="bx-shot-frame${shot.crop ? ` crop-${shot.crop}` : ""}" href="${shot.src}" target="_blank" rel="noopener">
        <img class="bx-shot-img" src="${shot.src}" alt="${shot.alt}" loading="lazy" />
      </a>
      <figcaption class="bx-shot-caption">${shot.caption}</figcaption>
    </figure>
  `;
}

/** An explicit marker for the moment the screenshot source switches
 * computers — the literal signpost the acceptance criteria ask for. */
export function handoffMarker(from: 1 | 2, to: 1 | 2): string {
  return `
    <div class="bx-handoff" role="img" aria-label="Handoff: picked up on Computer ${to}">
      <span class="bx-handoff-label">Computer ${from}</span>
      <span class="bx-handoff-arrow">&rarr;</span>
      <span class="bx-handoff-label">Computer ${to}</span>
    </div>
  `;
}
