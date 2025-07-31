'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Contact information interface
 */
interface Contact {
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
}

/**
 * Work experience interface
 */
interface Experience {
  company: string;
  title: string;
  dates: string;
  achievements: string[];
}

/**
 * Education interface
 */
interface Education {
  institution: string;
  degree: string;
  graduationDate: string;
  gpa?: string;
}

/**
 * Props interface for the ProfessionalResume component
 */
interface ProfessionalResumeProps {
  name: string;
  contact: Contact;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  className?: string;
}

/**
 * Professional Resume Component
 * 
 * A React component that renders an A4-sized professional resume with modern styling.
 * Maintains proper proportions and spacing for both digital viewing and printing.
 * 
 * @param props - The resume data and configuration
 * @returns JSX.Element - The rendered resume component
 */
export function ProfessionalResume({
  name,
  contact,
  summary,
  skills,
  experience,
  education,
  className = '',
}: ProfessionalResumeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        bg-white shadow-2xl mx-auto
        w-full max-w-[210mm] 
        min-h-[297mm] 
        font-inter
        ${className}
      `}
      style={{
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
      role="document"
      aria-label={`Resume for ${name}`}
    >
      <div className="p-6" style={{ padding: '1.5rem' }}>
        {/* Header Section */}
        <header className="mb-6" role="banner">
          <div className="border-b-2 border-slate-200 pb-4">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 leading-tight">
              {name}
            </h1>

            {/* Contact Information */}
            <div 
              className="flex flex-wrap gap-4 text-base text-slate-600"
              role="contentinfo"
              aria-label="Contact information"
            >
              <a 
                href={`mailto:${contact.email}`}
                className="hover:text-blue-600 transition-colors duration-200"
                aria-label={`Email ${contact.email}`}
              >
                {contact.email}
              </a>
              <span className="text-slate-400">•</span>
              <a 
                href={`tel:${contact.phone}`}
                className="hover:text-blue-600 transition-colors duration-200"
                aria-label={`Phone ${contact.phone}`}
              >
                {contact.phone}
              </a>
              {contact.location && (
                <>
                  <span className="text-slate-400">•</span>
                  <span>{contact.location}</span>
                </>
              )}
              {contact.linkedin && (
                <>
                  <span className="text-slate-400">•</span>
                  <a 
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors duration-200"
                    aria-label="LinkedIn profile"
                  >
                    LinkedIn
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Main Content - Left Column (70%) */}
          <main className="lg:col-span-7 space-y-6">
            {/* Professional Summary */}
            <section aria-labelledby="summary-heading">
              <h2 
                id="summary-heading"
                className="text-lg font-semibold text-slate-800 mb-3 pb-1 border-b border-slate-200"
              >
                Professional Summary
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                {summary}
              </p>
            </section>

            {/* Work Experience */}
            <section aria-labelledby="experience-heading">
              <h2 
                id="experience-heading"
                className="text-lg font-semibold text-slate-800 mb-4 pb-1 border-b border-slate-200"
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <article key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">
                          {exp.title}
                        </h3>
                        <p className="text-base text-blue-600 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <time className="text-sm text-slate-600 font-medium whitespace-nowrap ml-4">
                        {exp.dates}
                      </time>
                    </div>
                    <ul 
                      className="list-disc list-inside space-y-1 text-base leading-relaxed text-slate-600 ml-2"
                      role="list"
                    >
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="pl-2">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar - Right Column (30%) */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Skills */}
            <section aria-labelledby="skills-heading">
              <h2 
                id="skills-heading"
                className="text-lg font-semibold text-slate-800 mb-3 pb-1 border-b border-slate-200"
              >
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 text-slate-700 px-3 py-2 rounded-md text-sm font-medium border border-slate-200"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section aria-labelledby="education-heading">
              <h2 
                id="education-heading"
                className="text-lg font-semibold text-slate-800 mb-3 pb-1 border-b border-slate-200"
              >
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <article key={index}>
                    <h3 className="text-base font-semibold text-slate-800 leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {edu.institution}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <time className="text-sm text-slate-600">
                        {edu.graduationDate}
                      </time>
                      {edu.gpa && (
                        <span className="text-sm text-slate-600 font-medium">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Example usage and default export
 */
export default ProfessionalResume;