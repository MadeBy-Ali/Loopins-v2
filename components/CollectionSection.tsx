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
      className="relative h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: imagePosition === 'left' ? '#2c3e2d' : '#5a6b3b' }}
    >
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12 md:gap-16`}>
          
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div
              ref={imageRef}
              className="relative flex items-center justify-center"
            >
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-soft-brown/30 to-earth-green/30 rounded-lg backdrop-blur-sm border-2 border-light-cream/20 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-500">
                <span className="text-light-cream/50 text-6xl font-bold">
                  {title.charAt(0)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === 'left' ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: imagePosition === 'left' ? 50 : -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-light-cream">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-light-cream/80 mb-8 leading-relaxed">
              {description}
            </p>
            <Link
              href={`/collections/${slug}`}
              className="inline-block px-8 py-3 bg-soft-brown text-light-cream font-bold rounded-full hover:bg-soft-brown/80 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Shop {title}
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}