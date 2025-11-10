import Hero from '@/components/Hero'
import CollectionSection from '@/components/CollectionSection'

export default function Home() {
  return (
    <main className="bg-dark-green">
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
    </main>
  )
}