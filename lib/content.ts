export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://runnir.vercel.app").replace(/\/$/, "");
export const REPO = "dil-eight/runnir";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;

export const NAME = "Runnir";
export const TITLE = "Runnir — a faster way to run GitHub Actions on your Mac";
export const TAGLINE = "A faster way to run GitHub Actions.";
export const DESCRIPTION =
  "Runnir is an open-source native macOS app to launch GitHub Actions workflows, test them locally and watch every pipeline from one window. Free, GPLv3, no telemetry by default.";

export const NAV = [
  { href: "#launch", label: "Launch" },
  { href: "#save-minutes", label: "Save minutes" },
  { href: "#one-place", label: "One place" },
  { href: "#open-source", label: "Open source" },
];

export type Feature = {
  id: string;
  index: string;
  label: string;
  status: { text: string; tone: "planned" | "available" };
  title: string;
  body: string;
  points: string[];
};

export const FEATURES: Feature[] = [
  {
    id: "launch",
    index: "01",
    label: "Launch",
    status: { text: "Planned for v0.1", tone: "planned" },
    title: "Launch any workflow without opening GitHub.",
    body: "Stop hunting through the Actions tab and retyping inputs. Save a launch once, then start it from your Mac whenever you need it.",
    points: [
      "Typed inputs, validated before anything is sent",
      "Presets stored in .runnir/presets.yml, versioned with your repo",
      "Manual pipeline jobs shown right in the stage view",
    ],
  },
  {
    id: "save-minutes",
    index: "02",
    label: "Save minutes",
    status: { text: "Planned for v0.1", tone: "planned" },
    title: "Catch the typo before the pipeline does.",
    body: "Every “fix ci” commit costs a push, a queue and a failed run. Edit the workflow, check it offline and run it locally before anything leaves your machine.",
    points: [
      "Offline actionlint diagnostics with file and line",
      "Run locally with act on Docker or OrbStack",
      "Nothing is committed or pushed for you",
    ],
  },
  {
    id: "one-place",
    index: "03",
    label: "One place",
    status: { text: "Available · read-only", tone: "available" },
    title: "Every pipeline. One window.",
    body: "Switch between workflows, branches and repositories without ten browser tabs. See every pipeline, its jobs and the latest runs side by side.",
    points: [
      "Pipeline stages and jobs at a glance",
      "Recent runs across workflows, with logs one click away",
      "One window per repository, restored on relaunch",
    ],
  },
];

export const TRUST = [
  { icon: "shield", title: "Keychain only", body: "Tokens never touch files or logs." },
  { icon: "eyeOff", title: "No telemetry by default", body: "Reports are previewed before they leave your Mac." },
  { icon: "code", title: "Open source, GPLv3", body: "Native SwiftUI app with a portable Go Core." },
] as const;

export const FAQ = [
  {
    q: "What is Runnir?",
    a: "Runnir is an open-source native macOS workspace for GitHub Actions and local workflow development. It lets you launch workflows, validate and test them locally, and watch every pipeline from one window.",
  },
  {
    q: "Can I download Runnir today?",
    a: "Not yet. The first release is in development and no signed or notarized builds exist yet. The source code is public on GitHub, and this page switches the Download button to a real link as soon as a release is published.",
  },
  {
    q: "Which Macs does Runnir support?",
    a: "Runnir targets macOS 15 or newer. It is a native SwiftUI and AppKit app with a portable Go Core, not an Electron app.",
  },
  {
    q: "Is Runnir free and open source?",
    a: "Yes. Runnir is free and licensed under GPLv3. The code lives at github.com/dil-eight/runnir.",
  },
  {
    q: "Does Runnir collect telemetry?",
    a: "No telemetry by default. Any analytics or crash reports are optional, and reports are previewed before they leave your Mac. This marketing website uses cookieless analytics and respects Do Not Track.",
  },
  {
    q: "Where does Runnir store my GitHub token?",
    a: "Only in the macOS Keychain. Tokens are never written to files or logs.",
  },
  {
    q: "What works today and what is planned?",
    a: "Today: importing local repositories, a read-only workflow browser and independent, restorable workspace windows. Planned for v0.1: typed workflow dispatch, offline actionlint validation, run and log inspection, and local execution with act.",
  },
  {
    q: "Do I need Docker to use Runnir?",
    a: "Only for local workflow execution, which is planned for v0.1 and uses act on Docker or OrbStack. Browsing workflows and runs does not require it.",
  },
];
