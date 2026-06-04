import { notFound } from 'next/navigation'
import { collections } from '@/lib/collections-data'
import SubProductDetailClient from './SubProductDetailClient'

interface Props {
  params: { collection: string; subProductId: string }
}

export async function generateStaticParams() {
  const params: { collection: string; subProductId: string }[] = []
  for (const col of collections) {
    for (const sub of col.subProducts ?? []) {
      params.push({ collection: col.slug, subProductId: sub.id })
    }
  }
  return params
}

export default function SubProductPage({ params }: Props) {
  const col = collections.find(c => c.slug === params.collection)
  if (!col) notFound()

  const sub = col.subProducts?.find(s => s.id === params.subProductId)
  if (!sub) notFound()

  // Find all variants if this product has a storeTitle
  const variants = sub.storeTitle 
    ? col.subProducts?.filter(s => s.storeTitle === sub.storeTitle) 
    : undefined

  return (
    <SubProductDetailClient
      collectionSlug={col.slug}
      collectionName={col.name}
      subProduct={sub}
      variants={variants}
    />
  )
}
