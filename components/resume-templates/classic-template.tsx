'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ClassicTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  className?: string;
}

export function ClassicTemplate({ data, showEditButton = false, className = '' }: ClassicTemplateProps) {
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
      className={`bg-white text-gray-900 font-serif max-w-[8.5in] mx-auto shadow-lg ${className}`}
      style={{ 
        minHeight: '11in',
        padding: '0.75in',
        fontFamily: 'Times New Roman, serif',
        position: 'relative'
      }}
      data-template-id="classic"
      data-resume-template
    >
      {/* Edit Button */}
      {showEditButton && (
        <div className="absolute top-4 right-4 print:hidden">
          <Link href={`/edit-resume?template=classic`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </Link>
        </div>
      )}

      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <div className="text-sm flex justify-center flex-wrap gap-4">
          {data.email && <span>{data.email}</span>}
          {data.phone && (
            <>
              <span>|</span>
              <span>{data.phone}</span>
            </>
          )}
          {data.jobTitle && (
            <>
              <span>|</span>
              <span>{data.jobTitle}</span>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3 border-b border-gray-300 pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-justify">
            {data.professionalSummary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3 border-b border-gray-300 pb-1">
            EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.workExperience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.position || 'Position'}</h3>
                    <p className="italic">{exp.company || 'Company'}</p>
                  </div>
                  <p className="text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.responsibilities && (
                  <ul className="list-disc list-inside mt-2">
                    {exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                      <li key={lineIndex} className="text-sm ml-4">
                        {line.trim()}
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
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase mb-3 border-b border-gray-300 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                  <p className="italic">{edu.institution || 'Institution'}</p>
                </div>
                <p className="text-sm">
                  {formatDate(edu.graduationDate)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase mb-3 border-b border-gray-300 pb-1">
            SKILLS
          </h2>
          <div className="flex flex-wrap">
            {skillsList.map((skill, index) => (
              <div key={index} className="w-1/2 text-sm mb-1 pl-4 relative">
                <span className="absolute left-0 top-2 w-2 h-2 bg-gray-800 rounded-full"></span>
                {skill.trim()}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ClassicTemplate;