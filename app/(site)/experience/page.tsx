import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Tags } from "@/components/Tags";
import { experience, formatRange } from "@/lib/data";
import { sectionFor } from "@/lib/sections";

const section = sectionFor("/experience/");
export const metadata: Metadata = { title: section.label };

export default function ExperiencePage() {
  return (
    <>
      <PageIntro section={section} />
      <ol className="timeline" style={{ "--tone": `var(--c-${section.tone})` } as React.CSSProperties}>
        {experience.map((e) => (
          <li key={e.id} id={e.id} className="timeline__item">
            <div className="timeline__when">{formatRange(e.start, e.end)}</div>
            <div className="card">
              <h2 className="card__title">
                {e.role} <span className="muted">— {e.company}</span>
              </h2>
              <p className="small muted">
                📍 {e.location} · 🏷️ {e.industry}
              </p>
              <p>{e.context}</p>
              <h3 className="label">ผลงานสำคัญ</h3>
              <ul>
                {e.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <Tags items={e.tools} />
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
