# Loopins E-Commerce Platform

A premium vest collection e-commerce platform built with Next.js 14, TypeScript, and modern web technologies. Features a parallax landing page, smooth animations, shopping cart, and payment integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## ✨ Features

- 🎨 **Parallax Landing Page** - Stunning scrolling effects
- 🛍️ **Shopping Cart** - Zustand-powered state management
- 💳 **Payment Integration** - Ready for Xendit/Midtrans
- 📱 **Fully Responsive** - Mobile, tablet, desktop
- 🎭 **Smooth Animations** - Framer Motion effects
- 🔄 **Mock/Real API Toggle** - Easy backend switching
- 🌍 **Indonesian Focus** - Rupiah currency, local design

## 🎨 Design System

### Color Palette

- **Earth Green**: `#5a6b3b` - Primary brand color
- **Soft Brown**: `#c49b7a` - Secondary accent
- **Light Cream**: `#f5f3f0` - Text color
- **Dark Green**: `#2c3e2d` - Background

### Typography

- **Font**: Montserrat (Google Fonts)
- **Weights**: 400, 500, 600, 700, 900

## 📁 Project Structure

```
Loopins-v2/
├── app/                  # Next.js pages
│   ├── page.tsx         # Landing page
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout form
│   ├── collections/     # Product pages
│   └── payment/         # Payment success
├── components/          # Reusable components
├── lib/                 # Utilities & API
├── docs/                # Documentation
└── public/images/       # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animations**: Framer Motion
- **Payments**: Xendit/Midtrans (configurable)

## 📚 Documentation

- **[Backend Integration Guide](./docs/BACKEND_INTEGRATION.md)** - How to connect your backend
- **[API Service Documentation](./docs/API_SERVICE.md)** - API functions reference
- **[Project Structure](./docs/PROJECT_STRUCTURE.md)** - Detailed file organization

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
# Toggle mock API (true = mock, false = real backend)
NEXT_PUBLIC_USE_MOCK=true

# Your backend URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Payment gateway keys (add when ready)
# NEXT_PUBLIC_XENDIT_PUBLIC_KEY=xnd_public_xxx
# NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
```

### Mock Mode (Current)

The app currently runs in **mock mode** for development:

- No backend required
- All API calls logged to console
- Simulates order creation and payment
- Perfect for frontend development

### Switching to Real Backend

1. Set `NEXT_PUBLIC_USE_MOCK=false`
2. Update `NEXT_PUBLIC_API_URL` to your backend
3. Restart dev server
4. See [Backend Integration Guide](./docs/BACKEND_INTEGRATION.md)

## 🎯 Key Routes

- `/` - Landing page with parallax sections
- `/collections` - All collections overview
- `/collections/mbok-jamu/men` - Men's product detail
- `/collections/mbok-jamu/women` - Women's product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/payment/success` - Payment confirmation
- `/about` - About page
- `/contact` - Contact form

## 🛒 Cart System

Uses Zustand for state management:

```typescript
import { useCartStore } from "@/lib/cart-store";

// Add item to cart
const addItem = useCartStore((state) => state.addItem);
addItem({ id, name, price, quantity, image, size });

// Access cart
const items = useCartStore((state) => state.items);
const total = useCartStore((state) => state.getTotalPrice);
```

**Features:**

- Persistent (localStorage)
- Automatic quantity merging
- Type-safe with TypeScript

## 💳 Payment Flow

1. User fills checkout form
2. Frontend calls `api.createOrder()`
3. Backend creates order in database
4. Backend initiates payment (Xendit/Midtrans)
5. Backend returns payment URL
6. User redirected to payment gateway
7. After payment, redirected to `/payment/success`
8. Frontend verifies payment status
9. Shows success/failure message

## 🔒 Security Notes

- Never commit `.env.local` (already in `.gitignore`)
- Keep secret keys server-side only
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting on backend

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Adding New Collection

1. Add images to `public/images/`
2. Update product data in `app/collections/[collection]/[gender]/page.tsx`
3. Add collection card to `app/collections/page.tsx`
4. Update landing page `app/page.tsx`

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'earth-green': '#YOUR_COLOR',
  'soft-brown': '#YOUR_COLOR',
  // ...
}
```

### Adding Pages

Create file in `app/` directory:

```tsx
// app/orders/page.tsx
export default function OrdersPage() {
  return <div>My Orders</div>;
}
```

→ Automatically routed to `/orders`

## 🐛 Troubleshooting

### Dev server not starting

```bash
# Clear cache
rm -rf .next
npm run dev
```

### Environment variables not working

```bash
# Restart server after changing .env.local
# Variables are loaded at startup
```

### Images not loading

- Ensure images are in `public/images/`
- Use paths starting with `/images/`
- Check file extensions match (case-sensitive)

### Cart not persisting

- Check localStorage in browser DevTools
- Look for `loopins-cart` key
- Clear cache if corrupted

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Other Platforms

1. Run `npm run build`
2. Deploy `.next/` folder
3. Set environment variables
4. Ensure Node.js runtime available

## 📞 Support

For issues:

1. Check [documentation](./docs/)
2. Review browser console for errors
3. Verify environment variables
4. Check API endpoint connectivity

## 🗺️ Roadmap

- [ ] User authentication
- [ ] Order history
- [ ] Product reviews
- [ ] Wishlist feature
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] Inventory management

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

Built with ❤️ for Loopins

---

**Version**: 1.0.0  
**Last Updated**: November 10, 2025  
**Node.js**: 18.x or higher  
**Next.js**: 14.2.0
