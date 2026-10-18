import { COMPANY, COMPANY_EMAIL, REPO_URL } from "../content";
import type { LegalDoc } from "./types";

const doc: LegalDoc = {
  slug: "privacy",
  title: "Runnir Privacy Policy",
  version: "2026-10-18",
  intro: [
    `${COMPANY}, a Florida limited liability company (“${COMPANY}”, “we”, “us”), develops and promotes Runnir, an open-source macOS app for GitHub Actions, and operates this website. This policy explains what personal data we process when you visit the website or use the Runnir app, why, and what choices you have.`,
    "Short version: the website uses cookieless analytics unless you allow more, and the Runnir app does not send us your code, your tokens or any telemetry by default.",
  ],
  sections: [
    {
      h: "1. What we collect",
      blocks: [
        "**1.1 When you visit the website.** Our hosting provider records standard request data: IP address, browser and device type, the page requested, referring page and time. We use it to deliver the site and protect it from abuse.",
        "**1.2 Website analytics.** We use PostHog to understand which parts of the page are useful. By default it runs without cookies or local storage: it records page views, page exits and clicks on links and buttons on this site (for example Download, View on GitHub, navigation and copying the git clone command), together with browser, device, referring page and an approximate location that PostHog derives from your IP address. Without your consent, visits cannot be linked to each other. If your browser sends Do Not Track, analytics does not run.",
        "**1.3 If you allow analytics cookies.** When you choose “Accept all” in the cookie banner, PostHog stores a random identifier in a cookie and local storage, so we can tell repeat visits apart. “Only necessary” keeps this off. Either way we store your choice in your browser’s local storage, and nothing else.",
        `**1.4 When you contact us.** If you write to ${COMPANY_EMAIL}, we receive your email address and whatever you include in the message.`,
        "**1.5 The Runnir app.** Runnir runs on your Mac and talks to GitHub directly with your own credentials. Your GitHub token is stored only in the macOS Keychain and is never sent to us. Repository contents, workflow files, logs and local paths stay on your Mac. The current app sends no analytics or crash data to us. If a future version offers optional analytics or crash reporting, it will be off until you turn it on, will exclude repository content, credentials and personal paths, and will show you a report before anything is sent.",
        "**1.6 GitHub.** When you open the Runnir repository, releases or issues, or file a report there, GitHub processes your data under its own privacy statement. Anything you post in a public repository is public.",
        "**1.7 What we do not collect.** We do not collect your source code, repository data, GitHub tokens or payment details, we do not use advertising cookies, and we do not sell or share personal data for cross-context behavioural advertising.",
      ],
    },
    {
      h: "2. Why we use it",
      blocks: [
        {
          list: [
            "To run, secure and fix the website.",
            "To understand, in aggregate, how visitors use the page and improve it.",
            "To answer your messages and handle privacy requests.",
            "To meet legal obligations and defend legal claims.",
          ],
        },
      ],
    },
    {
      h: "3. Legal bases for users in the EEA and the UK",
      blocks: [
        "Hosting logs and cookieless analytics rely on our legitimate interest in operating a secure, useful website. Analytics cookies and local storage rely on your consent, which you can withdraw at any time through Cookie settings in the footer. Replies to your messages rely on our legitimate interest in answering you, or on steps you ask us to take.",
      ],
    },
    {
      h: "4. Who else processes it",
      blocks: [
        {
          list: [
            "Vercel Inc. hosts the website and processes request data.",
            "PostHog Inc. provides website analytics.",
            "Our email provider processes messages sent to our support address.",
            "GitHub Inc. hosts the source code, releases and issues, under its own terms and privacy statement.",
          ],
        },
        "These providers act on our instructions, except GitHub, which acts as an independent controller for your use of github.com. We may disclose data if the law requires it or to protect the rights and safety of users and the public.",
      ],
    },
    {
      h: "5. How long we keep it",
      blocks: [
        "Hosting logs are kept for the short period our hosting provider retains them. Analytics data is kept no longer than 24 months. Emails are kept as long as needed to deal with your request and any follow-up. Your cookie choice stays in your browser until you change it or clear site data.",
      ],
    },
    {
      h: "6. Security",
      blocks: [
        "The website is served only over HTTPS with security headers. Access to analytics and email is limited to people who need it. No method of transmission or storage is completely secure, but we work to protect what we hold.",
      ],
    },
    {
      h: "7. Where it is processed",
      blocks: [
        "We and our providers process data in the United States and other countries where they operate. Where the law requires it, transfers are protected by safeguards such as the European Commission’s standard contractual clauses.",
      ],
    },
    {
      h: "8. Your rights",
      blocks: [
        `Depending on where you live, you can ask us to access, correct, delete or export your personal data, to restrict or object to its use, and to withdraw consent. California residents have the right to know, delete and correct, and not to be discriminated against for using these rights. Write to ${COMPANY_EMAIL}. You can also complain to your local data protection authority.`,
      ],
    },
    {
      h: "9. Age",
      blocks: ["The website and Runnir are meant for developers and are not directed to children under 13, or under 16 in the EEA and the UK."],
    },
    {
      h: "10. Changes to this policy",
      blocks: [
        "When we change this policy, we publish a new version with a new date. Earlier versions stay available unchanged at [All versions](/legal).",
      ],
    },
    {
      h: "11. Contact",
      blocks: [
        {
          list: [
            `Company: ${COMPANY}`,
            "Product: Runnir",
            `Email: [${COMPANY_EMAIL}](mailto:${COMPANY_EMAIL})`,
            `Source code: [${REPO_URL.replace("https://", "")}](${REPO_URL})`,
            "Location: Florida, United States",
          ],
        },
      ],
    },
  ],
};

export default doc;
