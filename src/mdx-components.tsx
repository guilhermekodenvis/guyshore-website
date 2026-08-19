import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { PostCta } from "@/components/post-cta";
import { PostFaq } from "@/components/post-faq";
import { PostImage } from "@/components/post-image";

// Global component map for every MDX file. Prose styling lives in the
// `.prose` rules in globals.css; this map only handles behavior that CSS
// can't cover, like routing internal links through <Link>.
//
// PostCta, PostFaq and PostImage are exposed here so a post can use them as
// plain tags with no import line. They are the only rich blocks a post may
// use; everything else should stay Markdown.
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
  PostCta,
  PostFaq,
  PostImage,
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
