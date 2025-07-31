
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

      {/* Content sections */}
      <div className="space-y-6 mt-8">
        {/* Professional Summary */}
        <div>
          <Skeleton className="h-6 w-1/3 mb-3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <Skeleton className="h-6 w-1/3 mb-3" />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <Skeleton className="h-6 w-1/4 mb-3" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="h-4 w-1/5" />
            </div>
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>

        {/* Skills */}
        <div>
          <Skeleton className="h-6 w-1/5 mb-3" />
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
