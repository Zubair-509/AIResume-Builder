'use client';

import React, { useState } from 'react';
import { ResumeFormData } from '@/lib/validations';
import { TemplateRenderer } from './template-renderer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Eye, Edit, Globe, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LivePreview } from '@/components/ui/live-preview';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { PDFExporter } from './pdf-exporter';
import { HTMLExporter } from '@/components/ui/html-exporter';
import Link from 'next/link';
import { toast } from 'sonner';

interface TemplatePreviewProps {
  templateId: string;
  data: ResumeFormData;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TemplatePreview({ 
  templateId, 
  data, 
  isSelected = false,
  onClick,
  className = '' 
}: TemplatePreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const templates = {
    'modern': { name: 'Modern', description: 'Clean, contemporary design with blue accents' },
    'classic': { name: 'Classic', description: 'Traditional layout for corporate positions' },
    'professional': { name: 'Professional', description: 'Polished design for experienced professionals' },
    'technical': { name: 'Technical', description: 'Optimized for technical and IT roles' },
    'entry-level': { name: 'Entry Level', description: 'Perfect for new graduates and career starters' },
    'executive': { name: 'Executive', description: 'Sophisticated design for leadership positions' },
    'creative': { name: 'Creative', description: 'Unique layout for creative professionals' }
  };

  const template = templates[templateId as keyof typeof templates] || templates.modern;

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleDownload = () => {
    setIsLoading(true);
    
    // Save resume data to session storage for download functionality
    sessionStorage.setItem('resume-data', JSON.stringify(data));
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Template ready for download', {
        description: 'Your resume has been prepared for download'
      });
    }, 1000);
  };

  // Save resume data to session storage for edit functionality
  const saveResumeData = () => {
    sessionStorage.setItem('resume-data', JSON.stringify(data));
  };

  return (
    <>
      <Card 
        className={`overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
          isSelected 
            ? 'border-blue-500 shadow-lg' 
            : 'border-gray-200 hover:border-gray-300'
        } ${className}`}
        onClick={onClick}
      >
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="scale-[0.25] origin-center w-[400%] h-[400%] pointer-events-none">
              <TemplateRenderer templateId={templateId} data={data} />
            </div>
          </div>
          
          {isSelected && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
              <CheckCircle className="w-4 h-4" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePreviewClick}
              className="bg-white/90 text-gray-900 hover:bg-white"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>
          
          <LoadingOverlay isLoading={isLoading} message="Preparing template..." />
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {template.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {template.description}
          </p>
          <div className="mt-2">
            <Badge className="bg-green-100 text-green-700 border-0">
              ATS Optimized
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Full Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleClosePreview}>
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {template.name} Template Preview
              </h3>
              <Button variant="ghost" size="sm" onClick={handleClosePreview}>
                ✕
              </Button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-4">
              <LivePreview 
                title={`${template.name} Template`} 
                templateId={templateId}
                showEditButton={true}
                showDownloadButton={true}
                showShareButton={true}
                onDownload={handleDownload}
              >
                <div className="scale-75 origin-top-left w-[133%] h-[133%] p-4">
                  <TemplateRenderer templateId={templateId} data={data} showEditButton={true} />
                </div>
              </LivePreview>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex flex-wrap justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Link href={`/edit-resume?template=${templateId}`} onClick={saveResumeData}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Resume
                  </Button>
                </Link>
                
                <PDFExporter
                  resumeData={data}
                  templateId={templateId}
                />
                
                <HTMLExporter
                  resumeData={data}
                  templateId={templateId}
                  variant="outline"
                  className="border-blue-200 hover:border-blue-300"
                />
              </div>
              
              <Button 
                onClick={() => {
                  if (onClick) onClick();
                  handleClosePreview();
                }}
                variant="outline"
              >
                Select Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TemplatePreview;