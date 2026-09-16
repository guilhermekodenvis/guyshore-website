/**
 * Has the page scrolled away from the top? That single bit is what turns the
 * header from a full-width bar into the floating island (see site-header.tsx
 * and `.nav-shell` in globals.css).
 *
 * Read through `useSyncExternalStore`, the same way consent.ts is, so no
 * effect ever calls setState: `react-hooks/set-state-in-effect` is an error
 * in this repo. The server snapshot is `false`, and the module starts at
 * `false` too, so the first client render matches the server HTML; the real
 * position is read the moment the header subscribes, after hydration.
 *
 * Two thresholds rather than one: iOS rubber-bands the page a few pixels
 * past the top, and a single threshold would flicker the bar on every bounce.
 */
const DETACH_AT = 16;
const ATTACH_AT = 4;

let detached = false;
const listeners = new Set<() => void>();

function read(): boolean {
  const y = window.scrollY;
  return detached ? y > ATTACH_AT : y > DETACH_AT;
}

function update(): void {
  const next = read();
  if (next === detached) return;
  detached = next;
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener("scroll", update, { passive: true });
  }
  listeners.add(listener);
  // A page can load already scrolled (a reload mid-page, a hash link), so
  // settle the real state as soon as there is someone to tell.
  update();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", update);
    }
  };
}

export const getSnapshot = (): boolean => detached;
export const getServerSnapshot = (): boolean => false;
