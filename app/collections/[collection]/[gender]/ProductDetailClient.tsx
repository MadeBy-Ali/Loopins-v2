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
      name: 'Mbok Jamu Classic Vest - Men',
      price: 850000,
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
      sizes: ['S-M', 'L-XL'],
      features: [
        'Premium cotton blend fabric',
        'Traditional-inspired earth tone design',
        'Adjustable back strap',
        'Multiple interior pockets',
        'Handcrafted buttons',
        'Limited edition collection',
      ],
    },
    women: {
      id: 'mbok-jamu-women-vest-001',
      name: 'Mbok Jamu Classic Vest - Women',
      price: 850000,
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
    <main className="min-h-screen bg-light-cream pt-20 sm:pt-24">
      {/* Hero Section - sticky for parallax */}
      <section className="relative z-0">
        <div className="sticky top-0 bg-light-cream pb-8 sm:pb-12 md:pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Product Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
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
                <div className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-dark-brown text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg z-10">
                  Limited Edition
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

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
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
                <p className="text-2xl sm:text-3xl font-bold text-earth-green mb-3 sm:mb-4">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
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
                        <th className="text-center py-2 px-1 sm:px-2 text-dark-brown/70 font-medium">S-M</th>
                        <th className="text-center py-2 px-1 sm:px-2 text-dark-brown/70 font-medium">L-XL</th>
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

          </div>
        </div>
        </div>
      </section>

      {/* Story Section - overlaps Hero with shadow */}
      <section className="relative z-10 -mt-4 sm:-mt-8">
        <div className="bg-dark-green rounded-t-[2rem] sm:rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(112,51,21,0.4)] py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-cream mb-3 sm:mb-4">
                The Story Behind
              </h2>
              <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-soft-brown mx-auto"></div>
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
              {product.story.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-light-cream/80 text-sm sm:text-base md:text-lg leading-relaxed text-center"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - overlaps Story with shadow */}
      <section className="relative z-20 -mt-4 sm:-mt-8">
        <div className="bg-light-cream rounded-t-[2rem] sm:rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-brown mb-3 sm:mb-4">
                Features & Details
              </h2>
              <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-soft-brown mx-auto"></div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 sm:p-6 border border-dark-brown/10 text-center hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dark-brown/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-dark-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-dark-brown font-semibold text-sm sm:text-base">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Notification */}
      <SuccessNotification isVisible={isVisible} message={message} />
    </main>
  )
}
