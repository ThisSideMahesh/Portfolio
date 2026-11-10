/**
 * Content for /tech, /teaching and /management. Every line traces to docs/PRD.md §6.
 * Visuals are drawn from facts (diagrams, numbers, lists); there are no project screenshots
 * yet, so none are faked.
 */
import type { DoorId } from "@/lib/site";

/** A real image from Mahesh's own work (a screenshot or a logo), prepared by hand into public/images/work. */
export type WorkImage = { src: string; width: number; height: number; alt: string };

export type CaseVisual =
  | { kind: "stat"; value: string; label: string }
  /** One or two real screenshots in a window-like frame (the second overlaps the first). */
  | { kind: "screens"; images: readonly WorkImage[] }
  /** One logo on a light tile. */
  | { kind: "logo"; image: WorkImage }
  /** Issuer logos on light tiles, with an optional line under them. */
  | { kind: "logos"; logos: readonly WorkImage[]; note?: string }
  /** A drawn monogram for work that has no screenshot or logo: type on a blueprint grid. */
  | { kind: "mark"; mark: string; caption: string }
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
              kind: "screens",
              images: [
                { src: "/images/work/mediindex-dashboard.webp", width: 1400, height: 770, alt: "MediIndex dashboard with total medicines, units in stock, expired batches, expiring-soon and low-stock counts" },
                { src: "/images/work/mediindex-expiry.webp", width: 1400, height: 770, alt: "MediIndex expiry alerts list showing an expired batch and batches close to expiry, each with an Acknowledge button" },
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
            visual: { kind: "logo", image: { src: "/images/work/teraplay-logo.webp", width: 700, height: 186, alt: "TeraPlay logo: a play button beside the name, with the words Video Streaming under it" } },
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
            visual: { kind: "mark", mark: "SMS", caption: "Built to a client's brief for day-to-day shop operations" },
          },
          {
            kicker: "Project",
            title: "CanteenGo: College Canteen Pre-Order System",
            when: "HTML · CSS · JavaScript · Node.js · Express.js · MongoDB",
            summary: "A working MVP that lets students pre-order from the canteen menu and skip the queue.",
            points: [
              "Students browse the menu, filter by category, fill a cart and check out with just a name",
              "Every order gets a unique Order ID and a live status: placed, preparing, ready, collected",
              "A kitchen dashboard shows new orders as they arrive and updates their status in one click",
              "Back end in Node.js and Express.js with MongoDB (Mongoose); a responsive vanilla JavaScript front end",
            ],
            links: [{ label: "GitHub", href: "https://github.com/ThisSideMahesh/canteengo" }],
            visual: { kind: "flow", steps: ["Browse the menu", "Pre-order", "Get an Order ID", "Collect when ready"] },
          },
          {
            kicker: "Project",
            title: "AgriSenseAI: Crop Recommendation System",
            when: "Python · Streamlit · scikit-learn",
            summary: "Recommends the best crop for a field from soil and climate data.",
            points: [
              "Random Forest model trained on 2,200 soil and climate samples covering 22 crops",
              "Farmer Mode needs no soil test; Expert Mode takes exact values for N, P, K, pH, temperature, humidity and rainfall",
              "Pulls live weather through the Open-Meteo and Nominatim APIs",
              "Shows the recommended crop, a confidence score and the top alternative crops",
            ],
            links: [{ label: "GitHub", href: "https://github.com/ThisSideMahesh/AgriSenseAI" }],
            visual: {
              kind: "screens",
              images: [
                { src: "/images/work/agrisense-farmer.webp", width: 1400, height: 615, alt: "AgriSenseAI Farmer Mode: simple questions about soil, last crop and fertiliser, with live weather for the chosen place" },
                { src: "/images/work/agrisense-expert.webp", width: 1400, height: 615, alt: "AgriSenseAI Expert Mode: entry fields for nitrogen, phosphorus, potassium, pH, temperature, humidity and rainfall" },
              ],
            },
          },
          {
            kicker: "Hackathon prototype",
            title: "Clinical Handoff Risk Intelligence",
            when: "React · Vite · FastAPI · Python",
            summary: "An offline decision-support tool that flags risky gaps when a hospital shift hands over its patients.",
            points: [
              "Works entirely offline, with no internet or outside APIs",
              "A rule-based engine surfaces risks such as low oxygen saturation, missed medication and unconfirmed lab results",
              "Separate nurse and doctor roles for entering and confirming data",
              "Reads medical reports (PDF and images) with local OCR and graphs heart rate, oxygen and temperature trends",
            ],
            links: [{ label: "GitHub", href: "https://github.com/ThisSideMahesh/02_TeamsFuture" }],
            visual: {
              kind: "stack",
              layers: [
                { name: "Web app", detail: "React, Vite, Zustand, Tailwind CSS, Recharts" },
                { name: "Risk engine and OCR", detail: "FastAPI, Python, PyTesseract" },
                { name: "Storage", detail: "Local JSON, Pydantic validation" },
              ],
            },
          },
          {
            kicker: "In early development",
            title: "Cadriva: Campus Recruitment and Career Management Platform",
            when: "Next.js · NestJS · PostgreSQL · Docker",
            summary: "A platform to run campus recruitment and career management, planned as a pilot at MIT CSN.",
            points: [
              "Wrote the product blueprint and confirmed the first scope: a pilot at MIT CSN with nine features",
              "Built and tested the foundation: a Next.js web app, a NestJS API with a background worker and shared contracts",
              "Local Docker setup for PostgreSQL, with secret scanning on every commit",
            ],
            visual: { kind: "logo", image: { src: "/images/work/cadriva-logo.webp", width: 900, height: 292, alt: "Cadriva logo: an orange interlocking C mark beside the name" } },
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
            visual: { kind: "screens", images: [{ src: "/images/work/portfolio-home.webp", width: 1400, height: 875, alt: "The home page of this portfolio in dark theme: the greeting, the role calendar and a black and white portrait" }] },
          },
        ],
      },
      {
        id: "experience",
        title: "Professional experience",
        cases: [
          {
            kicker: "Industrial training and internship",
            title: "Trainee Developer, Python Full Stack",
            when: "Kiran Academy · Completion certificate, 27 Aug 2026",
            summary: "Worked as a Trainee Developer on an industrial project.",
            points: [
              "Developed an industrial project under the guidance of Kiran Academy's expert technical team",
              "Technology: Python Full Stack",
            ],
            visual: { kind: "logo", image: { src: "/images/work/logos/kiran-academy.webp", width: 640, height: 137, alt: "Kiran Academy, IT Training Institute" } },
          },
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
        id: "competitions",
        title: "Hackathons and competitions",
        cases: [
          {
            kicker: "1st place",
            title: "Cogni-Sphere 2025 HackSphere",
            when: "IETE Student Forum, MIT CSN · 13 – 14 Oct 2025",
            summary: "Secured first rank in a two-day technical event with PharmaManage Pro.",
            points: [
              "A full-stack pharmacy management system with automated expiry alerts and 2D inventory mapping",
              "Secure role-based access, billing automation and inter-pharmacy collaboration tools",
            ],
            links: [{ label: "GitHub", href: "https://github.com/ThisSideMahesh/PharmaManagePro" }],
            visual: { kind: "stat", value: "1st", label: "place, Cogni-Sphere 2025 HackSphere" },
          },
          {
            kicker: "Finalist",
            title: "Central India Hackathon 3.0",
            when: "SwasthyaSetu · Team Future",
            summary: "Reached the finals of an SDG hackathon with a secure healthcare interoperability platform.",
            points: [
              "Finalist among 800+ teams",
              "Led Team Future as the builder and pitcher",
              "SwasthyaSetu brings fragmented hospital records into one consent-driven view, with limited emergency access",
            ],
            links: [{ label: "GitHub", href: "https://github.com/ThisSideMahesh/Team_Future_3.8_SDG3" }],
            visual: { kind: "logo", image: { src: "/images/work/swasthyasetu-logo.webp", width: 279, height: 279, alt: "SwasthyaSetu logo: a bridge and a leaf around a caduceus, with the words Ek Jeevan, Ek Swasthya Drishti" } },
          },
          {
            kicker: "Hackathon",
            title: "Hack For Impact: AI Hackathon",
            when: "Technophilia 2K26, MIT CSN · 11 Apr 2026",
            summary: "Took part in a national-level AI hackathon organised by the CSE department.",
            points: [
              "Competed with Team Future in the offline prototyping round",
              "Built an offline clinical handoff risk tool (see Projects)",
            ],
            visual: { kind: "tags", items: ["AI hackathon", "National level", "Prototype", "Team Future"] },
          },
          {
            kicker: "Presented",
            title: "Aavishkar 2026, District Level",
            when: "MIT CSN · 29 Sep 2026",
            summary: "Presented a working model of a medicine inventory and expiry management system.",
            points: [
              "Entered the Engineering and Technology category",
              "Medicine Inventory and Expiry Management System with Demand Prediction for Medical Stores",
            ],
            visual: { kind: "mark", mark: "AV", caption: "District-level research convention, Engineering and Technology" },
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
            kicker: "Workshop speaker",
            title: "Engineering Toolkit: Skills Beyond the Syllabus",
            when: "AlumniOS CSE Cell, MIT CSN · 21 Aug 2026",
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
            title: "Linux, cloud and DevOps",
            when: "2025 – 2026",
            summary: "Linux administration, cloud foundations and hands-on labs.",
            points: [
              "Red Hat System Administration training, completed; RHCSA exam pending",
              "Linux Administrator for Datacenter, Silver (NASSCOM)",
              "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
              "AWS Cloud Practitioner Essentials, AWS IoT Foundations and AWS SimuLearn: Cloud Practitioner",
              "AWS Solutions Architecture job simulation (Forage, Jul 2025)",
            ],
            visual: {
              kind: "logos",
              logos: [
                { src: "/images/work/logos/oracle.webp", width: 640, height: 97, alt: "Oracle" },
                { src: "/images/work/logos/nasscom.webp", width: 640, height: 187, alt: "nasscom IT-ITeS Sector Skill Council" },
              ],
              note: "and 64+ Google Cloud skill badges",
            },
          },
          {
            kicker: "Programming, AI and data",
            title: "Code, AI and data",
            when: "2024 – 2026",
            summary: "Languages, generative AI and data science, from university courses and industry programmes.",
            points: [
              "Programming in Java (NPTEL, IIT Kharagpur)",
              "Artificial Intelligence in Industrial and Management Engineering (NPTEL, IIT Kanpur)",
              "Building LLM Applications with Prompt Engineering (NVIDIA)",
              "Career Essentials in Generative AI (Microsoft and LinkedIn Learning); Introduction to Vibe Coding (Microsoft Learn)",
              "Foundational C# with Microsoft (freeCodeCamp); Introduction to Data Science and Introduction to IoT (Cisco Networking Academy)",
              "Programming in C and C++ (Disha Computer Institute)",
            ],
            visual: { kind: "logo", image: { src: "/images/work/logos/cisco-networking-academy.webp", width: 640, height: 148, alt: "Cisco Networking Academy" } },
          },
          {
            kicker: "Security and digital skills",
            title: "Cybersecurity and digital skills",
            when: "Workshops and courses",
            summary: "Security foundations, digital forensics and everyday digital skills.",
            points: [
              "Cyber Security Foundation and an Ethical Hacking workshop (Cyber Sanskar)",
              "Advanced Digital Forensics Techniques (Belkasoft)",
              "MS-CIT (Maharashtra State Certificate in Information Technology)",
              "Basics of Social Media and Digital Marketing (NIELIT)",
            ],
            visual: { kind: "tags", items: ["Cyber security", "Digital forensics", "Ethical hacking", "MS-CIT", "Digital marketing"] },
          },
          {
            kicker: "Workshops and meetups",
            title: "Workshops and community",
            when: "2023 – 2026",
            summary: "Hands-on workshops and community events beyond the syllabus.",
            points: [
              "Build With AI hands-on workshop (GDG Chhatrapati Sambhajinagar)",
              "LaunchLab: Code Beyond the Basics",
              "CNCF CSN May Meetup, certificate of appreciation (24 May 2026)",
              "Google Cloud Study Jam, Google Developer Student Clubs MIT (Dec 2023)",
              "6-day Student Workshop on Universal Human Values (AICTE, Mar – Apr 2026)",
            ],
            visual: { kind: "logo", image: { src: "/images/work/logos/gdg.webp", width: 407, height: 98, alt: "Google Developer Groups" } },
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
        when: "AlumniOS CSE Cell, MIT CSN · 21 Aug 2026",
        summary: "Co-delivered an interactive workshop for second- and third-year engineering students.",
        points: [
          "Covered Git and GitHub, projects, AI tools, internships, hackathons, resumes and portfolios",
          "Explained LLMs, prompting, hallucinations, context engineering and responsible AI",
          "Built the session around a five-step framework",
          "57 of 62 student feedback responses rated it 4 or 5 out of 5",
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
