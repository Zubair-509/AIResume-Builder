'use client';

import React from 'react';
import { ResumeFormData } from '@/lib/validations';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ATSExecutiveTemplateProps {
  data: ResumeFormData;
  showEditButton?: boolean;
  customSettings?: any;
}

export function ATSExecutiveTemplate({ data, showEditButton = false, customSettings }: ATSExecutiveTemplateProps) {
  return (
    <div 
      data-resume-preview 
      data-template-id="ats-executive"
      className="w-full max-w-[210mm] mx-auto bg-white text-black"
      style={{
        minHeight: '297mm', // A4 height
        padding: '25mm 20mm',
        fontSize: '11pt',
        lineHeight: '1.4',
        fontFamily: 'Georgia, \"Times New Roman\", serif',
        pageBreakInside: 'avoid',
        '@media print': {
          margin: '0',
          boxShadow: 'none',
          transform: 'none'
        }
      }}
    >
      {/* Header Section */}
      <header className="mb-8 text-center border-b-2 border-gray-800 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
          {data.fullName || 'Your Name'}
        </h1>

        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-700">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>{data.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {data.summary && (
        <section className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wide">
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-sm leading-relaxed text-gray-800 italic">
            {data.summary}
          </p>
        </section>
      )}

      {/* Leadership Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wide">
            LEADERSHIP EXPERIENCE
          </h2>
          {data.workExperience.map((job, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base text-gray-900">{job.position}</h3>
                  <div className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">{job.company}</span>
                    {job.location && <span> • {job.location}</span>}
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-medium text-right">
                  {job.startDate} - {job.endDate || 'Present'}
                </div>
              </div>
              {job.description && (
                <div className="text-sm leading-relaxed text-gray-800 ml-4">
                  {job.description.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-2">
                      {line.startsWith('•') || line.startsWith('-') ? line : `• ${line}`}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education & Credentials */}
      {data.education && data.education.length > 0 && (
        <section className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wide">
            EDUCATION & CREDENTIALS
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.graduationDate}</span>
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">{edu.institution}</span>
                {edu.location && <span> • {edu.location}</span>}
                {edu.gpa && <span> • GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Core Competencies */}
      {data.skills && (
        <section className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wide">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
            {(Array.isArray(data.skills) ? data.skills : data.skills.split('\n').filter(skill => skill.trim()))
              .map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-gray-800 rounded-full mr-3"></span>
                  <span>{skill.trim()}</span>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Professional Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-7">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-wide">
            PROFESSIONAL CERTIFICATIONS
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-sm text-gray-900">{cert.name}</span>
                <span className="text-sm text-gray-600">{cert.date}</span>
              </div>
              {cert.issuer && (
                <div className="text-sm text-gray-700 mt-1">{cert.issuer}</div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}