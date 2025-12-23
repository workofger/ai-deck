import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PartRunner AI Play',
  description: 'AI as an operating layer for BIG & BULKY logistics',
  icons: {
    icon: '/ia-deck/Isotipo.png',
    apple: '/ia-deck/Isotipo.png',
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
      <body>{children}</body>
    </html>
  )
}
