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

interface TemplateRendererProps {
  templateId: string;
  data: ResumeFormData;
  showEditButton?: boolean;
  className?: string;
}

export function TemplateRenderer({ templateId, data, showEditButton = false, className = '' }: TemplateRendererProps) {
  switch (templateId) {
    case 'classic':
      return <ClassicTemplate data={data} showEditButton={showEditButton} className={className} />;
    case 'modern':
      return <ModernTemplate data={data} showEditButton={showEditButton} className={className} />;
    case 'professional':
      return <ProfessionalTemplate data={data} showEditButton={showEditButton} className={className} />;
    case 'technical':
      return <TechnicalTemplate data={data} showEditButton={showEditButton} className={className} />;
    case 'entry-level':
      return <EntryLevelTemplate data={data} showEditButton={showEditButton} className={className} />;
    case 'executive':
      return <ExecutiveTemplate data={data} showEditButton={showEditButton} className={className} />;
    case 'creative':
      return <CreativeTemplate data={data} showEditButton={showEditButton} className={className} />;
    default:
      return <ModernTemplate data={data} showEditButton={showEditButton} className={className} />;
  }
}

export default TemplateRenderer;