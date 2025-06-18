'use client';

import { motion } from 'framer-motion';
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-600 border-blue-200">
            Why Choose SnapCV
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need to Land Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Dream Job</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform combines cutting-edge technology with proven recruitment insights 
            to create resumes that get noticed by both ATS systems and hiring managers.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs with SnapCV. 
            Start building your winning resume today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/resume-builder">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/resume-example">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                View Examples
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}