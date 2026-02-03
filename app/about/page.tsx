export default function AboutPage() {
  return (
    <main className="min-h-screen bg-light-cream py-32">
      <div className="container mx-auto px-8 max-w-7xl">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold text-dark-brown text-center mb-12">
          Why Loopins exist?
        </h1>

        {/* Subheading */}
        <h2 className="text-2xl md:text-3xl text-black text-center mb-24 max-w-5xl mx-auto leading-relaxed">
          "Loopins Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance."
        </h2>

        {/* Vision and Mission Section */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          {/* Vision - Left Side */}
          <div>
            <h3 className="text-3xl font-light text-dark-brown mb-8">Vision:</h3>
            <p className="text-black text-lg leading-relaxed text-justify indent-8">
              To become a global fashion brand that delivers meaningful luxury through the exploration of Nusantara’s cultural heritage and social issues.
            </p>

            <p className="mt-4 text-black text-lg leading-relaxed text-justify">
              We believe fashion is not merely about style, but a medium for storytelling. Loopins Studio aims to bridge aesthetic beauty and social awareness, bringing the stories of Nusantara to the global stage through timeless, valuable, and purpose-driven creations.
            </p>
          </div>

          {/* Mission - Right Side */}
          <div>
            <h3 className="text-3xl font-light text-dark-brown mb-8">Mission:</h3>
            <ul className="text-black text-lg leading-relaxed text-justify list-disc pl-6 space-y-6">
              <li>
                <span className="font-light block mb-1">Product & Innovation</span>
                To create timeless and luxurious products rooted in Nusantara’s cultural heritage, guided by research, authenticity, and purposeful design.
              </li>

              <li>
                <span className="font-light block mb-1">Culture & Education</span>
                To use fashion as a medium to preserve and share Nusantara’s stories through meaningful narratives and cultural collaboration.
              </li>

              <li>
                <span className="font-light block mb-1">Sustainability & Awareness</span>
                To practice ethical production and promote conscious fashion that drives cultural awareness and positive impact.
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center">
          <img 
            src="/images/poetic_divider.svg" 
            alt="Divider" 
            className="h-12 w-auto"
          />
        </div>
      </div>
    </main>
  )
}