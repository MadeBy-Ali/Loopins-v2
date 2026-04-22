'use client'

import { useEffect, useRef, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ChevronUp, BookOpen } from 'lucide-react'
import { getMagazineBySlug } from '@/lib/magazine-data'

export default function MagazineReaderClient({ collection }: { collection: string }) {
  const mag = getMagazineBySlug(collection)
  if (!mag) notFound()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])

  const allImages = [mag.cover, ...mag.pages]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowBackToTop(scrollY > 600)
      setHeaderScrolled(scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    pageRefs.current.forEach((ref, index) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentPage(index) },
        { threshold: 0.4 }
      )
      observer.observe(ref)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const pageLabel = currentPage === 0 ? 'Cover' : `Page ${currentPage} of ${mag.pages.length}`

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;1,300;1,400&family=Cormorant+SC:wght@300;400&display=swap');

        .reader-page {
          background-color: #F5F2EC;
          min-height: 100vh;
        }

        .reader-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        .reader-header {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.18em;
        }

        .reader-label {
          font-family: 'Cormorant SC', serif;
          font-size: 12px;
          letter-spacing: 0.25em;
        }

        .reader-italic {
          font-family: 'Cormorant Garant', serif;
          font-style: italic;
        }

        .page-image-wrap {
          box-shadow:
            0 2px 4px rgba(0,0,0,0.04),
            0 8px 24px rgba(0,0,0,0.08),
            0 20px 60px rgba(0,0,0,0.06);
          transition: box-shadow 0.4s ease;
        }

        .page-image-wrap:hover {
          box-shadow:
            0 4px 8px rgba(0,0,0,0.06),
            0 12px 32px rgba(0,0,0,0.12),
            0 28px 72px rgba(0,0,0,0.09);
        }

        .progress-bar-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(196, 155, 122, 0.15);
          z-index: 100;
        }

        @media (min-width: 1200px) {
          .side-page-num { display: block; }
        }
        .side-page-num {
          display: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center;
          font-family: 'Cormorant SC', serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(112, 51, 21, 0.3);
          white-space: nowrap;
          right: -72px;
        }

        .section-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 auto;
          max-width: 200px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196, 155, 122, 0.4), transparent);
        }
      `}</style>

      <div className="reader-page">

        {/* Scroll progress bar */}
        <div className="progress-bar-container">
          <motion.div
            style={{ scaleX, transformOrigin: '0%' }}
            className="h-full bg-[#c49b7a]"
          />
        </div>

        {/* Fixed header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
          style={{
            backgroundColor: headerScrolled ? 'rgba(245,242,236,0.96)' : 'transparent',
            backdropFilter: headerScrolled ? 'blur(8px)' : 'none',
            borderBottom: headerScrolled ? '1px solid rgba(196,155,122,0.2)' : '1px solid transparent',
            paddingTop: '12px',
            paddingBottom: '12px',
          }}
        >
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                href="/magazine"
                className="flex items-center gap-2 text-[#703315]/80 hover:text-[#703315] transition-colors"
                aria-label="Back to Magazine"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="reader-label hidden md:block">MAGAZINE</span>
              </Link>
              <div className="w-px h-4 bg-[#c49b7a]/30 hidden md:block" />
              <span className="reader-header text-[13px] text-[#703315] hidden md:block">
                LOOPINS · {mag.name.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-[#c49b7a]/60" />
              <span className="reader-label text-[#703315]/75 text-[11px]">ISSUE {mag.issue} · {mag.year}</span>
            </div>

            <span className="reader-label text-[#703315]/85">{pageLabel}</span>
          </div>
        </motion.header>

        {/* Magazine content */}
        <main className="relative z-10 pt-16 pb-24">

          {/* Opening masthead */}
          <motion.div
            className="text-center pt-12 pb-10 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="reader-label text-[#c49b7a]/60 mb-3">LOOPINS EDITORIAL</p>
            <h1 className="reader-header text-[28px] md:text-[40px] font-light text-[#2c1a0e] tracking-[0.2em] mb-2">
              {mag.name.toUpperCase()}
            </h1>
            <p className="reader-italic text-[#703315]/70 text-lg md:text-xl mb-6">
              {mag.subtitle}
            </p>
            <div className="section-divider">
              <div className="divider-line" />
              <span className="text-[#c49b7a]/50 text-xs">✦</span>
              <div className="divider-line" />
            </div>
          </motion.div>

          {/* Pages column */}
          <div className="max-w-[900px] mx-auto px-3 sm:px-6 md:px-10 space-y-3 md:space-y-5">
            {allImages.map((src, index) => {
              const isCover = index === 0
              return (
                <div
                  key={src}
                  className="relative"
                  ref={(el) => { pageRefs.current[index] = el }}
                >
                  <span className="side-page-num">
                    {isCover ? 'COVER' : `PAGE ${String(index).padStart(2, '0')}`}
                  </span>
                  <PageImage src={src} index={index} isCover={isCover} name={mag.name} />
                </div>
              )
            })}
          </div>

          {/* Closing section */}
          <motion.div
            className="text-center mt-20 px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <div className="section-divider mb-8">
              <div className="divider-line" />
              <span className="text-[#c49b7a]/40 text-xs">✦</span>
              <div className="divider-line" />
            </div>
            <p className="reader-label text-[#703315]/40 mb-2">END OF ISSUE {mag.issue}</p>
            <p className="reader-italic text-[#703315]/50 text-base mb-8">
              Explore the collection this issue was made for.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={mag.collectionHref}
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#703315]/40 text-[#703315] reader-label text-[10px] hover:bg-[#703315] hover:text-[#f5f0e8] transition-all duration-300"
              >
                VIEW COLLECTION <ArrowLeft className="w-3 h-3 rotate-180" />
              </Link>
              <Link
                href="/magazine"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#2c1a0e] text-[#f5f0e8] reader-label text-[10px] hover:bg-[#703315] transition-all duration-300"
              >
                ALL EDITIONS
              </Link>
            </div>
          </motion.div>

        </main>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 w-10 h-10 bg-[#2c1a0e] text-[#f5f0e8] flex items-center justify-center shadow-lg hover:bg-[#703315] z-40"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: showBackToTop ? 1 : 0,
            y: showBackToTop ? 0 : 10,
            pointerEvents: showBackToTop ? 'auto' : 'none',
          }}
          transition={{ duration: 0.3 }}
          aria-label="Back to top"
        >
          <ChevronUp className="w-4 h-4" />
        </motion.button>

      </div>
    </>
  )
}

function PageImage({
  src,
  index,
  isCover,
  name,
}: {
  src: string
  index: number
  isCover: boolean
  name: string
}) {
  return (
    <motion.div
      className="page-image-wrap w-full bg-white overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        delay: isCover ? 0.2 : 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Image
        src={src}
        alt={isCover ? `${name} Magazine Cover` : `${name} Magazine Page ${index}`}
        width={900}
        height={isCover ? 1200 : 1272}
        className="w-full h-auto block"
        sizes="(max-width: 640px) 100vw, (max-width: 900px) calc(100vw - 48px), 900px"
        priority={index < 2}
      />
    </motion.div>
  )
}
