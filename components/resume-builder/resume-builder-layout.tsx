'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumePreview } from './resume-preview';
import { TemplateSelector } from './template-selector';
import { ResumeFormData } from '@/lib/validations';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import Link from 'next/link';

interface ResumeBuilderLayoutProps {
  formData: ResumeFormData;
  resumeId?: string;
  onDataChange?: (data: ResumeFormData) => void;
}

export function ResumeBuilderLayout({ formData, resumeId, onDataChange }: ResumeBuilderLayoutProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'compact'>('modern');
  const [isSticky, setIsSticky] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        setUser(user);
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    
    checkAuth();
  }, []);

  // Save form data to session storage for editor access
  useEffect(() => {
    sessionStorage.setItem('resume-data', JSON.stringify(formData));
  }, [formData]);

  const handleSaveResume = async () => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to save your resume', {
        description: 'Please sign in or create an account to save your resume.',
        action: {
          label: 'Sign In',
          onClick: () => window.location.href = '/auth/login',
        },
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const resumeData = {
        user_id: user.id,
        title: `${formData.fullName}'s Resume`,
        data: formData,
        template: selectedTemplate,
        is_public: false,
        last_modified: new Date().toISOString()
      };
      
      if (resumeId) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update(resumeData)
          .eq('id', resumeId);
        
        if (error) {
          throw error;
        }
        
        toast.success('Resume updated successfully!', {
          description: 'Your changes have been saved.',
        });
      } else {
        // Create new resume
        const { error } = await supabase
          .from('resumes')
          .insert(resumeData);
        
        if (error) {
          throw error;
        }
        
        toast.success('Resume saved successfully!', {
          description: 'Your resume has been saved to your account.',
        });
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume', {
        description: 'Please try again or contact support if the issue persists.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Resume Preview (60% width) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`transition-all duration-300 ${
                isSticky ? 'lg:sticky lg:top-8' : ''
              }`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Resume Preview
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Live Preview</span>
                  </div>
                </div>
                
                <div 
                  className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600"
                  data-resume-preview
                >
                  <ResumePreview 
                    data={formData} 
                    template={selectedTemplate}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Template Selector & Actions (40% width) */}
          <div className="lg:col-span-2 relative">
            {/* Customize & Export Section - Static positioning */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 relative z-10 mb-8"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Customize & Export
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose a template and export your resume in your preferred format.
                </p>
              </div>

              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
                resumeData={formData}
              />
            </motion.div>

            {/* Save Resume Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 relative z-10 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Save Your Resume
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {isAuthenticated 
                  ? 'Save your resume to access it anytime from your dashboard.'
                  : 'Sign in to save your resume and access it from anywhere.'}
              </p>
              
              {isAuthenticated ? (
                <Button 
                  onClick={handleSaveResume}
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Resume
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/auth/login">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Sign In to Save
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button 
                      variant="outline"
                      className="w-full"
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Edit Resume Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 relative z-10 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Need to Make Changes?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Edit your resume content, add new sections, or customize the formatting with our advanced editor.
              </p>
              <Link href={`/edit-resume?template=${selectedTemplate}`}>
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                  onClick={() => {
                    // Save current data for editor
                    sessionStorage.setItem('resume-data', JSON.stringify(formData));
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Resume
                </Button>
              </Link>
            </motion.div>

            {/* Pro Tips Card - Positioned below with proper spacing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 relative z-10"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  The preview updates automatically as you make changes
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Try different templates to find your perfect style
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Download as PDF for the best print quality
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Use the editor for advanced customization options
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}