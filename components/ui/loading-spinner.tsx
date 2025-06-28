'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /**
   * Size of the spinner in pixels
   * @default 40
   */
  size?: number;
  
  /**
   * Primary color of the spinner
   * @default "text-blue-600"
   */
  color?: string;
  
  /**
   * Secondary color of the spinner
   * @default "text-gray-200"
   */
  secondaryColor?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Text to display below the spinner
   */
  text?: string;
}

export function LoadingSpinner({
  size = 40,
  color = "text-blue-600",
  secondaryColor = "text-gray-200",
  className,
  text
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Base circle */}
        <div 
          className={cn("absolute inset-0 rounded-full border-4 dark:opacity-20", secondaryColor)}
        />
        
        {/* Animated spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={cn("absolute inset-0 rounded-full border-4 border-transparent", color)}
          style={{ borderTopColor: 'currentColor', borderRightColor: 'transparent' }}
        />
        
        {/* Optional inner pulse */}
        <motion.div
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={cn("absolute rounded-full", color)}
          style={{ 
            width: size / 3, 
            height: size / 3, 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            opacity: 0.3
          }}
        />
      </div>
      
      {text && (
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-3 text-sm text-gray-600 dark:text-gray-400"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}