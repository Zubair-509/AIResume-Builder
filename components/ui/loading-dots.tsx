'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingDotsProps {
  /**
   * Number of dots to display
   * @default 3
   */
  count?: number;
  
  /**
   * Size of each dot in pixels
   * @default 8
   */
  size?: number;
  
  /**
   * Color of the dots
   * @default "bg-blue-600"
   */
  color?: string;
  
  /**
   * Space between dots in pixels
   * @default 4
   */
  spacing?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function LoadingDots({
  count = 3,
  size = 8,
  color = "bg-blue-600",
  spacing = 4,
  className
}: LoadingDotsProps) {
  // Create an array of the specified count
  const dots = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div 
      className={cn("flex items-center", className)}
      style={{ gap: spacing }}
      role="status"
      aria-label="Loading"
    >
      {dots.map((i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className={cn("rounded-full", color)}
          style={{ 
            width: size, 
            height: size 
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}