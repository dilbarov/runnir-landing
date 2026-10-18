import { createHash } from "node:crypto";
import privacy20261018 from "./privacy-2026-10-18";
import terms20261018 from "./terms-2026-10-18";
import type { Block, LegalDoc } from "./types";

export type { Block, LegalDoc } from "./types";

/**
 * Published versions, newest first. A published version is never edited:
 * a changed text is added as a new file with a new date, and the old one stays at its URL.
 */
export const LEGAL: Record<LegalDoc["slug"], LegalDoc[]> = {
  privacy: [privacy20261018],
  terms: [terms20261018],
};

export const DOC_NAMES: Record<LegalDoc["slug"], string> = { privacy: "Privacy Policy", terms: "Terms of Use" };

export const current = (slug: LegalDoc["slug"]) => LEGAL[slug][0];

export const findVersion = (slug: string, version: string) =>
  (LEGAL as Record<string, LegalDoc[] | undefined>)[slug]?.find((d) => d.version === version);

export const permalink = (d: LegalDoc) => `/legal/${d.slug}/${d.version}`;

export const longDate = (version: string) =>
  new Date(`${version}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const blockText = (b: Block) => (typeof b === "string" ? b : b.list.map((i) => `- ${i}`).join("\n"));

/** Plain-text form of a version: what the fingerprint is computed from. */
export function toText(d: LegalDoc) {
  return [`# ${d.title}`, `Version ${d.version}`, ...d.intro.map(blockText), ...d.sections.flatMap((s) => [`## ${s.h}`, ...s.blocks.map(blockText)])].join(
    "\n\n",
  );
}

export const sha256 = (d: LegalDoc) => createHash("sha256").update(toText(d)).digest("hex");
