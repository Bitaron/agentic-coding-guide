import { sections, findSection } from "./sections";

// Vite's BASE_URL always ends with "/" (e.g. "/AI-Coding-Session-Interactive-
// Teaching-Website/" in production, "/" in dev). Every route lives under it.
const BASE_PATH = import.meta.env.BASE_URL;

export interface Route {
  sectionId: string;
  stepIndex: number; // 0-based
}

function defaultRoute(): Route {
  return { sectionId: sections[0].id, stepIndex: 0 };
}

/** Clamp a section id + 1-based step number from the URL into a valid Route. */
export function parseRoute(pathname: string): Route {
  const withoutBase = pathname.startsWith(BASE_PATH)
    ? pathname.slice(BASE_PATH.length)
    : pathname.replace(/^\//, "");
  const [sectionId, stepStr] = withoutBase.split("/").filter(Boolean);

  const section = sectionId ? findSection(sectionId) : undefined;
  if (!section) return defaultRoute();

  const requested = Number.parseInt(stepStr ?? "1", 10);
  const stepIndex = Number.isFinite(requested)
    ? Math.min(Math.max(requested - 1, 0), section.steps.length - 1)
    : 0;

  return { sectionId: section.id, stepIndex };
}

export function routePath(route: Route): string {
  return `${BASE_PATH}${route.sectionId}/${route.stepIndex + 1}`;
}

export function currentRoute(): Route {
  return parseRoute(window.location.pathname);
}

export function navigate(route: Route, replace = false): void {
  const path = routePath(route);
  if (replace) {
    window.history.replaceState(null, "", path);
  } else {
    window.history.pushState(null, "", path);
  }
}

/** Re-renders on browser back/forward and on any in-app link click. */
export function onRouteChange(handler: (route: Route) => void): void {
  const rerender = () => handler(currentRoute());

  window.addEventListener("popstate", rerender);

  document.addEventListener("click", (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[data-route]"
    );
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    const path = link.getAttribute("href")!;
    window.history.pushState(null, "", path);
    rerender();
  });

  // Root path (or a path with no recognizable route) settles on the default
  // route instead of leaving an invalid URL in the address bar.
  const initial = window.location.pathname;
  if (routePath(currentRoute()) !== initial) {
    navigate(currentRoute(), true);
  }

  handler(currentRoute());
}
