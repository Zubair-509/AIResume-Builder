'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResumeFormData } from '@/lib/validations';
import { TemplatePreview } from './template-preview';
import { TemplateRenderer } from './template-renderer';
import { PDFExporter } from './pdf-exporter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, FileText, CheckCircle, Info } from 'lucide-react';
import { LivePreview } from '@/components/ui/live-preview';
import Link from 'next/link';
import { toast } from 'sonner';

interface TemplateGalleryProps {
  resumeData?: ResumeFormData;
  onTemplateSelect?: (templateId: string) => void;
}

export function TemplateGallery({ resumeData, onTemplateSelect }: TemplateGalleryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [showAtsInfo, setShowAtsInfo] = useState(false);

  // Sample resume data if none is provided
  const sampleData: ResumeFormData = resumeData || {
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    jobTitle: "Senior Software Engineer",
    professionalSummary: "Experienced software engineer with 7+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering scalable solutions that improve user experience and drive business growth.",
    skills: "JavaScript\nTypeScript\nReact\nNode.js\nAWS\nDocker\nSQL\nNoSQL\nAgile Methodologies\nCI/CD",
    workExperience: [
      {
        id: "1",
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        startDate: "2021-01",
        endDate: "",
        current: true,
        responsibilities: "Led development of microservices architecture serving 1M+ daily users\nReduced application load time by 40% through performance optimization\nMentored 3 junior developers and established code review best practices\nCollaborated with product team to define technical requirements for new features"
      },
      {
        id: "2",
        company: "Digital Innovations",
        position: "Software Developer",
        startDate: "2018-03",
        endDate: "2020-12",
        current: false,
        responsibilities: "Developed and maintained RESTful APIs using Node.js and Express\nImplemented responsive web applications using React and Redux\nOptimized database queries resulting in 30% improved performance\nParticipated in agile development process with bi-weekly sprints"
      }
    ],
    education: [
      {
        id: "1",
        institution: "University of Technology",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        graduationDate: "2018-05"
      }
    ]
  };

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean, contemporary design with blue accents', atsScore: 95 },
    { id: 'classic', name: 'Classic', description: 'Traditional layout for corporate positions', atsScore: 98 },
    { id: 'professional', name: 'Professional', description: 'Polished design for experienced professionals', atsScore: 97 },
    { id: 'technical', name: 'Technical', description: 'Optimized for technical and IT roles', atsScore: 99 },
    { id: 'entry-level', name: 'Entry Level', description: 'Perfect for new graduates and career starters', atsScore: 96 },
    { id: 'executive', name: 'Executive', description: 'Sophisticated design for leadership positions', atsScore: 97 },
    { id: 'creative', name: 'Creative', description: 'Unique layout for creative professionals', atsScore: 92 }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
    toast.success(`${templates.find(t => t.id === templateId)?.name} template selected`);
  };

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  const handleExportComplete = () => {
    toast.success('Resume downloaded successfully!');
  };

  const handleExportError = (error: Error) => {
    toast.error('Failed to download resume', {
      description: error.message
    });
  };

  // Save resume data to session storage for edit functionality
  const saveResumeData = () => {
    if (resumeData) {
      sessionStorage.setItem('resume-data', JSON.stringify(resumeData));
    } else {
      sessionStorage.setItem('resume-data', JSON.stringify(sampleData));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Professional Resume Templates
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Choose from our collection of ATS-optimized templates designed to help you land your dream job.
        </p>
      </div>

      {/* ATS Information Banner */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ATS-Optimized Templates
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All our templates are designed to pass through Applicant Tracking Systems (ATS) with ease. 
                They use standard fonts, proper formatting, and keyword-friendly layouts to ensure your resume gets seen by hiring managers.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAtsInfo(!showAtsInfo)}
                className="text-blue-600 border-blue-200"
              >
                <Info className="w-4 h-4 mr-2" />
                {showAtsInfo ? 'Hide ATS Tips' : 'View ATS Tips'}
              </Button>
            </div>
          </div>
          
          {showAtsInfo && (
            <div className="mt-4 pt-4 border-t border-blue-100 dark:border-blue-800/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    ATS Do's
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Use standard fonts (Arial, Calibri, Times New Roman)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Include clear section headings (Experience, Education, Skills)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Use standard margins (0.5-1 inch)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Include keywords from the job description</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                    <Info className="w-4 h-4 mr-2 text-red-600" />
                    ATS Don'ts
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Avoid tables, text boxes, and complex formatting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Don't use headers/footers for important information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Avoid graphics, icons, and images</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Don't use uncommon fonts or font sizes below 10pt</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Template Live Preview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Selected Template Preview
        </h3>
        <LivePreview 
          title={`${templates.find(t => t.id === selectedTemplate)?.name} Template`}
          templateId={selectedTemplate}
          showEditButton={true}
          showDownloadButton={true}
          onDownload={() => {
            saveResumeData();
            toast.success('Template ready for download');
          }}
        >
          <div className="p-4">
            <div className="scale-[0.6] origin-top-left w-[167%] h-[167%]">
              <TemplateRenderer templateId={selectedTemplate} data={resumeData || sampleData} showEditButton={true} />
            </div>
          </div>
        </LivePreview>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplatePreview
            key={template.id}
            templateId={template.id}
            data={resumeData || sampleData}
            isSelected={selectedTemplate === template.id}
            onClick={() => {
              handleTemplateSelect(template.id);
              saveResumeData(); // Save data for edit functionality
            }}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <Link href={`/edit-resume?template=${selectedTemplate}`} onClick={saveResumeData}>
          <Button
            variant="outline"
            size="lg"
            className="border-2"
          >
            <Eye className="w-5 h-5 mr-2" />
            Edit Selected Template
          </Button>
        </Link>
        
        <PDFExporter
          resumeData={resumeData || sampleData}
          templateId={selectedTemplate}
          onExportComplete={handleExportComplete}
          onExportError={handleExportError}
        />
      </div>
    </div>
  );
}

export default TemplateGallery;