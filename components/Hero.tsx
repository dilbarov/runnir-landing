import Image from "next/image";
import { TAGLINE } from "@/lib/content";
import { AppWindow } from "./AppWindow";
import { DownloadButton } from "./DownloadButton";
import { GitHubLink } from "./GitHubLink";

type Release = { tag: string; downloadUrl: string } | null;

export function Hero({ release }: { release: Release }) {
  return (
    <section id="top" aria-labelledby="hero-h" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] md:h-[640px] lg:h-[810px]">
        <Image
          src="/brand/runestone-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[linear-gradient(180deg,rgb(20_22_26/0)_0%,rgb(20_22_26/0)_26%,#14161a_56%)] lg:h-[1520px] lg:bg-[linear-gradient(180deg,rgb(20_22_26/0)_0%,rgb(20_22_26/0)_34%,#14161a_52%)]"
      />
      <div className="container-x relative flex flex-col items-center pt-[360px] text-center md:pt-[440px] lg:pt-[475px]">
        <h1
          id="hero-h"
          className="max-w-[760px] text-balance text-[36px] font-bold leading-[1.1] tracking-tight text-white md:text-[52px] lg:text-[64px]"
        >
          A faster way to run
          <br />
          GitHub Actions.
        </h1>
        <p className="mt-6 max-w-[560px] text-balance text-[17px] leading-relaxed text-[#eef2ff] md:text-[19px]">
          Launch workflows, test them locally and watch every pipeline from one native Mac window. Open source.
        </p>
        <div className="mt-6 flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center">
          <DownloadButton release={release} location="hero" />
          <GitHubLink location="hero" label="View on GitHub" />
        </div>
        <p className="mt-6 text-[13px] text-[#e3e9fa]">macOS 15+ · Free · GPLv3 · No telemetry by default</p>
        <div className="mt-7 w-full">
          <span className="sr-only">{TAGLINE}</span>
          <AppWindow />
        </div>
      </div>
    </section>
  );
}
