import MagazineReaderClient from './MagazineReaderClient'
import { magazines } from '@/lib/magazine-data'

export function generateStaticParams() {
  return magazines.map((m) => ({ collection: m.slug }))
}

export default async function MagazineReaderPage({
  params,
}: {
  params: Promise<{ collection: string }>
}) {
  const { collection } = await params
  return <MagazineReaderClient collection={collection} />
}
