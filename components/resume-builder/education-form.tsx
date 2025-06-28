'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { useFieldArray, Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeFormData } from '@/lib/validations';

interface EducationFormProps {
  control: Control<ResumeFormData>;
  errors: any;
}

export function EducationForm({ control, errors }: EducationFormProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const addEducation = () => {
    append({
      dataId: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      graduationDate: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <GraduationCap className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Education
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
                    Education {index + 1}
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
                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.institution`}>
                    Institution Name *
                  </Label>
                  <Input
                    {...control.register(`education.${index}.institution` as const)}
                    placeholder="e.g., Stanford University"
                    className={errors?.education?.[index]?.institution ? 'border-red-500' : ''}
                  />
                  {errors?.education?.[index]?.institution && (
                    <p className="text-sm text-red-600">
                      {errors.education[index].institution.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.degree`}>
                      Degree *
                    </Label>
                    <Input
                      {...control.register(`education.${index}.degree` as const)}
                      placeholder="e.g., Bachelor of Science"
                      className={errors?.education?.[index]?.degree ? 'border-red-500' : ''}
                    />
                    {errors?.education?.[index]?.degree && (
                      <p className="text-sm text-red-600">
                        {errors.education[index].degree.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.fieldOfStudy`}>
                      Field of Study *
                    </Label>
                    <Input
                      {...control.register(`education.${index}.fieldOfStudy` as const)}
                      placeholder="e.g., Computer Science"
                      className={errors?.education?.[index]?.fieldOfStudy ? 'border-red-500' : ''}
                    />
                    {errors?.education?.[index]?.fieldOfStudy && (
                      <p className="text-sm text-red-600">
                        {errors.education[index].fieldOfStudy.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.graduationDate`}>
                    Graduation Date *
                  </Label>
                  <Input
                    {...control.register(`education.${index}.graduationDate` as const)}
                    type="month"
                    className={errors?.education?.[index]?.graduationDate ? 'border-red-500' : ''}
                  />
                  {errors?.education?.[index]?.graduationDate && (
                    <p className="text-sm text-red-600">
                      {errors.education[index].graduationDate.message}
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
        onClick={addEducation}
        className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}