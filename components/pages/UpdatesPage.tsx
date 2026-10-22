import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { changelog, formatDate } from "@/lib/data";
import { t, ui, type Locale } from "@/lib/i18n";

export function UpdatesPage({ locale }: { locale: Locale }) {
  const s = ui[locale].updates;
  return (
    <SiteShell locale={locale}>
      <div className="shell narrow">
        <PageIntro kicker={s.kicker} title={s.title} lead={s.lede} />
        <ul className="changelog">
          {changelog.map((c) => (
            <li key={`${c.date}-${c.title.en}`}>
              <time dateTime={c.date}>{formatDate(c.date, locale)}</time>
              <div>
                <strong>{t(c.title, locale)}</strong>
                {t(c.detail, locale) && <p className="muted">{t(c.detail, locale)}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
