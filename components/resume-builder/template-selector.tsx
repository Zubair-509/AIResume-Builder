'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Download, Copy, Loader2, Globe, FileText } from 'lucide-react';
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
import { HTMLExporter } from '@/components/ui/html-exporter';
import { toast } from 'sonner';
import { exportResumeToPDF } from '@/lib/pdf-utils';

interface TemplateSelectorProps {
  selectedTemplate: 'ats-professional' | 'ats-modern' | 'ats-executive';
  onTemplateChange: (template: 'ats-professional' | 'ats-modern' | 'ats-executive') => void;
  resumeData: ResumeFormData;
}

export function TemplateSelector({ 
  selectedTemplate, 
  onTemplateChange, 
  resumeData 
}: TemplateSelectorProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const templates = [
    {
      value: 'ats-professional',
      label: 'ATS Professional',
      description: 'Clean, ATS-optimized layout perfect for corporate roles',
    },
    {
      value: 'ats-modern',
      label: 'ATS Modern',
      description: 'Contemporary design with excellent ATS compatibility',
    },
    {
      value: 'ats-executive',
      label: 'ATS Executive',
      description: 'Sophisticated layout for senior-level positions',
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
      // Save resume data to session storage for export functionality
      sessionStorage.setItem('resume-data', JSON.stringify(resumeData));

      // Use the standardized export function
      await exportResumeToPDF(resumeData, selectedTemplate, {
        filename: generateFileName(),
        pageSize: 'a4',
        quality: 'high',
        includeBackground: true
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to download PDF', {
        description: 'Please try again or contact support if the issue persists.'
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
      if (!previewElement) {
        throw new Error('Resume preview element not found');
      }

      const htmlContent = previewElement?.outerHTML || '';

      if (!htmlContent) {
        throw new Error('No HTML content found to copy');
      }

      await navigator.clipboard.writeText(htmlContent);

      toast.success('HTML copied to clipboard!', {
        description: 'You can now paste the HTML code anywhere.',
      });
    } catch (error) {
      console.error('Copy HTML error:', error);
      toast.error('Failed to copy HTML', {
        description: 'Please try again or check your browser permissions.',
      });
    } finally {
      setIsCopying(false);
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
          onValueChange={(value: 'ats-professional' | 'ats-modern' | 'ats-executive') => onTemplateChange(value)}
        >
          <SelectTrigger 
            id="template-select"
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 text-center"
            aria-label="Select resume template"
          >
            <SelectValue placeholder="Select a template" className="text-center" />
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

        {/* Export HTML Button */}
        <HTMLExporter
          resumeData={resumeData}
          templateId={selectedTemplate}
          size="lg"
          className="w-full border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />

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