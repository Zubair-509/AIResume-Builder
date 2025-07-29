'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Globe, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  Eye,
  Settings,
  Calendar,
  User,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HTMLExporter } from '@/components/ui/html-exporter';
import { ResumeFormData } from '@/lib/validations';
import { toast } from 'sonner';
import { exportResumeToPDF } from '@/lib/pdf-utils';

interface CustomizationSettings {
  font: {
    family: string;
    sizes: {
      heading: number;
      subheading: number;
      body: number;
      small: number;
    };
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  sections: Array<{
    id: string;
    type: string;
    title: string;
    order: number;
    visible: boolean;
    customContent?: any;
  }>;
  layout: {
    template: 'modern' | 'classic' | 'creative';
    spacing: 'compact' | 'normal' | 'spacious';
    columns: 1 | 2;
  };
}

interface DownloadManagerProps {
  resumeData: ResumeFormData;
  customizationSettings: CustomizationSettings;
  onSave?: (data: ResumeFormData) => Promise<void>;
}

interface DownloadProgress {
  isDownloading: boolean;
  progress: number;
  format: string;
  stage: string;
}

export function DownloadManager({ resumeData, customizationSettings, onSave }: DownloadManagerProps) {
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    isDownloading: false,
    progress: 0,
    format: '',
    stage: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [downloadSettings, setDownloadSettings] = useState({
    filename: '',
    quality: 'high',
    pageSize: 'a4',
    includeColors: true,
    includeImages: true
  });

  const generateFilename = (format: string) => {
    const name = resumeData.fullName?.replace(/\s+/g, '_') || 'Resume';
    const date = new Date().toISOString().split('T')[0];
    const template = customizationSettings.layout.template;
    return `${name}_${template}_Resume_${date}.${format.toLowerCase()}`;
  };

  const updateProgress = (progress: number, stage: string) => {
    setDownloadProgress(prev => ({ ...prev, progress, stage }));
  };

  const downloadAsPDF = async (customFilename?: string) => {
    setDownloadProgress({
      isDownloading: true,
      progress: 0,
      format: 'PDF',
      stage: 'Initializing...'
    });

    try {
      // Save resume data to session storage for export functionality
      sessionStorage.setItem('resume-data', JSON.stringify(resumeData));
      
      // Use the standardized export function
      await exportResumeToPDF(resumeData, customizationSettings.layout.template, {
        filename: customFilename || generateFilename('pdf'),
        pageSize: downloadSettings.pageSize as 'a4' | 'letter',
        quality: downloadSettings.quality as 'high' | 'medium' | 'low',
        includeBackground: downloadSettings.includeColors,
        onProgress: (progress, stage) => {
          updateProgress(progress, stage);
        }
      });

      // Save download activity
      if (onSave) {
        await onSave(resumeData);
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to download PDF', {
        description: 'Please try again or contact support if the issue persists.',
      });
    } finally {
      setTimeout(() => {
        setDownloadProgress({
          isDownloading: false,
          progress: 0,
          format: '',
          stage: ''
        });
      }, 2000);
    }
  };

  const downloadAsHTML = async (customFilename?: string) => {
    setDownloadProgress({
      isDownloading: true,
      progress: 0,
      format: 'HTML',
      stage: 'Preparing HTML content...'
    });

    try {
      updateProgress(20, 'Extracting resume content...');
      
      const previewElement = document.querySelector('[data-resume-preview]');
      if (!previewElement) {
        throw new Error('Resume preview element not found');
      }

      updateProgress(40, 'Generating HTML structure...');

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
            font-family: "${customizationSettings.font.family}", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            line-height: 1.6;
            color: ${customizationSettings.colors.text};
            background-color: ${customizationSettings.colors.background};
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
        }
        
        .resume-container {
            background: ${customizationSettings.colors.background};
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        h1 {
            font-size: ${customizationSettings.font.sizes.heading}px;
            color: ${customizationSettings.colors.primary};
            margin-bottom: 8px;
        }
        
        h2 {
            font-size: ${customizationSettings.font.sizes.subheading}px;
            color: ${customizationSettings.colors.primary};
            margin-bottom: 12px;
            padding-bottom: 4px;
            border-bottom: 2px solid ${customizationSettings.colors.primary}20;
        }
        
        h3 {
            font-size: ${customizationSettings.font.sizes.body}px;
            color: ${customizationSettings.colors.text};
            margin-bottom: 4px;
        }
        
        p, li {
            font-size: ${customizationSettings.font.sizes.body}px;
            margin-bottom: 8px;
        }
        
        .contact-info {
            font-size: ${customizationSettings.font.sizes.small}px;
            color: ${customizationSettings.colors.secondary};
            margin-bottom: 20px;
        }
        
        .section {
            margin-bottom: 24px;
        }
        
        .skill-tag {
            display: inline-block;
            background-color: ${customizationSettings.colors.accent}20;
            color: ${customizationSettings.colors.accent};
            padding: 4px 12px;
            border-radius: 20px;
            font-size: ${customizationSettings.font.sizes.small}px;
            margin: 2px 4px 2px 0;
        }
        
        .experience-item, .education-item {
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid ${customizationSettings.colors.secondary}20;
        }
        
        .experience-item:last-child, .education-item:last-child {
            border-bottom: none;
        }
        
        .date-range {
            font-size: ${customizationSettings.font.sizes.small}px;
            color: ${customizationSettings.colors.secondary};
            font-weight: 500;
        }
        
        .company, .institution {
            color: ${customizationSettings.colors.accent};
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
                font-size: ${Math.max(20, customizationSettings.font.sizes.heading - 4)}px;
            }
            h2 {
                font-size: ${Math.max(16, customizationSettings.font.sizes.subheading - 2)}px;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        ${previewElement.innerHTML}
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

      updateProgress(70, 'Creating download file...');

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = customFilename || generateFilename('html');
      
      updateProgress(90, 'Initiating download...');
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      updateProgress(100, 'Download complete!');

      toast.success('HTML file downloaded successfully!', {
        description: `Your resume has been saved as ${link.download}`,
        duration: 5000
      });

      // Save download activity
      if (onSave) {
        await onSave(resumeData);
      }

    } catch (error) {
      console.error('HTML generation error:', error);
      toast.error('Failed to download HTML', {
        description: 'Please try again or contact support if the issue persists.',
        duration: 5000
      });
    } finally {
      setTimeout(() => {
        setDownloadProgress({
          isDownloading: false,
          progress: 0,
          format: '',
          stage: ''
        });
      }, 2000);
    }
  };

  const handleQuickDownload = () => {
    downloadAsPDF();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleCustomDownload = (format: 'pdf' | 'html') => {
    const filename = downloadSettings.filename.trim() || generateFilename(format);
    const finalFilename = filename.endsWith(`.${format}`) ? filename : `${filename}.${format}`;
    
    if (format === 'pdf') {
      downloadAsPDF(finalFilename);
    } else {
      downloadAsHTML(finalFilename);
    }
    
    setShowSettings(false);
  };

  return (
    <>
      {/* Download Options - Settings Only */}
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setShowSettings(true)}
          disabled={downloadProgress.isDownloading}
          className="border-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
        >
          <Settings className="w-4 h-4 mr-2" />
          Export Settings
        </Button>
      </div>

      

      {/* Download Progress Modal */}
      <AnimatePresence>
        {downloadProgress.isDownloading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Downloading {downloadProgress.format}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {downloadProgress.stage}
                </p>
                
                <div className="space-y-3">
                  <Progress value={downloadProgress.progress} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{downloadProgress.progress}% complete</span>
                    <span>{downloadProgress.stage}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Settings className="w-6 h-6 mr-3 text-blue-600" />
              Download Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Filename */}
            <div className="space-y-3">
              <Label htmlFor="filename" className="text-sm font-medium">Custom Filename</Label>
              <Input
                id="filename"
                value={downloadSettings.filename}
                onChange={(e) => setDownloadSettings(prev => ({ ...prev, filename: e.target.value }))}
                placeholder={generateFilename('pdf').replace('.pdf', '')}
                className="h-11"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Leave empty to use default filename with current date
              </p>
            </div>

            {/* Quality */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Export Quality</Label>
              <Select 
                value={downloadSettings.quality} 
                onValueChange={(value) => setDownloadSettings(prev => ({ ...prev, quality: value }))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Quality (Recommended)</SelectItem>
                  <SelectItem value="medium">Medium Quality</SelectItem>
                  <SelectItem value="low">Low Quality (Faster)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Page Size */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Page Size</Label>
              <Select 
                value={downloadSettings.pageSize} 
                onValueChange={(value) => setDownloadSettings(prev => ({ ...prev, pageSize: value }))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4 (210 × 297 mm) - International</SelectItem>
                  <SelectItem value="letter">Letter (8.5 × 11 in) - US Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleCustomDownload('pdf')}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white h-12"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              
              <Button
                onClick={() => handleCustomDownload('html')}
                variant="outline"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 h-12"
              >
                <Globe className="w-4 h-4 mr-2" />
                Export HTML
              </Button>
            </div>

            {/* Preview Info */}
            <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-blue-600" />
                  Export Preview
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Template:</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {customizationSettings.layout.template}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {downloadSettings.quality}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Page Size:</span>
                    <Badge variant="secondary" className="text-xs">
                      {downloadSettings.pageSize.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Font:</span>
                    <Badge variant="secondary" className="text-xs">
                      {customizationSettings.font.family}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Eye className="w-6 h-6 mr-3 text-purple-600" />
              Resume Preview
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="scale-75 origin-top-left w-[133%] h-[133%] transform-gpu">
                {/* Resume preview content would be rendered here */}
                <div className="bg-white shadow-lg rounded-lg p-8 min-h-[800px]">
                  <div className="text-center text-gray-500">
                    Resume preview will be displayed here
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                onClick={() => {
                  setShowPreview(false);
                  downloadAsPDF();
                }}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              
              <Button
                onClick={() => {
                  setShowPreview(false);
                  downloadAsHTML();
                }}
                variant="outline"
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <Globe className="w-4 h-4 mr-2" />
                Download HTML
              </Button>
              
              <HTMLExporter
                resumeData={resumeData}
                templateId={customizationSettings.layout.template}
                customizationSettings={customizationSettings}
                variant="outline"
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}