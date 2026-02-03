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
          <a
            href="https://www.tiktok.com/@loopinsstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-light-cream/10 rounded-full flex items-center justify-center text-light-cream hover:bg-light-cream hover:text-dark-brown transition-all duration-300 border border-light-cream/20"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </a>
          <a
            href="https://www.tokopedia.com/loopins-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-light-cream/10 rounded-full flex items-center justify-center text-light-cream hover:bg-light-cream hover:text-dark-brown transition-all duration-300 border border-light-cream/20"
            aria-label="Tokopedia"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
              <path fill="currentColor" fillRule="evenodd" d="M96 28c-9.504 0-17.78 5.307-22.008 13.127C82.736 42.123 88.89 44 96 47.332c7.11-3.332 13.264-5.209 22.008-6.205C113.781 33.31 105.506 28 96 28Zm0-12c-15.973 0-29.568 10.117-34.754 24.28C52.932 40 42.462 40 28.53 40H28a6 6 0 0 0-6 6v124a6 6 0 0 0 6 6h92c27.614 0 50-22.386 50-50V46a6 6 0 0 0-6-6h-.531c-13.931 0-24.401 0-32.715.28C125.566 26.113 111.97 16 96 16ZM34 52.001V164h86c20.987 0 38-17.013 38-38V52.001c-18.502.009-29.622.098-37.872.966-8.692.915-13.999 2.677-21.445 6.4a6 6 0 0 1-5.366 0c-7.446-3.723-12.753-5.485-21.445-6.4-8.25-.868-19.37-.957-37.872-.966ZM50 96c0-9.941 8.059-18 18-18s18 8.059 18 18-8.059 18-18 18-18-8.059-18-18Zm18-30c-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30 1.126 0 2.238-.062 3.332-.183l20.425 20.426a6 6 0 0 0 8.486 0l20.425-20.426c1.094.121 2.206.183 3.332.183 16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30-12.764 0-23.666 7.971-28 19.207C91.666 73.971 80.764 66 68 66Zm40.082 55.433A30.1 30.1 0 0 1 96 106.793a30.101 30.101 0 0 1-12.082 14.64L96 133.515l12.082-12.082ZM124 78c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18ZM76 96a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm48 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" clipRule="evenodd"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
