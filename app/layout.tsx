import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SiteWrapper from '@/components/SiteWrapper'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '700'],
})

export const metadata: Metadata = {
  title: 'Loopins Studio',
  description: 'Discover our exclusive collection of modern batik vests for men and women',
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
          src={process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true'
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js'}
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'Mid-client-fbWMz-0o6VzM0tsk'}
          strategy="beforeInteractive"
        />
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '902680392768216');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=902680392768216&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <SiteWrapper>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </SiteWrapper>
      </body>
    </html>
  )
}