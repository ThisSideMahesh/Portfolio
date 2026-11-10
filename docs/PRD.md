# PRD: thissidemahesh portfolio

Status: draft for approval · Owner: Mahesh Namdev Khandebharad · Last updated: 2026-11-10

## 1. Problem and goal

Recruiters and hiring managers arrive from LinkedIn and spend **under a minute**. In that minute they must learn:

1. Who this is (name, field, stage: final-year B.Tech CSE, MIT Chhatrapati Sambhajinagar, 2023–2027).
2. Which of three tracks fits their opening: **Tech**, **Teaching** or **Management**.
3. One piece of proof per track.
4. How to make contact in one click.

The site is a personal brand under the username **thissidemahesh**. It is **not** branded as the future creator channel "Institutelevel-boy".

## 2. Audience

| Visitor | Arrives from | Needs within 60 s |
|---|---|---|
| Tech recruiter / engineering manager | LinkedIn | A shipped project, the stack, GitHub |
| Teaching / training coordinator | LinkedIn | Sessions delivered, student count, subjects |
| Operations / HR / management hiring | LinkedIn | The scale of work led (95+ drives), outcomes |

## 3. Identity (approved)

- **Name shown:** Mahesh Namdev Khandebharad
- **Dedication:** "Powered by श्री स्वामी समर्थ" with a flower, in the **footer of every page** only. Not in the hero, not on the doors. "A Polymath Boy. Driven by Curiosity." is not used.
- **Style:** Minimalist Professional (see DESIGN.md).
- **Door taglines (approved):**
  - Tech: "I build full-stack apps and fix the machines they run on."
  - Teaching: "25+ students trained; workshops on Git, AI and careers."
  - Management: "I led a student cell through 95+ campus recruitment drives."
- **Creator door:** locked. It will become an educational channel where Mahesh teaches from his own experience. Label "Locked, for now"; line "Lessons from what I've built, taught and run. It opens with the first episode."

## 4. Information architecture

| Route | Phase | Purpose |
|---|---|---|
| `/` | MVP | Loader, hero, four-door wall, featured work, story timeline, contact chooser |
| `/tech`, `/teaching`, `/management` | MVP | One page per door: tagline, roles, proof, skills, CTA |
| `/projects`, `/projects/[slug]` | MVP | Featured work as case pages (MDX) |
| `/contact` | MVP | Prefilled-email chooser and a simple form |
| `/privacy` | MVP | Privacy policy (form data, hosting, analytics once added) |
| `/writing`, `/writing/[slug]` | Phase 1 | MDX writing section |
| `/creator` | Phase 1 | Built, but returns 404 while `CREATOR_OPEN=false`. No empty page is ever reachable |

## 5. Content rules (locked)

1. Only facts from the CV and resumes. Never invent projects, metrics, roles or certificates.
2. Missing facts become `TODO` placeholders, and **the production build fails if any `TODO` remains**.
3. **Never publish** the phone number, home address, date of birth, CGPA or any score or percentage.
4. Red Hat: write **"Red Hat System Administration training (completed); RHCSA exam pending"**. Never "certified".
5. Hackathons: **one** win (1st place, Cogni-Sphere 2025 HackSphere). Never pluralised. The Central India Hackathon 3.0 result is "finalist", never a win.
6. All roles have ended (confirmed 2026-11-10): write them in the past tense, with dates.
7. Never use the words "coming soon".
8. The photo is cropped, resized, colour-balanced, converted to black and white, and (at Mahesh's request, 2026-11-10) has its background removed on-device with Apple Vision (`pnpm cutout`; nothing uploaded). The face and body are never altered, no image of Mahesh is generated, and EXIF data is stripped.
9. Public resume downloads (Phase 1) are created only after explicit approval and with private contact details removed.
10. The file `IMG_7128.jpg` in the resume folder belongs to someone else and is never used.

## 6. Approved fact sheet (source for `/content/*.mdx`)

**Education:** B.Tech, Computer Science and Engineering, MIT Chhatrapati Sambhajinagar, Aug 2023 – 2027 (start month confirmed by Mahesh). No scores.
**Location:** Jalna, Maharashtra (city only).
**Languages:** Marathi (native), Hindi (fluent), English (proficient).

### Experience (all past tense)

| Role | Organisation | Dates | Facts |
|---|---|---|---|
| Sales and Marketing Intern | Dnyandeep Foundation Centre, Chh. Sambhajinagar | Jun 2026 | 125+ qualified admission leads across 5 centres (Selu, Ambad, Deulgaon Raja, Sillod, Online); counselled students and parents; exam invigilation |
| Hardware and Software Technician Intern | New Technical World, Jalna | Jun 2025; Nov–Dec 2025 | Diagnosed desktop, laptop, printer and network faults; Windows installs; preventive maintenance |
| Freelance Video Editor | UHV Cell, MIT CSN | Oct 2025 | Promotional and event videos for the AICTE UHV FDP workshop |
| Social Media Manager Intern (remote) | Athlete Meets Explorer | Aug 2025 – Nov 2026 | LinkedIn, Instagram, YouTube; 15,000+ engagements |
| MS-CIT Trainer (part-time) | Vighnaharta E-Payment Data Centre | Nov 2024 – Jan 2025 | Trained 25+ students in computer fundamentals, MS Office, digital literacy |

### Positions of responsibility (all past tense)

| Role | Dates | Facts |
|---|---|---|
| President, Training, Placement and Entrepreneurship Student Cell | Nov 2025 – Nov 2026 | Led and coordinated 95+ campus recruitment drives (individual, pooled, mega); resume screening, shortlisting, interview scheduling, onboarding documentation; liaison with company HR and institute leadership |
| AlumniOS Bridge Captain, CSE | Jul 2025 – Nov 2026 | Alumni outreach, mentorship and placement communication |
| Student Coordinator, T&P Student Cell | Aug 2025 – Nov 2025 | Official social handle, 25,000+ monthly reach |
| Technical Coordinator, Kalavihangam 2K23 (name and year confirmed by Mahesh) | 24 – 28 Feb 2024 (corrected by Mahesh on 10 Nov 2026: first 2025, then 2023, finally 2024) | Technical arrangements for an event with 1,000+ attendees |
| Volunteer, first-year induction | 2023–2024 | Supported induction of 250+ first-year students |
| Member, Food Committee, MIT Boys Hostel | 2023–2024 | Quality checks, feedback, vendor coordination |
| Member, UHV Cell (Students Wing) | until 2026 | Universal Human Values activities |

### Teaching and talks

| Session | Where / when | Facts |
|---|---|---|
| Workshop Speaker: "Engineering Toolkit: Skills Beyond the Syllabus" | AlumniOS CSE Cell, MIT CSN · Aug 2026 | Co-delivered to 2nd and 3rd year students; Git/GitHub, projects, AI tools, internships, hackathons, resumes, portfolios; LLMs, prompting, hallucinations, context engineering, responsible AI; framework Learn → Build → Show → Connect → Execute |
| Session Speaker: Hackathon Hacked | Technophilia 2K26, MIT CSN · Apr 2026 | Hackathons, career planning, resumes, personal branding, AI tools |
| MS-CIT Trainer | see Experience | 25+ students |

### Projects

| Project | Facts |
|---|---|
| **MediIndex: Pharmacy Insights and Analytics** (B.Tech major project; grew out of PharmaManage Pro, which **won 1st place at Cogni-Sphere 2025 HackSphere**) | Node.js REST API; SQLite locally, PostgreSQL/Neon in production; inventory with batch tracking, expiry alerts, billing/POS, FEFO billing, demand forecasting, QR identification, inter-pharmacy stock; RBAC; idempotent stock operations; React Native / Expo / TypeScript Android app with QR scanning, offline queue and auto-sync; deployed on Vercel; backend, integration, regression and APK validation |
| Links on project cards (2026-11-10) | MediIndex: live site https://mediindex.vercel.app/, GitHub ThisSideMahesh/MediIndex, and PharmaManage Pro (HackSphere winner) ThisSideMahesh/PharmaManagePro. TeraPlay: GitHub ThisSideMahesh/TERAPLAY. Shop Management System: no link (client work, no public repo) |
| **TeraPlay: Video Streaming and Downloader** (featured on /tech from 2026-11-10) | Web application for video streaming and downloading; Node.js and Express.js (JavaScript); backend for video handling and streaming workflows; AI-assisted development workflow for rapid prototyping |
| **This portfolio** (featured on /tech from 2026-11-10) | Personal project; Next.js (App Router), React, TypeScript, Tailwind CSS; doors drawn in CSS and SVG; animated walks; light and dark themes; Lighthouse mobile 98 to 100; build-time content guard. GitHub: ThisSideMahesh/Portfolio |
| **Shop Management System** (freelance; featured on /tech from 2026-11-10) | Full-stack web development; management system for core shop operations and business workflows, built to client requirements |

### Achievements
- 1st place, Cogni-Sphere 2025 HackSphere (PharmaManage Pro)
- Finalist among 800+ teams, Central India Hackathon 3.0 (SwasthyaSetu, a healthcare interoperability platform)
- Karate: State Level Champion (1 gold, 2 silver); Open-National silver, IGK-Do Federation; 7th Kyu belt

### Certificates and learning (no scores)
Linux Administrator for Datacenter, Silver (NASSCOM) · Certified Linux Administrator, Linux Academy (via Unnati) · KuCL DevOps (Unnati) · Red Hat System Administration training, completed; RHCSA exam pending · Oracle Cloud Infrastructure 2025 Certified Foundations Associate · AWS Cloud Practitioner Essentials · AWS IoT Foundations · 64+ Google Cloud skill badges · Programming in Java (NPTEL, IIT Kharagpur) · AI in Industrial and Management Engineering (NPTEL, IIT Kanpur) · Building LLM Applications with Prompt Engineering (NVIDIA) · Introduction to Vibe Coding (Microsoft Learn) · Foundational C# (Microsoft) · Introduction to Data Science (Cisco) · Python Full Stack internship (Kiran Academy) · Programming in C and C++ (Disha Computer Institute) · MS-CIT · Cyber Security Foundation (Cyber Sanskar) · Advanced Digital Forensics Techniques (Belkasoft) · Basics of Social Media and Digital Marketing (NIELIT) · UHV 6-day workshop (AICTE, 2026) · Build With AI (GDG CSN) · LaunchLab · CNCF CSN May Meetup appreciation

## 7. Featured work (home page)

| Project | Door | Evidence | Why |
|---|---|---|---|
| MediIndex (incl. HackSphere 1st place) | Tech | CV, IT resume | Deepest shipped engineering, plus the one win |
| Engineering Toolkit workshop | Teaching | CV, teaching resume | Own framework, delivered to students |
| 95+ campus recruitment drives | Management | CV, management resume | Largest scale of work led |
| DFC admissions outreach | Management | CV, management resume | Concrete commercial result (125+ leads, 5 centres) |

## 8. Contact

- **Public:** email `thissidemahesh@gmail.com`, LinkedIn, GitHub, X, Instagram.
- **Profile URLs (confirmed by Mahesh, 2026-11-10):**
  - GitHub: https://github.com/ThisSideMahesh
  - LinkedIn: https://www.linkedin.com/in/maheshkhandebharad/
  - X: https://x.com/ThissideMahesh
  - Instagram: https://www.instagram.com/thisside_mahesh/
- **Contact chooser:** "Hiring for tech / teaching / management / something else". Each choice opens a `mailto:` with a prefilled subject and body.
- **Form:** name, email, message. Zod validation on client and server, honeypot field, minimum time-to-submit, per-IP rate limit. Sends through **Resend** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`). Until the domain is verified in Resend, it can only send from `onboarding@resend.dev` to the account owner's own email.

## 9. Domain and hosting

- Domain: **thissidemahesh.`<TLD>`**. The name is fixed; the TLD is not bought yet. The canonical URL comes from `NEXT_PUBLIC_SITE_URL`.
- Hosting: a **new** Vercel project. The domain is registered at Hostinger (DNS only). The old site stays live until the new one serves on the custom domain.
- The new GitHub repository starts **private**.

## 10. Non-goals

AI chat, admin panel, CMS, search, command palette, blog comments, scroll-sequence canvases, and anything copied from the old repository.

## 11. Success criteria

- A first-time visitor can name Mahesh's three tracks and reach contact within 60 seconds (hallway test with 3 people).
- Lighthouse mobile ≥ 90 for Performance, Accessibility, Best Practices and SEO at the end of every phase.
- WCAG AA contrast in both themes; the whole site works by keyboard alone.
- Zero `TODO`s and zero banned patterns (phone, "certified" with Red Hat, "hackathons won", "coming soon") in a production build.

## 7. Source-folder review, 2026-11-10 (what was read, what was added, what was left out)

Read: `certificates/` (40 files, images read with on-device OCR), `Competition/`, `Workshop-Bootcamp/`, the master CV (identical to the earlier `cv.pdf`, so nothing new in it) and the three resumes, and the READMEs and git history of the 20+ folders in `projects/`. Everything below is a fact seen in a file.

**Added to /tech**
- Kiran Academy: Industrial Training with Internship, Trainee Developer, Python Full Stack; completion certificate dated 27 Aug 2026 (no start date in the certificate, so none is shown).
- Cogni-Sphere 2025 HackSphere: first rank, IETE Student Forum, ECE department, MIT CSN, 13 and 14 Oct 2025 (certificate).
- Central India Hackathon 3.0: finalist (Unstop finalist page names Mahesh as team leader of Team Future; script: "builder and pitcher"); SwasthyaSetu = repo `Team_Future_3.8_SDG3` (PS 3.8, consent-driven health record aggregator).
- Hack For Impact: AI Hackathon, Technophilia 2K26, 11 Apr 2026 (certificate of participation). The clinical handoff tool (repo `02_TeamsFuture`, last pushed 11 Apr 2026, matches the Hack For Impact "Clinical Handoff Risk Intelligence" problem statement) is shown as a hackathon prototype; the repo README does not name the event, so this link is an inference to confirm with Mahesh.
- Aavishkar 2026, District Level, 29 Sep 2026: presented "Medicine Inventory and Expiry Management System with Demand Prediction for Medical Stores (Model)" (certificate 2295; registration form: Engineering and Technology).
- Projects with his own git history or public repo and a README: CanteenGo (repo canteengo), AgriSenseAI (repo AgriSenseAI), Cadriva (local repo, M0 foundation only, no remote; shown as "In early development" with no link).
- Certificates seen as files and now listed: Cisco Introduction to IoT (19 Apr 2026), AWS SimuLearn Cloud Practitioner (2 Sep 2025), AWS Forage Solutions Architecture job simulation (Jul 2025), Microsoft and LinkedIn Learning Career Essentials in Generative AI (15 Jun 2024), Google Cloud Study Jam, GDSC MIT (8 Dec 2023), CNCF CSN May Meetup (24 May 2026), Cyber Sanskar Ethical Hacking workshop attendance, Disha Computer Institute programming course (no marks shown).
- Engineering Toolkit workshop: held 21 Aug 2026 (speaker certificate); the workshop report (24 Aug 2026) records 62 student feedback responses, 57 of them 4 or 5 out of 5. Shown on /teaching.

**Seen but not published**
- A company offer letter for a business development internship: an offer only, with pay and target terms; no evidence it was taken up. Not used.
- Smart India Hackathon 2026, BIS SmartGuide: a team nomination form with blank fields and a README; no evidence of selection. Not used.
- KeySound: the README says it is a macOS development build that is not fully verified. Not featured. Sevakari: the README is an empty template. Not featured.
- Marks of any kind (course marks, institute marks, CGPA, school results): never published.
- Phone numbers (in the CV, the CIH documents and the offer letter) and the PRN number: never published.
- Credentials in the CV that no file in the folder proves (Red Hat, Linux Academy, KuCL): left as they were; Red Hat stays "training completed, exam pending".
