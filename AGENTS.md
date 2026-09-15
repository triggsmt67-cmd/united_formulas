# AI Agent Manual: United Formulas Project

This document provides critical context and operational rules for AI assistants working on the United Formulas codebase.

## 1. Critical IDs (DO NOT MODIFY)
The following IDs are linked to live marketing conversions and analytics tracking. **Renaming or removing them will break official data collection.**

- **Google Tag Manager ID**: `GTM-KZPZ7VZT` (Located in `src/app/layout.tsx`)
- **PO Submission Button ID**: `submit-po-btn` (Located in `src/components/PORequisitionForm.tsx`)

> **Explicit Warning**: These IDs are linked to live marketing conversions. Renaming them will break data collection.

## 2. Tech Stack Context
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **API/Email**: Resend API
- **Deployment**: Vercel
- **Primary Data Flow**: `poDraft` (Context State) → `/api/send-po` (API Route) → Warehouse Email (Resend)

## 3. Operational Rules
- **Validation**: Always run a build check (`npm run build`) before proposing or committing major UI or structural changes.
- **Persistence Check**: After any modifications to the root layout or navigation headers, verify that the `GoogleTagManager` component and its initialization scripts remain correctly implemented in `src/app/layout.tsx`.
- **Context Integrity**: Maintain the B2B Purchase Order (PO) workflow; ensure `POProvider` wraps the application correctly.

## 4. Style Guide
- **Code Style**: Keep code active, concise, and professional.
- **Component Strategy**: Prefer functional components and modular React patterns.
- **CSS**: Use Tailwind utility classes or Vanilla CSS where necessary; avoid introducing heavy external UI libraries unless requested.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
