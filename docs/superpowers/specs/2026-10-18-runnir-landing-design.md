# Runnir landing — implementation spec

Source design: `runnir/docs/design/runnir-landing.pen` (frames: Desktop 1440, Tablet 768, Mobile 390, dark). Deployed on Vercel.

## Stack
Next.js 15 App Router, TypeScript, Tailwind v4, pnpm. Fully static except the release lookup (ISR, 5 min). Only runtime dependency besides Next/React: `posthog-js`.

## Page
Nav · Hero (runestone image, headline, CTAs, app window mock) · 01 Launch · 02 Save minutes · 03 One place · Open-source strip · FAQ (addition, for AI/SEO) · Download · Footer. Mocks are JSX, not images. Colour tokens come from the .pen variables.

## Download button
`lib/release.ts` calls `GET https://api.github.com/repos/dil-eight/runnir/releases/latest` with `revalidate: 300`.
- Release with a `.dmg`/`.zip` asset → direct link, shows tag.
- 404 / no asset / error → placeholder "Download · In development": a button that opens an accessible popover ("The first release is in development") with a link to star the repo. Never a dead link.
Repo link everywhere: `https://github.com/dil-eight/runnir`.

## PostHog
`instrumentation-client.ts`, reverse proxy `/ingest` via rewrites, cookieless (`persistence: "memory"`), respects Do Not Track, disabled when `NEXT_PUBLIC_POSTHOG_KEY` is unset. Events: `download_click` (`available`), `download_unavailable_click`, `github_click` (`location`), `nav_click`, `section_view`.

## AI/SEO (signum.ai checker)
`/llms.txt`, `/llms-full.txt`, `/index.md`, `robots.txt` explicitly allowing AI crawlers, `sitemap.xml`, JSON-LD (`SoftwareApplication`, `Organization`, `WebSite`, `FAQPage`), canonical + OG/Twitter + generated OG image, semantic HTML with one `h1`, security headers. Site URL from `NEXT_PUBLIC_SITE_URL` (default `https://runnir.vercel.app`).

## Out of scope
Real release assets, signing/notarisation claims, analytics consent UI beyond a footer note.
