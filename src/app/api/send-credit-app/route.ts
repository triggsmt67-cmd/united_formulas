import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      anticipatedPurchase,
      dateEstablished,
      phoneFax,
      bizType,
      email,
      address,
      taxId,
      authorizedBuyers,
      resalePermit,
      apContact,
      apPhoneEmail,
      poRequired,
      directors,
      references,
      bankName,
      bankPhone,
      bankAddress,
      bankContact,
      bankAccount,
      bankType,
      authSig,
      authPrintedName,
      authTitle,
      authDate,
      guarantorSig,
      guarantorName
    } = body;

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
        message: "Dev Mode: Credit App captured but not sent (API Key missing)."
      });
    }

    const resend = new Resend(apiKey);

    // Map directors loop
    const directorsHtml = (directors || []).map((d: any) => `
            <div class="signature-block" style="border: 1px dashed #ccc; padding: 10px; margin-top: 10px; background: #fafafa; margin-bottom: 10px;">
              <div style="display: table; width: 100%;">
                <div style="display: table-cell; width: 50%; vertical-align: top;">
                  <span style="font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px;">Name</span>
                  <div style="font-size: 15px; color: #111; font-weight: 500;">${d.name || ''}</div>
                </div>
                <div style="display: table-cell; width: 50%; vertical-align: top;">
                  <span style="font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px;">Title</span>
                  <div style="font-size: 15px; color: #111; font-weight: 500;">${d.title || ''}</div>
                </div>
              </div>
              <div style="margin-bottom: 15px; border-bottom: 1px inset #f1f1f1; padding-bottom: 10px; margin-top: 5px;">
                <span style="font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px;">Address/Phone</span>
                <div style="font-size: 15px; color: #111; font-weight: 500;">${d.address || ''}</div>
              </div>
              <div style="margin-bottom: 15px; border-bottom: 1px inset #f1f1f1; padding-bottom: 10px;">
                <span style="font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px;">SS #</span>
                <div style="font-size: 15px; color: #111; font-weight: 500;">${d.ss || ''}</div>
              </div>
            </div>
        `).join('');

    // Map trade references loop
    const referencesHtml = (references || []).map((r: any) => `
            <div style="margin-bottom: 15px; border-bottom: 1px inset #f1f1f1; padding-bottom: 10px;">
              <span style="font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px;">Reference: ${r.name || ''}</span>
              <div style="font-size: 15px; color: #111; font-weight: 500;">${r.address || ''} | ${r.email || ''} | ${r.contact || ''}</div>
            </div>
        `).join('');

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
  .wrapper { width: 100%; table-layout: fixed; background-color: #f4f4f4; padding: 20px 0; }
  .container { width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; border-top: 4px solid #000; }
  .header { padding: 20px; background-color: #f9f9f9; border-bottom: 1px solid #eee; }
  .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }
  .header p { margin: 5px 0 0; font-size: 12px; color: #666; }
  .section-title { background-color: #000; color: #fff; padding: 10px 20px; font-size: 14px; font-weight: bold; text-transform: uppercase; }
  .content { padding: 20px; }
  .field-group { margin-bottom: 15px; border-bottom: 1px inset #f1f1f1; padding-bottom: 10px; }
  .label { font-size: 11px; font-weight: bold; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px; }
  .value { font-size: 15px; color: #111; font-weight: 500; }
  .grid { display: table; width: 100%; }
  .col { display: table-cell; width: 50%; vertical-align: top; }
  .footer-text { font-size: 12px; color: #777; font-style: italic; padding: 20px; border-top: 1px solid #eee; background-color: #fdfdfd; }
  .signature-block { border: 1px dashed #ccc; padding: 10px; margin-top: 10px; background: #fafafa; }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- HEADER -->
      <div class="header">
        <h1>United Formulas</h1>
        <p>PO BOX 2589 GREAT FALLS, MT 59403 | 406.727.4144</p>
        <p><strong>UF CREDIT APPLICATION SUBMISSION</strong></p>
      </div>

      <!-- BUSINESS INFORMATION -->
      <div class="section-title">Business Information</div>
      <div class="content">
        <div class="field-group">
          <span class="label">Company Name</span>
          <div class="value">${companyName || ''}</div>
        </div>
        <div class="grid">
          <div class="col">
            <div class="field-group">
              <span class="label">Structure</span>
              <div class="value">${bizType || ''}</div>
            </div>
            <div class="field-group">
              <span class="label">Date Established</span>
              <div class="value">${dateEstablished || ''}</div>
            </div>
          </div>
          <div class="col">
            <div class="field-group">
              <span class="label">Phone | Fax</span>
              <div class="value">${phoneFax || ''}</div>
            </div>
            <div class="field-group">
              <span class="label">Email</span>
              <div class="value">${email || ''}</div>
            </div>
          </div>
        </div>
        <div class="field-group">
          <span class="label">Address, City, State, ZIP</span>
          <div class="value">${address || ''}</div>
        </div>
        <div class="grid">
          <div class="col">
            <div class="field-group">
              <span class="label">Federal Tax ID</span>
              <div class="value">${taxId || ''}</div>
            </div>
            <div class="field-group">
              <span class="label">Anticipated Monthly Purchase</span>
              <div class="value">${anticipatedPurchase || ''}</div>
            </div>
          </div>
          <div class="col">
            <div class="field-group">
              <span class="label">State Resale Permit</span>
              <div class="value">${resalePermit || ''}</div>
            </div>
            <div class="field-group">
              <span class="label">Purchase Orders Required?</span>
              <div class="value">${poRequired || ''}</div>
            </div>
          </div>
        </div>
        <div class="field-group">
          <span class="label">Authorized Buyers</span>
          <div class="value">${authorizedBuyers || ''}</div>
        </div>
        <div class="grid">
          <div class="col">
            <div class="field-group">
              <span class="label">AP Contact Name</span>
              <div class="value">${apContact || ''}</div>
            </div>
          </div>
          <div class="col">
            <div class="field-group">
              <span class="label">AP Phone/Email</span>
              <div class="value">${apPhoneEmail || ''}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- DIRECTORS, OFFICERS & GUARANTORS -->
      <div class="section-title">Company Directors, Officers & Guarantors</div>
      <div class="content">
        ${directorsHtml}
      </div>

      <!-- TRADE & BANK REFERENCES -->
      <div class="section-title">Trade References & Bank Reference</div>
      <div class="content">
        ${referencesHtml}
        
        <div class="signature-block" style="border-style: solid; border-width: 1px; border: 1px dashed #ccc; padding: 10px; margin-top: 10px; background: #fafafa;">
          <div class="grid">
            <div class="col">
              <div class="field-group">
                <span class="label">Bank Name</span>
                <div class="value">${bankName || ''}</div>
              </div>
              <div class="field-group">
                <span class="label">Account Number</span>
                <div class="value">${bankAccount || ''}</div>
              </div>
            </div>
            <div class="col">
              <div class="field-group">
                <span class="label">Bank Phone</span>
                <div class="value">${bankPhone || ''}</div>
              </div>
              <div class="field-group">
                <span class="label">Account Type</span>
                <div class="value">${bankType || ''}</div>
              </div>
            </div>
          </div>
          <div class="field-group">
            <span class="label">Bank Address</span>
            <div class="value">${bankAddress || ''}</div>
          </div>
          <div class="field-group">
            <span class="label">Contact</span>
            <div class="value">${bankContact || ''}</div>
          </div>
        </div>
      </div>

      <!-- LEGAL AGREEMENT -->
      <div class="section-title">Agreement & Acceptance</div>
      <div class="content">
        <p style="font-size: 11px; line-height: 1.4; color: #666; background: #f9f9f9; padding: 10px; border: 1px solid #eee;">
          The undersigned agrees to pay for all goods purchased within 30 days from the date of invoice. TMS4, Inc is authorized to make inquiries into the banking and business trade references supplied above. It is understood that any information obtained will be used solely for granting credit. Returned items require a 20% restocking fee and customer prepaying the freight. Returned items will not be accepted without an RMA number. Should it become necessary to collect this account through an attorney, by legal proceedings, or otherwise, the undersigned, including endorsers, promise to pay all costs of collections, including reasonable attorney fees plus interest. All claims for shortage or credit must be made within two (2) business days. There will be a $25 charge on all NSF checks returned to TMS4, Inc. Personal Guarantee: The undersigned, in consideration of TMS4, Inc extending credit to the above-named applicant, does unconditionally, personally, and individually guarantee payment of all amounts owed by the above-named business, including interest, costs and attorney fees.
        </p>
        <div class="field-group">
          <span class="label">Agreement Status</span>
          <div class="value"><strong>ACCEPTED</strong> - I Agree</div>
        </div>
      </div>

      <!-- AUTHORIZATION & SIGNATURES -->
      <div class="section-title">Authorization</div>
      <div class="content">
        <div class="signature-block">
          <div class="grid">
            <div class="col">
              <div class="field-group">
                <span class="label">Authorized Signature</span>
                <div class="value" style="font-family: cursive; font-size: 18px;">${authSig || ''}</div>
              </div>
              <div class="field-group">
                <span class="label">Printed Name</span>
                <div class="value">${authPrintedName || ''}</div>
              </div>
            </div>
            <div class="col">
              <div class="field-group">
                <span class="label">Title</span>
                <div class="value">${authTitle || ''}</div>
              </div>
              <div class="field-group">
                <span class="label">Date</span>
                <div class="value">${authDate || ''}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="signature-block" style="margin-top: 15px; border: 1px dashed #ccc; padding: 10px; background: #fafafa;">
          <span class="label">Guarantor Signature</span>
          <div class="value" style="font-family: cursive; font-size: 18px;">${guarantorSig || ''}</div>
          <span class="label" style="margin-top: 5px;">Printed Name</span>
          <div class="value">${guarantorName || ''}</div>
        </div>
      </div>

      <div class="footer-text" style="font-size: 12px; color: #777; font-style: italic; padding: 20px; border-top: 1px solid #eee; background-color: #fdfdfd;">
        Inventory Protocol Initiated. A United Formulas specialist will follow up with you at ${email || ''} within 24 hours to discuss your inquiry.
      </div>
    </div>
  </div>
</body>
</html>
        `;

    const rawRecipients = process.env.CREDIT_EMAIL || warehouseEmail;
    const recipients = rawRecipients.split(',').map(email => email.trim());

    const { data, error } = await resend.emails.send({
      from: 'UF Credit Dept <notifications@unitedformulas.com>',
      to: recipients,
      subject: `CREDIT APPLICATION: ${companyName}`,
      html: htmlTemplate
    });

    console.log('Credit App Dispatch Response Data:', data);
    if (error) {
      console.error('Credit App Dispatch Error:', error);
      return NextResponse.json({ error: "Email dispatch failed.", details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Credit App Route Exception:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
