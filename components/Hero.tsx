'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const heroImages = [
  '/images/loopins_mbokjamu_bigpicture-1.JPG',
  '/images/loopins_mbokjamu_bigpicture-2.JPG',
]

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-dark-green">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div
              ref={parallaxRef}
              className="w-full h-full"
            >
              <img
                src={heroImages[currentImageIndex]}
                alt="Mbok Jamu Collection"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-dark-green/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-light-cream"
          style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6), 0 8px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          Premium Vest Collection
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl mb-8 text-light-cream"
          style={{
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.8), 0 1px 8px rgba(0, 0, 0, 0.6)'
          }}
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

      {/* Carousel Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 ${
              currentImageIndex === index
                ? 'w-12 h-3 bg-soft-brown'
                : 'w-3 h-3 bg-light-cream/50 hover:bg-light-cream/80'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
    </section>
  )
}