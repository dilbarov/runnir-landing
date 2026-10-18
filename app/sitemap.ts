import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { current } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/index.md`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/llms.txt`, lastModified, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(current("privacy").version), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(current("terms").version), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
