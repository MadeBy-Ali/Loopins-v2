'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-30 bg-dark-brown text-light-cream mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-16 mb-8 sm:mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <img 
                src="/images/loopins_logo_footer.svg" 
                alt="Loopins" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-light-cream font-medium mb-6 text-sm italic">
              Wear Meaning, Wear Loopins
            </p>
            <p className="text-light-cream/70 mb-6 leading-relaxed text-sm">
              Premium vest collections inspired by Indonesian heritage. Where style meets sophistication.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/loopins.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-soft-brown/20 rounded-full flex items-center justify-center text-light-cream hover:bg-soft-brown hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@loopins.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-soft-brown/20 rounded-full flex items-center justify-center text-light-cream hover:bg-soft-brown hover:text-white transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://tokopedia.com/loopins"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-soft-brown/20 rounded-full flex items-center justify-center text-light-cream hover:bg-soft-brown hover:text-white transition-all duration-300"
                aria-label="Tokopedia"
              >
                <svg className="w-5 h-5" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="currentColor" fillRule="evenodd" d="M96 28c-9.504 0-17.78 5.307-22.008 13.127C82.736 42.123 88.89 44 96 47.332c7.11-3.332 13.264-5.209 22.008-6.205C113.781 33.31 105.506 28 96 28Zm0-12c-15.973 0-29.568 10.117-34.754 24.28C52.932 40 42.462 40 28.53 40H28a6 6 0 0 0-6 6v124a6 6 0 0 0 6 6h92c27.614 0 50-22.386 50-50V46a6 6 0 0 0-6-6h-.531c-13.931 0-24.401 0-32.715.28C125.566 26.113 111.97 16 96 16ZM34 52.001V164h86c20.987 0 38-17.013 38-38V52.001c-18.502.009-29.622.098-37.872.966-8.692.915-13.999 2.677-21.445 6.4a6 6 0 0 1-5.366 0c-7.446-3.723-12.753-5.485-21.445-6.4-8.25-.868-19.37-.957-37.872-.966ZM50 96c0-9.941 8.059-18 18-18s18 8.059 18 18-8.059 18-18 18-18-8.059-18-18Zm18-30c-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30 1.126 0 2.238-.062 3.332-.183l20.425 20.426a6 6 0 0 0 8.486 0l20.425-20.426c1.094.121 2.206.183 3.332.183 16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30-12.764 0-23.666 7.971-28 19.207C91.666 73.971 80.764 66 68 66Zm40.082 55.433A30.1 30.1 0 0 1 96 106.793a30.101 30.101 0 0 1-12.082 14.64L96 133.515l12.082-12.082ZM124 78c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18ZM76 96a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm48 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-light-cream mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-light-cream/70 hover:text-light-cream transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-light-cream/70 hover:text-light-cream transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-light-cream/70 hover:text-light-cream transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-light-cream/70 hover:text-light-cream transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-light-cream/70 hover:text-light-cream transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-light-cream mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-light-cream flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@loopins.com" className="text-light-cream/70 hover:text-light-cream transition-colors text-sm">
                  contact@loopins.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-light-cream flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+6281393220729" className="text-light-cream/70 hover:text-light-cream transition-colors text-sm">
                  +62 821 169 5547
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-light-cream flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-light-cream/70 text-sm">Jakarta, Indonesia</span>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service - COMMENTED OUT FOR NOW */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-light-cream mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-light-cream/70 hover:text-soft-brown transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-light-cream/70 hover:text-soft-brown transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-light-cream/70 hover:text-soft-brown transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-light-cream/70 hover:text-soft-brown transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-light-cream/70 hover:text-soft-brown transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </motion.div> */}

          {/* Legal - COMMENTED OUT FOR NOW */}
          {/* <div className="mt-4 pt-4 border-t border-light-cream/10">
            <h5 className="text-sm font-semibold text-light-cream mb-2">Legal</h5>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/privacy" className="text-light-cream/70 hover:text-soft-brown transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-light-cream/70 hover:text-soft-brown transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div> */}

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-cream/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-light-cream/50 text-sm text-center md:text-left">
              © {currentYear} Loopins. All rights reserved. Made with ❤️ in Indonesia
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-light-cream/50 hover:text-soft-brown transition-colors">
                Sitemap
              </a>
              <a href="#" className="text-light-cream/50 hover:text-soft-brown transition-colors">
                Accessibility
              </a>
              <a href="#" className="text-light-cream/50 hover:text-soft-brown transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}