'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './loading-spinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  blur?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function LoadingOverlay({
  isLoading,
  text = 'Loading...',
  blur = true,
  className = '',
  children
}: LoadingOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-10 ${
              blur ? 'backdrop-blur-sm' : ''
            }`}
          >
            <div className="text-center">
              <LoadingSpinner size="lg" />
              {text && (
                <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                  {text}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}