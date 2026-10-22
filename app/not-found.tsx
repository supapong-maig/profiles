import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { ui } from "@/lib/i18n";

export default function NotFound() {
  const s = ui.en.notFound;
  return (
    <SiteShell locale="en">
      <div className="shell narrow page-intro">
        <h1>{s.title}</h1>
        <p className="lede">
          <Link href="/">{s.back}</Link>
        </p>
      </div>
    </SiteShell>
  );
}
