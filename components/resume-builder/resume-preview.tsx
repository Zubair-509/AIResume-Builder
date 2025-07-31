'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { ResumeFormData } from '@/lib/validations';
import { TemplateRenderer } from '@/components/resume-templates/template-renderer';
import { ResumeLoadingSkeleton } from '@/components/ui/loading-skeleton';

interface ResumePreviewProps {
  data: ResumeFormData;
  selectedTemplate: 'ats-professional' | 'ats-modern' | 'ats-executive';
}

export function ResumePreview({ data, selectedTemplate }: ResumePreviewProps) {
  // Validate data more thoroughly
  if (!data || !selectedTemplate || typeof data !== 'object') {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[400px]">
        <ResumeLoadingSkeleton />
      </div>
    );
  }

  // Ensure data has required properties to prevent runtime errors
  const safeData = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    summary: 'Professional summary placeholder',
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
      <Suspense fallback={<ResumeLoadingSkeleton />}>
        <TemplateRenderer
          templateId={selectedTemplate}
          data={safeData}
          showEditButton={false}
        />
      </Suspense>
    </motion.div>
  );
}