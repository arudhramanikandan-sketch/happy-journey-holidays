// Safe storage utility for sandboxed iframe compatibility

export function getStorageItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (err) {
    console.warn('[Storage access restricted]:', err);
  }
  return null;
}

export function setStorageItem(key: string, value: string): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return true;
    }
  } catch (err) {
    console.warn('[Storage write restricted]:', err);
  }
  return false;
}

export function removeStorageItem(key: string): boolean {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
      return true;
    }
  } catch (err) {
    console.warn('[Storage remove restricted]:', err);
  }
  return false;
}
