"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";
import { track } from "@/lib/analytics";
import { DownloadButton } from "./DownloadButton";
import { GitHubLink } from "./GitHubLink";
import { Icon } from "./Icon";

type Release = { tag: string; downloadUrl: string } | null;

export function Nav({ release, solid: alwaysSolid = false }: { release: Release; solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = alwaysSolid || scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? // In-app browsers on iOS draw the page under their own translucent top bar, above where top: 0
            // puts this header; a solid strip above the header keeps scrolled content out of that gap
            "border-line/80 bg-bg/75 backdrop-blur-xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-48 before:bg-bg before:content-['']"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between gap-4 max-lg:h-14">
        <a href="/" aria-label="Runnir home" className="shrink-0">
          <Image src="/brand/logo-horizontal-light.png" alt="Runnir" width={130} height={49} priority className="h-8 w-auto min-[400px]:h-10 lg:h-[49px]" />
        </a>
        <ul className="hidden items-center gap-9 xl:flex">
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
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <GitHubLink location="nav" label="Star on GitHub" size="sm" />
          </div>
          <DownloadButton release={release} location="nav" size="sm" align="right" />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg text-fg-2 hover:text-fg xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="container-x pb-3 xl:hidden">
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
