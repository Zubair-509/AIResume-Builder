'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  ripple?: boolean;
  className?: string;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = 'default', size = 'md', ripple = true, className, ...props }, ref) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

    const baseClasses = cn(
      'relative overflow-hidden rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Variants
        'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500': variant === 'default',
        'border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800': variant === 'outline',
        'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800': variant === 'ghost',
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'destructive',
        
        // Sizes
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      },
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
      }
      
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 17 
        }}
        onClick={handleClick}
        {...props}
      >
        {children}
        
        {/* Ripple Effect */}
        {ripple && (
          <div className="absolute inset-0 pointer-events-none">
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                className="absolute rounded-full bg-white/30"
                style={{
                  left: ripple.x - 10,
                  top: ripple.y - 10,
                  width: 20,
                  height: 20,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';