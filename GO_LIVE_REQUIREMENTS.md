# 🚀 GO LIVE REQUIREMENTS CHECKSHEET

This document outlines everything you need to prepare to take the ARK NEET Launchpad system from **Test Mode** to **LIVE Production**.

---

## 1. 📋 Accounts & Services Required

You need active accounts on these platforms:

### A. Payment Gateway (Razorpay)
- **Status**: Account must be **Activated** and **KYC Verified**.
- **Mode**: Switch dashboard from "Test Mode" to **"Live Mode"**.
- **Required**:
    - Produce **Live Key ID** (`rzp_live_...`)
    - Produce **Live Key Secret** (`...`)

### B. WhatsApp Automation (Interakt)
- **Status**: Account created and WhatsApp Business API number linked.
- **Verification**: Facebook Business Verification usually required for full limits.
- **Template**: You must create and get approval for a template named `payment_success` (or update code to match your template name).
    - **Template Body Example**:
      ```text
      Hi {{1}},
      Payment successful.
      Download your material here: {{2}}
      ```
- **Required**:
    - **API Key** (from Developer Settings)

### C. Email Provider (SMTP)
- **Option 1 (Easiest)**: **Resend.com** or **SendGrid** (Recommended for delivery rates).
- **Option 2 (Free)**: **Gmail** (Requires "App Password" setup, not just login password).
- **Required**:
    - SMTP Host (e.g., `smtp.gmail.com` or `smtp.resend.com`)
    - SMTP Port (usually `587`)
    - Username & Password (or API Key)

### D. Google Cloud (For Sheets Integration)
- **Status**: Create a project in Google Cloud Console.
- **API**: Enable **Google Sheets API**.
- **Auth**: Create a **Service Account** and download the `credentials.json` file.
- **Sheet**: Create a new Google Sheet.
    - **Share** the sheet with the Service Account email address (give "Editor" access).
    - Create headers in the first row: `Timestamp`, `Order ID`, `Payment ID`, `Product ID`, `Product Name`, `Amount`, `Name`, `Phone`, `Email`, `Delivery Link`.

---

## 2. 📦 deliverables Content

You need the actual files to deliver to students.

1.  **Upload Files**: Host your PDFs (Core 100, Bio 360, etc.) on Google Drive, AWS S3, or Dropbox.
2.  **Get Public Links**: Ensure the links are accessible to anyone with the link (no login required).
3.  **Update Code**:
    - Open `server/products.js`
    - Replace the placeholder `https://drive.google.com/your-link` with the **REAL** download links for every product.

---

## 3. ⚙️ Server deployment (Backend)

The backend (`/server` folder) processes payments and sends emails/WhatsApp.

**Recommended Host**: Railway.app, Render.com, or a VPS (DigitalOcean/Hetzner).

### ⚠️ CRITICAL NOTE ON DATABASE (SQLite)
Currently, the system uses a local file database (`transactions.db`).
- **If using Railway/VPS**: Use a **Persistent Volume** so you don't lose transaction history when the server restarts.
- **If using Vercel/Render (Free)**: These are "ephemeral". Validations will work, but **transaction logs in the DB file will be wiped** on every deploy.
    - *Suggestion*: For production, just ensure Google Sheets works perfectly as your backup record.

### Environment Variables (Production)
Set these in your hosting dashboard:

```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=https://your-frontend-domain.com

# RAZORPAY LIVE KEYS
RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxx

# INTERAKT
INTERAKT_API_KEY=xxxxxxxxxxxx

# EMAIL (Example for Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# GOOGLE SHEETS
GOOGLE_SHEET_ID=your_sheet_id_from_url
# Note: google-service-account.json usually needs to be uploaded as a "Secret File" 
# or passed as a base64 string if the host supports it.
```

---

## 4. 🌐 Client Deployment (Frontend)

The frontend (`/src` folder) is your website.

**Recommended Host**: Vercel or Netlify.

### Environment Variables (Build Time)
Set these in Vercel/Netlify dashboard:

```env
# URL of your DEPLOYED backend (from step 3)
VITE_API_BASE_URL=https://your-backend-app.railway.app

# YOUR PUBLIC RAZORPAY LIVE KEY
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
```

---

## 5. ✅ Go-Live Checklist

1. [ ] **Update Products**: Real links in `server/products.js`.
2. [ ] **Deploy Backend**: Push code, set Env Vars.
3. [ ] **Deploy Frontend**: Push code, set Env Vars (pointing to live Backend).
4. [ ] **Interakt**: Template approved and active.
5. [ ] **Google Sheet**: Shared with Service Account.
6. [ ] **Test**:
    - Make a **real purchase** of the cheapest product (₹1).
    - Verify Money deducted.
    - Verify Email received.
    - Verify WhatsApp received.
    - Verify Row added to Sheet.
    - Verify Link works.
