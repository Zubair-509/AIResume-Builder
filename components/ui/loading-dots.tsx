'use client';

import { motion } from 'framer-motion';

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export function LoadingDots({ 
  size = 'md', 
  color = 'primary',
  className = ''
}: LoadingDotsProps) {
  const sizeMap = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };
  
  const colorMap = {
    primary: 'bg-blue-600 dark:bg-blue-400',
    secondary: 'bg-gray-600 dark:bg-gray-400',
    white: 'bg-white'
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className={`flex space-x-2 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`rounded-full ${sizeMap[size]} ${colorMap[color]}`}
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
}