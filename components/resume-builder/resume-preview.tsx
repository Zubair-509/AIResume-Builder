'use client';

import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { ResumeLoadingSkeleton } from '@/components/ui/loading-skeleton';
import { ATSProfessionalTemplate } from '@/components/resume-templates/ats-professional-template';
import { ATSModernTemplate } from '@/components/resume-templates/ats-modern-template';
import { ATSExecutiveTemplate } from '@/components/resume-templates/ats-executive-template';

interface ResumePreviewProps {
  data: ResumeFormData;
  template?: 'ats-professional' | 'ats-modern' | 'ats-executive';
  selectedTemplate?: 'ats-professional' | 'ats-modern' | 'ats-executive';
}

export function ResumePreview({ data, template, selectedTemplate }: ResumePreviewProps) {
  const activeTemplate = template || selectedTemplate || 'ats-professional';
  
  // Validate data more thoroughly
  if (!data || typeof data !== 'object') {
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
    jobTitle: 'Professional Title',
    professionalSummary: 'Professional summary placeholder text that describes key qualifications and experience.',
    skills: 'JavaScript • React • Node.js • Python • Project Management',
    workExperience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    ...data
  } as ResumeFormData;

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'ats-professional':
        return <ATSProfessionalTemplate data={safeData} />;
      case 'ats-modern':
        return <ATSModernTemplate data={safeData} />;
      case 'ats-executive':
        return <ATSExecutiveTemplate data={safeData} />;
      default:
        return <ATSProfessionalTemplate data={safeData} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
      data-resume-preview // Add this attribute for PDF export
    >
      <div className="resume-container">
        {renderTemplate()}
      </div>
    </motion.div>
  );
}