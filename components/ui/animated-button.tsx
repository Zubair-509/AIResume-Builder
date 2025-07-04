'use client';

import React, { useState, forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps, MotionConfig } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  ripple?: boolean;
  className?: string;
  disabled?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = 'default', size = 'md', ripple = true, className, disabled, ...props }, ref) => {
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
      if (ripple && !disabled) {
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
      <MotionConfig reducedMotion="user">
        <motion.button
          ref={ref}
          className={baseClasses}
          onClick={handleClick}
          disabled={disabled}
          whileHover={
            disabled
              ? {}
              : {
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }
          }
          whileTap={
            disabled
              ? {}
              : {
                  scale: 0.98,
                  transition: { duration: 0.2 },
                }
          }
          {...props}
        >
          {children}
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
      </MotionConfig>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';