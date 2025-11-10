# Loopins E-Commerce - Backend Integration Guide

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Current Setup (Mock Mode)](#current-setup-mock-mode)
3. [Switching to Production Backend](#switching-to-production-backend)
4. [API Endpoints Reference](#api-endpoints-reference)
5. [Payment Gateway Integration](#payment-gateway-integration)
6. [Testing Guide](#testing-guide)

---

## 🏗️ Architecture Overview

### File Structure

```
Loopins-v2/
├── lib/
│   ├── api.ts              # API service layer (mock + real)
│   └── cart-store.ts       # Zustand cart state management
├── app/
│   ├── checkout/
│   │   └── page.tsx        # Checkout form + order creation
│   └── payment/
│       └── success/
│           └── page.tsx    # Payment verification + success
├── .env.local              # Environment configuration
└── docs/
    └── BACKEND_INTEGRATION.md  # This file
```

### Data Flow

```
User adds to cart → Zustand Store (local)
                    ↓
User checkout → api.createOrder() → Your Backend API
                    ↓
Backend returns payment URL (Xendit/Midtrans)
                    ↓
User completes payment → Redirects to /payment/success
                    ↓
api.verifyPayment() → Backend verifies → Show success page
```

---

## 🧪 Current Setup (Mock Mode)

### Configuration

The app currently runs in **MOCK MODE** for development without a backend.

**File**: `.env.local`

```bash
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Mock Behavior

All API calls are simulated with:

- Console logs showing the data being sent
- Artificial delays (500-1500ms) to simulate network requests
- Always returns success responses
- No actual HTTP requests are made

### Testing Mock Mode

1. Add items to cart
2. Go to checkout
3. Fill the form
4. Click "Place Order"
5. **Check browser console** - you'll see:
   ```
   📦 [MOCK] Syncing cart to backend: [...]
   💳 [MOCK] Creating order: {...}
   ✅ [MOCK] Verifying payment for order: ORD-1699999999999
   ```

---

## 🚀 Switching to Production Backend

### Step 1: Update Environment Variables

**File**: `.env.local`

```bash
# Change this to false
NEXT_PUBLIC_USE_MOCK=false

# Update to your actual backend URL
NEXT_PUBLIC_API_URL=https://api.loopins.com/api

# Add payment gateway keys (when ready)
NEXT_PUBLIC_XENDIT_PUBLIC_KEY=xnd_public_development_xxx
XENDIT_SECRET_KEY=xnd_secret_development_xxx
# OR
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
```

### Step 2: Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 3: Verify Backend Connection

The app will now make **real HTTP requests** to your backend API.

---

## 📡 API Endpoints Reference

Your backend must implement these endpoints:

### 1. Sync Cart (Optional - for multi-device sync)

```http
POST /api/cart/sync
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "id": "mbok-jamu-men-vest-001-M",
      "name": "Mbok Jamu Classic Vest - Men",
      "price": 850000,
      "quantity": 1,
      "image": "/images/men_mbokjamu_front.JPG",
      "size": "M",
      "color": null
    }
  ]
}

Response:
{
  "success": true
}
```

**When Called**:

- Can be called periodically to sync cart across devices
- Currently not automatically called (implement if needed)

---

### 2. Create Order

```http
POST /api/orders/create
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "id": "mbok-jamu-men-vest-001-M",
      "name": "Mbok Jamu Classic Vest - Men",
      "price": 850000,
      "quantity": 1,
      "image": "/images/men_mbokjamu_front.JPG",
      "size": "M"
    }
  ],
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+62 812 3456 7890",
    "address": "Jl. Sudirman No. 123",
    "city": "Jakarta",
    "postalCode": "12190"
  },
  "totalAmount": 850000
}

Response:
{
  "success": true,
  "orderId": "ORD-20251110-001",
  "paymentUrl": "https://checkout.xendit.co/web/xxx",  // OR Midtrans URL
  "message": "Order created successfully"
}
```

**When Called**: When user clicks "Place Order" on checkout page

**What Happens**:

1. Frontend validates form
2. Calls `api.createOrder()`
3. Backend creates order in database
4. Backend initiates payment with Xendit/Midtrans
5. Backend returns payment URL
6. Frontend redirects to payment URL
7. User completes payment on Xendit/Midtrans
8. Payment gateway redirects back to `/payment/success?orderId=xxx`

---

### 3. Verify Payment

```http
GET /api/payments/verify/:orderId

Response:
{
  "success": true,
  "status": "paid"  // or "pending", "failed", "expired"
}
```

**When Called**: On payment success page load

**Purpose**: Verify that payment was actually completed before showing success message

---

### 4. Get Order Details (Optional)

```http
GET /api/orders/:orderId

Response:
{
  "orderId": "ORD-20251110-001",
  "status": "paid",
  "createdAt": "2025-11-10T10:30:00Z",
  "items": [...],
  "customerInfo": {...},
  "total": 850000,
  "paymentMethod": "xendit",
  "shippingStatus": "pending"
}
```

**When Called**:

- Currently mocked, not actively used
- Implement for order history/tracking features

---

## 💳 Payment Gateway Integration

### Option 1: Xendit

#### Setup

1. Sign up at [xendit.co](https://xendit.co)
2. Get API keys from dashboard
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_XENDIT_PUBLIC_KEY=xnd_public_production_xxx
XENDIT_SECRET_KEY=xnd_secret_production_xxx
```

#### Backend Implementation

```javascript
// In your backend: POST /api/orders/create
const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY,
});

const { Invoice } = x;
const invoice = new Invoice();

// Create invoice
const response = await invoice.createInvoice({
  externalId: orderId,
  amount: totalAmount,
  payerEmail: customerInfo.email,
  description: "Loopins Order",
  successRedirectUrl: `${FRONTEND_URL}/payment/success?orderId=${orderId}`,
  failureRedirectUrl: `${FRONTEND_URL}/payment/failed?orderId=${orderId}`,
});

return {
  success: true,
  orderId: orderId,
  paymentUrl: response.invoice_url,
};
```

#### Webhook Setup

Configure webhook in Xendit dashboard:

- URL: `https://api.loopins.com/api/webhooks/xendit`
- Events: `invoice.paid`, `invoice.expired`

---

### Option 2: Midtrans

#### Setup

1. Sign up at [midtrans.com](https://midtrans.com)
2. Get API keys from dashboard
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
```

#### Backend Implementation

```javascript
// In your backend: POST /api/orders/create
const midtransClient = require("midtrans-client");
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const parameter = {
  transaction_details: {
    order_id: orderId,
    gross_amount: totalAmount,
  },
  customer_details: {
    first_name: customerInfo.name,
    email: customerInfo.email,
    phone: customerInfo.phone,
  },
  item_details: items.map((item) => ({
    id: item.id,
    price: item.price,
    quantity: item.quantity,
    name: item.name,
  })),
};

const transaction = await snap.createTransaction(parameter);

return {
  success: true,
  orderId: orderId,
  paymentUrl: transaction.redirect_url,
};
```

#### Webhook Setup

Configure webhook in Midtrans dashboard:

- URL: `https://api.loopins.com/api/webhooks/midtrans`
- Events: `payment.success`, `payment.pending`, `payment.failed`

---

## 🧪 Testing Guide

### Testing Mock Mode (Current)

```bash
# Make sure mock is enabled
NEXT_PUBLIC_USE_MOCK=true

# Run dev server
npm run dev

# Test flow:
1. Visit http://localhost:3000
2. Click "Explore Collection"
3. Choose Men or Women collection
4. Select size and quantity
5. Click "Add to Cart"
6. Go to Cart (top right icon)
7. Click "Proceed to Checkout"
8. Fill form with test data
9. Click "Place Order"
10. Check browser console for mock logs
11. Should redirect to success page
```

### Testing with Real Backend

```bash
# Disable mock mode
NEXT_PUBLIC_USE_MOCK=false

# Set your backend URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Run both servers
# Terminal 1: Your backend
python manage.py runserver 8000  # or your backend command

# Terminal 2: Next.js frontend
npm run dev

# Test same flow as above
# Check Network tab in browser DevTools for actual API calls
```

### Testing Payment Gateway (Sandbox)

#### Xendit Test Cards

```
Success: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
Failure: 4000 0000 0000 0101
```

#### Midtrans Test Cards

```
Success: 4811 1111 1111 1114
Challenge: 4911 1111 1111 1113
Failure: 4911 1111 1111 1129
```

---

## 🔒 Security Notes

### Environment Variables

- **NEVER** commit `.env.local` to git (already in `.gitignore`)
- Use different keys for development and production
- Keep secret keys on backend only (`XENDIT_SECRET_KEY`, `MIDTRANS_SERVER_KEY`)
- Only public keys in frontend (`NEXT_PUBLIC_*`)

### API Authentication

When your backend is ready, add authentication:

```typescript
// In lib/api.ts - realAPI functions
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`  // Add this
}
```

---

## 🐛 Troubleshooting

### Issue: 404 errors on API calls

**Solution**: Check `NEXT_PUBLIC_API_URL` in `.env.local` and verify backend is running

### Issue: CORS errors

**Solution**: Configure CORS in your backend:

```javascript
// Express.js example
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

### Issue: Payment URL not working

**Solution**:

1. Verify payment gateway credentials
2. Check webhook configuration
3. Test in sandbox mode first

### Issue: Environment variables not updating

**Solution**: Restart Next.js dev server after changing `.env.local`

---

## 📞 Support

For questions about:

- **Frontend**: Check Next.js docs
- **Xendit**: docs.xendit.co
- **Midtrans**: docs.midtrans.com
- **This Project**: Review code comments in `lib/api.ts`

---

## ✅ Checklist: Going to Production

- [ ] Backend API endpoints implemented
- [ ] `.env.local` updated with production URLs
- [ ] `NEXT_PUBLIC_USE_MOCK=false` set
- [ ] Payment gateway configured (Xendit OR Midtrans)
- [ ] Webhooks tested and verified
- [ ] Test orders completed successfully
- [ ] Error handling tested
- [ ] CORS configured on backend
- [ ] SSL certificates installed (HTTPS)
- [ ] Monitoring and logging setup

---

**Last Updated**: November 10, 2025
**Version**: 1.0.0
