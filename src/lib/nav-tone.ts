/**
 * Which tone is under the header island right now. The island reads the page
 * the way Apple's Liquid Glass reads what is behind it, and the material
 * and every piece of chrome inside it flip together:
 *
 * - "light": paper or mist all the way across. Clear glass, ink labels.
 * - "dark": an ink surface across the whole island. Smoky glass, paper
 *   labels.
 * - "mixed": something dark or an image under part of it (a half-width
 *   black slab in a blog post, the portfolio screenshots). The glass tints
 *   up to a milky 62% so ink labels stay legible whatever is underneath.
 *
 * Two signals. A full-bleed dark surface opts in with `data-nav-tone="dark"`
 * on its outermost element (the feasibility panel, the footer, the contact
 * banner, the portfolio band); one of those spanning the island's width
 * under its vertical center is "dark" outright. Otherwise six points along
 * the island's center line are hit-tested: the first element under each
 * that has an opaque background gives its luminance, an image counts as
 * unknown unless it carries data-nav-luma="light", the header itself and
 * the confetti canvas are skipped. All dark
 * is "dark"; any dark, or more than one unknown, is "mixed"; the rest is
 * "light". One
 * measurement per frame, coalesced from scroll and resize; the material
 * crossfades in CSS.
 *
 * Read through `useSyncExternalStore`, like scroll-detached.ts and
 * consent.ts: no effect ever calls setState (`react-hooks/set-state-in-effect`
 * is an error in this repo).
 */
export type NavTone = "light" | "dark" | "mixed";

const SAMPLES = 6;
const DARK_BELOW = 0.4; // relative luminance under which a surface counts as dark

let tone: NavTone = "light";
let frame = 0;
const listeners = new Set<() => void>();

function luminance(rgb: string): number | null {
  const m = rgb.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  if (m[4] !== undefined && parseFloat(m[4]) < 0.5) return null; // see-through
  const f = (v: string) => {
    const c = parseFloat(v) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(m[1]) + 0.7152 * f(m[2]) + 0.0722 * f(m[3]);
}

type Sample = "light" | "dark" | "unknown";

function sample(header: Element, x: number, y: number): Sample {
  for (const el of document.elementsFromPoint(x, y)) {
    if (header.contains(el) || el.tagName === "CANVAS") continue;
    if (el.tagName === "IMG" || el.tagName === "VIDEO" || el.tagName === "PICTURE") {
      // A light line drawing (the hero mascot, the partner logos) says so
      // with data-nav-luma="light"; any other image is unknown.
      return el.getAttribute("data-nav-luma") === "light" ? "light" : "unknown";
    }
    if (el.closest('[data-nav-tone="dark"]')) return "dark";
    const l = luminance(getComputedStyle(el).backgroundColor);
    if (l === null) continue;
    return l < DARK_BELOW ? "dark" : "light";
  }
  return "light";
}

function measure(): NavTone {
  const shell = document.querySelector<HTMLElement>(".nav-shell");
  const header = shell?.parentElement;
  if (!shell || !header) return "light";
  const s = shell.getBoundingClientRect();
  const y = s.top + s.height / 2;

  for (const el of document.querySelectorAll<HTMLElement>('[data-nav-tone="dark"]')) {
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.bottom >= y && r.left <= s.left + 1 && r.right >= s.right - 1) return "dark";
  }

  let dark = 0;
  let unknown = 0;
  for (let i = 0; i < SAMPLES; i++) {
    const x = s.left + 24 + ((s.width - 48) * i) / (SAMPLES - 1);
    const kind = sample(header, x, y);
    if (kind === "dark") dark++;
    else if (kind === "unknown") unknown++;
  }
  if (dark === SAMPLES) return "dark";
  // One small image under the island (the hero mascot) is not a reason to
  // tint up; two, or any dark surface, is.
  if (dark > 0 || unknown > 1) return "mixed";
  return "light";
}

function update(): void {
  frame = 0;
  const next = measure();
  if (next === tone) return;
  tone = next;
  listeners.forEach((listener) => listener());
}

/** Coalesces scroll and resize bursts into one measurement per frame. */
export function scheduleNavToneUpdate(): void {
  if (frame) return;
  frame = requestAnimationFrame(update);
}

let observer: ResizeObserver | null = null;

export function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener("scroll", scheduleNavToneUpdate, { passive: true });
    window.addEventListener("resize", scheduleNavToneUpdate);
    // Layout can change without a scroll: the reviews section arriving,
    // images settling, a route change.
    observer = new ResizeObserver(scheduleNavToneUpdate);
    observer.observe(document.documentElement);
  }
  listeners.add(listener);
  update();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", scheduleNavToneUpdate);
      window.removeEventListener("resize", scheduleNavToneUpdate);
      observer?.disconnect();
      observer = null;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}

export const getSnapshot = (): NavTone => tone;
export const getServerSnapshot = (): NavTone => "light";
