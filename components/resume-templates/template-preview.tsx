'use client';

import React from 'react';
import { ResumeFormData } from '@/lib/validations';
import { TemplateRenderer } from './template-renderer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface TemplatePreviewProps {
  templateId: string;
  data: ResumeFormData;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TemplatePreview({ 
  templateId, 
  data, 
  isSelected = false,
  onClick,
  className = '' 
}: TemplatePreviewProps) {
  const templates = {
    'modern': { name: 'Modern', description: 'Clean, contemporary design with blue accents' },
    'classic': { name: 'Classic', description: 'Traditional layout for corporate positions' },
    'professional': { name: 'Professional', description: 'Polished design for experienced professionals' },
    'technical': { name: 'Technical', description: 'Optimized for technical and IT roles' },
    'entry-level': { name: 'Entry Level', description: 'Perfect for new graduates and career starters' },
    'executive': { name: 'Executive', description: 'Sophisticated design for leadership positions' },
    'creative': { name: 'Creative', description: 'Unique layout for creative professionals' }
  };

  const template = templates[templateId as keyof typeof templates] || templates.modern;

  return (
    <Card 
      className={`overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'border-blue-500 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      } ${className}`}
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="scale-[0.25] origin-center w-[400%] h-[400%] pointer-events-none">
            <TemplateRenderer templateId={templateId} data={data} />
          </div>
        </div>
        
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {template.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {template.description}
        </p>
        <div className="mt-2">
          <Badge className="bg-green-100 text-green-700 border-0">
            ATS Optimized
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default TemplatePreview;