"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";
import { track } from "@/lib/analytics";
import { DownloadButton } from "./DownloadButton";
import { GitHubLink } from "./GitHubLink";
import { Icon } from "./Icon";

type Release = { tag: string; downloadUrl: string } | null;

export function Nav({ release }: { release: Release }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? "border-line/80 bg-bg/75 backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between max-lg:h-14">
        <a href="#top" aria-label="Runnir home" className="shrink-0">
          <Image src="/brand/logo-horizontal-light.png" alt="Runnir" width={130} height={49} priority className="h-[49px] w-auto max-lg:h-10" />
        </a>
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => track("nav_click", { target: l.label })}
                className="text-sm text-fg-2 transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <GitHubLink location="nav" label="Star on GitHub" size="sm" />
          </div>
          <DownloadButton release={release} location="nav" size="sm" align="right" />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg text-fg-2 hover:text-fg lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="container-x pb-3 lg:hidden">
          <ul className="rounded-xl border border-line bg-surface/95 p-2">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => {
                    setOpen(false);
                    track("nav_click", { target: l.label });
                  }}
                  className="block rounded-lg px-3 py-2.5 text-sm text-fg hover:bg-selected"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="p-2">
              <GitHubLink location="mobile-menu" label="Star on GitHub" size="sm" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
