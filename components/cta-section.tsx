'use client';

import React from 'react';
import { ArrowRight, Sparkles, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Ready to Get Started?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Your Dream Job is Just One
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Resume Away
              </span>
            </h2>

            <p className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed">
              Join over 50,000 professionals who have successfully landed their dream jobs 
              using our AI-powered resume builder. Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/resume-builder">
                <Button 
                  size="lg" 
                  className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group w-full sm:w-auto text-lg hover:scale-105"
                >
                  <span>Create My Resume</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>

              <Link href="/resume-example">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-10 py-5 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 w-full sm:w-auto text-lg font-semibold hover:shadow-xl hover:scale-105"
                >
                  View Examples
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2">50K+</div>
                <div className="text-sm opacity-80">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">AI Support</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              {/* Simple Resume Mockup */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="text-center">
                  <div className="w-20 h-3 bg-blue-600 rounded mb-3" />
                  <div className="w-16 h-1.5 bg-gray-300 rounded mb-2" />
                  <div className="w-18 h-1.5 bg-gray-300 rounded mb-4" />
                  <div className="w-12 h-1.5 bg-purple-600 rounded mb-2" />
                  <div className="w-16 h-1.5 bg-gray-300 rounded mb-2" />
                  <div className="w-10 h-1.5 bg-gray-300 rounded" />
                </div>
              </div>

              {/* Feature Icons */}
              <div className="flex justify-center space-x-6 mt-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-300" />
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-xl">
                  <Zap className="w-6 h-6 text-purple-300" />
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-xl">
                  <Sparkles className="w-6 h-6 text-pink-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}