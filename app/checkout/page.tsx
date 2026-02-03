'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import { api, type CheckoutData } from '@/lib/api'

// Declare Midtrans Snap types
declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess?: (result: any) => void
        onPending?: (result: any) => void
        onError?: (result: any) => void
        onClose?: () => void
      }) => void
    }
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateWhatsAppLink = (orderId: string): string => {
    const brandName = "Loopins Studio"
    const phoneNumber = "6281393220729"
    
    // Get product details
    const productDetails = items.map((item, index) => 
      `${index + 1}. ${item.name} (Size: ${item.size || 'N/A'}, Qty: ${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
    ).join('%0A')
    
    // Create the message template
    const message = `*Checkout Details:*%0A%0A` +
      `Hello *${formData.name}*,%0A` +
      `Thank you for placing an order with *${brandName}*.%0A%0A` +
      `*Order Information:*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `1. Name: ${formData.name}%0A` +
      `2. Email: ${formData.email}%0A` +
      `3. Address: ${formData.address}, ${formData.city}, ${formData.postalCode}%0A` +
      `4. Phone Number: ${formData.phone}%0A` +
      `5. Order ID: ${orderId}%0A%0A` +
      `*Products:*%0A` +
      `${productDetails}%0A%0A` +
      `*Total: Rp ${getTotalPrice().toLocaleString('id-ID')}*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A%0A` +
      `Please complete your payment to proceed with your order.%0A` +
      `Once payment is confirmed, we will start processing your order.%0A%0A` +
      `If you have any questions, feel free to contact us.%0A%0A` +
      `Best regards,%0A` +
      `*${brandName}*`
    
    console.log('📱 Generated WhatsApp Link:', `https://wa.me/${phoneNumber}?text=${message}`)
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('🛒 Starting checkout process...')
    
    if (!validateForm()) {
      console.log('❌ Form validation failed')
      return
    }

    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    setIsProcessing(true)

    try {
      // Prepare checkout data
      const checkoutData: CheckoutData = {
        items,
        customerInfo: formData,
        totalAmount: getTotalPrice()
      }

      console.log('📦 Checkout data:', checkoutData)

      // Call API to create order and get payment URL
      const response = await api.createOrder(checkoutData)
      console.log('📬 API Response:', response)

      if (response.success) {
        console.log('✅ Order created successfully:', response.orderId)
        
        // ========== MIDTRANS PAYMENT INTEGRATION ==========
        try {
          console.log('💳 Fetching Midtrans payment token...')
          
          // Call Spring backend to get Midtrans Snap token
          const midtransResponse = await api.getMidtransToken(response.orderId)
          console.log('🎫 Midtrans Token Response:', midtransResponse)
          
          if (midtransResponse.success && midtransResponse.data.token) {
            console.log('✅ Midtrans token received:', midtransResponse.data.token)
            
            // Check if Snap is loaded
            if (typeof window.snap === 'undefined') {
              throw new Error('Midtrans Snap is not loaded. Please refresh the page.')
            }
            
            // Show Midtrans payment popup
            console.log('🎬 Opening Midtrans payment popup...')
            window.snap.pay(midtransResponse.data.token, {
              onSuccess: (result) => {
                console.log('✅ Payment Success:', result)
                clearCart()
                router.push(`/payment/success?orderId=${response.orderId}`)
              },
              onPending: (result) => {
                console.log('⏳ Payment Pending:', result)
                alert('Payment is pending. Please complete your payment.')
              },
              onError: (result) => {
                console.error('❌ Payment Error:', result)
                alert('Payment failed. Please try again.')
                setIsProcessing(false)
              },
              onClose: () => {
                console.log('🔒 Payment popup closed')
                setIsProcessing(false)
              }
            })
          } else {
            throw new Error('Failed to get payment token from backend')
          }
        } catch (midtransError) {
          console.error('❌ Midtrans integration error:', midtransError)
          console.log('📱 Falling back to WhatsApp...')
          
          // FALLBACK: Use WhatsApp if Midtrans fails
          const whatsappLink = generateWhatsAppLink(response.orderId)
          console.log('💬 WhatsApp Link Generated:', whatsappLink)
          console.log('💬 Link Length:', whatsappLink.length)
          
          const whatsappWindow = window.open(whatsappLink, '_blank')
          
          if (!whatsappWindow) {
            console.error('❌ Pop-up blocked! Please allow pop-ups for this site.')
            alert('Please allow pop-ups to open WhatsApp. Then click "Place Order" again.')
            setIsProcessing(false)
            return
          }
          
          console.log('✅ WhatsApp window opened successfully')
          clearCart()
          
          setTimeout(() => {
            console.log('🔄 Redirecting to success page...')
            router.push(`/payment/success?orderId=${response.orderId}`)
          }, 1000)
        }
        // ========== END MIDTRANS INTEGRATION ==========
      } else {
        console.error('❌ Order creation failed:', response.message)
        alert(response.message || 'Failed to create order. Please try again.')
      }
    } catch (error) {
      console.error('💥 Checkout error:', error)
      alert('An error occurred during checkout. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-dark-green pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-earth-green/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-light-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-light-cream mb-3 sm:mb-4">Your cart is empty</h1>
            <p className="text-light-cream/70 mb-6 sm:mb-8">Add some items before checking out</p>
            <button
              onClick={() => router.push('/collections')}
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-soft-brown text-light-cream font-bold rounded-full hover:bg-soft-brown/80 transition-all duration-300"
            >
              Browse Collections
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-green pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-cream mb-2">Checkout</h1>
          <p className="text-light-cream/70 text-sm sm:text-base">Complete your order</p>
        </motion.div>

        <form onSubmit={handleCheckout}>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Delivery Information</h2>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2 text-sm">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-earth-green/30 focus:border-earth-green transition-all ${
                      errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-earth-green/30 focus:border-earth-green transition-all ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2 text-sm">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-earth-green/30 focus:border-earth-green transition-all ${
                        errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="+62 812 3456 7890"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2 text-sm">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-earth-green/30 focus:border-earth-green transition-all resize-none ${
                      errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Street address, apartment, suite, etc."
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1.5">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2 text-sm">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-earth-green/30 focus:border-earth-green transition-all ${
                        errors.city ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Jakarta"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1.5">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2 text-sm">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-earth-green/30 focus:border-earth-green transition-all ${
                        errors.postalCode ? 'border-red-400 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="12345"
                    />
                    {errors.postalCode && <p className="text-red-500 text-xs mt-1.5">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-soft-brown text-xl font-bold">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-gray-800 font-semibold text-sm mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-xs">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="text-soft-brown font-bold text-sm mt-1">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-soft-brown font-medium">FREE</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between text-gray-800 text-xl font-bold">
                  <span>Total</span>
                  <span className="text-soft-brown">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-soft-brown text-white font-bold text-lg rounded-xl hover:bg-soft-brown/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>

              <p className="text-gray-400 text-xs text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </motion.div>
          </div>
        </form>
      </div>
    </main>
  )
}