import React from 'react'

export interface CollectionSubProduct {
  id: string
  sizeIds: Record<string, string>
  name: string
  showcaseImage: string
  price: number
  originalPrice: number
  images: string[]
  imagePositions: React.CSSProperties[]
  description: string
  story: string[]
  sizes: string[]
  features: string[]
}

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
  subProducts?: CollectionSubProduct[]
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
    subProducts: [
      {
        id: 'mbok-jamu-berkain',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Berkain',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/berkain_cover_ratio1_1.jpg',
        price: 179000, // TODO: fill in
        originalPrice: 249000, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/berkain_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
      {
        id: 'mbok-jamu-obi-belt',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Obi Belt',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/obibelt_cover_ratio1_1.jpg',
        price: 69000, // TODO: fill in
        originalPrice: 99000, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/obibelt_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
      {
        id: 'mbok-jamu-scarf-1',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Scarf',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
        price: 59000, // TODO: fill in
        originalPrice: 79000, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
      {
        id: 'mbok-jamu-scarf-2',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Scarf',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
        price: 79000, // TODO: fill in
        originalPrice: 99000, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
      {
        id: 'mbok-jamu-tie',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Tie',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/tie_cover_ratio1_1.jpg',
        price: 79000, // TODO: fill in
        originalPrice: 110000, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/tie_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
    ],
  },
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
    subProducts: [
      {
        id: 'mbok-jamu-berkain',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Berkain',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/berkain_cover_ratio1_1.jpg',
        price: 0, // TODO: fill in
        originalPrice: 0, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/berkain_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/berkain_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
      {
        id: 'mbok-jamu-obi-belt',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Obi Belt',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/obibelt_cover_ratio1_1.jpg',
        price: 0, // TODO: fill in
        originalPrice: 0, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/obibelt_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/obibelt_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
      {
        id: 'mbok-jamu-scarf',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Scarf',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
        price: 0, // TODO: fill in
        originalPrice: 0, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
      {
        id: 'mbok-jamu-tie',
        sizeIds: {}, // TODO: fill in SKU map
        name: 'Tie',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/tie_cover_ratio1_1.jpg',
        price: 0, // TODO: fill in
        originalPrice: 0, // TODO: fill in
        images: [
          'https://media.loopinsstudio.com/loopinsfe/tie_cover_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page2_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page3_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/tie_page4_ratio1_1.jpg',
        ],
        imagePositions: [
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
          { backgroundPosition: '50% 50%', backgroundSize: '100%' },
        ],
        description: '', // TODO: fill in
        story: [], // TODO: fill in
        sizes: [], // TODO: fill in
        features: [], // TODO: fill in
      },
    ],
  },
]
