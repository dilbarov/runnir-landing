"use client";

import { REPO_URL } from "@/lib/content";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";

export function GitHubLink({
  location,
  label,
  size = "lg",
}: {
  location: string;
  label: string;
  size?: "sm" | "lg";
}) {
  const cls =
    size === "sm"
      ? "px-3.5 py-[9px] text-sm font-medium gap-2"
      : "px-[26px] py-[15px] text-base font-semibold gap-2.5";
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener"
      onClick={() => track("github_click", { location })}
      className={`btn-secondary inline-flex items-center justify-center rounded-[10px] transition-colors ${cls}`}
    >
      <Icon name="github" size={size === "sm" ? 16 : 18} />
      {label}
    </a>
  );
}
