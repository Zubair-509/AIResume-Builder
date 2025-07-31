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
  if (!data || !selectedTemplate) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }

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
          data={data}
          showEditButton={false}
        />
      </Suspense>
    </motion.div>
  );
}