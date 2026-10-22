import Link from "next/link";
import { profile } from "@/lib/data";
import { localePath, ui, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="site-footer__links">
          <Link href={localePath("/updates/", locale)}>{ui[locale].footer.updates}</Link>
          <Link href={localePath("/architecture/", locale)}>{ui[locale].footer.about}</Link>
        </span>
      </div>
    </footer>
  );
}
