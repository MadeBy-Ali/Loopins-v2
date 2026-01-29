'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import { api, type CheckoutData } from '@/lib/api'

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
      `Hello *${formData.name}*` +
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
    
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
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

      // Call API to create order and get payment URL
      const response = await api.createOrder(checkoutData)

      if (response.success) {
        // Generate WhatsApp link
        const whatsappLink = generateWhatsAppLink(response.orderId)
        
        // Open WhatsApp in a new tab
        window.open(whatsappLink, '_blank')
        
        // Clear cart after successful order
        clearCart()
        
        // Redirect to payment page or success page
        if (response.paymentUrl) {
          // In production, this will be Xendit/Midtrans payment URL
          window.location.href = response.paymentUrl
        } else {
          // Fallback to success page
          router.push(`/payment/success?orderId=${response.orderId}`)
        }
      } else {
        alert(response.message || 'Failed to create order. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
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

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleCheckout} className="bg-earth-green/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-light-cream/10">
              <h2 className="text-xl sm:text-2xl font-bold text-light-cream mb-4 sm:mb-6">Shipping Information</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-light-cream font-semibold mb-2">
                    Full Name <span className="text-soft-brown">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-green/50 border rounded-lg text-light-cream focus:outline-none focus:border-soft-brown transition-colors ${
                      errors.name ? 'border-red-500' : 'border-light-cream/20'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-light-cream font-semibold mb-2">
                      Email <span className="text-soft-brown">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-green/50 border rounded-lg text-light-cream focus:outline-none focus:border-soft-brown transition-colors ${
                        errors.email ? 'border-red-500' : 'border-light-cream/20'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-light-cream font-semibold mb-2">
                      Phone <span className="text-soft-brown">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-green/50 border rounded-lg text-light-cream focus:outline-none focus:border-soft-brown transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-light-cream/20'
                      }`}
                      placeholder="+62 812 3456 7890"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-light-cream font-semibold mb-2">
                    Address <span className="text-soft-brown">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 bg-dark-green/50 border rounded-lg text-light-cream focus:outline-none focus:border-soft-brown transition-colors resize-none ${
                      errors.address ? 'border-red-500' : 'border-light-cream/20'
                    }`}
                    placeholder="Street address, apartment, suite, etc."
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-light-cream font-semibold mb-2">
                      City <span className="text-soft-brown">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-green/50 border rounded-lg text-light-cream focus:outline-none focus:border-soft-brown transition-colors ${
                        errors.city ? 'border-red-500' : 'border-light-cream/20'
                      }`}
                      placeholder="Jakarta"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-light-cream font-semibold mb-2">
                      Postal Code <span className="text-soft-brown">*</span>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-green/50 border rounded-lg text-light-cream focus:outline-none focus:border-soft-brown transition-colors ${
                        errors.postalCode ? 'border-red-500' : 'border-light-cream/20'
                      }`}
                      placeholder="12345"
                    />
                    {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-earth-green/20 backdrop-blur-sm rounded-lg p-6 border border-light-cream/10 sticky top-24">
              <h2 className="text-2xl font-bold text-light-cream mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-light-cream/10">
                    <div className="w-16 h-16 bg-soft-brown/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-light-cream/50 text-xl font-bold">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-light-cream font-semibold text-sm mb-1">{item.name}</h3>
                      <p className="text-light-cream/60 text-xs">
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
                <div className="flex justify-between text-light-cream/80">
                  <span>Subtotal</span>
                  <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-light-cream/80">
                  <span>Shipping</span>
                  <span className="text-soft-brown">FREE</span>
                </div>
                <div className="h-px bg-light-cream/20"></div>
                <div className="flex justify-between text-light-cream text-xl font-bold">
                  <span>Total</span>
                  <span className="text-soft-brown">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-soft-brown to-earth-green text-light-cream font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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

              <p className="text-light-cream/50 text-xs text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}