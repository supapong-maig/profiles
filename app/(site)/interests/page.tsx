import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { interestStatusLabel, interests } from "@/lib/data";
import { sectionFor } from "@/lib/sections";

const section = sectionFor("/interests/");
export const metadata: Metadata = { title: section.label };

export default function InterestsPage() {
  return (
    <div style={{ "--tone": `var(--c-${section.tone})` } as React.CSSProperties}>
      <PageIntro section={section} lead="สิ่งที่ผมกำลังเรียนรู้และอยากคุยด้วย ถ้าคุณสนใจเรื่องเดียวกัน ทักมาคุยกันได้เลย" />
      <section className="block">
        <h2>กำลังสนใจตอนนี้</h2>
        <div className="grid grid--2">
          {interests.now.map((i) => (
            <div key={i.topic} className="group-card">
              <p className="small">{interestStatusLabel[i.status]}</p>
              <h3>{i.topic}</h3>
              <dl className="defs defs--stack">
                <div>
                  <dt>ทำไมถึงสนใจ</dt>
                  <dd>{i.why}</dd>
                </div>
                <div>
                  <dt>กำลังทำอะไรอยู่</dt>
                  <dd>{i.doing}</dd>
                </div>
                {i.collaborate && (
                  <div>
                    <dt>อยากร่วมมือกับ</dt>
                    <dd>{i.collaborate}</dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      </section>
      <section className="block">
        <h2>กำลังอ่าน / ฟัง</h2>
        <ul className="plain-list">
          {interests.reading.map((r) => (
            <li key={r.title}>
              <span className="tag">{r.kind}</span> {r.title}
              {r.by && <span className="muted"> — {r.by}</span>}
            </li>
          ))}
        </ul>
      </section>
      <section className="block">
        <h2>เคยสนใจ</h2>
        <dl className="defs">
          {interests.archive.map((a) => (
            <div key={a.topic}>
              <dt>{a.topic}</dt>
              <dd>{a.learned}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
