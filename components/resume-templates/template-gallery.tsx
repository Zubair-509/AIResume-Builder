'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Eye, 
  FileText, 
  Palette, 
  Filter,
  Search,
  Star,
  CheckCircle,
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Info,
  AlertTriangle,
  FileImage,
  Loader2,
  Type
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResumeTemplatePreview } from './template-preview';
import { ResumeExamplePreview } from './example-preview';
import { ATSTemplateGenerator } from './ats-template-generator';
import { resumeTemplates, resumeExamples, industryCategories, experienceLevels } from './template-data';
import { toast } from 'sonner';

export function TemplateGallery() {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [previewExample, setPreviewExample] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAtsInfo, setShowAtsInfo] = useState(false);

  const filteredTemplates = resumeTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || template.difficulty === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const filteredExamples = resumeExamples.filter(example => {
    const matchesSearch = example.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = selectedLevel === 'all' || example.level === selectedLevel;
    const matchesIndustry = selectedIndustry === 'all' || example.industry.toLowerCase() === selectedIndustry.toLowerCase();
    
    return matchesSearch && matchesLevel && matchesIndustry;
  });

  const handleDownload = async (item: any, format: string) => {
    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fileName = `${item.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${format.toLowerCase()}`;
      
      toast.success(`Downloaded ${fileName}`, {
        description: 'File has been saved to your downloads folder.'
      });
    } catch (error) {
      toast.error('Download failed', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewTemplate = (template: any) => {
    setPreviewTemplate(template);
  };

  const handlePreviewExample = (example: any) => {
    setPreviewExample(example);
  };

  const handleGenerateTemplate = (template: any) => {
    toast.success('ATS-optimized template generated!', {
      description: `Your resume has been optimized with a ${template.atsScore}% ATS compatibility score.`
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Professional Resume Templates & Examples
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Choose from our collection of ATS-optimized templates and industry-specific examples 
          designed to help you land your dream job.
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
          
          <AnimatePresence>
            {showAtsInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-blue-100 dark:border-blue-800/30"
              >
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
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span>Use standard file formats (.docx, .pdf)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
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
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span>Avoid using acronyms without spelling them out first</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search templates and examples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid-Career</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="career-change">Career Change</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industryCategories.map(industry => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - ATS Generator */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ATSTemplateGenerator 
              resumeData={{}} 
              onGenerate={handleGenerateTemplate} 
            />
            
            <Card className="border-0 shadow-lg mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Template Selection Tips
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Choose templates with 95%+ ATS scores for corporate jobs</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Match template style to your industry (conservative for finance, creative for design)</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Select templates that highlight your strongest qualifications</span>
                  </p>
                  <p className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Review examples in your industry for inspiration</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Templates & Examples */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="templates" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Templates ({filteredTemplates.length})</span>
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Examples ({filteredExamples.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                        <div className="relative">
                          <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                            <FileImage className="w-16 h-16 text-gray-400" />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-green-100 text-green-700 border-0">
                                ATS {template.atsScore}%
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handlePreviewTemplate(template)}
                                className="bg-white/90 text-gray-900 hover:bg-white"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Preview
                              </Button>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {template.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {template.description}
                              </p>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {template.category}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {template.features.slice(0, 3).map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {template.features.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{template.features.length - 3}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center">
                                <Type className="w-3 h-3 mr-1" />
                                <span>{template.fonts[0]}</span>
                              </div>
                              <div className="flex items-center">
                                <Palette className="w-3 h-3 mr-1" />
                                <span>{template.colors.length} colors</span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              {template.downloadFormats.map((format) => (
                                <Button
                                  key={format}
                                  size="sm"
                                  onClick={() => handleDownload(template, format)}
                                  disabled={isDownloading}
                                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  {isDownloading ? (
                                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                  ) : (
                                    <Download className="w-3 h-3 mr-1" />
                                  )}
                                  {format}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredExamples.map((example, index) => (
                    <motion.div
                      key={example.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                        <div className="relative">
                          <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <FileImage className="w-16 h-16 text-gray-400" />
                            <div className="absolute top-2 right-2 flex space-x-1">
                              {example.atsOptimized && (
                                <Badge className="bg-green-100 text-green-700 border-0">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  ATS
                                </Badge>
                              )}
                            </div>
                            <div className="absolute top-2 left-2">
                              <Badge variant="outline" className="capitalize">
                                {example.level.replace('-', ' ')}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handlePreviewExample(example)}
                                className="bg-white/90 text-gray-900 hover:bg-white"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Preview
                              </Button>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {example.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {example.description}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {example.industry}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {example.keywords.slice(0, 3).map((keyword, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                              {example.keywords.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{example.keywords.length - 3} more
                                </Badge>
                              )}
                            </div>

                            {example.salary_range && (
                              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Briefcase className="w-3 h-3 mr-1" />
                                  <span>{example.experience_years}</span>
                                </div>
                                <div className="flex items-center">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  <span>{example.salary_range}</span>
                                </div>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              {example.downloadFormats.map((format) => (
                                <Button
                                  key={format}
                                  size="sm"
                                  onClick={() => handleDownload(example, format)}
                                  disabled={isDownloading}
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                >
                                  {isDownloading ? (
                                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                  ) : (
                                    <Download className="w-3 h-3 mr-1" />
                                  )}
                                  {format}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Stats Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{resumeTemplates.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Professional Templates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">{resumeExamples.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Industry Examples</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average ATS Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Download Formats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Preview Modal */}
      <ResumeTemplatePreview
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onDownload={(format) => {
          handleDownload(previewTemplate, format);
          setPreviewTemplate(null);
        }}
      />

      {/* Example Preview Modal */}
      <ResumeExamplePreview
        example={previewExample}
        isOpen={!!previewExample}
        onClose={() => setPreviewExample(null)}
        onDownload={(format) => {
          handleDownload(previewExample, format);
          setPreviewExample(null);
        }}
      />
    </div>
  );
}