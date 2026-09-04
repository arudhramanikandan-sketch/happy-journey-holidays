import fs from 'fs';
import path from 'path';
import { appendEnquiryToGoogleSheet, updateEnquiryStatusInGoogleSheet, GoogleSheetEnquiryRow } from './googleSheets.js';
import { sendEnquiryNotificationEmail } from './emailNotifier.js';

export type EnquiryStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUOTE SENT' 
  | 'CONFIRMED' 
  | 'LOST / CANCELLED' 
  | 'CLOSED';

export type EnquirySource = 'Website Enquiry' | 'WhatsApp Direct';

export function normalizeStatus(status?: string): EnquiryStatus {
  if (!status) return 'NEW';
  const s = status.toUpperCase().trim();
  if (s === 'NEW') return 'NEW';
  if (s === 'CONTACTED') return 'CONTACTED';
  if (s === 'QUOTE SENT' || s === 'IN PROGRESS' || s === 'QUOTED') return 'QUOTE SENT';
  if (s === 'CONFIRMED' || s === 'COMPLETED' || s === 'BOOKED') return 'CONFIRMED';
  if (s === 'LOST / CANCELLED' || s === 'CANCELLED' || s === 'LOST' || s === 'REJECTED') return 'LOST / CANCELLED';
  if (s === 'CLOSED' || s === 'DONE') return 'CLOSED';
  return 'NEW';
}

export type EnquiryCategory = 'Domestic' | 'International' | 'Custom' | 'Service' | 'General';

export interface EnquiryRecord {
  id: string; // e.g. 'HJH-829104'
  enquiryReference: string; // same as id
  source: EnquirySource; // 'Website Enquiry' or 'WhatsApp Direct'
  date: string; // e.g. '31/08/2026'
  time: string; // e.g. '04:15 PM'
  customerName: string;
  phoneNumber: string;
  email?: string;
  destination?: string;
  packageName?: string;
  category: EnquiryCategory;
  travelDate?: string;
  returnDate?: string;
  numberOfTravellers?: string;
  adults?: number;
  children?: number;
  budget?: string;
  tripType?: string;
  departureCity?: string;
  specialRequirements?: string;
  customerMessage?: string;
  phoneVerified?: boolean;
  status: EnquiryStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  googleSheetStatus: 'synced' | 'pending' | 'failed' | 'not_configured';
  googleSheetError?: string;
  emailNotificationStatus: 'sent' | 'pending' | 'failed' | 'logged';
}

const DATA_DIR = path.join(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data folder and enquiries file exist
function ensureStorageExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    // Initial sample record for demonstration
    const initialRecords: EnquiryRecord[] = [
      {
        id: 'HJH-739201',
        enquiryReference: 'HJH-739201',
        source: 'Website Enquiry',
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        customerName: 'Karthik Subramanian',
        phoneNumber: '+91 98421 88990',
        email: 'karthik.subramanian@gmail.com',
        destination: 'Singapore & Malaysia Combo',
        packageName: 'Singapore & Malaysia Spectacular',
        category: 'International',
        travelDate: '2026-10-15',
        numberOfTravellers: '2 Adults, 1 Child',
        adults: 2,
        children: 1,
        budget: '₹1,50,000 - ₹2,00,000',
        tripType: 'Family Holiday',
        departureCity: 'Coimbatore',
        specialRequirements: 'Sentosa pass, Universal Studios tickets, and 4-star hotel in Kuala Lumpur.',
        customerMessage: 'Looking for Sentosa pass, Universal Studios tickets, and 4-star hotel in Kuala Lumpur.',
        status: 'NEW',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        googleSheetStatus: 'synced',
        emailNotificationStatus: 'sent'
      },
      {
        id: 'HJH-618290',
        enquiryReference: 'HJH-618290',
        source: 'Website Enquiry',
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        customerName: 'Priya & Anand',
        phoneNumber: '+91 97890 12345',
        email: 'priya.anand@outlook.com',
        destination: 'Kashmir Paradise Honeymoon',
        packageName: 'Kashmir Paradise & Houseboat Honeymoon',
        category: 'Domestic',
        travelDate: '2026-11-05',
        numberOfTravellers: '2 Adults',
        adults: 2,
        children: 0,
        budget: '₹75,000 - ₹1,00,000',
        tripType: 'Honeymoon',
        departureCity: 'Coimbatore',
        specialRequirements: 'Luxury houseboat stay at Dal Lake, Gulmarg Gondola Phase 2 tickets, and romantic candle light dinner.',
        customerMessage: 'Need luxury houseboat stay at Dal Lake, Gulmarg Gondola Phase 2 tickets, and romantic candle light dinner.',
        status: 'QUOTE SENT',
        createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
        googleSheetStatus: 'synced',
        emailNotificationStatus: 'sent'
      }
    ];
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(initialRecords, null, 2), 'utf-8');
  }
}

export function loadEnquiries(): EnquiryRecord[] {
  ensureStorageExists();
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    const records: EnquiryRecord[] = JSON.parse(raw);
    return records.map(rec => ({
      ...rec,
      source: rec.source || 'Website Enquiry',
      status: normalizeStatus(rec.status),
      specialRequirements: rec.specialRequirements || rec.customerMessage || ''
    }));
  } catch (err) {
    console.error('Failed to read enquiries file:', err);
    return [];
  }
}

function saveEnquiries(enquiries: EnquiryRecord[]) {
  ensureStorageExists();
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save enquiries file:', err);
  }
}

export interface CreateEnquiryInput {
  type?: 'custom_trip' | 'package_quote' | 'service_quote' | 'contact_message' | 'whatsapp_direct';
  source?: EnquirySource;
  fullName: string;
  phone: string;
  email?: string;
  destination?: string;
  packageName?: string;
  category?: EnquiryCategory;
  travelDate?: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  travelers?: string;
  budget?: string;
  tripType?: string;
  departureCity?: string;
  specialRequirements?: string;
  message?: string;
  notes?: string;
  phoneVerified?: boolean;
}

/**
 * Creates an enquiry record, syncs to Google Sheets and sends real notification email
 */
export async function createNewCustomerEnquiry(input: CreateEnquiryInput): Promise<EnquiryRecord> {
  const enquiries = loadEnquiries();

  // Generate Reference ID: HJH-XXXXXX
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const enquiryReference = `HJH-${randomSuffix}`;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const timeStr = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Determine category
  let category: EnquiryCategory = input.category || 'General';
  if (!input.category) {
    const dest = (input.destination || '').toLowerCase();
    const pkg = (input.packageName || '').toLowerCase();
    if (
      dest.includes('singapore') ||
      dest.includes('malaysia') ||
      dest.includes('dubai') ||
      dest.includes('thailand') ||
      dest.includes('bangkok') ||
      dest.includes('phuket') ||
      dest.includes('pattaya') ||
      dest.includes('bali') ||
      dest.includes('indonesia') ||
      dest.includes('vietnam') ||
      dest.includes('europe') ||
      dest.includes('sri lanka') ||
      dest.includes('maldives') ||
      dest.includes('mauritius') ||
      dest.includes('reunion') ||
      dest.includes('uk') ||
      dest.includes('united kingdom') ||
      dest.includes('london') ||
      dest.includes('france') ||
      dest.includes('paris') ||
      dest.includes('belgium') ||
      dest.includes('bruges') ||
      dest.includes('brussels') ||
      dest.includes('netherlands') ||
      dest.includes('amsterdam') ||
      dest.includes('germany') ||
      dest.includes('munich') ||
      dest.includes('berlin') ||
      dest.includes('switzerland') ||
      dest.includes('swiss') ||
      dest.includes('italy') ||
      dest.includes('rome') ||
      dest.includes('venice') ||
      dest.includes('vatican') ||
      pkg.includes('international')
    ) {
      category = 'International';
    } else if (
      dest.includes('kashmir') ||
      dest.includes('kerala') ||
      dest.includes('munnar') ||
      dest.includes('alleppey') ||
      dest.includes('himachal') ||
      dest.includes('manali') ||
      dest.includes('shimla') ||
      dest.includes('goa') ||
      dest.includes('andaman') ||
      dest.includes('rajasthan') ||
      dest.includes('jaipur') ||
      dest.includes('udaipur') ||
      dest.includes('ooty') ||
      dest.includes('kodaikanal') ||
      dest.includes('coorg') ||
      dest.includes('wayanad') ||
      pkg.includes('domestic')
    ) {
      category = 'Domestic';
    } else if (input.type === 'custom_trip') {
      category = 'Custom';
    } else if (input.type === 'service_quote') {
      category = 'Service';
    }
  }

  // Determine number of travellers
  let numberOfTravellers = input.travelers || '';
  if (!numberOfTravellers) {
    const adults = input.adults !== undefined ? Number(input.adults) : 1;
    const children = input.children !== undefined ? Number(input.children) : 0;
    numberOfTravellers = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}`;
  }

  // Customer message aggregation
  const combinedMessage = [
    input.notes,
    input.specialRequirements,
    input.message,
    input.budget ? `Budget: ${input.budget}` : '',
    input.departureCity ? `Departure City: ${input.departureCity}` : '',
    input.tripType ? `Trip Style: ${input.tripType}` : ''
  ]
    .filter(Boolean)
    .join(' | ');

  const newRecord: EnquiryRecord = {
    id: enquiryReference,
    enquiryReference,
    source: input.source || (input.type === 'whatsapp_direct' ? 'WhatsApp Direct' : 'Website Enquiry'),
    date: dateStr,
    time: timeStr,
    customerName: input.fullName.trim(),
    phoneNumber: input.phone.trim(),
    email: input.email ? input.email.trim() : undefined,
    destination: input.destination || input.packageName || 'Holiday Enquiry',
    packageName: input.packageName || input.destination,
    category,
    travelDate: input.travelDate || undefined,
    returnDate: input.returnDate || undefined,
    numberOfTravellers,
    adults: input.adults,
    children: input.children,
    budget: input.budget,
    tripType: input.tripType,
    departureCity: input.departureCity,
    specialRequirements: input.specialRequirements || input.notes || input.message || '',
    customerMessage: combinedMessage || (input.type === 'whatsapp_direct' ? 'WhatsApp Direct Click' : 'Direct inquiry from website'),
    phoneVerified: Boolean(input.phoneVerified),
    status: 'NEW',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    googleSheetStatus: 'pending',
    emailNotificationStatus: 'pending'
  };

  // 1. Save initially to durable server database
  enquiries.unshift(newRecord);
  saveEnquiries(enquiries);

  // 2. Sync to Google Sheet asynchronously
  const sheetRow: GoogleSheetEnquiryRow = {
    enquiryReference: newRecord.enquiryReference,
    date: newRecord.date,
    time: newRecord.time,
    customerName: newRecord.customerName,
    phoneNumber: newRecord.phoneNumber,
    email: newRecord.email || '',
    destination: newRecord.destination || '',
    packageName: newRecord.packageName || '',
    category: newRecord.category,
    travelDate: newRecord.travelDate || '',
    numberOfTravellers: newRecord.numberOfTravellers || '',
    customerMessage: newRecord.customerMessage || '',
    status: newRecord.status
  };

  try {
    const sheetRes = await appendEnquiryToGoogleSheet(sheetRow);
    newRecord.googleSheetStatus = sheetRes.success ? 'synced' : 'pending';
    if (!sheetRes.success) {
      newRecord.googleSheetError = sheetRes.message;
    }
  } catch (err: any) {
    newRecord.googleSheetStatus = 'failed';
    newRecord.googleSheetError = err.message;
  }

  // 3. Send Real Email Notification to happyjourneyholidayscbe@gmail.com
  try {
    const emailRes = await sendEnquiryNotificationEmail({
      enquiryReference: newRecord.enquiryReference,
      customerName: newRecord.customerName,
      phoneNumber: newRecord.phoneNumber,
      email: newRecord.email,
      destination: newRecord.destination,
      packageName: newRecord.packageName,
      category: newRecord.category,
      travelDate: newRecord.travelDate,
      numberOfTravellers: newRecord.numberOfTravellers,
      budget: newRecord.budget,
      departureCity: newRecord.departureCity,
      tripType: newRecord.tripType,
      customerMessage: newRecord.customerMessage,
      date: newRecord.date,
      time: newRecord.time
    });
    newRecord.emailNotificationStatus = emailRes.success ? 'sent' : 'failed';
  } catch (err: any) {
    newRecord.emailNotificationStatus = 'failed';
  }

  // Save updated sync status to local database
  saveEnquiries(enquiries);

  return newRecord;
}

export function getAllEnquiries(): EnquiryRecord[] {
  return loadEnquiries();
}

export function getEnquiryById(id: string): EnquiryRecord | undefined {
  const list = loadEnquiries();
  return list.find(e => e.id === id || e.enquiryReference === id);
}

export async function updateEnquiryStatus(id: string, newStatus: EnquiryStatus): Promise<EnquiryRecord | null> {
  const enquiries = loadEnquiries();
  const index = enquiries.findIndex(e => e.id === id || e.enquiryReference === id);
  if (index === -1) return null;

  enquiries[index].status = newStatus;
  enquiries[index].updatedAt = new Date().toISOString();

  // Try updating in Google Sheet if webhook configured
  try {
    await updateEnquiryStatusInGoogleSheet(enquiries[index].enquiryReference, newStatus);
  } catch (err) {
    console.warn('Could not update status in Google Sheet:', err);
  }

  saveEnquiries(enquiries);
  return enquiries[index];
}

export function deleteEnquiryRecord(id: string): boolean {
  const enquiries = loadEnquiries();
  const filtered = enquiries.filter(e => e.id !== id && e.enquiryReference !== id);
  if (filtered.length === enquiries.length) return false;
  saveEnquiries(filtered);
  return true;
}

export async function resyncEnquiry(id: string): Promise<{ success: boolean; enquiry: EnquiryRecord | null; message: string }> {
  const enquiries = loadEnquiries();
  const index = enquiries.findIndex(e => e.id === id || e.enquiryReference === id);
  if (index === -1) return { success: false, enquiry: null, message: 'Enquiry not found.' };

  const record = enquiries[index];

  const sheetRow: GoogleSheetEnquiryRow = {
    enquiryReference: record.enquiryReference,
    date: record.date,
    time: record.time,
    customerName: record.customerName,
    phoneNumber: record.phoneNumber,
    email: record.email || '',
    destination: record.destination || '',
    packageName: record.packageName || '',
    category: record.category,
    travelDate: record.travelDate || '',
    numberOfTravellers: record.numberOfTravellers || '',
    customerMessage: record.customerMessage || '',
    status: record.status
  };

  const sheetRes = await appendEnquiryToGoogleSheet(sheetRow);
  record.googleSheetStatus = sheetRes.success ? 'synced' : 'failed';
  if (!sheetRes.success) {
    record.googleSheetError = sheetRes.message;
  } else {
    record.googleSheetError = undefined;
  }

  record.updatedAt = new Date().toISOString();
  saveEnquiries(enquiries);

  return {
    success: sheetRes.success,
    enquiry: record,
    message: sheetRes.message
  };
}
