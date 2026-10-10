import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { profile } from "@/lib/data";
import { sectionFor } from "@/lib/sections";

const section = sectionFor("/about/");
export const metadata: Metadata = { title: section.label };

export default function AboutPage() {
  return (
    <>
      <PageIntro section={section} />
      <section className="block prose">
        <h2>เรื่องราวโดยย่อ</h2>
        {profile.story.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>
      <section className="block">
        <h2>สิ่งที่ผมให้ความสำคัญ</h2>
        <div className="grid grid--3">
          {profile.values.map((v) => (
            <div key={v.title} className="tile">
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="block">
        <h2>สไตล์การทำงาน</h2>
        <dl className="defs">
          {profile.workStyle.map((w) => (
            <div key={w.label}>
              <dt>{w.label}</dt>
              <dd>{w.desc}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="block prose">
        <h2>นอกเวลางาน</h2>
        <p>{profile.beyondWork}</p>
      </section>
    </>
  );
}
