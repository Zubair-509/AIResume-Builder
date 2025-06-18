'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function BoltBadge() {
  return (
    <motion.a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-full px-4 py-2 group relative overflow-hidden"
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Animated Bolt Icon */}
      <motion.div
        className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-1.5"
        animate={{ 
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.1, 1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Zap className="w-3.5 h-3.5 text-white" />
      </motion.div>
      
      {/* Text */}
      <motion.span 
        className="relative text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ['0% center', '200% center']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% auto'
        }}
      >
        Built with Bolt
      </motion.span>
      
      {/* Animated Arrow */}
      <motion.span
        className="relative w-2 h-2 border-t-2 border-r-2 border-purple-400 transform rotate-45 opacity-0 group-hover:opacity-100"
        animate={{ 
          x: [0, 3, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.5
        }}
      />
    </motion.a>
  );
}