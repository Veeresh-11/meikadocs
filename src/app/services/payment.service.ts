/**
 * Payment Service
 * Handles Razorpay integration and payment processing
 */

import { api, type ApiResponse } from '../utils/api-client';

// Request types
export interface CreateOrderRequest {
  planType: 'pro' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
  couponCode?: string;
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Response types
export interface Order {
  id: string;
  orderId: string; // Razorpay order ID
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed' | 'cancelled';
  createdAt: string;
}

export interface PaymentHistory {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  planType: string;
  billingCycle: string;
  createdAt: string;
  paidAt?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  downloadUrl: string;
}

/**
 * Payment service for Razorpay integration
 */
export const paymentService = {
  /**
   * Create a new payment order
   */
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    try {
      const response = await api.post<Order>('/payment/create-order', data);
      return response.data;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  },

  /**
   * Verify payment after Razorpay success
   */
  verifyPayment: async (data: PaymentVerification): Promise<{ success: boolean; licenseKey?: string }> => {
    try {
      const response = await api.post<{ success: boolean; licenseKey?: string }>('/payment/verify', data);
      return response.data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  },

  /**
   * Get user's payment history
   */
  getPaymentHistory: async (): Promise<PaymentHistory[]> => {
    try {
      const response = await api.get<PaymentHistory[]>('/payment/history');
      return response.data;
    } catch (error) {
      console.error('Get payment history error:', error);
      throw error;
    }
  },

  /**
   * Get invoice by ID
   */
  getInvoice: async (invoiceId: string): Promise<Blob> => {
    try {
      // For blob responses, we need to use fetch directly
      const token = localStorage.getItem('auth_token');
      const baseURL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000';
      const version = import.meta.env?.VITE_API_VERSION || 'v1';
      
      const response = await fetch(`${baseURL}/api/${version}/payment/invoice/${invoiceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }

      return await response.blob();
    } catch (error) {
      console.error('Get invoice error:', error);
      throw error;
    }
  },

  /**
   * Download invoice as PDF
   */
  downloadInvoice: async (invoiceId: string, filename: string = 'invoice.pdf'): Promise<void> => {
    try {
      const blob = await paymentService.getInvoice(invoiceId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download invoice error:', error);
      throw error;
    }
  },

  /**
   * Apply coupon code
   */
  validateCoupon: async (couponCode: string): Promise<{ valid: boolean; discount: number }> => {
    try {
      const response = await api.post<{ valid: boolean; discount: number }>('/payment/validate-coupon', { couponCode });
      return response.data;
    } catch (error) {
      console.error('Validate coupon error:', error);
      throw error;
    }
  },

  /**
   * Initialize Razorpay checkout
   */
  initializeRazorpay: (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  /**
   * Get pricing for a plan
   */
  getPricing: async (planType: 'pro' | 'enterprise', billingCycle: 'monthly' | 'yearly'): Promise<{ amount: number; currency: string }> => {
    try {
      const response = await api.get<{ amount: number; currency: string }>(`/payment/pricing?plan=${planType}&cycle=${billingCycle}`);
      return response.data;
    } catch (error) {
      console.error('Get pricing error:', error);
      throw error;
    }
  },
};

export default paymentService;

/**
 * Razorpay types for TypeScript
 */
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
