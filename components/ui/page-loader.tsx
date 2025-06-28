'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Reset loading state when route changes
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 500);
    };

    // Add event listeners for route changes
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    // Simulate loading for demo purposes
    if (pathname) {
      handleStart();
      setTimeout(handleComplete, 1000);
    }

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-sm mx-auto text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 relative mb-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, ease: "linear", repeat: Infinity },
                    scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                  }}
                  className="w-full h-full rounded-full border-4 border-blue-600 border-t-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 0.8, 1],
                        opacity: [1, 0.6, 1]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Loading...
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Preparing your content
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}