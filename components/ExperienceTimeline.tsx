"use client";

import { useState } from "react";
import { Chips } from "./Chips";

export type TimelineItem = {
  id: string;
  kind: "work" | "education";
  startYear: string;
  period: string;
  role: string;
  company: string;
  unit: string;
  areas: string[];
  highlight: boolean;
  summary: string;
  groups: { title: string; items: string[] }[];
  tech: string[];
};

export type TimelineLabels = {
  filterLabel: string;
  all: string;
  present: string;
  start: string;
  highlight: string;
  education: string;
  tech: string;
};

/** Experience as a vertical flow rail, filterable by area. Receives text already in the page's language. */
export function ExperienceTimeline({ items, areas, labels }: { items: TimelineItem[]; areas: { id: string; label: string }[]; labels: TimelineLabels }) {
  const [area, setArea] = useState<string | null>(null);
  const shown = area ? items.filter((e) => e.areas.includes(area)) : items;
  const used = areas.filter((a) => items.some((e) => e.areas.includes(a.id)));

  return (
    <>
      <div className="filter" role="group" aria-label={labels.filterLabel}>
        <button type="button" aria-pressed={area === null} onClick={() => setArea(null)}>
          {labels.all}
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
          <span className="pill">{labels.present}</span>
        </div>
        {shown.map((e) =>
          e.kind === "education" ? (
            <div key={e.id} id={`t-${e.id}`} className="step step--edu">
              <span className="node node--edu" aria-hidden="true">
                🎓
              </span>
              <div className="step-body">
                <div className="eyebrow">
                  {e.period} · {labels.education}
                </div>
                <h3>
                  {e.role}{" "}
                  <span className="sub">
                    {e.company} · {e.unit}
                  </span>
                </h3>
              </div>
            </div>
          ) : (
            <article key={e.id} id={`t-${e.id}`} className="step">
              <span className="node" aria-hidden="true">
                {e.startYear.slice(2, 4)}
              </span>
              <div className="step-body">
                <div className="eyebrow">
                  {e.period}
                  {e.highlight && <span className="badge">{labels.highlight}</span>}
                </div>
                <h3>
                  {e.role}{" "}
                  <span className="sub">
                    {e.company} · {e.unit}
                  </span>
                </h3>
                <p className="step-summary">{e.summary}</p>
                {e.groups.map((g, gi) => (
                  <div key={gi} className="group">
                    {g.title && <h4>{g.title}</h4>}
                    <ul>
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Chips items={e.tech} label={labels.tech} />
              </div>
            </article>
          ),
        )}
        <div className="term end">
          <span className="dot" />
          <span className="pill">{labels.start}</span>
        </div>
      </div>
    </>
  );
}
