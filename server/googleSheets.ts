import { google } from 'googleapis';

export interface GoogleSheetEnquiryRow {
  enquiryReference: string;
  date: string;
  time: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  destination: string;
  packageName: string;
  category: 'Domestic' | 'International' | 'Custom' | 'Service' | 'General';
  travelDate: string;
  numberOfTravellers: string;
  customerMessage: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';
}

/**
 * Appends an enquiry row to Google Sheets via Google Sheets API (Service Account)
 * or Google Apps Script Webhook URL.
 */
export async function appendEnquiryToGoogleSheet(row: GoogleSheetEnquiryRow): Promise<{ success: boolean; method: string; message: string }> {
  // Option 1: Google Apps Script Webhook (simplest, zero-config on server)
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.trim().startsWith('http')) {
    try {
      const response = await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'append_enquiry',
          ...row
        })
      });

      if (response.ok) {
        return {
          success: true,
          method: 'Google Apps Script Webhook',
          message: `Enquiry ${row.enquiryReference} appended to Google Sheet via Webhook.`
        };
      }
    } catch (err: any) {
      console.warn('[Google Sheets Webhook Error]:', err.message);
    }
  }

  // Option 2: Google Sheets API v4 using Service Account credentials
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (spreadsheetId && serviceAccountEmail && privateKey) {
    try {
      // Fix multiline private key formatting if passed via environment variables
      privateKey = privateKey.replace(/\\n/g, '\n');

      const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      const sheets = google.sheets({ version: 'v4', auth });

      // Row columns formatted as specified:
      // 1. Enquiry Reference, 2. Date, 3. Time, 4. Customer Name, 5. Phone Number, 6. Email,
      // 7. Destination, 8. Package, 9. Domestic / International, 10. Travel Date, 11. Number of Travellers,
      // 12. Customer Message, 13. Status
      const values = [
        [
          row.enquiryReference,
          row.date,
          row.time,
          row.customerName,
          row.phoneNumber,
          row.email || '-',
          row.destination || '-',
          row.packageName || '-',
          row.category || 'General',
          row.travelDate || '-',
          row.numberOfTravellers || '1',
          row.customerMessage || '-',
          row.status || 'New'
        ]
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Enquiries!A:M',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values }
      });

      return {
        success: true,
        method: 'Google Sheets API v4 (Service Account)',
        message: `Enquiry ${row.enquiryReference} appended to Google Sheet "${spreadsheetId}".`
      };
    } catch (err: any) {
      console.error('[Google Sheets API Error]:', err.message);
      return {
        success: false,
        method: 'Google Sheets API',
        message: `Failed to append to Google Sheet: ${err.message}`
      };
    }
  }

  // If credentials are not configured yet, return status explanation
  return {
    success: false,
    method: 'None Configured',
    message: 'Google Sheets credentials (GOOGLE_SHEETS_SPREADSHEET_ID & GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SHEETS_WEBHOOK_URL) are not set in environment.'
  };
}

/**
 * Updates status of an enquiry row in Google Sheets if connected.
 */
export async function updateEnquiryStatusInGoogleSheet(enquiryReference: string, newStatus: string): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.trim().startsWith('http')) {
    try {
      await fetch(webhookUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          enquiryReference,
          newStatus
        })
      });
      return true;
    } catch (err: any) {
      console.warn('[Google Sheets Update Status Webhook Error]:', err.message);
    }
  }

  return false;
}

/**
 * Diagnostics function to check Google Sheet integration status
 */
export function getGoogleSheetsConfigStatus() {
  const hasSpreadsheetId = !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const hasServiceAccount = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const hasPrivateKey = !!process.env.GOOGLE_PRIVATE_KEY;
  const hasWebhook = !!process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const isConfigured = (hasSpreadsheetId && hasServiceAccount && hasPrivateKey) || hasWebhook;

  return {
    isConfigured,
    mode: hasWebhook ? 'Webhook' : (hasSpreadsheetId && hasServiceAccount ? 'Service Account' : 'Not Configured'),
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || null,
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || null,
    hasWebhook: hasWebhook
  };
}
