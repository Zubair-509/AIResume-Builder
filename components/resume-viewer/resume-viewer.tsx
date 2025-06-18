'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Check, 
  Copy, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe, 
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ResumeData {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  website?: string;
  professionalSummary: string;
  skills: Record<string, string[]>;
  workExperience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    location?: string;
    responsibilities: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: string;
    gpa?: string;
    honors?: string;
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    highlights: string[];
  }>;
}

interface ResumeViewerProps {
  resumeData: ResumeData;
}

export function ResumeViewer({ resumeData }: ResumeViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      const currentUrl = window.location.href;
      
      if (navigator.share) {
        // Use native share API if available
        await navigator.share({
          title: `${resumeData.fullName} - ${resumeData.jobTitle}`,
          text: `Check out ${resumeData.fullName}'s professional resume`,
          url: currentUrl,
        });
        
        toast.success('Resume shared successfully!');
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(currentUrl);
        setShareSuccess(true);
        
        toast.success('Resume link copied to clipboard!', {
          description: 'You can now paste and share this link anywhere.',
        });
        
        // Reset success state after 3 seconds
        setTimeout(() => setShareSuccess(false), 3000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share resume', {
          description: 'Please try again or copy the URL manually.',
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading resume...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Resume Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Share Button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {resumeData.fullName}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {resumeData.jobTitle}
              </p>
            </div>
            
            <Button
              onClick={handleShare}
              disabled={isSharing}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Share this resume"
            >
              <AnimatePresence mode="wait">
                {isSharing ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sharing...
                  </motion.div>
                ) : shareSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Contact Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <a 
                    href={`mailto:${resumeData.email}`}
                    className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={`Email ${resumeData.fullName}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {resumeData.email}
                  </a>
                  
                  <a 
                    href={`tel:${resumeData.phone}`}
                    className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={`Call ${resumeData.fullName}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {resumeData.phone}
                  </a>
                  
                  {resumeData.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {resumeData.location}
                    </div>
                  )}
                  
                  {resumeData.linkedin && (
                    <a 
                      href={resumeData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  )}
                  
                  {resumeData.website && (
                    <a 
                      href={resumeData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="Personal website"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Professional Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            aria-labelledby="summary-heading"
          >
            <Card>
              <CardHeader>
                <CardTitle id="summary-heading" className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {resumeData.professionalSummary}
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            aria-labelledby="skills-heading"
          >
            <Card>
              <CardHeader>
                <CardTitle id="skills-heading" className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(resumeData.skills).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          {/* Work Experience */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            aria-labelledby="experience-heading"
          >
            <Card>
              <CardHeader>
                <CardTitle id="experience-heading" className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.workExperience.map((exp, index) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          {exp.position}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {exp.company}
                        </p>
                        {exp.location && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {exp.location}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.responsibilities.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2 flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {line.trim()}
                        </p>
                      ))}
                    </div>
                    
                    {index < resumeData.workExperience.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            aria-labelledby="education-heading"
          >
            <Card>
              <CardHeader>
                <CardTitle id="education-heading" className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {edu.institution}
                      </p>
                      {edu.honors && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {edu.honors}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      <p className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(edu.graduationDate)}
                      </p>
                      {edu.gpa && (
                        <p className="mt-1">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          {/* Certifications */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              aria-labelledby="certifications-heading"
            >
              <Card>
                <CardHeader>
                  <CardTitle id="certifications-heading" className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.certifications.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {cert.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {cert.issuer}
                        </p>
                        {cert.credentialId && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(cert.date)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.section>
          )}

          {/* Projects */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              aria-labelledby="projects-heading"
            >
              <Card>
                <CardHeader>
                  <CardTitle id="projects-heading" className="flex items-center">
                    <Code className="w-5 h-5 mr-2 text-blue-600" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.projects.map((project, index) => (
                    <div key={project.id}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                              {project.name}
                            </h3>
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                aria-label={`View ${project.name} project`}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="space-y-1">
                        {project.highlights.map((highlight, highlightIndex) => (
                          <p key={highlightIndex} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {highlight}
                          </p>
                        ))}
                      </div>
                      
                      {index < resumeData.projects.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.section>
          )}
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-break {
            page-break-before: always;
          }
          
          .print-avoid-break {
            page-break-inside: avoid;
          }
          
          header {
            position: static !important;
          }
          
          .shadow-lg, .shadow-xl, .shadow-2xl {
            box-shadow: none !important;
          }
          
          .border {
            border: 1px solid #e5e7eb !important;
          }
        }
      `}</style>
    </div>
  );
}