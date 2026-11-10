/**
 * Public site facts. Source of truth: docs/PRD.md §3 and §8.
 * Only the contact details listed in PRD §8 belong here; PRD §5 lists what is never published.
 */

const FALLBACK_URL = "http://localhost:3000";

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL once the domain thissidemahesh.<tld> exists. */
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL);

export const site = {
  name: "Mahesh Namdev Khandebharad",
  username: "thissidemahesh",
  email: "thissidemahesh@gmail.com",
  description:
    "Mahesh Namdev Khandebharad: a final-year B.Tech CSE student at MIT Chhatrapati Sambhajinagar, working across tech, teaching and management.",
} as const;

/** The Master CV in public/, served as it was supplied. Used by the hero button, the door pages and the footer. */
export const cv = {
  href: "/Mahesh-Namdev-Khandebharad-Master-CV.pdf",
  filename: "Mahesh-Namdev-Khandebharad-Master-CV.pdf",
  note: "PDF, 5 pages, 200 KB",
} as const;

export type SocialLink = { label: string; href: string };

export const socials: readonly SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maheshkhandebharad/" },
  { label: "GitHub", href: "https://github.com/ThisSideMahesh" },
  { label: "X", href: "https://x.com/ThissideMahesh" },
  { label: "Instagram", href: "https://www.instagram.com/thisside_mahesh/" },
];

export type DoorId = "tech" | "teaching" | "management";

/** Approved taglines, one per door (PRD §3). */
export const taglines: Readonly<Record<DoorId, string>> = {
  tech: "I build full-stack apps and fix the machines they run on.",
  teaching: "25+ students trained; workshops on Git, AI and careers.",
  management: "I led a student cell through 95+ campus recruitment drives.",
};

/**
 * Roles on the hero flip calendar, one per door. Each is grounded in the CV:
 * MediIndex (full-stack), MS-CIT trainer and workshops, "led and coordinated 95+ campus
 * recruitment drives" as President of the Training & Placement Cell (Campus Recruitment &
 * Placement Operations Lead: Mahesh's chosen title for TPO and campus-hiring roles), and video editing plus social media management
 * (UHV Cell, Athlete Meets Explorer) for Digital Creator.
 * The longest role wraps onto two lines; the card is always two lines tall (globals.css).
 */
export const heroRoles = ["Full-Stack Developer", "Technical Trainer", "Campus Recruitment & Placement Operations Lead", "Digital Creator"] as const;

/** Feature flag for the Creator door. Anything other than the string "true" keeps it locked. */
export const creatorOpen = process.env.CREATOR_OPEN === "true";
