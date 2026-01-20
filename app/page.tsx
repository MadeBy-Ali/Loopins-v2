import Hero from '@/components/Hero'
import CollectionSection from '@/components/CollectionSection'

export default function Home() {
  return (
    <main className="bg-light-cream">
      <Hero />
      
      <CollectionSection
        title="Men's Collection"
        description="Discover our curated Mbok Jamu collection for men. Crafted with precision and designed for the modern gentleman who values both style and comfort."
        slug="mbok-jamu/men"
        imagePosition="left"
      />

      <CollectionSection
        title="Women's Collection"
        description="Explore our elegant Mbok Jamu collection for women. Each piece is thoughtfully designed to blend sophistication with versatility for the contemporary woman."
        slug="mbok-jamu/women"
        imagePosition="right"
      />

      {/* Poetic Quote Section */}
      <section className="w-full bg-white flex items-center justify-center" style={{ height: '350px' }}>
        <div className="text-center px-6 max-w-5xl">
          <p className="text-black leading-relaxed" style={{ fontSize: '33px' }}>
            Every Loopins piece begins with heritage and craftsmanship. Each one is alive.
            <br />
            These garments carry texture, energy, and memory.
            <br />
            Like you, each has their own story.
          </p>
        </div>
      </section>

      {/* Discover Section */}
      <section 
        className="relative w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ height: '350px' }}
      >
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/images/discover_section_background.PNG)',
            filter: 'blur(2px)',
            transform: 'scale(1.1)'
          }}
        />
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <p className="text-white text-4xl md:text-5xl font-serif font-light mb-8">
            like you, it carries a story of becoming.
          </p>
          <a
            href="/collections"
            className="inline-block px-10 py-3 border-2 border-white bg-transparent text-white font-medium text-sm uppercase tracking-widest hover:bg-white hover:text-dark-brown transition-all duration-500"
          >
            Discover Your Fit
          </a>
        </div>
      </section>

      {/* Featured Picks Section */}
      <section className="w-full bg-light-cream py-20">
        <div className="px-6">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-serif font-light text-center text-dark-brown mb-12">
            Featured Picks
          </h2>

          {/* Images Grid */}
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="relative overflow-hidden group cursor-pointer flex-shrink-0"
                style={{ width: '280px', height: '520px' }}
              >
                <img
                  src={`/images/featured_ptrt_${num}.png`}
                  alt={`Featured ${num}`}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}