import { COMPANY, COMPANY_EMAIL, DESCRIPTION, FAQ, FEATURES, REPO_URL, RELEASES_URL, SITE_URL, TRUST } from "./content";
import { getLatestRelease } from "./release";

export async function downloadLine() {
  const r = await getLatestRelease();
  return r
    ? `Latest release ${r.tag}: ${r.downloadUrl}`
    : "Download: the first release is in development and not available yet. Signed and notarized builds do not exist yet.";
}

export async function pageMarkdown() {
  const dl = await downloadLine();
  return `# Runnir

> ${DESCRIPTION}

Website: ${SITE_URL}
Source code: ${REPO_URL}
Releases: ${RELEASES_URL}
Requirements: macOS 15 or newer. License: GPLv3.
Developer: Runnir is developed and promoted by ${COMPANY} (Florida, United States). Contact: ${COMPANY_EMAIL}

${dl}

## What Runnir does

${FEATURES.map((f) => `### ${f.index} ${f.label} (${f.status.text})\n\n**${f.title}** ${f.body}\n\n${f.points.map((p) => `- ${p}`).join("\n")}`).join("\n\n")}

## Open source and privacy

${TRUST.map((t) => `- **${t.title}**: ${t.body}`).join("\n")}

## FAQ

${FAQ.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Legal

- Privacy Policy: ${SITE_URL}/privacy
- Terms of Use: ${SITE_URL}/terms
- All versions: ${SITE_URL}/legal
`;
}

export function llmsTxt() {
  return `# Runnir

> ${DESCRIPTION}

Runnir is a native SwiftUI macOS app with a portable Go Core, developed and promoted by ${COMPANY} (Florida, United States). It is free, licensed under GPLv3 and requires macOS 15 or newer. The first release is in development; the source is public.

## Website

- [Runnir home page](${SITE_URL}/): product overview, features and FAQ
- [Home page as Markdown](${SITE_URL}/index.md): the same content in plain Markdown
- [Full text for LLMs](${SITE_URL}/llms-full.txt): complete content in one file

## Project

- [Source code on GitHub](${REPO_URL}): repository, issues and discussions
- [Releases](${RELEASES_URL}): downloadable builds, once published
- [Documentation](${REPO_URL}/tree/main/docs): architecture, product specification and design notes
- [README](${REPO_URL}#readme): current status and development instructions
- [Contributing](${REPO_URL}/blob/main/CONTRIBUTING.md): how to contribute
- [Security policy](${REPO_URL}/blob/main/SECURITY.md): how to report vulnerabilities

## Legal

- [Privacy Policy](${SITE_URL}/privacy): data handled by the website and the app
- [Terms of Use](${SITE_URL}/terms): terms for the website and services
- [All versions](${SITE_URL}/legal): every published version with SHA-256 fingerprints

## Optional

- [License (GPLv3)](${REPO_URL}/blob/main/LICENSE)
- Contact ${COMPANY}: ${COMPANY_EMAIL}
`;
}
