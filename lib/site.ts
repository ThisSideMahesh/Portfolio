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
    "Mahesh Namdev Khandebharad: final-year B.Tech CSE student at MIT Chhatrapati Sambhajinagar, working across tech, teaching and management.",
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

/** Feature flag for the Creator door. Anything other than the string "true" keeps it locked. */
export const creatorOpen = process.env.CREATOR_OPEN === "true";
