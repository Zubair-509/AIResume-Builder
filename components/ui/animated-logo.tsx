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
          boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)"
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 10 
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        
        {/* Logo icon */}
        <FileText className="w-5 h-5 text-white relative z-10" />
        
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          animate={{ 
            opacity: [0, 0.2, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Logo Text */}
      <motion.span 
        className="font-bold text-xl text-gray-900 dark:text-white"
        whileHover={{ 
          color: "#4f46e5",
          transition: { duration: 0.2 }
        }}
      >
        SnapCV
      </motion.span>
    </Link>
  );
}