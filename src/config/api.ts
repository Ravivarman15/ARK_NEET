// API Configuration — reads from Vite environment variables
// Set VITE_API_BASE_URL and VITE_RAZORPAY_KEY_ID in your .env or hosting env.

// Backend API URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Razorpay publishable key (safe for frontend)
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
