export type Section = {
  href: string;
  label: string;
  /** Short label that fits a wheel segment. */
  short: string;
  /** CSS custom property suffix: --c-<tone>. */
  tone: "teal" | "blue" | "orange" | "green" | "purple" | "red";
  lead: string;
};

export const sections: Section[] = [
  { href: "/about/", label: "เกี่ยวกับผม", short: "ผมคือใคร", tone: "teal", lead: "เรื่องราว ค่านิยม และสไตล์การทำงาน" },
  { href: "/experience/", label: "ประวัติการทำงาน", short: "ประวัติงาน", tone: "blue", lead: "ตำแหน่งงานและผลลัพธ์ที่สร้าง" },
  { href: "/projects/", label: "ผลงาน", short: "ผลงาน", tone: "orange", lead: "โปรเจกต์ที่ผ่านมา พร้อมบทบาทและผลลัพธ์" },
  { href: "/skills/", label: "ทักษะและการศึกษา", short: "ทักษะ", tone: "green", lead: "ทักษะ เครื่องมือ วุฒิการศึกษา และใบรับรอง" },
  { href: "/interests/", label: "เรื่องที่กำลังสนใจ", short: "สนใจอะไร", tone: "purple", lead: "หัวข้อที่กำลังเรียนรู้และอยากคุยด้วย" },
  { href: "/help/", label: "ช่วยอะไรได้บ้าง", short: "ช่วยอะไรได้", tone: "red", lead: "รูปแบบการร่วมงานสำหรับนายจ้าง ผู้ร่วมงาน และโปรเจกต์" },
];

export function sectionFor(href: string) {
  const s = sections.find((x) => x.href === href);
  if (!s) throw new Error(`Unknown section ${href}`);
  return s;
}
