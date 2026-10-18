import type { Metadata } from "next";
import { COMPANY } from "../content";
import { DOC_NAMES, LEGAL, permalink, type LegalDoc } from ".";

export function legalMetadata(doc: LegalDoc, path: string): Metadata {
  const isCurrent = LEGAL[doc.slug][0].version === doc.version;
  const description =
    doc.slug === "privacy"
      ? `How ${COMPANY} handles personal data on the Runnir website and in the Runnir macOS app.`
      : `Terms for using the Runnir website and services operated by ${COMPANY}.`;
  return {
    title: isCurrent ? DOC_NAMES[doc.slug] : `${DOC_NAMES[doc.slug]} (version ${doc.version})`,
    description,
    // The in-force version is canonical at /privacy or /terms; old versions are their own page
    alternates: { canonical: isCurrent ? `/${doc.slug}` : path },
    openGraph: { title: `${doc.title}`, description, url: isCurrent ? `/${doc.slug}` : permalink(doc) },
  };
}
