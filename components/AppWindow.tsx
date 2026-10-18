import Image from "next/image";
import { Icon } from "./Icon";
import { LiveOverview } from "./LiveOverview";


const sidebar = [
  { icon: "layout", name: "Overview", active: true },
  { icon: "play", name: "Workflows" },
  { icon: "list", name: "Runs" },
  { icon: "folder", name: "Workspace" },
];

export function AppWindow() {
  return (
    <div className="relative mx-auto w-full max-w-[1240px]">
      {/* Glow fades out before the window's bottom edge, so the section boundary never cuts it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-24 -top-20 bottom-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_80px,rgba(124,156,255,0.14),transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent,#000_80px,#000_70%,transparent)]"
      />
      <div
        role="img"
        aria-label="Runnir app window showing the Overview of acme/mobile-app: pipeline stages, recent runs and manual runs"
        data-nosnippet
        className="mock relative overflow-hidden rounded-t-xl border border-b-0 border-line bg-[#181b20] text-left"
      >
        <div className="flex" inert>
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

            <LiveOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
