// ============================================
// Email Notification via Brevo Transactional API
// ============================================

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER_EMAIL = 'automation@thearktuition.com';
const SENDER_NAME = 'ARK Learning Arena';

/**
 * Reusable email sender via Brevo transactional API.
 * @param {{ to: string, subject: string, html: string }} options
 * @returns {Promise<{ success: boolean, messageId?: string, error?: string }>}
 */
async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn('⚠️  BREVO_API_KEY not configured — email will be skipped');
    return { success: false, error: 'Brevo API key not configured' };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`✅ Email sent to ${to} via Brevo — messageId: ${data.messageId}`);
      return { success: true, messageId: data.messageId };
    } else {
      console.error(`❌ Brevo API error for ${to}:`, data);
      return { success: false, error: data.message || JSON.stringify(data) };
    }
  } catch (err) {
    console.error(`❌ Brevo request failed for ${to}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Send a payment confirmation email.
 */
export async function sendConfirmationEmail({
  email,
  name,
  productName,
  amount,
  paymentId,
  orderId,
  deliveryLink,
}) {
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@arklearning.com';
  const supportPhone = process.env.SUPPORT_PHONE || '+91-XXXXXXXXXX';
  const amountINR = (amount / 100).toLocaleString('en-IN');

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0A1F3F, #1a3a6b); padding: 30px; text-align: center; }
    .header h1 { color: #FFD700; margin: 0; font-size: 24px; }
    .header p { color: #ddd; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 30px; }
    .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
    .detail-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .detail-table td { padding: 12px 16px; border-bottom: 1px solid #eee; }
    .detail-table td:first-child { color: #888; font-size: 14px; width: 40%; }
    .detail-table td:last-child { color: #333; font-weight: 600; font-size: 14px; }
    .download-btn { display: inline-block; background: linear-gradient(135deg, #FFD700, #FFA500); color: #0A1F3F; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; margin: 20px 0; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #888; }
    .footer a { color: #1a3a6b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Payment Confirmed!</h1>
      <p>ARK Learning Arena</p>
    </div>
    <div class="body">
      <p class="greeting">Hi ${name},</p>
      <p>Your payment has been successfully processed. Here are the details:</p>

      <table class="detail-table">
        <tr><td>Product</td><td>${productName}</td></tr>
        <tr><td>Amount Paid</td><td>₹${amountINR}</td></tr>
        <tr><td>Payment ID</td><td>${paymentId}</td></tr>
        <tr><td>Receipt Ref</td><td>${orderId}</td></tr>
      </table>

      <div style="text-align: center;">
        <a href="${deliveryLink}" class="download-btn">📥 Download Your Material</a>
      </div>

      <p style="font-size: 13px; color: #666; margin-top: 24px;">
        Please save this email for your records. If you have any questions, contact us at
        <a href="mailto:${supportEmail}">${supportEmail}</a> or call ${supportPhone}.
      </p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ARK Learning Arena. All rights reserved.</p>
      <p>This is an automated confirmation email. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendEmail({
    to: email,
    subject: `✅ Payment Confirmed — ${productName} | ARK Learning Arena`,
    html: htmlBody,
  });
}

/**
 * Send a welcome / order initiated email.
 */
export async function sendWelcomeEmail({ email, name }) {
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; color: #333; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0A1F3F, #1a3a6b); padding: 30px; text-align: center; }
    .header h1 { color: #FFD700; margin: 0; font-size: 24px; }
    .body { padding: 30px; }
    .greeting { font-size: 18px; font-weight: 600; margin-bottom: 20px; }
    .content { line-height: 1.6; color: #444; }
    .list-item { margin: 8px 0; padding-left: 20px; position: relative; }
    .list-item:before { content: "✔"; position: absolute; left: 0; color: #28a745; font-weight: bold; }
    .highlight-box { background: #f8f9fa; padding: 15px; border-left: 4px solid #FFD700; margin: 20px 0; font-size: 14px; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to ARK Learning Arena</h1>
    </div>
    <div class="body">
      <p class="greeting">Hi ${name},</p>
      
      <div class="content">
        <p>Great decision 👍<br>
        You are about to unlock one of the most structured NEET preparation systems.</p>

        <p><strong>Your ARK learning ecosystem includes:</strong></p>
        <div class="list-item">Core100 – High priority concepts</div>
        <div class="list-item">Biology360 – Complete biology mastery</div>
        <div class="list-item">NCERT Line-by-Line – Micro-level coverage</div>
        <div class="list-item">PYQ Pattern – Previous year question intelligence</div>
        <div class="list-item">Trap & Confusion – Error elimination strategy</div>
        <div class="list-item">High Weight Areas – Maximum score leverage topics</div>

        <div class="highlight-box">
          <strong>After successful payment, you will automatically receive:</strong><br>
          ✔ WhatsApp confirmation<br>
          ✔ Payment receipt on email<br>
          ✔ Secure download/access instructions
        </div>

        <p>If you need help, simply reply to this email.</p>
        <p><strong>Team ARK</strong></p>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ARK Learning Arena. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

  return sendEmail({
    to: email,
    subject: `Welcome to ARK – Your NEET Preparation System`,
    html: htmlBody,
  });
}

/**
 * Send the Free NEET Kit email with download link.
 */
export async function sendFreeKitEmail({ email, name }) {
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; color: #333; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0A1F3F, #1a3a6b); padding: 30px; text-align: center; }
    .header h1 { color: #FFD700; margin: 0; font-size: 24px; letter-spacing: 0.5px; }
    .header p { color: #e0e0e0; margin: 5px 0 0; font-size: 14px; }
    .body { padding: 35px; }
    .greeting { font-size: 20px; font-weight: 700; color: #0A1F3F; margin-bottom: 20px; }
    .content { line-height: 1.6; color: #444; font-size: 16px; }
    .feature-list { margin: 25px 0; background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FFD700; }
    .list-item { margin: 10px 0; padding-left: 24px; position: relative; font-weight: 500; }
    .list-item:before { content: "✔"; position: absolute; left: 0; color: #28a745; font-weight: bold; }
    .cta-container { text-align: center; margin: 35px 0; }
    .cta-btn { background: #FFD700; color: #0A1F3F; text-decoration: none; padding: 16px 36px; border-radius: 50px; font-weight: 800; font-size: 18px; display: inline-block; box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3); transition: transform 0.2s; }
    .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(255, 215, 0, 0.4); }
    .info-box { font-size: 14px; color: #666; background: #f0f4f8; padding: 15px; border-radius: 8px; text-align: center; margin-top: 20px; }
    .footer { background: #0A1F3F; padding: 25px; text-align: center; font-size: 12px; color: #8fa1b9; }
    .footer a { color: #FFD700; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ARK LEARNING ARENA</h1>
      <p>NEET Intelligence System</p>
    </div>
    <div class="body">
      <p class="greeting">Hi ${name},</p>
      
      <div class="content">
        <p>Welcome to the ARK ecosystem. Your free NEET preparation kit is ready.</p>

        <div class="cta-container">
          <a href="https://docs.google.com/document/d/12pkxyzf0Je68oLi4DXgeAQ74Hj9Vmn0I/edit?usp=sharing&ouid=105920079208785324683&rtpof=true&sd=true" class="cta-btn">📥 Download Your Free NEET Kit</a>
        </div>
        
        <p><strong>Here is what you get inside the ARK system:</strong></p>
        
        <div class="feature-list">
          <div class="list-item">Core100 – High priority concepts</div>
          <div class="list-item">Biology360 – Complete biology mastery</div>
          <div class="list-item">NCERT Line-by-Line – Micro-level coverage</div>
          <div class="list-item">PYQ Pattern – Previous year intelligence</div>
          <div class="list-item">Trap & Confusion – Avoid common mistakes</div>
          <div class="list-item">High Weight Areas – Maximize marks</div>
        </div>

        <div class="info-box">
          <p><strong>Why ARK?</strong></p>
          <p style="margin: 5px 0 0;">We provide a structured roadmap, deep performance tracking, and complete parent visibility to ensure you stay on track.</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Need support? Contact us via <a href="https://wa.me/91XXXXXXXXXX">WhatsApp</a> or reply to this email.</p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} ARK Learning Arena. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendEmail({
    to: email,
    subject: 'Your Free NEET Starter Kit from ARK 🎯',
    html: htmlBody,
  });
}

/**
 * Send a payment failure / retry email.
 * NO delivery link is included — only a retry URL.
 */
export async function sendPaymentFailureEmail({
  email,
  name,
  productName,
  amount,
  retryUrl,
}) {
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@arklearning.com';
  const supportPhone = process.env.SUPPORT_PHONE || '+91-XXXXXXXXXX';
  const amountINR = (amount / 100).toLocaleString('en-IN');

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0A1F3F, #1a3a6b); padding: 30px; text-align: center; }
    .header h1 { color: #FFD700; margin: 0; font-size: 22px; }
    .header p { color: #ddd; margin: 8px 0 0; font-size: 14px; }
    .body { padding: 30px; }
    .greeting { font-size: 18px; color: #333; margin-bottom: 20px; }
    .product-box { background: #f8f9fa; border-left: 4px solid #FFD700; padding: 16px 20px; border-radius: 8px; margin: 20px 0; }
    .product-box .name { font-size: 16px; font-weight: 700; color: #0A1F3F; }
    .product-box .amount { font-size: 14px; color: #555; margin-top: 4px; }
    .reassure { background: #e8f5e9; border-radius: 8px; padding: 14px 20px; margin: 20px 0; font-size: 14px; color: #2e7d32; font-weight: 600; }
    .reasons-title { font-size: 14px; font-weight: 600; color: #555; margin: 20px 0 10px; }
    .reason-list { margin: 0; padding: 0 0 0 20px; color: #666; font-size: 14px; line-height: 1.8; }
    .retry-container { text-align: center; margin: 30px 0; }
    .retry-btn { display: inline-block; background: linear-gradient(135deg, #FFD700, #FFA500); color: #0A1F3F; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(255,165,0,0.3); }
    .support-text { font-size: 13px; color: #666; margin-top: 24px; line-height: 1.6; }
    .support-text a { color: #1a3a6b; }
    .footer { background: #f8f9fa; padding: 20px 30px; text-align: center; font-size: 12px; color: #888; }
    .footer a { color: #1a3a6b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Not Completed</h1>
      <p>ARK Learning Arena</p>
    </div>
    <div class="body">
      <p class="greeting">Hi ${name},</p>
      <p>We noticed that your payment for:</p>

      <div class="product-box">
        <div class="name">${productName}</div>
        <div class="amount">Amount: ₹${amountINR}</div>
      </div>

      <p>was not completed successfully.</p>

      <div class="reassure">
        ✅ Don't worry — your selection is still reserved.
      </div>

      <p class="reasons-title">Common reasons this can happen:</p>
      <ul class="reason-list">
        <li>Bank declined the transaction</li>
        <li>OTP timeout or expiry</li>
        <li>Network interruption during payment</li>
        <li>International payment restriction</li>
      </ul>

      <div class="retry-container">
        <a href="${retryUrl}" class="retry-btn">🔄 Retry Payment</a>
      </div>

      <p class="support-text">
        If the issue persists, please contact our support team at
        <a href="mailto:${supportEmail}">${supportEmail}</a> or call ${supportPhone}.
        <br>We're here to help you get started with your NEET preparation.
      </p>

      <p style="margin-top: 20px;"><strong>Team ARK</strong></p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ARK Learning Arena. All rights reserved.</p>
      <p>This is an automated email. Please do not reply directly.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return sendEmail({
    to: email,
    subject: `Payment Not Completed – ARK NEET Access Pending`,
    html: htmlBody,
  });
}
