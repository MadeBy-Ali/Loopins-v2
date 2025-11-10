# Loopins E-Commerce - Next.js Project

Premium vest collection e-commerce platform built with Next.js 14, TypeScript, and modern web technologies.

## Project Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (cart system)
- **Animations**: Framer Motion
- **Payment**: Midtrans Integration
- **API**: Custom API Gateway

## Color Palette

- **Earth Green**: #5a6b3b (primary)
- **Soft Brown**: #c49b7a (secondary)
- **Light Cream**: #f5f3f0 (text)
- **Dark Green**: #2c3e2d (background)

## Project Structure

```
app/
├── page.tsx                    # Landing page (parallax design)
├── collections/
│   ├── page.tsx               # All collections
│   └── [slug]/
│       ├── page.tsx           # Collection detail with storytelling
│       └── [productId]/
│           └── page.tsx       # Product detail page
├── cart/
│   └── page.tsx               # Shopping cart
├── checkout/
│   └── page.tsx               # Checkout with Midtrans
└── layout.tsx                 # Root layout

components/
├── Hero.tsx                   # Parallax hero section
├── ProductCard.tsx            # Product display
├── CartButton.tsx             # Cart icon with count
├── Navbar.tsx                 # Navigation
└── PaymentForm.tsx            # Midtrans payment

lib/
├── cart-store.ts              # Zustand cart state
├── api.ts                     # API gateway calls
└── midtrans.ts                # Payment integration

types/
└── index.ts                   # TypeScript interfaces
```

## Development Guidelines

- Use TypeScript for all files
- Follow Next.js 14 App Router conventions
- Use Tailwind CSS utility classes
- Implement server components where possible
- Use client components for interactivity
- Keep current parallax landing page design
- Maintain earth tone color scheme

## API Integration

- All API calls go through API gateway
- Use environment variables for endpoints
- Handle loading and error states
- Implement proper TypeScript types

## Payment Integration

- Midtrans Snap API for checkout
- Server-side token generation
- Client-side payment popup
- Webhook handling for payment status
