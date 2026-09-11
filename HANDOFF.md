# Your Website Handoff & Moving Guide

## What you own, where it lives, and how to move it

Moving this website is simpler than it sounds.

You do not need to understand the code, rebuild the site, or become a website expert. Most of the move comes down to three things: give the right person access, copy the existing setup, and test everything before you switch.

Nearly anyone can manage the handoff using this guide. A developer should handle the few technical steps involving code, private keys, or domain settings—but you will still know what they are doing and how to confirm the job is finished.

> **Keep this guide private.** Store passwords, recovery codes, and secret keys in a company password manager such as 1Password or Bitwarden. Do not put them in this document.

---

## Your website has five main pieces

| Part | Plain-English meaning |
|---|---|
| **Domain** | Your website's address: `unitedformulas.com` |
| **WordPress (WooCommerce)** | Where you manage products, pages, posts, and images at `ufbackend.com` |
| **Next.js** | The code that turns your WordPress content into the public website |
| **GitHub** | The master copy of that code at `github.com/triggsmt67-cmd/united_formulas` |
| **Vercel** | The service that currently puts the website online |
| **Resend** | The email service that delivers contact forms, purchase orders, and credit applications |
| **Google Cloud** | Cloud storage for product documents (SDS sheets) and the AI assistant (Dr. Aris / "Ask the Chemist") |
| **Firebase** | Authentication and data layer for the AI chemist module |
| **Google Tag Manager** | Marketing analytics and conversion tracking (ID: `GTM-KZPZ7VZT`) |

These pieces connect to each other, but they do not all have to move at once.

If you are only changing developers, nothing may need to move. You can simply give the new person access to the existing accounts.

---

## Start here: make sure the business is in control

The business should own the main accounts. A developer can have access, but they should not be the only person who can log in, recover an account, or update billing.

Fill this in without adding passwords:

| Account | Provider or link | Business owner |
|---|---|---|
| Domain and DNS | [Confirm registrar — likely where `unitedformulas.com` was purchased] | `crystalm@unitedformulas.com` |
| WordPress + WooCommerce | `https://ufbackend.com/wp-admin` | `crystalm@unitedformulas.com` |
| GitHub code repository | `https://github.com/triggsmt67-cmd/united_formulas` | `triggsmt67-cmd` (GitHub org/user) |
| Frontend hosting (Vercel) | `https://vercel.com` — project deploys to `unitedformulas.com` | [Confirm Vercel team owner] |
| Email dispatch (Resend) | `https://resend.com` — sends from `notifications@unitedformulas.com` | [Confirm Resend account owner] |
| Google Cloud Platform | GCS Bucket: `united-formulas-files` / Gemini AI API | [Confirm GCP project owner] |
| Firebase | [Confirm Firebase project — used for chemist module auth] | [Confirm Firebase owner] |
| Google Tag Manager | `https://tagmanager.google.com` — Container: `GTM-KZPZ7VZT` | [Confirm GTM account owner] |
| Password manager | [Vault name — recommend 1Password or Bitwarden] | [Business owner] |

Then confirm:

- The business controls the main email and billing.
- At least two trusted people can recover important accounts.
- Multi-factor authentication is turned on.
- Passwords and recovery codes are in the company password manager.

That is the foundation. Once those four things are true, you are not trapped with one developer or hosting company.

---

## If you are changing developers

This is the easy version. Nothing needs to be rebuilt.

### 1. Invite the new developer

Give them their own login for WordPress, GitHub, Vercel, and any other service they need. Do not send them your master passwords.

Look for menu options called **Users**, **Members**, **Team**, **Access**, or **Collaborators**.

### 2. Ask them to verify access

The new developer should confirm they can open the code, log in to WordPress, and create a test version of the website without changing the live site.

### 3. Clean up the old access

Once the new person proves everything works, remove access the old developer no longer needs. Change any shared passwords or private keys they could see.

Done.

---

## If you are moving the public website

This moves the Next.js website from Vercel to another hosting company. WordPress can stay exactly where it is.

Your developer will handle most of the technical work. Your job is to make sure they follow this order:

### 1. Save the working setup

Before changing anything, keep:

- A current WordPress backup (full database + `/wp-content/uploads/` media folder from `ufbackend.com`).
- The complete website code in GitHub (`https://github.com/triggsmt67-cmd/united_formulas`, branch: `main`).
- A copy of the current domain DNS settings (A records, CNAME records, MX records, DKIM records for Resend).
- A list of private environment settings and where their values are stored.

Environment settings are the private connections between the website, WordPress, and other services. The new host needs them, but their secret values belong in the password manager—not in email or chat.

**Environment variables this site requires** (names only — store actual values in the password manager):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | API key for the Resend email service |
| `WAREHOUSE_EMAIL` | Primary recipient(s) for PO and inquiry emails |
| `SALES_EMAIL` | Recipient(s) for general sales inquiries (falls back to `WAREHOUSE_EMAIL`) |
| `CREDIT_EMAIL` | Recipient(s) for credit applications (falls back to `WAREHOUSE_EMAIL`) |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the live website (`https://unitedformulas.com`) |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | WordPress GraphQL endpoint (`https://ufbackend.com/graphql`) |
| `WORDPRESS_API_URL` | Server-side WordPress GraphQL endpoint |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini AI key for the Dr. Aris / "Ask the Chemist" assistant |
| `GCS_BUCKET_NAME` | Google Cloud Storage bucket (`united-formulas-files`) |
| `GCS_CREDENTIALS_BASE64` | Base64-encoded GCS service account key (for Vercel production — **not** a file path) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Local file path to `gcs-key.json` (for local development only — **do not** set in Vercel) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |

> **Vercel note**: After adding or changing any environment variable in the Vercel dashboard, you **must** trigger a Redeploy. Variables are baked into the build — they do not update until the next deployment.

### 2. Build the site on the new host

The developer connects the existing GitHub repository (`https://github.com/triggsmt67-cmd/united_formulas`) to the new hosting account and copies the working build settings.

The current build settings on Vercel are:
- **Framework**: Next.js
- **Build command**: `npm run build` (which runs `next build`)
- **Output directory**: `.next` (default)
- **Install command**: `npm install`
- **Node.js version**: 20.x or later

No one should guess or start over. The code already exists.

### 3. Test it before the public switch

The new host will provide a temporary website address. Use it to check:

- **Home page** (`/`) — hero section, featured products grid, zip code checker.
- **Products catalog** (`/products`) — full product listing from WordPress/WooCommerce.
- **Individual product pages** (`/product/[slug]`) — images, pricing, variants, SDS download button, PO ordering.
- **Category pages** (`/category/[slug]`) — filtered product views.
- **SDS Sheets page** (`/sds-sheets`) — safety data sheet search and download.
- **Contact form** (`/contact`) — submit a test inquiry and confirm it arrives at the warehouse email.
- **Purchase Order flow** — add items to a PO draft, submit, and confirm the email arrives.
- **Credit Application** (`/credit-application`) — submit a test application.
- **Dr. Aris / "Ask the Chemist"** — the floating chat widget in the bottom-right corner.
- **About page** (`/about`).
- **Legal pages** (`/privacy-policy`, `/terms-of-service`).
- Mobile layout on a phone.
- A new or updated WordPress product — confirm it appears on the site.

Fix any problems while the current website is still live.

### 4. Point the domain to the new site

Once the test site works, the developer updates the domain settings using the exact instructions from the new host.

This is one of the few steps that deserves extra care. Website and email routing live in the same general area. The developer should save the old settings and leave business email records alone.

### 5. Keep the old host for a short safety window

Check the live website again after the switch. Keep the old hosting account active until the new site has worked reliably for the agreed period.

If something goes wrong, the developer can point the domain back to the old working site. That is your safety net.

---

## Only moving WordPress or the domain?

These are separate jobs. You do not need to move either one just because you changed developers or moved the public website.

### Moving WordPress

A developer should copy the WordPress database, images, users, plugins, and settings to the new WordPress host. They should test the new copy and confirm the public website can read it before changing the live WordPress address.

The current WordPress + WooCommerce backend lives at `ufbackend.com`. The Next.js website reads product data from the GraphQL endpoint at `https://ufbackend.com/graphql` (via WPGraphQL plugin). If WordPress moves to a new URL, the developer must update:
- The `NEXT_PUBLIC_WORDPRESS_API_URL` and `WORDPRESS_API_URL` environment variables.
- The hardcoded fallback in `src/lib/apollo-client.ts` (currently set to `https://ufbackend.com/graphql`).
- Any references in `src/data/product_metadata.json` that point to `ufbackend.com` for SDS PDF downloads.

### Moving the domain

Only transfer the domain if the business wants to change domain companies. Keep a copy of the current domain settings, confirm the new account belongs to the business, and check both the website and business email after the transfer.

**Critical DNS records to preserve:**
- DKIM records for Resend email delivery (`resend._domainkey.unitedformulas.com`) — without these, the contact form, PO, and credit application emails will stop sending.
- Any MX records for business email (`@unitedformulas.com`).

If the business already controls the domain account, leaving it where it is may be the simplest choice.

---

## How you know the move worked

You do not need a technical report. Open the website and confirm:

- The main pages load on a phone and computer.
- Product images and data appear correctly (pulled from WordPress at `ufbackend.com`).
- The **Contact form** (`/contact`) delivers an email to the warehouse.
- A **Purchase Order** submission delivers an email with line items and totals.
- The **Credit Application** (`/credit-application`) delivers an email.
- The **Dr. Aris chat widget** responds to product questions (requires GCS + Gemini keys).
- A new or updated WordPress product appears on the public site.
- The website shows no security warning (HTTPS with valid certificate).
- **Google Tag Manager** is firing (check browser console for `GTM-KZPZ7VZT`).
- The **PO Submit button** retains its ID `submit-po-btn` (this is linked to marketing conversions — do not rename).
- The new developer can push a code update and it deploys successfully.

If all eleven are true, the move is working.

---

## If something breaks

Stop making more changes and return to the last working version.

- If a code update caused the problem, restore the previous deployment from the host’s deployment history.
- If the new host caused the problem, point the domain back to the old host.
- If WordPress content is missing, use the verified WordPress backup or reconnect the old WordPress site.
- If business email stops working, compare the domain settings with the saved copy and contact the email provider before changing anything else.

This is why you test first and keep the old setup available for a short time. You always have a way back.

---

## Everyday updates are still easy

You should not need a developer to change normal website content.

1. Log in to WordPress at `https://ufbackend.com/wp-admin`.
2. Edit the product, page, post, or image.
3. Click **Publish** or **Update**.
4. Open the public page at `https://unitedformulas.com` and confirm the change appears.

The site uses a `force-dynamic` / `no-store` fetch policy, so WordPress changes should appear without needing to redeploy the code.

That is it.

---

## Final handoff check

- [ ] The business owns the main accounts.
- [ ] The new developer has their own access.
- [ ] Backups and old domain settings are saved.
- [ ] The new site was tested before the switch.
- [ ] Website content, forms, email, and analytics work.
- [ ] The old setup will stay available until `[date]`.
- [ ] Old access was removed and shared secrets were changed.
- [ ] The handoff was approved by `[name]` on `[date]`.

## Support contacts

| Role | Name or company | Email | Phone |
|---|---|---|---|
| Business owner | [Name — Crystal M.?] | `crystalm@unitedformulas.com` | 406.727.4144 |
| Developer or agency | [Name / Company] | [Email] | [Phone] |
| WordPress host | [Provider hosting `ufbackend.com`] | [Support email] | [Phone] |
| Domain provider | [Provider for `unitedformulas.com`] | [Support email] | [Phone] |
| Email dispatch (Resend) | Resend | https://resend.com/support | — |
| Cloud services (GCP) | Google Cloud Platform | https://cloud.google.com/support | — |
| Frontend hosting (Vercel) | Vercel | https://vercel.com/support | — |

