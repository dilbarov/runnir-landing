import { readConsent } from "@/lib/consent";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: host.replace(".i.posthog.com", ".posthog.com"),
        // Cookieless until the visitor chooses "Accept all" in the cookie banner
        persistence: readConsent() === "all" ? "localStorage+cookie" : "memory",
        respect_dnt: true,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
      });
    })
    .catch(() => {});
}
