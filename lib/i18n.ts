export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A string written in every supported language. */
export type L = Record<Locale, string>;

export function t(value: L, locale: Locale) {
  return value[locale];
}

/** Path for `path` (written without a locale prefix) in the given locale. */
export function localePath(path: string, locale: Locale) {
  return locale === defaultLocale ? path : `/${locale}${path === "/" ? "/" : path}`;
}

/** Splits a pathname (without basePath) into its locale and the locale-free path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const match = pathname.match(/^\/(th)(\/.*)?$/);
  if (match) return { locale: "th", path: match[2] || "/" };
  return { locale: defaultLocale, path: pathname || "/" };
}

export const ui = {
  en: {
    nav: { focus: "Focus", experience: "Experience", projects: "Projects", stack: "Stack", contact: "Contact" },
    langLabel: "Language",
    toc: [
      { group: "About", items: [{ id: "focus", label: "Focus" }, { id: "overview", label: "At a glance" }] },
      { group: "Journey", items: [{ id: "experience", label: "Experience" }, { id: "projects", label: "Projects" }] },
      { group: "Skills", items: [{ id: "stack", label: "Stack over time" }, { id: "skills", label: "Core skills" }, { id: "credentials", label: "Education & licenses" }] },
      { group: "Contact", items: [{ id: "contact", label: "Get in touch" }] },
    ],
    tocLabel: "Contents",
    contactMe: "Contact me →",
    seeProjects: "See projects",
    photoAlt: "Portrait of Supapong Ngonkham",
    journey: "My journey",
    focus: { eyebrow: "About", title: "What I focus on", lede: "Six areas I work in every day, and where I can help your team or project the most." },
    overview: { eyebrow: "About", title: "At a glance", now: "Now", since: "since", experience: "Experience", location: "Location", languages: "Languages", coreTech: "Core technology" },
    experience: { eyebrow: "Journey", title: "Experience", lede: "Newest first. Pick an area to show only the work related to it." },
    timeline: { filterLabel: "Filter by area", all: "All", present: "Today", start: "Where it started", highlight: "Highlight", education: "Education", tech: "Technology" },
    projects: { eyebrow: "Journey", title: "Projects", lede: "Systems I designed, built, or kept running in production.", problem: "Problem:", outcome: "✓ Outcome" },
    stack: {
      eyebrow: "Skills",
      title: "Stack over time",
      ledeBefore: "Each row is one stage of the journey, newest first. A ",
      carried: "gold",
      ledeAfter: " tag means the technology carried over from an earlier stage.",
    },
    skills: { eyebrow: "Skills", title: "Core skills" },
    credentials: { eyebrow: "Skills", title: "Education & licenses", education: "Education", license: "License" },
    contact: { eyebrow: "Contact", title: "Let's talk", before: "Interested in ", after: ", or looking for someone to help build AI-native systems? Send me a message." },
    footer: { updates: "Changelog", about: "About this site" },
    present: "present",
    updates: { kicker: "Changelog", title: "Changelog", lede: "What changed on this site, newest first." },
    notFound: { title: "Page not found", back: "Back to the home page" },
  },
  th: {
    nav: { focus: "ความสนใจ", experience: "ประสบการณ์", projects: "ผลงาน", stack: "เทคโนโลยี", contact: "ติดต่อ" },
    langLabel: "ภาษา",
    toc: [
      { group: "รู้จักผม", items: [{ id: "focus", label: "ความสนใจ" }, { id: "overview", label: "ภาพรวมโดยย่อ" }] },
      { group: "เส้นทาง", items: [{ id: "experience", label: "ประสบการณ์" }, { id: "projects", label: "ผลงาน" }] },
      { group: "ทักษะ", items: [{ id: "stack", label: "เทคโนโลยีที่ผ่านมา" }, { id: "skills", label: "ทักษะหลัก" }, { id: "credentials", label: "การศึกษาและใบรับรอง" }] },
      { group: "ติดต่อ", items: [{ id: "contact", label: "ติดต่อผม" }] },
    ],
    tocLabel: "สารบัญ",
    contactMe: "ติดต่อผม →",
    seeProjects: "ดูผลงาน",
    photoAlt: "รูปของ Supapong Ngonkham",
    journey: "เส้นทางของผม",
    focus: { eyebrow: "รู้จักผม", title: "สิ่งที่ผมสนใจและลงมือทำ", lede: "หกด้านที่ผมทำงานด้วยทุกวัน และเป็นจุดที่ช่วยทีมหรือโปรเจกต์ของคุณได้มากที่สุด" },
    overview: { eyebrow: "รู้จักผม", title: "ภาพรวมโดยย่อ", now: "ตอนนี้", since: "ตั้งแต่", experience: "ประสบการณ์", location: "ที่ตั้ง", languages: "ภาษา", coreTech: "เทคโนโลยีหลัก" },
    experience: { eyebrow: "เส้นทาง", title: "ประสบการณ์", lede: "เรียงจากปัจจุบันย้อนไปอดีต เลือกด้านที่สนใจเพื่อกรองเฉพาะงานที่เกี่ยวข้อง" },
    timeline: { filterLabel: "กรองตามด้าน", all: "ทั้งหมด", present: "ปัจจุบัน", start: "เริ่มต้นเส้นทาง", highlight: "ไฮไลต์", education: "การศึกษา", tech: "เทคโนโลยี" },
    projects: { eyebrow: "เส้นทาง", title: "ผลงาน", lede: "ระบบที่ผมออกแบบ สร้าง หรือดูแลให้ทำงานได้จริงบน production", problem: "โจทย์:", outcome: "✓ ผลลัพธ์" },
    stack: {
      eyebrow: "ทักษะ",
      title: "เทคโนโลยีที่ผ่านมา",
      ledeBefore: "แต่ละแถวคือช่วงหนึ่งของเส้นทาง เรียงจากปัจจุบันย้อนไปอดีต ป้าย ",
      carried: "สีทอง",
      ledeAfter: " คือเทคโนโลยีที่ใช้ต่อเนื่องมาจากช่วงก่อนหน้า",
    },
    skills: { eyebrow: "ทักษะ", title: "ทักษะหลัก" },
    credentials: { eyebrow: "ทักษะ", title: "การศึกษาและใบรับรอง", education: "การศึกษา", license: "ใบรับรอง" },
    contact: { eyebrow: "ติดต่อ", title: "คุยกันได้", before: "สนใจเรื่อง ", after: " หรือกำลังหาคนมาช่วยสร้างระบบแบบ AI-native ส่งข้อความมาได้เลยครับ" },
    footer: { updates: "ประวัติการอัปเดต", about: "เกี่ยวกับเว็บนี้" },
    present: "ปัจจุบัน",
    updates: { kicker: "Changelog", title: "ประวัติการอัปเดต", lede: "สิ่งที่เปลี่ยนในเว็บนี้ เรียงจากใหม่ไปเก่า" },
    notFound: { title: "ไม่พบหน้านี้", back: "กลับหน้าแรก" },
  },
} satisfies Record<Locale, unknown>;
