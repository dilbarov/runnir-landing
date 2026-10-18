import type { ReactNode } from "react";
import { DOC_NAMES, LEGAL, longDate, permalink, sha256, type Block, type LegalDoc } from "@/lib/legal";

/** Renders **bold** and [text](url) inside a paragraph. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={m.index} className="font-semibold text-fg">{m[1]}</strong>);
    else {
      const external = /^https?:/.test(m[3]);
      out.push(
        <a key={m.index} href={m[3]} {...(external ? { target: "_blank", rel: "noopener" } : {})} className="text-accent hover:underline">
          {m[2]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function BlockView({ b }: { b: Block }) {
  if (typeof b === "string") return <p>{inline(b)}</p>;
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-fg-2/60">
      {b.list.map((i) => (
        <li key={i}>{inline(i)}</li>
      ))}
    </ul>
  );
}

export function LegalArticle({ doc }: { doc: LegalDoc }) {
  const isCurrent = LEGAL[doc.slug][0].version === doc.version;
  return (
    <article className="mx-auto max-w-[720px] px-6 pb-24 pt-32 md:pt-40">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">Legal</p>
      <h1 className="mt-3 text-[34px] font-bold leading-tight tracking-tight text-fg md:text-[44px]">{doc.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-fg-2">
        <span>
          Version {doc.version} · Last updated <time dateTime={doc.version}>{longDate(doc.version)}</time>
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs ${isCurrent ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}
        >
          {isCurrent ? "In force" : "Superseded"}
        </span>
      </div>
      <p className="mt-2 text-[13px] text-fg-2">
        <a href={permalink(doc)} className="text-accent hover:underline">
          Permanent link to this version
        </a>{" "}
        ·{" "}
        <a href="/legal" className="text-accent hover:underline">
          All versions
        </a>
        {!isCurrent && (
          <>
            {" "}
            ·{" "}
            <a href={`/${doc.slug}`} className="text-accent hover:underline">
              {DOC_NAMES[doc.slug]} in force
            </a>
          </>
        )}
      </p>

      <div className="mt-10 space-y-4 text-[15.5px] leading-relaxed text-fg-2">
        {doc.intro.map((b, i) => (
          <BlockView key={i} b={b} />
        ))}
      </div>

      {doc.sections.map((s) => (
        <section key={s.h} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-fg">{s.h}</h2>
          <div className="mt-3 space-y-4 text-[15.5px] leading-relaxed text-fg-2">
            {s.blocks.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-14 border-t border-line pt-6 font-mono text-[11.5px] break-all text-fg-2/80">SHA-256 {sha256(doc)}</p>
    </article>
  );
}
