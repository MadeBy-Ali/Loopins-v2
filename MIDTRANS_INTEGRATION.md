# 🎯 Midtrans Payment Integration - Testing Guide

## ✅ What's Been Integrated

### 1. **Midtrans Snap Script** ([app/layout.tsx](app/layout.tsx))
- Added Snap.js script with sandbox client key: `Mid-client-CfTuWl9fMeHWbf1_`
- Loaded before page interaction for instant availability

### 2. **API Service** ([lib/api.ts](lib/api.ts))
- New endpoint: `getMidtransToken(orderId, authToken?)`
- Calls Spring backend: `http://localhost:8080/api/payments/snap/{orderId}`
- Returns Midtrans Snap token for payment popup

### 3. **Checkout Flow** ([app/checkout/page.tsx](app/checkout/page.tsx))
- **PRIMARY**: Midtrans payment popup with QRIS
- **FALLBACK**: WhatsApp message (if Midtrans fails)
- TypeScript declarations for `window.snap`

## 🚀 How to Test

### Prerequisites
1. **Spring Backend** must be running on `http://localhost:8080`
2. **Next.js Frontend** running on `http://localhost:3001` (or 3000)

### Testing Steps

1. **Start Both Servers**
   ```bash
   # Terminal 1: Spring Backend (should already be running)
   # Check: http://localhost:8080/api/swagger-ui/index.html

   # Terminal 2: Next.js Frontend
   npm run dev
   ```

2. **Test the Flow**
   - Go to http://localhost:3001
   - Add items to cart
   - Navigate to checkout
   - Fill in all form fields
   - Click "Place Order"

3. **Expected Behavior**
   ```
   ✅ Form validation passes
   ✅ Order created (mock mode)
   ✅ Calls Spring backend: POST /api/payments/snap/{orderId}
   ✅ Receives Midtrans token
   ✅ Midtrans popup appears with QRIS payment
   ```

4. **Check Browser Console**
   ```javascript
   🛒 Starting checkout process...
   📦 Checkout data: {...}
   ✅ Order created successfully: ORD-123456789
   💳 Fetching Midtrans payment token...
   🎫 [MOCK->REAL] Calling real Midtrans API for order: ORD-123456789
   🎫 Midtrans Token Response: {...}
   ✅ Midtrans token received: abc-123-token
   🎬 Opening Midtrans payment popup...
   ```

## 🔄 Payment Flow

```
User clicks "Place Order"
         ↓
Frontend creates order (mock)
         ↓
Calls Spring Backend
POST /api/payments/snap/{orderId}
         ↓
Backend returns Midtrans token
         ↓
Frontend shows Snap popup
         ↓
User scans QRIS / pays
         ↓
Callbacks: onSuccess / onError / onPending
```

## 🎨 Midtrans Popup Callbacks

```javascript
window.snap.pay(token, {
  onSuccess: (result) => {
    // Payment successful
    // Clear cart, redirect to success page
  },
  onPending: (result) => {
    // Payment pending (e.g., bank transfer waiting)
  },
  onError: (result) => {
    // Payment failed
    // Keep processing state false
  },
  onClose: () => {
    // User closed popup without completing
    // Allow retry
  }
})
```

## 🛡️ Fallback Mechanism

If Midtrans integration fails (backend down, network error, etc.):
- Console logs error
- Automatically falls back to WhatsApp checkout
- Opens WhatsApp with order details
- User still completes order manually

## 🔍 Troubleshooting

### Midtrans popup doesn't appear
1. Check browser console for errors
2. Verify Snap.js is loaded: `console.log(window.snap)`
3. Ensure Spring backend is running
4. Check CORS settings on backend

### Backend connection error
```
❌ Failed to get payment token from backend
📱 Falling back to WhatsApp...
```
- Check: http://localhost:8080 is accessible
- Verify endpoint exists: `/api/payments/snap/{orderId}`
- Check backend logs for errors

### Token error
```
Error: Failed to get payment token
```
- Check backend response format matches:
  ```json
  {
    "success": true,
    "data": {
      "token": "abc-123",
      "redirectUrl": "https://...",
      "orderId": "ORDER-123",
      "grossAmount": 275000
    }
  }
  ```

## 📝 Current Implementation

- ✅ Midtrans Snap.js loaded
- ✅ API endpoint configured
- ✅ Payment popup integration
- ✅ WhatsApp fallback preserved
- ✅ TypeScript declarations
- ✅ Error handling
- ✅ Console logging for debugging

## 🔜 Next Steps (Optional)

1. Add authentication token if required
2. Handle different payment methods
3. Add payment status webhook handler
4. Store transaction details
5. Add loading spinner during token fetch
6. Improve error messages
7. Add retry mechanism
