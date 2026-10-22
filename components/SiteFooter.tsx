import Link from "next/link";
import { profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="site-footer__links">
          <Link href="/updates/">ประวัติการอัปเดต</Link>
          <Link href="/architecture/">เกี่ยวกับเว็บนี้</Link>
        </span>
      </div>
    </footer>
  );
}
