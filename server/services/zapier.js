// ============================================
// Zapier Webhook — Send Data to Google Sheets
// ============================================
// All transaction, lead, and payment data is sent
// directly to Zapier via webhook. No local DB.
// ============================================

/**
 * Send data to Zapier webhook.
 *
 * @param {Object} data — must follow the strict JSON structure:
 *   { timestamp, name, email, phone, product_id, product_name,
 *     amount, payment_id, order_id, status, email_status }
 *
 * @returns {{ success: boolean, error?: string }}
 */
export async function sendToZapier(data) {
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn('⚠️  ZAPIER_WEBHOOK_URL not configured — skipping webhook');
        return { success: false, error: 'ZAPIER_WEBHOOK_URL not configured' };
    }

    // Validate required fields
    const required = ['timestamp', 'name', 'email', 'status'];
    for (const field of required) {
        if (data[field] === undefined || data[field] === null) {
            console.error(`❌ [ZAPIER] Missing required field: ${field}`);
            return { success: false, error: `Missing required field: ${field}` };
        }
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            console.error(`❌ [ZAPIER] HTTP ${response.status}: ${text}`);
            return { success: false, error: `HTTP ${response.status}` };
        }

        console.log(`✅ [ZAPIER] Data sent successfully — status=${data.status} email=${data.email}`);
        return { success: true };
    } catch (err) {
        if (err.name === 'AbortError') {
            console.error('❌ [ZAPIER] Request timed out (10s)');
            return { success: false, error: 'Request timed out' };
        }
        console.error(`❌ [ZAPIER] Webhook error: ${err.message}`);
        return { success: false, error: err.message };
    }
}
