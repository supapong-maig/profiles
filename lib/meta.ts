import type { Metadata } from "next";
import { profile } from "./data";
import { localePath, t, type Locale } from "./i18n";

const siteTitle = `${profile.name} — ${profile.headline}`;

/** Page metadata: share card for LinkedIn / chat apps, and links to the same page in both languages. */
export function pageMeta(path: string, locale: Locale, title?: string): Metadata {
  const description = t(profile.share.description, locale);
  const url = localePath(path, locale);
  const image = {
    url: profile.share.image.src,
    width: profile.share.image.width,
    height: profile.share.image.height,
    alt: `${profile.name} — ${profile.focusLine}`,
  };
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: { en: localePath(path, "en"), th: localePath(path, "th") },
    },
    openGraph: {
      type: "profile",
      siteName: profile.name,
      title: title ? `${title} · ${profile.name}` : siteTitle,
      description,
      url,
      locale: locale === "en" ? "en_US" : "th_TH",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: title ? `${title} · ${profile.name}` : siteTitle, description, images: [image.url] },
  };
}
