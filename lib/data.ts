import profileJson from "@/data/profile.json";
import focusJson from "@/data/focus.json";
import journeyJson from "@/data/journey.json";
import experienceJson from "@/data/experience.json";
import areasJson from "@/data/areas.json";
import projectsJson from "@/data/projects.json";
import stackJson from "@/data/stack.json";
import credentialsJson from "@/data/credentials.json";
import changelogJson from "@/data/changelog.json";
import { ui, type L, type Locale } from "./i18n";

export type Link = { label: string; url: string };

export type Profile = {
  name: string;
  headline: string;
  focusLine: string;
  photo: { src: string; width: number; height: number };
  bio: L[];
  summary: L[];
  now: { role: string; company: string; since: string };
  experienceYears: L;
  path: L[];
  coreTech: string[];
  location: L;
  languages: { name: L; level: L }[];
  interests: string[];
  contacts: { label: string; url: string; display: string }[];
};

export type Focus = { id: string; title: string; desc: L };
export type Phase = { id: string; years: L; title: L; desc: L };
export type Area = { id: string; label: L };

export type Experience = {
  id: string;
  kind: "work" | "education";
  /** "YYYY-MM" or "YYYY" */
  start: string;
  end: string | null;
  role: string;
  company: L;
  unit: L;
  phase: string;
  areas: string[];
  highlight: boolean;
  summary: L;
  groups: { title: L; items: L[] }[];
  tech: string[];
};

export type Project = {
  slug: string;
  title: L;
  context: L;
  summary: L;
  problem: L | null;
  built: L[];
  outcome: L | null;
  link: Link | null;
  tech: string[];
};

export type Stack = {
  categories: { name: L; items: string[] }[];
  skills: { group: string; items: string[] }[];
};

export type Credentials = {
  education: { degree: string; school: L; year: string; note: string }[];
  certifications: { name: string; issuer: L; year: string }[];
};

export type ChangelogEntry = { date: string; title: L; detail: L };

export const profile = profileJson as Profile;
export const focus = focusJson as Focus[];
export const journey = journeyJson as Phase[];
export const experience = experienceJson as Experience[];
export const areas = areasJson as Area[];
export const projects = projectsJson as Project[];
export const stack = stackJson as Stack;
export const credentials = credentialsJson as Credentials;
export const changelog = changelogJson as ChangelogEntry[];

const intlLocale: Record<Locale, string> = { en: "en-GB", th: "th-TH-u-ca-gregory" };

/** "2024-03" → "Mar 2024" / "มี.ค. 2024", "2016" → "2016" */
export function formatMonth(value: string, locale: Locale) {
  if (value.length === 4) return value;
  const fmt = new Intl.DateTimeFormat(intlLocale[locale], { month: "short", year: "numeric", timeZone: "UTC" });
  return fmt.format(new Date(`${value}-01T00:00:00Z`));
}

/** "2026-10-10" → "10 Oct 2026" / "10 ต.ค. 2026" */
export function formatDate(ymd: string, locale: Locale) {
  const fmt = new Intl.DateTimeFormat(intlLocale[locale], { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return fmt.format(new Date(`${ymd}T00:00:00Z`));
}

export function formatRange(start: string, end: string | null, locale: Locale) {
  if (end === start) return formatMonth(start, locale);
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : ui[locale].present}`;
}

/**
 * Technology used in each journey phase, grouped by stack category, newest phase first.
 * A tech is marked `carried` when an earlier phase already used it.
 */
export function stackByPhase() {
  const seen = new Set<string>();
  const rows = journey.map((phase) => {
    const techs = new Set(experience.filter((e) => e.phase === phase.id).flatMap((e) => e.tech));
    const byCategory = stack.categories
      .map((c) => ({
        category: c.name,
        items: c.items.filter((t) => techs.has(t)).map((t) => ({ name: t, carried: seen.has(t) })),
      }))
      .filter((c) => c.items.length > 0);
    techs.forEach((t) => seen.add(t));
    return { phase, byCategory };
  });
  return rows.reverse();
}
