'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Settings,
  Palette,
  Type
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface ATSTemplateGeneratorProps {
  resumeData: any;
  onGenerate: (template: any) => void;
}

export function ATSTemplateGenerator({ resumeData, onGenerate }: ATSTemplateGeneratorProps) {
  const [selectedFont, setSelectedFont] = useState('calibri');
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedLayout, setSelectedLayout] = useState('standard');
  const [isGenerating, setIsGenerating] = useState(false);

  const fonts = [
    { value: 'calibri', label: 'Calibri', atsScore: 100 },
    { value: 'arial', label: 'Arial', atsScore: 98 },
    { value: 'times', label: 'Times New Roman', atsScore: 95 },
    { value: 'helvetica', label: 'Helvetica', atsScore: 92 }
  ];

  const colors = [
    { value: 'black', label: 'Black & White', atsScore: 100 },
    { value: 'navy', label: 'Navy Blue', atsScore: 95 },
    { value: 'dark-gray', label: 'Dark Gray', atsScore: 98 },
    { value: 'blue', label: 'Professional Blue', atsScore: 90 }
  ];

  const layouts = [
    { value: 'standard', label: 'Standard Layout', atsScore: 100 },
    { value: 'modern', label: 'Modern Layout', atsScore: 95 },
    { value: 'executive', label: 'Executive Layout', atsScore: 98 }
  ];

  const calculateATSScore = () => {
    const fontScore = fonts.find(f => f.value === selectedFont)?.atsScore || 100;
    const colorScore = colors.find(c => c.value === selectedColor)?.atsScore || 100;
    const layoutScore = layouts.find(l => l.value === selectedLayout)?.atsScore || 100;
    
    return Math.round((fontScore + colorScore + layoutScore) / 3);
  };

  const generateTemplate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate template generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const template = {
        id: `ats-${Date.now()}`,
        name: 'ATS-Optimized Resume',
        font: selectedFont,
        color: selectedColor,
        layout: selectedLayout,
        atsScore: calculateATSScore(),
        data: resumeData
      };
      
      onGenerate(template);
      
      toast.success('ATS-optimized template generated!', {
        description: `Your resume has been optimized with a ${calculateATSScore()}% ATS compatibility score.`
      });
    } catch (error) {
      toast.error('Failed to generate template');
    } finally {
      setIsGenerating(false);
    }
  };

  const atsScore = calculateATSScore();

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          ATS Template Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ATS Score Display */}
        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
          <div className="text-4xl font-bold text-green-600 mb-2">{atsScore}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">ATS Compatibility Score</div>
          <div className="mt-2">
            {atsScore >= 95 && (
              <Badge className="bg-green-100 text-green-700 border-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                Excellent
              </Badge>
            )}
            {atsScore >= 90 && atsScore < 95 && (
              <Badge className="bg-blue-100 text-blue-700 border-0">
                <Info className="w-3 h-3 mr-1" />
                Very Good
              </Badge>
            )}
            {atsScore < 90 && (
              <Badge className="bg-yellow-100 text-yellow-700 border-0">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Good
              </Badge>
            )}
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-3">
          <Label className="flex items-center">
            <Type className="w-4 h-4 mr-2" />
            Font Family
          </Label>
          <Select value={selectedFont} onValueChange={setSelectedFont}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{font.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {font.atsScore}%
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color Selection */}
        <div className="space-y-3">
          <Label className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Color Scheme
          </Label>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{color.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {color.atsScore}%
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Layout Selection */}
        <div className="space-y-3">
          <Label className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Layout Style
          </Label>
          <Select value={selectedLayout} onValueChange={setSelectedLayout}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {layouts.map((layout) => (
                <SelectItem key={layout.value} value={layout.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{layout.label}</span>
                    <Badge variant="secondary" className="ml-2">
                      {layout.atsScore}%
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* ATS Optimization Tips */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">ATS Optimization Tips</h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Uses standard fonts that ATS systems can easily read</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Avoids tables, graphics, and complex formatting</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Maintains proper section headers and hierarchy</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Includes relevant keywords naturally throughout</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateTemplate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12"
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Generating Template...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Generate ATS Template
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}