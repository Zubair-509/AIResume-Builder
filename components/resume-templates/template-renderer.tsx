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

    switch (templateId) {
      case 'classic':
        return <ClassicTemplate key={`classic-${Date.now()}`} {...props} />;
      case 'modern':
        return <ModernTemplate key={`modern-${Date.now()}`} {...props} />;
      case 'professional':
        return <ProfessionalTemplate key={`professional-${Date.now()}`} {...props} />;
      case 'technical':
        return <TechnicalTemplate key={`technical-${Date.now()}`} {...props} />;
      case 'entry-level':
        return <EntryLevelTemplate key={`entry-level-${Date.now()}`} {...props} />;
      case 'executive':
        return <ExecutiveTemplate key={`executive-${Date.now()}`} {...props} />;
      case 'creative':
        return <CreativeTemplate key={`creative-${Date.now()}`} {...props} />;
      case 'ats-professional':
        return <ATSProfessionalTemplate key={`ats-professional-${Date.now()}`} {...props} />;
      case 'ats-modern':
        return <ATSModernTemplate key={`ats-modern-${Date.now()}`} {...props} />;
      case 'ats-executive':
        return <ATSExecutiveTemplate key={`ats-executive-${Date.now()}`} {...props} />;
      default:
        return <ATSProfessionalTemplate key={`default-${Date.now()}`} {...props} />;
    }
  };

  return (
    <div key={`template-${templateId}`} className="w-full h-full">
      {renderTemplate()}
    </div>
  );
}

export default TemplateRenderer;