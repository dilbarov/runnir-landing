export type Consent = "all" | "necessary";

const KEY = "runnir-consent";
export const CONSENT_OPEN_EVENT = "runnir:consent-open";
export const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

/** Stores the choice (the only thing kept without consent) and switches PostHog persistence to match. */
export function writeConsent(c: Consent) {
  try {
    window.localStorage.setItem(KEY, c);
  } catch {}
  if (!analyticsEnabled) return;
  import("posthog-js")
    .then(({ default: posthog }) => {
      if (!posthog.__loaded) return;
      if (c === "all") posthog.set_config({ persistence: "localStorage+cookie" });
      else {
        posthog.reset();
        posthog.set_config({ persistence: "memory" });
      }
    })
    .catch(() => {});
}
