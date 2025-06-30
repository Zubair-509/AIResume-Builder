'use client';

import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { format } from 'date-fns';

interface CustomizationSettings {
  font: {
    family: string;
    sizes: {
      heading: number;
      subheading: number;
      body: number;
      small: number;
    };
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  sections: Array<{
    id: string;
    type: string;
    title: string;
    order: number;
    visible: boolean;
    customContent?: any;
  }>;
  layout: {
    template: 'modern' | 'classic' | 'creative';
    spacing: 'compact' | 'normal' | 'spacious';
    columns: 1 | 2;
  };
}

interface ResumePreviewProps {
  data: ResumeFormData;
  settings: CustomizationSettings;
}

export function ResumePreview({ data, settings }: ResumePreviewProps) {
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

  const visibleSections = settings.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  const getSpacingClass = () => {
    switch (settings.layout.spacing) {
      case 'compact': return 'space-y-3';
      case 'spacious': return 'space-y-8';
      default: return 'space-y-6';
    }
  };

  const getSectionSpacing = () => {
    switch (settings.layout.spacing) {
      case 'compact': return 'mb-4';
      case 'spacious': return 'mb-8';
      default: return 'mb-6';
    }
  };

  // Get font family CSS value
  const getFontFamily = () => {
    const fontMap: Record<string, string> = {
      'Inter': '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Roboto': '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Open Sans': '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Lato': '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Source Sans Pro': '"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Playfair Display': '"Playfair Display", Georgia, serif',
      'Merriweather': '"Merriweather", Georgia, serif',
      'Georgia': 'Georgia, serif',
      'Times New Roman': '"Times New Roman", serif',
      'Helvetica': 'Helvetica, Arial, sans-serif'
    };
    
    return fontMap[settings.font.family] || fontMap['Inter'];
  };

  const renderSection = (section: any) => {
    const sectionStyle = {
      fontFamily: getFontFamily(),
      color: settings.colors.text
    };

    const headingStyle = {
      fontSize: `${settings.font.sizes.subheading}px`,
      color: settings.colors.primary,
      fontWeight: 'bold',
      marginBottom: '12px',
      paddingBottom: '4px',
      borderBottom: `2px solid ${settings.colors.primary}20`,
      fontFamily: getFontFamily()
    };

    switch (section.type) {
      case 'personal':
        return (
          <div key={section.id} className={getSectionSpacing()} style={sectionStyle}>
            <div className="text-center">
              <h1 
                style={{ 
                  fontSize: `${settings.font.sizes.heading}px`,
                  color: settings.colors.primary,
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  fontFamily: getFontFamily()
                }}
              >
                {data.fullName || 'Your Name'}
              </h1>
              <p 
                style={{ 
                  fontSize: `${settings.font.sizes.subheading}px`,
                  color: settings.colors.secondary,
                  marginBottom: '12px',
                  fontFamily: getFontFamily()
                }}
              >
                {data.jobTitle || 'Your Job Title'}
              </p>
              <div 
                className="flex justify-center space-x-4 text-sm"
                style={{ 
                  fontSize: `${settings.font.sizes.small}px`,
                  color: settings.colors.secondary,
                  fontFamily: getFontFamily()
                }}
              >
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
              </div>
            </div>
          </div>
        );

      case 'summary':
        return data.professionalSummary ? (
          <div key={section.id} className={getSectionSpacing()} style={sectionStyle}>
            <h2 style={headingStyle}>{section.title}</h2>
            <p 
              style={{ 
                fontSize: `${settings.font.sizes.body}px`,
                lineHeight: '1.6',
                color: settings.colors.text,
                fontFamily: getFontFamily()
              }}
            >
              {data.professionalSummary}
            </p>
          </div>
        ) : null;

      case 'skills':
        return skillsList.length > 0 ? (
          <div key={section.id} className={getSectionSpacing()} style={sectionStyle}>
            <h2 style={headingStyle}>{section.title}</h2>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: settings.colors.accent + '20',
                    color: settings.colors.accent,
                    fontSize: `${settings.font.sizes.small}px`,
                    fontWeight: '500',
                    fontFamily: getFontFamily()
                  }}
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'experience':
        return data.workExperience && data.workExperience.length > 0 ? (
          <div key={section.id} className={getSectionSpacing()} style={sectionStyle}>
            <h2 style={headingStyle}>{section.title}</h2>
            <div className={getSpacingClass()}>
              {data.workExperience.map((exp, index) => (
                <div key={exp.id || index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 
                        style={{ 
                          fontSize: `${settings.font.sizes.body}px`,
                          fontWeight: 'bold',
                          color: settings.colors.text,
                          fontFamily: getFontFamily()
                        }}
                      >
                        {exp.position || 'Position'}
                      </h3>
                      <p 
                        style={{ 
                          fontSize: `${settings.font.sizes.body}px`,
                          color: settings.colors.accent,
                          fontWeight: '500',
                          fontFamily: getFontFamily()
                        }}
                      >
                        {exp.company || 'Company'}
                      </p>
                    </div>
                    <div 
                      style={{ 
                        fontSize: `${settings.font.sizes.small}px`,
                        color: settings.colors.secondary,
                        fontFamily: getFontFamily()
                      }}
                    >
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.responsibilities && (
                    <div 
                      style={{ 
                        fontSize: `${settings.font.sizes.small}px`,
                        lineHeight: '1.5',
                        color: settings.colors.text,
                        fontFamily: getFontFamily()
                      }}
                    >
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
        ) : null;

      case 'education':
        return data.education && data.education.length > 0 ? (
          <div key={section.id} className={getSectionSpacing()} style={sectionStyle}>
            <h2 style={headingStyle}>{section.title}</h2>
            <div className={getSpacingClass()}>
              {data.education.map((edu, index) => (
                <div key={edu.id || index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        style={{ 
                          fontSize: `${settings.font.sizes.body}px`,
                          fontWeight: 'bold',
                          color: settings.colors.text,
                          fontFamily: getFontFamily()
                        }}
                      >
                        {edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}
                      </h3>
                      <p 
                        style={{ 
                          fontSize: `${settings.font.sizes.body}px`,
                          color: settings.colors.accent,
                          fontFamily: getFontFamily()
                        }}
                      >
                        {edu.institution || 'Institution'}
                      </p>
                    </div>
                    <div 
                      style={{ 
                        fontSize: `${settings.font.sizes.small}px`,
                        color: settings.colors.secondary,
                        fontFamily: getFontFamily()
                      }}
                    >
                      {formatDate(edu.graduationDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'custom':
        return section.customContent && section.customContent.items.length > 0 ? (
          <div key={section.id} className={getSectionSpacing()} style={sectionStyle}>
            <h2 style={headingStyle}>{section.title}</h2>
            <div className={getSpacingClass()}>
              {section.customContent.items.map((item: any, index: number) => (
                <div key={item.id || index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 
                        style={{ 
                          fontSize: `${settings.font.sizes.body}px`,
                          fontWeight: 'bold',
                          color: settings.colors.text,
                          fontFamily: getFontFamily()
                        }}
                      >
                        {item.title || item.organization || `Item ${index + 1}`}
                      </h3>
                      {item.subtitle && (
                        <p 
                          style={{ 
                            fontSize: `${settings.font.sizes.body}px`,
                            color: settings.colors.accent,
                            fontFamily: getFontFamily()
                          }}
                        >
                          {item.subtitle}
                        </p>
                      )}
                      {item.description && (
                        <p 
                          style={{ 
                            fontSize: `${settings.font.sizes.small}px`,
                            color: settings.colors.text,
                            marginTop: '4px',
                            lineHeight: '1.5',
                            fontFamily: getFontFamily()
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.date && (
                      <div 
                        style={{ 
                          fontSize: `${settings.font.sizes.small}px`,
                          color: settings.colors.secondary,
                          fontFamily: getFontFamily()
                        }}
                      >
                        {item.date}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="shadow-2xl rounded-lg overflow-hidden max-w-full"
      style={{ 
        backgroundColor: settings.colors.background,
        fontFamily: getFontFamily(),
        minHeight: '842px', // A4 aspect ratio
        padding: '40px'
      }}
      data-pdf-capture-element
      data-template-id={settings.layout.template}
    >
      <div className={getSpacingClass()}>
        {visibleSections.map(section => renderSection(section))}
      </div>
    </motion.div>
  );
}