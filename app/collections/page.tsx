'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    title: "Mbok Jamu - Men's Collection",
    slug: 'mbok-jamu/men',
    description: 'Premium collection designed for the modern gentleman',
    itemCount: 1,
    image: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_men_vest_cover.jpg',
    // Tune backgroundPosition: 'X% Y%' → lower X = more left, lower Y = more up
    // Tune backgroundSize: 'cover' fills container, or e.g. '120%' zooms in
    bgStyle: { backgroundPosition: '60% 63%', backgroundSize: '130%' } as React.CSSProperties,
  },
  {
    id: 2,
    title: "Mbok Jamu - Women's Collection",
    slug: 'mbok-jamu/women',
    description: 'Elegant collection for the contemporary woman',
    itemCount: 1,
    image: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_women_vest_cover.jpg',
    // Tune backgroundSize: '80%' = scaled down, 'cover' = full fill, '100%' = fit width
    bgStyle: { backgroundPosition: '50% 30%', backgroundSize: '100%' } as React.CSSProperties,
  },
]

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-light-cream pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-dark-brown mb-3 sm:mb-4">
            Our Collections
          </h1>
          <p className="text-lg sm:text-xl text-dark-brown/70">
            Explore our curated vest collections
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={`/collections/${collection.slug}`}>
                {/* Card height: change h-[600px] (mobile) and sm:h-[750px] (desktop) to tune */}
                <div className="group relative h-[600px] sm:h-[750px] bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border border-soft-brown/20">
                  {/* Collection Image */}
                  <div
                    className="absolute inset-0 bg-no-repeat group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${collection.image})`,
                      ...collection.bgStyle,
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white to-white/95">
                    <h2 className="text-sm sm:text-xl font-bold text-dark-brown mb-2">
                      {collection.title}
                    </h2>
                    <p className="text-dark-brown/70 mb-2 text-sm sm:text-base">
                      {collection.description}
                    </p>
                    <p className="text-earth-green font-semibold text-sm sm:text-base">
                      {collection.itemCount} items
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}