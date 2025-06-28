'use client';

import React, { useState } from 'react';
import { ResumeFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface PDFExporterProps {
  resumeData: ResumeFormData;
  templateId: string;
  filename?: string;
  onExportStart?: () => void;
  onExportComplete?: () => void;
  onExportError?: (error: Error) => void;
}

export function PDFExporter({ 
  resumeData, 
  templateId, 
  filename,
  onExportStart,
  onExportComplete,
  onExportError
}: PDFExporterProps) {
  const [isExporting, setIsExporting] = useState(false);

  const generateFilename = () => {
    const name = resumeData.fullName?.replace(/\s+/g, '_') || 'Resume';
    const date = new Date().toISOString().split('T')[0];
    return filename || `${name}_${templateId}_${date}.pdf`;
  };

  const handleExport = async () => {
    setIsExporting(true);
    if (onExportStart) onExportStart();
    
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Find the resume template element
      const templateElement = document.querySelector('[data-resume-template]') as HTMLElement;
      
      if (!templateElement) {
        throw new Error('Resume template element not found');
      }

      // Clone the element for PDF generation
      const clonedElement = templateElement.cloneNode(true) as HTMLElement;
      
      // Apply PDF-specific styles
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.width = '8.5in';
      clonedElement.style.height = 'auto';
      clonedElement.style.minHeight = '11in';
      clonedElement.style.backgroundColor = 'white';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.transform = 'scale(1)';
      clonedElement.style.transformOrigin = 'top left';
      
      // Remove any edit buttons
      const editButtons = clonedElement.querySelectorAll('.print\\:hidden');
      editButtons.forEach(button => button.remove());
      
      // Append to body for processing
      document.body.appendChild(clonedElement);

      // Configure html2pdf options
      const options = {
        margin: 0,
        filename: generateFilename(),
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Generate and download PDF
      await html2pdf().set(options).from(clonedElement).save();
      
      // Clean up
      document.body.removeChild(clonedElement);
      
      toast.success('PDF downloaded successfully!');
      if (onExportComplete) onExportComplete();
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF', {
        description: 'Please try again or contact support if the issue persists.'
      });
      if (onExportError && error instanceof Error) onExportError(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      {isExporting ? (
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
  );
}

export default PDFExporter;