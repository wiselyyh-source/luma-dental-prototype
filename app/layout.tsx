import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: 'Luma Dental Studio | Modern Dental Care in Singapore',
  description: 'A front-end prototype for a premium dental clinic landing page focused on smile consultations. Modern dental care for your best smile.',
  keywords: ['dental', 'dentist', 'Singapore', 'smile consultation', 'teeth whitening', 'veneers'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Luma Dental Studio | Modern Dental Care in Singapore',
    description: 'A front-end prototype for a premium dental clinic landing page focused on smile consultations. Modern dental care for your best smile.',
    url: 'https://lumadental.sg',
    siteName: 'Luma Dental Studio',
    images: [
      {
        url: '/images/mamama.png',
        width: 1200,
        height: 630,
        alt: 'Luma Dental Studio - Modern Patient-First Dental Care',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luma Dental Studio | Modern Dental Care in Singapore',
    description: 'A front-end prototype for a premium dental clinic landing page focused on smile consultations. Modern dental care for your best smile.',
    images: ['/images/mamama.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0891B2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
