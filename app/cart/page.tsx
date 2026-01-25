'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const [orderNotes, setOrderNotes] = useState('')
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <motion.main
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="min-h-screen py-12 px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-16 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-dark-brown">CART</h1>
          <button
            onClick={handleClose}
            className="text-dark-brown hover:text-soft-brown transition-colors text-3xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12">
          {/* Items List - col-9 */}
          <div className="col-span-9">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-8 pb-4 border-b border-gray-300 mb-8">
              <div className="col-span-5 text-sm font-semibold text-dark-brown uppercase">Product</div>
              <div className="col-span-2 text-sm font-semibold text-dark-brown uppercase">Price</div>
              <div className="col-span-3 text-sm font-semibold text-dark-brown uppercase">Quantity</div>
              <div className="col-span-2 text-sm font-semibold text-dark-brown uppercase text-right">Total</div>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-8">Your cart is empty</p>
                <Link
                  href="/collections"
                  className="inline-block px-8 py-3 bg-dark-brown text-white font-medium text-sm uppercase tracking-widest hover:bg-soft-brown transition-all duration-300"
                >
                  Browse Collections
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-8 items-center pb-8 border-b border-gray-200">
                    {/* Product Column */}
                    <div className="col-span-5 flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-2xl font-bold">{item.name.charAt(0)}</span>
                        </div>
                      </div>
                      {/* Product Info */}
                      <div className="flex flex-col">
                        <span className="text-dark-brown font-medium text-base mb-1">{item.name}</span>
                        <span className="text-gray-500 text-sm">Size: {item.size || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Price Column */}
                    <div className="col-span-2">
                      <span className="text-dark-brown">Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>

                    {/* Quantity Column */}
                    <div className="col-span-3">
                      <div className="flex items-center border border-gray-300 w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-dark-brown"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 h-10 text-center border-l border-r border-gray-300 focus:outline-none text-dark-brown"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-dark-brown"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total Column */}
                    <div className="col-span-2 text-right">
                      <span className="text-dark-brown font-medium">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary - col-3 */}
          <div className="col-span-3">
            <div className="space-y-8">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-semibold text-dark-brown">Subtotal</span>
                <span className="text-2xl font-semibold text-dark-brown">
                  Rp {getTotalPrice().toLocaleString('id-ID')}
                </span>
              </div>

              {/* Tax Info */}
              <p className="text-sm text-gray-600 leading-relaxed">
                Includes taxes. For international orders, additional customs charges may apply. Please check our FAQs for more information.
              </p>

              {/* Order Notes */}
              <div>
                <label className="block text-sm font-medium text-dark-brown mb-2">Order Notes</label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Add any special instructions..."
                  className="w-full h-24 border border-gray-300 px-4 py-3 text-sm text-dark-brown focus:outline-none focus:border-dark-brown resize-none"
                />
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full py-4 bg-dark-brown text-white text-center font-medium text-sm uppercase tracking-widest hover:bg-soft-brown transition-all duration-300"
              >
                Checkout
              </Link>

              {/* Continue Shopping Button */}
              <Link
                href="/collections"
                className="block w-full py-4 bg-white border-2 border-dark-brown text-dark-brown text-center font-medium text-sm uppercase tracking-widest hover:bg-dark-brown hover:text-white transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}