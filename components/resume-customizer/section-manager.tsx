'use client';

import { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { 
  GripVertical, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  Plus,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Section {
  id: string;
  type: string;
  title: string;
  order: number;
  visible: boolean;
  customContent?: any;
}

interface SectionManagerProps {
  sections: Section[];
  onUpdate: (sections: Section[]) => void;
}

export function SectionManager({ sections, onUpdate }: SectionManagerProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const defaultSections = [
    { id: '1', type: 'personal', title: 'Personal Information', order: 1, visible: true },
    { id: '2', type: 'summary', title: 'Professional Summary', order: 2, visible: true },
    { id: '3', type: 'experience', title: 'Work Experience', order: 3, visible: true },
    { id: '4', type: 'education', title: 'Education', order: 4, visible: true },
    { id: '5', type: 'skills', title: 'Skills', order: 5, visible: true }
  ];

  const sectionIcons = {
    personal: '👤',
    summary: '📝',
    experience: '💼',
    education: '🎓',
    skills: '⚡',
    certifications: '🏆',
    projects: '🚀',
    languages: '🌐',
    custom: '✨'
  };

  const handleReorder = (newSections: Section[]) => {
    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      order: index + 1
    }));
    onUpdate(reorderedSections);
  };

  const toggleVisibility = (sectionId: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    );
    onUpdate(updatedSections);
    
    const section = sections.find(s => s.id === sectionId);
    toast.success(
      `${section?.title} ${section?.visible ? 'hidden' : 'shown'}`,
      { description: section?.visible ? 'Section will not appear in resume' : 'Section will appear in resume' }
    );
  };

  const startEditing = (section: Section) => {
    setEditingSection(section.id);
    setEditTitle(section.title);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      toast.error('Section title cannot be empty');
      return;
    }

    const updatedSections = sections.map(section =>
      section.id === editingSection
        ? { ...section, title: editTitle.trim() }
        : section
    );
    onUpdate(updatedSections);
    setEditingSection(null);
    setEditTitle('');
    toast.success('Section title updated');
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setEditTitle('');
  };

  const deleteSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section?.type === 'personal' || section?.type === 'summary') {
      toast.error('Cannot delete essential sections');
      return;
    }

    const updatedSections = sections.filter(s => s.id !== sectionId);
    onUpdate(updatedSections);
    toast.success(`${section?.title} section deleted`);
  };

  const resetToDefaults = () => {
    onUpdate(defaultSections);
    toast.success('Reset to default sections');
  };

  const addStandardSection = (type: string, title: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      title,
      order: sections.length + 1,
      visible: true
    };
    onUpdate([...sections, newSection]);
    toast.success(`${title} section added`);
  };

  const availableStandardSections = [
    { type: 'certifications', title: 'Certifications' },
    { type: 'projects', title: 'Projects' },
    { type: 'languages', title: 'Languages' },
    { type: 'awards', title: 'Awards & Achievements' },
    { type: 'publications', title: 'Publications' },
    { type: 'volunteer', title: 'Volunteer Experience' }
  ].filter(section => !sections.some(s => s.type === section.type));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Section Management
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Drag to reorder sections, toggle visibility, and customize section titles
        </p>
      </div>

      {/* Section List */}
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <GripVertical className="w-5 h-5 mr-2 text-gray-600" />
              Resume Sections
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {sections.filter(s => s.visible).length} visible
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetToDefaults}
                className="text-gray-600 hover:text-gray-800"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Reorder.Group
            axis="y"
            values={sections}
            onReorder={handleReorder}
            className="space-y-3"
          >
            <AnimatePresence>
              {sections.map((section) => (
                <Reorder.Item
                  key={section.id}
                  value={section}
                  onDragStart={() => setDraggedItem(section.id)}
                  onDragEnd={() => setDraggedItem(null)}
                  className={`${draggedItem === section.id ? 'z-10' : ''}`}
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.01 }}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-grab active:cursor-grabbing ${
                      section.visible
                        ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                        : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-60'
                    } ${draggedItem === section.id ? 'shadow-lg scale-105' : 'hover:shadow-md'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <span className="text-lg">
                            {sectionIcons[section.type as keyof typeof sectionIcons] || '📄'}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          {editingSection === section.id ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="h-8 text-sm"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveEdit();
                                  if (e.key === 'Escape') cancelEdit();
                                }}
                              />
                              <Button
                                size="sm"
                                onClick={saveEdit}
                                className="h-8 px-2"
                              >
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={cancelEdit}
                                className="h-8 px-2"
                              >
                                <AlertCircle className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {section.title}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {section.type}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  Order: {section.order}
                                </span>
                              </div>
                            </div>
                          )}
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
                            onCheckedChange={() => toggleVisibility(section.id)}
                          />
                        </div>
                        
                        {editingSection !== section.id && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditing(section)}
                              className="h-8 px-2"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            
                            {section.type !== 'personal' && section.type !== 'summary' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteSection(section.id)}
                                className="h-8 px-2 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </CardContent>
      </Card>

      {/* Add Standard Sections */}
      {availableStandardSections.length > 0 && (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-green-600" />
              Add Standard Sections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableStandardSections.map((section) => (
                <Button
                  key={section.type}
                  variant="outline"
                  onClick={() => addStandardSection(section.type, section.title)}
                  className="justify-start h-auto p-3 border-dashed border-2 hover:border-green-500 hover:text-green-600"
                >
                  <span className="mr-2">
                    {sectionIcons[section.type as keyof typeof sectionIcons] || '📄'}
                  </span>
                  {section.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section Management Tips */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
            <GripVertical className="w-4 h-4 mr-2 text-blue-600" />
            Section Management Tips
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Drag sections to reorder them in your resume</p>
            <p>• Toggle visibility to show/hide sections without deleting them</p>
            <p>• Edit section titles to match your personal style</p>
            <p>• Essential sections (Personal Info, Summary) cannot be deleted</p>
            <p>• Add standard sections for common resume elements</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}