import { FaqList, type FaqItem } from "@/components/faq-list";

/**
 * The FAQ block inside an article.
 *
 * Reuses the site-wide `FaqList` so there is one accordion implementation,
 * and wraps it in a hook class. The `.prose` rules style every descendant
 * `h3`, which would push the accordion rows apart; `.post-faq` in globals.css
 * neutralizes that without weakening the prose rules themselves.
 */
export function PostFaq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="post-faq">
      <FaqList items={items} />
    </div>
  );
}
