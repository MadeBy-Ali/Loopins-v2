import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loopins - Premium Vest Collection',
  description: 'Discover our exclusive collection of premium vests for men and women',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}