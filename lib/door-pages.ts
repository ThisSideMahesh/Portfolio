/**
 * Content for /tech, /teaching and /management. Every line traces to docs/PRD.md §6.
 * Visuals are drawn from facts (diagrams, numbers, lists); there are no project screenshots
 * yet, so none are faked.
 */
import type { DoorId } from "@/lib/site";

export type CaseVisual =
  | { kind: "stat"; value: string; label: string }
  | { kind: "flow"; steps: readonly string[] }
  | { kind: "stack"; layers: readonly { name: string; detail: string }[] }
  | { kind: "tags"; items: readonly string[] };

/** An outside link on a card (live site, GitHub). Always opens in a new tab. */
export type CaseLink = { label: string; href: string };

export type CaseStudy = {
  kicker: string;
  title: string;
  when: string;
  summary: string;
  points: readonly string[];
  links?: readonly CaseLink[];
  visual: CaseVisual;
};

/** A titled group of cases that the page shows as one swipeable row of cards. */
export type CaseSection = {
  id: string;
  title: string;
  cases: readonly CaseStudy[];
};

/** A door page is either a plain stack of cases or a list of swipeable sections. */
export type DoorPage = {
  id: DoorId;
  title: string;
  intro: string;
  cases?: readonly CaseStudy[];
  sections?: readonly CaseSection[];
};

export const doorPages: Readonly<Record<DoorId, DoorPage>> = {
  tech: {
    id: "tech",
    title: "Tech",
    intro: "Full-stack apps, Linux systems and the hardware they run on.",
    sections: [
      {
        id: "projects",
        title: "Projects",
        cases: [
          {
            kicker: "B.Tech major project",
            title: "MediIndex",
            when: "Grew out of PharmaManage Pro, which won 1st place at Cogni-Sphere 2025 HackSphere",
            summary:
              "A pharmacy platform for inventory, billing and expiry tracking, with an Android app that keeps working offline.",
            points: [
              "REST API in Node.js; SQLite for local development, PostgreSQL on Neon in production",
              "Batch-wise stock, FEFO billing, expiry alerts, demand forecasting and QR identification",
              "Role-based access, audited stock movements and idempotent stock operations",
              "React Native and Expo app with QR scanning, an offline queue and automatic sync; deployed on Vercel",
            ],
            visual: {
              kind: "stack",
              layers: [
                { name: "Android app", detail: "React Native, Expo, TypeScript" },
                { name: "REST API", detail: "Node.js on Vercel" },
                { name: "Database", detail: "PostgreSQL on Neon (SQLite locally)" },
              ],
            },
            links: [
              { label: "Live site", href: "https://mediindex.vercel.app/" },
              { label: "GitHub", href: "https://github.com/ThisSideMahesh/MediIndex" },
              { label: "PharmaManage Pro (HackSphere winner)", href: "https://github.com/ThisSideMahesh/PharmaManagePro" },
            ],
          },
          {
            kicker: "Project",
            title: "TeraPlay: Video Streaming and Downloader",
            when: "Node.js · Express.js · JavaScript",
            summary: "A web application for streaming and downloading video.",
            points: [
              "Developed the web application with Node.js and Express.js",
              "Implemented the backend for video handling and streaming workflows",
              "Built with an AI-assisted development workflow for rapid prototyping",
            ],
            links: [{ label: "GitHub", href: "https://github.com/ThisSideMahesh/TERAPLAY" }],
            visual: { kind: "tags", items: ["Node.js", "Express.js", "JavaScript", "Video streaming", "Downloads", "AI-assisted"] },
          },
          {
            kicker: "Freelance project",
            title: "Shop Management System",
            when: "Full-stack web development",
            summary: "A management system for a client's core shop operations and business workflows.",
            points: [
              "Developed the full-stack web application to the client's requirements",
              "Supports core shop operations and business workflows",
            ],
            visual: { kind: "tags", items: ["Full-stack web", "Freelance", "Client requirements", "Business workflows"] },
          },
          {
            kicker: "Personal project",
            title: "This portfolio",
            when: "Next.js · TypeScript · Tailwind CSS",
            summary: "The site you are on: one door for each side of my work, designed and built end to end.",
            points: [
              "Built with Next.js (App Router), React and TypeScript, styled with Tailwind CSS",
              "Doors drawn in CSS and SVG, with animated walks between pages and light and dark themes",
              "Scores 98 to 100 on Lighthouse for performance, accessibility, best practices and SEO on mobile",
              "Checks its own content at build time, so private details never reach the site",
            ],
            links: [{ label: "GitHub", href: "https://github.com/ThisSideMahesh/Portfolio" }],
            visual: { kind: "tags", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "CSS and SVG art", "Accessible"] },
          },
        ],
      },
      {
        id: "experience",
        title: "Professional experience",
        cases: [
          {
            kicker: "Internship",
            title: "Hardware and Software Technician Intern",
            when: "New Technical World, Jalna · Jun 2025; Nov – Dec 2025",
            summary: "Hands-on servicing for customers' machines, from diagnosis to repair.",
            points: [
              "Diagnosed and fixed desktop, laptop, printer and networking faults",
              "Installed, configured and maintained Windows and essential software",
              "Performed preventive maintenance and hardware replacement",
            ],
            visual: { kind: "tags", items: ["Desktops", "Laptops", "Printers", "Networks", "Windows", "Assembly"] },
          },
        ],
      },
      {
        id: "campus",
        title: "Positions of responsibility and campus experience",
        cases: [
          {
            kicker: "Technical Coordinator",
            title: "Kalavihangam 2K23",
            when: "MIT CSN · 24 – 28 Feb 2025",
            summary: "Ran the technical arrangements for a campus event.",
            points: ["Technical Coordinator for an event with 1,000+ attendees"],
            visual: { kind: "stat", value: "1,000+", label: "event attendees" },
          },
          {
            kicker: "Hackathon",
            title: "Central India Hackathon 3.0",
            when: "SwasthyaSetu, a healthcare interoperability platform",
            summary: "Reached the finals of a large inter-college hackathon.",
            points: ["Finalist among 800+ teams", "Built SwasthyaSetu, a healthcare interoperability platform"],
            visual: { kind: "stat", value: "800+", label: "teams, with SwasthyaSetu a finalist" },
          },
          {
            kicker: "Workshop speaker",
            title: "Engineering Toolkit: Skills Beyond the Syllabus",
            when: "AlumniOS CSE Cell, MIT CSN · Aug 2026",
            summary: "Co-delivered a workshop on the tools engineers use beyond the syllabus.",
            points: [
              "Covered Git and GitHub, projects and AI tools",
              "Explained LLMs, prompting, hallucinations, context engineering and responsible AI",
            ],
            visual: { kind: "flow", steps: ["Learn", "Build", "Show", "Connect", "Execute"] },
          },
        ],
      },
      {
        id: "certificates",
        title: "Certificates and learning",
        cases: [
          {
            kicker: "Cloud and systems",
            title: "Certificates and badges",
            when: "Ongoing",
            summary: "Linux administration, cloud foundations and AI tooling.",
            points: [
              "Red Hat System Administration training, completed; RHCSA exam pending",
              "Linux Administrator for Datacenter, Silver (NASSCOM)",
              "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
              "AWS Cloud Practitioner Essentials; Programming in Java (NPTEL, IIT Kharagpur)",
            ],
            visual: { kind: "stat", value: "64+", label: "Google Cloud skill badges" },
          },
        ],
      },
    ],
  },
  teaching: {
    id: "teaching",
    title: "Teaching",
    intro: "From computer basics to Git and AI, taught in Marathi, Hindi and English.",
    cases: [
      {
        kicker: "Workshop speaker",
        title: "Engineering Toolkit: Skills Beyond the Syllabus",
        when: "AlumniOS CSE Cell, MIT CSN · Aug 2026",
        summary: "Co-delivered an interactive workshop for second- and third-year engineering students.",
        points: [
          "Covered Git and GitHub, projects, AI tools, internships, hackathons, resumes and portfolios",
          "Explained LLMs, prompting, hallucinations, context engineering and responsible AI",
          "Built the session around a five-step framework",
        ],
        visual: { kind: "flow", steps: ["Learn", "Build", "Show", "Connect", "Execute"] },
      },
      {
        kicker: "Trainer, part-time",
        title: "MS-CIT Trainer",
        when: "Vighnaharta E-Payment Data Centre · Nov 2024 – Jan 2025",
        summary: "Taught the MS-CIT curriculum with practical lab sessions.",
        points: [
          "Covered computer fundamentals, MS Office and digital literacy",
          "Ran practical sessions, assessments and doubt-solving",
          "Improved students' proficiency with computer operations, documents and basic IT tools",
        ],
        visual: { kind: "stat", value: "25+", label: "students trained" },
      },
      {
        kicker: "Session speaker",
        title: "Hackathon Hacked",
        when: "Technophilia 2K26, MIT CSN · Apr 2026",
        summary: "A session on turning ideas into projects and careers.",
        points: [
          "Hackathons, career planning, resume building and personal branding",
          "Guided students on converting ideas into practical projects",
          "Internships, technical competitions and responsible AI use",
        ],
        visual: { kind: "tags", items: ["Hackathons", "Career planning", "Resumes", "Personal branding", "AI tools"] },
      },
    ],
  },
  management: {
    id: "management",
    title: "Management",
    intro: "Recruitment drives, admissions outreach and student events.",
    cases: [
      {
        kicker: "President",
        title: "Training, Placement and Entrepreneurship Student Cell",
        when: "MIT CSN · Nov 2025 – Nov 2026",
        summary: "Led the student side of campus recruitment.",
        points: [
          "Coordinated individual, pooled and mega campus drives",
          "Ran resume screening, shortlisting, interview scheduling and onboarding documentation",
          "Liaised with company HR, placement officers and institute leadership",
        ],
        visual: { kind: "stat", value: "95+", label: "campus recruitment drives" },
      },
      {
        kicker: "Sales and Marketing Intern",
        title: "Dnyandeep Foundation Centre",
        when: "Chhatrapati Sambhajinagar · Jun 2026",
        summary: "Admissions outreach across five centres, alongside semester exams.",
        points: [
          "Generated qualified admission leads in Selu, Ambad, Deulgaon Raja, Sillod and online batches",
          "Counselled students and parents about programmes",
          "Coordinated with centre heads on admissions and examinations",
        ],
        visual: { kind: "stat", value: "125+", label: "qualified admission leads" },
      },
      {
        kicker: "Community and content",
        title: "Social media for the T&P cell and Athlete Meets Explorer",
        when: "Aug 2025 – Nov 2026",
        summary: "Ran official channels and content calendars.",
        points: [
          "Reached 25,000+ people a month through the T&P cell's official handle",
          "Managed LinkedIn, Instagram and YouTube for Athlete Meets Explorer, with 15,000+ engagements",
          "Planned content calendars and tracked analytics",
        ],
        visual: { kind: "stat", value: "25,000+", label: "monthly reach" },
      },
      {
        kicker: "Events",
        title: "Kalavihangam 2K23 and first-year induction",
        when: "MIT CSN · 24 – 28 Feb 2025; induction 2023 – 2024",
        summary: "Technical coordination and onboarding at scale.",
        points: [
          "Technical Coordinator for an event with 1,000+ attendees",
          "Helped induct 250+ first-year students",
          "Food Committee member: quality checks and vendor coordination",
        ],
        visual: { kind: "stat", value: "1,000+", label: "event attendees" },
      },
    ],
  },
};
