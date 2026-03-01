// API Service Layer - Easy to switch between mock and real backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

// Types
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

export interface CheckoutData {
  items: CartItem[]
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  totalAmount: number
}

export interface PaymentResponse {
  success: boolean
  orderId: string
  paymentUrl?: string
  message?: string
}

export interface MidtransSnapResponse {
  success: boolean
  data: {
    token: string
    redirectUrl: string
    orderId: string
    grossAmount: number
  }
}

// ==================== MOCK DATA ====================
const mockDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms))

const mockAPI = {
  // Sync cart with backend (for future multi-device sync)
  syncCart: async (items: CartItem[]): Promise<{ success: boolean }> => {
    await mockDelay(500)
    console.log('📦 [MOCK] Syncing cart to backend:', items)
    return { success: true }
  },

  // Create order and initiate payment
  createOrder: async (checkoutData: CheckoutData): Promise<PaymentResponse> => {
    await mockDelay(1500)
    console.log('💳 [MOCK] Creating order:', checkoutData)
    
    // Simulate order creation
    const orderId = `ORD-${Date.now()}`
    
    return {
      success: true,
      orderId,
      paymentUrl: `/payment/success?orderId=${orderId}`, // Mock payment URL
      message: 'Order created successfully (MOCK MODE)'
    }
  },

  // Verify payment status
  verifyPayment: async (orderId: string): Promise<{ success: boolean; status: string }> => {
    await mockDelay(1000)
    console.log('✅ [MOCK] Verifying payment for order:', orderId)
    
    return {
      success: true,
      status: 'paid' // Mock: always success
    }
  },

  // Get order details
  getOrder: async (orderId: string): Promise<any> => {
    await mockDelay(800)
    console.log('📄 [MOCK] Fetching order:', orderId)
    
    return {
      orderId,
      status: 'paid',
      createdAt: new Date().toISOString(),
      items: [],
      total: 0
    }
  },

  // Midtrans Snap payment token
  getMidtransToken: async (orderId: string, authToken?: string): Promise<MidtransSnapResponse> => {
    console.log('🎫 [MOCK->REAL] Calling real Midtrans API for order:', orderId)
    const response = await fetch(`${API_BASE_URL}/payments/snap/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` })
      }
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to get payment token')
    }
    return response.json()
  }
}

// ==================== REAL API ====================
const realAPI = {
  syncCart: async (items: CartItem[]): Promise<{ success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/cart/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token here when ready
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ items })
    })
    
    if (!response.ok) throw new Error('Failed to sync cart')
    return response.json()
  },

  createOrder: async (checkoutData: CheckoutData): Promise<PaymentResponse> => {
    const sessionId = `session-${Date.now()}`

    // Step 1: Create cart
    const cartRes = await fetch(`${API_BASE_URL}/carts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: null, sessionId })
    })
    if (!cartRes.ok) throw new Error('Failed to create cart')
    const cartData = await cartRes.json()
    const cartId = cartData.data.id

    // Step 2: Add items to cart
    for (const item of checkoutData.items) {
      const itemRes = await fetch(`${API_BASE_URL}/carts/${cartId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity
        })
      })
      if (!itemRes.ok) throw new Error(`Failed to add item ${item.name} to cart`)
    }

    // Step 3: Checkout
    const { name, email, phone, address, city, postalCode } = checkoutData.customerInfo
    const checkoutRes = await fetch(`${API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartId,
        userId: null,
        shippingAddress: `${address}, ${city}, ${postalCode}`,
        guestEmail: email,
        guestName: name,
        guestPhone: phone,
        originCity: 'jakarta',
        destinationCity: city.toLowerCase(),
        weightInKg: 1,
        bypassShipping: true,
        bypassPayment: false
      })
    })
    if (!checkoutRes.ok) throw new Error('Failed to checkout')
    const checkoutResult = await checkoutRes.json()

    return {
      success: true,
      orderId: checkoutResult.data.orderId,
      message: 'Order created successfully'
    }
  },

  verifyPayment: async (orderId: string): Promise<{ success: boolean; status: string }> => {
    const response = await fetch(`${API_BASE_URL}/payments/verify/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) throw new Error('Failed to verify payment')
    return response.json()
  },

  getOrder: async (orderId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) throw new Error('Failed to fetch order')
    return response.json()
  },

  // Midtrans Snap payment token
  getMidtransToken: async (orderId: string, authToken?: string): Promise<MidtransSnapResponse> => {
    const response = await fetch(`${API_BASE_URL}/payments/snap/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` })
      }
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to get payment token')
    }
    return response.json()
  }
}

// ==================== EXPORT API (Auto-switch) ====================
export const api = USE_MOCK ? mockAPI : realAPI

// Helper to check if using mock
export const isMockMode = () => USE_MOCK

// Export for direct access if needed
export { mockAPI, realAPI }