import { LegalArticle } from "@/components/LegalArticle";
import { LegalShell } from "@/components/LegalShell";
import { current } from "@/lib/legal";
import { legalMetadata } from "@/lib/legal/meta";

const doc = current("privacy");

export const revalidate = 1800;
export const metadata = legalMetadata(doc, "/privacy");

export default function Page() {
  return (
    <LegalShell>
      <LegalArticle doc={doc} />
    </LegalShell>
  );
}
