'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ProfessionalTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  className?: string;
}

export function ProfessionalTemplate({ data, showEditButton = false, className = '' }: ProfessionalTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const skillsList = data.skills ? data.skills.split('\n').filter(skill => skill.trim()) : [];

  return (
    <div 
      className={`bg-white text-gray-900 font-sans max-w-[8.5in] mx-auto shadow-lg ${className}`}
      style={{ 
        minHeight: '11in',
        padding: '0.75in',
        fontFamily: 'Calibri, Arial, sans-serif',
        position: 'relative'
      }}
      data-template-id="professional"
      data-resume-template
    >
      {/* Edit Button */}
      {showEditButton && (
        <div className="absolute top-4 right-4 print:hidden">
          <Link href={`/edit-resume?template=professional`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </Link>
        </div>
      )}

      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-lg text-gray-700 mb-3">{data.jobTitle || 'Professional Title'}</p>
        <div className="text-sm text-gray-600 flex flex-wrap gap-4">
          {data.email && <span>{data.email}</span>}
          {data.phone && (
            <>
              <span>•</span>
              <span>{data.phone}</span>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {data.professionalSummary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {skillsList.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700">{skill.trim()}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-5">
            {data.workExperience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position || 'Position'}</h3>
                    <p className="text-gray-700">{exp.company || 'Company'}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.responsibilities && (
                  <div className="text-gray-700 text-sm">
                    {exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                      <p key={lineIndex} className="mb-1 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>{line.trim()}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                  <p className="text-gray-700">{edu.institution || 'Institution'}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {formatDate(edu.graduationDate)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProfessionalTemplate;