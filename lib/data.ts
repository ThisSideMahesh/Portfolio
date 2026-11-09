/**
 * Home page data. Every line traces to docs/PRD.md §6 (approved fact sheet).
 * All roles have ended, so everything is written in the past tense.
 */
import { taglines, type DoorId } from "@/lib/site";

export type OpenDoorData = {
  id: DoorId;
  name: string;
  tagline: string;
  href: `/${DoorId}`;
  locked: false;
  /** Shown on hover/focus: what is behind the door. */
  behind: readonly string[];
};

export type Door = OpenDoorData | { id: "creator"; name: string; tagline: string; locked: true };

export const doors: readonly Door[] = [
  {
    id: "tech",
    name: "Tech",
    tagline: taglines.tech,
    href: "/tech",
    locked: false,
    behind: ["MediIndex: full-stack plus Android", "1st place, HackSphere 2025", "Linux, cloud and hardware repair"],
  },
  {
    id: "teaching",
    name: "Teaching",
    tagline: taglines.teaching,
    href: "/teaching",
    locked: false,
    behind: ["MS-CIT: 25+ students trained", "Engineering Toolkit workshop", "Hackathon Hacked session"],
  },
  {
    id: "management",
    name: "Management",
    tagline: taglines.management,
    href: "/management",
    locked: false,
    behind: ["95+ campus recruitment drives", "125+ admission leads, 5 centres", "25,000+ monthly reach"],
  },
  {
    id: "creator",
    name: "Creator",
    tagline: "Lessons from what I've built, taught and run. It opens with the first episode.",
    locked: true,
  },
];

export type StoryYear = {
  year: number;
  entries: readonly { title: string; place: string; when: string; detail: string }[];
};

export const story: readonly StoryYear[] = [
  {
    year: 2026,
    entries: [
      {
        title: "President, Training, Placement and Entrepreneurship Student Cell",
        place: "MIT Chhatrapati Sambhajinagar",
        when: "Nov 2025 – Nov 2026",
        detail: "Led and coordinated 95+ campus recruitment drives: resume screening, shortlisting, interview scheduling and onboarding documentation.",
      },
      {
        title: "Workshop speaker, Engineering Toolkit",
        place: "AlumniOS CSE Cell",
        when: "Aug 2026",
        detail: "Co-delivered a workshop on Git, projects, AI tools and careers, built around Learn → Build → Show → Connect → Execute.",
      },
      {
        title: "Sales and Marketing Intern",
        place: "Dnyandeep Foundation Centre",
        when: "Jun 2026",
        detail: "Generated 125+ qualified admission leads across 5 centres and counselled students and parents.",
      },
      {
        title: "Session speaker, Hackathon Hacked",
        place: "Technophilia 2K26",
        when: "Apr 2026",
        detail: "Spoke on hackathons, career planning, resumes and personal branding.",
      },
    ],
  },
  {
    year: 2025,
    entries: [
      {
        title: "1st place, Cogni-Sphere 2025 HackSphere",
        place: "PharmaManage Pro, later MediIndex",
        when: "2025",
        detail: "A pharmacy platform with expiry alerts, role-based access and billing automation.",
      },
      {
        title: "Social Media Manager Intern",
        place: "Athlete Meets Explorer, remote",
        when: "Aug 2025 – Nov 2026",
        detail: "Ran LinkedIn, Instagram and YouTube content and reached 15,000+ engagements.",
      },
      {
        title: "AlumniOS Bridge Captain",
        place: "CSE Department",
        when: "Jul 2025 – Nov 2026",
        detail: "Connected students, alumni and the department for mentorship and placements.",
      },
      {
        title: "Hardware and Software Technician Intern",
        place: "New Technical World, Jalna",
        when: "Jun 2025; Nov – Dec 2025",
        detail: "Diagnosed desktop, laptop, printer and network faults and installed Windows systems.",
      },
      {
        title: "Technical Coordinator, Kalavihangam 2K23",
        place: "MIT Chhatrapati Sambhajinagar",
        when: "24 – 28 Feb 2025",
        detail: "Ran technical arrangements for an event with 1,000+ attendees.",
      },
    ],
  },
  {
    year: 2024,
    entries: [
      {
        title: "MS-CIT Trainer",
        place: "Vighnaharta E-Payment Data Centre",
        when: "Nov 2024 – Jan 2025",
        detail: "Trained 25+ students in computer fundamentals, MS Office and digital literacy.",
      },
    ],
  },
  {
    year: 2023,
    entries: [
      {
        title: "Started B.Tech, Computer Science and Engineering",
        place: "MIT Chhatrapati Sambhajinagar",
        when: "Aug 2023",
        detail: "Class of 2027.",
      },
    ],
  },
];

export type ContactIntent = { label: string; subject: string; body: string };

export const contactIntents: readonly ContactIntent[] = [
  {
    label: "A tech role",
    subject: "Tech role for Mahesh",
    body: "Hi Mahesh,\n\nI'm hiring for a tech role:\n\nRole:\nCompany:\nLink:\n\n",
  },
  {
    label: "A teaching role",
    subject: "Teaching or training role for Mahesh",
    body: "Hi Mahesh,\n\nI'm looking for someone to teach or train:\n\nSubject:\nOrganisation:\n\n",
  },
  {
    label: "A management role",
    subject: "Management or operations role for Mahesh",
    body: "Hi Mahesh,\n\nI'm hiring for a management or operations role:\n\nRole:\nCompany:\n\n",
  },
  { label: "Something else", subject: "Hello Mahesh", body: "Hi Mahesh,\n\n" },
];
