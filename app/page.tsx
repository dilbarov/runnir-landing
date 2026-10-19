import { COMPANY, COMPANY_EMAIL, COMPANY_GITHUB, DESCRIPTION, FAQ, NAME, REPO_URL, SITE_URL } from "@/lib/content";
import { getLatestRelease } from "@/lib/release";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { DownloadSection, Faq, Footer, Trust } from "@/components/Sections";

export const revalidate = 1800;

export default async function Home() {
  const release = await getLatestRelease();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: NAME,
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: COMPANY,
        legalName: COMPANY,
        email: COMPANY_EMAIL,
        address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
        sameAs: [COMPANY_GITHUB],
        brand: { "@type": "Brand", name: NAME, logo: `${SITE_URL}/brand/logo-mark-dark.png` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: NAME,
        description: DESCRIPTION,
        url: SITE_URL,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS 15 or newer",
        license: "https://www.gnu.org/licenses/gpl-3.0.html",
        codeRepository: REPO_URL,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        ...(release ? { softwareVersion: release.tag, downloadUrl: release.downloadUrl } : {}),
        author: { "@id": `${SITE_URL}/#org` },
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav release={release} />
      <main>
        <Hero release={release} />
        <Features />
        <Trust />
        <Faq />
        <DownloadSection release={release} />
      </main>
      <Footer />
    </>
  );
}
