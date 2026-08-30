import { useState, useEffect, useCallback } from 'react';
import { HolidayPackage } from '../types';
import { FEATURED_PACKAGES } from '../data/travelData';

export function usePublicPackages(category?: 'domestic' | 'international') {
  const [packages, setPackages] = useState<HolidayPackage[]>(() => {
    if (category) {
      return FEATURED_PACKAGES.filter(p => p.category === category);
    }
    return FEATURED_PACKAGES;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      const url = category ? `/api/packages?category=${category}` : '/api/packages';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch packages: ${res.statusText}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.packages)) {
        setPackages(data.packages);
      }
    } catch (err: any) {
      console.warn('Using fallback packages due to network/server response:', err);
      // Fallback to static packages
      if (category) {
        setPackages(FEATURED_PACKAGES.filter(p => p.category === category));
      } else {
        setPackages(FEATURED_PACKAGES);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { packages, loading, error, refresh: fetchPackages };
}
