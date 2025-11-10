'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-green pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-light-cream mb-4">
            About Loopins
          </h1>
          <p className="text-xl text-light-cream/80">
            Where Style Meets Sophistication
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Story Section */}
          <div className="bg-earth-green/20 backdrop-blur-sm rounded-lg p-8 border border-light-cream/10">
            <h2 className="text-3xl font-bold text-soft-brown mb-4">Our Story</h2>
            <p className="text-light-cream/80 leading-relaxed mb-4">
              Loopins was born from a passion for timeless fashion and exceptional craftsmanship. 
              We believe that a vest is more than just a garment—it&apos;s a statement of confidence, 
              elegance, and individuality.
            </p>
            <p className="text-light-cream/80 leading-relaxed">
              Each piece in our collection is carefully curated to blend classic sophistication 
              with modern design, ensuring you look and feel your absolute best.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-soft-brown/20 backdrop-blur-sm rounded-lg p-8 border border-light-cream/10">
            <h2 className="text-3xl font-bold text-soft-brown mb-4">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-bold text-light-cream mb-2">Quality</h3>
                <p className="text-light-cream/70">
                  Premium materials and expert craftsmanship in every stitch
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-light-cream mb-2">Style</h3>
                <p className="text-light-cream/70">
                  Timeless designs that transcend fleeting trends
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-light-cream mb-2">Sustainability</h3>
                <p className="text-light-cream/70">
                  Committed to ethical and eco-friendly practices
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-earth-green/20 backdrop-blur-sm rounded-lg p-8 border border-light-cream/10">
            <h2 className="text-3xl font-bold text-soft-brown mb-4">Our Mission</h2>
            <p className="text-light-cream/80 leading-relaxed">
              To provide discerning individuals with premium vests that embody elegance, 
              comfort, and versatility. We&apos;re dedicated to helping you express your unique 
              style with confidence, whether you&apos;re dressing for business, leisure, or special occasions.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}