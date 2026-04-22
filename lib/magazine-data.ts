const S3 = 'https://media.loopinsstudio.com/loopinsfe'

export type MagazineData = {
  slug: string
  name: string
  subtitle: string
  year: string
  issue: string
  cover: string
  pages: string[]
  collectionHref: string
}

export const magazines: MagazineData[] = [
  {
    slug: 'mbok-jamu',
    name: 'Mbok Jamu',
    subtitle: 'The Heritage Edition',
    year: '2024',
    issue: 'No. I',
    cover: `${S3}/magazine_mbokjamu_cover.jpg`,
    collectionHref: '/collections/mbok-jamu',
    pages: Array.from({ length: 9 }, (_, i) => `${S3}/magazine_mbokjamu_page_${i + 1}.jpg`),
  },
]

export function getMagazineBySlug(slug: string): MagazineData | undefined {
  return magazines.find((m) => m.slug === slug)
}
