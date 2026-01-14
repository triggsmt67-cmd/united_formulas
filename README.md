# United Formulas - B2B Purchase Order System

## 🚀 Overview
This is a custom Next.js storefront built for United Formulas. It features a headless B2B Purchase Order (PO) system that bypasses traditional retail checkout for a direct-to-warehouse workflow.

## 🛠 Tech Stack
- **Framework:** Next.js (App Router)
- **Deployment:** Vercel
- **Email/Dispatch:** Resend API
- **Analytics:** Google Tag Manager (GTM) & GA4

## 📊 Critical Marketing & Analytics (DO NOT RENAME)
To maintain marketing data integrity, the following IDs must remain unchanged:
- **GTM Container ID:** `GTM-KZPZ7VZT`
- **Primary Conversion Button ID:** `submit-po-btn` (Triggers the `po_dispatch_success` event)
- **GA4 Measurement ID:** `G-Q4YR9815LE`

## 📦 Purchase Order Logic
- **State Management:** The `poDraft` state handles the collection of items before submission.
- **Dispatch:** Orders are sent via `/api/send-po` using the Resend API.
- **Validation:** The system checks for warehouse-specific formatting before firing the dispatch.

## 🔑 Environment Variables (Required in Vercel)
The following keys must be configured for the site to function:
- `RESEND_API_KEY`: For email dispatch.
- `WAREHOUSE_EMAIL`: The destination for all PO submissions.
- `NEXT_PUBLIC_SITE_URL`: The production URL (used for absolute asset paths).

## 🛠 Development
Standard Next.js commands apply:
```bash
npm run dev
```
