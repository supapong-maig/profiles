import Link from "next/link";
import { profile } from "@/lib/data";

const nav = [
  { href: "/#focus", label: "ความสนใจ" },
  { href: "/#experience", label: "ประสบการณ์" },
  { href: "/#projects", label: "ผลงาน" },
  { href: "/#stack", label: "เทคโนโลยี" },
  { href: "/#contact", label: "ติดต่อ" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="brand">
          <span className="brand__mark" aria-hidden="true">SN</span>
          <span>{profile.name}</span>
        </Link>
        <nav aria-label="เมนูหลัก" className="site-nav">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
