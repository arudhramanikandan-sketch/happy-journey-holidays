/**
 * API Configuration & Endpoint Resolver
 * 
 * Ensures API requests route properly in all deployment environments:
 * 1. Inside Google Cloud Run dev/preview container or local dev server:
 *    Uses relative paths ('/api/...')
 * 2. When deployed on an external custom domain or static hosting (e.g., happyjourneyholidays.com, github.io):
 *    Routes to the live Cloud Run backend server running Express + Brevo + Google Sheets.
 */

export const BACKEND_URL = 'https://ais-dev-jbax7iudswuzuusnwrxu3x-892923131955.asia-southeast1.run.app';

export function getApiBaseUrl(): string {
  // If explicitly provided via Vite build environment
  const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/$/, '');
  }

  // Check client execution environment
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname.toLowerCase();

    // If running in local development or inside Google Cloud Run environment
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.run.app')
    ) {
      return '';
    }

    // On external live website (e.g. happyjourneyholidays.com, GitHub Pages, Vercel)
    return BACKEND_URL;
  }

  return '';
}

/**
 * Builds the full API URL for a given relative endpoint path.
 * e.g., apiUrl('/api/otp/email/send')
 */
export function apiUrl(endpoint: string): string {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${cleanEndpoint}`;
}
