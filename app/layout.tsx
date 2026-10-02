import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl = "https://danielst-data.vercel.app";

export const metadata: Metadata = {
  title: "Daniel Rodriguez | Applied AI & Revenue Systems",
  description:
    "Revenue Operations Analyst at Gladly, working across applied AI and business systems. Explore Valrun, economic underwriting for AI-agent work.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Daniel Rodriguez", url: siteUrl }],
  creator: "Daniel Rodriguez",
  publisher: "Daniel Rodriguez",
  openGraph: {
    title: "Daniel Rodriguez | Applied AI & Revenue Systems",
    description:
      "Revenue Operations Analyst at Gladly, working across applied AI and business systems. Explore Valrun, economic underwriting for AI-agent work.",
    url: siteUrl,
    siteName: "Daniel Rodriguez Portfolio",
    locale: "en_US",
    type: "article",
    publishedTime: "2026-02-23T00:00:00.000Z",
    modifiedTime: "2026-02-23T00:00:00.000Z",
    authors: ["Daniel Rodriguez"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniel Rodriguez portfolio hero preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Rodriguez | Applied AI & Revenue Systems",
    description:
      "Revenue Operations Analyst at Gladly. Applied AI, revenue systems and Valrun: economic underwriting for AI-agent work.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showVercelAnalytics = process.env.VERCEL === "1";

  return (
    <html lang="en">
      <body>
        {children}
        {showVercelAnalytics ? <Analytics /> : null}
        {showVercelAnalytics ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
