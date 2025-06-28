'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseLoadingOptions {
  /**
   * Initial loading state
   * @default false
   */
  initialState?: boolean;
  
  /**
   * Minimum loading time in milliseconds
   * @default 500
   */
  minDuration?: number;
  
  /**
   * Maximum loading time in milliseconds
   * @default 10000
   */
  maxDuration?: number;
  
  /**
   * Callback to run when loading completes
   */
  onComplete?: () => void;
}

/**
 * Custom hook for managing loading states with minimum and maximum durations
 */
export function useLoading({
  initialState = false,
  minDuration = 500,
  maxDuration = 10000,
  onComplete
}: UseLoadingOptions = {}) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [startTime, setStartTime] = useState<number | null>(initialState ? Date.now() : null);
  
  // Start loading
  const startLoading = useCallback(() => {
    setIsLoading(true);
    setStartTime(Date.now());
    
    // Set maximum loading time
    const maxTimer = setTimeout(() => {
      setIsLoading(false);
      setStartTime(null);
    }, maxDuration);
    
    return () => clearTimeout(maxTimer);
  }, [maxDuration]);
  
  // Stop loading with minimum duration enforcement
  const stopLoading = useCallback(() => {
    if (!startTime) {
      setIsLoading(false);
      return;
    }
    
    const elapsedTime = Date.now() - startTime;
    
    if (elapsedTime >= minDuration) {
      setIsLoading(false);
      setStartTime(null);
      onComplete?.();
    } else {
      // Wait for minimum duration
      const remainingTime = minDuration - elapsedTime;
      setTimeout(() => {
        setIsLoading(false);
        setStartTime(null);
        onComplete?.();
      }, remainingTime);
    }
  }, [startTime, minDuration, onComplete]);
  
  // Reset loading state
  const resetLoading = useCallback(() => {
    setIsLoading(false);
    setStartTime(null);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Any cleanup if needed
    };
  }, []);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    resetLoading
  };
}