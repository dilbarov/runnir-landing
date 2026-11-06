import { Fragment, type ReactNode } from "react";
import { Icon } from "./Icon";

// The demos copy screens of the app as drawn in runnir/docs/design/runnir.pen (S03, S08, S10, S19).

export type Status = "ok" | "fail" | "running" | "queued" | "none" | "skipped";

const tone: Record<Status, string> = {
  ok: "text-success",
  fail: "text-error",
  running: "text-active",
  queued: "text-fg-2",
  none: "text-fg-2",
  skipped: "text-fg-2",
};

const glyph: Record<Status, string> = {
  ok: "ok",
  fail: "fail",
  running: "running",
  queued: "circle",
  none: "queued",
  skipped: "skipped",
};

export function StatusIcon({ s, size = 16 }: { s: Status; size?: number }) {
  return (
    <span className={`inline-flex shrink-0 ${tone[s]}`}>
      <Icon name={glyph[s]} size={size} className={s === "running" ? "animate-spin" : undefined} />
    </span>
  );
}

/** Hidden below a breakpoint, as the narrower Pen frames leave it out. */
type From = "sm" | "lg";
const from = (f?: From) => (f === "sm" ? "max-sm:hidden" : f === "lg" ? "max-lg:hidden" : "");

export function Button({ children, primary, icon, className = "" }: { children: ReactNode; primary?: boolean; icon?: string; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[7px] px-3.5 py-1.5 text-[13px] ${
        primary ? "bg-accent font-semibold text-[#0e1422]" : "border border-line bg-surface text-fg"
      } ${className}`}
    >
      {icon && <Icon name={icon} size={11} />}
      {children}
    </span>
  );
}

export function Label({ children, icon, right }: { children: string; icon?: string; right?: string }) {
  return (
    <p className="flex items-center gap-[7px] text-[10.5px] font-semibold tracking-[0.12em] text-fg-2">
      {icon && <Icon name={icon} size={12} />}
      {children}
      {right && <span className="ml-auto font-mono text-[11px] font-normal tracking-normal">{right}</span>}
    </p>
  );
}

// ---------- Jobs and scenario lanes (S03 Overview, S08 run graph) ----------

export type Job = { n: string; s: Status; t?: string; manual?: boolean; from?: From };

export function JobChip({ j, wide = "sm:w-[168px] lg:w-[196px]", times = "max-lg:hidden" }: { j: Job; wide?: string; times?: string }) {
  const border = j.manual ? "border-accent pr-1 sm:pr-1.5" : j.s === "fail" ? "job-fail border-error/70" : "border-line";
  return (
    <div
      className={`flex h-7 items-center gap-1.5 rounded-lg border bg-surface px-2 text-xs sm:gap-2 transition-colors duration-300 sm:h-[34px] sm:px-3 sm:text-[13px] ${wide} ${border} ${from(j.from)}`}
    >
      {!j.manual && <StatusIcon s={j.s} size={14} />}
      <span className={`min-w-0 flex-1 truncate ${j.s === "skipped" ? "text-fg-2" : "text-fg"}`}>{j.n}</span>
      {j.t && <span className={`shrink-0 text-[11.5px] tabular-nums text-fg-2 ${times}`}>{j.t}</span>}
      {j.manual && (
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[#0e1422] sm:size-[22px]">
          <Icon name="play" size={9} />
        </span>
      )}
    </div>
  );
}

export function Columns({ cols, wide, times }: { cols: Job[][]; wide?: string; times?: string }) {
  return (
    <div className="flex items-start gap-1.5 sm:gap-4">
      {cols.map((col, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className="flex h-7 items-center text-fg-2 sm:h-[34px]">
              <Icon name="arrowRight" size={12} />
            </span>
          )}
          <div className="flex flex-col gap-2">
            {col.map((j) => (
              <JobChip key={j.n} j={j} wide={wide} times={times} />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/** `more` is the rest of the status line, left out below lg like the narrower Pen frames do. */
export type Lane = { name: string; fav?: boolean; s: Status; status: string; more?: string; trigger: string; after?: string; cols: Job[][]; from?: From };

export function LaneRow({ lane }: { lane: Lane }) {
  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:gap-4 ${lane.after ? "sm:pl-7" : ""} ${from(lane.from)}`}>
      <div className={`flex items-center gap-2 sm:shrink-0 sm:flex-col sm:items-start sm:gap-[3px] ${lane.after ? "sm:w-[142px] lg:w-[208px]" : "sm:w-[170px] lg:w-[236px]"}`}>
        {lane.after && (
          <p className="flex items-center gap-1 text-[11.5px] text-fg-2 max-sm:hidden">
            <Icon name="after" size={11} /> {lane.after}
          </p>
        )}
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-fg sm:text-sm">
          {lane.name}
          <Icon name="star" size={11} className={`max-sm:hidden ${lane.fav ? "text-warning" : "text-fg-2"}`} />
        </p>
        <p className={`flex items-center gap-1.5 text-[11.5px] sm:text-xs ${lane.s === "none" ? "text-fg-2" : tone[lane.s]}`}>
          <StatusIcon s={lane.s} size={12} />
          {lane.status}
          {lane.more && <span className="max-lg:hidden">{lane.more}</span>}
        </p>
        <p className="text-[11.5px] text-fg-2 max-sm:hidden">{lane.trigger}</p>
      </div>
      <Columns cols={lane.cols} />
    </div>
  );
}

// ---------- Runs and launches ----------

export const RUNS: { wf: string; sub: string; when: string; s: Status }[] = [
  { wf: "ios-release", sub: "main · a3f9c21 · Fix profile lookup for archive step", when: "2m ago", s: "fail" },
  { wf: "deploy", sub: "main · c71d0e4 · Bump Fastlane to 2.226", when: "running", s: "running" },
  { wf: "ci", sub: "main · a1b8e07 · Onboarding: skip permissions step", when: "1h ago", s: "ok" },
];

export function RunRow({ r }: { r: (typeof RUNS)[number] }) {
  return (
    <li className="flex items-center gap-3 py-2">
      <StatusIcon s={r.s} size={18} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-fg sm:text-sm">{r.wf}</p>
        <p className="truncate font-mono text-[11px] text-fg-2 sm:text-[11.5px]">{r.sub}</p>
      </div>
      <span className="shrink-0 text-xs text-fg-2">{r.when}</span>
    </li>
  );
}

export const LAUNCHES = [
  { mac: false, name: "Deploy to staging", meta: "deploy · main · environment=staging", short: "deploy · environment=staging" },
  { mac: false, name: "Production hotfix", meta: "deploy · release/1.4 · environment=production", short: "deploy · release/1.4" },
  { mac: true, name: "Nightly e2e now", meta: "nightly-e2e · main · suites=all", short: "nightly-e2e · suites=all" },
  { mac: true, name: "Release tag v0.1.0", meta: "release · main · tag=v0.1.0", short: "release · tag=v0.1.0" },
];

function Launch({ l, big }: { l: (typeof LAUNCHES)[number]; big?: boolean }) {
  return (
    <li className={`flex items-center gap-4 ${big ? "py-2.5" : "py-2"}`}>
      <div className="min-w-0 flex-1">
        <p className={`truncate font-semibold text-fg ${big ? "text-[15px] sm:text-base" : "text-[13.5px] font-medium"}`}>{l.name}</p>
        <p className={`truncate text-fg-2 ${big ? "font-mono text-[11px] sm:text-[11.5px]" : "text-[11.5px]"}`}>
          <span className="sm:hidden">{l.short}</span>
          <span className="max-sm:hidden">{l.meta}</span>
        </p>
      </div>
      <Button>Run</Button>
    </li>
  );
}

/** Run manually on the Overview: repository launches in .runnir/launches, then the ones kept on this Mac. */
export function Launches({ big }: { big?: boolean }) {
  return (
    <div className="space-y-2">
      {big && <Label icon="folder" right=".runnir/launches">IN THIS REPOSITORY</Label>}
      <ul>
        {LAUNCHES.filter((l) => !l.mac).map((l) => (
          <Launch key={l.name} l={l} big={big} />
        ))}
      </ul>
      {big && (
        <>
          <div className="pt-2.5">
            <Label icon="laptop">ON THIS MAC</Label>
          </div>
          <ul>
            {LAUNCHES.filter((l) => l.mac).map((l) => (
              <Launch key={l.name} l={l} big />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// ---------- Feature panels ----------

const panel = "mock flex min-w-0 flex-1 flex-col rounded-[14px] border border-line bg-bg-alt lg:min-h-[440px]";

export function LaunchPanel() {
  return (
    <div
      className={`${panel} gap-3 p-4 sm:p-5 lg:p-7`}
      role="img"
      data-nosnippet
      aria-label="Run manually: Deploy to staging and Production hotfix from the repository's .runnir/launches, Nightly e2e now and Release tag v0.1.0 kept on this Mac, each with a Run button"
    >
      <p className="flex justify-between text-[10.5px] font-semibold tracking-[0.14em] text-fg-2 sm:text-[11px]">
        RUN MANUALLY <span className="text-xs font-normal tracking-normal text-accent">New…</span>
      </p>
      <Launches big />
      <p className="mt-auto pt-2 text-xs text-fg-2 max-lg:hidden">Repository launches are shared through Git; Mac launches stay on this Mac.</p>
    </div>
  );
}

const TOOLS = [
  ["Docker CLI", "27.3.1 · found", "27.3.1 · found"],
  ["Container engine", "OrbStack · local", "OrbStack"],
  ["act", "0.2.89 · bundled with Runnir", "0.2.89 · bundled"],
];

const ACCESS = [
  ["folder", "Workspace", "A temporary copy of ~/code/mobile-app, not mounted live"],
  ["key", "Secrets", "2 from your Keychain: production's, then the Repository's"],
  ["ban", "Never passed", "GitHub token · Docker socket · home folder"],
];

export function RunLocallyPanel() {
  return (
    <div
      className={`${panel} gap-3 p-4 sm:p-5 lg:p-7`}
      role="img"
      data-nosnippet
      aria-label="Run locally review for job lint of ci.yml: Docker CLI, OrbStack and the bundled act found, what the run can access, and a Run Locally button after trusting the workflow"
    >
      <div>
        <p className="text-base font-semibold text-fg lg:text-[17px]">Run locally</p>
        <p className="mt-1 font-mono text-[11px] text-fg-2 lg:text-[11.5px]">ci.yml › job: lint › event: push</p>
      </div>
      <Label>ENGINE AND TOOLS</Label>
      <ul className="divide-y divide-line rounded-[10px] border border-line">
        {TOOLS.map(([n, d, short]) => (
          <li key={n} className="flex h-9 items-center gap-2.5 px-3 lg:h-[38px] lg:px-3.5">
            <StatusIcon s="ok" size={14} />
            <span className="w-[118px] shrink-0 text-[13px] font-semibold text-fg lg:w-[150px] lg:text-[13.5px]">{n}</span>
            <span className="truncate text-xs text-fg-2 lg:text-[12.5px]">
              <span className="sm:hidden">{short}</span>
              <span className="max-sm:hidden">{d}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="space-y-2 max-sm:hidden">
        <Label>WHAT THIS RUN CAN ACCESS</Label>
        <ul className="space-y-1.5">
          {ACCESS.map(([icon, n, d]) => (
            <li key={n} className="flex items-center gap-2.5 text-[12.5px] lg:text-[13px]">
              <Icon name={icon} size={13} className="shrink-0 text-fg-2" />
              <span className="w-[100px] shrink-0 text-fg-2 lg:w-[110px]">{n}</span>
              <span className="truncate text-fg">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex items-center gap-2.5 pt-1">
        <span className="grid size-[15px] shrink-0 place-items-center rounded bg-accent text-[#0e1422]">
          <Icon name="check" size={10} />
        </span>
        <span className="min-w-0 truncate text-[12.5px] text-fg lg:text-[13px]">
          I trust this workflow<span className="max-sm:hidden"> and repository</span>
        </span>
        <span className="flex-1" />
        <Button className="max-lg:hidden">Cancel</Button>
        <Button primary icon="play">
          Run Locally
        </Button>
      </div>
    </div>
  );
}

const GRAPH: Job[][] = [
  [
    { n: "lint", s: "ok", t: "41s" },
    { n: "unit-tests ×3", s: "ok", t: "3m 12s" },
  ],
  [{ n: "build-ios", s: "fail", t: "6m 40s" }],
  [{ n: "publish", s: "skipped", t: "skipped" }],
];

export function RunPanel() {
  return (
    <div
      className={`${panel} gap-3 p-4 sm:p-5 lg:p-7`}
      role="img"
      data-nosnippet
      aria-label="Run 1482 of CI / ios-release failed: lint and unit tests passed, build-ios failed in its Archive step because a provisioning profile expired, publish was skipped; buttons to open the log and re-run failed jobs"
    >
      <div className="flex items-center gap-2">
        <p className="truncate text-[14.5px] font-semibold text-fg sm:text-[15.5px] lg:text-base">Run #1482 · CI / ios-release</p>
        <span className="flex-1" />
        <Button primary icon="rerun" className="max-sm:hidden">
          Re-run failed jobs
        </Button>
      </div>
      <p className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-fg-2">
        <span className="flex items-center gap-1.5 text-[12.5px] text-error">
          <StatusIcon s="fail" size={13} /> Failure
        </span>
        <span className="font-mono">main · a3f9c21</span>
        <span className="max-lg:hidden">Attempt 1 of 1</span>
        <span>6m 52s</span>
      </p>
      <div className="h-px bg-line max-lg:hidden" />
      <p className="flex items-center gap-2 text-[13px] font-semibold text-fg max-lg:hidden">
        CI · ios-release.yml <span className="text-xs font-normal text-fg-2">at a3f9c21 · 4 jobs</span>
      </p>
      <div className="max-sm:hidden">
        <Columns cols={GRAPH} wide="sm:w-[176px] lg:w-[184px]" times="" />
      </div>
      <div className="flex flex-col gap-2 sm:hidden">
        {GRAPH.flat().map((j) => (
          <JobChip key={j.n} j={j} wide="w-full" times="" />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 rounded-[10px] bg-[#2a1a1d] px-3.5 py-3 sm:flex-row sm:items-center sm:gap-3">
        <span className="max-sm:hidden">
          <StatusIcon s="fail" size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-fg lg:text-[13.5px]">Failed in build-ios › Archive</p>
          <p className="mt-0.5 truncate font-mono text-[11.5px] text-fg-2 lg:text-xs">error: Provisioning profile expired 2026-10-09</p>
        </div>
        <div className="flex gap-2">
          <Button>Open the log</Button>
          <Button primary icon="rerun" className="sm:hidden">
            Re-run failed jobs
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-1 overflow-hidden rounded-lg bg-editor px-3.5 py-2.5 font-mono text-[11.5px] max-lg:hidden">
        <p className="text-fg-2">▸ Archive</p>
        <p className="truncate text-fg">xcodebuild archive -scheme App -archivePath build/App.xcarchive</p>
        <p className="truncate text-error">error: Provisioning profile &quot;App Store&quot; expired 2026-10-09</p>
        <p className="truncate text-error">##[error]Process completed with exit code 65.</p>
      </div>
    </div>
  );
}

const POPUP: { group: string; count: number; rows: { s: Status; title: string; sub: string; from?: boolean }[] }[] = [
  {
    group: "FAILED",
    count: 2,
    rows: [
      { s: "fail", title: "CI · Fix login on slow networks", sub: "acme/web · fix-login · failed 4 min ago" },
      { s: "fail", title: "Nightly · Build and sign", sub: "github.company.com · platform/ci · timed out 3 h ago" },
    ],
  },
  {
    group: "RUNNING",
    count: 3,
    rows: [
      { s: "running", title: "CI · Bump swift-protobuf to 1.29", sub: "acme/mobile-app · deps · started 2 min ago" },
      { s: "running", title: "Deploy · Release 1.4.1", sub: "acme/web · v1.4.1 · started 6 min ago", from: true },
    ],
  },
];

const NOTES = [
  ["Checks failed on #142", "Add retry to deploy · CI failed in build-ios"],
  ["Local run finished", "ci.yml · lint passed in 41s"],
];

function Mark({ size = 30 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size }} className="grid shrink-0 place-items-center rounded-[7px] bg-bg text-[13px] font-bold text-fg">
      R
    </span>
  );
}

export function MenuBarPanel() {
  return (
    <div
      className={`${panel} gap-2.5 px-3 pb-4 sm:px-5 sm:pb-5 lg:px-7 lg:pb-7`}
      role="img"
      data-nosnippet
      aria-label="The Runnir menu bar list, Runs tab: 2 failed and 3 running runs across 14 repositories, beside notifications that checks failed on pull request 142 and that a local run finished"
    >
      <div className="flex h-[30px] items-center justify-end gap-4 text-fg">
        <Icon name="wifi" size={14} />
        <Icon name="battery" size={15} />
        <span className="relative grid h-5 w-[22px] place-items-center rounded-[5px] bg-line text-[11px] font-bold">
          R
          <span className="absolute -right-0.5 -top-0.5 size-[7px] rounded-full bg-error" />
        </span>
        <span className="whitespace-nowrap text-xs lg:text-[12.5px]">Wed 21 Oct&nbsp;&nbsp;20:14</span>
      </div>
      <div className="flex flex-1 gap-4 lg:gap-6">
        <ul className="flex min-w-0 flex-1 flex-col gap-2.5 pt-1.5 max-sm:hidden">
          {NOTES.map(([t, b]) => (
            <li key={t} className="flex gap-2.5 rounded-[14px] border border-line bg-[#252a31] p-2.5 lg:p-3">
              <Mark size={28} />
              <div className="min-w-0 flex-1">
                <p className="flex justify-between text-[11px] text-fg-2">
                  Runnir <span>now</span>
                </p>
                <p className="text-[12.5px] font-semibold text-fg lg:text-[13px]">{t}</p>
                <p className="text-[11.5px] text-fg-2 lg:text-xs">{b}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex w-full flex-col gap-2 self-start rounded-xl border border-line bg-surface p-3 shadow-[0_16px_40px_#00000088] sm:w-[340px] lg:w-[400px]">
          <div className="flex rounded-lg bg-bg p-[3px] text-xs">
            <span className="flex h-6 flex-1 items-center justify-center text-fg-2">Pull requests</span>
            <span className="flex h-6 flex-1 items-center justify-center gap-1.5 rounded-md bg-line font-semibold text-fg">
              Runs <span className="text-[11px] font-normal text-fg-2">2</span>
            </span>
          </div>
          <p className="text-[11px] text-fg-2 lg:text-[11.5px]">Updated just now · 14 repositories</p>
          <p className="flex gap-2 text-[11.5px] max-sm:hidden">
            <span className="flex items-center gap-1.5 rounded-full bg-[#3a1f22] px-2.5 py-0.5 text-error">
              <StatusIcon s="fail" size={11} /> 2 failed
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-[#173a35] px-2.5 py-0.5 text-active">
              <StatusIcon s="running" size={11} /> 3 running
            </span>
          </p>
          {POPUP.map((g) => (
            <div key={g.group} className="space-y-2 pt-1">
              <p className="text-[10px] font-semibold tracking-[0.1em] text-fg-2 lg:text-[10.5px]">
                {g.group} <span className="font-normal">{g.count}</span>
              </p>
              <ul className="space-y-2">
                {g.rows.map((r) => (
                  <li key={r.title} className="flex gap-2.5">
                    <StatusIcon s={r.s} size={14} />
                    <div className="min-w-0">
                      <p className="truncate text-[12.5px] text-fg lg:text-[13.5px]">{r.title}</p>
                      <p className="truncate text-[11px] text-fg-2 lg:text-[11.5px]">
                        {r.from && <span className="text-accent">From Runnir </span>}
                        {r.sub}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="flex items-center gap-2 pt-1 text-xs text-accent lg:text-[12.5px]">
            Open Runs Window
            <span className="rounded border border-line px-1.5 font-mono text-[10.5px] text-fg-2">⌥⌘R</span>
          </p>
        </div>
      </div>
    </div>
  );
}
