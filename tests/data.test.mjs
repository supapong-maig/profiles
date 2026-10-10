import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const load = (name) => JSON.parse(readFileSync(new URL(`../data/${name}.json`, import.meta.url), "utf8"));

const YM = /^\d{4}-(0[1-9]|1[0-2])$/;
const YMD = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const nonEmpty = (v, where) => assert.ok(typeof v === "string" && v.trim().length > 0, `${where} must be a non-empty string`);
const unique = (values, what) => assert.equal(new Set(values).size, values.length, `${what} must be unique`);
const assertRange = (start, end, where) => {
  assert.match(start, YM, `${where}.start must be YYYY-MM`);
  if (end !== null) {
    assert.match(end, YM, `${where}.end must be YYYY-MM or null`);
    assert.ok(start <= end, `${where}: start must not be after end`);
  }
};

test("profile has the required fields", () => {
  const p = load("profile");
  for (const k of ["name", "headline", "tagline", "summary", "location", "availability"]) nonEmpty(p[k], `profile.${k}`);
  assert.ok(p.contacts.length > 0, "profile.contacts must not be empty");
  for (const c of p.contacts) {
    nonEmpty(c.label, "contact.label");
    assert.match(c.url, /^(https?:|mailto:)/, `contact ${c.label} url must be http(s) or mailto`);
  }
});

test("experience entries are complete and newest first", () => {
  const items = load("experience");
  unique(items.map((e) => e.id), "experience ids");
  items.forEach((e, i) => {
    nonEmpty(e.role, `experience[${i}].role`);
    nonEmpty(e.company, `experience[${i}].company`);
    assertRange(e.start, e.end, `experience[${i}]`);
    assert.ok(e.achievements.length > 0, `experience[${i}] needs at least one achievement`);
  });
  const starts = items.map((e) => e.start);
  assert.deepEqual(starts, [...starts].sort().reverse(), "experience must be sorted newest first");
});

test("projects have valid slugs and content", () => {
  const items = load("projects");
  unique(items.map((p) => p.slug), "project slugs");
  for (const p of items) {
    assert.match(p.slug, SLUG, `project slug "${p.slug}" must be kebab-case`);
    nonEmpty(p.title, `project ${p.slug}.title`);
    nonEmpty(p.summary, `project ${p.slug}.summary`);
    assertRange(p.start, p.end, `project ${p.slug}`);
    assert.ok(Number.isInteger(p.teamSize) && p.teamSize > 0, `project ${p.slug}.teamSize must be a positive integer`);
    for (const l of p.links) assert.match(l.url, /^https?:/, `project ${p.slug} link must be http(s)`);
  }
});

test("skill levels are 1–3", () => {
  const s = load("skills");
  for (const c of s.core) assert.ok([1, 2, 3].includes(c.level), `skill ${c.name} level must be 1, 2 or 3`);
});

test("interest statuses are known", () => {
  const i = load("interests");
  for (const t of i.now) assert.ok(["seed", "growing", "grown"].includes(t.status), `interest ${t.topic} has unknown status`);
});

test("services cover every audience once", () => {
  const s = load("services");
  assert.deepEqual(s.audiences.map((a) => a.id).sort(), ["collaborators", "employers", "projects"]);
});

test("changelog dates are valid and newest first", () => {
  const items = load("changelog");
  for (const c of items) {
    assert.match(c.date, YMD, `changelog date ${c.date} must be YYYY-MM-DD`);
    nonEmpty(c.title, "changelog.title");
  }
  const dates = items.map((c) => c.date);
  assert.deepEqual(dates, [...dates].sort().reverse(), "changelog must be sorted newest first");
});
