import type { Locale } from "@/lib/i18n";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Header, main and footer for one locale. `lang` on the wrapper marks Thai pages for browsers and screen readers. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <div lang={locale} className="site">
      <SiteHeader locale={locale} />
      <main className="main">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
