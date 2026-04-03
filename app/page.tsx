import Hero from '@/components/Hero'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-light-cream">
      <Hero />
      
      {/* First Poetic Quote Section */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-24">
        <div className="text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <p className="text-black leading-relaxed mb-8 sm:mb-12 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            Every Loopins piece begins with heritage and craftsmanship. Each one is alive.
            <br className="hidden sm:block" />
            These garments carry texture, energy, and memory.
            <br className="hidden sm:block" />
            Like you, each has their own story.
          </p>
          <div className="flex justify-center">
            <img 
              src="/images/poetic_divider.svg" 
              alt="Divider" 
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </div>
        </div>
      </section>

      {/* Collection Showcase Section - Responsive Grid */}
      <section className="w-full">
        {/* Women's Collection */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Women's Image */}
          <div className="w-full md:w-1/2 aspect-square relative overflow-hidden group">
            <img
              src="https://media.loopinsstudio.com/loopinsfe/homepage_women_vest_cover.jpg"
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Women's Text & Button */}
          <div className="w-full md:w-1/2 aspect-square bg-earth-green flex items-center justify-center p-6 sm:p-10 md:p-16">
            <div className="text-center max-w-lg">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-light-cream mb-4 sm:mb-6 md:mb-8">
                Women&#39;s Collection
              </h2>
              <p className="text-light-cream text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12 leading-relaxed">
                Explore our elegant collection for women. Each piece is thoughtfully designed to blend sophistication with versatility for the contemporary woman.
              </p>
              <Link
                href="/collections/mbok-jamu/women"
                className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 bg-light-cream text-dark-green font-medium text-xs sm:text-sm uppercase tracking-widest hover:bg-soft-brown hover:text-white transition-all duration-500"
              >
                Browse Now
              </Link>
            </div>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="flex flex-col md:flex-row-reverse w-full">
          {/* Men's Image */}
          <div className="w-full md:w-1/2 aspect-square relative overflow-hidden group">
            <img
              src="https://media.loopinsstudio.com/loopinsfe/homepage_men_vest_cover.jpg"
              alt="Men's Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Men's Text & Button */}
          <div className="w-full md:w-1/2 aspect-square bg-light-cream flex items-center justify-center p-6 sm:p-10 md:p-16">
            <div className="text-center max-w-lg">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-dark-brown mb-4 sm:mb-6 md:mb-8">
                Men&#39;s Collection
              </h2>
              <p className="text-dark-brown text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12 leading-relaxed">
                Discover our curated collection for men. Crafted with precision and designed for the modern gentleman who values both style and comfort.
              </p>
              <Link
                href="/collections/mbok-jamu/men"
                className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 bg-soft-brown text-white font-medium text-xs sm:text-sm uppercase tracking-widest hover:bg-earth-green transition-all duration-500"
              >
                Browse Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Second Poetic Quote Section */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-24">
        <div className="text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <div className="flex justify-center mb-8 sm:mb-12">
            <img 
              src="/images/poetic_divider.svg"
              alt="Divider" 
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </div>
          <p className="text-black leading-relaxed mb-10 sm:mb-12 md:mb-16 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            &quot;Loopins Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance.&quot;
          </p>
          <Link
            href="/collections"
            className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 
                      bg-earth-green text-light-cream font-medium text-xs sm:text-sm 
                      uppercase tracking-widest 
                      hover:bg-earth-green/80 
                      transition-all duration-500"
          >
            Discover Our Collection
          </Link>
        </div>
      </section>
    </main>
  )
}
