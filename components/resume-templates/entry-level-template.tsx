'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface EntryLevelTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  className?: string;
}

export function EntryLevelTemplate({ data, showEditButton = false, className = '' }: EntryLevelTemplateProps) {
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
        fontFamily: 'Arial, Helvetica, sans-serif',
        position: 'relative'
      }}
      data-template-id="entry-level"
      data-resume-template
    >
      {/* Edit Button */}
      {showEditButton && (
        <div className="absolute top-4 right-4 print:hidden">
          <Link href={`/edit-resume?template=entry-level`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </Link>
        </div>
      )}

      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-lg text-gray-700 mb-3">{data.jobTitle || 'Entry-Level Position'}</p>
        <div className="text-sm text-gray-600 flex justify-center flex-wrap gap-4">
          {data.email && <span>{data.email}</span>}
          {data.phone && (
            <>
              <span>|</span>
              <span>{data.phone}</span>
            </>
          )}
          <span>|</span>
          <span>Location: City, State</span>
        </div>
      </header>

      {/* Professional Summary */}
      {data.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.professionalSummary}
          </p>
        </section>
      )}

      {/* Education - Placed higher for entry-level */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                  <p className="text-gray-700">{edu.institution || 'Institution'}</p>
                  <p className="text-sm text-gray-600 mt-1">Relevant Coursework: Course 1, Course 2, Course 3</p>
                </div>
                <p className="text-sm text-gray-600">
                  {formatDate(edu.graduationDate)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Skills
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {skillsList.map((skill, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded text-center text-sm">
                {skill.trim()}
              </div>
            ))}
          </div>
        </section>
      )}

      import { format } from 'date-fns';

      {/* Experience / Internships */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
            Experience & Internships
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

      {/* Projects Section - Good for entry level */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
          Projects
        </h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-gray-900">Project Name</h3>
            <p className="text-sm text-gray-700 mb-1">
              Developed a [type of project] using [technologies/tools]. Implemented [key feature] and [key feature].
            </p>
            <p className="text-sm text-gray-600">
              <strong>Technologies used:</strong> Technology 1, Technology 2, Technology 3
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EntryLevelTemplate;