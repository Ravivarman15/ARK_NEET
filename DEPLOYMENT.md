# ARK NEET Launchpad — Deployment Guide

## Architecture

```
┌─────────────────────┐       ┌─────────────────────────────┐
│   Frontend (Vite)   │──────▶│   Backend (Express.js)      │
│   Vercel / Static   │       │   Railway / Render / VPS    │
│                     │       │                             │
│ VITE_API_BASE_URL   │       │ POST /create-order          │
│ VITE_RAZORPAY_KEY_ID│       │ POST /verify-payment        │
└─────────────────────┘       │                             │
                              │ ┌───────────────────────┐   │
                              │ │ Fulfilment Pipeline    │   │
                              │ │ 1. SQLite DB save      │   │
                              │ │ 2. Google Sheets append │   │
                              │ │ 3. WhatsApp (Interakt) │   │
                              │ │ 4. Email (SMTP)        │   │
                              │ └───────────────────────┘   │
                              └─────────────────────────────┘
```

## Quick Start

### 1. Backend Setup

```bash
cd server
cp .env.example .env
# Edit .env with your REAL credentials
npm install
npm start
```

### 2. Frontend Setup

```bash
# In project root
cp .env.example .env
# Set VITE_API_BASE_URL to your backend URL
# Set VITE_RAZORPAY_KEY_ID to your live Razorpay key
npm install
npm run dev
```

## Environment Variables

### Backend (`server/.env`)

| Variable | Required | Description |
|---|---|---|
| `RAZORPAY_KEY_ID` | ✅ Yes | Razorpay live key ID (rzp_live_xxx) |
| `RAZORPAY_KEY_SECRET` | ✅ Yes | Razorpay live key secret |
| `PORT` | No | Server port (default: 4000) |
| `FRONTEND_URL` | No | Frontend URL for CORS |
| `INTERAKT_API_KEY` | No | Interakt API key for WhatsApp |
| `INTERAKT_BASE_URL` | No | Interakt base URL |
| `SMTP_HOST` | No | SMTP server host |
| `SMTP_PORT` | No | SMTP port (default: 587) |
| `SMTP_USER` | No | SMTP username |
| `SMTP_PASS` | No | SMTP password/app password |
| `EMAIL_FROM` | No | Sender email address |
| `GOOGLE_SHEETS_CREDENTIALS` | No | Path to Google service account JSON |
| `GOOGLE_SHEET_ID` | No | Google Sheet ID |
| `SUPPORT_EMAIL` | No | Support email for receipts |
| `SUPPORT_PHONE` | No | Support phone for receipts |

### Frontend (`.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | ✅ Yes | Backend server URL |
| `VITE_RAZORPAY_KEY_ID` | ✅ Yes | Razorpay live publishable key |

## Product Configuration

Edit `server/products.js` to update:
- **Prices** (in INR)
- **Delivery links** (Google Drive, etc.)

The frontend `src/config/products.ts` has display-only prices. The backend is the source of truth.

## Fulfilment Pipeline

After successful payment verification:

1. **DB Save** — Transaction saved to SQLite (`server/data/transactions.db`)
2. **Google Sheets** — Row appended with all transaction details
3. **WhatsApp** — Template message sent via Interakt with name + download link
4. **Email** — HTML confirmation email with product, amount, payment ID, download link

> ⚠️ If WhatsApp or email fails, the error is **logged but does NOT cancel** the purchase.

## WhatsApp Template

Create a template named `payment_success` in your Interakt dashboard:

```
Hi {{1}},
Payment successful.

Download:
{{2}}
```

## Google Sheets Setup

1. Create a Google Cloud service account
2. Download the JSON key file to `server/credentials/google-service-account.json`
3. Share your Google Sheet with the service account email
4. Create a tab named "Transactions" with headers:
   `Timestamp | Order ID | Payment ID | Product ID | Product Name | Amount | Name | Phone | Email | Delivery Link`

## Deployment

### Backend (Railway/Render)
1. Push `server/` as a separate repo or use monorepo config
2. Set all environment variables in the platform dashboard
3. Start command: `npm start`

### Frontend (Vercel)
1. Set `VITE_API_BASE_URL` and `VITE_RAZORPAY_KEY_ID` in Vercel env settings
2. Build command: `npm run build`
3. Output: `dist/`
