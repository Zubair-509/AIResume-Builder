
'use client';

import React from 'react';
import { ResumeFormData } from '@/lib/validations';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ATSModernTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  customSettings?: any;
}

export function ATSModernTemplate({ data, showEditButton = false, customSettings }: ATSModernTemplateProps) {
  return (
    <div 
      data-resume-preview 
      data-template-id="ats-modern"
      className="w-full max-w-[210mm] mx-auto bg-white text-black"
      style={{
        minHeight: '297mm', // A4 height
        padding: '20mm',
        fontSize: '10.5pt',
        lineHeight: '1.5',
        fontFamily: 'Calibri, Arial, sans-serif',
        pageBreakInside: 'avoid',
        '@media print': {
          margin: '0',
          boxShadow: 'none',
          transform: 'none'
        }
      }}
    >
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {data.fullName || 'Your Name'}
        </h1>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700">
          {data.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>{data.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b-2 border-blue-200">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-800">
            {data.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b-2 border-blue-200">
            Professional Experience
          </h2>
          {data.workExperience.map((job, index) => (
            <div key={index} className="mb-5 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base text-gray-900">{job.position}</h3>
                <span className="text-sm text-gray-600 font-medium">
                  {job.startDate} - {job.endDate || 'Present'}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-3">
                <span className="font-semibold text-blue-700">{job.company}</span>
                {job.location && <span className="text-gray-600"> | {job.location}</span>}
              </div>
              {job.description && (
                <div className="text-sm leading-relaxed text-gray-800">
                  {job.description.split('\n').map((line, idx) => (
                    <div key={idx} className="mb-1 flex">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>{line.replace(/^[•\-]\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b-2 border-blue-200">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.graduationDate}</span>
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">{edu.institution}</span>
                {edu.location && <span className="text-gray-600"> | {edu.location}</span>}
                {edu.gpa && <span className="text-blue-700"> | GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b-2 border-blue-200">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {(Array.isArray(data.skills) ? data.skills : data.skills.split('\n').filter(skill => skill.trim()))
              .map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  <span>{skill.trim()}</span>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b-2 border-blue-200">
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-sm text-gray-900">{cert.name}</span>
                <span className="text-sm text-gray-600">{cert.date}</span>
              </div>
              {cert.issuer && (
                <div className="text-sm text-gray-700">{cert.issuer}</div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
