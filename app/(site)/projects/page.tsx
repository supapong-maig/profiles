import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Tags } from "@/components/Tags";
import { formatRange, projects } from "@/lib/data";
import { sectionFor } from "@/lib/sections";

const section = sectionFor("/projects/");
export const metadata: Metadata = { title: section.label };

export default function ProjectsPage() {
  return (
    <>
      <PageIntro section={section} />
      <div className="grid grid--2">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}/`} className="group-card" style={{ "--tone": `var(--c-${section.tone})` } as React.CSSProperties}>
            <p className="small muted">
              {formatRange(p.start, p.end)} · {p.type}
            </p>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <p className="small muted">บทบาท: {p.role}</p>
            <Tags items={p.tags} />
          </Link>
        ))}
      </div>
    </>
  );
}
