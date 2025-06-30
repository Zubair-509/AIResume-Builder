'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { findResumeElement } from '@/lib/pdf-utils';

interface HTMLExporterProps {
  resumeData: any;
  templateId: string;
  customizationSettings?: any;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onExportComplete?: () => void;
  onExportError?: (error: Error) => void;
}

export function HTMLExporter({
  resumeData,
  templateId,
  customizationSettings,
  variant = 'outline',
  size = 'default',
  className = '',
  onExportComplete,
  onExportError
}: HTMLExporterProps) {
  const [isExporting, setIsExporting] = useState(false);

  const generateFilename = () => {
    const name = resumeData.fullName?.replace(/\s+/g, '_') || 'Resume';
    const date = new Date().toISOString().split('T')[0];
    return `${name}_${templateId}_${date}.html`;
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Find the resume element
      const resumeElement = findResumeElement();
      
      if (!resumeElement) {
        throw new Error('Could not find resume content');
      }
      
      // Create complete HTML document
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.fullName} - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${customizationSettings?.font?.family || 'Arial'}, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            line-height: 1.6;
            color: ${customizationSettings?.colors?.text || '#1f2937'};
            background-color: ${customizationSettings?.colors?.background || '#ffffff'};
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
        }
        
        .resume-container {
            background: ${customizationSettings?.colors?.background || '#ffffff'};
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        h1 {
            font-size: ${customizationSettings?.font?.sizes?.heading || '24'}px;
            color: ${customizationSettings?.colors?.primary || '#2563eb'};
            margin-bottom: 8px;
        }
        
        h2 {
            font-size: ${customizationSettings?.font?.sizes?.subheading || '18'}px;
            color: ${customizationSettings?.colors?.primary || '#2563eb'};
            margin-bottom: 12px;
            padding-bottom: 4px;
            border-bottom: 2px solid ${customizationSettings?.colors?.primary || '#2563eb'}20;
        }
        
        h3 {
            font-size: ${customizationSettings?.font?.sizes?.body || '14'}px;
            color: ${customizationSettings?.colors?.text || '#1f2937'};
            margin-bottom: 4px;
        }
        
        p, li {
            font-size: ${customizationSettings?.font?.sizes?.body || '14'}px;
            margin-bottom: 8px;
        }
        
        .contact-info {
            font-size: ${customizationSettings?.font?.sizes?.small || '12'}px;
            color: ${customizationSettings?.colors?.secondary || '#64748b'};
            margin-bottom: 20px;
        }
        
        .section {
            margin-bottom: 24px;
        }
        
        .skill-tag {
            display: inline-block;
            background-color: ${customizationSettings?.colors?.accent || '#7c3aed'}20;
            color: ${customizationSettings?.colors?.accent || '#7c3aed'};
            padding: 4px 12px;
            border-radius: 20px;
            font-size: ${customizationSettings?.font?.sizes?.small || '12'}px;
            margin: 2px 4px 2px 0;
        }
        
        .experience-item, .education-item {
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid ${customizationSettings?.colors?.secondary || '#64748b'}20;
        }
        
        .experience-item:last-child, .education-item:last-child {
            border-bottom: none;
        }
        
        .date-range {
            font-size: ${customizationSettings?.font?.sizes?.small || '12'}px;
            color: ${customizationSettings?.colors?.secondary || '#64748b'};
            font-weight: 500;
        }
        
        .company, .institution {
            color: ${customizationSettings?.colors?.accent || '#7c3aed'};
            font-weight: 600;
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
            h1 {
                font-size: ${Math.max(20, (customizationSettings?.font?.sizes?.heading || 24) - 4)}px;
            }
            h2 {
                font-size: ${Math.max(16, (customizationSettings?.font?.sizes?.subheading || 18) - 2)}px;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        ${resumeElement.innerHTML}
    </div>
    
    <script>
        // Add any interactive functionality here
        console.log('Resume loaded successfully');
        
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
      
      // Sanitize filename
      const filename = generateFilename().replace(/[/\\?%*:|"<>]/g, '-').replace(/\.{2,}/g, '.');
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('HTML file downloaded successfully!', {
        description: `Your resume has been saved as ${filename}`,
        duration: 5000
      });
      
      if (onExportComplete) {
        onExportComplete();
      }
    } catch (error) {
      console.error('HTML generation error:', error);
      
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