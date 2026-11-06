export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://runnir.vercel.app").replace(/\/$/, "");
export const REPO = "dil-eight/runnir";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;

export const COMPANY = "DIL EIGHT LLC";
export const COMPANY_FULL = "DIL EIGHT LLC, a Florida limited liability company";
export const COMPANY_EMAIL = "support@dil8.io";
export const COMPANY_GITHUB = "https://github.com/dil-eight";

export const NAME = "Runnir";
export const TITLE = "Runnir — a faster way to run GitHub Actions on your Mac";
export const TAGLINE = "A faster way to run GitHub Actions.";
export const DESCRIPTION =
  "Runnir is an open-source native macOS app to launch GitHub Actions workflows, test them locally and watch every pipeline from one window and the menu bar. Free and licensed under Apache 2.0.";

export const NAV = [
  { href: "/#launch", label: "Launch" },
  { href: "/#run-locally", label: "Run locally" },
  { href: "/#pipelines", label: "Pipelines" },
  { href: "/#menu-bar", label: "Menu bar" },
  { href: "/#open-source", label: "Open source" },
];

export type Feature = {
  id: "launch" | "run-locally" | "pipelines" | "menu-bar";
  index: string;
  label: string;
  status: { text: string; tone: "planned" | "built" };
  title: string;
  body: string;
  points: string[];
};

// Built and tested, not released: the first signed build from a tag is still to come.
const BUILT = { text: "Built for v0.1", tone: "built" } as const;

export const FEATURES: Feature[] = [
  {
    id: "launch",
    index: "01",
    label: "Launch",
    status: BUILT,
    title: "Launch any workflow without opening GitHub.",
    body: "Stop hunting through the Actions tab and retyping inputs. Pick a branch, fill in typed inputs, or start a saved launch in one click.",
    points: [
      "Typed inputs, checked before anything is sent",
      "Launches shared in .runnir/launches or kept on your Mac",
      "Manual jobs start right from the pipeline",
    ],
  },
  {
    id: "run-locally",
    index: "02",
    label: "Run locally",
    status: BUILT,
    title: "Catch the typo before the pipeline does.",
    body: "Every “fix ci” commit costs a push, a queue and a failed run. Check the workflow offline and run its jobs on your Mac first. Runnir counts the Actions minutes each local run saved.",
    points: [
      "Offline actionlint diagnostics with file and line",
      "Jobs run with act on OrbStack, Docker Desktop or Colima",
      "Secrets and variables from your Keychain, per environment",
    ],
  },
  {
    id: "pipelines",
    index: "03",
    label: "Pipelines",
    status: BUILT,
    title: "Every pipeline. One window.",
    body: "See which workflows a pull request will start, what runs after them and what waits for you. When a run fails, Runnir shows the step and opens its log.",
    points: [
      "Triggers, chains and manual stages in one scenario",
      "The failed step and its log one click away",
      "Cancel and re-run failed jobs, with a confirmation",
    ],
  },
  {
    id: "menu-bar",
    index: "04",
    label: "Menu bar",
    status: BUILT,
    title: "Your CI, one click away.",
    body: "Your pull requests with their checks, and the failed and running runs of your workspaces and starred repositories, wait in the menu bar. Notifications come from your Mac, not from a server.",
    points: [
      "Pull requests with their GitHub Actions checks",
      "Failed and running runs across your workspaces and stars",
      "⌥⌘R opens the list from any app",
    ],
  },
];

export const TRUST = [
  { icon: "shield", title: "Keychain only", body: "Tokens never touch files or logs." },
  { icon: "eyeOff", title: "Anonymous counts only", body: "No id, off in Settings › Privacy. Usage data only if you agree." },
  { icon: "code", title: "Open source, Apache 2.0", body: "Native SwiftUI app with a portable Go Core." },
] as const;

export const FAQ = [
  {
    q: "What is Runnir?",
    a: "Runnir is an open-source native macOS app for GitHub Actions. It launches workflows with typed inputs, checks and runs them locally with act, shows what a pull request will start and where a run failed, and keeps your pull requests and runs in the menu bar.",
  },
  {
    q: "Who develops Runnir?",
    a: "Runnir is developed and promoted by DIL EIGHT LLC, a Florida limited liability company. The source code is open under the Apache License 2.0 and welcomes outside contributions on GitHub.",
  },
  {
    q: "Can I download Runnir today?",
    a: "Not yet. The first release is in development and no signed and notarized build has been published. The source code is public on GitHub, and this page switches the Download button to a real link as soon as a release is published.",
  },
  {
    q: "Which Macs does Runnir support?",
    a: "Runnir targets macOS 15 or newer. It is a native SwiftUI and AppKit app with a portable Go Core, not an Electron app.",
  },
  {
    q: "Is Runnir free and open source?",
    a: "Yes. Runnir is free and licensed under the Apache License 2.0. The code lives at github.com/dil-eight/runnir.",
  },
  {
    q: "Does Runnir collect analytics?",
    a: "Only anonymous counts without any id: that Runnir was installed, and how many GitHub Actions minutes local runs and cancelled runs saved. You can turn them off in Settings › Privacy. Counts of the screens and actions you use, with a random id, are sent only if you agree. Never your code, repository or workflow names, logs or tokens. This website uses cookieless analytics unless you allow more, and respects Do Not Track.",
  },
  {
    q: "Where does Runnir store my GitHub token?",
    a: "Only in the macOS Keychain. Tokens are never written to files or logs.",
  },
  {
    q: "What works today and what is planned?",
    a: "Built for the first release: running workflows with typed inputs and saved launches, offline actionlint validation, local runs with act, runs with their jobs and logs, cancel and re-run, the Overview of what a pull request starts, the menu bar with pull requests and runs across repositories, notifications and GitHub Enterprise servers. Still to come: the first signed build from a release tag, automatic updates and local runs checked with the full GitHub runner images.",
  },
  {
    q: "Do I need Docker to use Runnir?",
    a: "Only for local runs. Runnir bundles act and uses your own container engine: OrbStack, Docker Desktop or Colima. Browsing workflows, running them on GitHub and reading logs do not need it.",
  },
];
