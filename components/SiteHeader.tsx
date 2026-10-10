import Link from "next/link";
import { profile } from "@/lib/data";
import { sections } from "@/lib/sections";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand">
          <Logo />
          <span>{profile.name}</span>
        </Link>
        <nav aria-label="เมนูหลัก" className="site-nav">
          {sections.map((s) => (
            <Link key={s.href} href={s.href}>
              {s.short}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
