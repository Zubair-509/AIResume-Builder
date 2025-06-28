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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface TemplateRendererProps {
  templateId: string;
  data: ResumeFormData;
  showEditButton?: boolean;
  className?: string;
}

export function TemplateRenderer({ templateId, data, showEditButton = false, className = '' }: TemplateRendererProps) {
  // Save resume data to session storage for edit functionality
  const saveResumeData = () => {
    sessionStorage.setItem('resume-data', JSON.stringify(data));
  };

  // Edit button that will be passed to templates
  const editButton = showEditButton ? (
    <div className="absolute top-4 right-4 print:hidden">
      <Link href={`/edit-resume?template=${templateId}`} onClick={saveResumeData}>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Edit className="w-4 h-4 mr-2" />
          Edit Resume
        </Button>
      </Link>
    </div>
  ) : null;

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