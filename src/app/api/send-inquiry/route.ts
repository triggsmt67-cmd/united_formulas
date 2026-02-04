import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, company, email, phone, interest, message, items, formName } = body;
        const origin = formName || 'General Inquiry';

        const warehouseEmail = process.env.WAREHOUSE_EMAIL;
        const apiKey = process.env.RESEND_API_KEY;

        if (!warehouseEmail) {
            console.error('CRITICAL: WAREHOUSE_EMAIL is missing.');
            return NextResponse.json(
                { error: "Configuration Error: Recipient variable missing." },
                { status: 500 }
            );
        }

        if (!apiKey) {
            console.warn('RESEND_API_KEY is missing. Simulating success for local development.');
            return NextResponse.json({
                success: true,
                simulated: true,
                message: "Dev Mode: Email captured but not sent (API Key missing)."
            });
        }

        const resend = new Resend(apiKey);

        // Construct HTML Table for Inquiry Details
        const detailsTable = `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="background: #f8fafc;">
                    <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; width: 30%;">Field</th>
                    <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left;">Details</th>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0; font-bold;">Source Form</td>
                    <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold; color: #EA580C;">${origin}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0; font-bold;">Customer Name</td>
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">${fullName}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0; font-bold;">Company</td>
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">${company}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0; font-bold;">Email</td>
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0; font-bold;">Phone</td>
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">${phone}</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e2e8f0; font-bold;">Interest</td>
                    <td style="padding: 12px; border: 1px solid #e2e8f0;">${interest}</td>
                </tr>
            </table>
        `;

        // Construct HTML Table for Draft Items if they exist
        let itemsTable = '';
        if (items && items.length > 0) {
            itemsTable = `
                <h3 style="color: #EA580C; font-family: sans-serif; text-transform: uppercase; letter-spacing: 1px;">Draft Items (Price/Stock Check)</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: #f8fafc;">
                        <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left;">Product</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left;">SKU</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">Qty</th>
                    </tr>
                    ${items.map((item: any) => `
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${item.productName} <br/><small style="color: #64748b;">${item.variantName}</small></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${item.sku}</td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
        }

        const rawRecipients = process.env.SALES_EMAIL || warehouseEmail;
        const recipients = rawRecipients.split(',').map(email => email.trim());

        const { data, error } = await resend.emails.send({
            from: 'UF Sales <notifications@unitedformulas.com>',
            to: recipients,
            subject: `[${origin}] INQUIRY: ${interest} - ${company}`,
            html: `
                <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 12px;">
                    <h2 style="color: #EA580C; text-transform: uppercase; margin-bottom: 24px;">New ${origin} Submission</h2>
                    <p style="margin-bottom: 24px; line-height: 1.6;">A customer has requested an inventory verification and price check for the following:</p>
                    
                    ${detailsTable}
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                        <h4 style="margin-top: 0; color: #475569;">Customer Message:</h4>
                        <p style="margin-bottom: 0; font-style: italic;">"${message || 'No additional details provided.'}"</p>
                    </div>

                    ${itemsTable}

                    <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; pt: 20px; font-size: 11px; color: #94a3b8; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
                        Inventory Verification Protocol • United Formulas System
                    </div>
                </div>
            `
        });

        console.log('Inquiry Dispatch Response Data:', data);
        if (error) {
            console.error('Inquiry Dispatch Error:', error);
            return NextResponse.json({ error: "Email dispatch failed.", details: error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error('Inquiry Route Exception:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
