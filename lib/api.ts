// API Service Layer - Easy to switch between mock and real backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true // Set to false when backend is ready

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
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData)
    })
    
    if (!response.ok) throw new Error('Failed to create order')
    return response.json()
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
  }
}

// ==================== EXPORT API (Auto-switch) ====================
export const api = USE_MOCK ? mockAPI : realAPI

// Helper to check if using mock
export const isMockMode = () => USE_MOCK

// Export for direct access if needed
export { mockAPI, realAPI }