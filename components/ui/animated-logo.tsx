'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);

  const logoVariants = {
    idle: {
      rotate: 0,
      scale: 1,
      boxShadow: '0 0 0px rgba(124, 58, 237, 0)'
    },
    hovered: {
      rotate: 5,
      scale: 1.05,
      boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)'
    }
  };

  const textVariants = {
    idle: {
      scale: 1
    },
    hovered: {
      scale: 1.05
    }
  };

  return (
    <Link 
      href="/" 
      className="flex items-center space-x-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden"
        animate={isHovered ? 'hovered' : 'idle'}
        variants={logoVariants}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 17 
        }}
      >
        {/* Pulsating Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-80"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Shimmering Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
        
        {/* Icon */}
        <FileText className="w-5 h-5 text-white relative z-10" />
      </motion.div>
      
      {/* Animated Text */}
      <motion.span 
        className="text-xl font-bold relative"
        animate={isHovered ? 'hovered' : 'idle'}
        variants={textVariants}
      >
        {/* Animated Gradient Text */}
        <motion.span
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #d946ef, #8b5cf6, #3b82f6)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['0% center', '200% center']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ResumeAI
        </motion.span>
        
        {/* Fallback Text */}
        <span className="text-gray-900 dark:text-white opacity-0">
          ResumeAI
        </span>
      </motion.span>
    </Link>
  );
}