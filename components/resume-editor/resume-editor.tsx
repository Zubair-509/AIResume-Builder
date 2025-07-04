'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { 
  Save, 
  Download, 
  Edit, 
  Eye, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Clock,
  Undo,
  Redo,
  Settings,
  Sparkles,
  Zap,
  Globe,
  Code,
  Info
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ResumeFormData, resumeFormSchema } from '@/lib/validations';
import { ResumeEditForm } from './resume-edit-form';
import { ResumePreview } from '@/components/resume-customizer/customizable-resume-preview';
import { DownloadManager } from './download-manager';
import { HTMLExporter } from '@/components/ui/html-exporter';
import { AutoSaveManager } from './auto-save-manager';
import { LivePreview } from '@/components/ui/live-preview';
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

interface ResumeEditorProps {
  initialData: ResumeFormData;
  customizationSettings: CustomizationSettings;
  onUpdateCustomization: (settings: CustomizationSettings) => void;
  onSave?: (data: ResumeFormData) => void;
  onExport?: (data: ResumeFormData, filename: string) => void;
}

export function ResumeEditor({ 
  initialData, 
  customizationSettings,
  onUpdateCustomization,
  onSave,
  onExport 
}: ResumeEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [history, setHistory] = useState<ResumeFormData[]>([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const form = useForm<ResumeFormData>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: initialData,
    mode: 'onChange'
  });

  const { watch, getValues, reset } = form;
  const formData = watch();

  // Auto-save functionality
  const autoSave = useCallback(async (data: ResumeFormData) => {
    if (!hasUnsavedChanges) return;
    
    setIsSaving(true);
    try {
      // Simulate auto-save to localStorage or API
      localStorage.setItem('resume-draft', JSON.stringify(data));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      if (onSave) {
        await onSave(data);
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [hasUnsavedChanges, onSave]);

  // Track changes and trigger auto-save
  useEffect(() => {
    const subscription = watch((data) => {
      const currentData = data as ResumeFormData;
      const hasChanges = JSON.stringify(currentData) !== JSON.stringify(initialData);
      setHasUnsavedChanges(hasChanges);
      
      if (hasChanges) {
        // Add to history for undo/redo
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(currentData);
        if (newHistory.length > 50) newHistory.shift(); // Limit history
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        
        // Debounced auto-save
        const timeoutId = setTimeout(() => autoSave(currentData), 2000);
        return () => clearTimeout(timeoutId);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, initialData, autoSave, history, historyIndex]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem('resume-draft');
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        reset(draftData);
        toast.info('Draft loaded', {
          description: 'Your previous changes have been restored.'
        });
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, [reset]);

  const handleManualSave = async () => {
    setIsSaving(true);
    try {
      const data = getValues();
      await autoSave(data);
      toast.success('Resume saved successfully!');
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      reset(history[newIndex]);
      toast.success('Undid last change');
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      reset(history[newIndex]);
      toast.success('Redid last change');
    }
  };

  const handleTemplateChange = (template: 'modern' | 'classic' | 'creative') => {
    const updatedSettings = {
      ...customizationSettings,
      layout: {
        ...customizationSettings.layout,
        template
      }
    };
    onUpdateCustomization(updatedSettings);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
      {/* Enhanced Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Section - Status Info */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                  <Edit className="w-5 h-5 mr-2 text-blue-600" />
                  Resume Editor
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {lastSaved && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Last saved: {lastSaved.toLocaleTimeString()}
                    </div>
                  )}
                  {hasUnsavedChanges && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Unsaved changes
                    </Badge>
                  )}
                  {isSaving && (
                    <div className="flex items-center text-blue-600">
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Saving...
                    </div>
                  )}
                  {!hasUnsavedChanges && !isSaving && lastSaved && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      All changes saved
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Undo/Redo */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  title="Undo (Ctrl+Z)"
                  className="h-8 px-2"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  title="Redo (Ctrl+Y)"
                  className="h-8 px-2"
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* Edit/Preview Toggle */}
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="transition-all duration-300"
              >
                {isEditing ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>

              {/* Save Button */}
              <Button
                onClick={handleManualSave}
                disabled={!hasUnsavedChanges || isSaving}
                variant="outline"
                size="sm"
                className="transition-all duration-300"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>

              {/* HTML Export Button */}
              <HTMLExporter
                resumeData={formData}
                templateId={customizationSettings.layout.template}
                customizationSettings={customizationSettings}
                variant="outline"
                size="sm"
                className="transition-all duration-300"
              />

              {/* Download Manager */}
              <DownloadManager
                resumeData={formData}
                customizationSettings={customizationSettings}
                onSave={autoSave}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Editor Panel */}
          <div className="xl:col-span-3 space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Edit className="w-5 h-5 mr-2 text-blue-600" />
                    {isEditing ? 'Edit Resume Content' : 'Resume Content'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-300">
                      {customizationSettings.layout.template} template
                    </Badge>
                    {isEditing && (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                        <Zap className="w-3 h-3 mr-1" />
                        Live Edit
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="edit"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResumeEditForm form={form} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-16"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Preview Mode Active
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Your resume is displayed in the preview panel. Click "Edit" to modify your content.
                      </p>
                      <Button 
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Start Editing
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Template Selector */}
            <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-purple-600" />
                  Template Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {(['modern', 'classic', 'creative'] as const).map((tmpl) => (
                    <Button
                      key={tmpl}
                      variant={customizationSettings.layout.template === tmpl ? "default" : "outline"}
                      onClick={() => handleTemplateChange(tmpl)}
                      className="capitalize h-12 transition-all duration-300 hover:scale-105"
                    >
                      {tmpl}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  Switch to the Customize tab for advanced styling options
                </p>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-green-600" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleManualSave}
                    disabled={!hasUnsavedChanges || isSaving}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-12"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Resume
                      </>
                    )}
                  </Button>
                  
                  <HTMLExporter
                    resumeData={formData}
                    templateId={customizationSettings.layout.template}
                    customizationSettings={customizationSettings}
                    className="h-12 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  />
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start">
                    <Info className="w-4 h-4 mr-2 text-blue-600 mt-0.5" />
                    <p>
                      The HTML export includes all necessary styles and is ready for use in other web projects. 
                      It's also optimized for printing directly from a web browser.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="xl:col-span-2">
            <div className="sticky top-32">
              <LivePreview 
                title="Live Resume Preview" 
                templateId={customizationSettings.layout.template}
                showEditButton={true}
                showDownloadButton={true}
                onDownload={() => {
                  // Save current data for download
                  sessionStorage.setItem('resume-data', JSON.stringify(formData));
                }}
              >
                <div className="p-4">
                  <ResumePreview 
                    data={formData} 
                    settings={customizationSettings}
                  />
                </div>
              </LivePreview>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-save Manager */}
      <AutoSaveManager
        data={formData}
        onSave={autoSave}
        enabled={hasUnsavedChanges}
      />
      </div>
    </MotionConfig>
  );
}