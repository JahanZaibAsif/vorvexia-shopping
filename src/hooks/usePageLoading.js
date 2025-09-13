// hooks/usePageLoading.js
'use client';
import { useState, useEffect } from 'react';

export function usePageLoading(minLoadingTime = 2000) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if page has already loaded before
    const hasLoadedBefore = sessionStorage.getItem('pageHasLoaded');
    
    if (hasLoadedBefore) {
      // Skip loader for subsequent page loads in same session
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    // Simulate loading time and wait for DOM to be ready
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLoaded(true);
      // Mark that initial load is complete
      sessionStorage.setItem('pageHasLoaded', 'true');
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  const resetLoading = () => {
    sessionStorage.removeItem('pageHasLoaded');
    setIsLoading(true);
    setHasLoaded(false);
  };

  return { isLoading, hasLoaded, resetLoading };
}