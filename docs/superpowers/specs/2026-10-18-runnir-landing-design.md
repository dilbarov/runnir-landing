# Runnir landing — implementation spec

Source design: `runnir/docs/design/runnir-landing.pen` (frames: Desktop 1440, Tablet 768, Mobile 390, dark). Deployed on Vercel.

## Stack
Next.js 15 App Router, TypeScript, Tailwind v4, pnpm. Fully static except the release lookup (ISR, 30 min). Only runtime dependency besides Next/React: `posthog-js`.

## Page
Nav · Hero (runestone image, headline, CTAs, app window: the Overview's scenario lanes) · 01 Launch · 02 Run locally · 03 Pipelines · 04 Menu bar · Open-source strip · FAQ (addition, for AI/SEO) · Download · Footer. Mocks are JSX, not images, and copy the app's screens in `runnir/docs/design/runnir.pen` (S03 Overview, S08 run, S10 Run locally, S19 menu bar). Colour tokens come from the .pen variables.

## Download button
`lib/release.ts` calls `GET https://api.github.com/repos/dil-eight/runnir/releases?per_page=30` with `revalidate: 1800` (`releases/latest` leaves out pre-releases, and the first builds are alphas). Design: `runnir-landing.pen`, "Download button / states".
- The newest published release with a `.dmg`/`.zip` asset wins, even over a newer pre-release; while there is none, the newest alpha or beta with one. Drafts never. Direct link, with the tag as a badge (an alpha or beta in the warning colour; the nav shows it from 640 px up).
- The FAQ ("Can I download Runnir today?", "What works today"), the feature badges ("Built for v0.1", "In the alpha", "Available"), the line under the Download section, JSON-LD and the Markdown pages follow the same release.
- GitHub error (rate limit, outage, network) in production → throws, so ISR keeps the last generated page and its download link.
- Nothing published / no asset → placeholder "Download · In development": a button that opens an accessible popover ("The first release is in development") with a link to star the repo. Never a dead link.
Repo link everywhere: `https://github.com/dil-eight/runnir`.

## PostHog
`instrumentation-client.ts`, reverse proxy `/ingest` via rewrites, cookieless (`persistence: "memory"`), respects Do Not Track, disabled when `NEXT_PUBLIC_POSTHOG_KEY` is unset. Events: `download_click` (`available`), `download_unavailable_click`, `github_click` (`location`), `nav_click`, `section_view`.

## AI/SEO (signum.ai checker)
`/llms.txt`, `/llms-full.txt`, `/index.md`, `robots.txt` explicitly allowing AI crawlers, `sitemap.xml`, JSON-LD (`SoftwareApplication`, `Organization`, `WebSite`, `FAQPage`), canonical + OG/Twitter + generated OG image, semantic HTML with one `h1`, security headers. Site URL from `NEXT_PUBLIC_SITE_URL` (default `https://runnir.vercel.app`).

## Out of scope
Real release assets, signing/notarisation claims, analytics consent UI beyond a footer note.
