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
      email,
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
    const actualEmail = email || 'N/A';
    const actualDelivery = deliveryWindow || deliveryTime || 'Standard';
    const actualItems = Array.isArray(items) ? items : (Array.isArray(lineItems) ? lineItems : []);

    const recipients = warehouseEmail.split(',').map(email => email.trim());
    if (actualEmail && actualEmail !== 'N/A' && !recipients.includes(actualEmail)) {
      recipients.push(actualEmail);
    }

    const { data, error } = await resend.emails.send({
      from: 'UF Orders <notifications@unitedformulas.com>', // Production-ready sender address
      to: recipients,
      subject: `NEW PO: GREAT FALLS QUEUE - ${businessName}`,
      html: `
                <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 12px;">
                  <h2 style="color: #0F172A; text-transform: uppercase; margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">New Purchase Order: Great Falls Queue</h2>
                  
                  <div style="margin-bottom: 24px;">
                    <p style="margin: 4px 0;"><strong>Business:</strong> ${businessName}</p>
                    <p style="margin: 4px 0;"><strong>Contact:</strong> ${fullName}</p>
                    <p style="margin: 4px 0;"><strong>Email:</strong> ${actualEmail}</p>
                    <p style="margin: 4px 0;"><strong>Phone:</strong> ${actualPhone}</p>
                    <p style="margin: 4px 0;"><strong>PO Number:</strong> ${poNumber || 'N/A'}</p>
                  </div>

                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <thead>
                      <tr style="background: #f8fafc;">
                        <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left;">Product</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left;">SKU</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">Qty</th>
                        <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: right;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${actualItems.map((item: any) => `
                      <tr>
                        <td style="padding: 12px; border: 1px solid #e2e8f0;">
                          <strong>${item.productName || item.product}</strong>
                          <br/><small style="color: #64748b;">${item.variantName || item.variant || ''}</small>
                        </td>
                        <td style="padding: 12px; border: 1px solid #e2e8f0;">${item.sku || 'N/A'}</td>
                        <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
                        <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right;">${item.total || item.price}</td>
                      </tr>
                      `).join('')}
                    </tbody>
                    <tfoot>
                      <tr style="background: #f8fafc; font-weight: bold;">
                        <td colspan="3" style="padding: 12px; border: 1px solid #e2e8f0; text-align: right;">Grand Total</td>
                        <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right; color: #0F172A;">${grandTotal}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                    <h4 style="margin-top: 0; color: #475569;">Dock & Delivery Notes:</h4>
                    <p style="margin-bottom: 0;">${dockNotes || 'No special instructions provided.'}</p>
                  </div>

                  <div style="font-size: 11px; color: #94a3b8; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
                    Requested Window: ${actualDelivery} • United Formulas Dispatch System
                  </div>
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
