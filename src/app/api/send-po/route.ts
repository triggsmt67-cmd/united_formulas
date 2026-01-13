import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// The user should add RESEND_API_KEY to their .env.local
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Resilience check: If RESEND_API_KEY is missing, simulate success for development
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is missing. Simulating success for local development.');
            console.log('PO Submission Data:', body);
            return NextResponse.json({
                success: true,
                simulated: true,
                message: "Dev Mode: PO logged to console instead of email."
            });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const {
            fullName,
            phoneNumber,
            businessName,
            poNumber,
            deliveryWindow,
            dockNotes,
            items,
            grandTotal
        } = body;

        // In a real scenario, you'd send this to the warehouse email
        const warehouseEmail = process.env.WAREHOUSE_EMAIL || 'warehouse@unitedformulas.com';

        const { data, error } = await resend.emails.send({
            from: 'United Formulas Orders <orders@unitedformulas.com>', // Must be a verified domain in Resend
            to: [warehouseEmail],
            subject: `New PO Requisition: ${businessName} (${poNumber || 'No PO#'})`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #0f172a; padding: 24px; color: white; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px;">New Purchase Order</h1>
                        <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Requisition ID: ${Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>
                    
                    <div style="padding: 32px;">
                        <div style="margin-bottom: 32px;">
                            <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">B2B Contact Information</h2>
                            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                                <tr><td style="padding: 4px 0; color: #64748b; width: 120px;">Full Name</td><td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${fullName}</td></tr>
                                <tr><td style="padding: 4px 0; color: #64748b;">Phone Number</td><td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${phoneNumber}</td></tr>
                                <tr><td style="padding: 4px 0; color: #64748b;">Business Name</td><td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${businessName}</td></tr>
                            </table>
                        </div>

                        <div style="margin-bottom: 32px;">
                            <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Logistics & Delivery</h2>
                            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                                <tr><td style="padding: 4px 0; color: #64748b; width: 120px;">PO Number</td><td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${poNumber || 'N/A'}</td></tr>
                                <tr><td style="padding: 4px 0; color: #64748b;">Window</td><td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${deliveryWindow}</td></tr>
                                <tr><td style="padding: 4px 0; color: #64748b;">Dock Notes</td><td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${dockNotes || 'No notes provided.'}</td></tr>
                            </table>
                        </div>

                        <div>
                            <h2 style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Order Details</h2>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <thead>
                                    <tr style="text-align: left; color: #64748b;">
                                        <th style="padding: 8px 0; font-weight: normal;">Product</th>
                                        <th style="padding: 8px 0; font-weight: normal; text-align: center;">Qty</th>
                                        <th style="padding: 8px 0; font-weight: normal; text-align: right;">Total</th>
                                    </tr>
                                </thead>
                                <tbody style="color: #0f172a;">
                                    ${items.map((item: any) => `
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                                                <div style="font-weight: bold;">${item.product}</div>
                                                <div style="font-size: 11px; color: #64748b;">${item.sku}</div>
                                            </td>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: center;">${item.quantity}</td>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${item.total}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" style="padding: 24px 0; font-size: 16px; font-weight: bold; text-align: right; color: #64748b;">Grand Total</td>
                                        <td style="padding: 24px 0; font-size: 20px; font-weight: 900; text-align: right; color: #0f172a;">${grandTotal}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    
                    <div style="background-color: #f8fafc; padding: 24px; text-align: center; color: #64748b; font-size: 12px;">
                        <p style="margin: 0;">This is an automated requisition from the United Formulas B2B Portal.</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
