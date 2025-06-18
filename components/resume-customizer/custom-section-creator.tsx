'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Save, 
  X, 
  FileText, 
  Award, 
  BookOpen,
  Heart,
  Briefcase,
  Star,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Section {
  id: string;
  type: string;
  title: string;
  order: number;
  visible: boolean;
  customContent?: {
    template: string;
    items: any[];
  };
}

interface CustomSectionCreatorProps {
  sections: Section[];
  onUpdate: (sections: Section[]) => void;
}

interface SectionTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'url';
    required?: boolean;
    placeholder?: string;
  }>;
  defaultItem: any;
}

export function CustomSectionCreator({ sections, onUpdate }: CustomSectionCreatorProps) {
  const [showCreator, setShowCreator] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const sectionTemplates: SectionTemplate[] = [
    {
      id: 'publications',
      name: 'Publications',
      description: 'Academic papers, articles, and research publications',
      icon: BookOpen,
      fields: [
        { key: 'title', label: 'Publication Title', type: 'text', required: true, placeholder: 'Research Paper Title' },
        { key: 'authors', label: 'Authors', type: 'text', required: true, placeholder: 'John Doe, Jane Smith' },
        { key: 'journal', label: 'Journal/Conference', type: 'text', required: true, placeholder: 'Journal of Computer Science' },
        { key: 'date', label: 'Publication Date', type: 'date', required: true },
        { key: 'url', label: 'URL/DOI', type: 'url', placeholder: 'https://doi.org/...' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Brief description of the publication...' }
      ],
      defaultItem: {
        title: '',
        authors: '',
        journal: '',
        date: '',
        url: '',
        description: ''
      }
    },
    {
      id: 'awards',
      name: 'Awards & Achievements',
      description: 'Recognition, honors, and professional achievements',
      icon: Award,
      fields: [
        { key: 'title', label: 'Award Title', type: 'text', required: true, placeholder: 'Employee of the Year' },
        { key: 'issuer', label: 'Issuing Organization', type: 'text', required: true, placeholder: 'Company Name' },
        { key: 'date', label: 'Date Received', type: 'date', required: true },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Description of the achievement...' }
      ],
      defaultItem: {
        title: '',
        issuer: '',
        date: '',
        description: ''
      }
    },
    {
      id: 'volunteer',
      name: 'Volunteer Experience',
      description: 'Community service and volunteer work',
      icon: Heart,
      fields: [
        { key: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Local Food Bank' },
        { key: 'role', label: 'Role/Position', type: 'text', required: true, placeholder: 'Volunteer Coordinator' },
        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
        { key: 'endDate', label: 'End Date', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe your volunteer activities...' }
      ],
      defaultItem: {
        organization: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    },
    {
      id: 'interests',
      name: 'Interests & Hobbies',
      description: 'Personal interests and recreational activities',
      icon: Star,
      fields: [
        { key: 'category', label: 'Category', type: 'text', required: true, placeholder: 'Sports, Technology, Arts' },
        { key: 'items', label: 'Interests', type: 'textarea', required: true, placeholder: 'Photography, Hiking, Chess, Reading...' },
        { key: 'description', label: 'Additional Details', type: 'textarea', placeholder: 'Optional description...' }
      ],
      defaultItem: {
        category: '',
        items: '',
        description: ''
      }
    },
    {
      id: 'custom',
      name: 'Custom Section',
      description: 'Create your own section with flexible content',
      icon: FileText,
      fields: [
        { key: 'title', label: 'Item Title', type: 'text', required: true, placeholder: 'Title' },
        { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Subtitle or organization' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed description...' }
      ],
      defaultItem: {
        title: '',
        subtitle: '',
        date: '',
        description: ''
      }
    }
  ];

  const customSections = sections.filter(s => s.type === 'custom' || s.customContent);

  const createSection = () => {
    if (!selectedTemplate || !sectionTitle.trim()) {
      toast.error('Please select a template and enter a section title');
      return;
    }

    const template = sectionTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const newSection: Section = {
      id: Date.now().toString(),
      type: 'custom',
      title: sectionTitle.trim(),
      order: sections.length + 1,
      visible: true,
      customContent: {
        template: selectedTemplate,
        items: []
      }
    };

    onUpdate([...sections, newSection]);
    setShowCreator(false);
    setSelectedTemplate('');
    setSectionTitle('');
    toast.success(`${sectionTitle} section created`);
  };

  const addItemToSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section?.customContent) return;

    const template = sectionTemplates.find(t => t.id === section.customContent.template);
    if (!template) return;

    const newItem = { ...template.defaultItem, id: Date.now().toString() };
    setEditingSection(sectionId);
    setEditingItem(newItem);
  };

  const saveItem = () => {
    if (!editingSection || !editingItem) return;

    const section = sections.find(s => s.id === editingSection);
    if (!section?.customContent) return;

    const template = sectionTemplates.find(t => t.id === section.customContent.template);
    if (!template) return;

    // Validate required fields
    const missingFields = template.fields
      .filter(field => field.required && !editingItem[field.key]?.trim())
      .map(field => field.label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }

    const updatedSections = sections.map(s => {
      if (s.id === editingSection && s.customContent) {
        const existingItemIndex = s.customContent.items.findIndex(item => item.id === editingItem.id);
        const updatedItems = existingItemIndex >= 0
          ? s.customContent.items.map((item, index) => 
              index === existingItemIndex ? editingItem : item
            )
          : [...s.customContent.items, editingItem];

        return {
          ...s,
          customContent: {
            ...s.customContent,
            items: updatedItems
          }
        };
      }
      return s;
    });

    onUpdate(updatedSections);
    setEditingSection(null);
    setEditingItem(null);
    toast.success('Item saved successfully');
  };

  const deleteItem = (sectionId: string, itemId: string) => {
    const updatedSections = sections.map(s => {
      if (s.id === sectionId && s.customContent) {
        return {
          ...s,
          customContent: {
            ...s.customContent,
            items: s.customContent.items.filter(item => item.id !== itemId)
          }
        };
      }
      return s;
    });

    onUpdate(updatedSections);
    toast.success('Item deleted');
  };

  const deleteSection = (sectionId: string) => {
    const updatedSections = sections.filter(s => s.id !== sectionId);
    onUpdate(updatedSections);
    toast.success('Section deleted');
  };

  const duplicateSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const duplicatedSection: Section = {
      ...section,
      id: Date.now().toString(),
      title: `${section.title} (Copy)`,
      order: sections.length + 1
    };

    onUpdate([...sections, duplicatedSection]);
    toast.success('Section duplicated');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Custom Sections
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create personalized sections to showcase unique aspects of your background
        </p>
      </div>

      {/* Create New Section Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowCreator(true)}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Custom Section
        </Button>
      </div>

      {/* Section Creator Modal */}
      <AnimatePresence>
        {showCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Create Custom Section
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreator(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  {/* Section Title */}
                  <div className="space-y-2">
                    <Label htmlFor="section-title">Section Title</Label>
                    <Input
                      id="section-title"
                      value={sectionTitle}
                      onChange={(e) => setSectionTitle(e.target.value)}
                      placeholder="Enter section title (e.g., Publications, Awards)"
                    />
                  </div>

                  {/* Template Selection */}
                  <div className="space-y-2">
                    <Label>Choose Template</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {sectionTemplates.map((template) => (
                        <motion.button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                            selectedTemplate === template.id
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <template.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                {template.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {template.description}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Create Button */}
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowCreator(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={createSection}
                      disabled={!selectedTemplate || !sectionTitle.trim()}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Create Section
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing Custom Sections */}
      {customSections.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your Custom Sections
          </h4>
          
          {customSections.map((section) => {
            const template = sectionTemplates.find(t => t.id === section.customContent?.template);
            const Icon = template?.icon || FileText;
            
            return (
              <Card key={section.id} className="border border-gray-200 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-blue-600" />
                      {section.title}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {template?.name || 'Custom'}
                      </Badge>
                    </CardTitle>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addItemToSection(section.id)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Item
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateSection(section.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {section.customContent?.items.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Icon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No items added yet</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addItemToSection(section.id)}
                        className="mt-2"
                      >
                        Add First Item
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {section.customContent?.items.map((item, index) => (
                        <div
                          key={item.id}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                {item.title || item.organization || `Item ${index + 1}`}
                              </h5>
                              {item.subtitle && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.subtitle}
                                </p>
                              )}
                              {item.date && (
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  {item.date}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingSection(section.id);
                                  setEditingItem(item);
                                }}
                                className="h-8 px-2"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteItem(section.id, item.id)}
                                className="h-8 px-2 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Item Editor Modal */}
      <AnimatePresence>
        {editingSection && editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Edit Item
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingSection(null);
                    setEditingItem(null);
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {(() => {
                  const section = sections.find(s => s.id === editingSection);
                  const template = sectionTemplates.find(t => t.id === section?.customContent?.template);
                  
                  if (!template) return null;

                  return (
                    <div className="space-y-4">
                      {template.fields.map((field) => (
                        <div key={field.key} className="space-y-2">
                          <Label htmlFor={field.key}>
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          
                          {field.type === 'textarea' ? (
                            <Textarea
                              id={field.key}
                              value={editingItem[field.key] || ''}
                              onChange={(e) => setEditingItem({
                                ...editingItem,
                                [field.key]: e.target.value
                              })}
                              placeholder={field.placeholder}
                              rows={3}
                            />
                          ) : (
                            <Input
                              id={field.key}
                              type={field.type}
                              value={editingItem[field.key] || ''}
                              onChange={(e) => setEditingItem({
                                ...editingItem,
                                [field.key]: e.target.value
                              })}
                              placeholder={field.placeholder}
                            />
                          )}
                        </div>
                      ))}
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingSection(null);
                            setEditingItem(null);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={saveItem}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Item
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <Plus className="w-4 h-4 mr-2 text-green-600" />
            Custom Section Tips
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Use custom sections to highlight unique aspects of your background</p>
            <p>• Choose templates that match your content type for better formatting</p>
            <p>• Keep custom sections relevant to your target role</p>
            <p>• Save custom sections as templates for future use</p>
            <p>• Order custom sections appropriately within your resume flow</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}