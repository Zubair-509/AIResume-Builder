'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PageLoaderProps {
  /**
   * Maximum time in milliseconds the loader should be displayed
   * @default 3000
   */
  maxDisplayTime?: number;
  
  /**
   * Custom message to display during loading
   * @default "Loading..."
   */
  message?: string;
  
  /**
   * Whether to show the loader on initial page load
   * @default true
   */
  showOnInitialLoad?: boolean;
}

export function PageLoader({
  maxDisplayTime = 3000,
  message = "Loading...",
  showOnInitialLoad = true,
}: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(showOnInitialLoad);
  const [isVisible, setIsVisible] = useState(showOnInitialLoad);
  const router = useRouter();

  // Handle route change events
  useEffect(() => {
    // Function to handle start of navigation
    const handleStart = () => {
      setIsLoading(true);
      setIsVisible(true);
    };

    // Function to handle end of navigation
    const handleComplete = () => {
      setIsLoading(false);
    };

    // Subscribe to router events
    window.addEventListener('beforeunload', handleStart);
    
    // For Next.js navigation events
    if (router) {
      router.events?.on('routeChangeStart', handleStart);
      router.events?.on('routeChangeComplete', handleComplete);
      router.events?.on('routeChangeError', handleComplete);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      
      if (router) {
        router.events?.off('routeChangeStart', handleStart);
        router.events?.off('routeChangeComplete', handleComplete);
        router.events?.off('routeChangeError', handleComplete);
      }
    };
  }, [router]);

  // Handle initial page load
  useEffect(() => {
    if (showOnInitialLoad) {
      // Hide loader after content is loaded or max time is reached
      const contentLoadedTimer = setTimeout(() => {
        setIsLoading(false);
      }, Math.min(maxDisplayTime, 3000)); // Cap at 3 seconds max

      // Listen for when page is fully loaded
      const handleLoad = () => {
        clearTimeout(contentLoadedTimer);
        setIsLoading(false);
      };

      window.addEventListener('load', handleLoad);

      return () => {
        clearTimeout(contentLoadedTimer);
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [maxDisplayTime, showOnInitialLoad]);

  // Handle fade-out animation
  useEffect(() => {
    if (!isLoading) {
      // Small delay before hiding to allow fade-out animation
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(hideTimer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="alert"
          aria-live="assertive"
          aria-label="Page loading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center"
          >
            <div className="relative">
              {/* Primary spinner */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 1.5, ease: "linear", repeat: Infinity },
                  scale: { duration: 2, ease: "easeInOut", repeat: Infinity }
                }}
                className="w-16 h-16 rounded-full border-4 border-blue-100 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400"
              />
              
              {/* Secondary spinner (opposite direction) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-purple-500 dark:border-b-purple-400 opacity-70"
              />
              
              {/* Inner pulsing circle */}
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute inset-0 m-auto w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              />
            </div>
            
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-6 text-gray-700 dark:text-gray-300 font-medium"
            >
              {message}
            </motion.p>
            
            {/* Fallback for browsers without animation support */}
            <noscript>
              <div className="flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="ml-2">{message}</p>
              </div>
            </noscript>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}