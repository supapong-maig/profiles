import { sections } from "@/lib/sections";

/** A small ring split into the six section colours. */
export function Logo({ size = 28 }: { size?: number }) {
  const r = 10;
  const c = 2 * Math.PI * r;
  const seg = c / sections.length;
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      {sections.map((s, i) => (
        <circle
          key={s.href}
          cx="14"
          cy="14"
          r={r}
          fill="none"
          stroke={`var(--c-${s.tone})`}
          strokeWidth="6"
          strokeDasharray={`${seg} ${c - seg}`}
          strokeDashoffset={-i * seg}
          transform="rotate(-90 14 14)"
        />
      ))}
    </svg>
  );
}
