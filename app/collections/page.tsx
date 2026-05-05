'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { collections } from '@/lib/collections-data'

export default function CollectionsPage() {
  const isSingleCollection = collections.length === 1

  // ─── Single collection: show variant cards exactly as before ───────────────
  if (isSingleCollection) {
    const col = collections[0]
    const items = col.variants.map((v, i) => ({
      id: i + 1,
      title: v.title,
      slug: `${col.slug}/${v.gender}`,
      description: v.description,
      itemCount: 1,
      image: v.image,
      bgStyle: v.bgStyle,
    }))

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
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link href={`/collections/${item.slug}`}>
                  <div className="group cursor-pointer hover:shadow-2xl transition-all duration-300 rounded-lg border border-soft-brown/20 overflow-hidden bg-white">
                    <div className="relative aspect-square overflow-hidden">
                      <div
                        className="absolute inset-0 bg-no-repeat group-hover:scale-105 transition-transform duration-700"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          ...item.bgStyle,
                        }}
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h2 className="text-sm sm:text-xl font-bold text-dark-brown mb-2">
                        {item.title}
                      </h2>
                      <p className="text-dark-brown/70 mb-2 text-sm sm:text-base">
                        {item.description}
                      </p>
                      <p className="text-earth-green font-semibold text-sm sm:text-base">
                        {item.itemCount} items
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

  // ─── Multiple collections: show collection-level cards ────────────────────
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
          {collections.map((col, index) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={`/collections/${col.slug}`}>
                <div className="group cursor-pointer hover:shadow-2xl transition-all duration-300 rounded-lg border border-soft-brown/20 overflow-hidden bg-white">
                  <div className="relative aspect-square overflow-hidden">
                    <div
                      className="absolute inset-0 bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${col.coverImage})` }}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="text-sm sm:text-xl font-bold text-dark-brown mb-2">
                      {col.name}
                    </h2>
                    <p className="text-dark-brown/70 mb-2 text-sm sm:text-base line-clamp-2">
                      {col.tagline}
                    </p>
                    <p className="text-earth-green font-semibold text-sm sm:text-base">
                      {col.variants.length} variants
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
