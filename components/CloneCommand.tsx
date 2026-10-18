"use client";

import { useEffect, useState } from "react";
import { REPO_URL } from "@/lib/content";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";

const COMMAND = `git clone ${REPO_URL}.git`;

export function CloneCommand() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMMAND);
    } catch {
      // Clipboard API is unavailable (insecure context, denied permission): fall back to a hidden textarea
      const ta = document.createElement("textarea");
      ta.value = COMMAND;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      if (!ok) return;
    }
    setCopied(true);
    track("clone_copy");
  }

  return (
    <div className="flex max-w-full items-center gap-3.5 rounded-lg bg-editor py-1.5 pl-[18px] pr-1.5 font-mono text-[13px]">
      <span className="text-accent">$</span>
      <code className="min-w-0 overflow-x-auto whitespace-nowrap text-fg">{COMMAND}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy git clone command"}
        title={copied ? "Copied" : "Copy"}
        className={`grid size-8 shrink-0 place-items-center rounded-md transition-colors hover:bg-surface ${copied ? "text-success" : "text-fg-2 hover:text-fg"}`}
      >
        <Icon name={copied ? "check" : "copy"} size={15} />
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Command copied to clipboard" : ""}
      </span>
    </div>
  );
}
