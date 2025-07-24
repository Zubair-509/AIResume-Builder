'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Zap, 
  Shield, 
  Download, 
  Palette, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Content Generation',
      description: 'Our advanced AI analyzes your experience and generates compelling, ATS-optimized content that highlights your strengths and achievements.',
      benefits: ['Smart keyword optimization', 'Industry-specific language', 'Achievement quantification'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Professional Templates',
      description: 'Choose from our curated collection of modern, recruiter-approved templates designed to make you stand out in any industry.',
      benefits: ['ATS-friendly designs', 'Multiple formats', 'Customizable layouts'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your personal information is protected with enterprise-grade security. We never share your data with third parties.',
      benefits: ['End-to-end encryption', 'GDPR compliant', 'Secure data storage'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Download,
      title: 'Multiple Export Options',
      description: 'Download your resume in various formats including PDF, Word, and HTML. Perfect for online applications and printing.',
      benefits: ['High-quality PDF export', 'Editable Word format', 'Web-ready HTML'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Resumes Created', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Award },
    { number: '24/7', label: 'AI Support', icon: Zap },
    { number: '100%', label: 'ATS Compatible', icon: CheckCircle }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden" id="features">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Badge variant="outline" className="mb-6 px-6 py-3 text-blue-600 border-blue-200 shadow-lg">
              Why Choose SnapCV
            </Badge>
          </motion.div>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Everything You Need to Land Your
            <motion.span 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 200%' }}
            > Dream Job</motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our AI-powered platform combines cutting-edge technology with proven recruitment insights 
            to create resumes that get noticed by both ATS systems and hiring managers.
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 cursor-pointer transform-gpu"
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg"
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  delay: 0.5 + index * 0.1,
                  type: 'spring',
                  stiffness: 300,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#3b82f6"
                }}
              >
                {stat.number}
              </motion.div>
              <motion.div 
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
                whileHover={{ color: "#6b7280" }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHoverVariants}
                className="h-full border-0 shadow-xl hover:shadow-3xl transition-all duration-500 bg-white dark:bg-gray-800 overflow-hidden rounded-3xl transform-gpu"
              >
                <div className="p-10">
                  <div className="flex items-start space-x-6 mb-8">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl shadow-2xl`}
                      variants={iconVariants}
                      whileHover={{
                        scale: 1.15,
                        rotate: 15,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div 
                        key={benefitIndex} 
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ 
                          delay: 0.5 + index * 0.1 + benefitIndex * 0.1,
                          duration: 0.5
                        }}
                        whileHover={{ x: 8, scale: 1.02 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        </motion.div>
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white overflow-hidden relative"
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full"
            animate={{
              x: [50, 200, 50],
              y: [50, -100, 50],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-60 h-60 bg-white opacity-10 rounded-full"
            animate={{
              x: [0, 150, 0],
              y: [0, 100, 0],
              scale: [1, 2, 1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.h3 
            className="text-4xl font-bold mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Ready to Transform Your Career?
          </motion.h3>
          <motion.p 
            className="text-xl opacity-90 mb-10 max-w-3xl mx-auto relative z-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Join thousands of professionals who have successfully landed their dream jobs with SnapCV. 
            Start building your winning resume today.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link href="/resume-builder">
              <motion.button
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 group text-lg"
              >
                <span>Start Building Now</span>
                <motion.div
                  className="inline-block ml-3"
                  whileHover={{ x: 5, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </motion.button>
            </Link>
            
            <Link href="/resume-example">
              <motion.button
                whileHover={{ 
                  scale: 1.08, 
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold hover:bg-white/10 transition-all duration-500 text-lg"
              >
                View Examples
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}