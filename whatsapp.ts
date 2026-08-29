import { CustomTripFormData, QuoteRequestData } from '../types';

export const COMPANY_PHONE = '6374509488';
export const COMPANY_PHONE_INTL = '+91 6374509488';
export const WHATSAPP_NUMBER = '916374509488';
export const COMPANY_EMAIL = 'happyjourneyholidayscbe@gmail.com';
export const COMPANY_ADDRESS = '1/149, Ganesh Complex, Avinashi Road, Neelambur, Coimbatore 641 062, Tamil Nadu, India';
export const COMPANY_NAME = 'Happy Journey Holidays';

/**
 * Creates a formatted WhatsApp web/mobile click-to-chat URL
 */
export function createWhatsAppLink(message?: string): string {
  const defaultMessage = 'Hello Happy Journey Holidays, I would like to enquire about a holiday package.';
  const encodedText = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
}

/**
 * WhatsApp message for specific destination packages
 */
export function createDestinationWhatsAppLink(destinationName: string, packageTitle?: string): string {
  const text = packageTitle 
    ? `Hello Happy Journey Holidays, I am interested in the "${packageTitle}" (${destinationName}) package. Please share the details and customized quotation.`
    : `Hello Happy Journey Holidays, I am interested in the ${destinationName} holiday package. Please share the itinerary details and quotation.`;
  return createWhatsAppLink(text);
}

/**
 * WhatsApp message for specific service enquiry
 */
export function createServiceWhatsAppLink(serviceTitle: string): string {
  const text = `Hello Happy Journey Holidays, I would like to enquire about your ${serviceTitle} service from Coimbatore. Please guide me with rates and details.`;
  return createWhatsAppLink(text);
}

/**
 * WhatsApp message formatted from custom trip form submission
 */
export function createCustomTripWhatsAppLink(data: CustomTripFormData, refId?: string): string {
  const text = `*New Trip Enquiry ${refId ? `(${refId})` : ''} - Happy Journey Holidays*
  
👤 *Name:* ${data.fullName}
📱 *Phone:* ${data.phone}
✉️ *Email:* ${data.email || 'N/A'}
📍 *Destination:* ${data.destination}
🛫 *Departure City:* ${data.departureCity || 'Coimbatore'}
🗓️ *Travel Date:* ${data.travelDate || 'Flexible'}
🔄 *Return Date:* ${data.returnDate || 'Flexible'}
👥 *Travelers:* ${data.adults} Adults, ${data.children} Children
🎒 *Trip Type:* ${data.tripType}
💰 *Approx. Budget:* ${data.budget || 'Standard'}
📝 *Special Notes:* ${data.specialRequirements || 'None'}

Please provide me with a customized quote and itinerary. Thank you!`;

  return createWhatsAppLink(text);
}

/**
 * WhatsApp message for instant quote request modal
 */
export function createQuickQuoteWhatsAppLink(data: QuoteRequestData, refId?: string): string {
  const text = `*Quick Quote Request ${refId ? `(${refId})` : ''} - Happy Journey Holidays*
  
👤 *Name:* ${data.fullName}
📱 *Phone:* ${data.phone}
📍 *Enquiry For:* ${data.destinationOrService}
🗓️ *Travel Date:* ${data.travelDate || 'Flexible'}
👥 *Travelers:* ${data.travelers || '1-2'}
📝 *Notes:* ${data.notes || 'Interested in package quotation'}

Please share the best quote.`;

  return createWhatsAppLink(text);
}
