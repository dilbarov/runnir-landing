import { COMPANY, COMPANY_EMAIL, REPO_URL } from "../content";
import type { LegalDoc } from "./types";

const doc: LegalDoc = {
  slug: "privacy",
  title: "Runnir Privacy Policy",
  version: "2026-11-07",
  intro: [
    `${COMPANY}, a Florida limited liability company (“${COMPANY}”, “we”, “us”), develops and promotes Runnir, an open-source macOS app for GitHub Actions, and operates this website. This policy explains what personal data we process when you visit the website or use the Runnir app, why, and what choices you have.`,
    "Short version: the website uses cookieless analytics unless you allow more. The Runnir app sends a few anonymous counts without any identifier, which you can turn off, and more detailed usage counts only if you agree. To look for new versions it asks GitHub directly, without your token or any identifier. It never sends us your code, repository names, logs or tokens.",
  ],
  sections: [
    {
      h: "1. What we collect",
      blocks: [
        "**1.1 When you visit the website.** Our hosting provider records standard request data: IP address, browser and device type, the page requested, referring page and time. We use it to deliver the site and protect it from abuse.",
        "**1.2 Website analytics.** We use PostHog to understand which parts of the page are useful. By default it runs without cookies or local storage: it records page views, page exits and clicks on links and buttons on this site (for example Download, View on GitHub, navigation and copying the git clone command), together with browser, device, referring page and an approximate location that PostHog derives from your IP address. PostHog does not keep the IP address itself. Without your consent, visits cannot be linked to each other. If your browser sends Do Not Track, analytics does not run.",
        "**1.3 If you allow analytics cookies.** When you choose “Accept all” in the cookie banner, PostHog stores a random identifier in a cookie and local storage, so we can tell repeat visits apart. “Only necessary” keeps this off. Either way we store your choice in your browser’s local storage, and nothing else.",
        `**1.4 When you contact us.** If you write to ${COMPANY_EMAIL}, we receive your email address and whatever you include in the message.`,
        "**1.5 The Runnir app.** Runnir runs on your Mac and talks to GitHub, or to your GitHub Enterprise server, directly with your own credentials. Your token is stored only in the macOS Keychain and is never sent to us. Repository contents, workflow files, logs, the secrets and variables you save for local runs, and local paths stay on your Mac. Notifications are sent by your Mac, not through a server.",
        "**1.6 App analytics.** Builds of Runnir that we publish send analytics to PostHog at one of three levels. You choose when you first open a workspace and can change it at any time in Settings › Privacy.",
        {
          list: [
            "Basic counts, the default: that Runnir was installed, sent once, and daily counts of the GitHub Actions minutes that local runs and cancelled runs saved, of local runs and how they ended, and of suggested concurrency blocks you added. They carry no identifier of you or your Mac: each day’s counts are sent under a new random batch number, so one day cannot be linked to another or to you.",
            "Usage analytics, only if you agree: in addition, daily counts of the screens, panels and actions you use and of how runs and syncs turn out, with a random analytics ID that is not linked to you, your Mac or your GitHub account.",
            "Off: nothing is counted or sent.",
          ],
        },
        "Every event also carries the app version, the macOS version and the processor type. Events never contain code, repository, workflow, job, branch or preset names, paths, commit SHAs, run numbers, logs, error messages or anything you type. The PostHog project the app sends to discards the IP address of each request and derives no location from it. Builds you compile yourself send nothing. Settings › Privacy shows what has been counted and what will be sent.",
        "**1.7 Update checks.** Builds of Runnir that we publish ask GitHub which versions of Runnir have been released: when the app starts and once a day while “Check for updates automatically” is on, which it is by default, and whenever you choose Check for Updates. The request goes from your Mac straight to GitHub, without your GitHub token or any identifier, so GitHub receives what any web request carries, such as your IP address, and the Runnir version. A new version is downloaded from GitHub only when you click Download, and installed only when you click Update. We receive nothing from these requests. You can turn the automatic checks off in Settings › About. Builds you compile yourself do not check by default.",
        `**1.8 Bug reports.** Report a Bug in the app shows the app, Core and macOS versions it will fill in, then opens a new issue in Runnir’s public [GitHub repository](${REPO_URL}) in your browser. Nothing is sent before you submit the issue on GitHub, and what you submit there is public.`,
        "**1.9 GitHub.** When you open the Runnir repository, releases or issues, or file a report there, GitHub processes your data under its own privacy statement. Anything you post in a public repository is public.",
        "**1.10 What we do not collect.** We do not collect your source code, repository data, GitHub tokens or payment details, we do not use advertising cookies, and we do not sell or share personal data for cross-context behavioural advertising.",
      ],
    },
    {
      h: "2. Why we use it",
      blocks: [
        {
          list: [
            "To run, secure and fix the website.",
            "To understand, in aggregate, how visitors use the page and improve it.",
            "To learn, in aggregate, how many people install Runnir, how much CI time it saves them and, with consent, which features they use, and improve the app.",
            "To answer your messages and handle privacy requests.",
            "To meet legal obligations and defend legal claims.",
          ],
        },
      ],
    },
    {
      h: "3. Legal bases for users in the EEA and the UK",
      blocks: [
        "Hosting logs and cookieless analytics rely on our legitimate interest in operating a secure, useful website. Analytics cookies and local storage rely on your consent, which you can withdraw at any time through Cookie settings in the footer. The app’s basic counts rely on our legitimate interest in knowing how many people use Runnir and what it saves them; they carry no identifier, and you can turn them off in Settings › Privacy. Usage analytics rely on your consent, which you can withdraw in Settings › Privacy. Update checks rely on our legitimate interest in letting you keep Runnir up to date and secure; you can turn the automatic checks off in Settings › About. Replies to your messages rely on our legitimate interest in answering you, or on steps you ask us to take.",
      ],
    },
    {
      h: "4. Who else processes it",
      blocks: [
        {
          list: [
            "Vercel Inc. hosts the website and processes request data.",
            "PostHog Inc. provides website and app analytics, stored in the United States.",
            "Our email provider processes messages sent to our support address.",
            "GitHub Inc. hosts the source code, releases and issues, answers the app’s update checks and serves its downloads, under its own terms and privacy statement.",
          ],
        },
        "These providers act on our instructions, except GitHub, which acts as an independent controller for your use of github.com and for the requests the app sends it. We may disclose data if the law requires it or to protect the rights and safety of users and the public.",
      ],
    },
    {
      h: "5. How long we keep it",
      blocks: [
        "Hosting logs are kept for the short period our hosting provider retains them. App analytics are kept for one year, and website analytics no longer than 24 months. App counts that have not been sent yet wait on your Mac for at most seven days; turning analytics off deletes them, and leaving Usage analytics deletes the usage counts not sent yet. Emails are kept as long as needed to deal with your request and any follow-up. Update checks leave nothing with us; GitHub keeps its own request logs under its privacy statement. Your cookie choice stays in your browser until you change it or clear site data.",
      ],
    },
    {
      h: "6. Security",
      blocks: [
        "The website is served only over HTTPS with security headers, and the app sends analytics and checks for updates only over HTTPS. Access to analytics and email is limited to people who need it. No method of transmission or storage is completely secure, but we work to protect what we hold.",
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
        `Depending on where you live, you can ask us to access, correct, delete or export your personal data, to restrict or object to its use, and to withdraw consent. California residents have the right to know, delete and correct, and not to be discriminated against for using these rights. Write to ${COMPANY_EMAIL}. To ask about the usage analytics of your Mac, include the analytics ID shown in Settings › Privacy; basic counts carry no ID, so we cannot find them for one person. You can also complain to your local data protection authority.`,
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
