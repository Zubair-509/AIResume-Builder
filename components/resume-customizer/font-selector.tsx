'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Minus, Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FontSettings {
  family: string;
  sizes: {
    heading: number;
    subheading: number;
    body: number;
    small: number;
  };
}

interface FontSelectorProps {
  settings: FontSettings;
  onUpdate: (settings: FontSettings) => void;
}

export function FontSelector({ settings, onUpdate }: FontSelectorProps) {
  const [selectedFont, setSelectedFont] = useState(settings.family);

  const professionalFonts = [
    {
      name: 'Inter',
      family: 'Inter',
      description: 'Modern, clean, and highly readable',
      category: 'Sans-serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    {
      name: 'Roboto',
      family: 'Roboto',
      description: 'Google\'s signature font, friendly and approachable',
      category: 'Sans-serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    {
      name: 'Open Sans',
      family: 'Open Sans',
      description: 'Optimized for print, web, and mobile interfaces',
      category: 'Sans-serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    {
      name: 'Lato',
      family: 'Lato',
      description: 'Semi-rounded details for a friendly feel',
      category: 'Sans-serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    {
      name: 'Source Sans Pro',
      family: 'Source Sans Pro',
      description: 'Adobe\'s first open source typeface',
      category: 'Sans-serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    {
      name: 'Playfair Display',
      family: 'Playfair Display',
      description: 'Elegant serif for creative professionals',
      category: 'Serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Playfair Display", Georgia, serif'
    },
    {
      name: 'Merriweather',
      family: 'Merriweather',
      description: 'Designed for optimal readability on screens',
      category: 'Serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Merriweather", Georgia, serif'
    },
    {
      name: 'Georgia',
      family: 'Georgia',
      description: 'Classic serif font with excellent readability',
      category: 'Serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: 'Georgia, serif'
    },
    {
      name: 'Times New Roman',
      family: 'Times New Roman',
      description: 'Traditional serif font for formal documents',
      category: 'Serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: '"Times New Roman", serif'
    },
    {
      name: 'Helvetica',
      family: 'Helvetica',
      description: 'Timeless Swiss design, widely used in business',
      category: 'Sans-serif',
      preview: 'The quick brown fox jumps over the lazy dog',
      cssFamily: 'Helvetica, Arial, sans-serif'
    }
  ];

  const handleFontSelect = (fontName: string) => {
    setSelectedFont(fontName);
    onUpdate({
      ...settings,
      family: fontName
    });
  };

  const handleSizeChange = (sizeType: keyof FontSettings['sizes'], value: number[]) => {
    onUpdate({
      ...settings,
      sizes: {
        ...settings.sizes,
        [sizeType]: value[0]
      }
    });
  };

  const resetSizes = () => {
    onUpdate({
      ...settings,
      sizes: {
        heading: 24,
        subheading: 18,
        body: 14,
        small: 12
      }
    });
  };

  const sizeControls = [
    { key: 'heading' as const, label: 'Heading Text', min: 18, max: 32, step: 1 },
    { key: 'subheading' as const, label: 'Subheading Text', min: 14, max: 24, step: 1 },
    { key: 'body' as const, label: 'Body Text', min: 10, max: 18, step: 1 },
    { key: 'small' as const, label: 'Small Text', min: 8, max: 14, step: 1 }
  ];

  const getSelectedFontCss = () => {
    const selectedFontData = professionalFonts.find(font => font.family === selectedFont);
    return selectedFontData?.cssFamily || professionalFonts[0].cssFamily;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Font & Typography
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Choose professional fonts and adjust text sizes for optimal readability
        </p>
      </div>

      {/* Font Selection */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Type className="w-5 h-5 mr-2 text-blue-600" />
            Font Family
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {professionalFonts.map((font) => (
              <motion.button
                key={font.name}
                onClick={() => handleFontSelect(font.family)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  selectedFont === font.family
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {font.name}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {font.category}
                    </Badge>
                  </div>
                  {selectedFont === font.family && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {font.description}
                </p>
                <div 
                  className="text-lg text-gray-800 dark:text-gray-200"
                  style={{ fontFamily: font.cssFamily }}
                >
                  {font.preview}
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Size Controls */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Type className="w-5 h-5 mr-2 text-purple-600" />
              Font Sizes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSizes}
              className="text-gray-600 hover:text-gray-800"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {sizeControls.map((control) => (
            <div key={control.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {control.label}
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newValue = Math.max(control.min, settings.sizes[control.key] - 1);
                      handleSizeChange(control.key, [newValue]);
                    }}
                    disabled={settings.sizes[control.key] <= control.min}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                    {settings.sizes[control.key]}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newValue = Math.min(control.max, settings.sizes[control.key] + 1);
                      handleSizeChange(control.key, [newValue]);
                    }}
                    disabled={settings.sizes[control.key] >= control.max}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <Slider
                value={[settings.sizes[control.key]]}
                onValueChange={(value) => handleSizeChange(control.key, value)}
                min={control.min}
                max={control.max}
                step={control.step}
                className="w-full"
              />
              
              {/* Preview Text */}
              <div 
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border"
                style={{ 
                  fontFamily: getSelectedFontCss(),
                  fontSize: `${settings.sizes[control.key]}px`
                }}
              >
                <span className="text-gray-800 dark:text-gray-200">
                  {control.label} Preview - The quick brown fox jumps over the lazy dog
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Typography Preview */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Typography Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" style={{ fontFamily: getSelectedFontCss() }}>
            <div>
              <h4 
                className="text-gray-900 dark:text-gray-100 font-bold"
                style={{ fontSize: `${settings.sizes.heading}px` }}
              >
                John Doe
              </h4>
              <p 
                className="text-gray-600 dark:text-gray-400"
                style={{ fontSize: `${settings.sizes.subheading}px` }}
              >
                Senior Software Engineer
              </p>
            </div>
            
            <div>
              <h5 
                className="text-gray-900 dark:text-gray-100 font-semibold mb-2"
                style={{ fontSize: `${settings.sizes.subheading}px` }}
              >
                Professional Summary
              </h5>
              <p 
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                style={{ fontSize: `${settings.sizes.body}px` }}
              >
                Experienced software engineer with 5+ years of expertise in full-stack development. 
                Proven track record of delivering scalable solutions and leading cross-functional teams.
              </p>
            </div>
            
            <div>
              <h5 
                className="text-gray-900 dark:text-gray-100 font-semibold mb-2"
                style={{ fontSize: `${settings.sizes.subheading}px` }}
              >
                Work Experience
              </h5>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h6 
                      className="text-gray-900 dark:text-gray-100 font-medium"
                      style={{ fontSize: `${settings.sizes.body}px` }}
                    >
                      Senior Software Engineer
                    </h6>
                    <p 
                      className="text-blue-600 dark:text-blue-400"
                      style={{ fontSize: `${settings.sizes.body}px` }}
                    >
                      TechCorp Solutions
                    </p>
                  </div>
                  <span 
                    className="text-gray-500 dark:text-gray-400"
                    style={{ fontSize: `${settings.sizes.small}px` }}
                  >
                    2022 - Present
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}