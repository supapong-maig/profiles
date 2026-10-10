import Link from "next/link";
import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__contacts">
          {profile.contacts.map((c) => (
            <a key={c.label} href={c.url} target={c.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {c.label}
            </a>
          ))}
        </div>
        <div className="site-footer__meta">
          <Link href="/updates/">ประวัติการอัปเดต</Link>
          <span aria-hidden="true">·</span>
          <Link href="/architecture/">เกี่ยวกับเว็บนี้</Link>
        </div>
      </div>
    </footer>
  );
}
