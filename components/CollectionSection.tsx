'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

interface CollectionSectionProps {
  title: string
  description: string
  slug: string
  imagePosition: 'left' | 'right'
}

export default function CollectionSection({ title, description, slug, imagePosition }: CollectionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const parallax = (rect.top + scrolled - window.pageYOffset) * 0.3
        imageRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center py-16 bg-light-cream"
    >
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-16 md:gap-24`}>
          
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div
              ref={imageRef}
              className="relative flex items-center justify-center w-full"
            >
              <div className="w-full aspect-square max-w-lg bg-gradient-to-br from-soft-brown/20 to-earth-green/20 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-700 group overflow-hidden">
                <span className="text-earth-green/30 text-8xl font-light group-hover:scale-110 transition-transform duration-700">
                  {title.charAt(0)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-semibold mb-8 text-dark-brown tracking-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-dark-brown/70 mb-10 leading-relaxed max-w-xl">
              {description}
            </p>
            <Link
              href="/collections"
              className="inline-block px-12 py-4 bg-dark-brown text-light-cream font-medium text-sm uppercase tracking-widest hover:bg-earth-green transition-all duration-500 hover:scale-105"
            >
              Explore {title}
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}