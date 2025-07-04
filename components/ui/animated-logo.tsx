'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export function AnimatedLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      {/* Logo Icon with Glow and Animation */}
      <motion.div 
        className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden"
        whileHover={{ 
          scale: 1.05,
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.5 }
        }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 opacity-60 bg-blue-400"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ 
            filter: "blur(8px)",
            transform: "translateZ(0)"
          }}
        />
        
        {/* Logo icon */}
        <FileText className="w-4 h-4 text-white relative z-10" />
      </motion.div>
      
      {/* Logo Text */}
      <motion.span 
        className="font-bold text-xl text-gray-900 dark:text-white"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        <span className="text-blue-600">Snap</span>CV
      </motion.span>
    </Link>
  );
}