import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { PostButton } from "@/components/post-button";
import { PostCta } from "@/components/post-cta";
import { PostFaq } from "@/components/post-faq";
import { PostImage } from "@/components/post-image";
import type { ComponentProps } from "react";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";

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
  PostButton,
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

/**
 * Overrides the post template passes to a post in `lang`. A Portuguese post
 * writes internal links the same way an English one does (`/services/...`),
 * and they resolve to the Portuguese pages. A link to a specific post
 * (`/blog/<slug>`) is kept as written, because posts are not all translated
 * and the author chose that article.
 */
export function postComponents(lang: Locale): MDXComponents {
  if (lang === "en") return {};
  const localize = (href: string) =>
    href.startsWith("/") &&
    !href.startsWith("/pt/") &&
    href !== "/pt" &&
    !href.startsWith("/blog/")
      ? localePath(lang, href)
      : href;

  return {
    a: ({ href = "", children, ...props }) =>
      href.startsWith("/") || href.startsWith("#") ? (
        <Link href={localize(href)} {...props}>
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
          {children}
        </a>
      ),
    PostButton: (props: ComponentProps<typeof PostButton>) => (
      <PostButton {...props} href={localize(props.href)} />
    ),
    PostCta: (props: ComponentProps<typeof PostCta>) => (
      <PostCta newTab={getDictionary(lang).common.opensNewTab} {...props} />
    ),
  };
}
