import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/LegalArticle";
import { LegalShell } from "@/components/LegalShell";
import { findVersion, LEGAL, permalink } from "@/lib/legal";
import { legalMetadata } from "@/lib/legal/meta";

type Params = Promise<{ doc: string; version: string }>;

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(LEGAL).flatMap((versions) => versions.map((d) => ({ doc: d.slug, version: d.version })));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { doc, version } = await params;
  const d = findVersion(doc, version);
  return d ? legalMetadata(d, permalink(d)) : {};
}

export default async function Page({ params }: { params: Params }) {
  const { doc, version } = await params;
  const d = findVersion(doc, version);
  if (!d) notFound();
  return (
    <LegalShell>
      <LegalArticle doc={d} />
    </LegalShell>
  );
}
