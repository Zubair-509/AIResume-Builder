'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Copy, ExternalLink, Loader2, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeFormData } from '@/lib/validations';
import { ResumePreview } from '@/components/resume-builder/resume-preview';
import { toast } from 'sonner';
import Link from 'next/link';

interface TemplateSelectorProps {
  selectedTemplate: 'modern' | 'classic' | 'compact';
  onTemplateChange: (template: 'modern' | 'classic' | 'compact') => void;
  resumeData: ResumeFormData;
}

export function TemplateSelector({ 
  selectedTemplate, 
  onTemplateChange, 
  resumeData 
}: TemplateSelectorProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const templates = [
    {
      value: 'modern',
      label: 'Modern',
      description: 'Minimalist design with sans-serif fonts',
    },
    {
      value: 'classic',
      label: 'Classic',
      description: 'Traditional layout with serif fonts',
    },
    {
      value: 'compact',
      label: 'Compact',
      description: 'Condensed layout with efficient spacing',
    },
    {
      value: 'professional',
      label: 'Professional',
      description: 'Clean, corporate design for traditional industries',
    },
    {
      value: 'executive',
      label: 'Executive',
      description: 'Sophisticated layout for senior positions',
    },
    {
      value: 'technical',
      label: 'Technical',
      description: 'Optimized for technical and engineering roles',
    },
    {
      value: 'creative',
      label: 'Creative',
      description: 'Stylish design for creative industries',
    },
    {
      value: 'entry-level',
      label: 'Entry Level',
      description: 'Perfect for new graduates and career starters',
    }
  ];

  const generateFileName = () => {
    const name = resumeData.fullName?.replace(/\s+/g, '_') || 'Resume';
    const template = templates.find(t => t.value === selectedTemplate)?.label || 'Template';
    const timestamp = new Date().toISOString().split('T')[0];
    return `${name}_${template}_Resume_${timestamp}.pdf`;
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;

      // Find the resume preview element
      const previewElement = document.querySelector('[data-resume-preview]') as HTMLElement;

      if (!previewElement) {
        throw new Error('Resume preview element not found');
      }

      // Clone the element for PDF generation
      const clonedElement = previewElement.cloneNode(true) as HTMLElement;

      // Apply styles for PDF generation
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.width = '210mm'; // A4 width
      clonedElement.style.minHeight = '297mm'; // A4 height
      clonedElement.style.backgroundColor = 'white';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.transform = 'scale(1)';
      clonedElement.style.transformOrigin = 'top left';
      clonedElement.style.padding = '20px';

      // Append to body for processing
      document.body.appendChild(clonedElement);

      // Configure html2pdf options
      const options = {
        margin: [10, 10, 10, 10],
        filename: generateFileName(),
        image: { 
          type: 'jpeg', 
          quality: 1.0 
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          width: 794, // A4 width in pixels at 96 DPI
          height: 1123 // A4 height in pixels at 96 DPI
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'] 
        }
      };

      // Generate and download PDF
      await html2pdf().set(options).from(clonedElement).save();

      // Clean up
      document.body.removeChild(clonedElement);

      toast.success('PDF downloaded successfully!', {
        description: 'Your resume has been saved to your downloads folder.',
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to download PDF', {
        description: 'Please try again or contact support if the issue persists.',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyHTML = async () => {
    setIsCopying(true);
    try {
      // Get the resume preview HTML
      const previewElement = document.querySelector('[data-resume-preview]');
      const htmlContent = previewElement?.outerHTML || '';

      await navigator.clipboard.writeText(htmlContent);

      toast.success('HTML copied to clipboard!', {
        description: 'You can now paste the HTML code anywhere.',
      });
    } catch (error) {
      toast.error('Failed to copy HTML', {
        description: 'Please try again or check your browser permissions.',
      });
    } finally {
      setIsCopying(false);
    }
  };

  const handleEditResume = () => {
    // Save current resume data to session storage for the editor
    sessionStorage.setItem('resume-data', JSON.stringify(resumeData));

    toast.success('Opening resume editor...', {
      description: 'Your resume data has been loaded for editing.'
    });
  };

  const handleViewMoreTemplates = () => {
    toast.info('Redirecting to templates page...', {
      description: 'Explore our full collection of professional templates.'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Resume Preview */}
      <div className="space-y-6">
        <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-600" />
                Resume Preview
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFullPreview(!showFullPreview)}
              >
                {showFullPreview ? 'Compact View' : 'Full View'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className={`bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 ${
              showFullPreview ? 'p-4' : 'p-2'
            }`}>
              <div className={showFullPreview ? 'scale-75 origin-top-left w-[133%] h-[133%]' : 'scale-[0.4] origin-top-left w-[250%] h-[250%]'}>
                <ResumePreview 
                  data={resumeData} 
                  template={selectedTemplate === 'compact' ? 'modern' : selectedTemplate}
                />
              </div>
            </div>

            {/* Preview Controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Template: <span className="font-medium capitalize">{selectedTemplate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Live Preview</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Controls */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Template Selector */}
          <Card className="border border-gray-200 dark:border-gray-700 mb-6">
            <CardHeader>
              <CardTitle>Choose Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Select
                  value={selectedTemplate}
                  onValueChange={(value: 'modern' | 'classic' | 'compact') => onTemplateChange(value)}
                >
                  <SelectTrigger 
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
                    aria-label="Select resume template"
                  >
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem 
                        key={template.value} 
                        value={template.value}
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{template.label}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {template.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Link href="/templates" onClick={handleViewMoreTemplates}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View More Templates
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Download PDF Button */}
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-14 text-base font-semibold"
                aria-label="Download resume as PDF"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-3" />
                    Download PDF
                  </>
                )}
              </Button>

              {/* Edit Resume Button */}
              <Link href={`/edit-resume?template=${selectedTemplate}`}>
                <Button
                  onClick={handleEditResume}
                  variant="outline"
                  className="w-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 h-14 text-base font-semibold"
                  aria-label="Edit resume"
                >
                  <Edit className="w-5 h-5 mr-3" />
                  Edit Resume
                </Button>
              </Link>

              {/* Additional Options */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                  ADDITIONAL OPTIONS
                </p>

                {/* Copy HTML Button */}
                <Button
                  onClick={handleCopyHTML}
                  disabled={isCopying}
                  variant="outline"
                  className="w-full border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                  aria-label="Copy HTML code"
                >
                  {isCopying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Copying...
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy HTML
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Template Preview Info */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Template: {templates.find(t => t.value === selectedTemplate)?.label}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {templates.find(t => t.value === selectedTemplate)?.description}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <strong>File:</strong> {generateFileName()}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}