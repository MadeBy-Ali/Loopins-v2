'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { magazines } from '@/lib/magazine-data'

export default function MagazinePage() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant+SC:wght@300;400;500&display=swap');

        .magazine-page {
          min-height: 100vh;
          background-color: #0c0905;
          position: relative;
          overflow-x: hidden;
        }

        /* Film grain texture */
        .magazine-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.35;
        }

        /* Warm vignette */
        .magazine-page::after {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(6, 3, 1, 0.7) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .mag-title {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.25em;
          line-height: 1;
        }

        .mag-subtitle {
          font-family: 'Cormorant Garant', serif;
          font-style: italic;
        }

        .issue-label {
          font-family: 'Cormorant SC', serif;
          font-size: 13px;
          letter-spacing: 0.3em;
        }

        .collection-name {
          font-family: 'Cormorant Garant', serif;
        }

        .cover-card {
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
        }

        .cover-image-wrap {
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5);
          transition: box-shadow 0.5s ease;
        }

        .cover-card:hover .cover-image-wrap {
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 8px 20px rgba(196, 155, 122, 0.15);
        }

        .cover-image-wrap img {
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: block;
        }

        .cover-card:hover .cover-image-wrap img {
          transform: scale(1.04);
        }

        .read-cta {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.2em;
          font-size: 13px;
          transition: all 0.4s ease;
        }

        .ornament {
          display: inline-block;
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c49b7a, transparent);
          vertical-align: middle;
          margin: 0 12px;
        }

        /* Decorative horizontal lines */
        .deco-line {
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(196, 155, 122, 0.4), transparent);
        }

        @media (max-width: 768px) {
          .mag-title { font-size: 48px !important; }
        }
      `}</style>

      <main className="magazine-page pt-24 pb-20 px-6 md:px-12">
        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Header section */}
          <motion.div
            className="text-center mb-20 md:mb-28"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Top ornament */}
            <div className="flex items-center justify-center mb-8">
              <span className="ornament" />
              <span className="issue-label text-[#c49b7a]">LOOPINS EDITORIAL</span>
              <span className="ornament" />
            </div>

            {/* Main title */}
            <h1
              className="mag-title text-[64px] md:text-[96px] lg:text-[120px] font-light text-[#f5f0e8] mb-4"
            >
              MAGAZINE
            </h1>

            {/* Italic subtitle */}
            <p className="mag-subtitle text-[#c49b7a] text-xl md:text-2xl font-light mb-10">
              Select your edition
            </p>

            {/* Bottom rule */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#c49b7a]/30" />
              <BookOpen className="w-4 h-4 text-[#c49b7a] opacity-50" />
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#c49b7a]/30" />
            </div>
          </motion.div>

          {/* Magazine cards grid */}
          <div className={`grid gap-12 md:gap-20 ${magazines.length === 1 ? 'max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {magazines.map((mag, index) => (
              <motion.div
                key={mag.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/magazine/${mag.slug}`} className="block group cover-card">
                  {/* Issue badge */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="issue-label text-[#c49b7a]/60">ISSUE {mag.issue}</span>
                    <div className="h-px flex-1 bg-[#c49b7a]/15" />
                    <span className="issue-label text-[#c49b7a]/40">{mag.year}</span>
                  </div>

                  {/* Cover image */}
                  <div
                    className="cover-image-wrap aspect-[3/4] w-full"
                    onMouseEnter={() => setHoveredSlug(mag.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                  >
                    <motion.div
                      animate={{ y: hoveredSlug === mag.slug ? -8 : 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={mag.cover}
                        alt={`${mag.name} Magazine Cover`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority={index === 0}
                      />
                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-end justify-center pb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredSlug === mag.slug ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ background: 'linear-gradient(to top, rgba(12,9,5,0.75) 0%, transparent 50%)' }}
                      >
                        <span className="read-cta text-[#f5f0e8] flex items-center gap-2">
                          OPEN ISSUE <ArrowRight className="w-3 h-3" />
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Card footer */}
                  <div className="mt-6">
                    <h2 className="collection-name text-[#f5f0e8] text-2xl font-light mb-1">
                      {mag.name}
                    </h2>
                    <p className="mag-subtitle text-[#c49b7a]/70 text-base">
                      {mag.subtitle}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#c49b7a]/75 group-hover:text-[#c49b7a] transition-colors duration-400">
                      <span className="read-cta">READ NOW</span>
                      <motion.div
                        animate={{ x: hoveredSlug === mag.slug ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            className="text-center mt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-16 bg-[#c49b7a]/20" />
              <span className="issue-label text-[#c49b7a]/70 mx-4">LOOPINS STUDIO · JAKARTA</span>
              <div className="h-px w-16 bg-[#c49b7a]/20" />
            </div>
            <p className="mag-subtitle text-[#c49b7a]/65 text-base">
              Each issue is crafted alongside a collection — an editorial companion to the garment.
            </p>
          </motion.div>

        </div>
      </main>
    </>
  )
}
