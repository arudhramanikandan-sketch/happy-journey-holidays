export interface EmailEnquiryPayload {
  enquiryReference: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  destination?: string;
  packageName?: string;
  category?: string;
  travelDate?: string;
  numberOfTravellers?: string;
  budget?: string;
  departureCity?: string;
  tripType?: string;
  customerMessage?: string;
  date: string;
  time: string;
}

const DEFAULT_NOTIFICATION_RECIPIENT = 'happyjourneyholidayscbe@gmail.com';

/**
 * Sends an email using Brevo (Sendinblue) Transactional REST API v3
 * Free tier: 300 free emails/day.
 * Works over HTTPS (port 443), avoiding any port restrictions in cloud environments.
 */
async function sendViaBrevo(options: {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}): Promise<{ sent: boolean; messageId?: string; error?: string }> {
  const brevoApiKey = process.env.BREVO_API_KEY?.trim();
  if (!brevoApiKey) {
    return { sent: false, error: 'BREVO_API_KEY is not configured.' };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || DEFAULT_NOTIFICATION_RECIPIENT;
  const senderName = process.env.BREVO_SENDER_NAME || 'Happy Journey Holidays';

  try {
    const payload = {
      sender: {
        name: senderName,
        email: senderEmail
      },
      to: [
        {
          email: options.toEmail.trim(),
          name: options.toName || options.toEmail.split('@')[0]
        }
      ],
      replyTo: {
        name: senderName,
        email: senderEmail
      },
      subject: options.subject,
      htmlContent: options.htmlContent,
      textContent: options.textContent || undefined
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000)
    });

    const responseData = (await response.json().catch(() => ({}))) as any;

    if (response.ok && (response.status === 200 || response.status === 201)) {
      const messageId = responseData?.messageId || 'brevo-dispatched';
      console.log(`[Brevo Email Engine] ✅ Successfully delivered to ${options.toEmail} (MessageId: ${messageId})`);
      return { sent: true, messageId };
    } else {
      const errorMsg = responseData?.message || `Brevo returned HTTP ${response.status}`;
      console.error(`[Brevo Email Engine Error]: ${errorMsg}`);
      return { sent: false, error: errorMsg };
    }
  } catch (err: any) {
    console.error(`[Brevo Email Engine Network Exception]:`, err.message);
    return { sent: false, error: err.message };
  }
}

/**
 * Sends a real 6-digit OTP verification code to customer's email address
 */
export async function sendOtpVerificationEmail(
  customerEmail: string,
  customerName: string,
  otpCode: string,
  destinationOrPackage?: string
): Promise<{ success: boolean; message: string }> {
  const recipient = customerEmail.trim();

  const subject = `Your OTP for Trip Enquiry: ${otpCode} - Happy Journey Holidays`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 14px rgba(0,0,0,0.06); }
        .header { background: #001329; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #F27D26; }
        .header h1 { margin: 0; font-size: 20px; color: #38B6FF; }
        .header p { margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; }
        .content { padding: 28px 24px; text-align: center; }
        .otp-box { background: #fff7ed; border: 2px dashed #F27D26; border-radius: 14px; padding: 18px 24px; margin: 24px auto; display: inline-block; }
        .otp-code { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #ea580c; font-family: 'Courier New', monospace; }
        .info-text { font-size: 14px; color: #475569; line-height: 1.6; margin: 12px 0; }
        .notice { font-size: 12px; color: #94a3b8; margin-top: 20px; }
        .footer { background: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Happy Journey Holidays</h1>
          <p>Coimbatore • Travel Enquiry Verification</p>
        </div>
        <div class="content">
          <p class="info-text">
            Hello <strong>${customerName || 'Valued Traveller'}</strong>,<br>
            Thank you for planning your holiday${destinationOrPackage ? ` to <strong>${destinationOrPackage}</strong>` : ''} with us. Please use the One-Time Password (OTP) below to complete your enquiry submission.
          </p>

          <div class="otp-box">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #c2410c; margin-bottom: 6px; letter-spacing: 1px;">Your Verification Code</div>
            <div class="otp-code">${otpCode}</div>
          </div>

          <p class="info-text">
            This verification code is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.
          </p>

          <p class="notice">
            If you did not request this OTP, you can safely ignore this email.
          </p>
        </div>
        <div class="footer">
          Happy Journey Holidays Coimbatore • Avinashi Road, Neelambur, Coimbatore, Tamil Nadu<br>
          Phone: +91 94894 88849 / +91 94894 88859
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Hello ${customerName || 'Valued Traveller'},

Your One-Time Password (OTP) for submitting your travel enquiry with Happy Journey Holidays is:

${otpCode}

This code is valid for 5 minutes.

Happy Journey Holidays Coimbatore
Avinashi Road, Neelambur, Coimbatore
Phone: +91 94894 88849
  `;

  // Dispatch via Brevo Transactional Email API if configured
  if (process.env.BREVO_API_KEY) {
    const brevoResult = await sendViaBrevo({
      toEmail: recipient,
      toName: customerName,
      subject,
      htmlContent,
      textContent
    });

    if (brevoResult.sent) {
      return {
        success: true,
        message: `OTP sent to ${recipient} via Brevo`
      };
    }
    console.error(`[Email OTP Engine] Brevo delivery failed: ${brevoResult.error}`);
    return {
      success: false,
      message: `Failed to dispatch OTP email: ${brevoResult.error}`
    };
  }

  // If BREVO_API_KEY is not configured, log generated OTP for testing
  console.log(`[Email OTP Engine] (BREVO_API_KEY not configured) Generated OTP code ${otpCode} for email ${recipient}`);
  return {
    success: true,
    message: `OTP email simulation logged for ${recipient}. To send live emails, set BREVO_API_KEY in environment.`
  };
}

/**
 * Sends a real notification email for a customer enquiry to happyjourneyholidayscbe@gmail.com
 */
export async function sendEnquiryNotificationEmail(payload: EmailEnquiryPayload): Promise<{ success: boolean; message: string }> {
  const recipient = process.env.NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_RECIPIENT;

  const cleanPhone = payload.phoneNumber.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${payload.customerName}, thank you for contacting Happy Journey Holidays Coimbatore regarding your enquiry ${payload.enquiryReference} for ${payload.destination || 'your holiday'}. We would be happy to share your customized itinerary!`)}`;

  const subject = `[New Enquiry ${payload.enquiryReference}] ${payload.customerName} - ${payload.destination || payload.packageName || 'Trip Quote'}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #001329; color: #ffffff; padding: 24px; text-align: center; border-bottom: 3px solid #F27D26; }
        .header h1 { margin: 0; font-size: 20px; color: #38B6FF; }
        .header p { margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; }
        .badge { display: inline-block; background: #F27D26; color: #ffffff; font-weight: bold; font-size: 13px; padding: 4px 12px; border-radius: 20px; margin-top: 8px; font-family: monospace; }
        .content { padding: 24px; }
        .field-group { margin-bottom: 16px; }
        .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold; color: #64748b; margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #0f172a; font-weight: 600; }
        .details-table { width: 100%; border-collapse: collapse; margin: 16px 0; background: #f8fafc; border-radius: 12px; overflow: hidden; }
        .details-table td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
        .details-table td.label { font-weight: bold; color: #475569; width: 40%; }
        .message-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px; margin-top: 16px; }
        .actions { margin-top: 24px; text-align: center; }
        .btn-whatsapp { display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 10px; font-size: 14px; margin-right: 8px; }
        .btn-call { display: inline-block; background: #002B54; color: #ffffff; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 10px; font-size: 14px; }
        .footer { background: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Happy Journey Holidays</h1>
          <p>Coimbatore • New Customer Travel Enquiry</p>
          <div class="badge">Reference: ${payload.enquiryReference}</div>
        </div>

        <div class="content">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
            <div>
              <div class="field-label">Received On</div>
              <div style="font-size: 13px; font-weight: bold; color: #334155;">${payload.date} at ${payload.time}</div>
            </div>
            <div style="text-align: right;">
              <div class="field-label">Category</div>
              <div style="font-size: 13px; font-weight: bold; color: #0284c7;">${payload.category || 'Holiday Package'}</div>
            </div>
          </div>

          <table class="details-table">
            <tr>
              <td class="label">Customer Name</td>
              <td style="font-size: 15px; font-weight: bold; color: #001329;">${payload.customerName}</td>
            </tr>
            <tr>
              <td class="label">Phone / WhatsApp</td>
              <td style="font-weight: bold; color: #059669;">
                <a href="tel:${payload.phoneNumber}" style="color: #059669; text-decoration: none;">${payload.phoneNumber}</a>
              </td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td>${payload.email || 'Not Provided'}</td>
            </tr>
            <tr>
              <td class="label">Destination / Tour</td>
              <td style="font-weight: bold; color: #d97706;">${payload.destination || payload.packageName || 'Custom Request'}</td>
            </tr>
            <tr>
              <td class="label">Travel Date</td>
              <td>${payload.travelDate || 'Flexible'}</td>
            </tr>
            <tr>
              <td class="label">No. of Travellers</td>
              <td>${payload.numberOfTravellers || 'Not Specified'}</td>
            </tr>
            ${payload.departureCity ? `<tr><td class="label">Departure City</td><td>${payload.departureCity}</td></tr>` : ''}
            ${payload.budget ? `<tr><td class="label">Estimated Budget</td><td>${payload.budget}</td></tr>` : ''}
            ${payload.tripType ? `<tr><td class="label">Trip Type</td><td>${payload.tripType}</td></tr>` : ''}
          </table>

          ${payload.customerMessage ? `
            <div class="message-box">
              <div style="font-size: 11px; font-weight: bold; color: #c2410c; text-transform: uppercase; margin-bottom: 4px;">Customer Notes / Requests:</div>
              <div style="font-size: 13px; color: #7c2d12; line-height: 1.5; white-space: pre-wrap;">${payload.customerMessage}</div>
            </div>
          ` : ''}

          <div class="actions">
            <a href="${whatsappUrl}" target="_blank" class="btn-whatsapp">
              💬 Reply on WhatsApp
            </a>
            <a href="tel:${payload.phoneNumber}" class="btn-call">
              📞 Call Customer
            </a>
          </div>
        </div>

        <div class="footer">
          Happy Journey Holidays Coimbatore • Automated Enquiry Notification System<br>
          Avinashi Road, Neelambur, Coimbatore, Tamil Nadu
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
NEW CUSTOMER ENQUIRY - HAPPY JOURNEY HOLIDAYS
--------------------------------------------------
Enquiry Reference: ${payload.enquiryReference}
Received: ${payload.date} at ${payload.time}
Status: New

CUSTOMER DETAILS:
- Name: ${payload.customerName}
- Phone: ${payload.phoneNumber}
- Email: ${payload.email || 'None'}

TRAVEL DETAILS:
- Destination / Package: ${payload.destination || payload.packageName || 'Custom'}
- Category: ${payload.category || 'General'}
- Travel Date: ${payload.travelDate || 'Flexible'}
- Travellers: ${payload.numberOfTravellers || '1'}
- Departure City: ${payload.departureCity || 'Coimbatore'}
- Budget: ${payload.budget || 'Standard'}

NOTES / REQUIREMENTS:
${payload.customerMessage || 'No specific notes'}

WhatsApp Customer: ${whatsappUrl}
--------------------------------------------------
`;

  // Dispatch via Brevo Transactional Email API if configured
  if (process.env.BREVO_API_KEY) {
    const brevoResult = await sendViaBrevo({
      toEmail: recipient,
      toName: 'Happy Journey Holidays Team',
      subject,
      htmlContent,
      textContent
    });

    if (brevoResult.sent) {
      console.log(`[Email Notification Sent] Real email successfully delivered to ${recipient} via Brevo for Enquiry ${payload.enquiryReference}`);
      return {
        success: true,
        message: `Notification email dispatched to ${recipient} via Brevo`
      };
    }
    console.error(`[Email Notification Error] Brevo delivery failed: ${brevoResult.error}`);
    return {
      success: false,
      message: `Failed to deliver email: ${brevoResult.error}`
    };
  }

  // If BREVO_API_KEY is not configured, log enquiry notification
  console.log(`[Email Notification Logged] Real email to ${recipient} queued: Enquiry ${payload.enquiryReference} (${payload.customerName})`);
  return {
    success: true,
    message: `Email notification logged for ${recipient}. To send live emails, set BREVO_API_KEY in environment.`
  };
}
