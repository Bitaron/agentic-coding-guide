// Markup builders shared by the "Working in an existing project" section's
// five steps (existing-project-*.ts) — one per beat of ticket #23's resolved
// narrative. Each step renders a slice of the same narrated transcript, so
// the transcript/file-card rendering lives here once instead of being
// duplicated five times. Content (who says what, which lines are
// human-led catches) is reproduced from the ticket's resolved artifact,
// prototype/existing-project-transcript-final.html on
// worktree-wayfinder-existing-project-sample — not invented here.

export interface TranscriptLine {
  kind: "line";
  who: "human" | "agent";
  msg: string;
  /** Right-rail teaching note. Omitted for lines that don't need one. */
  note?: string;
  /** True when the note marks a human-initiated catch — the section's
   * throughline per ticket #23 ("almost every catch is human-initiated"). */
  humanLed?: boolean;
}

export interface TranscriptFile {
  kind: "file";
  path: string;
  body: string;
}

export type TranscriptBlock = TranscriptLine | TranscriptFile;

export function line(
  who: TranscriptLine["who"],
  msg: string,
  opts?: { note?: string; humanLed?: boolean }
): TranscriptLine {
  return { kind: "line", who, msg, note: opts?.note, humanLed: opts?.humanLed };
}

export function file(path: string, body: string): TranscriptFile {
  return { kind: "file", path, body };
}

function lineHtml(block: TranscriptLine): string {
  const note = block.note
    ? `<div class="ex-note${block.humanLed ? " human-led" : ""}">${block.note}</div>`
    : `<div class="ex-note"></div>`;
  return `
    <div class="ex-line">
      <div class="ex-who ${block.who}">${block.who}</div>
      <div class="ex-msg">${block.msg}</div>
      ${note}
    </div>
  `;
}

function fileHtml(block: TranscriptFile): string {
  return `
    <div class="ex-file">
      <div class="ex-file-path">${block.path}</div>
      <pre class="ex-file-body">${block.body}</pre>
    </div>
  `;
}

export function transcript(blocks: TranscriptBlock[]): string {
  return `
    <div class="ex-transcript">
      ${blocks.map((b) => (b.kind === "line" ? lineHtml(b) : fileHtml(b))).join("")}
    </div>
  `;
}
