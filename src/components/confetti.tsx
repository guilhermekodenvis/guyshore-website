"use client";

import { useEffect, useRef } from "react";

/**
 * A single fall of monochrome confetti over the element that contains it.
 *
 * It fires once per page view, the first time at least a third of the parent
 * is on screen, and then never again until the page is reloaded. "Once" is
 * deliberately not remembered across visits: that would need localStorage,
 * and the only device storage the privacy policy allows is the entry that
 * remembers the visitor's cookie choice.
 *
 * Canvas and refs only, no React state, so the effect never calls setState
 * (`react-hooks/set-state-in-effect` is an error in this repo). Visitors who
 * ask for reduced motion get nothing at all rather than a frozen frame.
 *
 * The parent must be `relative`, and its content should sit above this in the
 * stacking order so the paper falls behind the text, not over it.
 */

/** Paper and four greys, all of them readable against `ink`. */
const COLORS = ["#ffffff", "#e4e4e7", "#d4d4d8", "#a1a1aa", "#71717a"];

const PIECES = 140;
/** How long new pieces keep being released from the top edge, in ms. */
const RELEASE_MS = 1100;
/** Hard stop, in case a piece gets stuck drifting sideways. */
const MAX_MS = 6500;

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  angle: number;
  spin: number;
  flip: number;
  flipSpeed: number;
  sway: number;
  swaySpeed: number;
  delay: number;
  color: string;
  round: boolean;
};

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let cancelled = false;

    const run = () => {
      const { width, height } = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const random = (min: number, max: number) =>
        min + Math.random() * (max - min);

      const pieces: Piece[] = Array.from({ length: PIECES }, () => ({
        x: random(0, width),
        y: random(-40, -10),
        vx: random(-0.6, 0.6),
        vy: random(1.6, 3.4),
        w: random(6, 11),
        h: random(9, 16),
        angle: random(0, Math.PI * 2),
        spin: random(-0.08, 0.08),
        flip: random(0, Math.PI * 2),
        flipSpeed: random(0.06, 0.16),
        sway: random(0, Math.PI * 2),
        swaySpeed: random(0.02, 0.05),
        delay: random(0, RELEASE_MS),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        round: Math.random() < 0.22,
      }));

      const start = performance.now();
      let last = start;

      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        // Normalise to a 60fps step so a 120Hz screen does not fall twice as
        // fast, and clamp it so a backgrounded tab does not teleport pieces.
        const step = Math.min((now - last) / (1000 / 60), 3);
        last = now;

        context.clearRect(0, 0, width, height);
        let alive = 0;

        for (const piece of pieces) {
          if (elapsed < piece.delay) {
            alive++;
            continue;
          }

          piece.sway += piece.swaySpeed * step;
          piece.vy = Math.min(piece.vy + 0.035 * step, 5.2);
          piece.x += (piece.vx + Math.sin(piece.sway) * 0.9) * step;
          piece.y += piece.vy * step;
          piece.angle += piece.spin * step;
          piece.flip += piece.flipSpeed * step;

          if (piece.y > height + 20) continue;
          alive++;

          // Fade out over the last stretch of the fall rather than popping.
          const fade = Math.min(1, Math.max(0, (height + 20 - piece.y) / 120));
          context.globalAlpha = fade;
          context.fillStyle = piece.color;
          context.save();
          context.translate(piece.x, piece.y);
          context.rotate(piece.angle);
          // Squashing one axis by cos() reads as the paper turning over.
          context.scale(1, Math.cos(piece.flip));
          if (piece.round) {
            context.beginPath();
            context.arc(0, 0, piece.w / 2.4, 0, Math.PI * 2);
            context.fill();
          } else {
            context.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
          }
          context.restore();
        }

        context.globalAlpha = 1;

        if (alive > 0 && elapsed < MAX_MS) {
          frame = requestAnimationFrame(tick);
        } else {
          context.clearRect(0, 0, width, height);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.35 },
    );
    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
