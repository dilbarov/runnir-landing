const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: host.replace(".i.posthog.com", ".posthog.com"),
        persistence: "memory",
        respect_dnt: true,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
      });
    })
    .catch(() => {});
}
