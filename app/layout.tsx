import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://danielst-data.vercel.app";

export const metadata: Metadata = {
  title: "Daniel Rodriguez | Business and Data Analyst",
  description:
    "Business and Data Analyst with international experience in B2B partnerships, AI integrated workflows, and data driven strategy. Based in Bogota and open to remote roles.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Daniel Rodriguez", url: siteUrl }],
  creator: "Daniel Rodriguez",
  publisher: "Daniel Rodriguez",
  openGraph: {
    title: "Daniel Rodriguez | Business and Data Analyst",
    description:
      "I build AI integrated analytics systems that turn raw business signals into clear decisions, measurable growth, and practical operating improvements for modern teams.",
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
    title: "Daniel Rodriguez | Business and Data Analyst",
    description:
      "AI integrated workflows and data driven growth strategies that help teams move from noisy data to confident business decisions.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
