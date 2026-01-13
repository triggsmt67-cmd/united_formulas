import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// The user should add RESEND_API_KEY to their .env.local
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Server-Side Security & Runtime Check
        const warehouseEmail = process.env.WAREHOUSE_EMAIL;

        if (!warehouseEmail) {
            console.error('CRITICAL: WAREHOUSE_EMAIL is not defined in environment variables.');
            return NextResponse.json(
                { error: "Dispatch Configuration Error: Recipient variable missing in Vercel." },
                { status: 500 }
            );
        }

        // 2. Resend API Key check & Runtime Initialization
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.warn('RESEND_API_KEY is missing. Simulating success for local development.');
            console.log('PO Submission Data:', body);
            return NextResponse.json({
                success: true,
                simulated: true,
                message: "Dev Mode: PO logged to console instead of email."
            });
        }

        const resend = new Resend(apiKey);
        const {
            fullName,
            phone,
            phoneNumber,
            businessName,
            poNumber,
            deliveryWindow,
            deliveryTime,
            dockNotes,
            items,
            lineItems,
            grandTotal
        } = body;

        const actualPhone = phoneNumber || phone || 'N/A';
        const actualDelivery = deliveryWindow || deliveryTime || 'Standard';
        const actualItems = Array.isArray(items) ? items : (Array.isArray(lineItems) ? lineItems : []);

        // 3. Git-Agnostic Routing & Absolute Paths
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://united-formulas-v1.vercel.app';

        const { data, error } = await resend.emails.send({
            from: 'United Formulas <onboarding@resend.dev>', // Set to onboarding@resend.dev per request
            to: [warehouseEmail],
            subject: `NEW PO: GREAT FALLS QUEUE - ${businessName}`,
            html: `
                <div style="font-family: Arial; border: 1px solid #000; padding: 20px;">
                  <h2>NEW PO: GREAT FALLS QUEUE</h2>
                  <p><strong>Business:</strong> ${businessName} | <strong>Contact:</strong> ${fullName} (${actualPhone})</p>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: #eee; text-align: left;">
                      <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
                      <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Qty</th>
                    </tr>
                    ${actualItems.map((item: any) => `
                    <tr>
                      <td style="padding: 10px; border: 1px solid #ddd;">${item.productName || item.product} (${item.variantName || item.variant || ''})</td>
                      <td style="padding: 10px; border: 1px solid #ddd; text-align: center;"><strong>${item.quantity}</strong></td>
                    </tr>
                    `).join('')}
                  </table>
                  <p style="margin-top: 20px;"><strong>Notes:</strong> ${dockNotes || 'N/A'}</p>
                  <p style="margin-top: 10px; font-size: 12px; color: #666;">Delivery Window: ${actualDelivery} | PO#: ${poNumber || 'N/A'}</p>
                </div>
            `
        });

        if (error) {
            console.error('Resend Dispatch Error:', error);
            return NextResponse.json({
                error: error.message || "Resend Dispatch Failed",
                details: error
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error('API Route Exception:', err);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: err.message || "Unknown error occurred",
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }, { status: 500 });
    }
}
