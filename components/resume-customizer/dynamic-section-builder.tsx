'use client';

import { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  GripVertical, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  ChevronDown,
  Calendar,
  MapPin,
  Building,
  User,
  Award,
  Code,
  BookOpen,
  Briefcase,
  GraduationCap,
  Star,
  Globe,
  Heart,
  Zap,
  CheckCircle,
  AlertCircle,
  Copy,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface SectionEntry {
  id: string;
  [key: string]: any;
}

interface ResumeSection {
  id: string;
  type: string;
  title: string;
  order: number;
  visible: boolean;
  entries: SectionEntry[];
  isEditing?: boolean;
}

interface SectionTemplate {
  id: string;
  name: string;
  icon: any;
  description: string;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'email' | 'url' | 'number' | 'select';
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    options?: string[];
    validation?: (value: string) => string | null;
  }>;
  defaultEntry: Record<string, any>;
}

interface DynamicSectionBuilderProps {
  sections: ResumeSection[];
  onUpdate: (sections: ResumeSection[]) => void;
  onPreview?: (sections: ResumeSection[]) => void;
}

export function DynamicSectionBuilder({ sections, onUpdate, onPreview }: DynamicSectionBuilderProps) {
  const [localSections, setLocalSections] = useState<ResumeSection[]>(sections);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editingEntry, setEditingEntry] = useState<{ sectionId: string; entryId: string | null }>({ sectionId: '', entryId: null });
  const [previewMode, setPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const sectionTemplates: SectionTemplate[] = [
    {
      id: 'work-experience',
      name: 'Work Experience',
      icon: Briefcase,
      description: 'Professional work history and achievements',
      fields: [
        { key: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Google Inc.', maxLength: 100 },
        { key: 'position', label: 'Position', type: 'text', required: true, placeholder: 'Senior Software Engineer', maxLength: 100 },
        { key: 'location', label: 'Location', type: 'text', placeholder: 'San Francisco, CA', maxLength: 100 },
        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
        { key: 'endDate', label: 'End Date', type: 'date' },
        { key: 'current', label: 'Currently Working', type: 'select', options: ['Yes', 'No'] },
        { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe your key responsibilities and achievements...', maxLength: 1000 }
      ],
      defaultEntry: {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: 'No',
        description: ''
      }
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      description: 'Educational background and qualifications',
      fields: [
        { key: 'institution', label: 'Institution', type: 'text', required: true, placeholder: 'Stanford University', maxLength: 100 },
        { key: 'degree', label: 'Degree', type: 'text', required: true, placeholder: 'Bachelor of Science', maxLength: 100 },
        { key: 'fieldOfStudy', label: 'Field of Study', type: 'text', required: true, placeholder: 'Computer Science', maxLength: 100 },
        { key: 'graduationDate', label: 'Graduation Date', type: 'date', required: true },
        { key: 'gpa', label: 'GPA', type: 'text', placeholder: '3.8/4.0', maxLength: 10 },
        { key: 'honors', label: 'Honors/Awards', type: 'text', placeholder: 'Magna Cum Laude', maxLength: 200 }
      ],
      defaultEntry: {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        graduationDate: '',
        gpa: '',
        honors: ''
      }
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Code,
      description: 'Technical and professional skills',
      fields: [
        { key: 'category', label: 'Category', type: 'text', required: true, placeholder: 'Programming Languages', maxLength: 50 },
        { key: 'skills', label: 'Skills', type: 'textarea', required: true, placeholder: 'JavaScript, Python, React, Node.js...', maxLength: 500 },
        { key: 'proficiency', label: 'Proficiency Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
      ],
      defaultEntry: {
        category: '',
        skills: '',
        proficiency: 'Intermediate'
      }
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: Star,
      description: 'Personal and professional projects',
      fields: [
        { key: 'name', label: 'Project Name', type: 'text', required: true, placeholder: 'E-commerce Platform', maxLength: 100 },
        { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Built a scalable e-commerce platform...', maxLength: 500 },
        { key: 'technologies', label: 'Technologies Used', type: 'text', placeholder: 'React, Node.js, MongoDB', maxLength: 200 },
        { key: 'url', label: 'Project URL', type: 'url', placeholder: 'https://github.com/username/project' },
        { key: 'startDate', label: 'Start Date', type: 'date' },
        { key: 'endDate', label: 'End Date', type: 'date' }
      ],
      defaultEntry: {
        name: '',
        description: '',
        technologies: '',
        url: '',
        startDate: '',
        endDate: ''
      }
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: Award,
      description: 'Professional certifications and licenses',
      fields: [
        { key: 'name', label: 'Certification Name', type: 'text', required: true, placeholder: 'AWS Certified Solutions Architect', maxLength: 100 },
        { key: 'issuer', label: 'Issuing Organization', type: 'text', required: true, placeholder: 'Amazon Web Services', maxLength: 100 },
        { key: 'date', label: 'Issue Date', type: 'date', required: true },
        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
        { key: 'credentialId', label: 'Credential ID', type: 'text', placeholder: 'ABC123456', maxLength: 50 },
        { key: 'url', label: 'Verification URL', type: 'url', placeholder: 'https://verify.example.com' }
      ],
      defaultEntry: {
        name: '',
        issuer: '',
        date: '',
        expiryDate: '',
        credentialId: '',
        url: ''
      }
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: Globe,
      description: 'Language skills and proficiency',
      fields: [
        { key: 'language', label: 'Language', type: 'text', required: true, placeholder: 'Spanish', maxLength: 50 },
        { key: 'proficiency', label: 'Proficiency', type: 'select', required: true, options: ['Native', 'Fluent', 'Conversational', 'Basic'] },
        { key: 'certification', label: 'Certification', type: 'text', placeholder: 'DELE B2', maxLength: 100 }
      ],
      defaultEntry: {
        language: '',
        proficiency: 'Conversational',
        certification: ''
      }
    },
    {
      id: 'volunteer',
      name: 'Volunteer Experience',
      icon: Heart,
      description: 'Community service and volunteer work',
      fields: [
        { key: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Local Food Bank', maxLength: 100 },
        { key: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Volunteer Coordinator', maxLength: 100 },
        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
        { key: 'endDate', label: 'End Date', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Organized food distribution events...', maxLength: 500 }
      ],
      defaultEntry: {
        organization: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    },
    {
      id: 'custom',
      name: 'Custom Section',
      icon: Zap,
      description: 'Create your own custom section',
      fields: [
        { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Item Title', maxLength: 100 },
        { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Subtitle or organization', maxLength: 100 },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed description...', maxLength: 500 }
      ],
      defaultEntry: {
        title: '',
        subtitle: '',
        date: '',
        description: ''
      }
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (JSON.stringify(localSections) !== JSON.stringify(sections)) {
        setSaveStatus('saving');
        onUpdate(localSections);
        setTimeout(() => setSaveStatus('saved'), 500);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [localSections, sections, onUpdate]);

  // Real-time preview updates
  useEffect(() => {
    if (onPreview) {
      onPreview(localSections);
    }
  }, [localSections, onPreview]);

  const validateField = (field: any, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }
    
    if (field.maxLength && value.length > field.maxLength) {
      return `${field.label} must be less than ${field.maxLength} characters`;
    }
    
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    
    if (field.type === 'url' && value && !/^https?:\/\/.+/.test(value)) {
      return 'Please enter a valid URL (starting with http:// or https://)';
    }
    
    if (field.validation) {
      return field.validation(value);
    }
    
    return null;
  };

  const addSection = (templateId: string, customTitle?: string) => {
    const template = sectionTemplates.find(t => t.id === templateId);
    if (!template) return;

    const newSection: ResumeSection = {
      id: Date.now().toString(),
      type: templateId,
      title: customTitle || template.name,
      order: localSections.length + 1,
      visible: true,
      entries: []
    };

    setLocalSections([...localSections, newSection]);
    setShowAddMenu(false);
    setSaveStatus('unsaved');
    toast.success(`${newSection.title} section added`);
  };

  const deleteSection = (sectionId: string) => {
    const section = localSections.find(s => s.id === sectionId);
    setLocalSections(localSections.filter(s => s.id !== sectionId));
    setSaveStatus('unsaved');
    toast.success(`${section?.title} section deleted`);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setLocalSections(localSections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    ));
    setSaveStatus('unsaved');
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setLocalSections(localSections.map(section =>
      section.id === sectionId
        ? { ...section, title }
        : section
    ));
    setSaveStatus('unsaved');
  };

  const reorderSections = (newSections: ResumeSection[]) => {
    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    setLocalSections(reorderedSections);
    setSaveStatus('unsaved');
  };

  const addEntry = (sectionId: string) => {
    const section = localSections.find(s => s.id === sectionId);
    const template = sectionTemplates.find(t => t.id === section?.type);
    
    if (!section || !template) return;

    const newEntry: SectionEntry = {
      id: Date.now().toString(),
      ...template.defaultEntry
    };

    setLocalSections(localSections.map(s =>
      s.id === sectionId
        ? { ...s, entries: [...s.entries, newEntry] }
        : s
    ));

    setEditingEntry({ sectionId, entryId: newEntry.id });
    setSaveStatus('unsaved');
  };

  const updateEntry = (sectionId: string, entryId: string, field: string, value: any) => {
    setLocalSections(localSections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            entries: section.entries.map(entry =>
              entry.id === entryId
                ? { ...entry, [field]: value }
                : entry
            )
          }
        : section
    ));
    setSaveStatus('unsaved');
  };

  const deleteEntry = (sectionId: string, entryId: string) => {
    setLocalSections(localSections.map(section =>
      section.id === sectionId
        ? { ...section, entries: section.entries.filter(entry => entry.id !== entryId) }
        : section
    ));
    setSaveStatus('unsaved');
    toast.success('Entry deleted');
  };

  const duplicateEntry = (sectionId: string, entryId: string) => {
    const section = localSections.find(s => s.id === sectionId);
    const entry = section?.entries.find(e => e.id === entryId);
    
    if (!section || !entry) return;

    const duplicatedEntry = {
      ...entry,
      id: Date.now().toString()
    };

    setLocalSections(localSections.map(s =>
      s.id === sectionId
        ? { ...s, entries: [...s.entries, duplicatedEntry] }
        : s
    ));
    setSaveStatus('unsaved');
    toast.success('Entry duplicated');
  };

  const renderField = (field: any, value: any, onChange: (value: any) => void, error?: string) => {
    const fieldId = `field-${field.key}-${Date.now()}`;

    switch (field.type) {
      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={fieldId}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              maxLength={field.maxLength}
              className={error ? 'border-red-500' : ''}
            />
            {field.maxLength && (
              <div className="text-xs text-gray-500 text-right">
                {(value || '').length}/{field.maxLength}
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      case 'select':
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={value || ''} onValueChange={onChange}>
              <SelectTrigger id={fieldId} className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      case 'date':
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              type="month"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldId} className="flex items-center">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={fieldId}
              type={field.type}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              className={error ? 'border-red-500' : ''}
            />
            {field.maxLength && (
              <div className="text-xs text-gray-500 text-right">
                {(value || '').length}/{field.maxLength}
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );
    }
  };

  const renderSectionEntry = (section: ResumeSection, entry: SectionEntry, template: SectionTemplate) => {
    const isEditing = editingEntry.sectionId === section.id && editingEntry.entryId === entry.id;

    if (!isEditing) {
      // Preview mode
      return (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {entry.title || entry.name || entry.company || entry.institution || entry.language || 'Untitled Entry'}
              </h4>
              {(entry.subtitle || entry.position || entry.degree || entry.role) && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.subtitle || entry.position || entry.degree || entry.role}
                </p>
              )}
              {(entry.date || entry.startDate) && (
                <p className="text-xs text-gray-500 mt-1">
                  {entry.startDate && entry.endDate 
                    ? `${entry.startDate} - ${entry.endDate}`
                    : entry.date || entry.startDate
                  }
                </p>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingEntry({ sectionId: section.id, entryId: entry.id })}
                className="h-8 px-2"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicateEntry(section.id, entry.id)}
                className="h-8 px-2"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteEntry(section.id, entry.id)}
                className="h-8 px-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Edit mode
    return (
      <Card className="border border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Edit Entry</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingEntry({ sectionId: '', entryId: null })}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {template.fields.map((field) => {
              const error = validationErrors[`${section.id}-${entry.id}-${field.key}`];
              return (
                <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  {renderField(
                    field,
                    entry[field.key],
                    (value) => {
                      updateEntry(section.id, entry.id, field.key, value);
                      // Clear validation error when user starts typing
                      if (error) {
                        const newErrors = { ...validationErrors };
                        delete newErrors[`${section.id}-${entry.id}-${field.key}`];
                        setValidationErrors(newErrors);
                      }
                    },
                    error
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingEntry({ sectionId: '', entryId: null })}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                // Validate all fields
                const errors: Record<string, string> = {};
                template.fields.forEach(field => {
                  const error = validateField(field, entry[field.key]);
                  if (error) {
                    errors[`${section.id}-${entry.id}-${field.key}`] = error;
                  }
                });

                if (Object.keys(errors).length > 0) {
                  setValidationErrors({ ...validationErrors, ...errors });
                  toast.error('Please fix validation errors');
                  return;
                }

                setEditingEntry({ sectionId: '', entryId: null });
                toast.success('Entry saved');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Resume Sections
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, and organize your resume sections
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Save Status */}
          <div className="flex items-center space-x-2">
            {saveStatus === 'saving' && (
              <div className="flex items-center text-blue-600">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                />
                <span className="text-sm ml-2">Saving...</span>
              </div>
            )}
            {saveStatus === 'saved' && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm ml-2">Saved</span>
              </div>
            )}
            {saveStatus === 'unsaved' && (
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm ml-2">Unsaved changes</span>
              </div>
            )}
          </div>

          {/* Preview Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </Button>

          {/* Add Section Button */}
          <div className="relative">
            <Button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Section
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>

            {/* Add Section Dropdown */}
            <AnimatePresence>
              {showAddMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Choose Section Type
                    </h4>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {sectionTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => addSection(template.id)}
                          className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <template.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                {template.name}
                              </h5>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {template.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <Reorder.Group
        axis="y"
        values={localSections}
        onReorder={reorderSections}
        className="space-y-4"
      >
        <AnimatePresence>
          {localSections.map((section) => {
            const template = sectionTemplates.find(t => t.id === section.type);
            const Icon = template?.icon || Zap;

            return (
              <Reorder.Item
                key={section.id}
                value={section}
                className="cursor-grab active:cursor-grabbing"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-300 ${
                    section.visible
                      ? 'border-gray-200 dark:border-gray-700'
                      : 'border-gray-100 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="p-6">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                        <Icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <Input
                            value={section.title}
                            onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                            className="font-semibold text-lg border-0 p-0 h-auto bg-transparent focus:ring-0"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {section.entries.length} {section.entries.length === 1 ? 'entry' : 'entries'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`visible-${section.id}`} className="text-sm">
                            {section.visible ? 'Visible' : 'Hidden'}
                          </Label>
                          <Switch
                            id={`visible-${section.id}`}
                            checked={section.visible}
                            onCheckedChange={() => toggleSectionVisibility(section.id)}
                          />
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSection(section.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Section Entries */}
                    {section.visible && (
                      <div className="space-y-4">
                        {section.entries.length === 0 ? (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Icon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No entries added yet</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addEntry(section.id)}
                              className="mt-2"
                            >
                              Add First Entry
                            </Button>
                          </div>
                        ) : (
                          <>
                            {section.entries.map((entry) => (
                              <div key={entry.id}>
                                {template && renderSectionEntry(section, entry, template)}
                              </div>
                            ))}
                            
                            <Button
                              variant="outline"
                              onClick={() => addEntry(section.id)}
                              className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-600"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Entry
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      {/* Empty State */}
      {localSections.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Plus className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            No Sections Added Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Start building your resume by adding sections like work experience, education, and skills.
          </p>
          <Button
            onClick={() => setShowAddMenu(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Section
          </Button>
        </motion.div>
      )}

      {/* Tips */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Section Builder Tips
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Drag sections to reorder them in your resume</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Toggle visibility to show/hide sections</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>All changes are automatically saved</span>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Use preview mode to see how sections look</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Click outside to close add menu */}
      {showAddMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAddMenu(false)}
        />
      )}
    </div>
  );
}