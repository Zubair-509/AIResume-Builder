'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { ResumeFormData } from '@/lib/validations';
import { TemplateRenderer } from '@/components/resume-templates/template-renderer';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface ResumePreviewProps {
  data: ResumeFormData;
  selectedTemplate: 'ats-professional' | 'ats-modern' | 'ats-executive';
}

export function ResumePreview({ data, selectedTemplate }: ResumePreviewProps) {
  // Validate data more thoroughly
  if (!data || !selectedTemplate || typeof data !== 'object') {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[400px]">
        <LoadingSkeleton />
      </div>
    );
  }

  // Ensure data has required properties to prevent runtime errors
  const safeData = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    ...data
  } as ResumeFormData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
      data-resume-preview // Add this attribute for PDF export
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <TemplateRenderer
          templateId={selectedTemplate}
          data={safeData}
          showEditButton={false}
        />
      </Suspense>
    </motion.div>
  );
}