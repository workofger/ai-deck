import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FACC15" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-deck.vercel.app"),
  
  title: "Partrunner | Infrastructure & AI Enablement",
  description: "This isn't another AI demo. This is what it actually takes. 6 months of building practical AI infrastructure at Partrunner — process, decisions, and learnings.",
  keywords: ["Partrunner", "AI infrastructure", "machine learning", "logistics", "marketplace", "technical report", "B2B logistics"],
  authors: [{ name: "Gerry", url: "https://partrunner.com" }],
  creator: "Partrunner",
  publisher: "Partrunner",
  
  // Favicon and Icons
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-partrunner.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  
  // Open Graph - For Facebook, LinkedIn, WhatsApp, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-deck.vercel.app",
    siteName: "Partrunner",
    title: "Partrunner | Infrastructure & AI Enablement",
    description: "This isn't another AI demo. This is what it actually takes. 6 months of building practical AI infrastructure — process, decisions, and learnings.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Partrunner - Infrastructure & AI Enablement",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Partrunner | Infrastructure & AI Enablement",
    description: "This isn't another AI demo. This is what it actually takes. 6 months building practical AI infrastructure.",
    images: ["/twitter-image"],
    creator: "@partrunner",
  },
  
  // Additional metadata
  applicationName: "Partrunner AI Deck",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
