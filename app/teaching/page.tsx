import type { Metadata } from "next";
import { DoorPage } from "@/components/door-page/door-page";
import { doorPages } from "@/lib/door-pages";

const page = doorPages.teaching;

export const metadata: Metadata = { title: "Teaching", description: page.intro, alternates: { canonical: "/teaching" } };

export default function TeachingPage() {
  return <DoorPage page={page} />;
}
