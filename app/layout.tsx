import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://danielst-data.vercel.app";

export const metadata: Metadata = {
  title: "Daniel Rodriguez — Business & Data Analyst",
  description:
    "Business & Data Analyst with international experience in B2B partnerships, AI-integrated workflows, and data-driven strategy. Based in Bogotá, open to remote roles.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Daniel Rodriguez — Business & Data Analyst",
    description:
      "Turning signal into decision — building AI-powered analytics that move businesses.",
    url: siteUrl,
    siteName: "Daniel Rodriguez Portfolio",
    locale: "en_US",
    type: "website",
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
    title: "Daniel Rodriguez — Business & Data Analyst",
    description:
      "AI-integrated workflows and data-driven growth for business decisions.",
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
      <body>{children}</body>
    </html>
  );
}
