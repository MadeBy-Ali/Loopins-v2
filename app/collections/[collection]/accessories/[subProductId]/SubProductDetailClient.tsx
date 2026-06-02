'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { CollectionSubProduct } from '@/lib/collections-data'
import { useCartStore } from '@/lib/cart-store'
import { useNotificationStore } from '@/lib/notification-store'
import SuccessNotification from '@/components/SuccessNotification'

interface Props {
  collectionSlug: string
  collectionName: string
  subProduct: CollectionSubProduct
}

export default function SubProductDetailClient({ collectionSlug, collectionName, subProduct }: Props) {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const addItem = useCartStore(s => s.addItem)
  const { isVisible, message, showNotification } = useNotificationStore()

  const handleAddToCart = () => {
    if (subProduct.sizes.length > 0 && !selectedSize) {
      alert('Please select a size')
      return
    }
    setIsAdding(true)
    addItem({
      id: selectedSize
        ? (subProduct.sizeIds[selectedSize] || `${subProduct.id}-${selectedSize}`)
        : subProduct.id,
      name: subProduct.name,
      price: subProduct.price,
      quantity,
      image: subProduct.images[0],
      size: selectedSize || undefined,
    })
    setTimeout(() => {
      setIsAdding(false)
      showNotification()
    }, 500)
  }

  const prev = () =>
    setCurrentImage(i => (i === 0 ? subProduct.images.length - 1 : i - 1))
  const next = () =>
    setCurrentImage(i => (i === subProduct.images.length - 1 ? 0 : i + 1))

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const dist = touchStart - touchEnd
    if (dist > 50) next()
    else if (dist < -50) prev()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cormorant+SC:wght@300;400;500&display=swap');

        .sp-page {
          min-height: 100vh;
          background-color: #0c0905;
          position: relative;
          overflow-x: hidden;
        }

        /* Film grain */
        .sp-page::before {
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
        .sp-page::after {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(6,3,1,0.7) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .sp-label {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.28em;
          font-size: 10px;
          font-weight: 400;
          text-transform: uppercase;
        }

        .sp-title {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.06em;
          font-weight: 400;
          line-height: 1.15;
        }

        .sp-body {
          font-family: 'Cormorant Garant', serif;
          line-height: 1.7;
        }

        .sp-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.22em;
          font-size: 10px;
          color: rgba(196,155,122,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .sp-back:hover { color: #c49b7a; }

        .sp-thumb {
          cursor: pointer;
          aspect-ratio: 1;
          overflow: hidden;
          border: 1px solid transparent;
          transition: border-color 0.2s, opacity 0.2s;
          opacity: 0.45;
          background: #110d09;
        }
        .sp-thumb.active {
          border-color: rgba(196,155,122,0.55);
          opacity: 1;
        }
        .sp-thumb:hover { opacity: 0.8; }

        .sp-sz-btn {
          width: 42px;
          height: 32px;
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.12em;
          font-size: 11px;
          cursor: pointer;
          background: transparent;
          transition: all 0.18s;
        }

        .sp-add-btn {
          font-family: 'Cormorant SC', serif;
          letter-spacing: 0.28em;
          font-size: 11px;
          background: transparent;
          border: 1px solid rgba(196,155,122,0.5);
          color: #c49b7a;
          padding: 14px 28px;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          justify-content: center;
        }
        .sp-add-btn:hover:not(:disabled) {
          background: rgba(196,155,122,0.1);
          border-color: #c49b7a;
        }
        .sp-add-btn:disabled { opacity: 0.5; cursor: default; }

        .sp-qty-btn {
          width: 32px;
          height: 32px;
          background: transparent;
          border: 1px solid rgba(196,155,122,0.25);
          color: rgba(196,155,122,0.7);
          font-family: 'Cormorant Garant', serif;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s;
          flex-shrink: 0;
        }
        .sp-qty-btn:hover {
          border-color: rgba(196,155,122,0.6);
          color: #c49b7a;
        }

        .sp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(196,155,122,0.18), transparent);
          margin: 1.75rem 0;
        }

        .sp-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(12,9,5,0.65);
          border: 1px solid rgba(196,155,122,0.18);
          color: rgba(196,155,122,0.65);
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 2;
        }
        .sp-nav-btn:hover {
          background: rgba(196,155,122,0.12);
          border-color: rgba(196,155,122,0.5);
          color: #c49b7a;
        }

        .sp-care-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(196,155,122,0.4);
          flex-shrink: 0;
          margin-top: 7px;
        }
      `}</style>

      <main className="sp-page">
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-28">

          {/* ── Back breadcrumb ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <Link href={`/collections/${collectionSlug}`} className="sp-back">
              <ArrowLeft className="w-3 h-3" />
              {collectionName} · Collection
            </Link>
          </motion.div>

          {/* ── Main grid: images | info ── */}
          <div className="lg:grid lg:gap-16 xl:gap-20" style={{ gridTemplateColumns: '1fr 400px' }}>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Primary image */}
              <div
                className="relative aspect-square overflow-hidden mb-3"
                style={{ background: '#110d09' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={subProduct.images[currentImage]}
                    alt={`${subProduct.name} — view ${currentImage + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={subProduct.imagePositions[currentImage]}
                  />
                </AnimatePresence>

                {/* Nav arrows */}
                {subProduct.images.length > 1 && (
                  <>
                    <button className="sp-nav-btn" style={{ left: '12px' }} onClick={prev}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="sp-nav-btn" style={{ right: '12px' }} onClick={next}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div
                  className="absolute bottom-3 right-3 sp-label"
                  style={{ color: 'rgba(196,155,122,0.45)', fontSize: '9px' }}
                >
                  {String(currentImage + 1).padStart(2, '0')} / {String(subProduct.images.length).padStart(2, '0')}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${subProduct.images.length}, 1fr)` }}
              >
                {subProduct.images.map((img, i) => (
                  <button
                    key={i}
                    className={`sp-thumb ${i === currentImage ? 'active' : ''}`}
                    onClick={() => setCurrentImage(i)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-10 lg:mt-0"
            >
              {/* Collection chip */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: 'rgba(196,155,122,0.3)' }} />
                <span className="sp-label" style={{ color: '#c49b7a' }}>
                  {collectionName} · Companion Piece
                </span>
              </div>

              {/* Product name */}
              <h1
                className="sp-title text-[#f5f0e8] mb-5"
                style={{ fontSize: 'clamp(38px, 5vw, 54px)' }}
              >
                {subProduct.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="sp-body font-semibold text-[#c49b7a]" style={{ fontSize: '22px' }}>
                  {subProduct.price > 0
                    ? `Rp ${subProduct.price.toLocaleString('id-ID')}`
                    : '—'}
                </span>
                {subProduct.originalPrice > subProduct.price && subProduct.price > 0 && (
                  <span
                    className="sp-body line-through"
                    style={{ color: 'rgba(196,155,122,0.4)', fontSize: '14px' }}
                  >
                    Rp {subProduct.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              <div className="sp-divider" />

              {/* Description */}
              {subProduct.description && (
                <p
                  className="sp-body italic mb-5 leading-relaxed"
                  style={{ fontSize: '16px', color: 'rgba(232,224,212,0.82)' }}
                >
                  {subProduct.description}
                </p>
              )}

              {/* Size selector */}
              {subProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="sp-label" style={{ color: '#c49b7a' }}>SIZE</span>
                    {selectedSize && (
                      <span className="sp-body text-[#c49b7a]" style={{ fontSize: '13px' }}>
                        — {selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subProduct.sizes.map(sz => (
                      <button
                        key={sz}
                        className="sp-sz-btn"
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          border: selectedSize === sz
                            ? '1px solid rgba(196,155,122,0.75)'
                            : '1px solid rgba(196,155,122,0.2)',
                          background: selectedSize === sz
                            ? 'rgba(196,155,122,0.12)'
                            : 'transparent',
                          color: selectedSize === sz
                            ? '#c49b7a'
                            : 'rgba(196,155,122,0.5)',
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add to cart */}
              <div className="flex items-stretch gap-3">
                <div className="flex items-center">
                  <button className="sp-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    −
                  </button>
                  <span
                    className="sp-body text-[#f5f0e8]"
                    style={{ width: '42px', textAlign: 'center', fontSize: '15px' }}
                  >
                    {quantity}
                  </span>
                  <button className="sp-qty-btn" onClick={() => setQuantity(q => q + 1)}>
                    +
                  </button>
                </div>
                <button className="sp-add-btn" onClick={handleAddToCart} disabled={isAdding}>
                  {isAdding ? 'ADDING...' : 'ADD TO CART'}
                </button>
              </div>

              {(subProduct.story.length > 0 || subProduct.features.length > 0) && (
                <div className="sp-divider" style={{ marginTop: '2.25rem' }} />
              )}

              {/* Story */}
              {subProduct.story.length > 0 && (
                <div className="mb-7">
                  <span className="sp-label block mb-4" style={{ color: '#c49b7a' }}>
                    THE STORY
                  </span>
                  {subProduct.story.map((para, i) => (
                    <p
                      key={i}
                      className="sp-body mb-3"
                      style={{ fontSize: '15px', color: 'rgba(232,224,212,0.72)' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Care instructions */}
              {subProduct.features.length > 0 && (
                <div>
                  <span className="sp-label block mb-4" style={{ color: '#c49b7a' }}>
                    CARE
                  </span>
                  <div className="flex flex-col gap-2">
                    {subProduct.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="sp-care-dot" />
                        <span
                          className="sp-body"
                          style={{ fontSize: '13px', color: 'rgba(232,224,212,0.58)' }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer ornament */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div
              className="h-px w-16"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(196,155,122,0.18))' }}
            />
            <span className="sp-label" style={{ color: 'rgba(196,155,122,0.38)' }}>
              LOOPINS STUDIO · JAKARTA
            </span>
            <div
              className="h-px w-16"
              style={{ background: 'linear-gradient(90deg, rgba(196,155,122,0.18), transparent)' }}
            />
          </motion.div>
        </div>
      </main>

      <SuccessNotification isVisible={isVisible} message={message} />
    </>
  )
}
