'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  animate?: boolean;
}

export function LoadingSkeleton({
  width = '100%',
  height = '1rem',
  rounded = 'md',
  className = '',
  animate = true
}: LoadingSkeletonProps) {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };

  return (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 ${roundedMap[rounded]} ${className}`}
      style={{ width, height }}
    >
      {animate && (
        <motion.div
          className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
          animate={{
            x: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}