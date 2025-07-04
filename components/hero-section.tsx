'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { BoltBadge } from '@/components/ui/bolt-badge';
import Link from 'next/link';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.0,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/6 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-full px-5 py-2.5 mb-6"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-Powered Resume Builder
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
        >
          <motion.span 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Snap
          </motion.span>
          <span className="text-gray-900 dark:text-white">CV</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Create professional resumes in minutes with our AI-powered builder. 
          Stand out from the crowd with beautiful, ATS-friendly designs.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
        >
          <Link href="/resume-builder">
            <AnimatedButton
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto flex items-center justify-center"
            >
              <span>Start Building Resume</span>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="ml-2 flex items-center"
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.div>
            </AnimatedButton>
          </Link>
          
          <Link href="/resume-example">
            <AnimatedButton
              variant="outline"
              size="lg"
              className="px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 w-full sm:w-auto"
            >
              View Examples
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Stats - Moved up to create space for scroll indicator */}
        <motion.div
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-20"
        >
          {[
            { number: '50K+', label: 'Resumes Created' },
            { number: '95%', label: 'Success Rate' },
            { number: '24/7', label: 'AI Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ 
                scale: 1.05,
                y: -5,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="text-center p-4 sm:p-6 rounded-2xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 cursor-pointer"
            >
              <motion.div 
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, type: 'spring', stiffness: 400, damping: 17 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center z-30"
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative cursor-pointer group flex flex-col items-center"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          {/* Floating Mouse Icon */}
          <div className="relative w-6 h-10 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center bg-transparent backdrop-blur-sm group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300 shadow-lg">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-gray-400 dark:bg-gray-300 rounded-full mt-2 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-300"
            />
          </div>
          
          {/* Floating Glow Effect */}
          <motion.div 
            className="absolute inset-0 w-6 h-10 border border-blue-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating Particles */}
          <motion.div
            className="absolute -top-2 -left-2 w-1 h-1 bg-blue-400 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              x: [0, 5, 0],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5
            }}
          />
          <motion.div
            className="absolute -top-1 -right-3 w-1 h-1 bg-purple-400 rounded-full opacity-60"
            animate={{
              y: [0, -25, 0],
              x: [0, -8, 0],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}