export function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="tags">
      {items.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}
