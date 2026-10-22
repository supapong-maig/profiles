import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "About this site",
    lede: "This site is static-first: the content is JSON files in git. Every push is tested, built and deployed as static files to GitHub Pages — no server, no database, zero hosting cost.",
    stackTitle: "Technology",
    head: ["Part", "Technology", "Notes"],
    stack: [
      ["Framework", "Next.js 16 (App Router) · React 19 · TypeScript", "Static export for GitHub Pages"],
      ["Design", "Plain CSS + design tokens · Chakra Petch, IBM Plex Sans Thai, IBM Plex Mono", "One amber accent, dark mode, no UI framework"],
      ["Content", "JSON files in data/, English and Thai side by side", "One source of truth for every section and both languages"],
      ["Languages", "English at /, Thai at /th/", "The EN / TH switch keeps you on the same page"],
      ["Tests", "node:test", "Checks the data is complete and well-formed before every deploy"],
      ["CI/CD", "GitHub Actions → GitHub Pages", "Push to main = test, build and deploy"],
    ],
    treeTitle: "Code layout",
    tree: `app/(site)/        routes: home, updates, architecture, and the same under th/
components/pages/  one component per page, rendered in either language
components/        Header, Footer, LangToggle, Rail, ExperienceTimeline, Chips
lib/               data loading + types, i18n strings
data/              profile · focus · journey · experience · areas · projects · stack · credentials · changelog (.json)
tests/             JSON data checks
.github/workflows/ build + deploy GitHub Pages`,
    source: "All source code is on",
  },
  th: {
    title: "เกี่ยวกับเว็บนี้",
    lede: "เว็บนี้สร้างแบบ static-first: เนื้อหาเป็นไฟล์ JSON ใน git ทุกครั้งที่ push จะถูกทดสอบ build และ deploy เป็นไฟล์ static บน GitHub Pages — ไม่มี server ไม่มี database ค่าโฮสต์ 0 บาท",
    stackTitle: "เทคโนโลยีที่ใช้",
    head: ["ส่วน", "เทคโนโลยี", "หมายเหตุ"],
    stack: [
      ["Framework", "Next.js 16 (App Router) · React 19 · TypeScript", "static export สำหรับ GitHub Pages"],
      ["หน้าตา", "CSS ล้วน + design tokens · Chakra Petch, IBM Plex Sans Thai, IBM Plex Mono", "สีหลักเดียว (amber) รองรับ dark mode ไม่ใช้ UI framework"],
      ["เนื้อหา", "ไฟล์ JSON ใน data/ มีทั้งภาษาอังกฤษและไทยคู่กัน", "แหล่งข้อมูลเดียวสำหรับทุกส่วนและทั้งสองภาษา"],
      ["ภาษา", "อังกฤษที่ / ไทยที่ /th/", "ปุ่ม EN / TH พาไปหน้าเดียวกันในอีกภาษา"],
      ["ทดสอบ", "node:test", "ตรวจความครบและรูปแบบข้อมูลทุกครั้งก่อน deploy"],
      ["CI/CD", "GitHub Actions → GitHub Pages", "push เข้า main = ทดสอบ build และ deploy อัตโนมัติ"],
    ],
    treeTitle: "โครงสร้างโค้ด",
    tree: `app/(site)/        หน้าเว็บ: หน้าแรก, updates, architecture และชุดเดียวกันใต้ th/
components/pages/  คอมโพเนนต์ของแต่ละหน้า ใช้ได้ทั้งสองภาษา
components/        Header, Footer, LangToggle, Rail, ExperienceTimeline, Chips
lib/               โหลดข้อมูล + types, ข้อความ i18n
data/              profile · focus · journey · experience · areas · projects · stack · credentials · changelog (.json)
tests/             ตรวจข้อมูล JSON
.github/workflows/ build + deploy GitHub Pages`,
    source: "ซอร์สโค้ดทั้งหมดอยู่ที่",
  },
};

export function ArchitecturePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <SiteShell locale={locale}>
      <div className="shell narrow">
        <PageIntro kicker="About this site" title={c.title} lead={c.lede} />
        <section className="block">
          <h2>{c.stackTitle}</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {c.head.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.stack.map(([part, tech, note]) => (
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
          <h2>{c.treeTitle}</h2>
          <pre className="code">{c.tree}</pre>
          <p>
            {c.source}{" "}
            <a href="https://github.com/supapong-maig/profiles" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
