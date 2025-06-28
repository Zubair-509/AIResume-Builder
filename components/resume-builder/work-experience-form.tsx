'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { useFieldArray, Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeFormData } from '@/lib/validations';

interface WorkExperienceFormProps {
  control: Control<ResumeFormData>;
  errors: any;
}

export function WorkExperienceForm({ control, errors }: WorkExperienceFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience',
  });

  const addWorkExperience = () => {
    append({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Briefcase className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Work Experience
        </h3>
      </div>

      <AnimatePresence>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Experience {index + 1}
                  </CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`workExperience.${index}.company`}>
                      Company Name *
                    </Label>
                    <Input
                      {...control.register(`workExperience.${index}.company` as const)}
                      placeholder="e.g., Google Inc."
                      className={errors?.workExperience?.[index]?.company ? 'border-red-500' : ''}
                    />
                    {errors?.workExperience?.[index]?.company && (
                      <p className="text-sm text-red-600">
                        {errors.workExperience[index].company.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`workExperience.${index}.position`}>
                      Position *
                    </Label>
                    <Input
                      {...control.register(`workExperience.${index}.position` as const)}
                      placeholder="e.g., Senior Software Engineer"
                      className={errors?.workExperience?.[index]?.position ? 'border-red-500' : ''}
                    />
                    {errors?.workExperience?.[index]?.position && (
                      <p className="text-sm text-red-600">
                        {errors.workExperience[index].position.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`workExperience.${index}.startDate`}>
                      Start Date *
                    </Label>
                    <Input
                      {...control.register(`workExperience.${index}.startDate` as const)}
                      type="month"
                      className={errors?.workExperience?.[index]?.startDate ? 'border-red-500' : ''}
                    />
                    {errors?.workExperience?.[index]?.startDate && (
                      <p className="text-sm text-red-600">
                        {errors.workExperience[index].startDate.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`workExperience.${index}.endDate`}>
                      End Date
                    </Label>
                    <Input
                      {...control.register(`workExperience.${index}.endDate` as const)}
                      type="month"
                      disabled={control._formValues.workExperience?.[index]?.current}
                      className={errors?.workExperience?.[index]?.endDate ? 'border-red-500' : ''}
                    />
                    {errors?.workExperience?.[index]?.endDate && (
                      <p className="text-sm text-red-600">
                        {errors.workExperience[index].endDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...control.register(`workExperience.${index}.current` as const)}
                    id={`current-${index}`}
                  />
                  <Label htmlFor={`current-${index}`} className="text-sm">
                    I currently work here
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`workExperience.${index}.responsibilities`}>
                    Key Responsibilities *
                  </Label>
                  <Textarea
                    {...control.register(`workExperience.${index}.responsibilities` as const)}
                    placeholder="Describe your key responsibilities and achievements..."
                    rows={4}
                    className={errors?.workExperience?.[index]?.responsibilities ? 'border-red-500' : ''}
                  />
                  {errors?.workExperience?.[index]?.responsibilities && (
                    <p className="text-sm text-red-600">
                      {errors.workExperience[index].responsibilities.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={addWorkExperience}
        className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
}