import { LegalArticle } from "@/components/LegalArticle";
import { LegalShell } from "@/components/LegalShell";
import { current } from "@/lib/legal";
import { legalMetadata } from "@/lib/legal/meta";

const doc = current("terms");

export const revalidate = 300;
export const metadata = legalMetadata(doc, "/terms");

export default function Page() {
  return (
    <LegalShell>
      <LegalArticle doc={doc} />
    </LegalShell>
  );
}
