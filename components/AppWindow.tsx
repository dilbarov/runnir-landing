import Image from "next/image";
import { Icon } from "./Icon";
import { PRESETS, RUNS, RunButton, RunRow, StageGrid, StatusIcon, WorkflowTabs } from "./mocks";

const sidebar = [
  { icon: "layout", name: "Overview", active: true },
  { icon: "play", name: "Workflows" },
  { icon: "list", name: "Runs" },
  { icon: "folder", name: "Workspace" },
];

export function AppWindow() {
  return (
    <div
      role="img"
      aria-label="Runnir app window showing the Overview of acme/mobile-app: pipeline stages, recent runs and manual runs"
      className="mx-auto w-full max-w-[1240px] overflow-hidden text-left rounded-t-xl border border-b-0 border-line bg-[#181b20] shadow-[0_-8px_80px_rgba(124,156,255,0.08)]"
    >
      <div className="flex">
        <aside className="hidden w-[220px] shrink-0 flex-col gap-1 bg-bg-alt px-3 py-3.5 md:flex">
          <div className="flex gap-2 px-1 pb-4">
            <span className="size-3 rounded-full bg-error" />
            <span className="size-3 rounded-full bg-warning" />
            <span className="size-3 rounded-full bg-success" />
          </div>
          <Image src="/brand/logo-horizontal-light.png" alt="" width={130} height={49} className="mb-2 h-[49px] w-auto self-start" />
          <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5">
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-fg">acme/mobile-app</p>
              <p className="font-mono text-[11px] text-fg-2">main</p>
            </div>
            <Icon name="chevron" size={13} className="text-fg-2" />
          </div>
          <div className="h-2.5" />
          {sidebar.map((s) => (
            <div
              key={s.name}
              className={`flex h-[30px] items-center gap-2.5 rounded-md px-2.5 text-[13px] ${s.active ? "bg-selected text-fg" : "text-fg-2"}`}
            >
              <Icon name={s.icon} size={15} className={s.active ? "text-accent" : ""} />
              {s.name}
            </div>
          ))}
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex h-[52px] items-center justify-between px-5">
            <span className="text-[15px] font-semibold text-fg">Overview</span>
            <div className="flex items-center gap-2 text-[13px] text-fg">
              <span className="hidden rounded-md bg-selected px-3 py-1.5 font-mono text-xs sm:inline">⎇ main</span>
              <span className="hidden rounded-md bg-selected px-3 py-1.5 sm:inline">Refresh</span>
              <span className="btn-primary inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold">
                <Icon name="play" size={12} />
                Run Workflow…
              </span>
            </div>
          </div>

          <div className="space-y-[18px] px-5 pb-0 pt-1">
            <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2">
              <WorkflowTabs />
              <span className="hidden h-2.5 w-px bg-line sm:block" />
              <span className="hidden items-center gap-1.5 text-xs text-error sm:flex">
                <StatusIcon s="fail" size={14} /> Failure
                <span className="font-mono text-[11px] text-fg-2">run #1482 · a3f9c21</span>
              </span>
            </div>
            <StageGrid />
            <p className="hidden text-[12.5px] text-fg-2 md:block">
              ⓘ Manual jobs unlock when the stages before them pass. Archive failed — fix it or re-run to continue.
            </p>
            <div className="hidden h-px bg-line md:block" />
            <div className="grid gap-6 pb-6 md:grid-cols-[1fr_320px]">
              <div>
                <div className="flex justify-between pb-1.5 text-[10.5px] font-semibold tracking-wider text-fg-2">
                  RECENT RUNS <span className="text-xs font-normal tracking-normal text-accent">All runs</span>
                </div>
                <ul className="divide-y divide-line/0">
                  {RUNS.map((r) => (
                    <RunRow key={r.wf} r={r} />
                  ))}
                </ul>
              </div>
              <div className="hidden md:block">
                <div className="flex justify-between pb-1.5 text-[10.5px] font-semibold tracking-wider text-fg-2">
                  RUN MANUALLY <span className="text-xs font-normal tracking-normal text-accent">New…</span>
                </div>
                <ul>
                  {PRESETS.map((p) => (
                    <li key={p.name} className="flex items-center justify-between py-2.5">
                      <div>
                        <p className="text-[13.5px] font-medium text-fg">{p.name}</p>
                        <p className="text-[11.5px] text-fg-2">{p.meta.split(" · ").slice(1).join(" · ") || p.meta}</p>
                      </div>
                      <RunButton />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
