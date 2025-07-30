'use client';

import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import Link from 'next/link';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Lightweight parallax effects
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 sm:pb-32 pt-16 sm:pt-20 px-4"
    >
      {/* Simplified Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
        style={{ opacity }}
      />

      {/* Lightweight Background Shapes */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(y, [0, -100], [0, -50]) }}
          className="absolute top-1/3 right-1/4 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />

        {/* Simple floating dots */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-500 rounded-full opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-2/3 right-1/6 w-2 h-2 bg-purple-500 rounded-full opacity-60"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-5xl mx-auto text-center w-full"
      >
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-Powered Resume Builder
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight px-2"
        >
          <motion.span 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Snap
          </motion.span>
          <span className="text-gray-900 dark:text-white">CV</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
        >
          Create professional resumes in minutes with our AI-powered builder. 
          Stand out from the crowd with beautiful, ATS-friendly designs.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-12 sm:mb-16 px-2"
        >
          <Link href="/resume-builder" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
            >
              <AnimatedButton
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group w-full sm:w-auto flex items-center justify-center text-base sm:text-lg font-semibold"
              >
                <span>Start Building Resume</span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2 sm:ml-3 flex items-center"
                >
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                </motion.div>
              </AnimatedButton>
            </motion.div>
          </Link>

          <Link href="/resume-example" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
            >
              <AnimatedButton
                variant="outline"
                size="lg"
                className="px-6 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 backdrop-blur-md bg-white/60 dark:bg-gray-800/60 w-full sm:w-auto text-base sm:text-lg font-semibold hover:shadow-xl"
              >
                View Examples
              </AnimatedButton>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats - Mobile Optimized */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto mb-16 sm:mb-24 px-2"
        >
          {[
            { number: '50K+', label: 'Resumes Created' },
            { number: '95%', label: 'Success Rate' },
            { number: '24/7', label: 'AI Support' },
            { number: '100%', label: 'ATS Compatible' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-center p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-200"
            >
              <div className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Mobile-Optimized Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="cursor-pointer flex flex-col items-center"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          {/* Simplified Mouse Icon */}
          <div className="relative w-5 h-8 sm:w-7 sm:h-12 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center bg-white/10 dark:bg-gray-800/10 backdrop-blur-md hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 sm:w-2 sm:h-4 bg-gray-400 dark:bg-gray-300 rounded-full mt-1 sm:mt-2"
            />
          </div>

          {/* Scroll Text - Hidden on very small screens */}
          <div className="mt-2 sm:mt-4 text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
            Scroll to explore
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}