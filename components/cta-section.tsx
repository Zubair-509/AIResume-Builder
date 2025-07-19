'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const benefits = [
    'AI-powered content generation',
    'ATS-optimized templates',
    'Multiple export formats',
    'Privacy & security guaranteed'
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors(null);
    
    // Validate email
    if (!email.trim()) {
      setErrors('Please enter your email address');
      toast.error('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Successfully subscribed!', {
          description: 'Thank you for subscribing to our newsletter.'
        });
        setEmail('');
      } else {
        toast.error('Subscription failed', {
          description: data.message || 'Please try again later.'
        });
        setErrors(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Subscription failed', {
        description: 'An error occurred. Please try again later.'
      });
      setErrors('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden" id="get-started">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6">
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Ready to Land Your
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% 200%' }}
                > Dream Job?</motion.span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Join thousands of professionals who have transformed their careers with SnapCV. 
                Create your professional resume in minutes and start getting interviews today.
              </motion.p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
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
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group w-full sm:w-auto text-lg font-semibold"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-6 h-6 mr-3" />
                    </motion.div>
                    Start Building Resume
                    <motion.div
                      whileHover={{ x: 5, scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/resume-example">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.05)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-10 py-5 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-500 w-full sm:w-auto text-lg font-semibold hover:shadow-xl"
                  >
                    View Examples
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 max-w-lg">
                <div className="flex-1">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email for updates"
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 h-12 rounded-xl shadow-md focus:shadow-lg transition-all duration-300"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors) setErrors(null);
                      }}
                      disabled={isSubmitting}
                      aria-label="Email for newsletter"
                      aria-invalid={errors ? "true" : "false"}
                      aria-describedby={errors ? "email-error" : undefined}
                    />
                  </motion.div>
                  {errors && (
                    <motion.p 
                      id="email-error" 
                      className="text-sm text-red-500 mt-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors}
                    </motion.p>
                  )}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Button 
                    type="submit"
                    variant="outline" 
                    className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-12 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <motion.div 
                          className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      <>Subscribe</>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400"
            >
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05, color: "#6b7280" }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="w-4 h-4" />
                </motion.div>
                <span>100% Secure</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05, color: "#6b7280" }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>No Credit Card Required</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.4 }}
              className="border-0 shadow-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 overflow-hidden rounded-3xl transform-gpu"
            >
              <div className="p-10">
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.08, 1],
                      rotate: [0, 3, -3, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-40 h-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mx-auto mb-8 flex items-center justify-center border border-gray-200 dark:border-gray-700 transform-gpu"
                  >
                    <div className="text-center">
                      <motion.div 
                        className="w-20 h-3 bg-blue-600 rounded mb-3"
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-16 h-1.5 bg-gray-300 rounded mb-2"
                        animate={{ width: ["4rem", "3rem", "4rem"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-18 h-1.5 bg-gray-300 rounded mb-4"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-12 h-1.5 bg-purple-600 rounded mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-16 h-1.5 bg-gray-300 rounded mb-2"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-10 h-1.5 bg-gray-300 rounded"
                        animate={{ width: ["2.5rem", "3rem", "2.5rem"] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                    whileHover={{ scale: 1.05, color: "#3b82f6" }}
                    transition={{ duration: 0.2 }}
                  >
                    Professional Resume
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 text-base"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Created in minutes, not hours
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl transform-gpu"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 15, 0],
                x: [0, 8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl transform-gpu"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}