'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, FileText, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ResumeFormData } from '@/lib/validations';
import { toast } from 'sonner';

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

interface PDFExporterProps {
  resumeData: ResumeFormData;
  customizationSettings: CustomizationSettings;
  onExport: (filename?: string) => void;
  isExporting: boolean;
}

export function PDFExporter({ resumeData, customizationSettings, onExport, isExporting }: PDFExporterProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [filename, setFilename] = useState('');
  const [quality, setQuality] = useState('high');
  const [format, setFormat] = useState('a4');

  const generateDefaultFilename = () => {
    const name = resumeData.fullName?.replace(/\s+/g, '_') || 'Resume';
    const date = new Date().toISOString().split('T')[0];
    return `${name}_Resume_${date}`;
  };

  const handleQuickExport = () => {
    onExport();
  };

  const handleCustomExport = async () => {
    if (!filename.trim()) {
      toast.error('Please enter a filename');
      return;
    }

    if (filename.length > 100) {
      toast.error('Filename is too long (max 100 characters)');
      return;
    }

    // Validate filename characters
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(filename)) {
      toast.error('Filename contains invalid characters');
      return;
    }

    setIsExporting(true);
    
    try {
      if (!onExport) {
        throw new Error('Export function not provided');
      }

      const result = await Promise.resolve(onExport(filename.trim()));
      
      if (result !== false) {
        toast.success(`Resume exported successfully as ${filename.trim()}.pdf`);
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error(`Failed to export resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Quick Export Button */}
      <Button
        onClick={handleQuickExport}
        disabled={isExporting}
        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        size="sm"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </>
        )}
      </Button>

      {/* Export Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isExporting}
            className="border-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Export Settings
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Filename */}
            <div className="space-y-3">
              <Label htmlFor="filename" className="text-sm font-medium">Custom Filename</Label>
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder={generateDefaultFilename()}
                className="h-11"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Leave empty to use default filename with current date
              </p>
            </div>

            {/* Quality */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Export Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span>High Quality (Recommended)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span>Medium Quality</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span>Low Quality (Faster)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Format */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Page Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4 (210 × 297 mm) - International Standard</SelectItem>
                  <SelectItem value="letter">Letter (8.5 × 11 in) - US Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preview Info */}
            <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
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
                    <span className="text-gray-600 dark:text-gray-400">Format:</span>
                    <Badge variant="secondary" className="text-xs">
                      {format.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Quality:</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {quality}
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

            {/* Export Button */}
            <Button
              onClick={handleCustomExport}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Exporting PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}