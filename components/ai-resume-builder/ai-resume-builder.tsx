'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChatInterface } from './chat-interface';
import { ResumePreviewGrid } from './resume-preview-grid';
import { TemplateSelector } from './template-selector';
import { ResumeFormData } from '@/lib/validations';

export function AIResumeBuilder() {
  const [currentStep, setCurrentStep] = useState<'chat' | 'preview' | 'download'>('chat');
  const [resumeData, setResumeData] = useState<Partial<ResumeFormData> | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'creative'>('modern');

  const steps = [
    { id: 'chat', title: 'AI Chat', icon: MessageCircle, description: 'Tell us about yourself' },
    { id: 'preview', title: 'Preview', icon: FileText, description: 'Review your resumes' },
    { id: 'download', title: 'Download', icon: Download, description: 'Get your resume' }
  ];

  const handleChatComplete = (data: Partial<ResumeFormData>) => {
    setResumeData(data);
    setCurrentStep('preview');
  };

  const handleTemplateSelect = (template: 'modern' | 'classic' | 'creative') => {
    setSelectedTemplate(template);
    setCurrentStep('download');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI-Powered Resume Builder
            </span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Build Your Resume with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Magic</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Chat with our AI assistant to create a professional resume in minutes. 
            Our intelligent system will guide you through each step and generate multiple template options.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentStep === step.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : steps.findIndex(s => s.id === currentStep) > index
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                  <div className="hidden sm:block">
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs opacity-75">{step.description}</div>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                    steps.findIndex(s => s.id === currentStep) > index
                      ? 'bg-green-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatInterface onComplete={handleChatComplete} />
            </motion.div>
          )}

          {currentStep === 'preview' && resumeData && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ResumePreviewGrid 
                resumeData={resumeData} 
                onTemplateSelect={handleTemplateSelect}
              />
            </motion.div>
          )}

          {currentStep === 'download' && resumeData && (
            <motion.div
              key="download"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TemplateSelector 
                resumeData={resumeData}
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}