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
            <h3 className="text-3xl font-semibold text-dark-brown mb-8">Vision:</h3>
            <p className="text-black text-lg leading-relaxed text-justify indent-8">
              Looping Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance. Loopins Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance. Loopins Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance.
            </p>
          </div>

          {/* Mission - Right Side */}
          <div>
            <h3 className="text-3xl font-semibold text-dark-brown mb-8">Mission:</h3>
            <p className="text-black text-lg leading-relaxed text-justify indent-8">
              Loopins Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance. Loopins Studio is not merely selling garments, but telling stories. Each pattern speaks, each collection reflects, each collaboration acts. We believe true luxury is born from meaning, not merely appearance. Loopins Studio is not merely selling garments, but telling stories.
            </p>
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