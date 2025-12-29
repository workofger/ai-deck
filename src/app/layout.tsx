import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0D0D0D',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'PartRunner AI Play',
  description: 'AI as an operating layer for BIG & BULKY logistics',
  icons: {
    icon: '/ia-deck/Isotipo.png',
    apple: '/ia-deck/Isotipo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'PartRunner AI Play',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ia-deck/Isotipo.png" />
      </head>
      <body className="antialiased touch-manipulation">{children}</body>
    </html>
  )
}
