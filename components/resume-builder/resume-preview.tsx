'use client';

import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { TemplateRenderer } from '@/components/resume-templates/template-renderer';

interface ResumePreviewProps {
  data: ResumeFormData;
  selectedTemplate: 'ats-professional' | 'ats-modern' | 'ats-executive';
}

export function ResumePreview({ data, selectedTemplate }: ResumePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
      data-resume-preview // Add this attribute for PDF export
    >
      <TemplateRenderer
        templateId={selectedTemplate}
        data={data}
        showEditButton={false}
      />
    </motion.div>
  );
}