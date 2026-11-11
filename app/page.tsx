import type { Metadata } from "next";
import { ContactBand } from "@/components/home/contact-band";
import { DoorWall } from "@/components/home/door-wall";
import { Hero } from "@/components/home/hero";
import { Story } from "@/components/home/story";

export const metadata: Metadata = {
  title: { absolute: "Mahesh Namdev Khandebharad | Tech, Teaching and Management" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <DoorWall />
      <Story />
      <ContactBand />
    </>
  );
}
