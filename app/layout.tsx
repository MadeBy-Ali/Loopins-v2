import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
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
    icon: '/images/fav-icon-removebg-preview.ico',
    apple: '/images/fav-icon-removebg-preview.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
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