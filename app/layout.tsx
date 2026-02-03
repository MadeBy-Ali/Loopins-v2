import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '700'],
})

export const metadata: Metadata = {
  title: 'Loopins - Premium Vest Collection',
  description: 'Discover our exclusive collection of premium vests for men and women',
  icons: {
    icon: [
      { url: '/images/loopins.ico', sizes: 'any' },
      { url: '/images/loopins.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/images/loopins.png',
    other: [
      {
        rel: "mask-icon",
        url: "/images/loopins.svg",
        color: "#703315",
      },
    ]
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="Mid-client-CfTuWl9fMeHWbf1_"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}