'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useLoading } from '@/hooks/use-loading';

export function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, startLoading, stopLoading } = useLoading({
    minDuration: 500,
    maxDuration: 3000
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Handle route changes
  useEffect(() => {
    // Don't show loader on initial page load as PagePreloader handles that
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    
    startLoading();
    
    // This will run when the route change completes
    return () => {
      stopLoading();
    };
  }, [pathname, searchParams, startLoading, stopLoading, isFirstLoad]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          role="alert"
          aria-live="assertive"
          aria-label="Loading page content"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 blur-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Loading...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Preparing your content
            </p>
            
            <motion.div
              className="w-full bg-gray-200 dark:bg-gray-700 h-1 mt-6 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 2.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}