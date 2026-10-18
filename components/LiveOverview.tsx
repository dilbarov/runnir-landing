"use client";

import { useEffect, useRef, useState } from "react";
import { PRESETS, RUNS, RunButton, RunRow, STAGES, StageGrid, StatusIcon, WorkflowTabs, type Stage, type Status } from "./mocks";

// Real milliseconds at which each job finishes, and the fake run time it reports.
const LINT = 1100;
const UNIT = 2000;
const BUILD = 3700;
const ARCHIVE = 5400;
const LOOP = 12000;

function fmt(sec: number) {
  const s = Math.max(1, Math.round(sec));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

function job(e: number, start: number, end: number, total: number, done: Status, label: string) {
  if (e < start) return { s: "queued" as Status, t: undefined };
  if (e < end) return { s: "running" as Status, t: fmt((total * (e - start)) / (end - start)) };
  return { s: done, t: label };
}

function stagesAt(e: number): Stage[] {
  return [
    {
      name: "CHECK",
      jobs: [
        { n: "lint", ...job(e, 0, LINT, 41, "ok", "41s") },
        { n: "unit-tests", ...job(e, 0, UNIT, 192, "ok", "3m 12s") },
      ],
    },
    { name: "BUILD", jobs: [{ n: "build-ios", ...job(e, UNIT, BUILD, 400, "ok", "6m 40s") }] },
    { name: "ARCHIVE", jobs: [{ n: "archive", ...job(e, BUILD, ARCHIVE, 281, "fail", "4m 41s") }] },
    STAGES[3],
  ];
}

/** The Overview pane of the hero window. It replays a pipeline run while visible; static for reduced motion and without JS. */
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

  const running = elapsed !== null && elapsed < ARCHIVE;
  const stages = elapsed === null ? STAGES : stagesAt(elapsed);
  const runs = RUNS.map((r, i) => (i === 0 && running ? { ...r, s: "running" as Status, when: "running" } : i === 0 && elapsed !== null ? { ...r, when: "just now" } : r));

  return (
    <div ref={ref} className="space-y-[18px] px-5 pb-0 pt-1">
      <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2">
        <WorkflowTabs />
        <span className="hidden h-2.5 w-px bg-line sm:block" />
        {running ? (
          <span className="hidden items-center gap-1.5 text-xs text-active sm:flex">
            <StatusIcon s="running" size={14} /> In progress
            <span className="font-mono text-[11px] text-fg-2">run #1483 · a3f9c21</span>
          </span>
        ) : (
          <span className="hidden items-center gap-1.5 text-xs text-error sm:flex">
            <StatusIcon s="fail" size={14} /> Failure
            <span className="font-mono text-[11px] text-fg-2">run #{elapsed === null ? 1482 : 1483} · a3f9c21</span>
          </span>
        )}
      </div>
      <StageGrid stages={stages} />
      <p className="hidden text-[12.5px] text-fg-2 md:block">
        ⓘ Manual jobs unlock when the stages before them pass.{" "}
        {running ? "Waiting for the pipeline to finish…" : "Archive failed — fix it or re-run to continue."}
      </p>
      <div className="hidden h-px bg-line md:block" />
      <div className="grid gap-6 pb-6 md:grid-cols-[1fr_320px]">
        <div>
          <div className="flex justify-between pb-1.5 text-[10.5px] font-semibold tracking-wider text-fg-2">
            RECENT RUNS <span className="text-xs font-normal tracking-normal text-accent">All runs</span>
          </div>
          <ul>
            {runs.map((r) => (
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
  );
}
