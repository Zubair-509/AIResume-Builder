
'use client';

import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

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

export function ResumeLoadingSkeleton() {
  return (
    <div className="space-y-4 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Section skeletons */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-3 pt-4">
          <Skeleton className="h-6 w-1/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      ))}

      {/* Skills skeleton */}
      <div className="space-y-3 pt-4">
        <Skeleton className="h-6 w-1/4" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((skill) => (
            <Skeleton key={skill} className="h-6 w-16" />
          ))}
        </div>
      </div>
    </div>
  );
}
