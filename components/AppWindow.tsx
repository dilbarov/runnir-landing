import { Icon } from "./Icon";
import { LiveOverview } from "./LiveOverview";

const sidebar = [
  { icon: "dashboard", name: "Overview", active: true },
  { icon: "workflow", name: "Workflows" },
  { icon: "runs", name: "Runs" },
  { icon: "folderOpen", name: "Workspace" },
];

/** The hero window: the app's Overview as drawn in runnir.pen (S03, "Scenario: Pull request → main"). */
export function AppWindow() {
  return (
    <div className="relative mx-auto w-full max-w-[1240px]">
      <div
        role="img"
        aria-label="Runnir app window showing the Overview of mobile-app: which workflows a pull request to main starts, a workflow that runs after CI, a deploy to run by hand, recent runs and saved launches"
        data-nosnippet
        className="mock relative overflow-hidden rounded-t-xl border border-b-0 border-line bg-[#121418] text-left"
      >
        {/* Thin light along the top edge, instead of a glow that would spill into the hero */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(124,156,255,0.55)_50%,transparent)]"
        />
        <div inert>
          <div className="flex h-[46px] items-center gap-3.5 px-4">
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="flex items-center gap-2 rounded-lg bg-surface py-1 pl-1 pr-2.5">
              <span className="grid size-[22px] place-items-center rounded-[5px] bg-accent text-[10px] font-bold text-[#0e1422]">MA</span>
              <span className="whitespace-nowrap text-sm font-semibold text-fg">mobile-app</span>
              <Icon name="chevron" size={12} className="text-fg-2" />
            </span>
            <span className="mx-auto flex h-7 w-[440px] min-w-0 items-center gap-2 rounded-[7px] border border-line bg-surface px-2.5 text-[12.5px] text-fg-2 max-lg:hidden">
              <Icon name="search" size={13} className="shrink-0" />
              <span className="truncate">Search workflows, runs, pull requests, files, settings…</span>
              <span className="ml-auto rounded border border-line px-1 font-mono text-[10.5px]">⌘K</span>
            </span>
            <span className="relative ml-auto grid size-8 place-items-center rounded-lg bg-surface text-fg lg:ml-0">
              <Icon name="bell" size={15} />
              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-accent text-[9.5px] font-bold text-[#0e1422]">3</span>
            </span>
          </div>

          <div className="flex gap-2 px-1.5 sm:px-2">
            <aside className="hidden w-[188px] shrink-0 flex-col gap-0.5 py-1 lg:flex">
              {sidebar.map((s) => (
                <div
                  key={s.name}
                  className={`flex h-[30px] items-center gap-2.5 rounded-[7px] px-2.5 text-[13.5px] ${s.active ? "bg-surface text-fg" : "text-fg-2"}`}
                >
                  <Icon name={s.icon} size={14} className={s.active ? "text-accent" : ""} />
                  {s.name}
                </div>
              ))}
              <div className="mt-auto flex items-center gap-2.5 px-2.5 py-1.5">
                <Icon name="userCheck" size={14} className="text-success" />
                <div>
                  <p className="text-[12.5px] font-semibold text-fg">dil-eight</p>
                  <p className="text-[11.5px] text-fg-2">Connected · github.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-fg-2">
                <Icon name="settings" size={14} />
                Settings…
              </div>
            </aside>

            <div className="min-w-0 flex-1 rounded-t-[10px] border border-b-0 border-line bg-bg-alt">
              <div className="flex h-[52px] items-center gap-2 border-b border-line px-4 sm:px-5">
                <span className="mr-auto text-[15.5px] font-semibold text-fg">Overview</span>
                <span className="flex items-center gap-1.5 rounded-[7px] border border-line px-2.5 py-1.5 text-fg max-sm:hidden">
                  <Icon name="branch" size={12} className="text-fg-2" />
                  <span className="font-mono text-xs">feature/retry</span>
                  <Icon name="chevron" size={11} className="text-fg-2" />
                </span>
                <span className="rounded-[7px] border border-line bg-surface px-3.5 py-1.5 text-[13px] text-fg max-sm:hidden">Refresh</span>
                <span className="inline-flex items-center gap-1.5 rounded-[7px] bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-[#0e1422]">
                  <Icon name="play" size={11} />
                  Run Workflow…
                </span>
              </div>

              <LiveOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
