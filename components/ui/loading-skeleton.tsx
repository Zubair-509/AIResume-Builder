'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  /**
   * Width of the skeleton
   * @default "100%"
   */
  width?: string | number;
  
  /**
   * Height of the skeleton
   * @default "1rem"
   */
  height?: string | number;
  
  /**
   * Border radius of the skeleton
   * @default "0.25rem"
   */
  borderRadius?: string | number;
  
  /**
   * Whether to animate the skeleton
   * @default true
   */
  animate?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function LoadingSkeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "0.25rem",
  animate = true,
  className
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-200 dark:bg-gray-700",
        className
      )}
      style={{
        width,
        height,
        borderRadius,
      }}
      role="status"
      aria-label="Loading"
    >
      {animate && (
        <motion.div
          animate={{
            x: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
}