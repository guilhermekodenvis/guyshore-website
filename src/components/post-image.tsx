import Image from "next/image";

/**
 * A figure inside an article.
 *
 * `sizes` carries an explicit pixel width rather than `68ch`. In `sizes` the
 * browser resolves `ch` against the ROOT font, not the prose font, so the
 * number would not be the column width. The prose column caps at 68ch, which
 * is about 800px.
 *
 * `width`/`height` are the intrinsic pixel size of the file. They set the
 * aspect ratio so the browser reserves the space before the image loads,
 * which is what keeps the article from jumping as you read it. Do not replace
 * them with `w-auto`/`h-auto`: on a replaced element that has not loaded,
 * `width: auto` computes to 0 and the lazy-load observer never fires.
 */
export function PostImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  priority = false,
}: {
  src: string;
  /** Describe what the image shows. Never leave this empty on a content image. */
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  /** Set on the first image of a post, which is usually above the fold. */
  priority?: boolean;
}) {
  return (
    <figure className="post-figure">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 800px, 100vw"
        className="w-full rounded-[2px] border border-[var(--color-line)]"
      />
      {caption ? (
        <figcaption className="mt-4 font-body text-[0.9375rem] text-slate">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
