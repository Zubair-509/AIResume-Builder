'use client';

import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { format } from 'date-fns';

interface ResumePreviewProps {
  data: ResumeFormData;
  selectedTemplate: 'ats-professional' | 'ats-modern' | 'ats-executive';
}

export function ResumePreview({ data, selectedTemplate }: ResumePreviewProps) {
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

  const getTemplateStyles = () => {
    switch (selectedTemplate) {
      case 'ats-professional':
        return {
          container: 'font-sans text-gray-800',
          header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg',
          name: 'text-3xl font-bold mb-2',
          title: 'text-xl opacity-90',
          contact: 'text-sm opacity-80 mt-4 space-y-1',
          section: 'p-6 border-b border-gray-100 last:border-b-0',
          sectionTitle: 'text-lg font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-100',
          content: 'space-y-4',
        };
      case 'ats-modern':
        return {
          container: 'font-serif text-gray-900',
          header: 'border-b-2 border-gray-800 p-6 text-center',
          name: 'text-4xl font-bold mb-2 text-gray-800',
          title: 'text-xl text-gray-600 italic',
          contact: 'text-sm text-gray-600 mt-4 flex justify-center space-x-4',
          section: 'p-6 border-b border-gray-200 last:border-b-0',
          sectionTitle: 'text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide',
          content: 'space-y-4',
        };
      case 'ats-executive':
        return {
          container: 'font-sans text-gray-800 text-sm',
          header: 'bg-gray-800 text-white p-4',
          name: 'text-2xl font-bold mb-1',
          title: 'text-lg',
          contact: 'text-xs mt-3 space-y-1',
          section: 'p-4 border-b border-gray-100 last:border-b-0',
          sectionTitle: 'text-base font-bold text-gray-800 mb-3',
          content: 'space-y-3',
        };
      default:
        // Return modern template styles as fallback instead of recursive call
        return {
          container: 'font-sans text-gray-800',
          header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg',
          name: 'text-3xl font-bold mb-2',
          title: 'text-xl opacity-90',
          contact: 'text-sm opacity-80 mt-4 space-y-1',
          section: 'p-6 border-b border-gray-100 last:border-b-0',
          sectionTitle: 'text-lg font-semibold text-blue-600 mb-4 pb-2 border-b border-blue-100',
          content: 'space-y-4',
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white shadow-2xl rounded-lg overflow-hidden max-w-full ${styles.container}`}
      style={{ minHeight: '842px' }} // A4 aspect ratio
      data-resume-preview // Add this attribute for PDF export
    >
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.fullName || 'Your Name'}</h1>
        <p className={styles.title}>{data.jobTitle || 'Your Job Title'}</p>
        <div className={styles.contact}>
          {selectedTemplate === 'ats-modern' ? (
            <div className="flex justify-center space-x-4">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
            </div>
          ) : (
            <div className="space-y-1">
              {data.email && <div>{data.email}</div>}
              {data.phone && <div>{data.phone}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.professionalSummary && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <div className={styles.content}>
            <p className="leading-relaxed">{data.professionalSummary}</p>
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.content}>
            <div className={selectedTemplate === 'ats-executive' ? 'flex flex-wrap gap-2' : 'grid grid-cols-2 gap-2'}>
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className={
                    selectedTemplate === 'ats-professional'
                      ? 'bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm'
                      : selectedTemplate === 'ats-executive'
                      ? 'bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs'
                      : 'text-gray-700'
                  }
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <div className={styles.content}>
            {data.workExperience.map((exp, index) => (
              <div key={exp.id || index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                    <p className="text-gray-600 font-medium">{exp.company || 'Company'}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                {exp.responsibilities && (
                  <div className="text-gray-700 leading-relaxed">
                    {exp.responsibilities.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className="mb-1">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.content}>
            {data.education.map((edu, index) => (
              <div key={edu.id || index} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}
                    </h3>
                    <p className="text-gray-600">{edu.institution || 'Institution'}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{formatDate(edu.graduationDate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}