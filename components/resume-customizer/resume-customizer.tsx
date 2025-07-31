'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { 
  Palette, 
  Type, 
  Plus, 
  Save, 
  RotateCcw, 
  Eye,
  Settings,
  Sparkles,
  Download,
  Layers,
  Globe,
  Code
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontSelector } from './font-selector';
import { ColorSchemeSelector } from './color-scheme-selector';
import { DynamicSectionBuilder } from './dynamic-section-builder';
import { ResumePreview } from './customizable-resume-preview';
import { HTMLExporter } from '@/components/ui/html-exporter';
import { LivePreview } from '@/components/ui/live-preview';
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

interface ResumeSection {
  id: string;
  type: string;
  title: string;
  order: number;
  visible: boolean;
  entries: Array<{
    id: string;
    [key: string]: any;
  }>;
}

interface ResumeCustomizerProps {
  resumeData: ResumeFormData;
  onSave?: (settings: CustomizationSettings) => void;
}

export function ResumeCustomizer({ resumeData, onSave }: ResumeCustomizerProps) {
  const [activeTab, setActiveTab] = useState('sections');
  const [settings, setSettings] = useState<CustomizationSettings>({
    font: {
      family: 'Inter',
      sizes: {
        heading: 24,
        subheading: 18,
        body: 14,
        small: 12
      }
    },
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#7c3aed',
      text: '#1f2937',
      background: '#ffffff'
    },
    sections: [
      { id: '1', type: 'personal', title: 'Personal Information', order: 1, visible: true },
      { id: '2', type: 'summary', title: 'Professional Summary', order: 2, visible: true },
      { id: '3', type: 'experience', title: 'Work Experience', order: 3, visible: true },
      { id: '4', type: 'education', title: 'Education', order: 4, visible: true },
      { id: '5', type: 'skills', title: 'Skills', order: 5, visible: true }
    ],
    layout: {
      template: 'modern',
      spacing: 'normal',
      columns: 1
    }
  });

  const [dynamicSections, setDynamicSections] = useState<ResumeSection[]>([]);
  const [history, setHistory] = useState<CustomizationSettings[]>([settings]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load saved customization settings on mount
  useEffect(() => {
    const savedCustomization = localStorage.getItem('resume-customization');
    const savedDynamicSections = localStorage.getItem('resume-dynamic-sections');
    
    if (savedCustomization) {
      try {
        const savedSettings = JSON.parse(savedCustomization);
        setSettings(savedSettings);
        setHistory([savedSettings]);
        setHistoryIndex(0);
      } catch (error) {
        console.error('Failed to load customization settings:', error);
      }
    }

    if (savedDynamicSections) {
      try {
        const savedSections = JSON.parse(savedDynamicSections);
        setDynamicSections(savedSections);
      } catch (error) {
        console.error('Failed to load dynamic sections:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('resume-customization', JSON.stringify(settings));
  }, [settings]);

  // Save dynamic sections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('resume-dynamic-sections', JSON.stringify(dynamicSections));
  }, [dynamicSections]);

  const updateSettings = useCallback((newSettings: Partial<CustomizationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Add to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(updatedSettings);
    if (newHistory.length > 50) newHistory.shift(); // Limit history to 50 entries
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [settings, history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSettings(history[newIndex]);
      toast.success('Undid last change');
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSettings(history[newIndex]);
      toast.success('Redid last change');
    }
  };

  const resetToDefaults = () => {
    const defaultSettings: CustomizationSettings = {
      font: {
        family: 'Inter',
        sizes: {
          heading: 24,
          subheading: 18,
          body: 14,
          small: 12
        }
      },
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#7c3aed',
        text: '#1f2937',
        background: '#ffffff'
      },
      sections: [
        { id: '1', type: 'personal', title: 'Personal Information', order: 1, visible: true },
        { id: '2', type: 'summary', title: 'Professional Summary', order: 2, visible: true },
        { id: '3', type: 'experience', title: 'Work Experience', order: 3, visible: true },
        { id: '4', type: 'education', title: 'Education', order: 4, visible: true },
        { id: '5', type: 'skills', title: 'Skills', order: 5, visible: true }
      ],
      layout: {
        template: 'modern',
        spacing: 'normal',
        columns: 1
      }
    };
    
    setSettings(defaultSettings);
    const newHistory = [...history, defaultSettings];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setDynamicSections([]);
    toast.success('Reset to default settings');
  };

  const saveCustomization = () => {
    onSave?.(settings);
    toast.success('Customization saved successfully!', {
      description: 'Your resume styling has been applied.'
    });
  };

  const tabs = [
    {
      id: 'sections',
      title: 'Section Builder',
      icon: Layers,
      description: 'Add and manage resume sections'
    },
    {
      id: 'fonts',
      title: 'Fonts & Typography',
      icon: Type,
      description: 'Customize fonts and text sizes'
    },
    {
      id: 'colors',
      title: 'Colors & Themes',
      icon: Palette,
      description: 'Choose color schemes and themes'
    }
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full px-6 py-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Resume Customization Studio
              </span>
            </motion.div>
          
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 leading-tight">
              Personalize Your
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block sm:inline"> Perfect Resume</span>
            </h1>
          
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Build custom sections, customize fonts and colors, and create a resume that perfectly represents your professional brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customization Panel */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-purple-600" />
                      Customization Options
                    </CardTitle>
                  
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={undo}
                        disabled={historyIndex <= 0}
                        title="Undo"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={redo}
                        disabled={historyIndex >= history.length - 1}
                        title="Redo"
                      >
                        <RotateCcw className="w-4 h-4 scale-x-[-1]" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetToDefaults}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6">
                      <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700">
                        {tabs.map((tab) => (
                          <TabsTrigger 
                            key={tab.id}
                            value={tab.id}
                            className="flex items-center space-x-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                          >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.title.split(' ')[0]}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>

                    <div className="p-6">
                      <AnimatePresence mode="wait">
                        <TabsContent value="sections" className="mt-0">
                          <motion.div
                            key="sections"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <DynamicSectionBuilder
                              sections={dynamicSections}
                              onUpdate={setDynamicSections}
                            />
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="fonts" className="mt-0">
                          <motion.div
                            key="fonts"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FontSelector
                              settings={settings.font}
                              onUpdate={(fontSettings) => updateSettings({ font: fontSettings })}
                            />
                          </motion.div>
                        </TabsContent>

                        <TabsContent value="colors" className="mt-0">
                          <motion.div
                            key="colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ColorSchemeSelector
                              settings={settings.colors}
                              onUpdate={(colorSettings) => updateSettings({ colors: colorSettings })}
                            />
                          </motion.div>
                        </TabsContent>
                      </AnimatePresence>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Preview Card */}
                <LivePreview 
                  title="Resume Preview" 
                  templateId={settings.layout.template}
                  showEditButton={false}
                  showDownloadButton={true}
                  onDownload={() => {
                    // Save current data for download
                    sessionStorage.setItem('resume-data', JSON.stringify(resumeData));
                    toast.success('Resume ready for download');
                  }}
                >
                  <div className="p-4">
                    <ResumePreview 
                      data={resumeData}
                      settings={settings}
                    />
                  </div>
                </LivePreview>

                {/* Action Buttons */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardContent className="p-6 space-y-4">
                    <Button
                      onClick={saveCustomization}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      size="lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Customization
                    </Button>
                  
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      onClick={() => {
                        // Save current data for download
                        sessionStorage.setItem('resume-data', JSON.stringify(resumeData));
                        toast.success('Resume ready for download');
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  
                    <HTMLExporter
                      resumeData={resumeData}
                      templateId={settings.layout.template}
                      customizationSettings={settings}
                      className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      size="lg"
                    />
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-base">Customization Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Changes Made</span>
                      <Badge variant="secondary">{history.length - 1}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Sections</span>
                      <Badge variant="secondary">{settings.sections.filter(s => s.visible).length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Custom Sections</span>
                      <Badge variant="secondary">{dynamicSections.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Entries</span>
                      <Badge variant="secondary">{dynamicSections.reduce((acc, section) => acc + section.entries.length, 0)}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}