'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    title: "Mbok Jamu - Men's Collection",
    slug: 'mbok-jamu/men',
    description: 'Premium collection designed for the modern gentleman',
    itemCount: 1,
  },
  {
    id: 2,
    title: "Mbok Jamu - Women's Collection",
    slug: 'mbok-jamu/women',
    description: 'Elegant collection for the contemporary woman',
    itemCount: 1,
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
                <div className="group relative h-80 sm:h-96 bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border border-soft-brown/20">
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-light-cream to-white">
                    <div className="w-48 sm:w-64 h-48 sm:h-64 bg-dark-green/5 rounded-lg border-2 border-dark-green/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-dark-green/30 text-6xl sm:text-8xl font-bold">
                        {collection.title.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white to-white/95">
                    <h2 className="text-2xl sm:text-3xl font-bold text-dark-brown mb-2">
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