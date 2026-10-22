import Link from "next/link";
import { profile } from "@/lib/data";
import { localePath, ui, type Locale } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";

export function SiteHeader({ locale }: { locale: Locale }) {
  const home = localePath("/", locale);
  const n = ui[locale].nav;
  const nav = [
    { id: "focus", label: n.focus },
    { id: "experience", label: n.experience },
    { id: "projects", label: n.projects },
    { id: "stack", label: n.stack },
    { id: "contact", label: n.contact },
  ];
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href={home} className="brand">
          <span className="brand__mark" aria-hidden="true">
            SN
          </span>
          <span>{profile.name}</span>
        </Link>
        <div className="site-header__end">
          <nav aria-label={ui[locale].tocLabel} className="site-nav">
            {nav.map((i) => (
              <Link key={i.id} href={`${home}#${i.id}`}>
                {i.label}
              </Link>
            ))}
          </nav>
          <LangToggle locale={locale} label={ui[locale].langLabel} />
        </div>
      </div>
    </header>
  );
}
