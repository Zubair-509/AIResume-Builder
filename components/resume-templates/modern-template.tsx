'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  className?: string;
}

export function ModernTemplate({ data, showEditButton = false, className = '' }: ModernTemplateProps) {
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
        padding: '0.5in',
        fontFamily: 'Arial, Helvetica, sans-serif',
        position: 'relative'
      }}
      data-template-id="modern"
      data-resume-template
      data-pdf-capture-element
    >
      {/* Edit Button */}
      {showEditButton && (
        <div className="absolute top-4 right-4 print:hidden">
          <Link href={`/edit-resume?template=modern`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </Link>
        </div>
      )}

      {/* Header */}
      <header className="mb-6 border-l-4 border-blue-600 pl-4">
        <h1 className="text-3xl font-bold mb-2">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-lg text-blue-600 mb-2">{data.jobTitle || 'Professional Title'}</p>
        <div className="text-sm flex flex-wrap gap-4 text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
            Professional Summary
          </h2>
          <p className="leading-relaxed">
            {data.professionalSummary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
            Experience
          </h2>
          <div className="space-y-4">
            {data.workExperience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position || 'Position'}</h3>
                    <p className="text-blue-600">{exp.company || 'Company'}</p>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.responsibilities && (
                  <ul className="space-y-1 text-sm">
                    {exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                      <li key={lineIndex} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                  <p className="text-blue-600">{edu.institution || 'Institution'}</p>
                </div>
                <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
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

export default ModernTemplate;