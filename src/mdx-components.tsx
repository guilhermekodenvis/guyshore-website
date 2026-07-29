import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Global component map for every MDX file. Prose styling lives in the
// `.prose` rules in globals.css; this map only handles behavior that CSS
// can't cover, like routing internal links through <Link>.
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    );
  },
  // Wide tables scroll inside their own box instead of widening the page.
  table: (props) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
