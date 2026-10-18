# Runnir landing

Next.js 15 (App Router) + Tailwind v4 landing for [Runnir](https://github.com/dil-eight/runnir). Design source: `runnir/docs/design/runnir-landing.pen`.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

## Environment (set in Vercel → Project → Settings → Environment Variables)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL: canonical, sitemap, `llms.txt`, JSON-LD |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key. Analytics is off when unset |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` (default) or `https://eu.i.posthog.com` |
| `GITHUB_TOKEN` | Optional, raises the GitHub API rate limit for the release lookup |

## Download button

`lib/release.ts` reads the latest GitHub release (revalidated every 5 min). With a `.dmg`/`.zip` asset the buttons link to it; otherwise they show an "In development" placeholder that opens an explanation and a link to the repo.

## AI / SEO

`/llms.txt`, `/llms-full.txt`, `/index.md`, `robots.txt` (AI crawlers allowed), `sitemap.xml`, JSON-LD (WebSite, Organization, SoftwareApplication, FAQPage), OG image, security headers. Content lives in `lib/content.ts` and feeds the page, the markdown files and the structured data.

## Deploy

Import the repo in Vercel (framework preset: Next.js, default settings).
