// ============================================
// WhatsApp Notification via Interakt API
// ============================================

const INTERAKT_API_KEY = process.env.INTERAKT_API_KEY;
const INTERAKT_BASE_URL = process.env.INTERAKT_BASE_URL || 'https://api.interakt.ai/v1/public';

/**
 * Send a WhatsApp template message via Interakt.
 * Template must be pre-approved on Interakt dashboard.
 *
 * Template body parameters:
 *   {{1}} = customer name
 *   {{2}} = delivery link
 */
export async function sendWhatsAppMessage({ phone, name, deliveryLink }) {
    if (!INTERAKT_API_KEY) {
        console.warn('⚠️  INTERAKT_API_KEY not set — skipping WhatsApp');
        return { success: false, error: 'API key not configured' };
    }

    try {
        // Ensure phone is digits-only 91XXXXXXXXXX for Interakt
        let digits = phone.replace(/\D/g, ''); // Strip all non-digits
        if (digits.startsWith('91') && digits.length === 12) {
            // Already 91XXXXXXXXXX
        } else if (digits.length === 10) {
            digits = `91${digits}`;
        } else if (digits.startsWith('0') && digits.length === 11) {
            digits = `91${digits.slice(1)}`;
        }
        const formattedPhone = digits;

        const payload = {
            countryCode: '+91',
            phoneNumber: formattedPhone,
            callbackData: 'payment_confirmation',
            type: 'Template',
            template: {
                name: 'payment_success',         // Must match your Interakt template name
                languageCode: 'en',
                bodyValues: [name, deliveryLink], // {{1}} = name, {{2}} = link
            },
        };

        const response = await fetch(`${INTERAKT_BASE_URL}/message/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${INTERAKT_API_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ WhatsApp sent to', formattedPhone);
            return { success: true, data };
        } else {
            console.error('❌ WhatsApp failed:', data);
            return { success: false, error: data };
        }
    } catch (err) {
        console.error('❌ WhatsApp error:', err.message);
        return { success: false, error: err.message };
    }
}
