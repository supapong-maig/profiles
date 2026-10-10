import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tags } from "@/components/Tags";
import { formatRange, getProject, projects } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  return { title: p?.title, description: p?.summary };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return (
    <article style={{ "--tone": "var(--c-orange)" } as React.CSSProperties}>
      <p className="crumbs">
        <Link href="/projects/">← ผลงานทั้งหมด</Link>
      </p>
      <div className="page-intro">
        <h1>{p.title}</h1>
        <p className="lead">{p.summary}</p>
      </div>
      <dl className="facts">
        <div>
          <dt>ช่วงเวลา</dt>
          <dd>{formatRange(p.start, p.end)}</dd>
        </div>
        <div>
          <dt>บทบาท</dt>
          <dd>
            {p.role} · ทีม {p.teamSize} คน
          </dd>
        </div>
        <div>
          <dt>ประเภท</dt>
          <dd>{p.type}</dd>
        </div>
        {p.links.length > 0 && (
          <div>
            <dt>ลิงก์</dt>
            <dd>
              {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-link">
                  {l.label}
                </a>
              ))}
            </dd>
          </div>
        )}
      </dl>
      <Tags items={p.tags} />
      <section className="block prose">
        <h2>ปัญหา</h2>
        <p>{p.problem}</p>
        <h2>สิ่งที่ทำ</h2>
        <ul>
          {p.actions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <h2>ผลลัพธ์</h2>
        <ul>
          {p.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <h2>สิ่งที่ได้เรียนรู้</h2>
        <p>{p.lessons}</p>
      </section>
    </article>
  );
}
