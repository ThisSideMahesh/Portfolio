import type { Metadata } from "next";
import { DoorPage } from "@/components/door-page/door-page";
import { doorPages } from "@/lib/door-pages";

const page = doorPages.tech;

export const metadata: Metadata = { title: "Tech", description: page.intro, alternates: { canonical: "/tech" } };

export default function TechPage() {
  return <DoorPage page={page} />;
}
