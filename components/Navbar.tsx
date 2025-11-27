'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart-store'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-green/98 shadow-lg' : 'bg-dark-green/95'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Top-navabar_logo-removebg-preview.png"
              alt="Loopins"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/collections" className="nav-link">Collections</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/cart" className="relative nav-link">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-soft-brown text-dark-green text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className={`block w-6 h-0.5 bg-light-cream transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-light-cream transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-light-cream transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-light-cream hover:text-soft-brown">Home</Link>
            <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-light-cream hover:text-soft-brown">Collections</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-light-cream hover:text-soft-brown">About</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-light-cream hover:text-soft-brown">Contact</Link>
            <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-light-cream hover:text-soft-brown">
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        )}
      </div>

      {/* Backdrop overlay - click to close mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-16 bg-black/50 md:hidden z-[-1]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .nav-link {
          @apply text-light-cream font-medium transition-all duration-300 hover:text-soft-brown relative;
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
  )
}