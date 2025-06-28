'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Eye, 
  CheckCircle,
  AlertCircle,
  User,
  FileText,
  Code,
  Briefcase,
  GraduationCap,
  Info,
  ArrowLeft,
  Undo,
  Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ResumeFormData } from '@/lib/validations';
import { ResumePreview } from '@/components/resume-builder/resume-preview';
import { toast } from 'sonner';

interface ResumeEditorProps {
  resumeData: Partial<ResumeFormData>;
  onSave: (data: Partial<ResumeFormData>) => void;
  onClose: () => void;
  selectedTemplate: 'modern' | 'classic' | 'creative';
}

interface EditHistory {
  id: string;
  data: Partial<ResumeFormData>;
  timestamp: Date;
  description: string;
}

export function ResumeEditor({ resumeData, onSave, onClose, selectedTemplate }: ResumeEditorProps) {
  const [currentData, setCurrentData] = useState<Partial<ResumeFormData>>(resumeData);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<'add' | 'update' | 'delete' | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [editHistory, setEditHistory] = useState<EditHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [originalData] = useState<Partial<ResumeFormData>>(JSON.parse(JSON.stringify(resumeData)));

  const sections = [
    { 
      id: 1, 
      name: 'Personal Information', 
      icon: User,
      fields: ['fullName', 'email', 'phone', 'jobTitle'],
      description: 'Basic contact details and job title'
    },
    { 
      id: 2, 
      name: 'Professional Summary', 
      icon: FileText,
      fields: ['professionalSummary'],
      description: 'Your professional overview and key strengths'
    },
    { 
      id: 3, 
      name: 'Skills', 
      icon: Code,
      fields: ['skills'],
      description: 'Technical and professional skills'
    },
    { 
      id: 4, 
      name: 'Work Experience', 
      icon: Briefcase,
      fields: ['workExperience'],
      description: 'Employment history and achievements'
    },
    { 
      id: 5, 
      name: 'Education', 
      icon: GraduationCap,
      fields: ['education'],
      description: 'Educational background and qualifications'
    },
    { 
      id: 6, 
      name: 'Additional Information', 
      icon: Info,
      fields: ['certifications', 'projects', 'languages'],
      description: 'Certifications, projects, and other details'
    }
  ];

  // Initialize edit history
  useEffect(() => {
    const initialHistory: EditHistory = {
      id: Date.now().toString(),
      data: JSON.parse(JSON.stringify(resumeData)),
      timestamp: new Date(),
      description: 'Initial state'
    };
    setEditHistory([initialHistory]);
    setHistoryIndex(0);
  }, [resumeData]);

  // Track changes
  useEffect(() => {
    const hasChanges = JSON.stringify(currentData) !== JSON.stringify(resumeData);
    setHasUnsavedChanges(hasChanges);
  }, [currentData, resumeData]);

  const addToHistory = (description: string) => {
    const newHistoryEntry: EditHistory = {
      id: Date.now().toString(),
      data: JSON.parse(JSON.stringify(currentData)),
      timestamp: new Date(),
      description
    };

    // Remove any history after current index (for redo functionality)
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(newHistoryEntry);
    
    // Limit history to 50 entries
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    
    setEditHistory(newHistory);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentData(JSON.parse(JSON.stringify(editHistory[newIndex].data)));
      toast.success('Undid last change');
    }
  };

  const redo = () => {
    if (historyIndex < editHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentData(JSON.parse(JSON.stringify(editHistory[newIndex].data)));
      toast.success('Redid last change');
    }
  };

  const resetToOriginal = (sectionId: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const resetData = { ...currentData };
    section.fields.forEach(field => {
      if (originalData[field as keyof ResumeFormData]) {
        (resetData as any)[field] = JSON.parse(JSON.stringify(originalData[field as keyof ResumeFormData]));
      }
    });

    setCurrentData(resetData);
    addToHistory(`Reset ${section.name} to original`);
    toast.success(`${section.name} reset to original`);
  };

  const validateField = (field: string, value: any): string | null => {
    switch (field) {
      case 'fullName':
        return value && value.length >= 2 ? null : 'Name must be at least 2 characters';
      case 'email':
        return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email format';
      case 'phone':
        return value && /^[\+]?[1-9][\d\s\-\(\)]{8,}$/.test(value) ? null : 'Invalid phone format';
      case 'jobTitle':
        return value && value.length >= 2 ? null : 'Job title must be at least 2 characters';
      case 'professionalSummary':
        return value && value.length >= 50 ? null : 'Summary must be at least 50 characters';
      case 'skills':
        return value && value.length >= 10 ? null : 'Skills must be at least 10 characters';
      default:
        return null;
    }
  };

  const updateField = (field: string, value: any) => {
    const updatedData = { ...currentData, [field]: value };
    setCurrentData(updatedData);
  };

  const addWorkExperience = () => {
    const workExp = currentData.workExperience || [];
    const newExp = {
      dataId: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: ''
    };
    
    const updatedData = { ...currentData, workExperience: [...workExp, newExp] };
    setCurrentData(updatedData);
    addToHistory('Added new work experience');
    setEditingIndex(workExp.length);
    setEditMode('update');
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const workExp = [...(currentData.workExperience || [])];
    workExp[index] = { ...workExp[index], [field]: value };
    
    const updatedData = { ...currentData, workExperience: workExp };
    setCurrentData(updatedData);
  };

  const deleteWorkExperience = (index: number) => {
    const workExp = [...(currentData.workExperience || [])];
    workExp.splice(index, 1);
    
    const updatedData = { ...currentData, workExperience: workExp };
    setCurrentData(updatedData);
    addToHistory('Deleted work experience');
    toast.success('Work experience deleted');
  };

  const addEducation = () => {
    const education = currentData.education || [];
    const newEdu = {
      dataId: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      graduationDate: ''
    };
    
    const updatedData = { ...currentData, education: [...education, newEdu] };
    setCurrentData(updatedData);
    addToHistory('Added new education');
    setEditingIndex(education.length);
    setEditMode('update');
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const education = [...(currentData.education || [])];
    education[index] = { ...education[index], [field]: value };
    
    const updatedData = { ...currentData, education };
    setCurrentData(updatedData);
  };

  const deleteEducation = (index: number) => {
    const education = [...(currentData.education || [])];
    education.splice(index, 1);
    
    const updatedData = { ...currentData, education };
    setCurrentData(updatedData);
    addToHistory('Deleted education');
    toast.success('Education deleted');
  };

  const handleSave = () => {
    // Validate all fields
    const errors: string[] = [];
    
    if (currentData.fullName) {
      const nameError = validateField('fullName', currentData.fullName);
      if (nameError) errors.push(nameError);
    }
    
    if (currentData.email) {
      const emailError = validateField('email', currentData.email);
      if (emailError) errors.push(emailError);
    }

    if (errors.length > 0) {
      toast.error('Validation errors', {
        description: errors.join(', ')
      });
      return;
    }

    onSave(currentData);
    toast.success('Resume saved successfully!', {
      description: 'All changes have been saved to your resume.'
    });
  };

  const renderSectionContent = (sectionId: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return null;

    switch (sectionId) {
      case 1: // Personal Information
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={currentData.fullName || ''}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="John Doe"
                />
                {currentData.fullName && validateField('fullName', currentData.fullName) && (
                  <p className="text-sm text-red-600 mt-1">
                    {validateField('fullName', currentData.fullName)}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={currentData.jobTitle || ''}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentData.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="john@example.com"
                />
                {currentData.email && validateField('email', currentData.email) && (
                  <p className="text-sm text-red-600 mt-1">
                    {validateField('email', currentData.email)}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={currentData.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
                {currentData.phone && validateField('phone', currentData.phone) && (
                  <p className="text-sm text-red-600 mt-1">
                    {validateField('phone', currentData.phone)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2: // Professional Summary
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="professionalSummary">Professional Summary *</Label>
              <Textarea
                id="professionalSummary"
                value={currentData.professionalSummary || ''}
                onChange={(e) => updateField('professionalSummary', e.target.value)}
                placeholder="Write a compelling summary of your professional background..."
                rows={6}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {currentData.professionalSummary?.length || 0}/500 characters
                </span>
                {currentData.professionalSummary && validateField('professionalSummary', currentData.professionalSummary) && (
                  <p className="text-sm text-red-600">
                    {validateField('professionalSummary', currentData.professionalSummary)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 3: // Skills
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="skills">Skills *</Label>
              <Textarea
                id="skills"
                value={currentData.skills || ''}
                onChange={(e) => updateField('skills', e.target.value)}
                placeholder="List your skills, one per line:&#10;JavaScript&#10;React&#10;Node.js"
                rows={8}
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter each skill on a new line for better formatting
              </p>
            </div>
          </div>
        );

      case 4: // Work Experience
        return (
          <div className="space-y-6">
            {(currentData.workExperience || []).map((exp, index) => (
              <Card key={exp.dataId || index} className="border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Experience {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteWorkExperience(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company *</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Position *</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <Label>Start Date *</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={exp.current}
                      onChange={(e) => updateWorkExperience(index, 'current', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`current-${index}`}>I currently work here</Label>
                  </div>
                  <div>
                    <Label>Responsibilities *</Label>
                    <Textarea
                      value={exp.responsibilities}
                      onChange={(e) => updateWorkExperience(index, 'responsibilities', e.target.value)}
                      placeholder="Describe your key responsibilities and achievements..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button
              onClick={addWorkExperience}
              variant="outline"
              className="w-full border-dashed border-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Work Experience
            </Button>
          </div>
        );

      case 5: // Education
        return (
          <div className="space-y-6">
            {(currentData.education || []).map((edu, index) => (
              <Card key={edu.dataId || index} className="border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Education {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEducation(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution *</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree *</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <Label>Field of Study *</Label>
                      <Input
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <Label>Graduation Date *</Label>
                      <Input
                        type="month"
                        value={edu.graduationDate}
                        onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button
              onClick={addEducation}
              variant="outline"
              className="w-full border-dashed border-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        );

      case 6: // Additional Information
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                Additional Sections
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Add certifications, projects, languages, or other relevant information to enhance your resume.
              </p>
              
              {/* Certifications */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800 dark:text-gray-200">Certifications</h5>
                {(currentData.certifications || []).map((cert, index) => (
                  <Card key={cert.dataId || index} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Certification Name</Label>
                          <Input
                            value={cert.name}
                            onChange={(e) => {
                              const certs = [...(currentData.certifications || [])];
                              certs[index] = { ...certs[index], name: e.target.value };
                              setCurrentData({ ...currentData, certifications: certs });
                            }}
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>
                        <div>
                          <Label>Issuer</Label>
                          <Input
                            value={cert.issuer}
                            onChange={(e) => {
                              const certs = [...(currentData.certifications || [])];
                              certs[index] = { ...certs[index], issuer: e.target.value };
                              setCurrentData({ ...currentData, certifications: certs });
                            }}
                            placeholder="Amazon Web Services"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Resume Preview
            </h2>
            <Button
              onClick={() => setShowPreview(false)}
              variant="ghost"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="scale-75 origin-top-left w-[133%] h-[133%]">
              <ResumePreview 
                data={currentData as ResumeFormData} 
                template={selectedTemplate === 'creative' ? 'modern' : selectedTemplate}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Edit Resume
            </h2>
            {hasUnsavedChanges && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                Unsaved Changes
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Undo/Redo */}
            <Button
              onClick={undo}
              disabled={historyIndex <= 0}
              variant="ghost"
              size="sm"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              onClick={redo}
              disabled={historyIndex >= editHistory.length - 1}
              variant="ghost"
              size="sm"
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            {/* Preview */}
            <Button
              onClick={() => setShowPreview(true)}
              variant="ghost"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            
            {/* Save */}
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            {/* Close */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar - Section Selection */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
              Select a section to edit:
            </h3>
            
            <div className="space-y-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    setSelectedSection(section.id);
                    setEditMode(null);
                    setEditingIndex(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedSection === section.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedSection === section.id
                        ? 'bg-blue-100 dark:bg-blue-800'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <section.icon className={`w-4 h-4 ${
                        selectedSection === section.id
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {section.id}. {section.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content - Section Editor */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedSection ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {sections.find(s => s.id === selectedSection)?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sections.find(s => s.id === selectedSection)?.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => resetToOriginal(selectedSection)}
                      variant="outline"
                      size="sm"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset to Original
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  {renderSectionContent(selectedSection)}
                </div>

                {/* Edit Options */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Edit Options:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      onClick={() => setEditMode('add')}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add new entry
                    </Button>
                    <Button
                      onClick={() => setEditMode('update')}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Update existing
                    </Button>
                    <Button
                      onClick={() => setEditMode('delete')}
                      variant="outline"
                      size="sm"
                      className="justify-start text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete entry
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Select a Section to Edit
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a section from the left sidebar to start editing your resume.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}