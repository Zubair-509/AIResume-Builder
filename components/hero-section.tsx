'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

      {/* Simple Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-full px-6 py-3 mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-Powered Resume Builder
            </span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block">
            Snap
          </span>
          <span className="text-gray-900 dark:text-white">
            CV
          </span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Create professional resumes in minutes with our AI-powered builder. 
          Stand out from the crowd with beautiful, ATS-friendly designs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <Link href="/resume-builder">
            <AnimatedButton
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group w-full sm:w-auto flex items-center justify-center text-lg font-semibold"
            >
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                Start Building Resume
              </span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </AnimatedButton>
          </Link>

          <Link href="/resume-example">
            <AnimatedButton
              variant="outline"
              size="lg"
              className="px-10 py-5 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 backdrop-blur-md bg-white/60 dark:bg-gray-800/60 w-full sm:w-auto text-lg font-semibold hover:shadow-xl"
            >
              View Examples
            </AnimatedButton>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-3xl mx-auto mb-24">
          {[
            { number: '50K+', label: 'Resumes Created' },
            { number: '95%', label: 'Success Rate' },
            { number: '24/7', label: 'AI Support' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 sm:p-8 rounded-3xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center z-30">
        <div
          className="cursor-pointer group flex flex-col items-center"
          onClick={() => {
            if (typeof window !== 'undefined' && window.lenis) {
              window.lenis.scrollTo(window.innerHeight, { duration: 1.5 });
            } else {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }
          }}
        >
          <div className="w-7 h-12 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center bg-white/10 dark:bg-gray-800/10 backdrop-blur-md group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300 shadow-xl">
            <div className="w-2 h-4 bg-gray-400 dark:bg-gray-300 rounded-full mt-2 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-300" />
          </div>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}