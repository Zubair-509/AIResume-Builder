'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  className?: string;
}

export function CreativeTemplate({ data, showEditButton = false, className = '' }: CreativeTemplateProps) {
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
        position: 'relative',
        fontFamily: 'Arial, Helvetica, sans-serif'
      }}
      data-template-id="creative"
      data-resume-template
    >
      {/* Edit Button */}
      {showEditButton && (
        <div className="absolute top-4 right-4 print:hidden">
          <Link href={`/edit-resume?template=creative`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </Link>
        </div>
      )}

      {/* Left Sidebar */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-purple-700 text-white p-6">
          <div className="sticky top-0">
            {/* Header */}
            <header className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">
                {data.fullName || 'YOUR NAME'}
              </h1>
              <p className="text-lg mb-4">{data.jobTitle || 'Creative Professional'}</p>
              <div className="w-16 h-1 bg-white mx-auto mb-4"></div>
              <div className="text-sm space-y-2">
                {data.email && <p>{data.email}</p>}
                {data.phone && <p>{data.phone}</p>}
              </div>
            </header>

            {/* Skills */}
            {skillsList.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-4 border-b border-white pb-2">
                  SKILLS
                </h2>
                <div className="space-y-2">
                  {skillsList.map((skill, index) => (
                    <div key={index} className="bg-purple-800 p-2 rounded text-sm">
                      {skill.trim()}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4 border-b border-white pb-2">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <div key={edu.id || index}>
                      <h3 className="font-bold">{edu.degree || 'Degree'}</h3>
                      <p className="text-sm">{edu.fieldOfStudy || 'Field of Study'}</p>
                      <p className="text-sm">{edu.institution || 'Institution'}</p>
                      <p className="text-xs opacity-75">
                        {formatDate(edu.graduationDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6">
          {/* Professional Summary */}
          {data.professionalSummary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4 pb-2 border-b-2 border-purple-700">
                ABOUT ME
              </h2>
              <p className="leading-relaxed">
                {data.professionalSummary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.workExperience && data.workExperience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-purple-700 mb-4 pb-2 border-b-2 border-purple-700">
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {data.workExperience.map((exp, index) => (
                  <div key={exp.id || index} className="relative pl-6 border-l-2 border-purple-200">
                    <div className="absolute w-3 h-3 bg-purple-700 rounded-full -left-[7px] top-1"></div>
                    <div className="mb-2">
                      <h3 className="font-bold text-gray-900">{exp.position || 'Position'}</h3>
                      <p className="text-purple-700 font-medium">{exp.company || 'Company'}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.responsibilities && (
                      <div className="text-gray-700 text-sm">
                        {exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                          <p key={lineIndex} className="mb-2">
                            {line.trim()}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          <section>
            <h2 className="text-xl font-bold text-purple-700 mb-4 pb-2 border-b-2 border-purple-700">
              PROJECTS
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900">Project Name</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Description of the project and your role. Highlight key technologies used and outcomes achieved.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Technology 1</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Technology 2</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Technology 3</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CreativeTemplate;