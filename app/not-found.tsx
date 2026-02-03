import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-light-cream flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-dark-brown mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-medium text-dark-brown mb-6">Page Not Found</h2>
        <p className="text-lg text-dark-brown/70 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-dark-brown text-white font-medium text-sm uppercase tracking-widest hover:bg-earth-green transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
