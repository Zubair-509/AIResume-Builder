'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingOverlay({
  isLoading,
  message = 'Loading...',
  fullScreen = false,
  className = ''
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            fullScreen
              ? 'fixed inset-0 z-50'
              : 'absolute inset-0 z-10'
          } flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-sm mx-auto text-center"
          >
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-700 dark:text-gray-300 font-medium">{message}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}