import type { Metadata } from "next";
import { Host_Grotesk, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ConsentBanner } from "@/components/consent-banner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GOOGLE_ADS_ID } from "@/lib/consent";
import { getDictionary } from "@/lib/dictionary";
import { htmlLang, locales, ogLocale, resolveLang } from "@/lib/i18n";
import { postAlternates } from "@/lib/posts";
import { getHomeServices } from "@/lib/services";
import { site } from "@/lib/site";
import "../globals.css";

// Loaded through next/font rather than a <link> to Google: self-hosted, no
// third-party request, and no layout shift from a late swap.
const hostGrotesk = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

type Props = { params: Promise<{ lang: string }> };

/** Both languages are prerendered. English is served without a prefix. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).site;
  const image = { url: "/og-image.png", width: 1200, height: 630, alt: t.ogAlt };

  return {
    metadataBase: new URL(site.url),
    title: { default: t.title, template: `%s · ${site.name}` },
    description: t.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[lang],
      url: site.url,
      title: t.title,
      description: t.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [image],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  // What the header needs to render the services menu and to send the
  // language switch to the right page.
  const services = getHomeServices(lang).map(({ slug, title }) => ({ slug, title }));
  const posts = await postAlternates();

  return (
    <html
      lang={htmlLang[lang]}
      className={`${hostGrotesk.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/* The Google tag, in the head of every page so Google Ads can detect
            it. Consent starts denied unless the visitor already accepted
            (Consent Mode v2, advanced); the banner grants it. See consent.ts. */}
        <Script id="google-tag-consent" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var granted = false;
try {
  var saved = JSON.parse(localStorage.getItem("guyshore-consent") || "null");
  granted = !!saved && saved.v === 1 && saved.choice === "granted" && Date.now() - Date.parse(saved.at) < 395 * 864e5;
} catch (e) {}
var state = granted ? "granted" : "denied";
gtag("consent", "default", { ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: "denied" });
gtag("js", new Date());
gtag("config", "${GOOGLE_ADS_ID}");`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="beforeInteractive"
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {t.common.skipToContent}
        </a>
        <SiteHeader lang={lang} services={services} posts={posts} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} />
        {/* The cookie banner. Last in the body so it paints above the page. */}
        <ConsentBanner lang={lang} />
      </body>
    </html>
  );
}
