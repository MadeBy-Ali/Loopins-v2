import Hero from '@/components/Hero'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-light-cream">
      <Hero />
      
      {/* First Poetic Quote Section */}
      <section className="w-full bg-white py-24">
        <div className="text-center px-8 max-w-6xl mx-auto">
          <p className="text-black leading-relaxed mb-12" style={{ fontSize: '36px' }}>
            Every Loopins piece begins with heritage and craftsmanship. Each one is alive.
            <br />
            These garments carry texture, energy, and memory.
            <br />
            Like you, each has their own story.
          </p>
          <div className="flex justify-center">
            <img 
              src="/images/poetic_divider.svg" 
              alt="Divider" 
              className="h-12 w-auto"
            />
          </div>
        </div>
      </section>

      {/* Collection Showcase Section - 4 Square Grid */}
      <section className="w-full">
        {/* Women's Collection - Top Row */}
        <div className="flex w-full">
          {/* Left Box - Women's Image */}
          <div className="w-1/2 aspect-square relative overflow-hidden group">
            <img
              src="/images/featured_ptrt_5.png"
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Right Box - Women's Text & Button */}
          <div className="w-1/2 aspect-square bg-earth-green flex items-center justify-center p-16">
            <div className="text-center max-w-lg">
              <h2 className="text-5xl font-semibold text-light-cream mb-8">
                Women's Collection
              </h2>
              <p className="text-light-cream text-lg mb-12 leading-relaxed">
                Explore our elegant collection for women. Each piece is thoughtfully designed to blend sophistication with versatility for the contemporary woman.
              </p>
              <Link
                href="/collections/mbok-jamu/women"
                className="inline-block px-12 py-4 bg-light-cream text-dark-green font-medium text-sm uppercase tracking-widest hover:bg-soft-brown hover:text-white transition-all duration-500"
              >
                Browse Now
              </Link>
            </div>
          </div>
        </div>

        {/* Men's Collection - Bottom Row */}
        <div className="flex w-full">
          {/* Left Box - Men's Text & Button */}
          <div className="w-1/2 aspect-square bg-light-cream flex items-center justify-center p-16">
            <div className="text-center max-w-lg">
              <h2 className="text-5xl font-semibold text-dark-brown mb-8">
                Men's Collection
              </h2>
              <p className="text-dark-brown text-lg mb-12 leading-relaxed">
                Discover our curated collection for men. Crafted with precision and designed for the modern gentleman who values both style and comfort.
              </p>
              <Link
                href="/collections/mbok-jamu/men"
                className="inline-block px-12 py-4 bg-soft-brown text-white font-medium text-sm uppercase tracking-widest hover:bg-earth-green transition-all duration-500"
              >
                Browse Now
              </Link>
            </div>
          </div>

          {/* Right Box - Men's Image */}
          <div className="w-1/2 aspect-square relative overflow-hidden group">
            <img
              src="/images/featured_ptrt_3.png"
              alt="Men's Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Second Poetic Quote Section */}
      <section className="w-full bg-white py-24">
        <div className="text-center px-8 max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <img 
              src="/images/poetic_divider.svg" 
              alt="Divider" 
              className="h-12 w-auto"
            />
          </div>
          <p className="text-black leading-relaxed mb-16" style={{ fontSize: '36px' }}>
            “Loopins Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance.“
          </p>
          <Link
            href="/collections"
            className="inline-block px-12 py-4 bg-earth-green text-light-cream font-medium text-sm uppercase tracking-widest hover:bg-dark-green transition-all duration-500"
          >
            Discover Our Collection
          </Link>
        </div>
      </section>
    </main>
  )
}