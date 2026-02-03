'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Release date: February 5th, 2026 at 18:00 WIB (UTC+7)
  const releaseDate = new Date('2026-02-05T18:00:00+07:00').getTime()

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = releaseDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        // Reload page when countdown reaches zero
        window.location.reload()
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [releaseDate])

  return (
    <div className="min-h-screen bg-dark-brown flex items-center justify-center p-4 sm:px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-light-cream rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-light-cream rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <img 
            src="/images/loopins_logo_footer.svg" 
            alt="Loopins" 
            className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto mx-auto"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-light-cream mb-4 sm:mb-6 px-2"
        >
          See You on
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-light-cream/90 mb-8 sm:mb-12 md:mb-16 px-2"
        >
          February 5th, 2026 at 18.00 WIB
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto"
        >
          {/* Days */}
          <div className="bg-light-cream/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-6 md:p-8 border border-light-cream/20">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-light-cream mb-1 sm:mb-2">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-light-cream/70 uppercase tracking-wider">
              Days
            </div>
          </div>

          {/* Hours */}
          <div className="bg-light-cream/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-6 md:p-8 border border-light-cream/20">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-light-cream mb-1 sm:mb-2">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-light-cream/70 uppercase tracking-wider">
              Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="bg-light-cream/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-6 md:p-8 border border-light-cream/20">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-light-cream mb-1 sm:mb-2">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-light-cream/70 uppercase tracking-wider">
              Minutes
            </div>
          </div>

          {/* Seconds */}
          <div className="bg-light-cream/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-6 md:p-8 border border-light-cream/20">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-light-cream mb-1 sm:mb-2">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg text-light-cream/70 uppercase tracking-wider">
              Seconds
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-light-cream/80 italic px-2 mb-8 sm:mb-0"
        >
          Wear Meaning, Wear Loopins
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 sm:mt-12 flex justify-center gap-3 sm:gap-4"
        >
          <a
            href="https://www.instagram.com/loopinsstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-light-cream/10 rounded-full flex items-center justify-center text-light-cream hover:bg-light-cream hover:text-dark-brown transition-all duration-300 border border-light-cream/20"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
