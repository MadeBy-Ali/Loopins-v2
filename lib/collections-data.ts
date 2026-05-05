import React from 'react'

export interface CollectionVariant {
  gender: string
  title: string
  description: string
  image: string
  bgStyle: React.CSSProperties
}

export interface Collection {
  id: number
  slug: string
  name: string
  tagline: string
  heroImage: string
  coverImage: string
  description: string
  variants: CollectionVariant[]
}

export const collections: Collection[] = [
  {
    id: 1,
    slug: 'mbok-jamu',
    name: 'Mbok Jamu',
    tagline: 'Heritage & Craft — A Story in Every Stitch',
    heroImage: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_women_vest_cover.jpg',
    coverImage: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_women_vest_cover.jpg',
    description:
      'Inspired by the timeless elegance of Mbok Jamu — the traditional Indonesian herb sellers whose grace and authenticity have been woven into the fabric of our culture for generations. Each piece in this collection carries the spirit of resilience, the warmth of earth-toned spices, and the quiet poetry of a life lived with purpose.',
    variants: [
      {
        gender: 'men',
        title: "Mbok Jamu - Men's Collection",
        description: 'Modern collection designed for the modern gentleman',
        image: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_men_vest_cover.jpg',
        bgStyle: { backgroundPosition: '60% 63%', backgroundSize: '100%' },
      },
      {
        gender: 'women',
        title: "Mbok Jamu - Women's Collection",
        description: 'Elegant collection for the contemporary woman',
        image: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_women_vest_cover.jpg',
        bgStyle: { backgroundPosition: '50% 30%', backgroundSize: '100%' },
      },
    ],
  },
  // {
  //   id: 1,
  //   slug: 'mbok-jamu',
  //   name: 'Mbok Jamu',
  //   tagline: 'Heritage & Craft — A Story in Every Stitch',
  //   heroImage: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_women_vest_cover.jpg',
  //   coverImage: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_women_vest_cover.jpg',
  //   description:
  //     'Inspired by the timeless elegance of Mbok Jamu — the traditional Indonesian herb sellers whose grace and authenticity have been woven into the fabric of our culture for generations. Each piece in this collection carries the spirit of resilience, the warmth of earth-toned spices, and the quiet poetry of a life lived with purpose.',
  //   variants: [
  //     {
  //       gender: 'men',
  //       title: "Mbok Jamu - Men's Collection",
  //       description: 'Modern collection designed for the modern gentleman',
  //       image: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_men_vest_cover.jpg',
  //       bgStyle: { backgroundPosition: '60% 63%', backgroundSize: '100%' },
  //     },
  //     {
  //       gender: 'women',
  //       title: "Mbok Jamu - Women's Collection",
  //       description: 'Elegant collection for the contemporary woman',
  //       image: 'https://media.loopinsstudio.com/loopinsfe/catalog_page_women_vest_cover.jpg',
  //       bgStyle: { backgroundPosition: '50% 30%', backgroundSize: '100%' },
  //     },
  //   ],
  // },
]
