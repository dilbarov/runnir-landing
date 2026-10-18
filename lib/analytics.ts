export function track(event: string, props?: Record<string, unknown>) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  import("posthog-js")
    .then(({ default: posthog }) => {
      if (posthog.__loaded) posthog.capture(event, props);
    })
    .catch(() => {});
}
