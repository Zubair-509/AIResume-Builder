'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  /**
   * Whether the overlay is visible
   */
  isLoading: boolean;
  
  /**
   * Text to display below the spinner
   * @default "Loading..."
   */
  text?: string;
  
  /**
   * Background color/opacity of the overlay
   * @default "bg-black/50"
   */
  background?: string;
  
  /**
   * Z-index of the overlay
   * @default 50
   */
  zIndex?: number;
  
  /**
   * Whether to blur the background
   * @default true
   */
  blur?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children to render behind the overlay
   */
  children?: React.ReactNode;
}

export function LoadingOverlay({
  isLoading,
  text = "Loading...",
  background = "bg-black/50",
  zIndex = 50,
  blur = true,
  className,
  children
}: LoadingOverlayProps) {
  const [isVisible, setIsVisible] = useState(isLoading);
  
  // Handle visibility with a slight delay for exit animations
  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  return (
    <div className="relative">
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "fixed inset-0 flex items-center justify-center",
              background,
              blur && "backdrop-blur-sm",
              className
            )}
            style={{ zIndex }}
            role="alert"
            aria-live="assertive"
            aria-label="Content is loading"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4"
            >
              <LoadingSpinner size={48} text={text} className="mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}