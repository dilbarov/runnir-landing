import type { ReactNode } from "react";
import { FEATURES, type Feature } from "@/lib/content";
import { Icon } from "./Icon";
import { LaunchPanel, MenuBarPanel, RunLocallyPanel, RunPanel } from "./mocks";

function Badge({ status }: { status: Feature["status"] }) {
  const c = status.tone === "planned" ? "bg-[#2a2416] text-warning" : "bg-[#162a1f] text-success";
  const d = status.tone === "planned" ? "bg-warning" : "bg-success";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-xs ${c}`}>
      <span className={`size-1.5 rounded-full ${d}`} />
      {status.text}
    </span>
  );
}

function Copy({ f }: { f: Feature }) {
  return (
    <div className="flex flex-col gap-5 lg:w-[460px] lg:shrink-0">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[12.5px] text-accent">{f.index}</span>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{f.label}</p>
        <Badge status={f.status} />
      </div>
      <h2 id={`${f.id}-h`} className="text-balance text-[32px] font-bold leading-[1.15] tracking-tight text-fg md:text-[40px]">{f.title}</h2>
      <p className="text-[17px] leading-relaxed text-fg-2">{f.body}</p>
      <ul className="space-y-2.5">
        {f.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-[15px] text-fg">
            <Icon name="check" size={16} className="mt-[3px] shrink-0 text-accent" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

const visuals: Record<Feature["id"], ReactNode> = {
  launch: <LaunchPanel />,
  "run-locally": <RunLocallyPanel />,
  pipelines: <RunPanel />,
  "menu-bar": <MenuBarPanel />,
};

export function Features() {
  return (
    <>
      {FEATURES.map((f, i) => (
        <section key={f.id} id={f.id} aria-labelledby={`${f.id}-h`} className={i % 2 ? "bg-bg-alt" : "bg-bg"}>
          <div className={`container-x flex flex-col gap-10 py-20 lg:items-center lg:gap-20 lg:py-32 ${i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            <Copy f={f} />
            {visuals[f.id]}
          </div>
        </section>
      ))}
    </>
  );
}
