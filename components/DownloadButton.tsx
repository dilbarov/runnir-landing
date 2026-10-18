"use client";

import { useEffect, useId, useRef, useState } from "react";
import { REPO_URL } from "@/lib/content";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";

type Props = {
  release: { tag: string; downloadUrl: string } | null;
  location: "nav" | "hero" | "download" | "mobile-menu";
  size?: "sm" | "lg";
  align?: "center" | "right";
  label?: string;
};

export function DownloadButton({ release, location, size = "lg", align = "center", label = "Download for macOS" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const cls =
    size === "sm"
      ? "px-4 py-[9px] text-sm font-semibold rounded-[10px] gap-2"
      : "px-5 sm:px-[26px] py-[15px] text-base font-semibold rounded-[10px] gap-2.5 whitespace-nowrap";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  if (release) {
    return (
      <a
        href={release.downloadUrl}
        onClick={() => track("download_click", { available: true, location, tag: release.tag })}
        className={`btn-primary inline-flex items-center justify-center transition-colors ${cls}`}
      >
        <Icon name="download" size={size === "sm" ? 15 : 18} />
        {label}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((v) => !v);
          track("download_unavailable_click", { location });
        }}
        className={`btn-primary inline-flex items-center justify-center transition-colors ${cls}`}
      >
        <Icon name="download" size={size === "sm" ? 15 : 18} />
        {size === "sm" ? "Download" : label}
        <span className="whitespace-nowrap rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-medium text-warning max-sm:text-[10px]">
          {size === "sm" ? (
            <>
              <span className="sm:hidden">Soon</span>
              <span className="max-sm:hidden">In development</span>
            </>
          ) : (
            "In development"
          )}
        </span>
      </button>
      {open && (
        <div
          id={id}
          role="dialog"
          aria-label="Download status"
          className={`absolute z-50 mt-3 w-72 rounded-xl border border-line bg-surface p-4 text-left shadow-2xl ${
            align === "right" ? "right-0" : "left-1/2 -translate-x-1/2"
          }`}
        >
          <p className="text-sm font-semibold text-fg">The first release is in development</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-fg-2">
            Runnir is not downloadable yet. Star the repository to get notified when the first build ships.
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener"
            onClick={() => track("github_click", { location: `${location}-popover` })}
            className="mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-accent hover:underline"
          >
            <Icon name="github" size={14} />
            Star on GitHub
          </a>
        </div>
      )}
    </div>
  );
}
