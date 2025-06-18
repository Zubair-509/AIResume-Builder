'use client';

import { ResumeFormData } from '@/lib/validations';

interface TemplateRendererProps {
  template: any;
  data: ResumeFormData;
  className?: string;
}

export function TemplateRenderer({ template, data, className = '' }: TemplateRendererProps) {
  const renderProfessionalClassic = () => (
    <div className={`bg-white p-8 font-calibri ${className}`} style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-lg text-gray-700 mb-3">{data.jobTitle || 'Professional Title'}</p>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex flex-wrap gap-4">
            <span>{data.email || 'email@example.com'}</span>
            <span>•</span>
            <span>{data.phone || '(555) 123-4567'}</span>
            <span>•</span>
            <span>LinkedIn: linkedin.com/in/yourname</span>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {data.professionalSummary || 'Professional summary highlighting your key qualifications, experience, and career objectives. This section should be 3-4 lines that capture your most relevant skills and achievements.'}
        </p>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
          CORE COMPETENCIES
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {data.skills ? data.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
            <div key={index} className="flex items-center">
              <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
              <span className="text-gray-700">{skill.trim()}</span>
            </div>
          )) : (
            <>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700">Skill 1</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700">Skill 2</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-5">
          {data.workExperience && data.workExperience.length > 0 ? data.workExperience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position || 'Position Title'}</h3>
                  <p className="text-gray-700">{exp.company || 'Company Name'}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate ? formatDate(exp.startDate) : 'Start Date'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End Date'}
                </p>
              </div>
              <div className="text-gray-700 text-sm">
                {exp.responsibilities ? exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>{line.trim()}</span>
                  </p>
                )) : (
                  <p className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>Responsibility description</span>
                  </p>
                )}
              </div>
            </div>
          )) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">Position Title</h3>
                  <p className="text-gray-700">Company Name</p>
                </div>
                <p className="text-sm text-gray-600">Start Date - End Date</p>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="mb-1 flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Responsibility description</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase tracking-wide">
          EDUCATION
        </h2>
        <div className="space-y-3">
          {data.education && data.education.length > 0 ? data.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                <p className="text-gray-700">{edu.institution || 'Institution Name'}</p>
              </div>
              <p className="text-sm text-gray-600">{edu.graduationDate ? formatDate(edu.graduationDate) : 'Graduation Date'}</p>
            </div>
          )) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Degree in Field of Study</h3>
                <p className="text-gray-700">Institution Name</p>
              </div>
              <p className="text-sm text-gray-600">Graduation Date</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderModernMinimalist = () => (
    <div className={`bg-white p-8 font-arial ${className}`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Header */}
      <header className="mb-6 border-l-4 border-blue-600 pl-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-lg text-blue-600 mb-3">{data.jobTitle || 'Professional Title'}</p>
        <div className="text-sm text-gray-600 flex flex-wrap gap-4">
          <span>{data.email || 'email@example.com'}</span>
          <span>{data.phone || '(555) 123-4567'}</span>
          <span>LinkedIn: linkedin.com/in/yourname</span>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {data.professionalSummary || 'Professional summary highlighting your key qualifications, experience, and career objectives. This section should be 3-4 lines that capture your most relevant skills and achievements.'}
        </p>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
          Core Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills ? data.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              {skill.trim()}
            </span>
          )) : (
            <>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Skill 1</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Skill 2</span>
            </>
          )}
        </div>
      </section>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
          Professional Experience
        </h2>
        <div className="space-y-5">
          {data.workExperience && data.workExperience.length > 0 ? data.workExperience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position || 'Position Title'}</h3>
                  <p className="text-blue-600">{exp.company || 'Company Name'}</p>
                </div>
                <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {exp.startDate ? formatDate(exp.startDate) : 'Start Date'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End Date'}
                </p>
              </div>
              <div className="text-gray-700 text-sm">
                {exp.responsibilities ? exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>{line.trim()}</span>
                  </p>
                )) : (
                  <p className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>Responsibility description</span>
                  </p>
                )}
              </div>
            </div>
          )) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">Position Title</h3>
                  <p className="text-blue-600">Company Name</p>
                </div>
                <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">Start Date - End Date</p>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="mb-1 flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Responsibility description</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-200">
          Education
        </h2>
        <div className="space-y-3">
          {data.education && data.education.length > 0 ? data.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                <p className="text-blue-600">{edu.institution || 'Institution Name'}</p>
              </div>
              <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {edu.graduationDate ? formatDate(edu.graduationDate) : 'Graduation Date'}
              </p>
            </div>
          )) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Degree in Field of Study</h3>
                <p className="text-blue-600">Institution Name</p>
              </div>
              <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">Graduation Date</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderExecutivePremium = () => (
    <div className={`bg-white p-8 font-times ${className}`} style={{ fontFamily: 'Times New Roman, serif' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-wide uppercase">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-xl text-gray-700 mb-3 italic">{data.jobTitle || 'Executive Title'}</p>
        <div className="text-sm text-gray-600 flex justify-center flex-wrap gap-4">
          <span>{data.email || 'email@example.com'}</span>
          <span>|</span>
          <span>{data.phone || '(555) 123-4567'}</span>
          <span>|</span>
          <span>LinkedIn: linkedin.com/in/yourname</span>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
          Executive Profile
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {data.professionalSummary || 'Distinguished executive with a proven track record of strategic leadership and organizational growth. Expertise in driving operational excellence, building high-performing teams, and delivering exceptional business results. Recognized for transformational leadership and stakeholder management.'}
        </p>
      </section>

      {/* Core Competencies */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
          Core Competencies
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {data.skills ? data.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
            <div key={index} className="flex items-center">
              <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
              <span className="text-gray-700">{skill.trim()}</span>
            </div>
          )) : (
            <>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700">Strategic Leadership</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                <span className="text-gray-700">Business Transformation</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
          Professional Experience
        </h2>
        <div className="space-y-5">
          {data.workExperience && data.workExperience.length > 0 ? data.workExperience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 uppercase">{exp.position || 'Executive Position'}</h3>
                  <p className="text-gray-700 italic">{exp.company || 'Company Name'}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate ? formatDate(exp.startDate) : 'Start Date'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End Date'}
                </p>
              </div>
              <div className="text-gray-700 text-sm">
                {exp.responsibilities ? exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>{line.trim()}</span>
                  </p>
                )) : (
                  <p className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>Executive responsibility description</span>
                  </p>
                )}
              </div>
            </div>
          )) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 uppercase">Executive Position</h3>
                  <p className="text-gray-700 italic">Company Name</p>
                </div>
                <p className="text-sm text-gray-600">Start Date - End Date</p>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="mb-1 flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Executive responsibility description</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
          Education
        </h2>
        <div className="space-y-3">
          {data.education && data.education.length > 0 ? data.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                <p className="text-gray-700 italic">{edu.institution || 'Institution Name'}</p>
              </div>
              <p className="text-sm text-gray-600">
                {edu.graduationDate ? formatDate(edu.graduationDate) : 'Graduation Date'}
              </p>
            </div>
          )) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Degree in Field of Study</h3>
                <p className="text-gray-700 italic">Institution Name</p>
              </div>
              <p className="text-sm text-gray-600">Graduation Date</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderTechnicalSpecialist = () => (
    <div className={`bg-white p-8 font-calibri ${className}`} style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-lg text-gray-700 mb-2">{data.jobTitle || 'Technical Specialist'}</p>
        <div className="text-sm text-gray-600 flex flex-wrap gap-4 border-t border-b border-gray-300 py-2">
          <span>{data.email || 'email@example.com'}</span>
          <span>{data.phone || '(555) 123-4567'}</span>
          <span>GitHub: github.com/username</span>
          <span>LinkedIn: linkedin.com/in/yourname</span>
        </div>
      </header>

      {/* Technical Skills Matrix */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 bg-gray-100 p-2">
          TECHNICAL SKILLS
        </h2>
        <div className="grid grid-cols-1 gap-2 text-sm">
          {data.skills ? (
            <div className="border border-gray-300 p-3 rounded">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {data.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                    <span className="text-gray-700">{skill.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-gray-300 p-3 rounded">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                  <span className="text-gray-700">Programming Languages: JavaScript, Python, Java</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                  <span className="text-gray-700">Frameworks: React, Node.js, Django</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 bg-gray-100 p-2">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {data.professionalSummary || 'Technical specialist with expertise in [specific technologies] and [number] years of experience in [industry/field]. Proven track record of [key achievement] and [key achievement]. Skilled in [key skill] and [key skill] with a focus on [specific area].'}
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 bg-gray-100 p-2">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-5">
          {data.workExperience && data.workExperience.length > 0 ? data.workExperience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position || 'Position Title'}</h3>
                  <p className="text-gray-700">{exp.company || 'Company Name'}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate ? formatDate(exp.startDate) : 'Start Date'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End Date'}
                </p>
              </div>
              <div className="text-gray-700 text-sm">
                {exp.responsibilities ? exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>{line.trim()}</span>
                  </p>
                )) : (
                  <p className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>Technical responsibility description</span>
                  </p>
                )}
              </div>
            </div>
          )) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">Position Title</h3>
                  <p className="text-gray-700">Company Name</p>
                </div>
                <p className="text-sm text-gray-600">Start Date - End Date</p>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="mb-1 flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Technical responsibility description</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3 bg-gray-100 p-2">
          EDUCATION
        </h2>
        <div className="space-y-3">
          {data.education && data.education.length > 0 ? data.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                <p className="text-gray-700">{edu.institution || 'Institution Name'}</p>
              </div>
              <p className="text-sm text-gray-600">
                {edu.graduationDate ? formatDate(edu.graduationDate) : 'Graduation Date'}
              </p>
            </div>
          )) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Degree in Field of Study</h3>
                <p className="text-gray-700">Institution Name</p>
              </div>
              <p className="text-sm text-gray-600">Graduation Date</p>
            </div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 bg-gray-100 p-2">
          CERTIFICATIONS
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
            <span className="text-gray-700">Certification Name (Issuing Organization)</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
            <span className="text-gray-700">Certification Name (Issuing Organization)</span>
          </div>
        </div>
      </section>
    </div>
  );

  const renderEntryLevelFresh = () => (
    <div className={`bg-white p-8 font-arial ${className}`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-lg text-gray-700 mb-3">{data.jobTitle || 'Entry-Level Position'}</p>
        <div className="text-sm text-gray-600 flex justify-center flex-wrap gap-4">
          <span>{data.email || 'email@example.com'}</span>
          <span>|</span>
          <span>{data.phone || '(555) 123-4567'}</span>
          <span>|</span>
          <span>LinkedIn: linkedin.com/in/yourname</span>
          <span>|</span>
          <span>Location: City, State</span>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {data.professionalSummary || 'Recent graduate with a degree in [field of study] seeking an entry-level position in [industry/field]. Strong foundation in [key skill] and [key skill] with hands-on experience through [relevant experience type]. Eager to contribute [specific value] to a forward-thinking organization.'}
        </p>
      </section>

      {/* Education - Placed higher for entry-level */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
          Education
        </h2>
        <div className="space-y-3">
          {data.education && data.education.length > 0 ? data.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                <p className="text-gray-700">{edu.institution || 'Institution Name'}</p>
                <p className="text-sm text-gray-600 mt-1">Relevant Coursework: Course 1, Course 2, Course 3</p>
              </div>
              <p className="text-sm text-gray-600">
                {edu.graduationDate ? formatDate(edu.graduationDate) : 'Graduation Date'}
              </p>
            </div>
          )) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">Degree in Field of Study</h3>
                <p className="text-gray-700">Institution Name</p>
                <p className="text-sm text-gray-600 mt-1">Relevant Coursework: Course 1, Course 2, Course 3</p>
              </div>
              <p className="text-sm text-gray-600">Graduation Date</p>
            </div>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
          Skills
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {data.skills ? data.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded text-center text-sm">
              {skill.trim()}
            </div>
          )) : (
            <>
              <div className="bg-gray-100 p-2 rounded text-center text-sm">Skill 1</div>
              <div className="bg-gray-100 p-2 rounded text-center text-sm">Skill 2</div>
              <div className="bg-gray-100 p-2 rounded text-center text-sm">Skill 3</div>
            </>
          )}
        </div>
      </section>

      {/* Work Experience / Internships */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b-2 border-gray-300">
          Experience & Internships
        </h2>
        <div className="space-y-5">
          {data.workExperience && data.workExperience.length > 0 ? data.workExperience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position || 'Position Title'}</h3>
                  <p className="text-gray-700">{exp.company || 'Company Name'}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate ? formatDate(exp.startDate) : 'Start Date'} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'End Date'}
                </p>
              </div>
              <div className="text-gray-700 text-sm">
                {exp.responsibilities ? exp.responsibilities.split('\n').filter(line => line.trim()).map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>{line.trim()}</span>
                  </p>
                )) : (
                  <p className="mb-1 flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    <span>Responsibility description</span>
                  </p>
                )}
              </div>
            </div>
          )) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">Intern / Assistant Position</h3>
                  <p className="text-gray-700">Company Name</p>
                </div>
                <p className="text-sm text-gray-600">Start Date - End Date</p>
              </div>
              <div className="text-gray-700 text-sm">
                <p className="mb-1 flex items-start">
                  <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <span>Responsibility description</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    } catch {
      return dateString;
    }
  };

  // Render the appropriate template based on the template ID
  switch (template.id) {
    case 'professional-classic':
      return renderProfessionalClassic();
    case 'modern-minimalist':
      return renderModernMinimalist();
    case 'executive-premium':
      return renderExecutivePremium();
    case 'technical-specialist':
      return renderTechnicalSpecialist();
    case 'entry-level-fresh':
      return renderEntryLevelFresh();
    default:
      return renderProfessionalClassic();
  }
}