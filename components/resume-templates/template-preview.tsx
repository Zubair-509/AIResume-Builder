'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Maximize2, Loader2, FileText, Printer, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TemplateRenderer } from './template-renderer';
import { toast } from 'sonner';

interface ResumeTemplatePreviewProps {
  template: any;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (format: string) => void;
}

export function ResumeTemplatePreview({ 
  template, 
  isOpen, 
  onClose, 
  onDownload 
}: ResumeTemplatePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!template) return null;

  const handleDownload = async (format: string) => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDownload(format);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    toast.info('Preparing to print...', {
      description: 'Your browser print dialog will open shortly.'
    });
    
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleCopy = () => {
    toast.success('Template details copied to clipboard!');
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-[95vw] h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-hidden`}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span>{template.name}</span>
              <Badge className="bg-green-100 text-green-700 border-0">
                ATS {template.atsScore}%
              </Badge>
              <Badge variant="outline" className="capitalize">
                {template.category}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row h-[calc(90vh-80px)]">
          {/* Left Side - Template Preview */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="bg-white shadow-lg mx-auto max-w-[8.5in]" style={{ minHeight: '11in' }}>
              <TemplateRenderer 
                template={template} 
                data={{
                  fullName: "John Smith",
                  email: "john.smith@example.com",
                  phone: "(555) 123-4567",
                  jobTitle: "Senior Software Engineer",
                  professionalSummary: "Experienced software engineer with 7+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering scalable solutions that improve user experience and drive business growth.",
                  skills: "JavaScript\nTypeScript\nReact\nNode.js\nAWS\nDocker\nSQL\nNoSQL\nAgile Methodologies\nCI/CD",
                  workExperience: [
                    {
                      id: "1",
                      company: "Tech Solutions Inc.",
                      position: "Senior Software Engineer",
                      startDate: "2021-01",
                      endDate: "",
                      current: true,
                      responsibilities: "Led development of microservices architecture serving 1M+ daily users\nReduced application load time by 40% through performance optimization\nMentored 3 junior developers and established code review best practices\nCollaborated with product team to define technical requirements for new features"
                    },
                    {
                      id: "2",
                      company: "Digital Innovations",
                      position: "Software Developer",
                      startDate: "2018-03",
                      endDate: "2020-12",
                      current: false,
                      responsibilities: "Developed and maintained RESTful APIs using Node.js and Express\nImplemented responsive web applications using React and Redux\nOptimized database queries resulting in 30% improved performance\nParticipated in agile development process with bi-weekly sprints"
                    }
                  ],
                  education: [
                    {
                      id: "1",
                      institution: "University of Technology",
                      degree: "Bachelor of Science",
                      fieldOfStudy: "Computer Science",
                      graduationDate: "2018-05"
                    }
                  ]
                }}
              />
            </div>
          </div>
          
          {/* Right Side - Template Info & Actions */}
          <div className="w-full md:w-64 p-4 flex flex-col space-y-4 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {template.description}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Features</h3>
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Fonts:</span>
                    <span className="text-gray-900 dark:text-gray-100">{template.fonts.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Margins:</span>
                    <span className="text-gray-900 dark:text-gray-100">{template.margins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Spacing:</span>
                    <span className="text-gray-900 dark:text-gray-100">{template.spacing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Colors:</span>
                    <span className="text-gray-900 dark:text-gray-100">{template.colors.length}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Download</h3>
                {template.downloadFormats.map((format: string) => (
                  <Button
                    key={format}
                    onClick={() => handleDownload(format)}
                    disabled={isDownloading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download {format}
                      </>
                    )}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="w-full"
                  >
                    <Printer className="w-4 h-4 mr-1" />
                    Print
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="w-full"
                    colSpan={2}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}