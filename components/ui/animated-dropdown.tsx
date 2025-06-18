'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface AnimatedDropdownProps {
  items: DropdownItem[];
  value?: string;
  placeholder?: string;
  onSelect: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function AnimatedDropdown({
  items,
  value,
  placeholder = 'Select an option',
  onSelect,
  className,
  disabled = false,
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find(item => item.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Trigger Button */}
      <motion.button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-200',
          'hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          'dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400',
          {
            'opacity-50 cursor-not-allowed': disabled,
            'border-blue-500 ring-2 ring-blue-500': isOpen,
          }
        )}
        whileHover={!disabled ? { scale: 1.01 } : {}}
        whileTap={!disabled ? { scale: 0.99 } : {}}
      >
        <div className="flex items-center space-x-2">
          {selectedItem?.icon && (
            <span className="text-gray-500 dark:text-gray-400">
              {selectedItem.icon}
            </span>
          )}
          <span className={cn(
            'block truncate',
            selectedItem ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
          )}>
            {selectedItem?.label || placeholder}
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Content */}
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto dark:bg-gray-800 dark:border-gray-600"
            >
              {items.map((item, index) => (
                <motion.button
                  key={item.value}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  type="button"
                  onClick={() => {
                    if (!item.disabled) {
                      onSelect(item.value);
                      setIsOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={cn(
                    'w-full flex items-center space-x-2 px-4 py-2 text-left transition-colors duration-150',
                    'hover:bg-blue-50 focus:outline-none focus:bg-blue-50',
                    'dark:hover:bg-blue-900/20 dark:focus:bg-blue-900/20',
                    {
                      'opacity-50 cursor-not-allowed': item.disabled,
                      'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300': value === item.value,
                    }
                  )}
                  whileHover={!item.disabled ? { x: 4 } : {}}
                >
                  {item.icon && (
                    <span className="text-gray-500 dark:text-gray-400">
                      {item.icon}
                    </span>
                  )}
                  <span className="block truncate text-gray-900 dark:text-gray-100">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}