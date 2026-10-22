import profileJson from "@/data/profile.json";
import focusJson from "@/data/focus.json";
import journeyJson from "@/data/journey.json";
import experienceJson from "@/data/experience.json";
import areasJson from "@/data/areas.json";
import projectsJson from "@/data/projects.json";
import stackJson from "@/data/stack.json";
import credentialsJson from "@/data/credentials.json";
import changelogJson from "@/data/changelog.json";

export type Link = { label: string; url: string };

export type Profile = {
  name: string;
  headline: string;
  focusLine: string;
  bio: string[];
  summary: string[];
  now: { role: string; company: string; since: string };
  experienceYears: string;
  path: string[];
  coreTech: string[];
  location: string;
  languages: { name: string; level: string }[];
  interests: string[];
  contacts: { label: string; url: string; display: string }[];
};

export type Focus = { id: string; en: string; th: string };
export type Phase = { id: string; years: string; title: string; desc: string };
export type Area = { id: string; label: string };

export type Experience = {
  id: string;
  kind: "work" | "education";
  /** "YYYY-MM" or "YYYY" */
  start: string;
  end: string | null;
  role: string;
  company: string;
  unit: string;
  phase: string;
  areas: string[];
  highlight: boolean;
  summary: string;
  groups: { title: string; items: string[] }[];
  tech: string[];
};

export type Project = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  problem: string | null;
  built: string[];
  outcome: string | null;
  link: Link | null;
  tech: string[];
};

export type Stack = {
  categories: { name: string; items: string[] }[];
  skills: { group: string; items: string[] }[];
};

export type Credentials = {
  education: { degree: string; school: string; year: string; note: string }[];
  certifications: { name: string; issuer: string; year: string }[];
};

export type ChangelogEntry = { date: string; title: string; detail: string };

export const profile = profileJson as Profile;
export const focus = focusJson as Focus[];
export const journey = journeyJson as Phase[];
export const experience = experienceJson as Experience[];
export const areas = areasJson as Area[];
export const projects = projectsJson as Project[];
export const stack = stackJson as Stack;
export const credentials = credentialsJson as Credentials;
export const changelog = changelogJson as ChangelogEntry[];

const monthFmt = new Intl.DateTimeFormat("th-TH-u-ca-gregory", { month: "short", year: "numeric", timeZone: "UTC" });
const dayFmt = new Intl.DateTimeFormat("th-TH-u-ca-gregory", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "2024-03" → "มี.ค. 2024", "2016" → "2016" */
export function formatMonth(value: string) {
  return value.length === 4 ? value : monthFmt.format(new Date(`${value}-01T00:00:00Z`));
}

/** "2026-10-10" → "10 ต.ค. 2026" */
export function formatDate(ymd: string) {
  return dayFmt.format(new Date(`${ymd}T00:00:00Z`));
}

export function formatRange(start: string, end: string | null) {
  if (end === start) return formatMonth(start);
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "ปัจจุบัน"}`;
}

/**
 * Technology used in each journey phase, grouped by stack category.
 * A tech is marked `carried` when an earlier phase already used it.
 */
export function stackByPhase() {
  const categoryOf = new Map<string, string>();
  for (const c of stack.categories) for (const t of c.items) categoryOf.set(t, c.name);

  const seen = new Set<string>();
  const oldestFirst = [...journey];
  const rows = oldestFirst.map((phase) => {
    const techs = new Set(experience.filter((e) => e.phase === phase.id).flatMap((e) => e.tech));
    const byCategory = stack.categories
      .map((c) => ({
        category: c.name,
        items: c.items.filter((t) => techs.has(t)).map((t) => ({ name: t, carried: seen.has(t) })),
      }))
      .filter((c) => c.items.length > 0);
    techs.forEach((t) => seen.add(t));
    const uncategorised = [...techs].filter((t) => !categoryOf.has(t));
    return { phase, byCategory, uncategorised };
  });
  return rows.reverse();
}
