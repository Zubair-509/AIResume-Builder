
'use client';

import React from 'react';
import { ResumeFormData } from '@/lib/validations';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ATSProfessionalTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  customSettings?: any;
}

export function ATSProfessionalTemplate({ data, showEditButton = false, customSettings }: ATSProfessionalTemplateProps) {
  return (
    <div 
      data-resume-preview 
      data-template-id="ats-professional"
      className="w-full max-w-[210mm] mx-auto bg-white text-black font-serif leading-relaxed"
      style={{
        minHeight: '297mm', // A4 height
        padding: '20mm',
        fontSize: '11pt',
        lineHeight: '1.4',
        fontFamily: 'Times, "Times New Roman", serif',
        pageBreakInside: 'avoid',
        '@media print': {
          margin: '0',
          boxShadow: 'none',
          transform: 'none'
        }
      }}
    >
      {/* Header Section */}
      <header className="mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-xl font-bold uppercase tracking-wide mb-2">
          {data.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>{data.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">
            {data.professionalSummary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          {data.workExperience.map((job, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">{job.position}</h3>
                <span className="text-sm text-gray-600">
                  {job.startDate} - {job.endDate || 'Present'}
                </span>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium">{job.company}</span>
                {job.location && <span> • {job.location}</span>}
              </div>
              {job.responsibilities && (
                <div className="text-sm leading-relaxed">
                  {job.responsibilities.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-1">
                      {line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`}
                    </p>
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
          <h2 className="text-base font-bold uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.graduationDate}</span>
              </div>
              <div className="text-sm text-gray-700">
                <span>{edu.institution}</span>
                {edu.fieldOfStudy && <span> • {edu.fieldOfStudy}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
            Core Competencies
          </h2>
          <div className="text-sm leading-relaxed">
            {typeof data.skills === 'string' 
              ? data.skills.split('\n').filter(skill => skill.trim()).join(' • ')
              : Array.isArray(data.skills) 
                ? data.skills.join(' • ')
                : data.skills
            }
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start">
                <span className="font-medium text-sm">{cert.name}</span>
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
