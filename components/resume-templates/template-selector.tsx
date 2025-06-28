'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { ClassicTemplate } from './classic-template';
import { ModernTemplate } from './modern-template';
import { ProfessionalTemplate } from './professional-template';
import { TechnicalTemplate } from './technical-template';
import { EntryLevelTemplate } from './entry-level-template';
import { ExecutiveTemplate } from './executive-template';
import { CreativeTemplate } from './creative-template';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, FileText, CheckCircle, Globe, Code } from 'lucide-react';
import { HTMLExporter } from '@/components/ui/html-exporter';
import { toast } from 'sonner';

interface TemplateSelectorProps {
  resumeData: ResumeFormData;
  onDownload?: (templateId: string) => void;
  onSelect?: (templateId: string) => void;
}

export function TemplateSelector({ resumeData, onDownload, onSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean, contemporary design with blue accents' },
    { id: 'classic', name: 'Classic', description: 'Traditional layout for corporate positions' },
    { id: 'professional', name: 'Professional', description: 'Polished design for experienced professionals' },
    { id: 'technical', name: 'Technical', description: 'Optimized for technical and IT roles' },
    { id: 'entry-level', name: 'Entry Level', description: 'Perfect for new graduates and career starters' },
    { id: 'executive', name: 'Executive', description: 'Sophisticated design for leadership positions' },
    { id: 'creative', name: 'Creative', description: 'Unique layout for creative professionals' }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (onSelect) {
      onSelect(templateId);
    }
    toast.success(`${templates.find(t => t.id === templateId)?.name} template selected`);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(selectedTemplate);
    } else {
      toast.success('Download functionality would be triggered here');
    }
  };

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  const renderTemplate = (templateId: string, showEditButton = false) => {
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate data={resumeData} showEditButton={showEditButton} />;
      case 'modern':
        return <ModernTemplate data={resumeData} showEditButton={showEditButton} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} showEditButton={showEditButton} />;
      case 'technical':
        return <TechnicalTemplate data={resumeData} showEditButton={showEditButton} />;
      case 'entry-level':
        return <EntryLevelTemplate data={resumeData} showEditButton={showEditButton} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} showEditButton={showEditButton} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} showEditButton={showEditButton} />;
      default:
        return <ModernTemplate data={resumeData} showEditButton={showEditButton} />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Choose Your Template
      </h2>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <Card className={`overflow-hidden border-2 transition-all duration-300 ${
                  selectedTemplate === template.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="scale-[0.25] origin-center w-[400%] h-[400%] pointer-events-none">
                        {renderTemplate(template.id)}
                      </div>
                    </div>
                    
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(template.id);
                        }}
                        className="bg-white/90 text-gray-900 hover:bg-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ x: 5 }}
                className="cursor-pointer"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <Card className={`overflow-hidden border-2 transition-all duration-300 ${
                  selectedTemplate === template.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {template.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {selectedTemplate === template.id && (
                          <div className="bg-blue-500 text-white rounded-full p-1">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreview(template.id);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button 
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF
        </Button>
        
        <HTMLExporter
          resumeData={resumeData}
          templateId={selectedTemplate}
          size="lg"
          className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        />
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {templates.find(t => t.id === previewTemplate)?.name} Template Preview
              </h3>
              <Button variant="ghost" size="sm" onClick={closePreview}>
                ✕
              </Button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-4">
              <div className="scale-75 origin-top-left w-[133%] h-[133%]">
                {renderTemplate(previewTemplate, true)}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex flex-wrap justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => {
                    handleDownload();
                    closePreview();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                
                <HTMLExporter
                  resumeData={resumeData}
                  templateId={previewTemplate}
                  variant="outline"
                  className="border-blue-200 hover:border-blue-300"
                />
              </div>
              
              <Button 
                onClick={() => {
                  handleTemplateSelect(previewTemplate);
                  closePreview();
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Select Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateSelector;