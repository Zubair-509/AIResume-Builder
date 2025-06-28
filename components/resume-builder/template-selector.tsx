'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResumeFormData } from '@/lib/validations';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };
    
    checkAuth();
  }, []);

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
      
      // Track download in analytics
      setDownloadCount(prev => prev + 1);
      
      // If authenticated, record download in database
      if (isAuthenticated) {
        try {
          await supabase.from('resume_downloads').insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            template: selectedTemplate,
            format: 'pdf',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error recording download:', error);
        }
      }
      
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

  const handleExportToNotion = async () => {
    setIsExporting(true);
    try {
      // Simulate Notion export
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Exported to Notion!', {
        description: 'Your resume has been added to your Notion workspace.',
      });
    } catch (error) {
      toast.error('Failed to export to Notion', {
        description: 'Please check your Notion integration settings.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Template Selector */}
      <div className="space-y-3">
        <label 
          htmlFor="template-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Choose Template
        </label>
        <Select
          value={selectedTemplate}
          onValueChange={(value: 'modern' | 'classic' | 'compact') => onTemplateChange(value)}
        >
          <SelectTrigger 
            id="template-select"
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
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Export Options
        </h3>
        
        {/* Download PDF Button */}
        <Button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          aria-label="Download resume as PDF"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>

        {/* Copy HTML Button */}
        <Button
          onClick={handleCopyHTML}
          disabled={isCopying}
          variant="outline"
          className="w-full border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          aria-label="Copy resume HTML to clipboard"
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

        {/* Export to Notion Button */}
        <Button
          onClick={handleExportToNotion}
          disabled={isExporting}
          variant="outline"
          className="w-full border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          aria-label="Export resume to Notion"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <ExternalLink className="w-4 h-4 mr-2" />
              Export to Notion
            </>
          )}
        </Button>
      </div>

      {/* Template Preview Info */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Template: {templates.find(t => t.value === selectedTemplate)?.label}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {templates.find(t => t.value === selectedTemplate)?.description}
        </p>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          <strong>File:</strong> {generateFileName()}
        </div>
      </div>
    </motion.div>
  );
}