import data from "./partners.json";

/**
 * Companies we work alongside. Their logo links back to their own site.
 *
 * ADDING, REMOVING OR REORDERING A PARTNER IS A `partners.json` EDIT AND
 * NOTHING ELSE. This file only types that data and hands it to the row; the
 * row reads the array in order, so the JSON is also the display order.
 *
 * Every field is required, and TypeScript checks the JSON against `Partner`
 * at build time, so a missing key or a quoted number fails `next build`
 * rather than rendering a broken row.
 *
 * The one thing the type cannot check is that `logo` points at a file that
 * exists. Removing a partner means deleting `public/partners/<name>.png` in
 * the same pass, and adding one means putting the file there first.
 *
 * The files in `public/partners/` are pre-processed, not the partners' own
 * artwork: each is flattened to a single grey (`--color-slate`) with the
 * original alpha preserved, then scaled so every logo carries the same
 * optical area. Normalizing by height alone would let a wide lock-up
 * dominate the row; normalising by width would bury it. `width` and `height`
 * below are the 1x CSS box, and each file ships at 3x that.
 */

export type Partner = {
  name: string;
  href: string;
  /** Path under `public`, so it starts with a slash. */
  logo: string;
  /** The 1x CSS box. The file itself is 3x these numbers. */
  width: number;
  height: number;
};

export const partners: Partner[] = data;
