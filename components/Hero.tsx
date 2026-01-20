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
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-warm-beige">
      {/* Background Carousel */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
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
            {/* Subtle overlay for elegance */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-6 text-white tracking-tight"
          style={{
            textShadow: '0 2px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          Crafted with Purpose
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-xl lg:text-2xl mb-12 text-white/95 font-light tracking-wide max-w-3xl mx-auto"
          style={{
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          Where Timeless Design Meets Sustainable Elegance
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/collections"
            className="inline-block px-10 py-4 bg-white text-dark-brown font-medium text-sm uppercase tracking-widest hover:bg-warm-beige transition-all duration-500 hover:scale-105"
          >
            Explore Collection
          </Link>
          <Link
            href="/about"
            className="inline-block px-10 py-4 bg-transparent text-white font-medium text-sm uppercase tracking-widest border-2 border-white hover:bg-white hover:text-dark-brown transition-all duration-500 hover:scale-105"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-500 ${
              currentImageIndex === index
                ? 'w-12 h-1.5 bg-white'
                : 'w-8 h-1.5 bg-white/40 hover:bg-white/60'
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
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}