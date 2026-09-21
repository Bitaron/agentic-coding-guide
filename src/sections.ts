import { mount as mountTraditionalDevelopment } from "./steps/traditional-development";
import { mount as mountTokenGeneration } from "./steps/token-generation";
import { mount as mountStatelessSessions } from "./steps/stateless-sessions";

export interface Step {
  title: string;
  /** Plain-HTML body for text-only steps. */
  body?: string;
  /**
   * For steps whose representation is a diagram/animation/demo rather than
   * prose (per .claude/skills/create-section/SKILL.md's representation-type
   * choice): mounts interactive content into the given container and
   * returns an optional cleanup (e.g. to stop a running animation) that's
   * called before the step is torn down.
   */
  mount?: (container: HTMLElement) => (() => void) | void;
  /**
   * Steps whose content needs more than the default 62ch reading column
   * (diagrams, side-by-side comparisons) opt into the wider layout.
   */
  wide?: boolean;
}

export interface Section {
  id: string;
  label: string;
  steps: Step[];
}

// Content-specific tickets (see the "AI Coding Session Website —
// content/IA spec" wayfinder map, issue #2) replace these placeholder
// steps section by section. "Working in an existing project" has no
// content decision yet, so it gets a route and nav entry only — its
// structure is not invented here.
export const sections: Section[] = [
  {
    id: "intro",
    label: "Intro to AI",
    steps: [
      {
        title: "Traditional software building",
        wide: true,
        mount: mountTraditionalDevelopment,
      },
      {
        title: "Token generation",
        wide: true,
        mount: mountTokenGeneration,
      },
      {
        title: "Stateless sessions",
        wide: true,
        mount: mountStatelessSessions,
      },
      {
        title: "Coming soon",
        body: "The rest of this section's steps are being written — see the Intro to AI content tickets.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend dev example",
    steps: [
      {
        title: "Coming soon",
        body: "This section's steps are being written — see the Backend dev example ticket.",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend dev example",
    steps: [
      {
        title: "Coming soon",
        body: "This section's steps are being written — see the Frontend dev example tickets.",
      },
    ],
  },
  {
    id: "existing-project",
    label: "Working in an existing project",
    steps: [
      {
        title: "Coming soon",
        body: "This section's content has not been decided yet.",
      },
    ],
  },
];

export function findSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}
