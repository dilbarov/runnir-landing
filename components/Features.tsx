import { FEATURES, type Feature } from "@/lib/content";
import { Icon } from "./Icon";
import { PRESETS, RUNS, RunButton, RunRow, StageGrid, WorkflowTabs } from "./mocks";

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

function Chip({ children, c = "text-fg-2", border }: { children: string; c?: string; border?: string }) {
  return (
    <span className={`rounded-md border bg-surface px-3 py-1.5 font-mono text-[12.5px] ${c} ${border ?? "border-line"}`}>{children}</span>
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

const panel = "mock min-w-0 flex-1 rounded-[14px] border border-line bg-bg-alt";

function Launch() {
  return (
    <div className={`${panel} p-6 md:p-7`} role="img" data-nosnippet aria-label="Saved launches: Deploy to staging, Production hotfix, Nightly e2e now and Release tag v0.1.0, each with a Run button">
      <p className="text-[11px] font-semibold tracking-wider text-fg-2">RUN MANUALLY</p>
      <ul>
        {PRESETS.map((p) => (
          <li key={p.name} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="text-[17px] font-semibold text-fg">{p.name}</p>
              <p className="truncate font-mono text-xs text-fg-2">{p.meta}</p>
            </div>
            <RunButton big />
          </li>
        ))}
      </ul>
      <p className="font-mono text-xs text-fg-2">▸ .runnir/presets.yml · versioned with the repo</p>
    </div>
  );
}

function Loop() {
  return (
    <div className={`${panel} space-y-5 p-6 md:p-7`} role="img" data-nosnippet aria-label="Illustrative comparison: about 5 to 8 minutes per attempt today versus under a minute with Runnir">
      <p className="text-[11px] font-semibold tracking-wider text-fg-2">THE LOOP YOU HAVE TODAY</p>
      <div className="flex flex-wrap gap-2">
        <Chip>edit</Chip>
        <Chip>commit</Chip>
        <Chip>push</Chip>
        <Chip c="text-warning" border="border-warning/30">queue</Chip>
        <Chip c="text-warning" border="border-warning/30">run</Chip>
        <Chip c="text-error" border="border-error/40">fail</Chip>
      </div>
      <p className="text-[22px] font-bold text-error">≈ 5–8 min per attempt</p>
      <div className="h-px bg-line" />
      <p className="text-[11px] font-semibold tracking-wider text-fg-2">WITH RUNNIR</p>
      <div className="flex flex-wrap gap-2">
        {["edit", "validate", "run locally"].map((c) => (
          <Chip key={c} c="text-success" border="border-success/30">
            {c}
          </Chip>
        ))}
      </div>
      <p className="text-[22px] font-bold text-success">≈ under a minute</p>
      <p className="text-xs text-fg-2">Illustrative example. Real times depend on your workflow and runners.</p>
    </div>
  );
}

function Window() {
  return (
    <div className={`${panel} space-y-4 p-5 md:p-6`} role="img" data-nosnippet aria-label="Pipeline stages for ios-release with the latest runs across workflows">
      <WorkflowTabs />
      <StageGrid merged />
      <ul>
        {RUNS.slice(0, 3).map((r) => (
          <RunRow key={r.wf} r={r} compact />
        ))}
      </ul>
    </div>
  );
}

export function Features() {
  const visuals = [<Launch key="l" />, <Loop key="s" />, <Window key="o" />];
  return (
    <>
      {FEATURES.map((f, i) => (
        <section key={f.id} id={f.id} aria-labelledby={`${f.id}-h`} className={i === 1 ? "bg-bg-alt" : "bg-bg"}>
          <div className={`container-x flex flex-col gap-10 py-20 lg:items-center lg:gap-20 lg:py-32 ${i === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            <Copy f={f} />
            {visuals[i]}
          </div>
        </section>
      ))}
    </>
  );
}
