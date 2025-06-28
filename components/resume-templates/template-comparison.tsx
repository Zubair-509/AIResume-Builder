'use client';

import React, { useState } from 'react';
import { ResumeFormData } from '@/lib/validations';
import { TemplateRenderer } from './template-renderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { PDFExporter } from './pdf-exporter';
import { toast } from 'sonner';

interface TemplateComparisonProps {
  resumeData: ResumeFormData;
  onTemplateSelect?: (templateId: string) => void;
}

export function TemplateComparison({ resumeData, onTemplateSelect }: TemplateComparisonProps) {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(['modern', 'professional']);
  
  const templates = [
    { id: 'modern', name: 'Modern', atsScore: 95 },
    { id: 'classic', name: 'Classic', atsScore: 98 },
    { id: 'professional', name: 'Professional', atsScore: 97 },
    { id: 'technical', name: 'Technical', atsScore: 99 },
    { id: 'entry-level', name: 'Entry Level', atsScore: 96 },
    { id: 'executive', name: 'Executive', atsScore: 97 },
    { id: 'creative', name: 'Creative', atsScore: 92 }
  ];

  const toggleTemplate = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      if (selectedTemplates.length > 1) {
        setSelectedTemplates(selectedTemplates.filter(id => id !== templateId));
      } else {
        toast.error('You must select at least one template');
      }
    } else {
      if (selectedTemplates.length < 3) {
        setSelectedTemplates([...selectedTemplates, templateId]);
      } else {
        toast.error('You can compare up to 3 templates at a time');
      }
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
    toast.success(`${templates.find(t => t.id === templateId)?.name} template selected`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Compare Templates
      </h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Select templates to compare (up to 3)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
              <Button
                key={template.id}
                variant={selectedTemplates.includes(template.id) ? "default" : "outline"}
                onClick={() => toggleTemplate(template.id)}
                className="flex items-center space-x-2"
              >
                {selectedTemplates.includes(template.id) && (
                  <CheckCircle className="w-4 h-4 mr-1" />
                )}
                <span>{template.name}</span>
                <Badge className="ml-1 bg-green-100 text-green-700">
                  {template.atsScore}%
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedTemplates.map((templateId) => (
          <Card key={templateId} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {templates.find(t => t.id === templateId)?.name}
                </CardTitle>
                <Badge className="bg-green-100 text-green-700">
                  ATS {templates.find(t => t.id === templateId)?.atsScore}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-gray-50 p-4">
                <div className="scale-[0.4] origin-top-left w-[250%] h-[250%]">
                  <TemplateRenderer templateId={templateId} data={resumeData} />
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <PDFExporter
                  resumeData={resumeData}
                  templateId={templateId}
                  filename={`${resumeData.fullName?.replace(/\s+/g, '_') || 'Resume'}_${templateId}.pdf`}
                />
                
                <Button 
                  variant="outline"
                  onClick={() => handleSelectTemplate(templateId)}
                  className="flex items-center"
                >
                  Select
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TemplateComparison;