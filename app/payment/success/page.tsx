'use client'

import { motion } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { api } from '@/lib/api'
import Image from 'next/image'

interface OrderItem {
  id: number
  productId: string
  productName: string
  unitPrice: number
  quantity: number
  lineTotal: number
}

interface OrderDetails {
  id: string
  status: string
  subtotal: number
  shippingFee: number
  totalAmount: number
  shippingAddress: string
  items: OrderItem[]
  createdAt: string
  paidAt: string | null
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatProductName(name: string) {
  return name.replace(/ s-/gi, ' Size ')
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')

  const [isLoading, setIsLoading] = useState(true)
  const [orderStatus, setOrderStatus] = useState<'success' | 'failed' | 'pending'>('pending')
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [customerName, setCustomerName] = useState<string>('')

  useEffect(() => {
    const name = sessionStorage.getItem('loopins-last-customer-name') || ''
    setCustomerName(name)
  }, [])

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setOrderStatus('failed')
        setIsLoading(false)
        return
      }

      const MAX_RETRIES = 6
      const RETRY_DELAY_MS = 2500

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const response = await api.getOrder(orderId)

          if (response.success && response.data) {
            const status = response.data.status as string
            if (status === 'PAID' || status === 'paid' || status === 'COMPLETED' || status === 'completed') {
              setOrderDetails(response.data)
              setOrderStatus('success')
              setIsLoading(false)
              return
            }
            // Order exists but not paid yet — keep retrying
          }

          if (attempt < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS))
          }
        } catch (error) {
          console.error(`Order fetch attempt ${attempt} error:`, error)
          if (attempt < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS))
          }
        }
      }

      setOrderStatus('failed')
      setIsLoading(false)
    }

    fetchOrder()
  }, [orderId])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-light-cream flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-16 w-16 text-soft-brown mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-dark-brown text-xl">Confirming your order...</p>
          <p className="text-dark-brown/50 text-sm mt-2">This may take a few seconds</p>
        </div>
      </main>
    )
  }

  if (orderStatus === 'success' && orderDetails) {
    const firstName = customerName.split(' ')[0]

    return (
      <main className="min-h-screen bg-light-cream pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, rgba(112,51,21,0.2) 0%, rgba(112,51,21,0.05) 100%)', border: '2px solid rgba(112,51,21,0.3)' }}
            >
              <svg className="w-12 h-12 text-soft-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-soft-brown text-sm uppercase tracking-widest font-medium mb-2"
            >
              Purchase Confirmed
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-dark-brown mb-3"
            >
              {firstName ? `Thank you, ${firstName}!` : 'Thank you!'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-dark-brown/60 text-base"
            >
              Your order has been confirmed and is being prepared.
            </motion.p>
          </motion.div>

          {/* Order ID badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6"
          >
            <span className="text-dark-brown/50 text-sm">Order</span>
            <span className="font-mono text-soft-brown text-xs sm:text-sm bg-soft-brown/10 border border-soft-brown/30 px-3 py-1 rounded-full break-all">
              {orderDetails.id}
            </span>
            {orderDetails.paidAt && (
              <span className="text-dark-brown/50 text-xs w-full text-center sm:w-auto">{formatDate(orderDetails.paidAt)}</span>
            )}
          </motion.div>

          {/* Items purchased */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4 shadow-sm"
          >
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-dark-brown font-semibold text-sm uppercase tracking-wider">Items Purchased</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {orderDetails.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.05 }}
                  className="flex items-center justify-between px-4 sm:px-6 py-4 gap-3 sm:gap-4"
                >
                  {/* Product icon placeholder */}
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(112,51,21,0.1)', border: '1px solid rgba(112,51,21,0.2)' }}
                  >
                    <svg className="w-5 h-5 text-soft-brown/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-dark-brown font-medium text-sm leading-tight truncate">{formatProductName(item.productName)}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Qty: {item.quantity}</p>
                  </div>

                  <p className="text-soft-brown font-semibold text-sm flex-shrink-0">{formatCurrency(item.lineTotal)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4 shadow-sm"
          >
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-dark-brown font-semibold text-sm uppercase tracking-wider">Order Summary</h2>
            </div>
            <div className="px-4 sm:px-6 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-dark-brown">{formatCurrency(orderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-dark-brown">
                  {orderDetails.shippingFee === 0 ? 'Free' : formatCurrency(orderDetails.shippingFee)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-dark-brown font-semibold">Total</span>
                <span className="text-soft-brown font-bold text-lg">{formatCurrency(orderDetails.totalAmount)}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping address */}
          {orderDetails.shippingAddress && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 shadow-sm"
            >
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-dark-brown font-semibold text-sm uppercase tracking-wider">Shipping To</h2>
              </div>
              <div className="px-4 sm:px-6 py-4 flex items-start gap-3">
                <svg className="w-4 h-4 text-soft-brown/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600 text-sm leading-relaxed">{orderDetails.shippingAddress}</p>
              </div>
            </motion.div>
          )}

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-3"
          >
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-3.5 bg-white border border-soft-brown/50 text-soft-brown font-bold rounded-full hover:bg-soft-brown/10 transition-all duration-300 text-sm"
          >
            Back to Home
          </button>

          <button
            onClick={() => router.push('/collections')}
            className="flex-1 py-3.5 bg-soft-brown text-white font-bold rounded-full hover:bg-soft-brown/80 transition-all duration-300 hover:scale-[1.02] text-sm"
          >
            Continue Shopping
          </button>
          </motion.div>

        </div>
      </main>
    )
  }

  // Payment Failed / Unknown state
  return (
    <main className="min-h-screen bg-light-cream pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <svg className="w-12 h-12 text-red-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-dark-brown mb-3">Payment Not Confirmed</h1>
          <p className="text-dark-brown/60 mb-2">
            We could not confirm your payment status for:
          </p>
          {orderId && (
            <p className="font-mono text-soft-brown text-sm bg-soft-brown/10 inline-block px-4 py-2 rounded-full mb-8">
              {orderId}
            </p>
          )}
          <p className="text-dark-brown/40 text-sm mb-8">
            If you completed the payment, please contact our support — your order may still have gone through.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/cart')}
              className="px-8 py-3 bg-soft-brown text-white font-bold rounded-full hover:bg-soft-brown/80 transition-all duration-300"
            >
              Back to Cart
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 border border-soft-brown/30 text-dark-brown font-bold rounded-full hover:bg-soft-brown/10 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-light-cream flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-16 w-16 text-soft-brown mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-dark-brown text-xl">Loading...</p>
        </div>
      </main>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
