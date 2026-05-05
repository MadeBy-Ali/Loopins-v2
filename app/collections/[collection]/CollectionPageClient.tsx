'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Collection } from '@/lib/collections-data'

export default function CollectionPageClient({ collection: col }: { collection: Collection }) {
  const [hoveredGender, setHoveredGender] = useState<string | null>(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant+SC:wght@300;400;500&display=swap');

        .col-page {
          min-height: 100vh;
          background-color: #0c0905;
          position: relative;
          overflow-x: hidden;
        }

        /* Film grain */
        .col-page::before {
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
        .col-page::after {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(6, 3, 1, 0.7) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .col-title {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.2em;
          line-height: 1;
        }

        .col-tagline {
          font-family: 'Cormorant Garant', serif;
          font-style: italic;
        }

        .col-body {
          font-family: 'Cormorant Garant', serif;
          line-height: 1.85;
        }

        .col-label {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.3em;
          font-size: 12px;
        }

        .ornament {
          display: inline-block;
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c49b7a, transparent);
          vertical-align: middle;
          margin: 0 12px;
        }

        .variant-cta {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.2em;
          font-size: 12px;
        }
      `}</style>

      <main className="col-page pt-24 pb-20 px-6 md:px-12">
        <div className="relative z-10 max-w-6xl mx-auto">

          {/* ── Header ── */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-center mb-6">
              <span className="ornament" />
              <span className="col-label text-[#c49b7a]">LOOPINS STUDIO · COLLECTION</span>
              <span className="ornament" />
            </div>
            <h1 className="col-title text-[48px] sm:text-[64px] md:text-[88px] lg:text-[112px] font-light text-[#f5f0e8] mb-4 uppercase">
              {col.name}
            </h1>
            <p className="col-tagline text-[#c49b7a] text-lg md:text-xl font-light">
              {col.tagline}
            </p>
          </motion.div>

          {/* ── Hero Horizontal Split ── */}
          <motion.div
            className="flex flex-col lg:flex-row mb-12 md:mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Left: Big hero image */}
            <div className="w-full lg:w-[60%] aspect-[4/3] lg:aspect-auto lg:min-h-[480px] relative overflow-hidden">
              <Image
                src={col.heroImage}
                alt={col.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              {/* Subtle blend edge into text panel on desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#110d09]/70 hidden lg:block" />
            </div>

            {/* Right: Story panel */}
            <div className="w-full lg:w-[40%] bg-[#110d09] border border-[#c49b7a]/10 lg:border-l-0 flex flex-col justify-center px-8 md:px-12 py-10 md:py-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="col-label text-[#c49b7a]/60">THE STORY</span>
                <div className="h-px flex-1 bg-[#c49b7a]/15" />
              </div>
              <p className="col-body text-[#e8e0d4]/80 text-base md:text-lg mb-8">
                {col.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#c49b7a]/30" />
                <span className="col-label text-[#c49b7a]/45">
                  {col.variants.length} VARIANTS AVAILABLE
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Poetic Divider ── */}
          <motion.div
            className="flex justify-center my-10 md:my-14"
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src="/images/poetic_divider.svg"
              alt="Divider"
              className="h-8 sm:h-10 md:h-12 w-auto opacity-70"
            />
          </motion.div>

          {/* ── Section label ── */}
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-16 bg-[#c49b7a]/20" />
              <span className="col-label text-[#c49b7a]/70">CHOOSE YOUR CUT</span>
              <div className="h-px w-16 bg-[#c49b7a]/20" />
            </div>
            <p className="col-tagline text-[#c49b7a]/50 text-base">
              Each variant tells a different chapter of the same story.
            </p>
          </motion.div>

          {/* ── Variant Cards ── */}
          <div
            className={`grid gap-8 md:gap-12 max-w-4xl mx-auto ${
              col.variants.length === 1 ? 'max-w-sm' : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {col.variants.map((variant, index) => (
              <motion.div
                key={variant.gender}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.6 + index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href={`/collections/${col.slug}/${variant.gender}`}
                  className="block group"
                  onMouseEnter={() => setHoveredGender(variant.gender)}
                  onMouseLeave={() => setHoveredGender(null)}
                >
                  {/* Card image */}
                  <div className="relative aspect-square w-full mb-5 overflow-hidden border border-[#c49b7a]/10">
                    <div
                      className="absolute inset-0 bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${variant.image})`,
                        ...variant.bgStyle,
                      }}
                    />
                    {/* Hover CTA overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-end justify-center pb-8"
                      animate={{ opacity: hoveredGender === variant.gender ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        background:
                          'linear-gradient(to top, rgba(12,9,5,0.75) 0%, transparent 50%)',
                      }}
                    >
                      <span className="variant-cta text-[#f5f0e8] flex items-center gap-2">
                        EXPLORE <ArrowRight className="w-3 h-3" />
                      </span>
                    </motion.div>
                  </div>

                  {/* Card text */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="col-label text-[#c49b7a]/50 uppercase">{variant.gender}</span>
                      <div className="h-px flex-1 bg-[#c49b7a]/10" />
                    </div>
                    <h3 className="col-body text-[#f5f0e8] text-xl font-light mb-1">
                      {variant.title}
                    </h3>
                    <p className="col-tagline text-[#c49b7a]/60 text-sm">
                      {variant.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#c49b7a]/60 group-hover:text-[#c49b7a] transition-colors duration-300">
                      <span className="variant-cta">VIEW COLLECTION</span>
                      <motion.div
                        animate={{ x: hoveredGender === variant.gender ? 4 : 0 }}
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

          {/* ── Footer note ── */}
          <motion.div
            className="text-center mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-16 bg-[#c49b7a]/20" />
              <span className="col-label text-[#c49b7a]/50 mx-4">LOOPINS STUDIO · JAKARTA</span>
              <div className="h-px w-16 bg-[#c49b7a]/20" />
            </div>
            <p className="col-tagline text-[#c49b7a]/50 text-base">
              Heritage woven into every thread.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
