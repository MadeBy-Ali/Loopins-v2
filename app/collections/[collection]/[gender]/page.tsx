import ProductDetailClient from './ProductDetailClient'

// Generate static paths for export
export function generateStaticParams() {
  return [
    { collection: 'mbok-jamu', gender: 'men' },
    { collection: 'mbok-jamu', gender: 'women' },
  ]
}

export default function CollectionGenderPage({ params }: { params: { collection: string; gender: string } }) {
  return <ProductDetailClient collection={params.collection} gender={params.gender} />
}