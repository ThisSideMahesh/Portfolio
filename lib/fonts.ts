import { Anek_Devanagari, Anek_Latin, Geist, Geist_Mono } from "next/font/google";

/** The door set's own face: the brass plates, the caution tape, the door names and the portrait tagline keep it. */
export const anek = Anek_Latin({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-anek",
  display: "swap",
});

/** Devanagari companion, used only for the footer dedication line, so it is not preloaded. */
export const anekDeva = Anek_Devanagari({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-anek-deva",
  display: "swap",
  preload: false,
});

/** Headings and body text everywhere outside the door set. A variable font, so light weights are free. */
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Small labels, dates and figures: the engineer's touch. Not preloaded, because the first screen barely uses it. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});
