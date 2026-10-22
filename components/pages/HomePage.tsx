import { Chips } from "@/components/Chips";
import { ExperienceTimeline, type TimelineItem } from "@/components/ExperienceTimeline";
import { Rail } from "@/components/Rail";
import { SiteShell } from "@/components/SiteShell";
import { areas, credentials, experience, focus, formatMonth, formatRange, journey, profile, projects, stack, stackByPhase } from "@/lib/data";
import { t, ui, type Locale } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function HomePage({ locale }: { locale: Locale }) {
  const s = ui[locale];
  const email = profile.contacts.find((c) => c.label === "Email");
  const timeline: TimelineItem[] = experience.map((e) => ({
    id: e.id,
    kind: e.kind,
    startYear: e.start.slice(0, 4),
    period: formatRange(e.start, e.end, locale),
    role: e.role,
    company: t(e.company, locale),
    unit: t(e.unit, locale),
    areas: e.areas,
    highlight: e.highlight,
    summary: t(e.summary, locale),
    groups: e.groups.map((g) => ({ title: t(g.title, locale), items: g.items.map((i) => t(i, locale)) })),
    tech: e.tech,
  }));
  const stackRows = stackByPhase().filter((r) => r.byCategory.length > 0);

  return (
    <SiteShell locale={locale}>
      <section className="shell hero">
        <div className="hero__text">
          <div className="kicker">{profile.headline}</div>
          <h1>{profile.name}</h1>
          <p className="focus-line">{profile.focusLine}</p>
          {profile.bio.map((p) => (
            <p key={p.en} className="lede">
              {t(p, locale)}
            </p>
          ))}
          <div className="actions">
            {email && (
              <a className="btn btn--primary" href={email.url}>
                {s.contactMe}
              </a>
            )}
            <a className="btn" href={`${base}${profile.resume.src}`} download>
              {s.resume}
            </a>
            <a className="btn btn--ghost" href="#projects">
              {s.seeProjects}
            </a>
          </div>
        </div>
        <figure className="hero__photo">
          <img src={`${base}${profile.photo.src}`} width={profile.photo.width} height={profile.photo.height} alt={s.photoAlt} fetchPriority="high" />
        </figure>
      </section>

      <section className="shell overview-map" aria-labelledby="journey-h">
        <h2 className="ov-h" id="journey-h">
          {s.journey}
        </h2>
        <ol className="cycle">
          {journey.map((p, i) => (
            <li key={p.id} className="phase">
              <a className={`kw${i === journey.length - 1 ? " kw--now" : ""}`} href={`#t-${experience.find((e) => e.phase === p.id)?.id ?? ""}`}>
                <span className="when">{t(p.years, locale)}</span>
                <span className="kw-en">{t(p.title, locale)}</span>
                <span className="kw-th">{t(p.desc, locale)}</span>
              </a>
              {i < journey.length - 1 && (
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="shell wrap">
        <Rail toc={s.toc} label={s.tocLabel} />
        <div className="content">
          <section className="flow-sec" id="focus">
            <div className="eyebrow">{s.focus.eyebrow}</div>
            <h2>{s.focus.title}</h2>
            <p className="sec-lede">{s.focus.lede}</p>
            <div className="cards">
              {focus.map((f) => (
                <div key={f.id} className="kw">
                  <span className="kw-en">{f.title}</span>
                  <span className="kw-th">{t(f.desc, locale)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="overview">
            <div className="eyebrow">{s.overview.eyebrow}</div>
            <h2>{s.overview.title}</h2>
            <ul className="summary">
              {profile.summary.map((x) => (
                <li key={x.en}>{t(x, locale)}</li>
              ))}
            </ul>
            <div className="metrics">
              <div className="metric">
                <span className="k">{s.overview.now}</span>
                <strong>{profile.now.role}</strong>
                <span className="small muted">
                  {profile.now.company} · {s.overview.since} {formatMonth(profile.now.since, locale)}
                </span>
              </div>
              <div className="metric">
                <span className="k">{s.overview.experience}</span>
                <strong className="big">{t(profile.experienceYears, locale)}</strong>
                <span className="small muted">{profile.path.map((p) => t(p, locale)).join(" → ")}</span>
              </div>
              <div className="metric">
                <span className="k">{s.overview.location}</span>
                <strong>{t(profile.location, locale)}</strong>
              </div>
              <div className="metric">
                <span className="k">{s.overview.languages}</span>
                {profile.languages.map((l) => (
                  <span key={l.name.en}>
                    <strong>{t(l.name, locale)}</strong> <span className="muted">— {t(l.level, locale)}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="note">
              <span className="label">{s.overview.coreTech}</span>
              <Chips items={profile.coreTech} />
            </div>
          </section>

          <section className="flow-sec" id="experience">
            <div className="eyebrow">{s.experience.eyebrow}</div>
            <h2>{s.experience.title}</h2>
            <p className="sec-lede">{s.experience.lede}</p>
            <ExperienceTimeline items={timeline} areas={areas.map((a) => ({ id: a.id, label: t(a.label, locale) }))} labels={s.timeline} />
          </section>

          <section className="flow-sec" id="projects">
            <div className="eyebrow">{s.projects.eyebrow}</div>
            <h2>{s.projects.title}</h2>
            <p className="sec-lede">{s.projects.lede}</p>
            <div className="projects">
              {projects.map((p) => (
                <article key={p.slug} id={`p-${p.slug}`} className="project">
                  <span className="label">{t(p.context, locale)}</span>
                  <h3>{t(p.title, locale)}</h3>
                  <p>{t(p.summary, locale)}</p>
                  {p.problem && (
                    <p className="small">
                      <b>{s.projects.problem}</b> {t(p.problem, locale)}
                    </p>
                  )}
                  {p.built.length > 0 && (
                    <ul>
                      {p.built.map((b) => (
                        <li key={b.en}>{t(b, locale)}</li>
                      ))}
                    </ul>
                  )}
                  {p.outcome && (
                    <div className="outcome">
                      <span className="tag">{s.projects.outcome}</span>
                      <span>{t(p.outcome, locale)}</span>
                    </div>
                  )}
                  <Chips items={p.tech} label={s.timeline.tech} />
                  {p.link && (
                    <p className="small">
                      <a href={p.link.url} target="_blank" rel="noreferrer">
                        {p.link.label} ↗
                      </a>
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="stack">
            <div className="eyebrow">{s.stack.eyebrow}</div>
            <h2>{s.stack.title}</h2>
            <p className="sec-lede">
              {s.stack.ledeBefore}
              <span className="chip chip--carried chip--inline">{s.stack.carried}</span>
              {s.stack.ledeAfter}
            </p>
            <div className="stack">
              {stackRows.map((r) => (
                <div key={r.phase.id} className="stack-row">
                  <div className="stack-phase">
                    <span className="when">{t(r.phase.years, locale)}</span>
                    <b>{t(r.phase.title, locale)}</b>
                  </div>
                  <div className="stack-cats">
                    {r.byCategory.map((c) => (
                      <div key={c.category.en} className="stack-cat">
                        <span className="stack-cat__name">{t(c.category, locale)}</span>
                        <ul className="chips">
                          {c.items.map((x) => (
                            <li key={x.name} className={`chip${x.carried ? " chip--carried" : ""}`}>
                              {x.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="skills">
            <div className="eyebrow">{s.skills.eyebrow}</div>
            <h2>{s.skills.title}</h2>
            <div className="gloss">
              {stack.skills.map((g) => (
                <div key={g.group} className="g-row">
                  <div className="g-term">{g.group}</div>
                  <Chips items={g.items} />
                </div>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="credentials">
            <div className="eyebrow">{s.credentials.eyebrow}</div>
            <h2>{s.credentials.title}</h2>
            <div className="notes">
              {credentials.education.map((e) => (
                <div key={e.degree} className="note">
                  <span className="label">
                    {s.credentials.education} · {e.year}
                  </span>
                  <b className="note-title">{e.degree}</b>
                  <p className="muted">
                    {t(e.school, locale)} · {e.note}
                  </p>
                </div>
              ))}
              {credentials.certifications.map((c) => (
                <div key={c.name} className="note">
                  <span className="label">
                    {s.credentials.license}
                    {c.year && ` · ${c.year}`}
                  </span>
                  <b className="note-title">{c.name}</b>
                  <p className="muted">{t(c.issuer, locale)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="contact">
            <div className="eyebrow">{s.contact.eyebrow}</div>
            <h2>{s.contact.title}</h2>
            <div className="callout">
              <p>
                {s.contact.before}
                <b>{profile.interests.join(", ")}</b>
                {s.contact.after}
              </p>
              <ul className="contacts">
                <li>
                  <span className="label">{s.resumeLabel}</span>
                  <a href={`${base}${profile.resume.src}`} download>
                    PDF · {profile.resume.size} ↓
                  </a>
                </li>
                {profile.contacts.map((c) => (
                  <li key={c.label}>
                    <span className="label">{c.label}</span>
                    <a href={c.url} target={c.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {c.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
