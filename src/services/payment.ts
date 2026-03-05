import { API_BASE_URL, RAZORPAY_KEY_ID } from '@/config/api';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface CreateOrderRequest {
  product_id: string;
  customer: CustomerInfo;
}

export interface CreateOrderResponse {
  order_id: string;
  amount: number; // in paise
  currency: string;
  product_name: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  product_name: string;
  amount: number;
  payment_id: string;
  delivery_link: string;
  message: string;
}

export async function createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
  const res = await fetch(`${API_BASE_URL}/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to create order' }));
    throw new Error(err.error || 'Failed to create order');
  }

  return res.json();
}

export async function verifyPayment(data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
  const res = await fetch(`${API_BASE_URL}/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Payment verification failed' }));
    throw new Error(err.error || 'Payment verification failed');
  }

  return res.json();
}

/**
 * Report a payment failure to the backend.
 * Fire-and-forget — does not throw on failure.
 */
export async function reportPaymentFailure(orderId: string, reason: string): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/payment-failed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, reason }),
    });
  } catch {
    // Silently fail — this is a best-effort notification
    console.error('Failed to report payment failure to backend');
  }
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay'));
    document.body.appendChild(script);
  });
}

export interface PaymentResult {
  success: boolean;
  data?: VerifyPaymentResponse;
  error?: string;
}

export async function initiatePayment(
  order: CreateOrderResponse,
  customer: CustomerInfo
): Promise<PaymentResult> {
  await loadRazorpayScript();

  return new Promise((resolve) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'ARK Learning Arena',
      description: order.product_name,
      order_id: order.order_id,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: {
        color: '#0A1F3F',
      },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        try {
          const verification = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          resolve({ success: true, data: verification });
        } catch (err: any) {
          resolve({ success: false, error: err.message || 'Verification failed' });
        }
      },
      modal: {
        ondismiss: () => {
          resolve({ success: false, error: 'Payment cancelled' });
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  });
}
