// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Taskmatic — AI Automation That Just Works',
  description: 'AI automation templates for solo business owners. No coding. No prompts. Just results.',
}

// Import the CSS from the public HTML
import './globals.css'

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
