import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = { title: "เกี่ยวกับเว็บนี้" };

const stack = [
  ["Framework", "Next.js 16 (App Router) · React 19 · TypeScript", "static export สำหรับ GitHub Pages"],
  ["หน้าตา", "CSS ล้วน + design tokens · Chakra Petch, IBM Plex Sans Thai, IBM Plex Mono", "สีหลักเดียว (amber) รองรับ dark mode ไม่ใช้ UI framework"],
  ["เนื้อหา", "ไฟล์ JSON ใน data/", "แหล่งข้อมูลเดียว แก้ที่เดียวแสดงผลทุกหน้า"],
  ["ทดสอบ", "node:test", "ตรวจความครบและรูปแบบข้อมูลทุกครั้งก่อน deploy"],
  ["CI/CD", "GitHub Actions → GitHub Pages", "push เข้า main = ทดสอบ build และ deploy อัตโนมัติ"],
];

const tree = `app/(site)/        หน้าแรก (หน้าเดียว), updates, architecture
components/        Header, Footer, Rail (สารบัญ), ExperienceTimeline (กรองตามด้าน), Chips
lib/               โหลดข้อมูล + types, สารบัญ
data/              profile · focus · journey · experience · areas · projects · stack · credentials · changelog (.json)
tests/             ตรวจข้อมูล JSON
.github/workflows/ build + deploy GitHub Pages`;

export default function ArchitecturePage() {
  return (
    <div className="shell narrow">
      <PageIntro kicker="About this site" title="เกี่ยวกับเว็บนี้" lead="เว็บนี้สร้างแบบ static-first: เนื้อหาเป็นไฟล์ JSON ใน git ทุกครั้งที่ push จะถูกทดสอบ build และ deploy เป็นไฟล์ static บน GitHub Pages — ไม่มี server ไม่มี database ค่าโฮสต์ 0 บาท" />
      <section className="block">
        <h2>เทคโนโลยีที่ใช้</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ส่วน</th>
                <th>เทคโนโลยี</th>
                <th>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {stack.map(([part, tech, note]) => (
                <tr key={part}>
                  <td>{part}</td>
                  <td>{tech}</td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="block">
        <h2>โครงสร้างโค้ด</h2>
        <pre className="code">{tree}</pre>
        <p>
          ซอร์สโค้ดทั้งหมดอยู่ที่{" "}
          <a href="https://github.com/supapong-maig/profiles" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </section>
    </div>
  );
}
