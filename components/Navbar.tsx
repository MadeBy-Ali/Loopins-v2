'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart-store'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import SearchOverlay from './SearchOverlay'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const cartItems = useCartStore((state) => state.items)
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const isHomePage = pathname === '/'
  const isMagazineListPage = pathname === '/magazine'
  const isMagazineReaderPage = pathname.startsWith('/magazine/') && pathname !== '/magazine'
  // Collection detail page: /collections/[slug] (exactly one segment, not /collections/[slug]/[gender])
  const isCollectionDetailPage = /^\/collections\/[^/]+$/.test(pathname)
  // Sub product detail page: /collections/[slug]/accessories/[id]
  const isSubProductDetailPage = /^\/collections\/[^/]+\/accessories\/[^/]+$/.test(pathname)
  // Pages that are ALWAYS transparent — dark bg throughout, never flip to white on scroll
  const isAlwaysTransparentPage = isMagazineListPage || isCollectionDetailPage || isSubProductDetailPage
  // Pages where the navbar starts transparent over a dark background
  const isDarkHeroPage = isHomePage || isAlwaysTransparentPage

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 80)
          ticking = false
        })
        ticking = true
      }
    }
    
    // Check initial scroll position
    handleScroll()
    
    // Add scroll listener - use both window and document for Safari compatibility
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Determine navbar styles based on page and scroll state
  const navbarBg = isAlwaysTransparentPage
    ? 'backdrop-blur-md bg-black/[0.12]'
    : isDarkHeroPage
      ? (isScrolled ? 'bg-white shadow-md' : 'backdrop-blur-md bg-black/[0.08]')
      : 'bg-white shadow-md'

  const navbarPadding = isDarkHeroPage
    ? (isScrolled && !isAlwaysTransparentPage ? 'py-3 md:py-4' : 'py-4 md:py-6')
    : 'py-3 md:py-4'

  const textColor = isDarkHeroPage && (!isScrolled || isAlwaysTransparentPage)
    ? 'text-white hover:text-white/80'
    : 'text-gray-800 hover:text-earth-green'

  const logoFilter = isDarkHeroPage && (!isScrolled || isAlwaysTransparentPage)
    ? 'brightness-0 invert'
    : 'brightness-0'

  const iconColor = isDarkHeroPage && (!isScrolled || isAlwaysTransparentPage)
    ? 'text-white hover:text-white/80'
    : 'text-gray-800 hover:text-earth-green'

  const badgeBg = isDarkHeroPage && (!isScrolled || isAlwaysTransparentPage)
    ? 'bg-white text-earth-green'
    : 'bg-earth-green text-white'

  // Magazine reader has its own fixed header — hide the site navbar entirely
  if (isMagazineReaderPage) return null

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${navbarBg} ${navbarPadding}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Left: Navigation Links - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`nav-link transition-colors duration-500 ${textColor}`}
              >
                Home
              </Link>
              <Link 
                href="/collections" 
                className={`nav-link transition-colors duration-500 ${textColor}`}
              >
                Collections
              </Link>
              <Link 
                href="/magazine" 
                className={`nav-link transition-colors duration-500 ${textColor}`}
              >
                Magazine
              </Link>
              <Link 
                href="/about" 
                className={`nav-link transition-colors duration-500 ${textColor}`}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`nav-link transition-colors duration-500 ${textColor}`}
              >
                Contact
              </Link>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
              <Image
                src="/images/Top-navbar_logo-removebg-preview.png"
                alt="Loopins"
                width={140}
                height={50}
                className={`h-10 md:h-12 w-auto transition-all duration-500 ${logoFilter}`}
                priority
              />
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center space-x-4 md:space-x-6 flex-1 justify-end">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`hidden md:block transition-colors duration-500 ${iconColor}`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <Link 
                href="/cart" 
                className={`relative transition-colors duration-500 ${iconColor}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className={`absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-colors duration-500 ${badgeBg}`}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden transition-colors duration-500 ${iconColor}`}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .nav-link {
            @apply text-sm font-medium uppercase tracking-wider relative;
            letter-spacing: 0.08em;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(45deg, #c49b7a, #5a6b3b);
            transition: width 0.3s ease;
          }
          .nav-link:hover::after {
            width: 100%;
          }
        `}</style>
      </nav>

      {/* Mobile Side Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src="/images/Top-navbar_logo-removebg-preview.png"
                    alt="Loopins"
                    width={120}
                    height={40}
                    className="h-10 w-auto brightness-0"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-800 hover:text-earth-green transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block py-3 px-4 text-base font-medium text-gray-800 hover:bg-earth-green/10 hover:text-earth-green rounded-lg transition-all uppercase tracking-wide"
                >
                  Home
                </Link>
                <Link 
                  href="/collections" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block py-3 px-4 text-base font-medium text-gray-800 hover:bg-earth-green/10 hover:text-earth-green rounded-lg transition-all uppercase tracking-wide"
                >
                  Collections
                </Link>
                <Link 
                  href="/magazine" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block py-3 px-4 text-base font-medium text-gray-800 hover:bg-earth-green/10 hover:text-earth-green rounded-lg transition-all uppercase tracking-wide"
                >
                  Magazine
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block py-3 px-4 text-base font-medium text-gray-800 hover:bg-earth-green/10 hover:text-earth-green rounded-lg transition-all uppercase tracking-wide"
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="block py-3 px-4 text-base font-medium text-gray-800 hover:bg-earth-green/10 hover:text-earth-green rounded-lg transition-all uppercase tracking-wide"
                >
                  Contact
                </Link>

                {/* Mobile Search Button */}
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="w-full flex items-center gap-3 py-3 px-4 text-base font-medium text-gray-800 hover:bg-earth-green/10 hover:text-earth-green rounded-lg transition-all uppercase tracking-wide"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </nav>

              {/* Drawer Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-light-cream">
                <p className="text-sm text-gray-600 text-center">
                  © {new Date().getFullYear()} Loopins Studio
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}