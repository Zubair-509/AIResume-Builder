'use client';

import { motion } from 'framer-motion';
import { Eye, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeFormData } from '@/lib/validations';
import { ResumePreview } from '@/components/resume-builder/resume-preview';
import Link from 'next/link';

interface ResumePreviewGridProps {
  resumeData: Partial<ResumeFormData>;
  onTemplateSelect: (template: 'modern' | 'classic' | 'creative') => void;
}

export function ResumePreviewGrid({ resumeData, onTemplateSelect }: ResumePreviewGridProps) {
  const templates = [
    {
      id: 'modern' as const,
      name: 'Modern Minimalist',
      description: 'Clean, contemporary design perfect for tech and creative roles',
      features: ['ATS-Optimized', 'Clean Layout', 'Modern Typography'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'classic' as const,
      name: 'Traditional Corporate',
      description: 'Professional, traditional layout ideal for corporate positions',
      features: ['Professional', 'Traditional', 'Corporate-Ready'],
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'creative' as const,
      name: 'Creative Professional',
      description: 'Stylish design that showcases creativity while maintaining professionalism',
      features: ['Creative', 'Eye-Catching', 'Professional'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'executive' as const,
      name: 'Executive Premium',
      description: 'Sophisticated layout designed for senior leadership positions',
      features: ['Executive', 'Leadership Focus', 'Achievement-Oriented'],
      color: 'from-indigo-600 to-blue-800'
    },
    {
      id: 'technical' as const,
      name: 'Technical Specialist',
      description: 'Optimized for technical roles with skills matrix and project emphasis',
      features: ['Technical Focus', 'Skills Matrix', 'Project Showcase'],
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'entry-level' as const,
      name: 'Entry Level Fresh',
      description: 'Perfect for new graduates and career starters with education emphasis',
      features: ['Education Focus', 'Skills Highlight', 'Project Showcase'],
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Choose Your Perfect Template
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We've generated professional resume templates based on your information. 
          Select the one that best represents your style and industry.
        </p>
      </motion.div>

      {/* Template Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group"
          >
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Template Preview */}
                <div className="relative h-80 overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <div className="scale-[0.3] origin-top-left w-[300%] h-[300%] pointer-events-none">
                    <ResumePreview 
                      data={resumeData as ResumeFormData} 
                      template={template.id === 'creative' ? 'modern' : template.id}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Template Info - Flex grow to fill remaining space */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${template.color} flex-shrink-0 ml-3`} />
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons - Push to bottom with margin-top auto */}
                  <div className="space-y-3 mt-auto">
                    <Button
                      onClick={() => onTemplateSelect(template.id)}
                      className={`w-full bg-gradient-to-r ${template.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group h-11 flex items-center justify-center`}
                    >
                      <span>Select Template</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full h-10 flex items-center justify-center border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      <span>Quick Download</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Comparison Feature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Can't Decide?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Compare templates side by side or download all three to see which works best for your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/templates">
                <Button variant="outline" size="sm" className="h-10">
                  Compare Templates
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="h-10">
                Download All Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}