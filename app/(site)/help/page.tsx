import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { profile, services } from "@/lib/data";
import { sectionFor } from "@/lib/sections";

const section = sectionFor("/help/");
export const metadata: Metadata = { title: section.label };

const audienceTone = { employers: "red", collaborators: "purple", projects: "orange" } as const;

export default function HelpPage() {
  return (
    <>
      <PageIntro section={section} />
      <div className="grid grid--3">
        {services.audiences.map((a) => (
          <section key={a.id} id={a.id} className="group-card" style={{ "--tone": `var(--c-${audienceTone[a.id]})` } as React.CSSProperties}>
            <h2>{a.title}</h2>
            <p className="muted">{a.intro}</p>
            <ul>
              {a.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {services.notAFit.length > 0 && (
        <section className="block">
          <h2>สิ่งที่ผมไม่รับ</h2>
          <ul>
            {services.notAFit.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}
      <section className="card" id="contact">
        <h2 className="card__title">เริ่มต้นคุยกัน</h2>
        <p>ส่งข้อความมาหาผม โดยบอกสั้น ๆ ว่า:</p>
        <ol>
          {services.contactSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="actions">
          {profile.contacts.map((c) => (
            <a key={c.label} href={c.url} className="btn" target={c.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {c.label}: {c.display}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
