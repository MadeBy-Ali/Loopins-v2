'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Collection, CollectionSubProduct } from '@/lib/collections-data'
import { useCartStore } from '@/lib/cart-store'
import { useNotificationStore } from '@/lib/notification-store'
import SuccessNotification from '@/components/SuccessNotification'

export default function CollectionPageClient({ collection: col }: { collection: Collection }) {
  const [hoveredGender, setHoveredGender] = useState<string | null>(null)
  const [subQuantities, setSubQuantities] = useState<Record<string, number>>({})
  const [subIsAdding, setSubIsAdding] = useState<Record<string, boolean>>({})

  const addItem = useCartStore((state) => state.addItem)
  const { isVisible, message, showNotification } = useNotificationStore()

  const handleSubAddToCart = (sub: CollectionSubProduct) => {
    const qty = subQuantities[sub.id] || 1
    setSubIsAdding(prev => ({ ...prev, [sub.id]: true }))
    addItem({
      id: sub.sizeIds || sub.id,
      name: sub.name,
      price: sub.price,
      quantity: qty,
      image: sub.images[0],
    })
    setTimeout(() => {
      setSubIsAdding(prev => ({ ...prev, [sub.id]: false }))
      showNotification()
    }, 500)
  }

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

        /* ── Sub-product card ── */
        .sub-card {
          display: flex;
          gap: 1.25rem;
          background: rgba(17, 13, 9, 0.6);
          border: 1px solid rgba(196, 155, 122, 0.10);
          padding: 1.25rem;
          transition: border-color 0.35s ease, background 0.35s ease;
        }
        @media (min-width: 768px) { .sub-card { padding: 1.5rem; gap: 1.5rem; } }
        .sub-card:hover { border-color: rgba(196, 155, 122, 0.22); background: rgba(22, 17, 12, 0.8); }

        .sub-thumb {
          flex-shrink: 0;
          width: 88px; height: 88px;
          overflow: hidden;
          border: 1px solid rgba(196, 155, 122, 0.14);
        }
        @media (min-width: 768px) { .sub-thumb { width: 112px; height: 112px; } }

        .sub-sz-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px;
          font-family: 'Cormorant SC', serif;
          font-size: 11px; letter-spacing: 0.12em;
          cursor: pointer; transition: all 0.2s ease;
        }
        .sub-sz-btn:hover { border-color: rgba(196, 155, 122, 0.65) !important; }

        .sub-qty-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; font-size: 14px;
          background: transparent;
          border: 1px solid rgba(196, 155, 122, 0.18);
          color: #c49b7a; cursor: pointer;
          transition: background 0.2s ease;
        }
        .sub-qty-btn:hover { background: rgba(196, 155, 122, 0.10); }

        .sub-add-btn {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.22em; font-size: 10px;
          padding: 6px 14px;
          border: 1px solid rgba(196, 155, 122, 0.28);
          background: transparent; color: rgba(196, 155, 122, 0.75);
          cursor: pointer; white-space: nowrap;
          transition: all 0.25s ease;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .sub-add-btn:not(:disabled):hover {
          background: rgba(196, 155, 122, 0.10);
          border-color: rgba(196, 155, 122, 0.55);
          color: #c49b7a;
        }
        .sub-add-btn:disabled { opacity: 0.5; cursor: not-allowed; }
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#110d09]/70 hidden lg:block" />
            </div>

            {/* Right: Story panel */}
            <div className="w-full lg:w-[40%] bg-[#110d09] border border-[#c49b7a]/10 lg:border-l-0 flex flex-col justify-center px-8 md:px-12 py-10 md:py-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="col-label text-[#c49b7a]">THE STORY</span>
                <div className="h-px flex-1 bg-[#c49b7a]/15" />
              </div>
              <p className="col-body text-[#e8e0d4]/80 text-base md:text-lg mb-8">
                {col.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#c49b7a]/30" />
                <span className="col-label text-[#c49b7a]">
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
              <span className="col-label text-[#c49b7a]">CHOOSE YOUR CUT</span>
              <div className="h-px w-16 bg-[#c49b7a]/20" />
            </div>
            <p className="col-tagline text-[#c49b7a] text-base">
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
                      <span className="col-label text-[#c49b7a] uppercase">{variant.gender}</span>
                      <div className="h-px flex-1 bg-[#c49b7a]/10" />
                    </div>
                    <h3 className="col-body text-[#f5f0e8] text-xl font-light mb-1">
                      {variant.title}
                    </h3>
                    <p className="col-tagline text-[#c49b7a] text-sm">
                      {variant.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#c49b7a] group-hover:text-[#c49b7a] transition-colors duration-300">
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

          {/* ── Companion Pieces (Sub-Products) ── */}
          {col.subProducts && col.subProducts.length > 0 && (
            <>
              {/* Poetic divider — reuses the same visual rhythm */}
              <motion.div
                className="flex justify-center my-10 md:my-14"
                initial={{ opacity: 0, scaleX: 0.5 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src="/images/poetic_divider.svg"
                  alt="Divider"
                  className="h-8 sm:h-10 md:h-12 w-auto opacity-70"
                />
              </motion.div>

              {/* Section label */}
              <motion.div
                className="text-center mb-10 md:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.95 }}
              >
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="h-px w-16 bg-[#c49b7a]/20" />
                  <span className="col-label text-[#c49b7a]">COMPANION PIECES</span>
                  <div className="h-px w-16 bg-[#c49b7a]/20" />
                </div>
                <p className="col-tagline text-[#c49b7a] text-base">
                  Each thread tells a different story.
                </p>
              </motion.div>

              {/* Sub-product cards */}
              <div className="max-w-4xl mx-auto space-y-4">
                {(() => {
                  // Group products by storeTitle or use individual products
                  const groupedProducts: { id: string; displayProduct: CollectionSubProduct; variants?: CollectionSubProduct[] }[] = []
                  const processedIds = new Set<string>()
                  
                  col.subProducts.forEach((sub) => {
                    if (processedIds.has(sub.id)) return
                    
                    if (sub.storeTitle) {
                      // Find all variants with the same storeTitle
                      const variants = col.subProducts!.filter(p => p.storeTitle === sub.storeTitle)
                      variants.forEach(v => processedIds.add(v.id))
                      groupedProducts.push({ id: sub.id, displayProduct: sub, variants })
                    } else {
                      processedIds.add(sub.id)
                      groupedProducts.push({ id: sub.id, displayProduct: sub })
                    }
                  })
                  
                  return groupedProducts.map(({ id, displayProduct: sub, variants }, index) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 1.0 + index * 0.12,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <div className="sub-card">
                        {/* Thumbnail — links to detail page */}
                        <Link href={`/collections/${col.slug}/accessories/${sub.id}`} className="sub-thumb block flex-shrink-0">
                          <img
                            src={sub.showcaseImage}
                            alt={sub.storeTitle || sub.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          {/* Top: name + price */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <Link href={`/collections/${col.slug}/accessories/${sub.id}`}>
                              <h3 className="col-label text-[#f5f0e8]/90 text-[16px] leading-snug flex-1 hover:text-[#c49b7a] transition-colors duration-200">
                                {sub.storeTitle || sub.name}
                              </h3>
                            </Link>
                            <div className="text-right flex-shrink-0">
                              {variants ? (
                                <>
                                  <span className="col-body text-[#c49b7a] font-semibold text-[18px] block">
                                    Rp {Math.min(...variants.map(v => v.price)).toLocaleString('id-ID')} - Rp {Math.max(...variants.map(v => v.price)).toLocaleString('id-ID')}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="col-body text-[#c49b7a] font-semibold text-[18px] block">
                                    {sub.price > 0 ? `Rp ${sub.price.toLocaleString('id-ID')}` : '—'}
                                  </span>
                                  {sub.originalPrice > sub.price && sub.price > 0 && (
                                    <span className="col-body text-[#c49b7a] text-[14px] line-through block">
                                      Rp {sub.originalPrice.toLocaleString('id-ID')}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="col-tagline text-[#e8e0d4]/45 text-[15px] mb-3 leading-relaxed">
                            {sub.description}
                          </p>

                          {/* Controls row */}
                          <div className="flex items-center gap-3 flex-wrap">
                            {variants ? (
                              <Link 
                                href={`/collections/${col.slug}/accessories/${sub.id}`}
                                className="sub-add-btn ml-auto"
                              >
                                VIEW OPTIONS
                                <ArrowRight className="w-2.5 h-2.5" />
                              </Link>
                            ) : (
                              <button
                                className="sub-add-btn ml-auto"
                                disabled={subIsAdding[sub.id]}
                                onClick={() => handleSubAddToCart(sub)}
                              >
                                {subIsAdding[sub.id] ? 'ADDING' : 'ADD TO CART'}
                                {!subIsAdding[sub.id] && <ArrowRight className="w-2.5 h-2.5" />}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                })()}
              </div>
            </>
          )}

          {/* ── Footer note ── */}
          <motion.div
            className="text-center mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-16 bg-[#c49b7a]/20" />
              <span className="col-label text-[#c49b7a] mx-4">LOOPINS STUDIO · JAKARTA</span>
              <div className="h-px w-16 bg-[#c49b7a]/20" />
            </div>
            <p className="col-tagline text-[#c49b7a] text-base">
              Heritage woven into every thread.
            </p>
          </motion.div>
        </div>
      </main>

      <SuccessNotification isVisible={isVisible} message={message} />
    </>
  )
}
