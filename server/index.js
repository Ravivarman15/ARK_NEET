// ============================================
// ARK NEET Launchpad — Express Backend Server
// LIVE Payment Flow with Zapier Webhook
// NO DATABASE — All data goes to Zapier → Google Sheets
// ============================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import Razorpay from 'razorpay';

import PRODUCTS from './products.js';
import { sendWhatsAppMessage } from './services/whatsapp.js';
import { sendConfirmationEmail, sendWelcomeEmail, sendFreeKitEmail, sendPaymentFailureEmail } from './services/email.js';
import { appendToSheet } from './services/sheets.js';
import { sendToZapier } from './services/zapier.js';

// ============================================
// Configuration Validation
// ============================================

const REQUIRED_ENV = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];

for (const key of REQUIRED_ENV) {
    if (!process.env[key]) {
        console.error(`❌ Missing required environment variable: ${key}`);
        process.exit(1);
    }
}

if (!process.env.ZAPIER_WEBHOOK_URL) {
    console.warn('⚠️  ZAPIER_WEBHOOK_URL not set — webhook data will not be sent');
}

if (!process.env.BREVO_API_KEY) {
    console.warn('⚠️  BREVO_API_KEY not set — emails will not be sent');
}

// ============================================
// Product Catalog Validation
// ============================================

(function validateProducts() {
    const ids = Object.keys(PRODUCTS);
    const idSet = new Set(ids);
    if (idSet.size !== ids.length) {
        console.error('❌ [STARTUP_ERROR] Duplicate product_id detected in products.js!');
        process.exit(1);
    }
    for (const [id, product] of Object.entries(PRODUCTS)) {
        if (!product.delivery_link || product.delivery_link.trim() === '') {
            console.error(`❌ [STARTUP_ERROR] Product '${id}' has an empty delivery_link!`);
            process.exit(1);
        }
        if (product.delivery_link.includes('your-') || product.delivery_link.includes('placeholder')) {
            console.warn(`⚠️  [STARTUP_WARNING] Product '${id}' has a placeholder delivery_link — update before going live!`);
        }
        if (product.delivery_link !== product.delivery_link.trim()) {
            console.error(`❌ [STARTUP_ERROR] Product '${id}' delivery_link has trailing/leading whitespace!`);
            process.exit(1);
        }
        if (typeof product.price !== 'number' || product.price <= 0) {
            console.error(`❌ [STARTUP_ERROR] Product '${id}' has invalid price: ${product.price}`);
            process.exit(1);
        }
    }
    console.log(`✅ [STARTUP] ${ids.length} products validated successfully.`);
})();

const PORT = parseInt(process.env.PORT || '4000', 10);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

// ============================================
// In-Memory Failure Email Deduplication
// (Replaces SQLite hasFailureEmailSent)
// ============================================

const failureEmailTracker = new Set();

// ============================================
// Razorpay Client (LIVE)
// ============================================

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ============================================
// Express App
// ============================================

const app = express();

// CORS — allow frontend origin
app.use(cors({
    origin: [FRONTEND_URL, 'http://localhost:8080', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Parse JSON for all routes EXCEPT the webhook (which needs raw body)
app.use((req, res, next) => {
    if (req.path === '/webhook/razorpay') {
        return next(); // Skip JSON parsing — webhook uses express.raw()
    }
    express.json()(req, res, next);
});

// ============================================
// Root Health Check
// ============================================

app.get('/', (_req, res) => {
    res.json({
        status: 'ARK NEET Backend Running',
        service: 'Payments + Email + Zapier API',
        environment: process.env.NODE_ENV || 'production',
    });
});

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/test', (_req, res) => {
    res.json({
        message: 'API working correctly',
        timestamp: new Date().toISOString(),
        server: 'ARK NEET Launchpad Backend',
    });
});

// ============================================
// POST /create-order
// ============================================
// Frontend sends: { product_id, customer: { name, phone, email } }
// Server looks up product, creates Razorpay order, returns order_id.
// ============================================

app.post('/create-order', async (req, res) => {
    try {
        const { product_id, customer } = req.body;

        // Validate input
        if (!product_id || !customer?.name || !customer?.phone || !customer?.email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Look up product (server is source of truth)
        const product = PRODUCTS[product_id];
        if (!product) {
            return res.status(400).json({ error: 'Invalid product_id' });
        }

        // Create Razorpay order (amount in paise)
        const amountPaise = product.price * 100;

        const orderOptions = {
            amount: amountPaise,
            currency: 'INR',
            receipt: `rcpt_${product_id}_${Date.now()}`,
            notes: {
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                product_id: product_id,
            },
        };

        console.log(`[ORDER_CREATING] product_id=${product_id} customer=${customer.email} amount_paise=${amountPaise}`);

        const order = await razorpay.orders.create(orderOptions);

        // Send Welcome Email (fire & forget)
        sendWelcomeEmail({
            email: customer.email,
            name: customer.name
        })
            .then(result => {
                if (!result.success) console.error('⚠️ Welcome email failed:', result.error);
                else console.log(`📧 Welcome email sent to ${customer.email}`);
            })
            .catch(err => console.error('⚠️ Welcome email error:', err.message));

        console.log(`[ORDER_CREATED] order_id=${order.id} product=${product.product_name} price=₹${product.price} customer=${customer.email}`);

        return res.json({
            order_id: order.id,
            amount: amountPaise,
            currency: 'INR',
            product_name: product.product_name,
        });
    } catch (err) {
        console.error('❌ Create order error:', err.message);
        return res.status(500).json({ error: 'Failed to create order. Please try again.' });
    }
});

// ============================================
// POST /api/leads/free-kit
// ============================================
app.post('/api/leads/free-kit', async (req, res) => {
    try {
        const { name, email, class: userClass } = req.body;

        if (!name || !email || !userClass) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log(`✅ Lead captured: ${email} (${name})`);

        // Send Email (fire and forget)
        let emailStatus = 'pending';

        sendFreeKitEmail({ email, name })
            .then(result => {
                emailStatus = result.success ? 'sent' : 'failed';
                if (!result.success) console.error(`❌ Failed to send kit email to ${email}: ${result.error}`);
                else console.log(`📧 Kit email sent to ${email}`);

                // Send to Zapier after email attempt
                sendToZapier({
                    timestamp: new Date().toISOString(),
                    name,
                    email,
                    phone: '',
                    product_id: 'free_kit',
                    product_name: 'FREE NEET KIT',
                    amount: 0,
                    payment_id: '',
                    order_id: '',
                    status: 'free_kit',
                    email_status: emailStatus,
                }).catch(err => console.error(`[ZAPIER_ERROR] free_kit email=${email} error=${err.message}`));
            })
            .catch(err => {
                console.error(`❌ Email dispatch error for ${email}:`, err);

                // Still send to Zapier even if email failed
                sendToZapier({
                    timestamp: new Date().toISOString(),
                    name,
                    email,
                    phone: '',
                    product_id: 'free_kit',
                    product_name: 'FREE NEET KIT',
                    amount: 0,
                    payment_id: '',
                    order_id: '',
                    status: 'free_kit',
                    email_status: 'failed',
                }).catch(zapErr => console.error(`[ZAPIER_ERROR] free_kit email=${email} error=${zapErr.message}`));
            });

        return res.json({ success: true, message: 'Lead captured and email dispatching' });

    } catch (err) {
        console.error('❌ Lead capture error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// POST /api/leads/rank-prediction
// ============================================
// Captures lead from Rank Prediction form.
// Sends to Zapier with status = "rank_prediction".
// ============================================

const rankPredictionTracker = new Set();

app.post('/api/leads/rank-prediction', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Missing required fields: name, email, phone' });
        }

        // Deduplication — prevent duplicate submissions (e.g. user refreshes)
        const dedupKey = `${email.toLowerCase().trim()}`;
        if (rankPredictionTracker.has(dedupKey)) {
            console.log(`[RANK_PREDICTION_DUPLICATE] email=${email} — already submitted, skipping webhook`);
            return res.json({ success: true, message: 'Already captured' });
        }

        rankPredictionTracker.add(dedupKey);
        console.log(`✅ Rank prediction lead captured: ${email} (${name})`);

        // Send to Zapier (fire and forget — do NOT block result display)
        sendToZapier({
            timestamp: new Date().toISOString(),
            name,
            email,
            phone,
            product_id: 'rank_prediction',
            product_name: 'NEET Rank Prediction',
            amount: 0,
            payment_id: '',
            order_id: '',
            status: 'rank_prediction',
            email_status: 'not_applicable',
        })
            .then(result => {
                if (result.success) console.log(`[ZAPIER_SENT] rank_prediction email=${email}`);
                else console.error(`[ZAPIER_FAILED] rank_prediction email=${email} error=${result.error}`);
            })
            .catch(err => console.error(`[ZAPIER_ERROR] rank_prediction email=${email} error=${err.message}`));

        return res.json({ success: true, message: 'Lead captured' });

    } catch (err) {
        console.error('❌ Rank prediction lead error:', err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// ============================================
// POST /verify-payment
// ============================================
// Frontend sends: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Server verifies signature → runs fulfilment → returns success + delivery_link.
// ============================================

app.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing payment details' });
        }

        // ---- Step 1: Verify Signature ----
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            console.error(`[PAYMENT_VERIFICATION_FAILED] order_id=${razorpay_order_id} reason=signature_mismatch`);

            // Fire & forget: send failure email and webhook
            (async () => {
                try {
                    const order = await razorpay.orders.fetch(razorpay_order_id);
                    const notes = order.notes || {};
                    const productId = notes.product_id;
                    const product = PRODUCTS[productId];

                    if (product && notes.email && !failureEmailTracker.has(razorpay_order_id)) {
                        const retryUrl = `${FRONTEND_URL}/?retry=${productId}`;
                        const emailResult = await sendPaymentFailureEmail({
                            email: notes.email,
                            name: notes.name || 'Student',
                            productName: product.product_name,
                            amount: order.amount,
                            retryUrl,
                        });

                        if (emailResult.success) {
                            failureEmailTracker.add(razorpay_order_id);
                        }

                        // Send failure data to Zapier
                        sendToZapier({
                            timestamp: new Date().toISOString(),
                            name: notes.name || '',
                            email: notes.email,
                            phone: notes.phone || '',
                            product_id: productId,
                            product_name: product.product_name,
                            amount: product.price,
                            payment_id: razorpay_payment_id || '',
                            order_id: razorpay_order_id,
                            status: 'failed',
                            email_status: emailResult.success ? 'sent' : 'failed',
                        }).catch(err => console.error(`[ZAPIER_ERROR] order_id=${razorpay_order_id} error=${err.message}`));
                    }
                } catch (e) {
                    console.error(`[FAILURE_HANDLING_ERROR] order_id=${razorpay_order_id} error=${e.message}`);
                }
            })();

            return res.status(400).json({ error: 'Payment verification failed — invalid signature' });
        }

        console.log(`[PAYMENT_VERIFIED] order_id=${razorpay_order_id} payment_id=${razorpay_payment_id} result=SUCCESS`);

        // ---- Step 2: Fetch Order from Razorpay to get notes ----
        const order = await razorpay.orders.fetch(razorpay_order_id);
        const notes = order.notes || {};
        const productId = notes.product_id;
        const customerName = notes.name;
        const customerPhone = notes.phone;
        const customerEmail = notes.email;

        if (!productId || !PRODUCTS[productId]) {
            console.error('❌ Product not found in order notes:', productId);
            return res.status(400).json({ error: 'Product mapping error' });
        }

        const product = PRODUCTS[productId];

        // ---- Step 3: Google Sheets (fire and forget) ----
        appendToSheet({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            productId: product.product_id,
            productName: product.product_name,
            amount: order.amount,
            customerName,
            customerPhone,
            customerEmail,
            deliveryLink: product.delivery_link,
            timestamp: new Date().toISOString(),
        })
            .then((result) => {
                if (result.success) console.log(`[SHEET_APPENDED] order_id=${razorpay_order_id}`);
            })
            .catch((err) => console.error(`[SHEET_ERROR] order_id=${razorpay_order_id} error=${err.message}`));

        // ---- Step 4: WhatsApp via Interakt (fire and forget) ----
        sendWhatsAppMessage({
            phone: customerPhone,
            name: customerName,
            deliveryLink: product.delivery_link,
        })
            .then((result) => {
                if (result.success) console.log(`[WHATSAPP_SENT] order_id=${razorpay_order_id} phone=${customerPhone}`);
            })
            .catch((err) => console.error(`[WHATSAPP_ERROR] order_id=${razorpay_order_id} error=${err.message}`));

        // ---- Step 5: Email (fire and forget, then Zapier) ----
        sendConfirmationEmail({
            email: customerEmail,
            name: customerName,
            productName: product.product_name,
            amount: order.amount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            deliveryLink: product.delivery_link,
        })
            .then((result) => {
                const emailStatus = result.success ? 'sent' : 'failed';
                if (result.success) console.log(`[EMAIL_SENT] order_id=${razorpay_order_id} email=${customerEmail}`);

                // ---- Step 6: Send to Zapier after email attempt ----
                sendToZapier({
                    timestamp: new Date().toISOString(),
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    product_id: product.product_id,
                    product_name: product.product_name,
                    amount: product.price,
                    payment_id: razorpay_payment_id,
                    order_id: razorpay_order_id,
                    status: 'success',
                    email_status: emailStatus,
                }).catch(err => console.error(`[ZAPIER_ERROR] order_id=${razorpay_order_id} error=${err.message}`));
            })
            .catch((err) => {
                console.error(`[EMAIL_ERROR] order_id=${razorpay_order_id} error=${err.message}`);

                // Still send to Zapier even if email failed
                sendToZapier({
                    timestamp: new Date().toISOString(),
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    product_id: product.product_id,
                    product_name: product.product_name,
                    amount: product.price,
                    payment_id: razorpay_payment_id,
                    order_id: razorpay_order_id,
                    status: 'success',
                    email_status: 'failed',
                }).catch(zapErr => console.error(`[ZAPIER_ERROR] order_id=${razorpay_order_id} error=${zapErr.message}`));
            });

        console.log(`[FULFILMENT_COMPLETED] order_id=${razorpay_order_id} product=${product.product_name} payment_id=${razorpay_payment_id}`);

        // ---- Step 7: Return success to frontend ----
        return res.json({
            success: true,
            product_name: product.product_name,
            amount: order.amount,
            payment_id: razorpay_payment_id,
            delivery_link: product.delivery_link,
            message: 'Payment verified and fulfilment started',
        });
    } catch (err) {
        console.error('❌ Verify payment error:', err.message);
        return res.status(500).json({ error: 'Payment verification failed. Please contact support.' });
    }
});

// ============================================
// POST /payment-failed
// ============================================
// Frontend reports: user dismissed Razorpay, or payment_failed event.
// Sends retry email (deduplicated) and logs to Zapier.
// ============================================

app.post('/payment-failed', async (req, res) => {
    try {
        const { order_id, reason } = req.body;

        if (!order_id) {
            return res.status(400).json({ error: 'Missing order_id' });
        }

        // Check if we already sent a failure email for this order (in-memory dedup)
        if (failureEmailTracker.has(order_id)) {
            console.log(`[PAYMENT_FAILED_DUPLICATE] order_id=${order_id} — failure email already sent, skipping`);
            return res.json({ success: true, message: 'Already handled' });
        }

        // Fetch order from Razorpay to get customer + product info
        let order;
        try {
            order = await razorpay.orders.fetch(order_id);
        } catch (fetchErr) {
            console.error(`[PAYMENT_FAILED_FETCH_ERROR] order_id=${order_id} error=${fetchErr.message}`);
            return res.status(400).json({ error: 'Invalid order_id' });
        }

        const notes = order.notes || {};
        const productId = notes.product_id;
        const product = PRODUCTS[productId];

        if (!product) {
            console.error(`[PAYMENT_FAILED_NO_PRODUCT] order_id=${order_id} product_id=${productId}`);
            return res.status(400).json({ error: 'Product not found' });
        }

        const failureReason = reason || 'user_cancelled';
        console.log(`[PAYMENT_FAILED_LOGGED] order_id=${order_id} reason=${failureReason}`);

        // Send failure email (fire & forget, then Zapier)
        if (notes.email) {
            const retryUrl = `${FRONTEND_URL}/?retry=${productId}`;
            sendPaymentFailureEmail({
                email: notes.email,
                name: notes.name || 'Student',
                productName: product.product_name,
                amount: order.amount,
                retryUrl,
            })
                .then((result) => {
                    const emailStatus = result.success ? 'sent' : 'failed';
                    if (result.success) {
                        failureEmailTracker.add(order_id);
                        console.log(`[FAILURE_EMAIL_SENT] order_id=${order_id} email=${notes.email}`);
                    }

                    // Send failure data to Zapier
                    sendToZapier({
                        timestamp: new Date().toISOString(),
                        name: notes.name || '',
                        email: notes.email,
                        phone: notes.phone || '',
                        product_id: productId,
                        product_name: product.product_name,
                        amount: product.price,
                        payment_id: '',
                        order_id: order_id,
                        status: 'failed',
                        email_status: emailStatus,
                    }).catch(err => console.error(`[ZAPIER_ERROR] order_id=${order_id} error=${err.message}`));
                })
                .catch((err) => {
                    console.error(`[FAILURE_EMAIL_ERROR] order_id=${order_id} error=${err.message}`);

                    // Still send to Zapier
                    sendToZapier({
                        timestamp: new Date().toISOString(),
                        name: notes.name || '',
                        email: notes.email || '',
                        phone: notes.phone || '',
                        product_id: productId,
                        product_name: product.product_name,
                        amount: product.price,
                        payment_id: '',
                        order_id: order_id,
                        status: 'failed',
                        email_status: 'failed',
                    }).catch(zapErr => console.error(`[ZAPIER_ERROR] order_id=${order_id} error=${zapErr.message}`));
                });
        }

        return res.json({ success: true, message: 'Failure recorded' });
    } catch (err) {
        console.error(`[PAYMENT_FAILED_ERROR] error=${err.message}`);
        return res.status(500).json({ error: 'Failed to process payment failure' });
    }
});

// ============================================
// POST /webhook/razorpay
// ============================================
// Razorpay sends webhook for payment.failed events.
// Validates webhook signature, sends retry email, logs to Zapier.
// ============================================

app.post('/webhook/razorpay', express.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.warn('[WEBHOOK] RAZORPAY_WEBHOOK_SECRET not configured — skipping webhook');
            return res.status(200).json({ status: 'skipped' });
        }

        // Verify webhook signature
        const receivedSignature = req.headers['x-razorpay-signature'];
        const body = typeof req.body === 'string' ? req.body : req.body.toString();
        const expectedSig = crypto
            .createHmac('sha256', webhookSecret)
            .update(body)
            .digest('hex');

        if (expectedSig !== receivedSignature) {
            console.error('[WEBHOOK_SIGNATURE_FAILED] Invalid webhook signature');
            return res.status(400).json({ error: 'Invalid signature' });
        }

        const event = JSON.parse(body);
        const eventType = event.event;

        if (eventType !== 'payment.failed') {
            // We only handle payment.failed; acknowledge others
            return res.status(200).json({ status: 'ignored', event: eventType });
        }

        console.log(`[WEBHOOK_RECEIVED] event=${eventType}`);

        const payment = event.payload?.payment?.entity;
        if (!payment) {
            return res.status(200).json({ status: 'no_payment_entity' });
        }

        const orderId = payment.order_id;
        const paymentId = payment.id;
        const errorCode = payment.error_code || 'unknown';
        const errorDescription = payment.error_description || 'Payment failed';

        // Check duplicate (in-memory)
        if (failureEmailTracker.has(orderId)) {
            console.log(`[WEBHOOK_DUPLICATE] order_id=${orderId} — already handled`);
            return res.status(200).json({ status: 'already_handled' });
        }

        // Fetch order for notes
        let order;
        try {
            order = await razorpay.orders.fetch(orderId);
        } catch (fetchErr) {
            console.error(`[WEBHOOK_FETCH_ERROR] order_id=${orderId} error=${fetchErr.message}`);
            return res.status(200).json({ status: 'fetch_error' });
        }

        const notes = order.notes || {};
        const productId = notes.product_id;
        const product = PRODUCTS[productId];

        if (!product || !notes.email) {
            console.error(`[WEBHOOK_NO_PRODUCT] order_id=${orderId} product_id=${productId}`);
            return res.status(200).json({ status: 'product_not_found' });
        }

        console.log(`[WEBHOOK_FAILURE_LOGGED] order_id=${orderId} payment_id=${paymentId} reason=${errorCode}`);

        // Send failure email
        const retryUrl = `${FRONTEND_URL}/?retry=${productId}`;
        sendPaymentFailureEmail({
            email: notes.email,
            name: notes.name || 'Student',
            productName: product.product_name,
            amount: order.amount,
            retryUrl,
        })
            .then((result) => {
                const emailStatus = result.success ? 'sent' : 'failed';
                if (result.success) {
                    failureEmailTracker.add(orderId);
                    console.log(`[WEBHOOK_EMAIL_SENT] order_id=${orderId}`);
                }

                // Send to Zapier
                sendToZapier({
                    timestamp: new Date().toISOString(),
                    name: notes.name || '',
                    email: notes.email,
                    phone: notes.phone || '',
                    product_id: productId,
                    product_name: product.product_name,
                    amount: product.price,
                    payment_id: paymentId || '',
                    order_id: orderId,
                    status: 'failed',
                    email_status: emailStatus,
                }).catch(err => console.error(`[ZAPIER_ERROR] order_id=${orderId} error=${err.message}`));
            })
            .catch((err) => {
                console.error(`[WEBHOOK_EMAIL_ERROR] order_id=${orderId} error=${err.message}`);

                // Still send to Zapier
                sendToZapier({
                    timestamp: new Date().toISOString(),
                    name: notes.name || '',
                    email: notes.email,
                    phone: notes.phone || '',
                    product_id: productId,
                    product_name: product.product_name,
                    amount: product.price,
                    payment_id: paymentId || '',
                    order_id: orderId,
                    status: 'failed',
                    email_status: 'failed',
                }).catch(zapErr => console.error(`[ZAPIER_ERROR] order_id=${orderId} error=${zapErr.message}`));
            });

        return res.status(200).json({ status: 'processed' });
    } catch (err) {
        console.error(`[WEBHOOK_ERROR] error=${err.message}`);
        return res.status(500).json({ error: 'Webhook processing failed' });
    }
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
    console.log(`🚀 ARK NEET Launchpad server running`);
    console.log(`   Port: ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`   Frontend URL: ${FRONTEND_URL}`);
    console.log(`   Razorpay Key: ${process.env.RAZORPAY_KEY_ID ? 'Configured ✅' : 'NOT SET ⚠️'}`);
    console.log(`   Brevo Email: ${process.env.BREVO_API_KEY ? 'Configured ✅' : 'NOT SET ⚠️'}`);
    console.log(`   Zapier Webhook: ${process.env.ZAPIER_WEBHOOK_URL ? 'Configured ✅' : 'NOT SET ⚠️'}`);
    console.log(`   Database: NONE (all data → Zapier → Google Sheets)`);
});
