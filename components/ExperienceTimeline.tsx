"use client";

import { useState } from "react";
import type { Area, Experience } from "@/lib/data";
import { Chips } from "./Chips";

type Item = Experience & { period: string };

/** Experience as a vertical flow rail, filterable by area. */
export function ExperienceTimeline({ items, areas }: { items: Item[]; areas: Area[] }) {
  const [area, setArea] = useState<string | null>(null);
  const shown = area ? items.filter((e) => e.areas.includes(area)) : items;
  const used = areas.filter((a) => items.some((e) => e.areas.includes(a.id)));

  return (
    <>
      <div className="filter" role="group" aria-label="กรองตามด้าน">
        <button type="button" aria-pressed={area === null} onClick={() => setArea(null)}>
          ทั้งหมด
        </button>
        {used.map((a) => (
          <button key={a.id} type="button" aria-pressed={area === a.id} onClick={() => setArea(a.id)}>
            {a.label}
          </button>
        ))}
      </div>

      <div className="flow">
        <div className="term">
          <span className="dot" />
          <span className="pill">ปัจจุบัน</span>
        </div>
        {shown.map((e) =>
          e.kind === "education" ? (
            <div key={e.id} id={`t-${e.id}`} className="step step--edu">
              <span className="node node--edu" aria-hidden="true">
                🎓
              </span>
              <div className="step-body">
                <div className="eyebrow">{e.period} · การศึกษา</div>
                <h3>
                  {e.role} <span className="sub">{e.company} · {e.unit}</span>
                </h3>
              </div>
            </div>
          ) : (
            <article key={e.id} id={`t-${e.id}`} className="step">
              <span className="node" aria-hidden="true">
                {e.start.slice(2, 4)}
              </span>
              <div className="step-body">
                <div className="eyebrow">
                  {e.period}
                  {e.highlight && <span className="badge">ไฮไลต์</span>}
                </div>
                <h3>
                  {e.role} <span className="sub">{e.company} · {e.unit}</span>
                </h3>
                <p className="step-summary">{e.summary}</p>
                {e.groups.map((g) => (
                  <div key={g.title || e.id} className="group">
                    {g.title && <h4>{g.title}</h4>}
                    <ul>
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Chips items={e.tech} label="เทคโนโลยี" />
              </div>
            </article>
          ),
        )}
        <div className="term end">
          <span className="dot" />
          <span className="pill">เริ่มต้นเส้นทาง</span>
        </div>
      </div>
    </>
  );
}
