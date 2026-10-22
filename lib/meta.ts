import type { Metadata } from "next";
import { profile } from "./data";
import { localePath, type Locale } from "./i18n";

const description = {
  en: profile.summary.map((s) => s.en).join(". ") + ".",
  th: profile.summary.map((s) => s.th).join(" "),
};

/** Page metadata with links to the same page in both languages. */
export function pageMeta(path: string, locale: Locale, title?: string): Metadata {
  return {
    ...(title ? { title } : {}),
    description: description[locale],
    alternates: {
      languages: { en: localePath(path, "en"), th: localePath(path, "th") },
    },
    openGraph: { locale: locale === "en" ? "en_US" : "th_TH", images: [profile.photo.src] },
  };
}
