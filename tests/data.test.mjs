import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const load = (name) => JSON.parse(readFileSync(new URL(`../data/${name}.json`, import.meta.url), "utf8"));

const PERIOD = /^\d{4}(-(0[1-9]|1[0-2]))?$/;
const YMD = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const nonEmpty = (v, where) => assert.ok(typeof v === "string" && v.trim().length > 0, `${where} must be a non-empty string`);
const unique = (values, what) => assert.equal(new Set(values).size, values.length, `${what} must be unique`);

const profile = load("profile");
const focus = load("focus");
const journey = load("journey");
const experience = load("experience");
const areas = load("areas");
const projects = load("projects");
const stack = load("stack");
const credentials = load("credentials");
const changelog = load("changelog");

/** Walks a JSON value and yields every { en, th } pair with its path. */
function* localized(value, path) {
  if (Array.isArray(value)) {
    for (const [i, v] of value.entries()) yield* localized(v, `${path}[${i}]`);
  } else if (value && typeof value === "object") {
    const keys = Object.keys(value).sort().join(",");
    if (keys === "en,th") yield [path, value];
    else for (const [k, v] of Object.entries(value)) yield* localized(v, `${path}.${k}`);
  }
}

test("every translated string has both English and Thai", () => {
  const files = { profile, focus, journey, experience, areas, projects, stack, credentials, changelog };
  for (const [name, data] of Object.entries(files)) {
    for (const [path, { en, th }] of localized(data, name)) {
      assert.ok(typeof en === "string" && typeof th === "string", `${path} must have string en and th`);
      assert.equal(en.trim() === "", th.trim() === "", `${path}: en and th must both be filled or both be empty`);
    }
  }
});

test("profile photo exists", () => {
  assert.ok(existsSync(new URL(`../public${profile.photo.src}`, import.meta.url)), `public${profile.photo.src} is missing`);
});

test("resume PDF exists", () => {
  assert.ok(existsSync(new URL(`../public${profile.resume.src}`, import.meta.url)), `public${profile.resume.src} is missing`);
});

test("profile has the required fields", () => {
  for (const k of ["name", "headline", "focusLine"]) nonEmpty(profile[k], `profile.${k}`);
  assert.ok(profile.bio.length > 0 && profile.summary.length > 0, "profile needs bio and summary");
  assert.match(profile.now.since, PERIOD, "profile.now.since must be YYYY or YYYY-MM");
  assert.ok(profile.contacts.length > 0, "profile.contacts must not be empty");
  for (const c of profile.contacts) assert.match(c.url, /^(https?:|mailto:)/, `contact ${c.label} url must be http(s) or mailto`);
});

test("contacts do not publish a phone number", () => {
  for (const c of profile.contacts) assert.doesNotMatch(c.url, /^tel:/, "phone numbers stay off the public site");
});

test("focus and journey ids are unique", () => {
  unique(focus.map((f) => f.id), "focus ids");
  unique(journey.map((p) => p.id), "journey ids");
});

test("experience entries are complete, valid and newest first", () => {
  unique(experience.map((e) => e.id), "experience ids");
  const phaseIds = new Set(journey.map((p) => p.id));
  const areaIds = new Set(areas.map((a) => a.id));
  experience.forEach((e, i) => {
    const where = `experience[${i}] (${e.id})`;
    assert.ok(["work", "education"].includes(e.kind), `${where}.kind must be work or education`);
    nonEmpty(e.role, `${where}.role`);
    nonEmpty(e.company.en, `${where}.company`);
    assert.match(e.start, PERIOD, `${where}.start must be YYYY or YYYY-MM`);
    if (e.end !== null) {
      assert.match(e.end, PERIOD, `${where}.end must be YYYY, YYYY-MM or null`);
      assert.ok(e.start <= e.end, `${where}: start must not be after end`);
    }
    assert.ok(phaseIds.has(e.phase), `${where}.phase "${e.phase}" is not in journey.json`);
    for (const a of e.areas) assert.ok(areaIds.has(a), `${where} area "${a}" is not in areas.json`);
    if (e.kind === "work") assert.ok(e.groups.some((g) => g.items.length > 0), `${where} needs at least one bullet`);
  });
  const starts = experience.map((e) => e.start.slice(0, 4));
  assert.deepEqual(starts, [...starts].sort().reverse(), "experience must be sorted newest first");
});

test("every journey phase has at least one experience entry", () => {
  for (const p of journey) assert.ok(experience.some((e) => e.phase === p.id), `phase ${p.id} has no entries`);
});

test("projects have valid slugs and content", () => {
  unique(projects.map((p) => p.slug), "project slugs");
  for (const p of projects) {
    assert.match(p.slug, SLUG, `project slug "${p.slug}" must be kebab-case`);
    nonEmpty(p.title.en, `project ${p.slug}.title`);
    nonEmpty(p.summary.en, `project ${p.slug}.summary`);
    if (p.link) assert.match(p.link.url, /^https?:/, `project ${p.slug} link must be http(s)`);
  }
});

test("every experience tech belongs to a stack category", () => {
  const known = new Set(stack.categories.flatMap((c) => c.items));
  for (const e of experience) for (const t of e.tech) assert.ok(known.has(t), `tech "${t}" (${e.id}) is missing from stack.json categories`);
});

test("credentials are present", () => {
  assert.ok(credentials.education.length > 0, "education must not be empty");
  for (const c of credentials.certifications) nonEmpty(c.name, "certification.name");
});

test("changelog dates are valid and newest first", () => {
  for (const c of changelog) {
    assert.match(c.date, YMD, `changelog date ${c.date} must be YYYY-MM-DD`);
    nonEmpty(c.title.en, "changelog.title");
  }
  const dates = changelog.map((c) => c.date);
  assert.deepEqual(dates, [...dates].sort().reverse(), "changelog must be sorted newest first");
});
