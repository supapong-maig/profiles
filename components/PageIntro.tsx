export function PageIntro({ title, lead, kicker }: { title: string; lead?: string; kicker?: string }) {
  return (
    <div className="page-intro">
      {kicker && <div className="kicker">{kicker}</div>}
      <h1>{title}</h1>
      {lead && <p className="lede">{lead}</p>}
    </div>
  );
}
