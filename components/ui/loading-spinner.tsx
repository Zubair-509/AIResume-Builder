'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  text,
  className = ''
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const colorMap = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    white: 'text-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <Loader2 className={`${sizeMap[size]} ${colorMap[color]} animate-spin`} />
      </motion.div>
      
      {text && (
        <p className={`mt-2 text-sm ${colorMap[color]}`}>
          {text}
        </p>
      )}
    </div>
  );
}