import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Partrunner Infrastructure & AI Enablement | Technical Report",
  description: "An interactive exploration of 6 months building practical AI infrastructure at Partrunner. From experiments to production-ready systems.",
  keywords: ["AI infrastructure", "machine learning", "logistics", "marketplace", "technical report"],
  authors: [{ name: "Gerry" }],
  openGraph: {
    title: "Partrunner Infrastructure & AI Enablement",
    description: "This isn't another AI demo. This is what it actually takes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
