import Image from "next/image";
import { TAGLINE } from "@/lib/content";
import { AppWindow } from "./AppWindow";
import { DownloadButton } from "./DownloadButton";
import { GitHubLink } from "./GitHubLink";

type Release = { tag: string; downloadUrl: string } | null;

export function Hero({ release }: { release: Release }) {
  return (
    <section id="top" aria-labelledby="hero-h" className="relative overflow-hidden">
      {/* Wider than the design frame: a blurred copy of the scene continues the fog to the edges */}
      <div aria-hidden="true" className="hero-stone pointer-events-none absolute inset-x-0 top-0 hidden h-[810px] min-[1440px]:block">
        <Image src="/brand/runestone-hero.webp" alt="" fill sizes="640px" className="scale-110 object-cover opacity-70 blur-2xl" />
      </div>
      {/* The stone keeps its design size (1440 × 810) and fades into the backdrop at the sides */}
      <div
        aria-hidden="true"
        className="hero-stone pointer-events-none absolute left-1/2 top-0 h-[560px] w-full max-w-[1440px] -translate-x-1/2 md:h-[640px] lg:h-[810px] min-[1440px]:[mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]"
      >
        <div className="hero-photo absolute inset-0">
          <Image
            src="/brand/runestone-hero.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="object-cover object-top"
          />
        </div>
        {/* Carved runes light up bottom-to-top, then breathe; scrolling makes them brighter */}
        <div className="runes-boost absolute inset-0">
          <div className="runes absolute inset-0">
            <div className="rune-bloom absolute inset-0">
              <div className="rune-glow" />
            </div>
            <div className="rune-glow" />
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[linear-gradient(180deg,rgb(20_22_26/0)_0%,rgb(20_22_26/0)_24%,#14161a_50%)] lg:h-[1520px] lg:bg-[linear-gradient(180deg,rgb(20_22_26/0)_0%,rgb(20_22_26/0)_34%,#14161a_52%)]"
      />
      <div className="container-x relative flex flex-col items-center pt-[360px] text-center md:pt-[440px] lg:pt-[475px]">
        <div className="hero-head relative z-10 flex w-full flex-col items-center">
          <h1
            id="hero-h"
            className="hero-title max-w-[760px] text-balance text-[36px] font-bold leading-[1.1] tracking-tight text-white md:text-[52px] lg:text-[64px]"
          >
            A faster way to run
            <br />
            GitHub Actions.
          </h1>
          <p
            style={{ "--d": "0.55s" } as React.CSSProperties}
            className="hero-in mt-6 max-w-[560px] text-balance text-[17px] leading-relaxed text-[#eef2ff] md:text-[19px]"
          >
            Launch workflows, test them locally and watch every pipeline from one native Mac window. Open source.
          </p>
          <div
            style={{ "--d": "0.75s" } as React.CSSProperties}
            className="hero-in mt-6 flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center"
          >
            <DownloadButton release={release} location="hero" />
            <GitHubLink location="hero" label="View on GitHub" />
          </div>
          <p style={{ "--d": "0.95s" } as React.CSSProperties} className="hero-in mt-6 text-[13px] text-[#e3e9fa]">
            macOS 15+ · Free · GPLv3 · No telemetry by default
          </p>
        </div>
        <div className="hero-window mt-7 w-full">
          <span className="sr-only">{TAGLINE}</span>
          <div className="hero-tilt">
            <AppWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
