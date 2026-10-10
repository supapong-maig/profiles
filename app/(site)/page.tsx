import Link from "next/link";
import { SectionWheel } from "@/components/SectionWheel";
import { Tags } from "@/components/Tags";
import { changelog, experience, featuredProjects, formatDate, formatRange, interests, profile, services } from "@/lib/data";
import { sectionFor } from "@/lib/sections";

const audienceTone = { employers: "red", collaborators: "purple", projects: "orange" } as const;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">{profile.headline}</p>
          <h1>
            สวัสดีครับ ผม {profile.name}
            <span className="muted-strong">{profile.tagline}</span>
          </h1>
          <p className="lead">{profile.summary}</p>
          <p className="meta-line">
            📍 {profile.location} · 💼 {profile.availability} · 🌐 {profile.languages.join(", ")}
          </p>
          <div className="actions">
            <Link href="/help/" className="btn btn--primary">
              ดูว่าผมช่วยอะไรได้ →
            </Link>
            <Link href="/projects/" className="btn">
              ดูผลงาน
            </Link>
          </div>
        </div>
        <div className="hero__visual">
          <SectionWheel />
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">ตอนนี้คุณกำลังมองหาอะไร?</h2>
        <ul className="prompts">
          {services.audiences.map((a) => (
            <li key={a.id} style={{ "--tone": `var(--c-${audienceTone[a.id]})` } as React.CSSProperties}>
              <span className="dot" aria-hidden="true" />
              <div>
                <strong>{a.question}</strong>
                <Link href={`/help/#${a.id}`}>→ {a.title}</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <div className="card__head">
          <h2 className="card__title">อัปเดตล่าสุด</h2>
          <Link href="/updates/">ดูทั้งหมด →</Link>
        </div>
        <ul className="changelog changelog--compact">
          {changelog.slice(0, 3).map((c) => (
            <li key={`${c.date}-${c.title}`}>
              <time dateTime={c.date}>{formatDate(c.date)}</time>
              <span>{c.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>ผลงานเด่น</h2>
        <ul className="highlights">
          {profile.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>สรุปทุกหัวข้อ</h2>
        <p className="muted">เลือกอ่านเฉพาะส่วนที่คุณสนใจ</p>
        <div className="grid grid--3">
          <SummaryCard href="/experience/" items={experience.slice(0, 3).map((e) => `${e.role} · ${e.company}`)} foot={experience[0] && formatRange(experience[0].start, experience[0].end)} />
          <SummaryCard href="/projects/" items={featuredProjects.map((p) => p.title)} />
          <SummaryCard href="/interests/" items={interests.now.map((i) => i.topic)} />
        </div>
      </section>
    </>
  );
}

function SummaryCard({ href, items, foot }: { href: string; items: string[]; foot?: string }) {
  const s = sectionFor(href);
  return (
    <Link href={href} className="group-card" style={{ "--tone": `var(--c-${s.tone})` } as React.CSSProperties}>
      <h3>{s.label}</h3>
      <p className="muted">{s.lead}</p>
      <Tags items={items} />
      {foot && <p className="small muted">ล่าสุด: {foot}</p>}
    </Link>
  );
}
