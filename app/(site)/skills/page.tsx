import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Tags } from "@/components/Tags";
import { skills } from "@/lib/data";
import { sectionFor } from "@/lib/sections";

const section = sectionFor("/skills/");
export const metadata: Metadata = { title: section.label };

const levelLabel = { 1: "กำลังเรียนรู้", 2: "ใช้งานได้ดี", 3: "เชี่ยวชาญ" } as const;

export default function SkillsPage() {
  return (
    <div style={{ "--tone": `var(--c-${section.tone})` } as React.CSSProperties}>
      <PageIntro section={section} />
      <section className="block">
        <h2>ทักษะหลัก</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ทักษะ</th>
                <th>ระดับ</th>
                <th>ใช้ในงาน / หลักฐาน</th>
              </tr>
            </thead>
            <tbody>
              {skills.core.map((s) => (
                <tr key={s.name}>
                  <td>{s.name}</td>
                  <td>
                    <span className="meter" aria-label={levelLabel[s.level]} title={levelLabel[s.level]}>
                      {[1, 2, 3].map((n) => (
                        <span key={n} className={n <= s.level ? "on" : undefined} />
                      ))}
                    </span>
                    <span className="small muted"> {levelLabel[s.level]}</span>
                  </td>
                  <td>{s.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="block">
        <h2>เครื่องมือ / เทคโนโลยี</h2>
        <div className="grid grid--3">
          {skills.tools.map((g) => (
            <div key={g.group} className="tile">
              <h3>{g.group}</h3>
              <Tags items={g.items} />
            </div>
          ))}
        </div>
      </section>
      <section className="block">
        <h2>ทักษะด้านคน</h2>
        <dl className="defs">
          {skills.soft.map((s) => (
            <div key={s.name}>
              <dt>{s.name}</dt>
              <dd>{s.desc}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="block">
        <h2>ภาษา</h2>
        <dl className="defs">
          {skills.languages.map((l) => (
            <div key={l.name}>
              <dt>{l.name}</dt>
              <dd>{l.level}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="block">
        <h2>การศึกษา</h2>
        {skills.education.map((e) => (
          <div key={e.degree + e.school} className="tile">
            <h3>{e.degree}</h3>
            <p>
              {e.school} · {e.start}–{e.end}
            </p>
            {e.note && <p className="small muted">{e.note}</p>}
          </div>
        ))}
      </section>
      <section className="block">
        <h2>ใบรับรอง</h2>
        <ul className="plain-list">
          {skills.certifications.map((c) => (
            <li key={c.name}>
              <a href={c.url} target="_blank" rel="noreferrer">
                {c.name}
              </a>{" "}
              <span className="muted">
                — {c.issuer}, {c.year}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
