export function Chips({ items, label }: { items: string[]; label?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className="chips" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}
