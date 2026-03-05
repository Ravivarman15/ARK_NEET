import 'dotenv/config';
import { sendConfirmationEmail } from './services/email.js';

console.log('📧 Testing Brevo Email System...');
console.log('Brevo API Key:', process.env.BREVO_API_KEY ? '✅ Configured' : '❌ NOT SET');

async function test() {
    const result = await sendConfirmationEmail({
        email: 'automation@thearktuition.com', // Send to self to test
        name: 'Admin Test',
        productName: 'TEST PRODUCT',
        amount: 10000,
        paymentId: 'pay_test_123',
        orderId: 'order_test_123',
        deliveryLink: 'https://example.com'
    });

    if (result.success) {
        console.log('✅ Email Delivered Successfully via Brevo!');
    } else {
        console.error('❌ Email Failed:', result.error);
    }
}

test();
