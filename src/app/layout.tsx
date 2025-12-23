import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PartRunner AI Play',
  description: 'AI as an operating layer for BIG & BULKY logistics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

