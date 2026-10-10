# profiles — Portfolio

เว็บ Portfolio ส่วนตัว: ประวัติการทำงาน ผลงาน ทักษะ และเรื่องที่กำลังสนใจ
เพื่อให้นายจ้าง ผู้ร่วมงาน และคนที่กำลังหาคนร่วมโปรเจกต์รู้ว่าเราเป็นใคร และช่วยอะไรได้บ้าง

🌐 **https://supapong-maig.github.io/profiles/**

## แก้เนื้อหา

เนื้อหาทั้งหมดอยู่ในไฟล์ JSON ใน `data/` แก้ที่นี่ที่เดียว แล้ว push เข้า `main` เว็บจะอัปเดตเองภายในไม่กี่นาที

| ไฟล์ | ใช้ในหน้า |
|---|---|
| `data/profile.json` | หน้าแรก, เกี่ยวกับผม, ช่องทางติดต่อ |
| `data/experience.json` | ประวัติการทำงาน (เรียงใหม่ → เก่า) |
| `data/projects.json` | ผลงาน + หน้ารายละเอียดของแต่ละโปรเจกต์ (`slug` เป็นภาษาอังกฤษตัวเล็ก-คั่นด้วยขีด) |
| `data/skills.json` | ทักษะ (level 1–3), เครื่องมือ, ภาษา, การศึกษา, ใบรับรอง |
| `data/interests.json` | เรื่องที่กำลังสนใจ (status: `seed` / `growing` / `grown`) |
| `data/services.json` | ช่วยอะไรได้บ้าง แยกตามนายจ้าง / ผู้ร่วมงาน / โปรเจกต์ |
| `data/changelog.json` | ประวัติการอัปเดต (เพิ่มรายการบนสุด) |

ข้อความใน `[วงเล็บเหลี่ยม]` คือช่องที่ต้องแทนด้วยข้อมูลจริง

## Tech stack

| ส่วน | เทคโนโลยี |
|---|---|
| Framework | Next.js 16 (App Router, static export) · React 19 · TypeScript |
| หน้าตา | CSS ล้วน + design tokens · ฟอนต์ Kanit · รองรับ dark mode |
| เนื้อหา | JSON ใน `data/` เป็นแหล่งข้อมูลเดียว |
| ทดสอบ | `node:test` ตรวจความครบและรูปแบบข้อมูล |
| CI/CD | GitHub Actions → GitHub Pages |

## โครงสร้างโค้ด

```
app/(site)/        หน้าเว็บ: หน้าแรก, about, experience, projects, skills, interests, help, updates, architecture
components/        Header, Footer, SectionWheel, PageIntro, Tags
lib/               โหลดข้อมูล + types, รายการหัวข้อและสี
data/              เนื้อหาทั้งหมด (.json)
tests/             ตรวจข้อมูล JSON
.github/workflows/ build + deploy GitHub Pages
```

## รันในเครื่อง

```bash
npm install
npm run dev        # http://localhost:3000/profiles/
npm test           # ตรวจข้อมูลใน data/
npm run build      # สร้างไฟล์ static ใน out/
```
