import { COMPANY, COMPANY_EMAIL, REPO_URL } from "../content";
import type { LegalDoc } from "./types";

const doc: LegalDoc = {
  slug: "terms",
  title: "Runnir Terms of Use",
  version: "2026-10-18",
  intro: [
    `These Terms govern your use of the Runnir website and related services operated by ${COMPANY}, a Florida limited liability company (“${COMPANY}”, “we”, “us”). By using the website you agree to them. The Runnir software itself is licensed under the GNU General Public License v3, as described in section 2.`,
  ],
  sections: [
    {
      h: "1. Who may use the website",
      blocks: ["You must be at least 13 years old, or 16 in the EEA and the UK. If you use the website for an organisation, you confirm that you may accept these Terms on its behalf."],
    },
    {
      h: "2. The software and its licence",
      blocks: [
        `Runnir’s source code and builds are licensed under the [GNU General Public License v3](${REPO_URL}/blob/main/LICENSE). Your rights to use, study, modify and share the software come from that licence. Nothing in these Terms restricts them, and if these Terms and the GPLv3 conflict about the software, the GPLv3 prevails. Third-party components are covered by their own licences.`,
        "Contributions to the repository are made under the GPLv3 and the project’s contributing guidelines.",
      ],
    },
    {
      h: "3. A product in development",
      blocks: [
        "Runnir is under active development. Features marked as planned are not available yet, and we do not promise release dates. Signed and notarized builds are not available yet. Pre-release builds may be incomplete or unstable.",
      ],
    },
    {
      h: "4. GitHub and your workflows",
      blocks: [
        "Runnir works with GitHub and with local tools such as act, Docker and OrbStack. Your use of those services is governed by their own terms. You are responsible for the repositories you connect and for the workflows you dispatch, re-run, cancel or run locally, including any GitHub Actions minutes or other costs they cause. Runnir does not commit or push changes for you.",
      ],
    },
    {
      h: "5. Acceptable use",
      blocks: [
        {
          list: [
            "Do not attack, overload or try to break the security of the website.",
            "Do not use the website to break the law or infringe anyone’s rights.",
            "Do not present a modified version of Runnir as an official release from us.",
          ],
        },
        "Search engines and AI crawlers may index the website as allowed by robots.txt.",
      ],
    },
    {
      h: "6. Names, logos and website content",
      blocks: [
        `The Runnir name and logo are trademarks of ${COMPANY}. The GPLv3 licences the code, not the trademarks: forks may describe themselves as based on Runnir, but may not use the name or logo in a way that suggests our endorsement. Website text and design are © ${COMPANY}, unless stated otherwise.`,
      ],
    },
    {
      h: "7. Disclaimer of warranties",
      blocks: [
        "The website and the software are provided “as is” and “as available”, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement, to the fullest extent the law allows. The GPLv3 contains its own disclaimer for the software.",
      ],
    },
    {
      h: "8. Limitation of liability",
      blocks: [
        `To the fullest extent the law allows, ${COMPANY} is not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, data or goodwill, arising from the website or the software. Our total liability for any claim relating to them is limited to USD 100.`,
      ],
    },
    {
      h: "9. Changes and suspension",
      blocks: ["We may change, suspend or stop the website or any service at any time. The source code you received under the GPLv3 remains yours to use under that licence."],
    },
    {
      h: "10. Governing law",
      blocks: [
        "These Terms are governed by the laws of the State of Florida, United States, without regard to conflict-of-law rules. Courts located in Florida have jurisdiction, except where you have a non-waivable right to bring a claim where you live. Mandatory consumer protections that apply to you remain unaffected.",
      ],
    },
    {
      h: "11. Changes to these Terms",
      blocks: [
        "When we change these Terms, we publish a new version with a new date. Earlier versions stay available unchanged at [All versions](/legal). Continuing to use the website after a change means you accept the new version.",
      ],
    },
    {
      h: "12. Contact",
      blocks: [
        {
          list: [
            `Company: ${COMPANY}`,
            "Product: Runnir",
            `Email: [${COMPANY_EMAIL}](mailto:${COMPANY_EMAIL})`,
            "Location: Florida, United States",
          ],
        },
      ],
    },
  ],
};

export default doc;
