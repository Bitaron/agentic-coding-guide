export interface Step {
  title: string;
  body: string;
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
        title: "Coming soon",
        body: "This section's steps are being written — see the Intro to AI content tickets.",
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
