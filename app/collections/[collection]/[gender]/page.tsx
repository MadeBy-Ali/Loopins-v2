import ProductDetailClient from './ProductDetailClient'

// Generate static paths for export
export function generateStaticParams() {
  return [
    { collection: 'mbok-jamu', gender: 'men' },
    { collection: 'mbok-jamu', gender: 'women' },
  ]
}

export default async function CollectionGenderPage({ 
  params 
}: { 
  params: Promise<{ collection: string; gender: string }> 
}) {
  const { collection, gender } = await params
  return <ProductDetailClient collection={collection} gender={gender} />
}