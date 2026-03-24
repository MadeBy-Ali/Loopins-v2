'use client'

import { motion } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { api } from '@/lib/api'
import { useNotificationStore } from '@/lib/notification-store'
import SuccessNotification from '@/components/SuccessNotification'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const { isVisible, message, showNotification } = useNotificationStore()
  
  const [isVerifying, setIsVerifying] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending'>('pending')

  useEffect(() => {
    const verifyPaymentAsync = async () => {
      const MAX_RETRIES = 6
      const RETRY_DELAY_MS = 2000

      setIsVerifying(true)

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const response = await api.verifyPayment(orderId!)

          if (response.success && response.status === 'paid') {
            setPaymentStatus('success')
            setTimeout(() => showNotification(), 500)
            setIsVerifying(false)
            return
          }

          // Backend not ready yet — wait before retrying
          if (attempt < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS))
          }
        } catch (error) {
          console.error(`Payment verification attempt ${attempt} error:`, error)
          if (attempt < MAX_RETRIES) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS))
          }
        }
      }

      // All retries exhausted
      setPaymentStatus('failed')
      setIsVerifying(false)
    }

    if (orderId) {
      verifyPaymentAsync()
    } else {
      setIsVerifying(false)
      setPaymentStatus('failed')
    }
  }, [orderId])



  if (isVerifying) {
    return (
      <main className="min-h-screen bg-dark-green flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-16 w-16 text-soft-brown mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-light-cream text-xl">Verifying your payment...</p>
          <p className="text-light-cream/50 text-sm mt-2">This may take a few seconds</p>
        </div>
      </main>
    )
  }

  if (paymentStatus === 'success') {
    return (
      <main className="min-h-screen bg-dark-green pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-32 h-32 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-soft-brown mb-4"
            >
              Order Created!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-soft-brown/80 mb-2"
            >
              Thank you for your purchase
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-soft-brown/60 mb-8"
            >
              Order ID: <span className="font-mono text-soft-brown">{orderId}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-earth-green/50 backdrop-blur-sm rounded-lg p-8 border border-light-cream/10 mb-8"
            >
              <h2 className="text-2xl font-bold text-light-cream mb-4">What&apos;s Next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-soft-brown/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-light-cream font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-light-cream font-semibold mb-1">Order Confirmation</h3>
                    <p className="text-light-cream/70 text-sm">
                      You&apos;ll receive an email confirmation with your order details shortly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-soft-brown/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-light-cream font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-light-cream font-semibold mb-1">Processing</h3>
                    <p className="text-light-cream/70 text-sm">
                      We&apos;ll prepare your order and get it ready for shipping.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-soft-brown/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-light-cream font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-light-cream font-semibold mb-1">Delivery</h3>
                    <p className="text-light-cream/70 text-sm">
                      Your order will be shipped within 2-3 business days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={() => router.push('/')}
                className="px-8 py-3 bg-soft-brown text-light-cream font-bold rounded-full hover:bg-soft-brown/80 transition-all duration-300 hover:scale-105"
              >
                Back to Home
              </button>
              <button
                onClick={() => router.push('/collections')}
                className="px-8 py-3 bg-soft-brown/50 border border-light-cream/20 text-light-cream font-bold rounded-full hover:bg-soft-brown/30 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    )
  }

  // Payment Failed
  return (
    <main className="min-h-screen bg-dark-green pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-light-cream mb-4">
            Payment Failed
          </h1>
          <p className="text-xl text-light-cream/80 mb-8">
            Something went wrong with your payment. Please try again.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/cart')}
              className="px-8 py-3 bg-soft-brown text-light-cream font-bold rounded-full hover:bg-soft-brown/80 transition-all duration-300"
            >
              Back to Cart
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-earth-green/20 border border-light-cream/20 text-light-cream font-bold rounded-full hover:bg-earth-green/30 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>

      {/* Success Notification */}
      <SuccessNotification isVisible={isVisible} message={message} />
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-dark-green flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-16 w-16 text-soft-brown mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-light-cream text-xl">Loading...</p>
        </div>
      </main>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}