'use client';

import React, { useState } from 'react';
import { ResumeFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { exportResumeToPDF } from '@/lib/pdf-utils';

interface PDFExporterProps {
  resumeData: ResumeFormData;
  templateId: string;
  filename?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onExportStart?: () => void;
  onExportComplete?: () => void;
  onExportError?: (error: Error) => void;
}

export function PDFExporter({ 
  resumeData, 
  templateId, 
  filename,
  variant = 'default',
  size = 'default',
  className = '',
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
      // Save resume data to session storage for export functionality
      sessionStorage.setItem('resume-data', JSON.stringify(resumeData));
      
      // Use the standardized export function
      await exportResumeToPDF(resumeData, templateId, {
        filename: generateFilename(),
        pageSize: 'a4',
        quality: 'high',
        includeBackground: true,
        onComplete: () => {
          if (onExportComplete) onExportComplete();
        },
        onError: (error) => {
          if (onExportError) onExportError(error);
        }
      });
    } catch (error) {
      console.error('PDF export error:', error);
      if (onExportError && error instanceof Error) onExportError(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
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
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </>
        )}
      </Button>
      
      <LoadingOverlay 
        isLoading={isExporting} 
        message="Generating your PDF..." 
        fullScreen={false} 
      />
    </>
  );
}

export default PDFExporter;