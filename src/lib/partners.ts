/**
 * Companies we work alongside. Their logo links back to their own site.
 *
 * The files in `public/partners/` are pre-processed: each one is flattened to
 * a single grey (`--color-slate`) with the original alpha preserved, then
 * scaled so all three carry the same optical area. Normalising by height
 * alone would make the wide lock-up dominate the row; normalising by width
 * would bury it. The sizes below are the 1x CSS box, and each file ships at
 * 3x that.
 */

export type Partner = {
  name: string;
  href: string;
  logo: string;
  width: number;
  height: number;
};

export const partners: Partner[] = [
  {
    name: "Viana Consultancy",
    href: "https://vianaconsultancy.com/",
    logo: "/partners/viana.png",
    width: 90,
    height: 64,
  },
  {
    name: "Alttavia Relocation",
    href: "https://alttavia-relocation.com/",
    logo: "/partners/alttavia.png",
    width: 86,
    height: 68,
  },
  {
    name: "Tiptoe",
    href: "https://tiptoe.me/",
    logo: "/partners/tiptoe.png",
    width: 169,
    height: 34,
  },
];
