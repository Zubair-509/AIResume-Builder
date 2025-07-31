'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Loader2, Code } from 'lucide-react';
import { toast } from 'sonner';
import { findResumeElement } from '@/lib/pdf-utils';

interface HTMLExporterProps {
  resumeData?: any;
  templateId?: string;
  customizationSettings?: any;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onExportComplete?: () => void;
  onExportError?: (error: Error) => void;
}

export function HTMLExporter({
  resumeData,
  templateId = 'default',
  customizationSettings,
  variant = 'outline',
  size = 'default',
  className = '',
  onExportComplete,
  onExportError
}: HTMLExporterProps) {
  const [isExporting, setIsExporting] = useState(false);

  const generateFilename = () => {
    const name = resumeData?.fullName?.replace(/\s+/g, '_') || 'Resume';
    const date = new Date().toISOString().split('T')[0];
    return `${name}_${templateId}_${date}.html`;
  };

  const sanitizeFilename = (filename: string): string => {
    return filename
      .replace(/[/\\?%*:|"<>]/g, '-') // Remove invalid filename characters
      .replace(/\.{2,}/g, '.'); // Prevent directory traversal
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Find the resume element with better selectors
      let resumeElement = document.querySelector('[data-resume-preview] .resume-container');
      
      if (!resumeElement) {
        resumeElement = document.querySelector('[data-resume-preview]');
      }
      
      if (!resumeElement) {
        // Fallback selectors
        resumeElement = document.querySelector('.resume-container') ||
                       document.querySelector('[class*="ats-"][class*="template"]') ||
                       document.querySelector('[class*="template-container"]') ||
                       document.querySelector('[class*="resume"]');
      }

      // Validate that we have actual content, not just loading skeletons
      if (!resumeElement || 
          !resumeElement.textContent || 
          resumeElement.textContent.trim().length < 50 ||
          resumeElement.querySelector('.animate-spin') ||
          resumeElement.innerHTML.includes('ResumeLoadingSkeleton')) {
        throw new Error('Resume content not found or still loading. Please wait for the resume to fully load and try again.');
      }

      // Create complete HTML document
      const fontFamily = customizationSettings?.font?.family || 'Inter';
      const primaryColor = customizationSettings?.colors?.primary || '#2563eb';
      const textColor = customizationSettings?.colors?.text || '#1f2937';
      const backgroundColor = customizationSettings?.colors?.background || '#ffffff';

      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData?.fullName || 'Resume'} - ${templateId.charAt(0).toUpperCase() + templateId.slice(1)} Template</title>
    <meta name="description" content="Professional resume for ${resumeData?.fullName || 'candidate'}">
    <meta name="author" content="${resumeData?.fullName || 'Resume Author'}">
    <meta name="generator" content="SnapCV">
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "${fontFamily}", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            line-height: 1.6;
            color: ${textColor};
            background-color: ${backgroundColor};
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
        }

        .resume-container {
            background: ${backgroundColor};
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }

        h1 {
            color: ${primaryColor};
            margin-bottom: 8px;
        }

        h2 {
            color: ${primaryColor};
            margin-bottom: 12px;
            padding-bottom: 4px;
            border-bottom: 2px solid ${primaryColor}20;
        }

        h3 {
            margin-bottom: 4px;
        }

        p, li {
            margin-bottom: 8px;
        }

        .section {
            margin-bottom: 24px;
        }

        @media print {
            body {
                background: white;
                box-shadow: none;
            }
            .resume-container {
                box-shadow: none;
            }
        }

        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        ${resumeElement.outerHTML}
    </div>

    <script>
        // Print functionality
        function printResume() {
            window.print();
        }

        // Add print button if needed
        document.addEventListener('DOMContentLoaded', function() {
            // Any additional JavaScript functionality
        });
    </script>
</body>
</html>`;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = sanitizeFilename(generateFilename());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('HTML file downloaded successfully!', {
        description: `Your resume has been saved as ${link.download}`,
        duration: 5000
      });

      if (onExportComplete) {
        onExportComplete();
      }
    } catch (error) {
      console.error('HTML generation error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      toast.error('Failed to download HTML', {
        description: 'Please try again or contact support if the issue persists.',
        duration: 5000
      });

      if (onExportError && error instanceof Error) {
        onExportError(error);
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant={variant}
      size={size}
      className={className}
      aria-label="Export resume as HTML"
    >
      {isExporting ? (
        <div className="flex items-center">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Exporting...
        </div>
      ) : (
        <div className="flex items-center">
          <Code className="w-4 h-4 mr-2" />
          Export HTML
        </div>
      )}
    </Button>
  );
}

export default HTMLExporter;