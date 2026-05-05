import { notFound } from 'next/navigation'
import { collections } from '@/lib/collections-data'
import CollectionPageClient from './CollectionPageClient'

export function generateStaticParams() {
  return collections.map((col) => ({ collection: col.slug }))
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>
}) {
  const { collection } = await params
  const col = collections.find((c) => c.slug === collection)
  if (!col) notFound()

  return <CollectionPageClient collection={col} />
}
