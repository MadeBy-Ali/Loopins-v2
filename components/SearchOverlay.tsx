'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Search } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  collection: string
  gender: string
  slug: string
}

// Mock products - replace with actual API call later
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Vest',
    price: 850000,
    image: '/images/featured_ptrt_1.png',
    collection: 'mbok-jamu',
    gender: 'men',
    slug: 'classic-vest'
  },
  {
    id: '2',
    name: 'Premium Vest',
    price: 950000,
    image: '/images/featured_ptrt_2.png',
    collection: 'mbok-jamu',
    gender: 'women',
    slug: 'premium-vest'
  }
]

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([])
      return
    }

    const filtered = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchQuery])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Search Panel */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 bg-white z-50 shadow-2xl"
            style={{ height: '50vh' }}
          >
            <div className="h-full overflow-y-auto">
              <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-dark-brown">Search Products</h2>
                  <button
                    onClick={onClose}
                    className="text-dark-brown hover:text-soft-brown transition-colors text-2xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Search Input */}
                <div className="mb-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products..."
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-dark-brown focus:outline-none text-dark-brown text-lg"
                    />
                  </div>
                </div>

                {/* Search Results */}
                <div>
                  {searchQuery.trim() === '' ? (
                    <div className="text-center py-12">
                      <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-400 text-lg">Start typing to search products</p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No products found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/collections/${product.collection}/${product.gender}`}
                          onClick={onClose}
                          className="flex gap-4 border border-gray-200 p-4 hover:border-dark-brown transition-all duration-300 group"
                        >
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <span className="text-2xl font-bold">{product.name.charAt(0)}</span>
                            </div>
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="text-dark-brown font-medium mb-1 group-hover:text-soft-brown transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2 capitalize">
                              {product.gender}'s Collection
                            </p>
                            <p className="text-dark-brown font-semibold">
                              Rp {product.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
