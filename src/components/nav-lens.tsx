"use client";

import { useEffect, type RefObject } from "react";
import { getSnapshot, subscribe } from "@/lib/scroll-detached";

/**
 * The refracting rim of the header island: an SVG filter that
 * `backdrop-filter: url(#nav-lens)` pulls in (the `[data-lens="on"]` rule in
 * globals.css). It bends the page along the edge of the pill the way Apple's
 * Liquid Glass does, which no CSS function can.
 *
 * Filter order: a small settle blur, then the bend (feDisplacementMap fed by
 * a canvas-drawn map), then the frost. Bending first is what makes the rim
 * refract: the displaced field still has gradients at rim scale, so the
 * page's edges curl along the band. Two Gaussians in series are one of
 * std sqrt(a^2 + b^2), so the post blur is computed from the wanted total.
 * Each blur is followed by a component transfer that forces alpha to 1:
 * Chromium ignores edgeMode inside backdrop-filter and blurs against
 * transparent outside the box, which would fade the rim; the transfer turns
 * that into a normalized convolution.
 *
 * Only Chromium runs SVG filters inside backdrop-filter. Safari and Firefox
 * parse url() as valid and then paint no backdrop at all, so the gate is
 * the Chromium brand in navigator.userAgentData, which no other engine
 * ships, plus a fine pointer, so phones keep the cheaper material. Everyone
 * else keeps the plain blur declared before the override, a complete
 * material on its own.
 *
 * The swap from blur() to url() cannot interpolate, so it is made invisible:
 * on the frame the island detaches the filter is parked at the exact look
 * of the attached blur (displacement 0, total std 12) and the attribute is
 * set; its own parameters then ramp on the same spring the CSS uses,
 * re-targeting from the current values if the scroll reverses mid-morph.
 * On the way back the ramp runs first and the attribute is removed only
 * when the filter is back at that look.
 *
 * The effect touches DOM attributes only, never React state.
 */

export const NAV_LENS_ID = "nav-lens";

/* Tunables, in CSS px. BAND is the rim band at the caps, BAND_EDGE along the
   straight edges; STRENGTH the peak displacement; EDGE_MIN the share kept on
   the straight edges; DIRECTION -1 samples inward (a thick glass edge;
   outward reads transparent under backdrop-filter). PRE is the settle blur,
   BLUR the island's total frost, BLUR_ATTACHED the attached bar's blur(12px)
   the filter must match on entry. Kept in sync with globals.css. */
const BAND = 18;
const BAND_EDGE = 12;
const STRENGTH = 22;
const EDGE_MIN = 0.7;
const DIRECTION = -1;
const PRE = 3;
const BLUR = 11;
const BLUR_ATTACHED = 12;
const DURATION = 500;
const DPR = 2;
const SCALE = 2 * STRENGTH; // feDisplacementMap: displacement = scale * (channel - 0.5)

const post = (total: number) => Math.sqrt(total * total - PRE * PRE);
/* The critically damped spring --nav-ease carries as linear(). */
const spring = (t: number) => 1 - (1 + 7.6 * t) * Math.exp(-7.6 * t);

const cache = new Map<string, string>();

function pillMap(w: number, h: number): string {
  const key = `${w}x${h}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const W = Math.round(w * DPR);
  const H = Math.round(h * DPR);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(W, H);
  const r = h / 2;
  const ax = r;
  const bx = w - r;
  const cy = h / 2;
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const x = (px + 0.5) / DPR;
      const y = (py + 0.5) / DPR;
      // Closest point on the pill's medial segment gives the outward normal.
      const qx = Math.min(Math.max(x, ax), bx);
      const vx = x - qx;
      const vy = y - cy;
      const dist = Math.hypot(vx, vy) || 1e-6;
      const nx = vx / dist;
      const ny = vy / dist;
      const sd = r - dist; // signed distance to the edge, positive inside
      // Curvature weight: 1 at the outermost point of a cap, 0 on the
      // straight edges, so the caps bend more than the long sides.
      const k = Math.abs(nx);
      const band = BAND_EDGE + (BAND - BAND_EDGE) * k;
      const amp = STRENGTH * (EDGE_MIN + (1 - EDGE_MIN) * k);
      let dx = 0;
      let dy = 0;
      if (sd < band && sd > -1) {
        const t = Math.min(1, Math.max(0, 1 - sd / band));
        // A bump: nothing at the rim itself, peak a third of the way in,
        // nothing at the band's inner edge. That folds the backdrop into a
        // visible band along the whole perimeter instead of stretching one
        // row of it.
        const m = Math.pow(4 * t * (1 - t), 1.2) * amp * DIRECTION;
        dx = nx * m;
        dy = ny * m;
      }
      const i = (py * W + px) * 4;
      img.data[i] = Math.round((0.5 + dx / SCALE) * 255);
      img.data[i + 1] = Math.round((0.5 + dy / SCALE) * 255);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = canvas.toDataURL("image/png");
  cache.set(key, url);
  // A drag-resize on Windows settles at many widths; keep the last few.
  if (cache.size > 4) cache.delete(cache.keys().next().value as string);
  return url;
}

type UAData = { brands?: { brand: string }[] };

export function navLensSupported(): boolean {
  if (typeof navigator === "undefined" || typeof CSS === "undefined") return false;
  const uad = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
  if (!uad?.brands?.some((b) => /chromium/i.test(b.brand))) return false;
  if (navigator.vendor === "Apple Computer, Inc.") return false;
  if (matchMedia("(prefers-reduced-transparency: reduce)").matches) return false;
  if (matchMedia("(prefers-contrast: more)").matches) return false;
  // The displacement and two blurs re-run on every scroll frame. Desktops
  // carry that; a mid-range phone may not, and the plain blur is a complete
  // material there, so the lens waits for a real pointer.
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return false;
  return CSS.supports("backdrop-filter", `url(#${NAV_LENS_ID})`);
}

export function NavLens({ shell }: { shell: RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const el = shell.current;
    if (!el || !navLensSupported()) return;
    const filter = document.getElementById(NAV_LENS_ID);
    const displace = filter?.querySelector("feDisplacementMap");
    const frost = filter?.querySelector('feGaussianBlur[result="frost"]');
    const image = document.getElementById(`${NAV_LENS_ID}-map`);
    if (!displace || !frost || !image) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* The island's settled size follows from the CSS (insets of 0.75rem or
       the centered 74rem, height 3.5rem), so it is computed from the sticky
       header rather than measured from a box that is mid-morph. */
    const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const islandWidth = () => {
      const box = el.parentElement?.clientWidth ?? window.innerWidth;
      return Math.round(Math.min(box - 1.5 * rem(), 74 * rem()));
    };
    const islandHeight = () => Math.round(3.5 * rem());
    let lastWidth = 0;
    const drawMap = () => {
      if (el.dataset.open === "true") return; // the map only fits a capsule
      lastWidth = islandWidth();
      image.setAttribute("href", pillMap(lastWidth, islandHeight()));
    };

    let cur = { s: 0, b: BLUR_ATTACHED };
    const setFilter = (s: number, b: number) => {
      cur = { s, b };
      displace.setAttribute("scale", String(s));
      frost.setAttribute("stdDeviation", String(post(b)));
    };
    let raf = 0;
    const ramp = (s1: number, b1: number, done?: () => void) => {
      cancelAnimationFrame(raf);
      const { s: s0, b: b0 } = cur;
      if (reduced || (s0 === s1 && b0 === b1)) {
        setFilter(s1, b1);
        done?.();
        return;
      }
      const t0 = performance.now();
      const step = (now: number) => {
        const p = spring(Math.min(1, (now - t0) / DURATION));
        setFilter(s0 + (s1 - s0) * p, b0 + (b1 - b0) * p);
        if (now - t0 < DURATION) {
          raf = requestAnimationFrame(step);
        } else {
          setFilter(s1, b1);
          done?.();
        }
      };
      raf = requestAnimationFrame(step);
    };

    const enter = () => {
      if (el.dataset.open === "true") return;
      if (el.dataset.lens !== "on") {
        drawMap();
        setFilter(0, BLUR_ATTACHED);
        el.dataset.lens = "on";
      }
      ramp(SCALE, BLUR);
    };
    const leave = () => {
      ramp(0, BLUR_ATTACHED, () => {
        delete el.dataset.lens;
      });
    };

    // The first map is drawn while the page is idle, so the first detach
    // does not pay for it in the middle of the morph.
    const idle = window.requestIdleCallback ?? ((f: () => void) => window.setTimeout(f, 0));
    const idleHandle = idle(() => pillMap(islandWidth(), islandHeight()));

    // Driven by the scroll store, in the same task it flips data-detached:
    // subscribe() measures once on the spot, so a page that loads already
    // scrolled enters immediately.
    const unsubscribe = subscribe(() => (getSnapshot() ? enter() : leave()));

    // Closing the mobile menu while the page sits detached re-enters the lens,
    // which the scroll store alone would not know to do.
    const menu = new MutationObserver(() => {
      if (el.dataset.open !== "true" && getSnapshot()) enter();
    });
    menu.observe(el, { attributes: true, attributeFilter: ["data-open"] });

    // The island's width follows the header's, which also changes when a
    // scrollbar appears or the browser zooms; only a settled, changed width
    // redraws.
    let timer = 0;
    const resize = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (el.dataset.lens === "on" && islandWidth() !== lastWidth) drawMap();
      }, 120);
    });
    if (el.parentElement) resize.observe(el.parentElement);

    return () => {
      unsubscribe();
      menu.disconnect();
      resize.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      if (typeof idleHandle === "number" && window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
      delete el.dataset.lens;
    };
  }, [shell]);

  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <filter
          id={NAV_LENS_ID}
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage id={`${NAV_LENS_ID}-map`} preserveAspectRatio="none" result="map" />
          <feGaussianBlur in="SourceGraphic" stdDeviation={PRE} result="soft0" />
          <feComponentTransfer in="soft0" result="soft">
            <feFuncA type="table" tableValues="1 1" />
          </feComponentTransfer>
          <feDisplacementMap
            in="soft"
            in2="map"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            result="lensed"
          />
          <feGaussianBlur in="lensed" stdDeviation={post(BLUR_ATTACHED)} result="frost" />
          <feComponentTransfer in="frost">
            <feFuncA type="table" tableValues="1 1" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
