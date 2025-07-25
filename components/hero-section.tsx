'use client';

import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { BoltBadge } from '@/components/ui/bolt-badge';
import Link from 'next/link';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32 pt-20"
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
        style={{ opacity }}
      />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/6 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        />
        
        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/6 w-4 h-4 bg-blue-500 rounded-full opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-1/3 right-1/6 w-3 h-3 bg-purple-500 rounded-full opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-500 rounded-full opacity-60"
        />
        
        {/* Sparkle Effects */}
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          className="absolute top-1/5 right-1/3"
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          style={{ animationDelay: '1.5s' }}
          className="absolute bottom-1/4 left-1/5"
        >
          <Star className="w-5 h-5 text-blue-400" />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute top-2/3 right-1/5"
        >
          <Zap className="w-4 h-4 text-purple-400" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-full px-6 py-3 mb-6 shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-Powered Resume Builder
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
        >
          <motion.span 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Snap
          </motion.span>
          <motion.span 
            className="text-gray-900 dark:text-white"
            animate={{
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 0px rgba(0,0,0,0)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            CV
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Create professional resumes in minutes with our AI-powered builder. 
            Stand out from the crowd with beautiful, ATS-friendly designs.
          </motion.span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
        >
          <Link href="/resume-builder">
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <AnimatedButton
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group w-full sm:w-auto flex items-center justify-center text-lg font-semibold"
              >
                <motion.span
                  className="bg-gradient-to-r from-white to-blue-100 bg-clip-text"
                >
                  Start Building Resume
                </motion.span>
                <motion.div
                  whileHover={{ x: 8, scale: 1.2 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="ml-3 flex items-center"
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </AnimatedButton>
            </motion.div>
          </Link>
          
          <Link href="/resume-example">
            <motion.div
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.9)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <AnimatedButton
                variant="outline"
                size="lg"
                className="px-10 py-5 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-500 backdrop-blur-md bg-white/60 dark:bg-gray-800/60 w-full sm:w-auto text-lg font-semibold hover:shadow-xl"
              >
                <motion.span
                  whileHover={{ color: "#3b82f6" }}
                  transition={{ duration: 0.2 }}
                >
                  View Examples
                </motion.span>
              </AnimatedButton>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats - Moved up to create space for scroll indicator */}
        <motion.div
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-3xl mx-auto mb-24"
        >
          {[
            { number: '50K+', label: 'Resumes Created' },
            { number: '95%', label: 'Success Rate' },
            { number: '24/7', label: 'AI Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ 
                scale: 1.08,
                y: -8,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-center p-6 sm:p-8 rounded-3xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <motion.div 
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 1.5 + index * 0.2, 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 15,
                  duration: 0.8
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#3b82f6",
                  transition: { duration: 0.2 }
                }}
              >
                {stat.number}
              </motion.div>
              <motion.div 
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
                whileHover={{
                  color: "#6b7280",
                  transition: { duration: 0.2 }
                }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center z-30"
      >
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
            rotateX: [0, 10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative cursor-pointer group flex flex-col items-center transform-gpu"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          {/* Floating Mouse Icon */}
          <motion.div 
            className="relative w-7 h-12 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center bg-white/10 dark:bg-gray-800/10 backdrop-blur-md group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-500 shadow-xl"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-4 bg-gray-400 dark:bg-gray-300 rounded-full mt-2 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-500"
            />
          </motion.div>
          
          {/* Floating Glow Effect */}
          <motion.div 
            className="absolute inset-0 w-7 h-12 border border-blue-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating Particles */}
          <motion.div
            className="absolute -top-3 -left-3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-70"
            animate={{
              y: [0, -25, 0],
              x: [0, 8, 0],
              opacity: [0.7, 0, 0.7],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -top-2 -right-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-70"
            animate={{
              y: [0, -30, 0],
              x: [0, -10, 0],
              opacity: [0.7, 0, 0.7],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1.5,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-2 left-1/2 w-1 h-1 bg-pink-400 rounded-full opacity-70"
            animate={{
              y: [0, 20, 0],
              x: [0, -5, 0],
              opacity: [0.7, 0, 0.7],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: 2,
              ease: "easeInOut"
            }}
          />
          
          {/* Scroll Text */}
          <motion.div
            className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-medium"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}