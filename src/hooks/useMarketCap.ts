'use client';

import { useState, useEffect, useRef } from 'react';
import { scrapeMarketCap } from '@/lib/marketCap';

export function useMarketCap() {
  const [value, setValue] = useState<string>('Loading...');
  const [raw, setRaw] = useState<number>(0);
  const [trend, setTrend] = useState<'up' | 'down'>('up');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const prevRawRef = useRef(raw);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketCap = async () => {
      if (!isMounted) return;
      
      try {
        setIsLoading(true);
        const marketCap = await scrapeMarketCap();
        
        if (marketCap !== null && isMounted) {
          setRaw(marketCap);
          setValue(new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(marketCap));
          setTrend(marketCap > prevRawRef.current ? 'up' : 'down');
          prevRawRef.current = marketCap;
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch market cap'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMarketCap();
    const interval = setInterval(fetchMarketCap, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { value, raw, trend, isLoading, error };
} 