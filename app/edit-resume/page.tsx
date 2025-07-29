'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { 
  Loader2, 
  AlertCircle, 
  FileText, 
  Edit, 
  Palette, 
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { ResumeEditor } from '@/components/resume-editor/resume-editor';
import { ResumeCustomizer } from '@/components/resume-customizer/resume-customizer';
import { Navigation } from '@/components/navigation';
import { ResumeFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface CustomizationSettings {
  font: {
    family: string;
    sizes: {
      heading: number;
      subheading: number;
      body: number;
      small: number;
    };
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  sections: Array<{
    id: string;
    type: string;
    title: string;
    order: number;
    visible: boolean;
    customContent?: any;
  }>;
  layout: {
    template: 'modern' | 'classic' | 'creative';
    spacing: 'compact' | 'normal' | 'spacious';
    columns: 1 | 2;
  };
}

export default function EditResumePage() {
  const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('edit');
  const searchParams = useSearchParams();
  const template = searchParams.get('template') as 'modern' | 'classic' | 'creative' || 'modern';

  // Initialize customization settings with defaults
  const [customizationSettings, setCustomizationSettings] = useState<CustomizationSettings>({
    font: {
      family: 'Inter',
      sizes: {
        heading: 24,
        subheading: 18,
        body: 14,
        small: 12
      }
    },
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#7c3aed',
      text: '#1f2937',
      background: '#ffffff'
    },
    sections: [
      { id: '1', type: 'personal', title: 'Personal Information', order: 1, visible: true },
      { id: '2', type: 'summary', title: 'Professional Summary', order: 2, visible: true },
      { id: '3', type: 'experience', title: 'Work Experience', order: 3, visible: true },
      { id: '4', type: 'education', title: 'Education', order: 4, visible: true },
      { id: '5', type: 'skills', title: 'Skills', order: 5, visible: true }
    ],
    layout: {
      template: template,
      spacing: 'normal',
      columns: 1
    }
  });

  useEffect(() => {
    loadResumeData();
  }, []);

  const loadResumeData = async () => {
    try {
      // Try to load from localStorage first (draft)
      const draft = localStorage.getItem('resume-draft');
      if (draft) {
        const draftData = JSON.parse(draft);
        setResumeData(draftData);
        setIsLoading(false);
        return;
      }

      // Try to load from session storage (from AI builder or form)
      const sessionData = sessionStorage.getItem('resume-data');
      if (sessionData) {
        const data = JSON.parse(sessionData);
        setResumeData(data);
        setIsLoading(false);
        return;
      }

      // If no data found, show error
      setError('No resume data found. Please create a resume first.');
    } catch (error) {
      console.error('Failed to load resume data:', error);
      setError('Failed to load resume data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: ResumeFormData) => {
    try {
      // Save to localStorage
      localStorage.setItem('resume-data', JSON.stringify(data));
      
      // Also save to session storage for cross-page access
      sessionStorage.setItem('resume-data', JSON.stringify(data));
      
      // Update local state
      setResumeData(data);
      
      // Here you would typically save to your backend/database
      console.log('Resume saved:', data);
    } catch (error) {
      console.error('Failed to save resume:', error);
      throw error;
    }
  };

  const handleExport = async (data: ResumeFormData, filename: string) => {
    try {
      // The PDF export is handled by the PDFExporter component
      console.log('Exporting resume:', filename);
    } catch (error) {
      console.error('Failed to export resume:', error);
      throw error;
    }
  };

  const handleUpdateCustomization = (settings: CustomizationSettings) => {
    setCustomizationSettings(prev => {
      const updated = { ...settings };
      // Save customization settings to localStorage
      localStorage.setItem('resume-customization', JSON.stringify(updated));
      return updated;
    });
  };

  // Load saved customization settings on mount
  useEffect(() => {
    const savedCustomization = localStorage.getItem('resume-customization');
    if (savedCustomization) {
      try {
        const settings = JSON.parse(savedCustomization);
        setCustomizationSettings(settings);
      } catch (error) {
        console.error('Failed to load customization settings:', error);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Loading Your Resume
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Preparing your editing workspace...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 overflow-hidden">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Resume Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {error || 'No resume data available to edit.'}
                </p>
                <div className="space-y-3">
                  <Link href="/resume-builder">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <FileText className="w-4 h-4 mr-2" />
                      Create New Resume
                    </Button>
                  </Link>
                  <Link href="/build-with-ai">
                    <Button variant="outline" className="w-full border-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Build with AI
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <Navigation />
      
      {/* Enhanced Header */}
      <div className="pt-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full px-6 py-3 mb-6 border border-blue-200/50 dark:border-blue-700/50"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Edit className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Professional Resume Editor
                </span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Edit & Customize Your
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
                  Perfect Resume
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                Edit your resume content and customize its appearance all in one place. 
                Switch between editing and customization seamlessly with real-time preview.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Real-time Preview</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Auto-save Enabled</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">PDF Export Ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Enhanced Tab Navigation with Fixed Overlapping */}
              <div className="flex justify-center mb-8">
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <TabsList className="relative grid w-full max-w-lg grid-cols-2 bg-transparent p-0 h-auto gap-2">
                    {/* Animated Background - Fixed positioning and sizing */}
                    <motion.div
                      className="absolute inset-y-2 rounded-xl shadow-lg z-0"
                      style={{
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                      }}
                      animate={{
                        x: activeTab === 'edit' ? 4 : 'calc(50% + 4px)',
                        width: 'calc(50% - 8px)'
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.4
                      }}
                    />
                    
                    <TabsTrigger 
                      value="edit" 
                      className="relative z-10 flex items-center justify-center space-x-3 rounded-xl px-8 py-4 transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent border-0 hover:text-gray-900 dark:hover:text-gray-100 min-w-0"
                    >
                      <Edit className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">Edit Content</span>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="customize" 
                      className="relative z-10 flex items-center justify-center space-x-3 rounded-xl px-8 py-4 transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-none bg-transparent border-0 hover:text-gray-900 dark:hover:text-gray-100 min-w-0"
                    >
                      <Palette className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">Customize</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              {/* Tab Content with Enhanced Animations */}
              <AnimatePresence mode="wait">
                <TabsContent value="edit" className="mt-0">
                  <motion.div
                    key="edit"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <ResumeEditor
                      initialData={resumeData}
                      customizationSettings={customizationSettings}
                      onUpdateCustomization={handleUpdateCustomization}
                      onSave={handleSave}
                      onExport={handleExport}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="customize" className="mt-0">
                  <motion.div
                    key="customize"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <ResumeCustomizer
                      resumeData={resumeData}
                      onSave={handleUpdateCustomization}
                    />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Footer with Quick Actions */}
      <div className="relative z-10 mt-16">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Need Help Getting Started?
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/resume-example">
                  <Button variant="outline" className="border-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                    View Examples
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/enhance-resume">
                  <Button variant="outline" className="border-2 hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Enhancement
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}