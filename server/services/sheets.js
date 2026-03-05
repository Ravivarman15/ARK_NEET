// ============================================
// Google Sheets — Append Transaction Row
// ============================================

import { google } from 'googleapis';
import fs from 'fs';

let sheetsClient;

async function getSheetsClient() {
    if (sheetsClient) return sheetsClient;

    const credPath = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!credPath || !sheetId || !fs.existsSync(credPath)) {
        console.warn('⚠️  Google Sheets credentials not configured — skipping');
        return null;
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: credPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheetsClient = google.sheets({ version: 'v4', auth });
    return sheetsClient;
}

/**
 * Append a transaction row to the configured Google Sheet.
 * Sheet must have a tab named "Transactions".
 */
export async function appendToSheet({
    orderId,
    paymentId,
    productId,
    productName,
    amount,
    customerName,
    customerPhone,
    customerEmail,
    deliveryLink,
    timestamp,
}) {
    const sheets = await getSheetsClient();
    if (!sheets) {
        return { success: false, error: 'Google Sheets not configured' };
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const amountINR = (amount / 100).toFixed(2);

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: 'Transactions!A:J',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[
                    timestamp || new Date().toISOString(),
                    orderId,
                    paymentId,
                    productId,
                    productName,
                    `₹${amountINR}`,
                    customerName,
                    customerPhone,
                    customerEmail,
                    deliveryLink,
                ]],
            },
        });

        console.log('✅ Google Sheet row appended for order', orderId);
        return { success: true };
    } catch (err) {
        console.error('❌ Google Sheets error:', err.message);
        return { success: false, error: err.message };
    }
}
