'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function PagePreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Add event listener for when the page is fully loaded
    const handleLoad = () => {
      clearTimeout(timer);
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center z-[100]"
          role="alert"
          aria-live="assertive"
          aria-label="Loading application"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              SnapCV
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Loading your resume builder...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}