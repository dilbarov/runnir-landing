import { Icon } from "./Icon";

type Status = "ok" | "fail" | "running" | "pending";

const tone: Record<Status, string> = {
  ok: "text-success",
  fail: "text-error",
  running: "text-active",
  pending: "text-fg-2",
};
const label: Record<Status, string> = { ok: "Succeeded", fail: "Failed", running: "Running", pending: "Not started" };

export function StatusIcon({ s, size = 16 }: { s: Status; size?: number }) {
  return (
    <span role="img" aria-label={label[s]} className={tone[s]}>
      <Icon name={s === "pending" ? "lock" : s} size={size} />
    </span>
  );
}

export const RUNS: { wf: string; sub: string; when: string; s: Status; branch: string }[] = [
  { wf: "ios-release", sub: "Fix profile lookup for archive step", when: "2m ago", s: "fail", branch: "main · a3f9c21" },
  { wf: "deploy", sub: "Bump Fastlane to 2.226", when: "running", s: "running", branch: "main · c71d0e4" },
  { wf: "ci", sub: "Onboarding: skip permissions step", when: "1h ago", s: "ok", branch: "main · a1b8e07" },
  { wf: "nightly-e2e", sub: "Update provisioning profile", when: "3h ago", s: "fail", branch: "develop · 9e2f5b3" },
];

export const STAGES: { name: string; jobs: { n: string; t?: string; s: Status }[] }[] = [
  { name: "CHECK", jobs: [{ n: "lint", t: "41s", s: "ok" }, { n: "unit-tests", t: "3m 12s", s: "ok" }] },
  { name: "BUILD", jobs: [{ n: "build-ios", t: "6m 40s", s: "ok" }] },
  { name: "ARCHIVE", jobs: [{ n: "archive", t: "4m 41s", s: "fail" }] },
  { name: "DEPLOY", jobs: [{ n: "deploy-staging", s: "pending" }, { n: "deploy-production", s: "pending" }] },
];

export const PRESETS = [
  { name: "Deploy to staging", meta: "deploy · environment=staging" },
  { name: "Production hotfix", meta: "deploy · environment=production · dry_run off" },
  { name: "Nightly e2e now", meta: "nightly-e2e · all suites" },
  { name: "Release tag v0.1.0", meta: "release · tag=v0.1.0" },
];

export function RunRow({ r, compact }: { r: (typeof RUNS)[number]; compact?: boolean }) {
  return (
    <li className="flex items-center gap-3 py-2.5">
      <StatusIcon s={r.s} />
      <div className="min-w-0 flex-1">
        <p className={`truncate font-medium text-fg ${compact ? "text-[14px]" : "text-[13.5px]"}`}>{r.wf}</p>
        <p className="truncate font-mono text-[11.5px] text-fg-2">{compact ? r.branch : `${r.branch.split(" · ")[1]} · ${r.sub}`}</p>
      </div>
      <span className="shrink-0 text-xs text-fg-2">{r.when}</span>
    </li>
  );
}

export function StageGrid({ merged }: { merged?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-3 ${merged ? "" : "sm:grid-cols-4"}`}>
      {STAGES.map((st) => (
        <div key={st.name}>
          <p className="mb-2 text-[10.5px] font-semibold tracking-wider text-fg-2">{st.name}</p>
          <div className="space-y-2">
            {(merged ? [{ n: st.jobs.map((j) => j.n).join(" · "), s: st.jobs[0].s, t: undefined }] : st.jobs).map((j) => (
              <div
                key={j.n}
                className={`flex items-center gap-2 rounded-lg bg-surface px-2.5 py-[9px] text-[12.5px] text-fg ${
                  j.s === "fail" ? "border border-error/70" : "border border-transparent"
                }`}
              >
                <StatusIcon s={j.s} size={14} />
                <span className="min-w-0 flex-1 truncate">{j.n}</span>
                {j.t && <span className="text-[11px] text-fg-2">{j.t}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkflowTabs() {
  return (
    <div className="flex items-center gap-4 text-[13px] text-fg-2">
      <span className="rounded-md bg-selected px-3 py-1.5 font-medium text-fg">ios-release</span>
      <span>ci</span>
      <span className="hidden sm:inline">nightly-e2e</span>
      <span className="hidden sm:inline">deploy</span>
    </div>
  );
}

export function RunButton({ big }: { big?: boolean }) {
  return (
    <span className={`btn-primary shrink-0 rounded-lg font-semibold ${big ? "px-[18px] py-2 text-sm" : "px-3 py-[5px] text-[12.5px] font-medium"}`}>
      Run
    </span>
  );
}
