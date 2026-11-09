import { Anek_Devanagari, Anek_Latin, Hind } from "next/font/google";

/** Display face. Variable weight plus the width axis used for the wide hero name and condensed door names. */
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

/** Text face for body, labels, buttons and forms. */
export const hind = Hind({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-hind",
  display: "swap",
});
