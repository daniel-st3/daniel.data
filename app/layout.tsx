import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel Rodriguez — Business & Data Analyst",
  description:
    "Business & Data Analyst with international experience in B2B partnerships, AI-integrated workflows, and data-driven strategy. Based in Bogotá, open to remote roles.",
  openGraph: {
    title: "Daniel Rodriguez — Business & Data Analyst",
    description:
      "Turning signal into decision — building AI-powered analytics that move businesses.",
    type: "website",
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
