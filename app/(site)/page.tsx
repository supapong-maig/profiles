import { Chips } from "@/components/Chips";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Rail } from "@/components/Rail";
import { areas, credentials, experience, focus, formatMonth, formatRange, journey, profile, projects, stack, stackByPhase } from "@/lib/data";

export default function Home() {
  const email = profile.contacts.find((c) => c.label === "Email");
  const timeline = experience.map((e) => ({ ...e, period: formatRange(e.start, e.end) }));
  const stackRows = stackByPhase();

  return (
    <>
      <section className="shell hero">
        <div className="kicker">{profile.headline}</div>
        <h1>{profile.name}</h1>
        <p className="focus-line">{profile.focusLine}</p>
        {profile.bio.map((p) => (
          <p key={p} className="lede">
            {p}
          </p>
        ))}
        <div className="actions">
          {email && (
            <a className="btn btn--primary" href={email.url}>
              ติดต่อผม →
            </a>
          )}
          <a className="btn" href="#projects">
            ดูผลงาน
          </a>
        </div>
      </section>

      <section className="shell overview-map" aria-labelledby="journey-h">
        <h2 className="ov-h" id="journey-h">
          เส้นทางของผม
        </h2>
        <ol className="cycle">
          {journey.map((p, i) => (
            <li key={p.id} className="phase">
              <a className={`kw${p.id === "ai" ? " kw--now" : ""}`} href={`#t-${experience.find((e) => e.phase === p.id)?.id ?? ""}`}>
                <span className="when">{p.years}</span>
                <span className="kw-en">{p.title}</span>
                <span className="kw-th">{p.desc}</span>
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
        <Rail />
        <div className="content">
          <section className="flow-sec" id="focus">
            <div className="eyebrow">รู้จักผม</div>
            <h2>สิ่งที่ผมสนใจและลงมือทำ</h2>
            <p className="sec-lede">หกด้านที่ผมทำงานด้วยทุกวัน และเป็นจุดที่ช่วยทีมหรือโปรเจกต์ของคุณได้มากที่สุด</p>
            <div className="cards">
              {focus.map((f) => (
                <div key={f.id} className="kw">
                  <span className="kw-en">{f.en}</span>
                  <span className="kw-th">{f.th}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="overview">
            <div className="eyebrow">รู้จักผม</div>
            <h2>ภาพรวมโดยย่อ</h2>
            <ul className="summary">
              {profile.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="metrics">
              <div className="metric">
                <span className="k">ตอนนี้</span>
                <strong>{profile.now.role}</strong>
                <span className="small muted">
                  {profile.now.company} · ตั้งแต่ {formatMonth(profile.now.since)}
                </span>
              </div>
              <div className="metric">
                <span className="k">ประสบการณ์</span>
                <strong className="big">{profile.experienceYears}</strong>
                <span className="small muted">{profile.path.join(" → ")}</span>
              </div>
              <div className="metric">
                <span className="k">ที่ตั้ง</span>
                <strong>{profile.location}</strong>
              </div>
              <div className="metric">
                <span className="k">ภาษา</span>
                {profile.languages.map((l) => (
                  <span key={l.name}>
                    <strong>{l.name}</strong> <span className="muted">— {l.level}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="note">
              <span className="label">เทคโนโลยีหลัก</span>
              <Chips items={profile.coreTech} />
            </div>
          </section>

          <section className="flow-sec" id="experience">
            <div className="eyebrow">เส้นทาง</div>
            <h2>ประสบการณ์</h2>
            <p className="sec-lede">เรียงจากปัจจุบันย้อนไปอดีต เลือกด้านที่สนใจเพื่อกรองเฉพาะงานที่เกี่ยวข้อง</p>
            <ExperienceTimeline items={timeline} areas={areas} />
          </section>

          <section className="flow-sec" id="projects">
            <div className="eyebrow">เส้นทาง</div>
            <h2>ผลงาน</h2>
            <p className="sec-lede">ระบบที่ผมออกแบบ สร้าง หรือดูแลให้ทำงานได้จริงบน production</p>
            <div className="projects">
              {projects.map((p) => (
                <article key={p.slug} id={`p-${p.slug}`} className="project">
                  <span className="label">{p.context}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  {p.problem && (
                    <p className="small">
                      <b>โจทย์:</b> {p.problem}
                    </p>
                  )}
                  {p.built.length > 0 && (
                    <ul>
                      {p.built.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {p.outcome && (
                    <div className="outcome">
                      <span className="tag">✓ ผลลัพธ์</span>
                      <span>{p.outcome}</span>
                    </div>
                  )}
                  <Chips items={p.tech} label="เทคโนโลยี" />
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
            <div className="eyebrow">ทักษะ</div>
            <h2>เทคโนโลยีที่ผ่านมา</h2>
            <p className="sec-lede">
              แต่ละแถวคือช่วงหนึ่งของเส้นทาง เรียงจากปัจจุบันย้อนไปอดีต ป้าย <span className="chip chip--carried chip--inline">สีทอง</span> คือเทคโนโลยีที่ใช้ต่อเนื่องมาจากช่วงก่อนหน้า
            </p>
            <div className="stack">
              {stackRows
                .filter((r) => r.byCategory.length > 0)
                .map((r) => (
                  <div key={r.phase.id} className="stack-row">
                    <div className="stack-phase">
                      <span className="when">{r.phase.years}</span>
                      <b>{r.phase.title}</b>
                    </div>
                    <div className="stack-cats">
                      {r.byCategory.map((c) => (
                        <div key={c.category} className="stack-cat">
                          <span className="stack-cat__name">{c.category}</span>
                          <ul className="chips">
                            {c.items.map((t) => (
                              <li key={t.name} className={`chip${t.carried ? " chip--carried" : ""}`}>
                                {t.name}
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
            <div className="eyebrow">ทักษะ</div>
            <h2>ทักษะหลัก</h2>
            <div className="gloss">
              {stack.skills.map((s) => (
                <div key={s.group} className="g-row">
                  <div className="g-term">{s.group}</div>
                  <Chips items={s.items} />
                </div>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="credentials">
            <div className="eyebrow">ทักษะ</div>
            <h2>การศึกษาและใบรับรอง</h2>
            <div className="notes">
              {credentials.education.map((e) => (
                <div key={e.degree} className="note">
                  <span className="label">การศึกษา · {e.year}</span>
                  <b className="note-title">{e.degree}</b>
                  <p className="muted">
                    {e.school} · {e.note}
                  </p>
                </div>
              ))}
              {credentials.certifications.map((c) => (
                <div key={c.name} className="note">
                  <span className="label">ใบรับรอง{c.year && ` · ${c.year}`}</span>
                  <b className="note-title">{c.name}</b>
                  <p className="muted">{c.issuer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flow-sec" id="contact">
            <div className="eyebrow">ติดต่อ</div>
            <h2>คุยกันได้</h2>
            <div className="callout">
              <p>
                สนใจเรื่อง <b>{profile.interests.join(", ")}</b> หรือกำลังหาคนมาช่วยสร้างระบบแบบ AI-native ส่งข้อความมาได้เลยครับ
              </p>
              <ul className="contacts">
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
    </>
  );
}
