import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingCart, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { z } from 'zod';
import { Product } from '@/config/products';
import { RAZORPAY_KEY_ID } from '@/config/api';
import { createOrder, verifyPayment, reportPaymentFailure, type CustomerInfo, type VerifyPaymentResponse } from '@/services/payment';

// Add Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

const customerSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number'),
  email: z.string().trim().email('Enter a valid email').max(255),
});

interface CheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'form' | 'processing' | 'success' | 'error';

const CheckoutModal = ({ product, isOpen, onClose }: CheckoutModalProps) => {
  const [step, setStep] = useState<Step>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [result, setResult] = useState<VerifyPaymentResponse | null>(null);
  const [form, setForm] = useState<CustomerInfo>({ name: '', phone: '', email: '' });
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  const resetAndClose = () => {
    setStep('form');
    setErrors({});
    setGlobalError('');
    setResult(null);
    setForm({ name: '', phone: '', email: '' });
    setCurrentOrderId(null);
    onClose();
  };

  const handleSubmit = async () => {
    const parsed = customerSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    if (!product) return;

    const validatedCustomer = parsed.data;
    setStep('processing');
    setGlobalError('');

    try {
      // Create order on your backend
      const order = await createOrder({
        product_id: product.product_id,
        customer: validatedCustomer as CustomerInfo,
      });

      // Track the order ID for failure reporting
      setCurrentOrderId(order.order_id);

      // Initialize Razorpay
      console.log('Backend Order Response:', order);

      // Initialize Razorpay
      // INITIALIZE RAZORPAY WITH MINIMAL CONFIG
      const options = {
        key: RAZORPAY_KEY_ID,           // Live or Test Key ID from .env
        amount: order.amount,           // Amount in paise
        currency: 'INR',                // Explicitly INR
        name: 'ARK Learning Arena',
        description: order.product_name,
        order_id: order.order_id,       // Order ID from backend

        // CUSTOMER PREFILL (RESTORED DYNAMIC DATA)
        prefill: {
          name: validatedCustomer.name,
          email: validatedCustomer.email,
          contact: validatedCustomer.phone.replace(/\D/g, '').slice(-10), // Strict 10 digits
        },

        // UI CUSTOMIZATION
        theme: {
          color: '#0A1F3F',
        },

        // DISABLE RETRY (Reduces confusion)
        retry: {
          enabled: false,
        },

        // SUCCESS HANDLER
        handler: async function (response: any) {
          console.log('✅ Razorpay Payment Success:', response);

          try {
            const verifyResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResult.success) {
              setResult(verifyResult);
              setStep('success');
            } else {
              setGlobalError('Payment verification failed');
              setStep('error');
              // Report failure to backend
              reportPaymentFailure(response.razorpay_order_id, 'verification_failed');
            }
          } catch (err: any) {
            setGlobalError(err.message || 'Verification failed');
            setStep('error');
            // Report failure to backend
            reportPaymentFailure(response.razorpay_order_id, `verification_error: ${err.message || 'unknown'}`);
          }
        },

        // CLOSE HANDLER
        modal: {
          ondismiss: function () {
            console.log('❌ Checkout closed by user');
            setGlobalError('Payment cancelled');
            setStep('error');
            // Report cancellation to backend
            if (order.order_id) {
              reportPaymentFailure(order.order_id, 'user_cancelled');
            }
          },
        },
      };

      console.log('🚀 Opening Razorpay with Options:', options);

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      setGlobalError(err.message || 'Something went wrong');
      setStep('error');
    }
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && step !== 'processing' && resetAndClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card rounded-2xl w-full max-w-md shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="bg-ark-blue px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-ark-white flex items-center gap-2">
              <FaShoppingCart className="text-ark-yellow" />
              {step === 'success' ? 'Payment Successful!' : `Buy ${product.product_name}`}
            </h3>
            {step !== 'processing' && (
              <button onClick={resetAndClose} className="text-ark-white/60 hover:text-ark-white transition-colors">
                <FaTimes />
              </button>
            )}
          </div>

          <div className="p-6">
            {/* FORM STEP */}
            {step === 'form' && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-secondary text-center">
                  <p className="text-sm text-muted-foreground">
                    {product.type === 'bundle' ? 'Bundle' : 'Booklet'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">₹{product.display_price.toLocaleString('en-IN')}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    maxLength={100}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    maxLength={255}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-3"
                >
                  <FaShoppingCart /> Pay ₹{product.display_price.toLocaleString('en-IN')}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure payment via Razorpay. 100% safe & encrypted.
                </p>
              </div>
            )}

            {/* PROCESSING STEP */}
            {step === 'processing' && (
              <div className="text-center py-10 space-y-4">
                <FaSpinner className="text-4xl text-ark-yellow animate-spin mx-auto" />
                <p className="text-foreground font-semibold">Processing your payment…</p>
                <p className="text-sm text-muted-foreground">Please do not close this window.</p>
              </div>
            )}

            {/* SUCCESS STEP */}
            {step === 'success' && result && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-ark-yellow/20 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-3xl text-ark-yellow" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Payment Confirmed!</h4>

                <div className="bg-secondary rounded-lg p-4 space-y-2 text-left text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product</span>
                    <span className="font-medium text-foreground">{result.product_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium text-foreground">₹{(result.amount / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment ID</span>
                    <span className="font-medium text-foreground text-xs">{result.payment_id}</span>
                  </div>
                </div>

                <a
                  href={result.delivery_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 text-lg py-3"
                >
                  📥 Download Your {product.type === 'bundle' ? 'Bundle' : 'Booklet'}
                </a>

                <p className="text-xs text-muted-foreground">
                  A confirmation has been sent to your email and WhatsApp.
                </p>

                <button onClick={resetAndClose} className="text-sm text-muted-foreground hover:text-foreground underline">
                  Close
                </button>
              </div>
            )}

            {/* ERROR STEP */}
            {step === 'error' && (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="text-3xl text-amber-500" />
                </div>
                <h4 className="text-xl font-bold text-foreground">Payment Not Completed</h4>
                <p className="text-sm text-muted-foreground">{globalError}</p>

                <div className="bg-secondary rounded-lg p-3 text-left text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground text-sm">📧 Check your email for retry instructions.</p>
                  <p>We've sent you an email with a direct retry link. You can also try again below.</p>
                </div>

                <button
                  onClick={() => { setStep('form'); setGlobalError(''); setCurrentOrderId(null); }}
                  className="btn-primary w-full py-3"
                >
                  🔄 Try Again
                </button>
                <button onClick={resetAndClose} className="text-sm text-muted-foreground hover:text-foreground underline">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;