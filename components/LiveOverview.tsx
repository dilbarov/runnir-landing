"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { LaneRow, Launches, RUNS, RunRow, type Lane, type Status } from "./mocks";

// Real milliseconds at which each running job finishes, and the fake run time it reports.
const NATIVE = 2400;
const CROSS = 5600;
const LOOP = 12000;

function fmt(sec: number) {
  const s = Math.max(1, Math.round(sec));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

function job(e: number, start: number, end: number, from: number, total: number, done: string) {
  if (e < start) return { s: "queued" as Status, t: undefined };
  if (e < end) return { s: "running" as Status, t: fmt(from + ((total - from) * (e - start)) / (end - start)) };
  return { s: "ok" as Status, t: done };
}

/** The Overview's scenario "Pull request → main"; without JS or with reduced motion it stays as drawn in Pen. */
function lanesAt(e: number | null): Lane[] {
  const native = e === null ? { s: "running" as Status, t: "1m 40s" } : job(e, 0, NATIVE, 100, 112, "1m 52s");
  const cross = e === null ? { s: "queued" as Status, t: undefined } : job(e, NATIVE, CROSS, 0, 200, "3m 20s");
  const done = e !== null && e >= CROSS;
  return [
    {
      name: "CI",
      fav: true,
      s: "ok",
      status: "Succeeded #1482",
      more: " · 2m ago",
      trigger: "pull_request · branches main",
      cols: [
        [
          { n: "lint", s: "ok", t: "41s" },
          { n: "unit-tests", s: "ok", t: "3m 12s" },
        ],
        [{ n: "build", s: "ok", t: "4m 05s" }],
      ],
    },
    {
      name: "Go Core",
      s: done ? "ok" : "running",
      status: done ? "Succeeded #388" : "Running #388",
      more: " · now",
      trigger: "pull_request · paths ✓",
      cols: [
        [
          { n: "native tests ×3", ...native },
          { n: "lint-security", s: "ok", t: "38s", from: "lg" },
          { n: "contract", s: "ok", t: "51s", from: "sm" },
        ],
        [{ n: "cross-build ×6", ...cross }],
      ],
    },
    {
      name: "Report",
      after: "after CI",
      s: "ok",
      status: "Succeeded #77",
      more: " · 1m ago",
      trigger: "workflow_run",
      from: "lg",
      cols: [[{ n: "summary", s: "ok", t: "12s" }]],
    },
  ];
}

const DEPLOY: Lane = {
  name: "Deploy",
  s: "none",
  status: "Not run",
  more: " in this scenario yet",
  trigger: "workflow_dispatch",
  cols: [[{ n: "build-image", s: "queued" }], [{ n: "deploy-production", s: "none", manual: true }]],
};

/** The Overview pane of the hero window. It replays the running lane while visible. */
export function LiveOverview() {
  const [elapsed, setElapsed] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    let timer: number | undefined;
    let start = 0;
    const tick = () => {
      const e = performance.now() - start;
      if (e >= LOOP) start = performance.now();
      setElapsed(e >= LOOP ? 0 : e);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && timer === undefined) {
          start = performance.now();
          timer = window.setInterval(tick, 90);
        } else if (!entry.isIntersecting && timer !== undefined) {
          window.clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0.35 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div ref={ref} className="space-y-3.5 px-3 pb-0 pt-4 sm:px-5 sm:pt-[18px] lg:px-7">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
        <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-fg sm:text-[15px]">
          Pull request → main <Icon name="chevron" size={12} className="text-fg-2" />
        </span>
        <span className="text-[12.5px] text-fg-2 max-sm:hidden">12 files changed against origin/main</span>
      </div>
      {lanesAt(elapsed).map((l) => (
        <LaneRow key={l.name} lane={l} />
      ))}
      <p className="text-[10.5px] font-semibold tracking-[0.1em] text-fg-2 sm:text-[11px]">RUN BY HAND</p>
      <LaneRow lane={DEPLOY} />
      <div className="h-px bg-line" />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-7 pb-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <p className="flex justify-between pb-1 text-[10.5px] font-semibold tracking-[0.1em] text-fg-2 sm:text-[11px]">
            RECENT RUNS <span className="text-xs font-normal tracking-normal text-accent">All runs</span>
          </p>
          <ul>
            {RUNS.slice(0, 2).map((r) => (
              <RunRow key={r.wf} r={r} />
            ))}
          </ul>
        </div>
        <div className="max-lg:hidden">
          <p className="flex justify-between pb-1 text-[11px] font-semibold tracking-[0.1em] text-fg-2">
            RUN MANUALLY <span className="text-xs font-normal tracking-normal text-accent">New…</span>
          </p>
          <Launches />
        </div>
      </div>
    </div>
  );
}
