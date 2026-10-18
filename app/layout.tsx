import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ConsentBanner } from "@/components/ConsentBanner";
import { COMPANY, DESCRIPTION, NAME, SITE_URL, TITLE } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${NAME}` },
  description: DESCRIPTION,
  applicationName: NAME,
  keywords: ["GitHub Actions", "macOS", "workflow", "CI/CD", "actionlint", "act", "open source", "SwiftUI", "developer tools"],
  authors: [{ name: COMPANY, url: "https://github.com/dil-eight" }],
  creator: COMPANY,
  publisher: COMPANY,
  alternates: { canonical: "/", types: { "text/markdown": "/index.md", "text/plain": "/llms.txt" } },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#14161a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
