'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeFormData } from '@/lib/validations';
import { findResumeElement } from '@/lib/pdf-utils';

interface HTMLExporterProps {
  resumeData: ResumeFormData;
  templateId: string;
  customizationSettings?: any;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onExportStart?: () => void;
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

  const handleExport = async () => {
    setIsExporting(true);
    if (onExportStart) onExportStart();
    
    try {
      // Save resume data to session storage
      sessionStorage.setItem('resume-data', JSON.stringify(resumeData));
      
      // Find the resume element
      const resumeElement = findResumeElement();
      
      if (!resumeElement) {
        throw new Error('Resume element not found');
      }

      // Create complete HTML document with proper styling
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.fullName} - ${resumeData.jobTitle} Resume</title>
    <style>
        /* Reset and base styles */
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
        
        /* Print optimization */
        @media print {
            body {
                width: 210mm;
                height: 297mm;
                margin: 0;
                padding: 0;
                background: white;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .no-print {
                display: none !important;
            }
            
            .page-break {
                page-break-before: always;
            }
            
            .avoid-break {
                page-break-inside: avoid;
            }
        }
        
        /* Resume container */
        .resume-container {
            background: ${customizationSettings?.colors?.background || '#ffffff'};
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 30px;
        }
        
        /* Typography */
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
            font-weight: bold;
            color: ${customizationSettings?.colors?.text || '#1f2937'};
            margin-bottom: 4px;
        }
        
        p, li {
            font-size: ${customizationSettings?.font?.sizes?.body || '14'}px;
            margin-bottom: 8px;
        }
        
        /* Utility classes */
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
        
        /* Print button */
        .print-button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: ${customizationSettings?.colors?.primary || '#2563eb'};
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
        }
        
        .print-button:hover {
            background-color: ${customizationSettings?.colors?.primary || '#2563eb'}dd;
        }
        
        /* Responsive adjustments */
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
    <!-- Resume Content -->
    <div class="resume-container">
        ${resumeElement.innerHTML}
    </div>
    
    <!-- Print Button (visible only in browser) -->
    <button class="print-button no-print" onclick="window.print()">
        Print Resume
    </button>
    
    <script>
        // Simple script to enable printing
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Resume HTML loaded successfully');
            
            // Remove any edit buttons or UI controls
            const editButtons = document.querySelectorAll('.print\\:hidden');
            editButtons.forEach(button => button.remove());
        });
    </script>
</body>
</html>`;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generateFilename();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('HTML exported successfully!', {
        description: 'Your resume has been downloaded as an HTML file.'
      });
      
      if (onExportComplete) onExportComplete();
    } catch (error) {
      console.error('HTML export error:', error);
      toast.error('Failed to export HTML', {
        description: 'Please try again or contact support if the issue persists.'
      });
      
      if (error instanceof Error && onExportError) {
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
          Exporting HTML...
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