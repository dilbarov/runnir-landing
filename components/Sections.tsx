import Image from "next/image";
import { COMPANY, FAQ, REPO_URL, RELEASES_URL, TRUST } from "@/lib/content";
import { CookieSettingsButton } from "./ConsentBanner";
import { CloneCommand } from "./CloneCommand";
import { DownloadButton } from "./DownloadButton";
import { GitHubLink } from "./GitHubLink";
import { Icon } from "./Icon";

type Release = { tag: string; downloadUrl: string } | null;

export function Trust() {
  return (
    <section id="open-source" aria-label="Open source and privacy" className="bg-bg-alt">
      <ul className="container-x grid gap-8 py-16 md:grid-cols-3 md:gap-12 md:py-[72px]">
        {TRUST.map((t) => (
          <li key={t.title} className="flex items-start gap-3.5">
            <Icon name={t.icon} size={22} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <h3 className="text-base font-semibold text-fg">{t.title}</h3>
              <p className="mt-1 text-sm text-fg-2">{t.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-bg">
      <div className="container-x py-20 lg:py-28">
        <h2 id="faq-h" className="text-[32px] font-bold tracking-tight text-fg md:text-[40px]">
          Questions, answered.
        </h2>
        <dl className="mt-10 grid gap-x-16 gap-y-8 md:grid-cols-2">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt className="text-[17px] font-semibold text-fg">{f.q}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-fg-2">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function DownloadSection({ release }: { release: Release }) {
  return (
    <section
      id="download"
      aria-labelledby="download-h"
      className="bg-bg bg-[radial-gradient(ellipse_90%_90%_at_50%_100%,#26345f_0%,#14161a_100%)]"
    >
      <div className="container-x flex flex-col items-center gap-7 py-20 text-center lg:py-32">
        <h2 id="download-h" className="text-balance text-[36px] font-bold leading-tight tracking-tight text-fg md:text-[52px]">
          Try Runnir on your Mac.
        </h2>
        <p className="text-[17px] text-fg-2">Free, open source, macOS 15 or newer.</p>
        <div className="grid w-full gap-3.5 sm:w-auto sm:grid-cols-2">
          <DownloadButton release={release} location="download" label="Download latest release" />
          <GitHubLink location="download" label="View on GitHub" />
        </div>
        <CloneCommand />
        <p className="text-[13px] text-fg-2">
          {release ? `Latest release ${release.tag}. ` : ""}Signed and notarized builds are not available yet.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  const links = [
    { href: REPO_URL, label: "GitHub" },
    { href: RELEASES_URL, label: "Releases" },
    { href: `${REPO_URL}/tree/main/docs`, label: "Docs" },
    { href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, label: "Contributing" },
    { href: `${REPO_URL}/blob/main/SECURITY.md`, label: "Security" },
  ];
  const legal = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/legal", label: "All versions" },
    { href: `${REPO_URL}/blob/main/LICENSE`, label: "License (GPLv3)", external: true },
  ];
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-x flex flex-col items-center gap-6 py-7 md:flex-row md:justify-between">
        <a href="/" aria-label="Runnir home">
          <Image src="/brand/logo-horizontal-light.png" alt="Runnir" width={92} height={35} className="h-[35px] w-auto" />
        </a>
        <nav aria-label="Project">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-[13px] text-fg">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener" className="hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-center text-[13px] text-fg-2 md:text-right">
          Developed and promoted by <span className="text-fg">{COMPANY}</span>
        </p>
      </div>
      <div className="border-t border-line/60">
        <div className="container-x flex flex-col items-center gap-4 py-6 text-[12.5px] text-fg-2 md:flex-row md:justify-between">
          <p className="text-center md:text-left">
            © {year} {COMPANY}. Runnir source code is licensed under GPLv3.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener" } : {})} className="hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="hover:text-fg" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
