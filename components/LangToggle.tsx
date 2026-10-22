"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, locales, splitLocale, type Locale } from "@/lib/i18n";

/** EN / TH switch that keeps the reader on the same page in the other language. */
export function LangToggle({ locale, label }: { locale: Locale; label: string }) {
  const { path } = splitLocale(usePathname() ?? "/");
  return (
    <div className="lang" role="group" aria-label={label}>
      {locales.map((l) => (
        <Link key={l} href={localePath(path, l)} hrefLang={l} lang={l} aria-current={l === locale ? "true" : undefined}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
