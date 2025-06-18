'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Maximize2, Loader2, FileText, Printer, Copy, Share2, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface ResumeExamplePreviewProps {
  example: any;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (format: string) => void;
}

export function ResumeExamplePreview({ 
  example, 
  isOpen, 
  onClose, 
  onDownload 
}: ResumeExamplePreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showKeywordTips, setShowKeywordTips] = useState(false);

  if (!example) return null;

  const handleDownload = async (format: string) => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDownload(format);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    toast.info('Preparing to print...', {
      description: 'Your browser print dialog will open shortly.'
    });
    
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleCopy = () => {
    toast.success('Example details copied to clipboard!');
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? 'max-w-[95vw] h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-hidden`}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span>{example.name}</span>
              <Badge variant="outline">{example.industry}</Badge>
              <Badge variant="secondary" className="capitalize">{example.level.replace('-', ' ')}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 p-0"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row h-[calc(90vh-80px)]">
          {/* Left Side - Example Preview */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="bg-white shadow-lg mx-auto max-w-[8.5in]" style={{ minHeight: '11in' }}>
              {/* Software Engineer Entry Level Example */}
              {example.id === 'software-engineer-entry' && (
                <div className="p-8 font-calibri">
                  <header className="text-center border-b-2 border-blue-600 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">SARAH CHEN</h1>
                    <p className="text-lg text-blue-600 mb-2">Software Engineer</p>
                    <div className="text-sm text-gray-600">
                      <p>sarah.chen@email.com | (555) 987-6543 | linkedin.com/in/sarahchen</p>
                      <p>San Francisco, CA | github.com/sarahchen</p>
                    </div>
                  </header>

                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-blue-200 pb-1">
                      PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Recent Computer Science graduate with hands-on experience in full-stack development 
                      through internships and personal projects. Proficient in JavaScript, React, and Node.js 
                      with a passion for creating efficient, user-friendly applications. Strong problem-solving 
                      skills and experience working in Agile development environments.
                    </p>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-blue-200 pb-1">
                      TECHNICAL SKILLS
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Programming Languages:</strong> JavaScript, Python, Java, C++
                      </div>
                      <div>
                        <strong>Web Technologies:</strong> React, HTML5, CSS3, Node.js
                      </div>
                      <div>
                        <strong>Databases:</strong> MySQL, MongoDB, PostgreSQL
                      </div>
                      <div>
                        <strong>Tools & Platforms:</strong> Git, Docker, AWS, Jira
                      </div>
                    </div>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-blue-200 pb-1">
                      EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">Software Engineering Intern</h3>
                            <p className="text-gray-700">TechStart Inc.</p>
                          </div>
                          <p className="text-sm text-gray-600">Jun 2023 - Aug 2023</p>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                          <li>Developed responsive web components using React and TypeScript</li>
                          <li>Collaborated with senior developers on feature implementation using Agile methodology</li>
                          <li>Improved application performance by 25% through code optimization</li>
                          <li>Participated in code reviews and contributed to team documentation</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-blue-200 pb-1">
                      PROJECTS
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-gray-900">E-commerce Web Application</h3>
                        <p className="text-sm text-gray-700">
                          Built a full-stack e-commerce platform using React, Node.js, and MongoDB. 
                          Implemented user authentication, shopping cart functionality, and payment processing.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-blue-200 pb-1">
                      EDUCATION
                    </h2>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">Bachelor of Science in Computer Science</h3>
                        <p className="text-gray-700">University of California, Berkeley</p>
                        <p className="text-sm text-gray-600">GPA: 3.8/4.0, Magna Cum Laude</p>
                      </div>
                      <p className="text-sm text-gray-600">May 2023</p>
                    </div>
                  </section>
                </div>
              )}

              {/* Marketing Manager Mid-Career Example */}
              {example.id === 'marketing-manager-mid' && (
                <div className="p-8 font-calibri">
                  <header className="border-b-2 border-gray-800 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">ALEX RODRIGUEZ</h1>
                    <p className="text-lg text-gray-700 mb-2">Marketing Manager</p>
                    <div className="text-sm text-gray-600 flex flex-wrap gap-4">
                      <span>alex.rodriguez@email.com</span>
                      <span>(555) 234-5678</span>
                      <span>linkedin.com/in/alexrodriguez</span>
                      <span>New York, NY</span>
                    </div>
                  </header>

                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                      PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Results-driven Marketing Manager with 6+ years of experience developing and executing 
                      comprehensive marketing strategies that drive brand awareness and revenue growth. 
                      Expertise in digital marketing, campaign management, and marketing analytics with a 
                      proven track record of increasing conversion rates and ROI. Skilled in leading cross-functional 
                      teams and managing multiple projects simultaneously.
                    </p>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                      CORE COMPETENCIES
                    </h2>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">Digital Marketing Strategy</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">SEO/SEM Optimization</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">Content Marketing</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">Social Media Management</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">Marketing Analytics</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">Campaign Management</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">Team Leadership</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        <span className="text-gray-700">Budget Management</span>
                      </div>
                    </div>
                  </section>

                  <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                      PROFESSIONAL EXPERIENCE
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">Marketing Manager</h3>
                            <p className="text-gray-700">Global Brands Inc.</p>
                          </div>
                          <p className="text-sm text-gray-600">Jan 2020 - Present</p>
                        </div>
                        <div className="text-gray-700 text-sm">
                          <p className="mb-1 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                            <span>Developed and executed comprehensive marketing strategies resulting in 45% increase in lead generation and 30% growth in revenue</span>
                          </p>
                          <p className="mb-1 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                            <span>Managed $1.2M annual marketing budget and achieved 20% reduction in cost per acquisition</span>
                          </p>
                          <p className="mb-1 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                            <span>Led team of 5 marketing specialists and improved campaign delivery time by 35%</span>
                          </p>
                          <p className="mb-1 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                            <span>Implemented data-driven marketing approach that increased conversion rates by 25%</span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">Digital Marketing Specialist</h3>
                            <p className="text-gray-700">Marketing Solutions Co.</p>
                          </div>
                          <p className="text-sm text-gray-600">Mar 2017 - Dec 2019</p>
                        </div>
                        <div className="text-gray-700 text-sm">
                          <p className="mb-1 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                            <span>Managed SEO/SEM campaigns that increased organic traffic by 65% and reduced PPC costs by 20%</span>
                          </p>
                          <p className="mb-1 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                            <span>Created and implemented content marketing strategy that generated 40% increase in engagement</span>
                          </p>
                          <p className="mb-1 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                            <span>Conducted market research and competitor analysis to identify growth opportunities</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                      EDUCATION
                    </h2>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">Bachelor of Business Administration in Marketing</h3>
                        <p className="text-gray-700">New York University</p>
                      </div>
                      <p className="text-sm text-gray-600">May 2017</p>
                    </div>
                  </section>
                </div>
              )}

              {/* Default Example Preview */}
              {example.id !== 'software-engineer-entry' && example.id !== 'marketing-manager-mid' && (
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{example.name}</h2>
                  <p className="text-gray-600 mb-6">{example.description}</p>
                  <div className="bg-gray-100 h-96 flex items-center justify-center rounded-lg">
                    <p className="text-gray-500">Example preview will be displayed here</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {example.keywords.map((keyword: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side - Example Info & Actions */}
          <div className="w-full md:w-64 p-4 flex flex-col space-y-4 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {example.description}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowKeywordTips(!showKeywordTips)}
                    className="h-6 w-6 p-0"
                  >
                    <Info className="w-4 h-4 text-blue-600" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.keywords.map((keyword: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
                
                <AnimatePresence>
                  {showKeywordTips && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded"
                    >
                      <p className="mb-1 font-medium text-blue-700 dark:text-blue-300">ATS Keyword Tips:</p>
                      <ul className="space-y-1 pl-4 list-disc">
                        <li>Include these keywords in your resume</li>
                        <li>Use exact matches where possible</li>
                        <li>Incorporate naturally in your experience</li>
                        <li>Include both spelled-out terms and acronyms</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Industry:</span>
                    <span className="text-gray-900 dark:text-gray-100">{example.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Level:</span>
                    <span className="text-gray-900 dark:text-gray-100 capitalize">{example.level.replace('-', ' ')}</span>
                  </div>
                  {example.salary_range && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Salary Range:</span>
                      <span className="text-gray-900 dark:text-gray-100">{example.salary_range}</span>
                    </div>
                  )}
                  {example.experience_years && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                      <span className="text-gray-900 dark:text-gray-100">{example.experience_years}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Download</h3>
                {example.downloadFormats.map((format: string) => (
                  <Button
                    key={format}
                    onClick={() => handleDownload(format)}
                    disabled={isDownloading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download {format}
                      </>
                    )}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="w-full"
                  >
                    <Printer className="w-4 h-4 mr-1" />
                    Print
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="w-full"
                    colSpan={2}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}