# profiles — Portfolio

เว็บ Portfolio ส่วนตัว: ประวัติการทำงาน ผลงาน ทักษะ และเรื่องที่กำลังสนใจ
เพื่อให้นายจ้าง ผู้ร่วมงาน และคนที่กำลังหาคนร่วมโปรเจกต์รู้ว่าเราเป็นใคร และช่วยอะไรได้บ้าง

🌐 **https://supapong-maig.github.io/profiles/**

## แก้เนื้อหา

เนื้อหาทั้งหมดอยู่ในไฟล์ JSON ใน `data/` แก้ที่นี่ที่เดียว แล้ว push เข้า `main` เว็บจะอัปเดตเองภายในไม่กี่นาที

| ไฟล์ | ใช้ในส่วน |
|---|---|
| `data/profile.json` | หัวเว็บ, ภาพรวมโดยย่อ, ช่องทางติดต่อ |
| `data/focus.json` | สิ่งที่ผมสนใจและลงมือทำ |
| `data/journey.json` | เส้นทางของผม (ช่วงต่าง ๆ ของอาชีพ) |
| `data/experience.json` | ประสบการณ์ (เรียงใหม่ → เก่า, `phase` ต้องตรงกับ `journey.json`, `areas` ต้องตรงกับ `areas.json`) |
| `data/areas.json` | ตัวกรองด้านของประสบการณ์ |
| `data/projects.json` | ผลงาน |
| `data/stack.json` | หมวดเทคโนโลยี (ใช้สร้างตาราง "เทคโนโลยีที่ผ่านมา") และทักษะหลัก |
| `data/credentials.json` | การศึกษาและใบรับรอง |
| `data/changelog.json` | ประวัติการอัปเดต (เพิ่มรายการบนสุด) |

`npm test` จะตรวจว่าข้อมูลครบ ลำดับถูก และเทคโนโลยีทุกตัวใน `experience.json` มีหมวดใน `stack.json`

## Tech stack

| ส่วน | เทคโนโลยี |
|---|---|
| Framework | Next.js 16 (App Router, static export) · React 19 · TypeScript |
| หน้าตา | CSS ล้วน + design tokens · Chakra Petch, IBM Plex Sans Thai, IBM Plex Mono · รองรับ dark mode |
| เนื้อหา | JSON ใน `data/` เป็นแหล่งข้อมูลเดียว |
| ทดสอบ | `node:test` ตรวจความครบและรูปแบบข้อมูล |
| CI/CD | GitHub Actions → GitHub Pages |

## โครงสร้างโค้ด

```
app/(site)/        หน้าแรก (หน้าเดียว), updates, architecture
components/        Header, Footer, Rail (สารบัญ), ExperienceTimeline (กรองตามด้าน), Chips
lib/               โหลดข้อมูล + types, สารบัญ
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
