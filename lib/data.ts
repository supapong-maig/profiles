import profileJson from "@/data/profile.json";
import experienceJson from "@/data/experience.json";
import projectsJson from "@/data/projects.json";
import skillsJson from "@/data/skills.json";
import interestsJson from "@/data/interests.json";
import servicesJson from "@/data/services.json";
import changelogJson from "@/data/changelog.json";

export type Link = { label: string; url: string };

export type Profile = {
  name: string;
  nameEn: string;
  headline: string;
  tagline: string;
  summary: string;
  location: string;
  availability: string;
  languages: string[];
  story: string[];
  values: { title: string; desc: string }[];
  workStyle: { label: string; desc: string }[];
  beyondWork: string;
  highlights: string[];
  contacts: { label: string; url: string; display: string }[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string | null;
  location: string;
  industry: string;
  context: string;
  achievements: string[];
  tools: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  start: string;
  end: string | null;
  role: string;
  teamSize: number;
  type: string;
  featured: boolean;
  tags: string[];
  links: Link[];
  problem: string;
  actions: string[];
  results: string[];
  lessons: string;
};

export type Skills = {
  core: { name: string; level: 1 | 2 | 3; evidence: string }[];
  tools: { group: string; items: string[] }[];
  soft: { name: string; desc: string }[];
  languages: { name: string; level: string }[];
  education: { degree: string; school: string; start: string; end: string; note: string }[];
  certifications: { name: string; issuer: string; year: string; url: string }[];
};

export type InterestStatus = "seed" | "growing" | "grown";

export type Interests = {
  now: { topic: string; status: InterestStatus; why: string; doing: string; collaborate: string }[];
  reading: { kind: string; title: string; by: string }[];
  archive: { topic: string; learned: string }[];
};

export type AudienceId = "employers" | "collaborators" | "projects";

export type Services = {
  audiences: { id: AudienceId; label: string; question: string; title: string; intro: string; items: string[] }[];
  notAFit: string[];
  contactSteps: string[];
};

export type ChangelogEntry = { date: string; title: string; detail: string };

export const profile = profileJson as Profile;
export const experience = experienceJson as Experience[];
export const projects = projectsJson as Project[];
export const skills = skillsJson as Skills;
export const interests = interestsJson as Interests;
export const services = servicesJson as Services;
export const changelog = changelogJson as ChangelogEntry[];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

const monthFmt = new Intl.DateTimeFormat("th-TH-u-ca-gregory", { month: "short", year: "numeric" });
const dayFmt = new Intl.DateTimeFormat("th-TH-u-ca-gregory", { day: "numeric", month: "short", year: "numeric" });

/** "2024-03" → "มี.ค. 2024" */
export function formatMonth(ym: string) {
  return monthFmt.format(new Date(`${ym}-01T00:00:00Z`));
}

/** "2026-10-10" → "10 ต.ค. 2026" */
export function formatDate(ymd: string) {
  return dayFmt.format(new Date(`${ymd}T00:00:00Z`));
}

export function formatRange(start: string, end: string | null) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "ปัจจุบัน"}`;
}

export const interestStatusLabel: Record<InterestStatus, string> = {
  seed: "🌱 เพิ่งเริ่มศึกษา",
  growing: "🌿 กำลังลงมือทดลอง",
  grown: "🌳 มีประสบการณ์จริง",
};
