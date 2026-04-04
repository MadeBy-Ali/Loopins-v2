# Project Structure Documentation

## 📁 Complete Directory Structure

```
Loopins-v2/
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles + Tailwind
│   ├── layout.tsx               # Root layout (Navbar, fonts, metadata)
│   ├── page.tsx                 # Landing page (Hero + Collections)
│   │
│   ├── about/
│   │   └── page.tsx             # About page
│   │
│   ├── cart/
│   │   └── page.tsx             # Shopping cart page
│   │
│   ├── checkout/
│   │   └── page.tsx             # Checkout form + order creation
│   │
│   ├── collections/
│   │   ├── page.tsx             # All collections overview
│   │   └── [collection]/        # Dynamic collection route
│   │       └── [gender]/
│   │           └── page.tsx     # Product detail page (single product per collection/gender)
│   │
│   ├── contact/
│   │   └── page.tsx             # Contact form page
│   │
│   └── payment/
│       └── success/
│           └── page.tsx         # Payment success/failure page
│
├── components/                   # Reusable React components
│   ├── CollectionSection.tsx   # Collection showcase (parallax)
│   ├── Hero.tsx                 # Landing page hero section
│   └── Navbar.tsx               # Navigation bar with cart icon
│
├── lib/                         # Utility functions and services
│   ├── api.ts                   # API service layer (mock + real)
│   └── cart-store.ts            # Zustand cart state management
│
├── types/                       # TypeScript type definitions
│   └── index.ts                 # (To be created for shared types)
│
├── public/                      # Static assets
│   └── images/                  # Product images
│       ├── men_mbokjamu_front.JPG
│       ├── men_mbokjamu_back.JPG
│       ├── women_mbokjamu_front.JPG
│       └── women_mbokjamu_back.JPG
│
├── asset/                       # Original assets folder (source)
│   └── *.JPG                    # Original uploaded images
│
├── docs/                        # Project documentation
│   ├── BACKEND_INTEGRATION.md  # Backend setup guide
│   ├── API_SERVICE.md          # API service documentation
│   └── PROJECT_STRUCTURE.md    # This file
│
├── .env.local                   # Environment variables (NOT in git)
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── next-env.d.ts               # Next.js TypeScript declarations
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project overview
```

---

## 📄 File Descriptions

### Core Configuration Files

#### `package.json`

Dependencies and npm scripts

```json
{
  "scripts": {
    "dev": "next dev", // Start development server
    "build": "next build", // Build for production
    "start": "next start", // Start production server
    "lint": "next lint" // Run ESLint
  },
  "dependencies": {
    "next": "14.2.0", // Next.js framework
    "react": "18.3.0", // React library
    "zustand": "4.5.0", // State management
    "framer-motion": "11.0.0" // Animations
  }
}
```

#### `tsconfig.json`

TypeScript configuration with path aliases

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"] // Allows imports like @/components/Hero
    }
  }
}
```

#### `tailwind.config.js`

Custom theme configuration

```javascript
theme: {
  extend: {
    colors: {
      'earth-green': '#5a6b3b',   // Primary brand color
      'soft-brown': '#c49b7a',     // Secondary brand color
      'light-cream': '#f5f3f0',    // Text color
      'dark-green': '#2c3e2d'      // Background color
    }
  }
}
```

#### `.env.local`

Environment-specific configuration

```bash
NEXT_PUBLIC_USE_MOCK=true              # Toggle mock/real API
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

### App Directory (Pages)

#### `app/layout.tsx`

Root layout wrapper for all pages

- Sets up HTML structure
- Imports Montserrat font
- Includes Navbar component
- Defines metadata (title, description)

#### `app/page.tsx`

Landing page composition

- Hero section with parallax
- Men's collection section
- Women's collection section

#### `app/collections/page.tsx`

Collections overview

- Lists all available collections
- Links to specific collection/gender pages

#### `app/collections/[collection]/[gender]/page.tsx`

Dynamic product detail page

- Image carousel (front/back views)
- Product information and story
- Size and quantity selectors
- Add to cart functionality
- Features section

**URL Examples:**

- `/collections/mbok-jamu/men`
- `/collections/mbok-jamu/women`

#### `app/cart/page.tsx`

Shopping cart management

- Display all cart items
- Update quantity
- Remove items
- Show total price
- Proceed to checkout button

#### `app/checkout/page.tsx`

Checkout process

- Shipping information form
- Order summary
- Form validation
- Create order via API
- Redirect to payment

#### `app/payment/success/page.tsx`

Post-payment page

- Verify payment status
- Show success/failure message
- Display order ID
- Next steps guide

---

### Components

#### `components/Hero.tsx`

Landing page hero section

- **Features:**
  - Parallax scrolling background
  - Framer Motion animations
  - Gradient earth-tone background
  - "Explore Collection" CTA button
  - Scroll indicator

#### `components/CollectionSection.tsx`

Collection showcase component

- **Props:**
  - `title`: Collection title
  - `description`: Collection description
  - `slug`: URL slug for collection
  - `imagePosition`: 'left' or 'right'
- **Features:**
  - Parallax image effect
  - Centered placeholder/image
  - Alternating layout
  - Smooth animations

#### `components/Navbar.tsx`

Navigation bar

- **Features:**
  - Logo/brand name
  - Navigation links (Home, Collections, About, Contact)
  - Cart icon with item count badge
  - Mobile hamburger menu
  - Scroll-based styling
  - Integrates with Zustand cart store

---

### Library Files

#### `lib/cart-store.ts`

Zustand state management for shopping cart

**Store Structure:**

```typescript
{
  items: CartItem[],           // Array of cart items
  addItem: (item) => void,     // Add item to cart
  removeItem: (id) => void,    // Remove item by ID
  updateQuantity: (id, qty) => void,  // Update quantity
  clearCart: () => void,       // Clear all items
  getTotalPrice: () => number, // Calculate total
  getTotalItems: () => number  // Count total items
}
```

**Features:**

- Persistent storage (localStorage)
- Automatic quantity merging
- Type-safe with TypeScript

**Usage:**

```typescript
import { useCartStore } from "@/lib/cart-store";

const addItem = useCartStore((state) => state.addItem);
const items = useCartStore((state) => state.items);
```

#### `lib/api.ts`

API service layer with mock/real switching

**Exported Functions:**

- `api.syncCart(items)` - Sync cart with backend
- `api.createOrder(data)` - Create order and get payment URL
- `api.verifyPayment(orderId)` - Verify payment status
- `api.getOrder(orderId)` - Get order details

**Exported Utilities:**

- `isMockMode()` - Check if using mock API
- `mockAPI` - Direct access to mock implementation
- `realAPI` - Direct access to real implementation

---

## 🔄 Data Flow

### 1. Cart Flow

```
User clicks "Add to Cart"
  ↓
CollectionGenderPage → useCartStore.addItem()
  ↓
Zustand updates state + localStorage
  ↓
Navbar cart badge updates automatically
  ↓
User clicks cart icon → /cart
  ↓
Cart page reads from useCartStore
```

### 2. Checkout Flow

```
User fills checkout form
  ↓
Form validation
  ↓
api.createOrder() called
  ↓
Mock: Returns fake orderId + redirect
Real: Backend creates order → Payment gateway → Returns URL
  ↓
Redirect to payment URL (or success page in mock)
  ↓
Payment completed → Redirect to /payment/success?orderId=xxx
  ↓
api.verifyPayment() called
  ↓
Show success page + clear cart
```

### 3. Image Flow

```
Images uploaded to /asset/ folder
  ↓
Copied to /public/images/ (Next.js requirement)
  ↓
Referenced in code as /images/filename.JPG
  ↓
Next.js serves from public/ folder
  ↓
Displayed in carousel on product page
```

---

## 🎨 Styling System

### Tailwind Classes

All components use Tailwind utility classes:

```tsx
className = "bg-earth-green text-light-cream rounded-lg p-4";
```

### Custom Colors

Defined in `tailwind.config.js`:

- `bg-earth-green` → #5a6b3b
- `bg-soft-brown` → #c49b7a
- `text-light-cream` → #f5f3f0
- `bg-dark-green` → #2c3e2d

### Global Styles

`app/globals.css` includes:

- Tailwind directives
- Montserrat font import
- Base HTML styling
- Custom utility classes

---

## 🛣️ Routing Structure

### Static Routes

- `/` - Landing page
- `/collections` - Collections overview
- `/about` - About page
- `/contact` - Contact page
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/payment/success` - Payment success

### Dynamic Routes

- `/collections/[collection]/[gender]` - Product detail
  - Example: `/collections/mbok-jamu/men`
  - `[collection]` = collection slug (e.g., "mbok-jamu")
  - `[gender]` = "men" or "women"

### Route Parameters

Accessed via Next.js hooks:

```typescript
import { useParams } from "next/navigation";

const params = useParams();
const collection = params.collection; // "mbok-jamu"
const gender = params.gender; // "men" or "women"
```

---

## 📦 State Management

### Zustand Cart Store

**File**: `lib/cart-store.ts`

**Why Zustand?**

- Lightweight (< 1KB)
- No Provider needed
- Built-in persistence
- TypeScript friendly

**Persistence:**
Automatically saves to localStorage as `loopins-cart`

**Accessing State:**

```typescript
// In any component
const { items, addItem } = useCartStore();
```

---

## 🔐 Environment Variables

### Public Variables (Frontend)

Prefix with `NEXT_PUBLIC_`

```bash
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_XENDIT_PUBLIC_KEY=xnd_public_xxx
```

### Private Variables (Backend/Server)

No prefix - not exposed to browser

```bash
XENDIT_SECRET_KEY=xnd_secret_xxx
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
```

### Accessing Variables

```typescript
// Frontend (browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Backend/Server components only
const secretKey = process.env.XENDIT_SECRET_KEY;
```

---

## 🚀 Development Workflow

### Starting Development

```bash
npm run dev
```

Opens at `http://localhost:3000`

### Building for Production

```bash
npm run build  # Creates .next/ folder
npm start      # Runs production server
```

### Adding New Pages

1. Create file in `app/` directory
2. Export default component
3. Automatically routed by Next.js

Example:

```tsx
// app/orders/page.tsx
export default function OrdersPage() {
  return <div>My Orders</div>;
}
```

→ Available at `/orders`

### Adding New Components

1. Create file in `components/` directory
2. Export component
3. Import where needed

```tsx
// components/Footer.tsx
export default function Footer() {
  return <footer>...</footer>;
}

// app/layout.tsx
import Footer from "@/components/Footer";
```

---

## 📚 Key Concepts

### Server vs Client Components

- **Server Components** (default): Rendered on server, no interactivity
- **Client Components**: Add `'use client'` at top, can use hooks/state

```tsx
// Client component - uses hooks
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### File-based Routing

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/shop/[id]/page.tsx` → `/shop/123` (dynamic)

### Metadata

Set in `layout.tsx` or `page.tsx`:

```tsx
export const metadata = {
  title: "Loopins - Modern Batik Vests",
  description: "Traditional Indonesian-inspired vests",
};
```

---

## 🧩 Adding New Collections

To add a new collection (e.g., "Batik Heritage"):

### Step 1: Update Landing Page

`app/page.tsx`

```tsx
<CollectionSection
  title="Batik Heritage - Men"
  description="Traditional batik patterns..."
  slug="batik-heritage/men"
  imagePosition="left"
/>
```

### Step 2: Add Product Data

`app/collections/[collection]/[gender]/page.tsx`

```typescript
const products = {
  'mbok-jamu': { ... },
  'batik-heritage': {  // Add new collection
    men: { ... },
    women: { ... }
  }
}
```

### Step 3: Add Images

Place images in `public/images/`:

- `batik_heritage_men_front.JPG`
- `batik_heritage_men_back.JPG`

### Step 4: Update Collections Page

`app/collections/page.tsx`

```typescript
const collections = [
  { id: 1, title: "Mbok Jamu - Men", slug: "mbok-jamu/men", ... },
  { id: 3, title: "Batik Heritage - Men", slug: "batik-heritage/men", ... }
]
```

---

## 📖 Related Documentation

- [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) - API setup guide
- [API_SERVICE.md](./API_SERVICE.md) - API functions reference
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [Tailwind Docs](https://tailwindcss.com/docs) - Styling reference

---

**Last Updated**: November 10, 2025
**Version**: 1.0.0
