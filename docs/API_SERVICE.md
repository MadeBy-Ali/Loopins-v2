# API Service Layer Documentation

## Overview

The API service layer (`lib/api.ts`) provides a clean abstraction for all backend communication. It automatically switches between mock and real implementations based on environment configuration.

## How It Works

### Auto-Switch Mechanism

```typescript
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true" || true;
export const api = USE_MOCK ? mockAPI : realAPI;
```

### Usage in Components

```typescript
import { api } from "@/lib/api";

// Always use 'api' - it automatically uses mock or real
const response = await api.createOrder(checkoutData);
```

## Available Functions

### 1. syncCart()

Synchronize cart items with backend (for multi-device support)

```typescript
await api.syncCart(items: CartItem[]): Promise<{ success: boolean }>
```

**Parameters:**

- `items`: Array of cart items

**Returns:**

- `success`: Boolean indicating sync status

**Example:**

```typescript
const { success } = await api.syncCart([
  {
    id: "product-123",
    name: "Mbok Jamu Vest",
    price: 850000,
    quantity: 1,
    image: "/images/vest.jpg",
    size: "M",
  },
]);
```

---

### 2. createOrder()

Create a new order and initiate payment

```typescript
await api.createOrder(data: CheckoutData): Promise<PaymentResponse>
```

**Parameters:**

```typescript
{
  items: CartItem[],
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  },
  totalAmount: number
}
```

**Returns:**

```typescript
{
  success: boolean
  orderId: string
  paymentUrl?: string  // Xendit/Midtrans payment URL
  message?: string
}
```

**Example:**

```typescript
const response = await api.createOrder({
  items: cartItems,
  customerInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+62 812 3456 7890",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta",
    postalCode: "12190",
  },
  totalAmount: 850000,
});

if (response.success) {
  window.location.href = response.paymentUrl;
}
```

---

### 3. verifyPayment()

Verify payment status after user completes payment

```typescript
await api.verifyPayment(orderId: string): Promise<{ success: boolean; status: string }>
```

**Parameters:**

- `orderId`: The order ID to verify

**Returns:**

```typescript
{
  success: boolean;
  status: "paid" | "pending" | "failed" | "expired";
}
```

**Example:**

```typescript
const { success, status } = await api.verifyPayment("ORD-20251110-001");

if (success && status === "paid") {
  // Show success message
}
```

---

### 4. getOrder()

Retrieve order details

```typescript
await api.getOrder(orderId: string): Promise<OrderDetails>
```

**Parameters:**

- `orderId`: The order ID to fetch

**Returns:**

```typescript
{
  orderId: string
  status: string
  createdAt: string
  items: CartItem[]
  customerInfo: CustomerInfo
  total: number
  paymentMethod?: string
  shippingStatus?: string
}
```

**Example:**

```typescript
const order = await api.getOrder("ORD-20251110-001");
console.log(order.status); // 'paid'
```

---

## Mock Mode Details

### Console Logging

Mock mode logs all operations to browser console:

- 📦 Cart sync operations
- 💳 Order creation
- ✅ Payment verification
- 📄 Order retrieval

### Artificial Delays

Mock functions include realistic delays:

- `syncCart`: 500ms
- `createOrder`: 1500ms
- `verifyPayment`: 1000ms
- `getOrder`: 800ms

### Mock Responses

All mock functions return success responses:

- Orders always created successfully
- Payments always verified as 'paid'
- Order IDs generated with timestamp: `ORD-{timestamp}`

---

## Real API Mode

### Configuration

Set these in `.env.local`:

```bash
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://api.loopins.com/api
```

### Request Headers

All real API requests include:

```typescript
headers: {
  'Content-Type': 'application/json',
  // Add authentication when ready:
  // 'Authorization': `Bearer ${getAuthToken()}`
}
```

### Error Handling

All real API functions throw errors on failure:

```typescript
try {
  const response = await api.createOrder(data);
} catch (error) {
  console.error("API Error:", error);
  // Handle error
}
```

---

## TypeScript Types

### CartItem

```typescript
interface CartItem {
  id: string; // Unique item ID (product-id-size)
  name: string; // Product name
  price: number; // Price in IDR
  quantity: number; // Quantity ordered
  image: string; // Product image URL
  size?: string; // Selected size (optional)
  color?: string; // Selected color (optional)
}
```

### CheckoutData

```typescript
interface CheckoutData {
  items: CartItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  totalAmount: number;
}
```

### PaymentResponse

```typescript
interface PaymentResponse {
  success: boolean;
  orderId: string;
  paymentUrl?: string;
  message?: string;
}
```

---

## Debugging

### Check Current Mode

```typescript
import { isMockMode } from "@/lib/api";

if (isMockMode()) {
  console.log("Running in MOCK mode");
} else {
  console.log("Running in REAL API mode");
}
```

### Direct Access to Mock/Real

```typescript
import { mockAPI, realAPI } from "@/lib/api";

// Force mock mode for testing
const response = await mockAPI.createOrder(data);

// Force real API (even if mock is enabled)
const response = await realAPI.createOrder(data);
```

---

## Best Practices

### 1. Always Use Abstraction

❌ **Don't:**

```typescript
fetch('http://localhost:8000/api/orders/create', {...})
```

✅ **Do:**

```typescript
import { api } from "@/lib/api";
await api.createOrder(data);
```

### 2. Handle Errors Gracefully

```typescript
try {
  const response = await api.createOrder(data);
  if (response.success) {
    // Handle success
  }
} catch (error) {
  // Show user-friendly error message
  alert("Something went wrong. Please try again.");
}
```

### 3. Check Mock Mode in Development

```typescript
if (isMockMode()) {
  console.warn("⚠️ Running in mock mode - no real API calls");
}
```

### 4. Loading States

Always show loading state during API calls:

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await api.createOrder(data);
  } finally {
    setIsLoading(false);
  }
};
```

---

## Migration Guide

### From Mock to Real Backend

**Step 1**: Implement backend endpoints matching the API structure

**Step 2**: Update `.env.local`

```bash
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

**Step 3**: Test each endpoint

```bash
# Test sync cart
curl -X POST https://your-api.com/api/cart/sync \
  -H "Content-Type: application/json" \
  -d '{"items": [...]}'

# Test create order
curl -X POST https://your-api.com/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{"items": [...], "customerInfo": {...}, "totalAmount": 850000}'
```

**Step 4**: Restart Next.js server

```bash
npm run dev
```

**Step 5**: Test complete checkout flow in browser

---

## Common Issues

### Issue: API calls still using mock after setting NEXT_PUBLIC_USE_MOCK=false

**Solution**: Restart dev server. Environment variables are loaded at startup.

### Issue: CORS errors

**Solution**: Configure CORS on your backend to allow requests from `http://localhost:3000`

### Issue: 404 on API endpoints

**Solution**: Verify `NEXT_PUBLIC_API_URL` matches your backend URL exactly

### Issue: TypeScript errors on api imports

**Solution**: Check that all types are exported from `lib/api.ts`

---

**File**: `lib/api.ts`
**Last Updated**: November 10, 2025
