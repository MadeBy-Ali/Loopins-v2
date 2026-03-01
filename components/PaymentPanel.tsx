'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PaymentPanelProps {
  snapToken: string | null
  orderId: string | null
  grossAmount: number
  onSuccess: (result: any) => void
  onPending: (result: any) => void
  onError: (result: any) => void
  onClose: () => void
}

export default function PaymentPanel({
  snapToken,
  orderId,
  grossAmount,
  onSuccess,
  onPending,
  onError,
  onClose,
}: PaymentPanelProps) {
  const embedRef = useRef<HTMLDivElement>(null)
  const isOpen = !!snapToken

  useEffect(() => {
    if (!snapToken || !embedRef.current) return

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.snap) {
        window.snap.embed(snapToken, {
          embedId: 'snap-embed-container',
          onSuccess,
          onPending,
          onError,
          onClose,
        })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [snapToken])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 px-0 md:px-4"
          >
            <div className="bg-[#F5F3F0] rounded-t-3xl md:rounded-3xl w-full md:max-w-4xl md:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#703315]/10 bg-[#F5F3F0]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#703315] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#F5F3F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#703315] text-sm leading-none">Secure Payment</p>
                    <p className="text-[#703315]/50 text-xs mt-0.5">Order {orderId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-[#703315]/50">Total</p>
                    <p className="font-bold text-[#703315]">
                      Rp {grossAmount?.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-[#703315]/10 hover:bg-[#703315]/20 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#703315]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Snap embed area */}
              <div className="flex-1 overflow-auto bg-white min-h-[500px] md:min-h-[560px]">
                <div
                  id="snap-embed-container"
                  ref={embedRef}
                  className="w-full h-full min-h-[500px]"
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-[#F5F3F0] border-t border-[#703315]/10 flex items-center justify-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#703315]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-[#703315]/40 text-xs">
                  Secured by Midtrans · SSL encrypted
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
