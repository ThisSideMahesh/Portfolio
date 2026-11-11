import type { Metadata } from "next";
import { DoorPage } from "@/components/door-page/door-page";
import { doorPages } from "@/lib/door-pages";

const page = doorPages.management;

export const metadata: Metadata = { title: "Management", description: page.intro, alternates: { canonical: "/management" } };

export default function ManagementPage() {
  return <DoorPage page={page} />;
}
