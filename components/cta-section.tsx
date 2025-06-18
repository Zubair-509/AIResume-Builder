'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function CTASection() {
  const benefits = [
    'AI-powered content generation',
    'ATS-optimized templates',
    'Multiple export formats',
    'Privacy & security guaranteed'
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="get-started">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Land Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Dream Job?</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Join thousands of professionals who have transformed their careers with SnapCV. 
                Create your professional resume in minutes and start getting interviews today.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link href="/resume-builder">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Building Resume
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/resume-example">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 w-full sm:w-auto"
                >
                  View Examples
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>No Credit Card Required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-auto mb-6 flex items-center justify-center border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-center">
                      <div className="w-16 h-2 bg-blue-600 rounded mb-2"></div>
                      <div className="w-12 h-1 bg-gray-300 rounded mb-1"></div>
                      <div className="w-14 h-1 bg-gray-300 rounded mb-3"></div>
                      <div className="w-10 h-1 bg-purple-600 rounded mb-1"></div>
                      <div className="w-12 h-1 bg-gray-300 rounded mb-1"></div>
                      <div className="w-8 h-1 bg-gray-300 rounded"></div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Professional Resume
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Created in minutes, not hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 10, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}