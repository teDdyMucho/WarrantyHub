import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WarrantyHub - Universal Warranty Platform for Dealerships',
  description: 'Compare, sell, and manage extended warranties from multiple providers in one centralized platform. Like Trivago, but for automotive warranties.',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
