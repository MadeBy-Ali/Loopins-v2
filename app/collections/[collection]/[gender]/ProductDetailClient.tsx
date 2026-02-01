'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import { useNotificationStore } from '@/lib/notification-store'
import SuccessNotification from '@/components/SuccessNotification'

// Mock product data - this will come from your API later
const products = {
  'mbok-jamu': {
    men: {
      id: 'mbok-jamu-men-vest-001',
      name: 'Mbok Jamu Batik Vest - Men',
      price: 599000,
      originalPrice: 699000,
      images: [
        '/images/mbok jamu_detail_men_front.PNG',
        '/images/mbok jamu_detail_men_left.PNG',
        '/images/mbok jamu_detail_men_right.PNG',
        '/images/mbok jamu_detail_men_back.PNG',
      ],
      description: 'A masterpiece of traditional Indonesian craftsmanship meets contemporary design. The Mbok Jamu collection pays homage to the iconic traditional Indonesian beverage sellers, known for their distinctive style and elegance.',
      story: [
        'Each vest tells a story of heritage and modernity. Inspired by the timeless elegance of Mbok Jamu, the traditional herb sellers who have been part of Indonesian culture for generations, this collection embodies their spirit of resilience, grace, and authenticity.',
        'Crafted from premium materials with meticulous attention to detail, every stitch reflects our commitment to quality. The earth-toned palette draws inspiration from natural herbs and spices, creating a connection between tradition and contemporary fashion.',
        'This vest is more than just clothing—it&apos;s a statement piece that bridges cultures and generations. Whether you&apos;re dressing for a business meeting or a casual gathering, the Mbok Jamu vest brings sophistication and cultural pride to your wardrobe.',
      ],
      sizes: ['1', '2'],
      features: [
        'Wash with hands / Dry clean',
        'Do not use bleach',
        'Do not machine wash',
        'Iron with low heat only',
        'Line Dry',
        'Do not expose to direct sunlight',
        'Dry clean recommended',
      ],
    },
    women: {
      id: 'mbok-jamu-women-vest-001',
      name: 'Mbok Jamu Batik Vest - Women',
      price: 649000,
      originalPrice: 749000,
      images: [
        '/images/mbok jamu_detail_women_front.PNG',
        '/images/mbok jamu_detail_women_left.PNG',
        '/images/mbok jamu_detail_women_right.PNG',
        '/images/mbok jamu_detail_women_back.PNG',
      ],
      description: 'A masterpiece of traditional Indonesian craftsmanship meets contemporary design. The Mbok Jamu collection celebrates the iconic traditional Indonesian beverage sellers and their timeless elegance.',
      story: [
        'Each vest tells a story of heritage and modernity. Inspired by the timeless elegance of Mbok Jamu, the traditional herb sellers who have been part of Indonesian culture for generations, this collection embodies their spirit of resilience, grace, and authenticity.',
        'Crafted from premium materials with meticulous attention to detail, every stitch reflects our commitment to quality. The earth-toned palette draws inspiration from natural herbs and spices, creating a connection between tradition and contemporary fashion.',
        'This vest is more than just clothing—it&apos;s a statement piece that bridges cultures and generations. Perfect for both professional settings and casual elegance, the Mbok Jamu vest brings sophistication and cultural pride to your wardrobe.',
      ],
      sizes: ['S-M', 'L-XL'],
      features: [
        'Premium cotton blend fabric',
        'Traditional-inspired earth tone design',
        'Tailored fit for women',
        'Multiple interior pockets',
        'Handcrafted buttons',
        'Limited edition collection',
      ],
    },
  },
}

interface ProductDetailClientProps {
  collection: string
  gender: string
}

export default function ProductDetailClient({ collection, gender }: ProductDetailClientProps) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  const { isVisible, message, showNotification } = useNotificationStore()
  
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get product data
  const product = products[collection as keyof typeof products]?.[gender as 'men' | 'women']

  // Helper function to get icon for each care instruction
  const getCareIcon = (feature: string) => {
    const lowerFeature = feature.toLowerCase()
    
    if (lowerFeature.includes('wash') || lowerFeature.includes('hand')) {
      return (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    }
    if (lowerFeature.includes('bleach')) {
      return (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      )
    }
    if (lowerFeature.includes('machine')) {
      return (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
    if (lowerFeature.includes('iron')) {
      return (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
    if (lowerFeature.includes('dry') && !lowerFeature.includes('clean')) {
      return (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      )
    }
    if (lowerFeature.includes('sunlight') || lowerFeature.includes('sun')) {
      return (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
    if (lowerFeature.includes('dry clean')) {
      return (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
    // Default icon
    return (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-light-cream pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-dark-brown mb-4">Collection Not Found</h1>
          <button
            onClick={() => router.push('/collections')}
            className="px-6 py-3 bg-dark-brown text-white rounded-full hover:bg-earth-green transition-colors"
          >
            Back to Collections
          </button>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    setIsAdding(true)
    
    addItem({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: '',
      size: selectedSize,
    })

    setTimeout(() => {
      setIsAdding(false)
      showNotification()
    }, 500)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Product Image Carousel - Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-6"
          >
              {/* Main Image Display */}
              <div className="relative aspect-square rounded-lg sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-white">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - View ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
                
                {/* Limited Edition Badge */}
                <div className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-bright-red text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg z-10">
                  Only 60 Pcs
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark-brown hover:bg-white transition-all duration-300 z-10 group shadow-md"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark-brown hover:bg-white transition-all duration-300 z-10 group shadow-md"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'bg-soft-brown w-6 sm:w-8'
                          : 'bg-light-cream/50 hover:bg-light-cream/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'border-dark-brown shadow-lg scale-110'
                        : 'border-dark-brown/20 hover:border-dark-brown/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <p className="text-earth-green font-semibold mb-1 sm:mb-2 uppercase tracking-wider text-xs sm:text-sm">
                  {collection.replace('-', ' ')} Collection
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-brown mb-3 sm:mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-soft-brown flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl sm:text-3xl font-bold text-earth-green">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    {product.originalPrice && (
                      <p className="text-lg sm:text-xl font-medium text-gray-400 line-through">
                        Rp {product.originalPrice.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-dark-brown/70 text-sm sm:text-base md:text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-dark-brown font-bold mb-2 sm:mb-3 text-base sm:text-lg">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 sm:px-6 py-2.5 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-dark-brown text-white shadow-lg scale-105'
                          : 'bg-white text-dark-brown border border-dark-brown/20 hover:border-dark-brown/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-dark-brown font-bold mb-2 sm:mb-3 text-base sm:text-lg">
                  Quantity
                </label>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-dark-brown/20 rounded-lg text-dark-brown font-bold text-lg sm:text-xl hover:border-dark-brown/50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl sm:text-2xl font-bold text-dark-brown w-12 sm:w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-dark-brown/20 rounded-lg text-dark-brown font-bold text-lg sm:text-xl hover:border-dark-brown/50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-3 sm:py-4 bg-dark-brown text-white font-bold text-base sm:text-lg rounded-full hover:bg-earth-green hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>

              {/* Size Guide Table */}
              <div className="mt-6 sm:mt-8">
                <h3 className="text-dark-brown font-bold text-base sm:text-lg mb-3 sm:mb-4">Size Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-dark-brown/20">
                        <th className="text-left py-2 pr-2 sm:pr-4 text-dark-brown/70 font-medium">Measurement (cm)</th>
                        <th className="text-center py-2 px-1 sm:px-2 text-dark-brown/70 font-medium">1</th>
                        <th className="text-center py-2 px-1 sm:px-2 text-dark-brown/70 font-medium">2</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark-green">
                      {gender === 'women' ? (
                        <>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Length</td>
                            <td className="text-center py-2 px-1 sm:px-2">55</td>
                            <td className="text-center py-2 px-1 sm:px-2">58</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Bust</td>
                            <td className="text-center py-2 px-1 sm:px-2">94</td>
                            <td className="text-center py-2 px-1 sm:px-2">104</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Waist</td>
                            <td className="text-center py-2 px-1 sm:px-2">75</td>
                            <td className="text-center py-2 px-1 sm:px-2">85</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Hip</td>
                            <td className="text-center py-2 px-1 sm:px-2">98</td>
                            <td className="text-center py-2 px-1 sm:px-2">106</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Shoulder Width</td>
                            <td className="text-center py-2 px-1 sm:px-2">41</td>
                            <td className="text-center py-2 px-1 sm:px-2">45</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Length</td>
                            <td className="text-center py-2 px-1 sm:px-2">65</td>
                            <td className="text-center py-2 px-1 sm:px-2">70</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Bust</td>
                            <td className="text-center py-2 px-1 sm:px-2">106</td>
                            <td className="text-center py-2 px-1 sm:px-2">114</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Waist</td>
                            <td className="text-center py-2 px-1 sm:px-2">100</td>
                            <td className="text-center py-2 px-1 sm:px-2">109</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Hip</td>
                            <td className="text-center py-2 px-1 sm:px-2">106</td>
                            <td className="text-center py-2 px-1 sm:px-2">116</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-2 sm:pr-4">Shoulder Width</td>
                            <td className="text-center py-2 px-1 sm:px-2">45</td>
                            <td className="text-center py-2 px-1 sm:px-2">50</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="text-dark-brown/60 text-xs mt-2 sm:mt-3">
                  <span className="font-medium">Care:</span> Wash separately by hand / Dry clean, Iron medium
                </p>
              </div>
            </motion.div>

            {/* Story Section - Mobile */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-dark-brown/10">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-dark-brown mb-3">
                  The Story Behind
                </h2>
                <div className="w-16 h-0.5 bg-soft-brown"></div>
              </div>
              <div className="space-y-4">
                {product.story.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-dark-brown text-sm sm:text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features Section - Mobile */}
            <div className="mt-8 mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-dark-brown mb-3">
                  Fabric Care Guide
                </h2>
                <div className="w-16 h-0.5 bg-soft-brown mx-auto"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 sm:p-4 border border-dark-brown/10 text-center shadow-sm"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-dark-brown/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      {getCareIcon(feature)}
                    </div>
                    <p className="text-dark-brown font-semibold text-xs sm:text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>

      {/* Desktop Layout - Split Screen */}
      <div className="hidden lg:flex lg:fixed lg:inset-0 lg:pt-20 lg:z-40">
        {/* Left Side - Images Only */}
        <div className="w-1/2 h-full overflow-y-auto bg-white p-8 scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl mx-auto space-y-6 pb-32"
          >
            {/* Limited Edition Badge */}
            <div className="flex justify-end mb-4">
              <div className="bg-bright-red text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                Only 60 Pcs
              </div>
            </div>
            
            {/* Vertically Stacked Images */}
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-white"
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side - All Details (Scrollable) */}
        <div className="w-1/2 h-full overflow-y-auto bg-white scrollbar-hide">
          <div className="max-w-3xl mx-auto p-12 pb-32">
            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <p className="text-earth-green font-semibold mb-2 uppercase tracking-wider text-sm">
                  {collection.replace('-', ' ')} Collection
                </p>
                <h1 className="text-5xl font-bold text-dark-brown mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-soft-brown flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-bold text-earth-green">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    {product.originalPrice && (
                      <p className="text-xl font-medium text-gray-400 line-through">
                        Rp {product.originalPrice.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-dark-brown/70 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-dark-brown font-bold mb-3 text-lg">
                  Select Size
                </label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-dark-brown text-white shadow-lg scale-105'
                          : 'bg-white text-dark-brown border border-dark-brown/20 hover:border-dark-brown/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-dark-brown font-bold mb-3 text-lg">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-white border border-dark-brown/20 rounded-lg text-dark-brown font-bold text-xl hover:border-dark-brown/50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-dark-brown w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-white border border-dark-brown/20 rounded-lg text-dark-brown font-bold text-xl hover:border-dark-brown/50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 bg-dark-brown text-white font-bold text-lg rounded-full hover:bg-earth-green hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>

              {/* Size Guide Table */}
              <div className="mt-8">
                <h3 className="text-dark-brown font-bold text-lg mb-4">Size Guide</h3>
                <div className="overflow-x-auto bg-white rounded-lg p-6 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-dark-brown/20">
                        <th className="text-left py-2 pr-4 text-dark-brown/70 font-medium">Measurement (cm)</th>
                        <th className="text-center py-2 px-2 text-dark-brown/70 font-medium">1</th>
                        <th className="text-center py-2 px-2 text-dark-brown/70 font-medium">2</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark-green">
                      {gender === 'women' ? (
                        <>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Length</td>
                            <td className="text-center py-2 px-2">55</td>
                            <td className="text-center py-2 px-2">58</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Bust</td>
                            <td className="text-center py-2 px-2">94</td>
                            <td className="text-center py-2 px-2">104</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Waist</td>
                            <td className="text-center py-2 px-2">75</td>
                            <td className="text-center py-2 px-2">85</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Hip</td>
                            <td className="text-center py-2 px-2">98</td>
                            <td className="text-center py-2 px-2">106</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Shoulder Width</td>
                            <td className="text-center py-2 px-2">41</td>
                            <td className="text-center py-2 px-2">45</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Length</td>
                            <td className="text-center py-2 px-2">65</td>
                            <td className="text-center py-2 px-2">70</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Bust</td>
                            <td className="text-center py-2 px-2">106</td>
                            <td className="text-center py-2 px-2">114</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Waist</td>
                            <td className="text-center py-2 px-2">100</td>
                            <td className="text-center py-2 px-2">109</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Hip</td>
                            <td className="text-center py-2 px-2">106</td>
                            <td className="text-center py-2 px-2">116</td>
                          </tr>
                          <tr className="border-b border-dark-green/10">
                            <td className="py-2 pr-4">Shoulder Width</td>
                            <td className="text-center py-2 px-2">45</td>
                            <td className="text-center py-2 px-2">50</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  <p className="text-dark-brown/60 text-xs mt-3">
                    <span className="font-medium">Care:</span> Wash separately by hand / Dry clean, Iron medium
                  </p>
                </div>
              </div>

              {/* Story Section */}
              <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-dark-brown/10">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-dark-brown mb-3">
                    The Story Behind
                  </h2>
                  <div className="w-16 h-1 bg-soft-brown"></div>
                </div>
                <div className="space-y-4">
                  {product.story.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-dark-brown text-base leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div className="mt-12 mb-12">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-dark-brown mb-3">
                    Fabric Care Guide
                  </h2>
                  <div className="w-16 h-1 bg-soft-brown"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-5 border border-dark-brown/10 hover:shadow-lg transition-all"
                    >
                      <div className="w-10 h-10 bg-dark-brown/10 rounded-full flex items-center justify-center mb-3">
                        {getCareIcon(feature)}
                      </div>
                      <p className="text-dark-brown font-semibold text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <SuccessNotification isVisible={isVisible} message={message} />
    </main>
  )
}
