import type { Metadata } from "next";
import { NAME, TITLE } from "./content";

// Static JPEG (small enough for WhatsApp and other messengers). Regenerate it from the /og.png route after design changes.
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: TITLE, type: "image/jpeg" };

/** Shared Open Graph / Twitter fields, so pages that override titles keep the site name and preview image. */
export function social(title: string, description: string, url: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { type: "website", siteName: NAME, locale: "en_US", url, title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
