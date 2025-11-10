'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'

// Mock product data - this will come from your API later
const products = {
  'mbok-jamu': {
    men: {
      id: 'mbok-jamu-men-vest-001',
      name: 'Mbok Jamu Classic Vest - Men',
      price: 850000,
      images: [
        '/images/men_mbokjamu_front.JPG',
        '/images/men_mbokjamu_back.JPG',
      ],
      description: 'A masterpiece of traditional Indonesian craftsmanship meets contemporary design. The Mbok Jamu collection pays homage to the iconic traditional Indonesian beverage sellers, known for their distinctive style and elegance.',
      story: [
        'Each vest tells a story of heritage and modernity. Inspired by the timeless elegance of Mbok Jamu, the traditional herb sellers who have been part of Indonesian culture for generations, this collection embodies their spirit of resilience, grace, and authenticity.',
        'Crafted from premium materials with meticulous attention to detail, every stitch reflects our commitment to quality. The earth-toned palette draws inspiration from natural herbs and spices, creating a connection between tradition and contemporary fashion.',
        'This vest is more than just clothing—it&apos;s a statement piece that bridges cultures and generations. Whether you&apos;re dressing for a business meeting or a casual gathering, the Mbok Jamu vest brings sophistication and cultural pride to your wardrobe.',
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
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
        '/images/women_mbokjamu_front.JPG',
        '/images/women_mbokjamu_back.JPG',
      ],
      description: 'A masterpiece of traditional Indonesian craftsmanship meets contemporary design. The Mbok Jamu collection celebrates the iconic traditional Indonesian beverage sellers and their timeless elegance.',
      story: [
        'Each vest tells a story of heritage and modernity. Inspired by the timeless elegance of Mbok Jamu, the traditional herb sellers who have been part of Indonesian culture for generations, this collection embodies their spirit of resilience, grace, and authenticity.',
        'Crafted from premium materials with meticulous attention to detail, every stitch reflects our commitment to quality. The earth-toned palette draws inspiration from natural herbs and spices, creating a connection between tradition and contemporary fashion.',
        'This vest is more than just clothing—it&apos;s a statement piece that bridges cultures and generations. Perfect for both professional settings and casual elegance, the Mbok Jamu vest brings sophistication and cultural pride to your wardrobe.',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
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
  
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get product data
  const product = products[collection as keyof typeof products]?.[gender as 'men' | 'women']

  if (!product) {
    return (
      <main className="min-h-screen bg-dark-green pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-light-cream mb-4">Collection Not Found</h1>
          <button
            onClick={() => router.push('/collections')}
            className="px-6 py-3 bg-soft-brown text-light-cream rounded-full hover:bg-soft-brown/80 transition-colors"
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
      // Show success feedback
      alert('Added to cart!')
    }, 500)
  }

  return (
    <main className="min-h-screen bg-dark-green pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Product Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image Display */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-dark-green">
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
                <div className="absolute top-6 right-6 bg-soft-brown text-light-cream px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                  Limited Edition
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dark-green/80 backdrop-blur-sm rounded-full flex items-center justify-center text-light-cream hover:bg-dark-green transition-all duration-300 z-10 group"
                    >
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dark-green/80 backdrop-blur-sm rounded-full flex items-center justify-center text-light-cream hover:bg-dark-green transition-all duration-300 z-10 group"
                    >
                      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'bg-soft-brown w-8'
                          : 'bg-light-cream/50 hover:bg-light-cream/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'border-soft-brown shadow-lg scale-110'
                        : 'border-light-cream/20 hover:border-light-cream/50'
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
              className="space-y-6"
            >
              <div>
                <p className="text-soft-brown font-semibold mb-2 uppercase tracking-wider">
                  {collection.replace('-', ' ')} Collection
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-light-cream mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-soft-brown mb-4">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <p className="text-light-cream/80 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-light-cream font-bold mb-3 text-lg">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-16 h-16 rounded-lg font-bold text-lg transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-soft-brown text-light-cream shadow-lg scale-110'
                          : 'bg-earth-green/20 text-light-cream/70 border border-light-cream/20 hover:bg-earth-green/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-light-cream font-bold mb-3 text-lg">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-earth-green/20 border border-light-cream/20 rounded-lg text-light-cream font-bold text-xl hover:bg-earth-green/30 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-light-cream w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-earth-green/20 border border-light-cream/20 rounded-lg text-light-cream font-bold text-xl hover:bg-earth-green/30 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 bg-gradient-to-r from-soft-brown to-earth-green text-light-cream font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-earth-green/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light-cream mb-4">
              The Story Behind
            </h2>
            <div className="w-24 h-1 bg-soft-brown mx-auto"></div>
          </motion.div>

          <div className="space-y-6">
            {product.story.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-light-cream/80 text-lg leading-relaxed text-center"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light-cream mb-4">
              Features & Details
            </h2>
            <div className="w-24 h-1 bg-soft-brown mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-earth-green/20 backdrop-blur-sm rounded-lg p-6 border border-light-cream/10 text-center hover:bg-earth-green/30 transition-colors"
              >
                <div className="w-12 h-12 bg-soft-brown/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-light-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-light-cream font-semibold">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
