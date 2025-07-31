'use client';

import React from 'react';
import { ResumeFormData } from '@/lib/validations';
import { ClassicTemplate } from './classic-template';
import { ModernTemplate } from './modern-template';
import { ProfessionalTemplate } from './professional-template';
import { TechnicalTemplate } from './technical-template';
import { EntryLevelTemplate } from './entry-level-template';
import { ExecutiveTemplate } from './executive-template';
import { CreativeTemplate } from './creative-template';
import { ATSProfessionalTemplate } from './ats-professional-template';
import { ATSModernTemplate } from './ats-modern-template';
import { ATSExecutiveTemplate } from './ats-executive-template';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface TemplateRendererProps {
  templateId: string;
  data: ResumeFormData;
  showEditButton?: boolean;
  customSettings?: any;
}

export function TemplateRenderer({ 
  templateId, 
  data, 
  showEditButton = false,
  customSettings 
}: TemplateRendererProps) {
  const renderTemplate = () => {
    const props = { 
      data, 
      showEditButton, 
      customSettings: customSettings || undefined 
    };

    // Generate a unique key based on template and data to force re-renders when data changes
    const uniqueKey = `${templateId}-${JSON.stringify(data).slice(0, 50)}-${Date.now()}`;

    switch (templateId) {
      case 'classic':
        return <ClassicTemplate key={uniqueKey} {...props} />;
      case 'modern':
        return <ModernTemplate key={uniqueKey} {...props} />;
      case 'professional':
        return <ProfessionalTemplate key={uniqueKey} {...props} />;
      case 'technical':
        return <TechnicalTemplate key={uniqueKey} {...props} />;
      case 'entry-level':
        return <EntryLevelTemplate key={uniqueKey} {...props} />;
      case 'executive':
        return <ExecutiveTemplate key={uniqueKey} {...props} />;
      case 'creative':
        return <CreativeTemplate key={uniqueKey} {...props} />;
      case 'ats-professional':
        return <ATSProfessionalTemplate key={uniqueKey} {...props} />;
      case 'ats-modern':
        return <ATSModernTemplate key={uniqueKey} {...props} />;
      case 'ats-executive':
        return <ATSExecutiveTemplate key={uniqueKey} {...props} />;
      default:
        return <ATSProfessionalTemplate key={uniqueKey} {...props} />;
    }
  };

  return (
    <div key={`template-${templateId}`} className="w-full h-full">
      {renderTemplate()}
    </div>
  );
}

export default TemplateRenderer;