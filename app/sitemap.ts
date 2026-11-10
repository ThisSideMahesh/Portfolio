import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const PATHS = ["/", "/tech", "/teaching", "/management"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
