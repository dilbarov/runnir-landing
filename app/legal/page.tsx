import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { COMPANY } from "@/lib/content";
import { DOC_NAMES, LEGAL, longDate, permalink, sha256 } from "@/lib/legal";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Legal documents and their versions",
  description: `Every published version of the Runnir Privacy Policy and Terms of Use by ${COMPANY}, with permanent links and SHA-256 fingerprints.`,
  alternates: { canonical: "/legal" },
};

export default function Page() {
  return (
    <LegalShell>
      <div className="mx-auto max-w-[720px] px-6 pb-24 pt-32 md:pt-40">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">Legal</p>
        <h1 className="mt-3 text-[34px] font-bold leading-tight tracking-tight text-fg md:text-[44px]">Legal documents and their versions</h1>
        <p className="mt-5 text-[15.5px] leading-relaxed text-fg-2">
          Every version has its own address and a SHA-256 fingerprint of its text. Published versions are never edited: a changed text
          becomes a new version, and the old one stays where it was. Runnir is developed and promoted by {COMPANY}.
        </p>

        {(Object.keys(LEGAL) as (keyof typeof LEGAL)[]).map((slug) => (
          <section key={slug} className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-fg">{DOC_NAMES[slug]}</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {LEGAL[slug].map((d, i) => (
                <li key={d.version} className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <a href={permalink(d)} className="text-[15px] font-medium text-fg hover:text-accent">
                      {longDate(d.version)}
                    </a>
                    <p className="mt-1 font-mono text-[11px] break-all text-fg-2/80">SHA-256 {sha256(d)}</p>
                  </div>
                  <span
                    className={`shrink-0 self-start rounded-full px-2.5 py-0.5 text-xs ${i === 0 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}
                  >
                    {i === 0 ? "In force" : "Superseded"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-12 text-[14px] text-fg-2">
          Machine-readable index of the versions in force:{" "}
          <a href="/legal/current.json" className="font-mono text-accent hover:underline">
            /legal/current.json
          </a>
        </p>
        <p className="mt-3 text-[14px] text-fg-2">
          Read the versions in force:{" "}
          <a href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/terms" className="text-accent hover:underline">
            Terms of Use
          </a>
        </p>
      </div>
    </LegalShell>
  );
}
