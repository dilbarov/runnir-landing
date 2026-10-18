"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";

/** Floating "back to top" button, shown once the visitor has scrolled past the first screen. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        track("back_to_top");
      }}
      className={`fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-line bg-surface/85 text-fg-2 shadow-lg backdrop-blur-md transition-[opacity,transform,color] duration-300 hover:text-fg md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="arrowUp" size={18} />
    </button>
  );
}
