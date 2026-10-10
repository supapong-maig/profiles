import { sections } from "@/lib/sections";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const R = 180;
const r = 100;
const CX = 200;
const CY = 200;

function point(radius: number, angle: number) {
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)] as const;
}

function arc(a0: number, a1: number) {
  const [x0, y0] = point(R, a0);
  const [x1, y1] = point(R, a1);
  const [x2, y2] = point(r, a1);
  const [x3, y3] = point(r, a0);
  return `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 0 0 ${x3} ${y3} Z`;
}

/** Donut of the six sections; each segment links to its page. */
export function SectionWheel() {
  const step = (2 * Math.PI) / sections.length;
  const start = -Math.PI / 2;
  return (
    <svg className="wheel" viewBox="0 0 400 400" role="img" aria-label="หัวข้อทั้งหมดของเว็บ">
      {sections.map((s, i) => {
        const a0 = start + i * step;
        const a1 = a0 + step;
        const [tx, ty] = point((R + r) / 2, (a0 + a1) / 2);
        return (
          <a key={s.href} href={`${base}${s.href}`} className="wheel__seg">
            <path d={arc(a0, a1)} fill={`var(--c-${s.tone})`} />
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle">
              {s.short}
            </text>
          </a>
        );
      })}
      <text x={CX} y={CY - 10} textAnchor="middle" className="wheel__title">
        อยากรู้เรื่องไหน
      </text>
      <text x={CX} y={CY + 16} textAnchor="middle" className="wheel__hint">
        แตะเพื่อไปหัวข้อนั้น
      </text>
    </svg>
  );
}
