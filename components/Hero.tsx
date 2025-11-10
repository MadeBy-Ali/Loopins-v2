'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] -z-10 bg-gradient-to-br from-earth-green via-soft-brown to-earth-green bg-[length:200%_200%] animate-gradient"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-light-cream drop-shadow-lg"
        >
          Premium Vest Collection
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl mb-8 text-light-cream/90 drop-shadow-md"
        >
          Where Style Meets Sophistication
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/collections"
            className="inline-block px-10 py-4 bg-gradient-to-r from-soft-brown to-earth-green text-light-cream font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-8 border-2 border-light-cream border-t-0 border-l-0 rotate-45 animate-bounce" />
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </section>
  )
}