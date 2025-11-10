'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const [isClearing, setIsClearing] = useState(false)

  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
    }, 300)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-dark-green pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-earth-green/20 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-light-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-light-cream mb-4">Your cart is empty</h1>
            <p className="text-light-cream/70 mb-8">Add some items to get started!</p>
            <Link
              href="/collections"
              className="inline-block px-8 py-3 bg-soft-brown text-light-cream font-bold rounded-full hover:bg-soft-brown/80 transition-all duration-300"
            >
              Browse Collections
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-green pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-light-cream">Shopping Cart</h1>
            <button
              onClick={handleClearCart}
              className="text-soft-brown hover:text-soft-brown/70 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-earth-green/20 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-light-cream/10"
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Image Placeholder */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-soft-brown/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-light-cream/50 text-3xl font-bold">
                      {item.name.charAt(0)}
                    </span>
                  </div>

                  {/* Item Details */}
                  <div className="flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-light-cream mb-2">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-light-cream/70 text-sm mb-1">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-light-cream/70 text-sm mb-2">Color: {item.color}</p>
                    )}
                    <p className="text-soft-brown font-bold text-lg">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-light-cream/50 hover:text-soft-brown transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-2 bg-dark-green/50 rounded-full px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-light-cream hover:text-soft-brown transition-colors"
                      >
                        -
                      </button>
                      <span className="text-light-cream font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-light-cream hover:text-soft-brown transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total & Checkout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-earth-green/30 backdrop-blur-sm rounded-lg p-6 border border-light-cream/20"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-light-cream">Total:</span>
              <span className="text-3xl font-bold text-soft-brown">
                Rp {getTotalPrice().toLocaleString('id-ID')}
              </span>
            </div>
            <Link
              href="/checkout"
              className="block w-full py-4 bg-gradient-to-r from-soft-brown to-earth-green text-light-cream text-center font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}