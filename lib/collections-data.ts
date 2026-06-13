import React from 'react'

export interface CollectionSubProduct {
  id: string
  sizeIds: string
  name: string
  storeTitle?: string  // Display title for grouped variants (optional)
  showcaseImage: string
  price: number
  originalPrice: number
  images: string[]
  imagePositions: React.CSSProperties[]
  description: string
  story: string[]
  sizes: string[]
  features: string[]
  dimensions?: { length: number; width: number }
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
        sizeIds: 'LSTD-MJC-SP-BRKN',
        name: 'Berkain',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/berkain_cover_ratio1_1.jpg',
        price: 179000,
        originalPrice: 249000,
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
        description: 'Traditional Indonesian batik cloth wrap with modern styling.',
        story: [
          'Berkain brings the traditional art of batik into contemporary fashion.',
          'Each piece is carefully crafted to honor Indonesian heritage.',
          'Versatile styling for both casual and formal occasions.',
        ],
        sizes: ['All Size'],
        features: ['Premium batik fabric', 'Versatile styling', 'One size fits most'],
        dimensions: { length: 200, width: 105 },
      },
      {
        id: 'mbok-jamu-obi-belt',
        sizeIds: 'LSTD-MJC-SP-OB',
        name: 'Obi Belt',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/obibelt_cover_ratio1_1.jpg',
        price: 69000,
        originalPrice: 99000,
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
        description: 'Mbok Jamu-inspired wide belt with Indonesian twist.',
        story: [
          'The Obi belt merges Mbok Jamu craftsmanship with Indonesian batik patterns.',
          'Perfect for cinching waists and adding elegant detail to any outfit.',
          'A timeless accessory that bridges cultures.',
        ],
        sizes: ['All Size'],
        features: ['Wide belt design', 'Premium fabric', 'Adjustable fit'],
        dimensions: { length: 108, width: 7 },
      },
      {
        id: 'mbok-jamu-scarf-1',
        sizeIds: 'LSTD-MJC-SP-SCRF-5',
        name: 'Scarf ( 50 x 50 )',
        storeTitle: 'Scarf',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
        price: 59000,
        originalPrice: 79000,
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
        description: 'Lightweight scarf with traditional patterns.',
        story: [
          'Our scarves celebrate the heritage of Indonesian textile art.',
          'Each pattern tells a story of tradition and craftsmanship.',
          'Soft, breathable fabric perfect for any season.',
        ],
        sizes: ['Small', 'Large'],
        features: ['Lightweight fabric', 'Traditional patterns', 'Two sizes available'],
        dimensions: { length: 50, width: 50 },
      },
      {
        id: 'mbok-jamu-scarf-2',
        sizeIds: 'SCARF-L',
        name: 'Scarf ( 70 x 70 )',
        storeTitle: 'Scarf',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
        price: 79000,
        originalPrice: 99000,
        images: [
          'https://media.loopinsstudio.com/loopinsfe/scarf_page1_ratio1_1.jpg',
          'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
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
        description: 'Lightweight scarf with traditional patterns.',
        story: [
          'Our scarves celebrate the heritage of Indonesian textile art.',
          'Each pattern tells a story of tradition and craftsmanship.',
          'Soft, breathable fabric perfect for any season.',
        ],
        sizes: ['Small', 'Large'],
        features: ['Lightweight fabric', 'Traditional patterns', 'Two sizes available'],
        dimensions: { length: 70, width: 70 },
      },
      {
        id: 'mbok-jamu-tie',
        sizeIds: 'LSTD-MJC-SP-TIE',
        name: 'Tie',
        showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/tie_cover_ratio1_1.jpg',
        price: 79000,
        originalPrice: 110000,
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
        description: 'Classic tie with Indonesian batik motifs.',
        story: [
          'The Mbok Jamu tie brings traditional batik into formal wear.',
          'Each tie is crafted with attention to detail and cultural respect.',
          'Perfect for making a statement while honoring heritage.',
        ],
        sizes: ['All Size'],
        features: ['Batik patterns', 'Premium material', 'Standard tie length'],
        dimensions: { length: 30, width: 8 },
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
  //   subProducts: [
  //     {
  //       id: 'mbok-jamu-berkain',
  //       sizeIds: {}, // TODO: fill in SKU map
  //       name: 'Berkain',
  //       showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/berkain_cover_ratio1_1.jpg',
  //       price: 0, // TODO: fill in
  //       originalPrice: 0, // TODO: fill in
  //       images: [
  //         'https://media.loopinsstudio.com/loopinsfe/berkain_cover_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/berkain_page1_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/berkain_page2_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/berkain_page3_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/berkain_page4_ratio1_1.jpg',
  //       ],
  //       imagePositions: [
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //       ],
  //       description: '', // TODO: fill in
  //       story: [], // TODO: fill in
  //       sizes: [], // TODO: fill in
  //       features: [], // TODO: fill in
  //     },
  //     {
  //       id: 'mbok-jamu-obi-belt',
  //       sizeIds: {}, // TODO: fill in SKU map
  //       name: 'Obi Belt',
  //       showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/obibelt_cover_ratio1_1.jpg',
  //       price: 0, // TODO: fill in
  //       originalPrice: 0, // TODO: fill in
  //       images: [
  //         'https://media.loopinsstudio.com/loopinsfe/obibelt_cover_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/obibelt_page1_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/obibelt_page2_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/obibelt_page3_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/obibelt_page4_ratio1_1.jpg',
  //       ],
  //       imagePositions: [
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //       ],
  //       description: '', // TODO: fill in
  //       story: [], // TODO: fill in
  //       sizes: [], // TODO: fill in
  //       features: [], // TODO: fill in
  //     },
  //     {
  //       id: 'mbok-jamu-scarf',
  //       sizeIds: {}, // TODO: fill in SKU map
  //       name: 'Scarf',
  //       showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
  //       price: 0, // TODO: fill in
  //       originalPrice: 0, // TODO: fill in
  //       images: [
  //         'https://media.loopinsstudio.com/loopinsfe/scarf_cover_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/scarf_page1_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/scarf_page2_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/scarf_page3_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/scarf_page4_ratio1_1.jpg',
  //       ],
  //       imagePositions: [
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //       ],
  //       description: '', // TODO: fill in
  //       story: [], // TODO: fill in
  //       sizes: [], // TODO: fill in
  //       features: [], // TODO: fill in
  //     },
  //     {
  //       id: 'mbok-jamu-tie',
  //       sizeIds: {}, // TODO: fill in SKU map
  //       name: 'Tie',
  //       showcaseImage: 'https://media.loopinsstudio.com/loopinsfe/tie_cover_ratio1_1.jpg',
  //       price: 0, // TODO: fill in
  //       originalPrice: 0, // TODO: fill in
  //       images: [
  //         'https://media.loopinsstudio.com/loopinsfe/tie_cover_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/tie_page1_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/tie_page2_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/tie_page3_ratio1_1.jpg',
  //         'https://media.loopinsstudio.com/loopinsfe/tie_page4_ratio1_1.jpg',
  //       ],
  //       imagePositions: [
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //         { backgroundPosition: '50% 50%', backgroundSize: '100%' },
  //       ],
  //       description: '', // TODO: fill in
  //       story: [], // TODO: fill in
  //       sizes: [], // TODO: fill in
  //       features: [], // TODO: fill in
  //     },
  //   ],
  // },
]
