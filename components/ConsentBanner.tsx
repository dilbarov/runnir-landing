"use client";

import { useEffect, useState } from "react";
import { analyticsEnabled, CONSENT_OPEN_EVENT, readConsent, writeConsent, type Consent } from "@/lib/consent";

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: Consent) => {
    writeConsent(c);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie settings"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[560px] rounded-xl border border-line bg-surface/95 p-5 shadow-2xl backdrop-blur-xl"
    >
      <p className="text-sm font-semibold text-fg">Cookies on this site</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-fg-2">
        Analytics runs without cookies by default. Allow cookies so we can tell repeat visits apart, or keep only what is necessary.
        You can change this any time in Cookie settings. Details in the{" "}
        <a href="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => choose("necessary")} className="btn-secondary rounded-lg px-4 py-2 text-sm font-medium">
          Only necessary
        </button>
        <button type="button" onClick={() => choose("all")} className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold">
          Accept all
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  if (!analyticsEnabled) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
