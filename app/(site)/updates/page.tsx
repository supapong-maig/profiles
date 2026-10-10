import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { changelog, formatDate } from "@/lib/data";

export const metadata: Metadata = { title: "ประวัติการอัปเดต" };

export default function UpdatesPage() {
  return (
    <>
      <PageIntro title="ประวัติการอัปเดต" lead="สิ่งที่เปลี่ยนในเว็บนี้ เรียงจากใหม่ไปเก่า" />
      <ul className="changelog">
        {changelog.map((c) => (
          <li key={`${c.date}-${c.title}`}>
            <time dateTime={c.date}>{formatDate(c.date)}</time>
            <div>
              <strong>{c.title}</strong>
              {c.detail && <p className="muted">{c.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
