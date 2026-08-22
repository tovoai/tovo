import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TOVOAI - Universal AI Image & SEO CDN Hub',
  description: 'Zero-quota, high-performance Standalone AI Image CDN and SEO Visual Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
