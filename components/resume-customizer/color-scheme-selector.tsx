'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Pipette, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ColorSettings {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

interface ColorScheme {
  name: string;
  description: string;
  colors: ColorSettings;
  category: 'Professional' | 'Creative' | 'Modern' | 'Classic';
}

interface ColorSchemeSelectorProps {
  settings: ColorSettings;
  onUpdate: (settings: ColorSettings) => void;
}

export function ColorSchemeSelector({ settings, onUpdate }: ColorSchemeSelectorProps) {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [customColors, setCustomColors] = useState(settings);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colorSchemes: ColorScheme[] = [
    {
      name: 'Professional Blue',
      description: 'Classic blue scheme perfect for corporate roles',
      category: 'Professional',
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#3b82f6',
        text: '#1f2937',
        background: '#ffffff'
      }
    },
    {
      name: 'Executive Gray',
      description: 'Sophisticated gray palette for senior positions',
      category: 'Professional',
      colors: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#4b5563',
        text: '#111827',
        background: '#ffffff'
      }
    },
    {
      name: 'Tech Purple',
      description: 'Modern purple scheme for tech professionals',
      category: 'Modern',
      colors: {
        primary: '#7c3aed',
        secondary: '#64748b',
        accent: '#8b5cf6',
        text: '#1f2937',
        background: '#ffffff'
      }
    },
    {
      name: 'Creative Teal',
      description: 'Vibrant teal for creative and design roles',
      category: 'Creative',
      colors: {
        primary: '#0d9488',
        secondary: '#64748b',
        accent: '#14b8a6',
        text: '#1f2937',
        background: '#ffffff'
      }
    },
    {
      name: 'Warm Orange',
      description: 'Energetic orange for marketing and sales',
      category: 'Creative',
      colors: {
        primary: '#ea580c',
        secondary: '#64748b',
        accent: '#f97316',
        text: '#1f2937',
        background: '#ffffff'
      }
    },
    {
      name: 'Forest Green',
      description: 'Natural green for environmental and healthcare',
      category: 'Professional',
      colors: {
        primary: '#059669',
        secondary: '#64748b',
        accent: '#10b981',
        text: '#1f2937',
        background: '#ffffff'
      }
    },
    {
      name: 'Royal Navy',
      description: 'Deep navy for finance and consulting',
      category: 'Classic',
      colors: {
        primary: '#1e3a8a',
        secondary: '#64748b',
        accent: '#3b82f6',
        text: '#1f2937',
        background: '#ffffff'
      }
    }
  ];

  const handleSchemeSelect = (scheme: ColorScheme) => {
    setSelectedScheme(scheme.name);
    setCustomColors(scheme.colors);
    onUpdate(scheme.colors);
    toast.success(`Applied ${scheme.name} color scheme`);
  };

  const handleCustomColorChange = (colorType: keyof ColorSettings, value: string) => {
    const newColors = { ...customColors, [colorType]: value };
    setCustomColors(newColors);
    onUpdate(newColors);
    setSelectedScheme(null); // Clear selected scheme when customizing
  };

  const copyColorToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      toast.success('Color copied to clipboard!');
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (error) {
      toast.error('Failed to copy color');
    }
  };

  const resetToDefaults = () => {
    const defaultColors: ColorSettings = {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#7c3aed',
      text: '#1f2937',
      background: '#ffffff'
    };
    setCustomColors(defaultColors);
    onUpdate(defaultColors);
    setSelectedScheme(null);
    toast.success('Reset to default colors');
  };

  const colorInputs = [
    { key: 'primary' as const, label: 'Primary Color', description: 'Main brand color for headers and accents' },
    { key: 'secondary' as const, label: 'Secondary Color', description: 'Supporting color for subtext and borders' },
    { key: 'accent' as const, label: 'Accent Color', description: 'Highlight color for important elements' },
    { key: 'text' as const, label: 'Text Color', description: 'Main text color for readability' },
    { key: 'background' as const, label: 'Background Color', description: 'Page background color' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Colors & Themes
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Choose from professional color schemes or create your own custom palette
        </p>
      </div>

      {/* Pre-designed Color Schemes */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2 text-purple-600" />
            Professional Color Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colorSchemes.map((scheme) => (
              <motion.button
                key={scheme.name}
                onClick={() => handleSchemeSelect(scheme)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  selectedScheme === scheme.name
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {scheme.name}
                    </h4>
                    <Badge variant="outline" className="text-xs mt-1">
                      {scheme.category}
                    </Badge>
                  </div>
                  {selectedScheme === scheme.name && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {scheme.description}
                </p>
                
                {/* Color Preview */}
                <div className="flex space-x-2">
                  {Object.entries(scheme.colors).slice(0, 3).map(([key, color]) => (
                    <div
                      key={key}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                      title={`${key}: ${color}`}
                    />
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Color Picker */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Pipette className="w-5 h-5 mr-2 text-blue-600" />
              Custom Colors
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetToDefaults}
              className="text-gray-600 hover:text-gray-800"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {colorInputs.map((colorInput) => (
            <div key={colorInput.key} className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {colorInput.label}
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {colorInput.description}
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="color"
                    value={customColors[colorInput.key]}
                    onChange={(e) => handleCustomColorChange(colorInput.key, e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                </div>
                
                <Input
                  value={customColors[colorInput.key]}
                  onChange={(e) => handleCustomColorChange(colorInput.key, e.target.value)}
                  placeholder="#000000"
                  className="flex-1 font-mono text-sm"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyColorToClipboard(customColors[colorInput.key])}
                  className="px-3"
                >
                  {copiedColor === customColors[colorInput.key] ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Color Preview */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Color Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 rounded-lg border"
            style={{ backgroundColor: customColors.background }}
          >
            <div className="space-y-4">
              <h4 
                className="text-2xl font-bold"
                style={{ color: customColors.primary }}
              >
                John Doe
              </h4>
              <p 
                className="text-lg"
                style={{ color: customColors.secondary }}
              >
                Senior Software Engineer
              </p>
              
              <div className="space-y-2">
                <h5 
                  className="text-lg font-semibold"
                  style={{ color: customColors.primary }}
                >
                  Professional Summary
                </h5>
                <p 
                  className="leading-relaxed"
                  style={{ color: customColors.text }}
                >
                  Experienced software engineer with 5+ years of expertise in full-stack development. 
                  Proven track record of delivering scalable solutions.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: customColors.accent + '20',
                    color: customColors.accent 
                  }}
                >
                  JavaScript
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: customColors.accent + '20',
                    color: customColors.accent 
                  }}
                >
                  React
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: customColors.accent + '20',
                    color: customColors.accent 
                  }}
                >
                  Node.js
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Note */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <Palette className="w-4 h-4 mr-2 text-blue-600" />
            Color Accessibility Tips
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Ensure sufficient contrast between text and background colors</p>
            <p>• Use colors consistently throughout your resume</p>
            <p>• Consider how colors will appear when printed in black and white</p>
            <p>• Test readability on different devices and screen sizes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}