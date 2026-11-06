"use client";

import { useEffect, type RefObject } from "react";
import { navLensSupported } from "@/components/nav-lens";

/**
 * The refracting rim for a glass card: the header island's lens
 * (nav-lens.tsx) drawn for a rounded rectangle instead of a capsule. Used by
 * the cookie banner.
 *
 * A card does not morph, so there is no ramp: once the map is drawn at the
 * card's size the attribute goes on, and the CSS swaps the plain blur for
 * `url(#id)`. The map is redrawn only when the card's size changes. The gate
 * is the header's (Chromium brand plus a fine pointer): Safari and Firefox
 * parse url() as valid and then paint no backdrop at all, and phones keep
 * the plain blur.
 *
 * The total blur is the card's --consent-blur, read from the CSS so the
 * fallback and the lens cannot drift apart.
 */

/* In CSS px. BAND is the rim band, STRENGTH the peak displacement, EDGE_MIN
   the share kept on the straight edges (the corners bend the most),
   DIRECTION -1 samples inward, like a thick glass edge. */
const BAND = 16;
const STRENGTH = 18;
const EDGE_MIN = 0.7;
const DIRECTION = -1;
const DPR = 2;
const SCALE = 2 * STRENGTH; // feDisplacementMap: displacement = scale * (channel - 0.5)

function roundedRectMap(w: number, h: number, radius: number): string {
  const W = Math.round(w * DPR);
  const H = Math.round(h * DPR);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(W, H);
  // The radius must cover the band, or points deeper than the corner arc
  // would read as sitting on the rim.
  const r = Math.max(radius, BAND);
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const x = (px + 0.5) / DPR;
      const y = (py + 0.5) / DPR;
      // Closest point on the inner rectangle (the card shrunk by its radius)
      // gives the outward normal, as the medial segment does for a capsule.
      const qx = Math.min(Math.max(x, r), w - r);
      const qy = Math.min(Math.max(y, r), h - r);
      const vx = x - qx;
      const vy = y - qy;
      const dist = Math.hypot(vx, vy);
      let dx = 0;
      let dy = 0;
      if (dist > 0) {
        const nx = vx / dist;
        const ny = vy / dist;
        const sd = r - dist; // distance to the edge, positive inside
        // 1 at the middle of a corner arc, 0 where it meets a straight edge,
        // so the weight is continuous around the whole rim.
        const k = 2 * Math.abs(nx * ny);
        const amp = STRENGTH * (EDGE_MIN + (1 - EDGE_MIN) * k);
        if (sd < BAND && sd > -1) {
          const t = Math.min(1, Math.max(0, 1 - sd / BAND));
          const m = Math.pow(4 * t * (1 - t), 1.2) * amp * DIRECTION;
          dx = nx * m;
          dy = ny * m;
        }
      }
      const i = (py * W + px) * 4;
      img.data[i] = Math.round((0.5 + dx / SCALE) * 255);
      img.data[i + 1] = Math.round((0.5 + dy / SCALE) * 255);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

export function GlassCardLens({
  cardRef,
  id,
}: {
  cardRef: RefObject<HTMLElement | null>;
  id: string;
}) {
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !navLensSupported()) return;
    const filter = document.getElementById(id);
    const displace = filter?.querySelector("feDisplacementMap");
    const soft = filter?.querySelector('feGaussianBlur[result="soft0"]');
    const frost = filter?.querySelector('feGaussianBlur[result="frost"]');
    const image = document.getElementById(`${id}-map`);
    if (!displace || !soft || !frost || !image) return;

    // A settle blur before the displacement (so displaced samples do not
    // alias) and a frost blur after it; they add in quadrature to the total.
    const total = parseFloat(getComputedStyle(el).getPropertyValue("--consent-blur")) || 6;
    const settle = Math.min(3, 0.75 * total);
    soft.setAttribute("stdDeviation", String(settle));
    frost.setAttribute("stdDeviation", String(Math.sqrt(Math.max(0, total * total - settle * settle))));
    displace.setAttribute("scale", String(SCALE));

    let last = "";
    const draw = () => {
      const box = el.getBoundingClientRect();
      const w = Math.round(box.width);
      const h = Math.round(box.height);
      if (!w || !h || `${w}x${h}` === last) return;
      last = `${w}x${h}`;
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 24;
      image.setAttribute("href", roundedRectMap(w, h, radius));
      el.dataset.lens = "on";
    };
    draw();
    const resize = new ResizeObserver(draw);
    resize.observe(el);

    return () => {
      resize.disconnect();
      delete el.dataset.lens;
    };
  }, [cardRef, id]);

  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage id={`${id}-map`} preserveAspectRatio="none" result="map" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="soft0" />
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
          <feGaussianBlur in="lensed" stdDeviation="5" result="frost" />
          <feComponentTransfer in="frost">
            <feFuncA type="table" tableValues="1 1" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
