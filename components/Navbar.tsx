'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart-store'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import SearchOverlay from './SearchOverlay'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const cartItems = useCartStore((state) => state.items)
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine navbar styles based on page and scroll state
  const navbarBg = isHomePage 
    ? (isScrolled ? 'bg-white shadow-md' : 'bg-transparent')
    : 'bg-white shadow-md'
  
  const navbarPadding = isHomePage
    ? (isScrolled ? 'py-4' : 'py-6')
    : 'py-4'
  
  const textColor = isHomePage && !isScrolled
    ? 'text-white hover:text-white/80'
    : 'text-gray-800 hover:text-earth-green'
  
  const logoFilter = isHomePage && !isScrolled
    ? 'brightness-0 invert'
    : 'brightness-0'
  
  const iconColor = isHomePage && !isScrolled
    ? 'text-white hover:text-white/80'
    : 'text-gray-800 hover:text-earth-green'
  
  const badgeBg = isHomePage && !isScrolled
    ? 'bg-white text-earth-green'
    : 'bg-earth-green text-white'

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${navbarBg} ${navbarPadding}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Left: Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10 flex-1">
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
              href="/about" 
              className={`nav-link transition-colors duration-500 ${textColor}`}
            >
              Abouts
            </Link>
            <Link 
              href="/contact" 
              className={`nav-link transition-colors duration-500 ${textColor}`}
            >
              Contact
            </Link>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10">
            <Image
              src="/images/Top-navabar_logo-removebg-preview.png"
              alt="Loopins"
              width={140}
              height={50}
              className={`h-12 w-auto transition-all duration-500 ${logoFilter}`}
              priority
            />
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center space-x-6 flex-1 justify-end">
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pt-6 pb-4 space-y-4">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-2 text-base transition-colors ${textColor}`}
            >
              Home
            </Link>
            <Link 
              href="/collections" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-2 text-base transition-colors ${textColor}`}
            >
              Collections
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-2 text-base transition-colors ${textColor}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-2 text-base transition-colors ${textColor}`}
            >
              Contact
            </Link>
          </div>
        )}
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

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  )
}