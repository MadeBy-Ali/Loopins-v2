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
    <main className="min-h-screen bg-dark-green pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-light-cream mb-4">
            Our Collections
          </h1>
          <p className="text-xl text-light-cream/80">
            Explore our curated vest collections
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={`/collections/${collection.slug}`}>
                <div className="group relative h-96 bg-gradient-to-br from-earth-green to-soft-brown rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300">
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-light-cream/10 rounded-lg backdrop-blur-sm border-2 border-light-cream/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-light-cream/50 text-8xl font-bold">
                        {collection.title.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-green/90 to-transparent">
                    <h2 className="text-3xl font-bold text-light-cream mb-2">
                      {collection.title}
                    </h2>
                    <p className="text-light-cream/80 mb-2">
                      {collection.description}
                    </p>
                    <p className="text-soft-brown font-semibold">
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