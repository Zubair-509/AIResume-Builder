'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Download, Loader2, CheckCircle, AlertCircle, Copy, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ResumeFormData } from '@/lib/validations';

interface HTMLExporterProps {
  templateId: string;
  resumeData: ResumeFormData;
  customizationSettings?: any;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onExportStart?: () => void;
  onExportComplete?: () => void;
  onExportError?: (error: Error) => void;
}

export function HTMLExporter({
  templateId,
  resumeData,
  customizationSettings,
  className = '',
  variant = 'outline',
  size = 'default',
  onExportStart,
  onExportComplete,
  onExportError
}: HTMLExporterProps) {
  const [isExporting, setIsExporting] = useState(false);

  const generateFilename = () => {
    const name = resumeData.fullName?.replace(/\s+/g, '_') || 'Resume';
    const date = new Date().toISOString().split('T')[0];
    return `${name}_${templateId}_${date}.html`;
  };

  const formatHTML = (html: string): string => {
    // Simple HTML formatting with proper indentation
    let formatted = '';
    let indent = 0;
    
    // Split by tags
    const tokens = html.split(/(<\/?[^>]+>)/g);
    
    for (let token of tokens) {
      if (!token.trim()) continue;
      
      // Check if it's a closing tag
      if (token.match(/<\//)) {
        indent--;
        formatted += '  '.repeat(Math.max(0, indent)) + token + '\n';
      }
      // Check if it's an opening tag
      else if (token.match(/<[^\/]/)) {
        formatted += '  '.repeat(indent) + token + '\n';
        // Don't increase indent for self-closing tags
        if (!token.match(/\/>/)) {
          indent++;
        }
      }
      // Text content
      else {
        formatted += '  '.repeat(indent) + token + '\n';
      }
    }
    
    return formatted;
  };

  const addHTMLHeader = (html: string): string => {
    const header = `<!--
  Template: ${templateId}
  Generated on: ${new Date().toLocaleString()}
  
  USAGE INSTRUCTIONS:
  1. This HTML file contains a complete, standalone resume
  2. All styles are included inline for maximum compatibility
  3. You can modify the HTML directly to update content
  4. For best results, use a modern browser to view and print
  5. To print: Open in browser, press Ctrl+P (or Cmd+P on Mac)
  
  Created with SnapCV - https://snapcv.com
-->`;

    return header + '\n\n' + html;
  };

  const generateCompleteHTML = (templateHTML: string): string => {
    // Create a complete, standalone HTML document
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeData.fullName || 'Resume'} - ${templateId} Template</title>
  <style>
    /* Reset CSS */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: ${customizationSettings?.font?.family || 'Arial'}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: ${customizationSettings?.colors?.text || '#1f2937'};
      background-color: #f9fafb;
      padding: 2rem;
    }
    
    .resume-container {
      max-width: 8.5in;
      margin: 0 auto;
      background-color: ${customizationSettings?.colors?.background || '#ffffff'};
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      padding: 2rem;
      position: relative;
    }
    
    h1, h2, h3, h4, h5, h6 {
      color: ${customizationSettings?.colors?.primary || '#2563eb'};
      margin-bottom: 0.5rem;
    }
    
    h1 {
      font-size: ${customizationSettings?.font?.sizes?.heading || '24'}px;
    }
    
    h2 {
      font-size: ${customizationSettings?.font?.sizes?.subheading || '18'}px;
      border-bottom: 1px solid ${customizationSettings?.colors?.primary || '#2563eb'}20;
      padding-bottom: 0.25rem;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 0.75rem;
    }
    
    .section {
      margin-bottom: 1.5rem;
    }
    
    .skill-tag {
      display: inline-block;
      background-color: ${customizationSettings?.colors?.accent || '#7c3aed'}20;
      color: ${customizationSettings?.colors?.accent || '#7c3aed'};
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .experience-item, .education-item {
      margin-bottom: 1rem;
    }
    
    .experience-header, .education-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .company, .institution {
      color: ${customizationSettings?.colors?.accent || '#7c3aed'};
      font-weight: 500;
    }
    
    .date {
      color: ${customizationSettings?.colors?.secondary || '#64748b'};
      font-size: 0.875rem;
    }
    
    .responsibilities {
      padding-left: 1.25rem;
    }
    
    .responsibilities p {
      position: relative;
      padding-left: 1rem;
    }
    
    .responsibilities p::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.6rem;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background-color: ${customizationSettings?.colors?.primary || '#2563eb'};
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .resume-container {
        box-shadow: none;
        padding: 0.5in;
      }
      
      @page {
        size: letter;
        margin: 0;
      }
    }
    
    @media screen and (max-width: 600px) {
      body {
        padding: 1rem;
      }
      
      .resume-container {
        padding: 1rem;
      }
      
      .experience-header, .education-header {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    ${templateHTML}
  </div>
  <script>
    // Simple print functionality
    function printResume() {
      window.print();
    }
    
    // Add any additional JavaScript functionality here
    console.log('Resume loaded successfully');
  </script>
</body>
</html>`;
  };

  const handleExportHTML = async () => {
    setIsExporting(true);
    if (onExportStart) onExportStart();
    
    try {
      // Find the resume template element
      const templateElement = document.querySelector('[data-resume-template]') || 
                             document.querySelector('[data-resume-preview]');
      
      if (!templateElement) {
        throw new Error('Resume template element not found');
      }

      // Get the HTML content
      let htmlContent = templateElement.outerHTML;
      
      // Remove any edit buttons or UI controls
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      const editButtons = tempDiv.querySelectorAll('.print\\:hidden, [data-print-hide]');
      editButtons.forEach(button => button.remove());
      
      // Get the cleaned HTML
      htmlContent = tempDiv.innerHTML;
      
      // Format and add header
      const formattedHTML = formatHTML(htmlContent);
      const htmlWithHeader = addHTMLHeader(formattedHTML);
      
      // Generate complete HTML document
      const completeHTML = generateCompleteHTML(htmlWithHeader);
      
      // Create blob and download
      const blob = new Blob([completeHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generateFilename();
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('HTML exported successfully!', {
        description: `Your resume has been saved as ${link.download}`,
        duration: 5000
      });

      if (onExportComplete) onExportComplete();
    } catch (error) {
      console.error('HTML export error:', error);
      toast.error('Failed to export HTML', {
        description: 'Please try again or contact support if the issue persists.',
        duration: 5000
      });
      if (onExportError && error instanceof Error) onExportError(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExportHTML}
      disabled={isExporting}
      variant={variant}
      size={size}
      className={className}
      aria-label="Export resume as HTML"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Globe className="w-4 h-4 mr-2" />
          Export HTML
        </>
      )}
    </Button>
  );
}

export default HTMLExporter;