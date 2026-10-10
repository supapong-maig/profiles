import type { Section } from "@/lib/sections";

export function PageIntro({ section, title, lead }: { section?: Section; title?: string; lead?: string }) {
  return (
    <div className="page-intro" style={section ? ({ "--tone": `var(--c-${section.tone})` } as React.CSSProperties) : undefined}>
      <h1>{title ?? section?.label}</h1>
      {(lead ?? section?.lead) && <p className="lead">{lead ?? section?.lead}</p>}
    </div>
  );
}
